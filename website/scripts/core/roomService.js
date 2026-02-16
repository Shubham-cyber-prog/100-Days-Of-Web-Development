/**
 * Room Service
 * Handles real-time collaborative study room functionality
 * WebSocket/Firebase Realtime Database connection for live collaboration
 */

import { db, auth } from '../firebase-config.js';
import {
    ref,
    set,
    get,
    push,
    update,
    remove,
    onValue,
    onDisconnect,
    serverTimestamp,
    query,
    orderByChild,
    limitToLast
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js';

class RoomService {
    constructor() {
        this.currentRoom = null;
        this.currentUser = null;
        this.listeners = [];
        this.presenceRef = null;
        this.roomRef = null;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.pomodoroInterval = null;
        
        // Room constants
        this.MAX_PARTICIPANTS = 10;
        this.INVITE_CODE_LENGTH = 6;
        
        // Bind methods
        this.handleDisconnect = this.handleDisconnect.bind(this);
    }
    
    /**
     * Initialize room service with current user
     * @param {Object} user - Current user object
     */
    async initialize(user) {
        this.currentUser = user || {
            uid: this.generateGuestId(),
            displayName: 'Guest User',
            photoURL: null,
            isGuest: true
        };
        
        // Set up connection state listener
        this.setupConnectionListener();
        
        return this.currentUser;
    }
    
    /**
     * Generate a guest user ID
     * @returns {string} Guest ID
     */
    generateGuestId() {
        return 'guest_' + Math.random().toString(36).substring(2, 15);
    }
    
    /**
     * Generate a unique invite code
     * @returns {string} Invite code
     */
    generateInviteCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < this.INVITE_CODE_LENGTH; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    
    /**
     * Create a new study room
     * @param {Object} options - Room options
     * @returns {Promise<Object>} Created room data
     */
    async createRoom(options = {}) {
        if (!this.currentUser) {
            throw new Error('User not initialized');
        }
        
        const inviteCode = this.generateInviteCode();
        const roomId = push(ref(db, 'rooms')).key;
        
        const roomData = {
            id: roomId,
            inviteCode,
            name: options.name || `${this.currentUser.displayName}'s Study Room`,
            description: options.description || 'A collaborative study session',
            createdBy: this.currentUser.uid,
            createdAt: serverTimestamp(),
            settings: {
                maxParticipants: options.maxParticipants || this.MAX_PARTICIPANTS,
                pomodoroEnabled: options.pomodoroEnabled !== false,
                pomodoroDuration: options.pomodoroDuration || 25,
                breakDuration: options.breakDuration || 5,
                isPrivate: options.isPrivate || false
            },
            pomodoro: {
                isRunning: false,
                startTime: null,
                duration: (options.pomodoroDuration || 25) * 60 * 1000,
                isBreak: false
            },
            participants: {},
            messages: {},
            activity: {}
        };
        
        try {
            await set(ref(db, `rooms/${roomId}`), roomData);
            await this.joinRoom(roomId);
            
            // Add creation activity
            await this.addActivity(roomId, {
                type: 'room_created',
                userId: this.currentUser.uid,
                userName: this.currentUser.displayName
            });
            
            return roomData;
        } catch (error) {
            console.error('Error creating room:', error);
            throw error;
        }
    }
    
    /**
     * Join an existing room by ID or invite code
     * @param {string} roomIdOrCode - Room ID or invite code
     * @returns {Promise<Object>} Room data
     */
    async joinRoom(roomIdOrCode) {
        if (!this.currentUser) {
            throw new Error('User not initialized');
        }
        
        let roomId = roomIdOrCode;
        let roomData = null;
        
        // Check if it's an invite code
        if (roomIdOrCode.length === this.INVITE_CODE_LENGTH) {
            roomData = await this.findRoomByInviteCode(roomIdOrCode);
            if (!roomData) {
                throw new Error('Room not found with this invite code');
            }
            roomId = roomData.id;
        } else {
            // Get room by ID
            const snapshot = await get(ref(db, `rooms/${roomId}`));
            if (!snapshot.exists()) {
                throw new Error('Room not found');
            }
            roomData = snapshot.val();
        }
        
        // Check participant limit
        const participantCount = Object.keys(roomData.participants || {}).length;
        if (participantCount >= (roomData.settings?.maxParticipants || this.MAX_PARTICIPANTS)) {
            throw new Error('Room is full');
        }
        
        // Leave current room if in one
        if (this.currentRoom) {
            await this.leaveRoom();
        }
        
        // Add user to participants
        const participantData = {
            odId: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL || null,
            joinedAt: serverTimestamp(),
            status: 'online',
            workingOn: null,
            isGuest: this.currentUser.isGuest || false
        };
        
        await set(ref(db, `rooms/${roomId}/participants/${this.currentUser.uid}`), participantData);
        
        // Set up presence
        this.setupPresence(roomId);
        
        // Store current room
        this.currentRoom = roomId;
        this.roomRef = ref(db, `rooms/${roomId}`);
        
        // Add join activity
        await this.addActivity(roomId, {
            type: 'user_joined',
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName
        });
        
        return roomData;
    }
    
    /**
     * Find room by invite code
     * @param {string} inviteCode - Invite code
     * @returns {Promise<Object|null>} Room data or null
     */
    async findRoomByInviteCode(inviteCode) {
        const roomsRef = ref(db, 'rooms');
        const snapshot = await get(roomsRef);
        
        if (snapshot.exists()) {
            const rooms = snapshot.val();
            for (const [roomId, room] of Object.entries(rooms)) {
                if (room.inviteCode === inviteCode.toUpperCase()) {
                    return { ...room, id: roomId };
                }
            }
        }
        
        return null;
    }
    
    /**
     * Leave current room
     */
    async leaveRoom() {
        if (!this.currentRoom || !this.currentUser) return;
        
        try {
            // Add leave activity
            await this.addActivity(this.currentRoom, {
                type: 'user_left',
                userId: this.currentUser.uid,
                userName: this.currentUser.displayName
            });
            
            // Remove from participants
            await remove(ref(db, `rooms/${this.currentRoom}/participants/${this.currentUser.uid}`));
            
            // Clean up presence
            if (this.presenceRef) {
                await this.presenceRef.cancel();
                this.presenceRef = null;
            }
            
            // Remove listeners
            this.removeAllListeners();
            
            // Clear pomodoro interval
            if (this.pomodoroInterval) {
                clearInterval(this.pomodoroInterval);
                this.pomodoroInterval = null;
            }
            
            this.currentRoom = null;
            this.roomRef = null;
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    }
    
    /**
     * Set up presence tracking
     * @param {string} roomId - Room ID
     */
    setupPresence(roomId) {
        const presencePath = `rooms/${roomId}/participants/${this.currentUser.uid}`;
        this.presenceRef = onDisconnect(ref(db, presencePath));
        
        // Remove user from room on disconnect
        this.presenceRef.remove();
        
        // Update status periodically
        this.updatePresenceStatus('online');
    }
    
    /**
     * Update user's presence status
     * @param {string} status - Status (online, away, busy)
     */
    async updatePresenceStatus(status) {
        if (!this.currentRoom || !this.currentUser) return;
        
        await update(ref(db, `rooms/${this.currentRoom}/participants/${this.currentUser.uid}`), {
            status,
            lastActive: serverTimestamp()
        });
    }
    
    /**
     * Update "working on" status
     * @param {number} dayNumber - Day number user is working on
     * @param {string} projectTitle - Project title
     */
    async updateWorkingOn(dayNumber, projectTitle = null) {
        if (!this.currentRoom || !this.currentUser) return;
        
        const workingOn = dayNumber ? {
            day: dayNumber,
            title: projectTitle || `Day ${dayNumber} Project`,
            startedAt: serverTimestamp()
        } : null;
        
        await update(ref(db, `rooms/${this.currentRoom}/participants/${this.currentUser.uid}`), {
            workingOn
        });
        
        if (dayNumber) {
            await this.addActivity(this.currentRoom, {
                type: 'started_working',
                userId: this.currentUser.uid,
                userName: this.currentUser.displayName,
                day: dayNumber,
                title: projectTitle
            });
        }
    }
    
    /**
     * Mark a day as completed and broadcast
     * @param {number} dayNumber - Completed day number
     */
    async completeDay(dayNumber) {
        if (!this.currentRoom || !this.currentUser) return;
        
        await this.addActivity(this.currentRoom, {
            type: 'completed_day',
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName,
            day: dayNumber
        });
        
        // Clear working on status
        await this.updateWorkingOn(null);
    }
    
    /**
     * Send a chat message
     * @param {string} content - Message content
     * @param {string} type - Message type (text, code, system)
     */
    async sendMessage(content, type = 'text') {
        if (!this.currentRoom || !this.currentUser) return;
        
        const messageData = {
            id: push(ref(db, `rooms/${this.currentRoom}/messages`)).key,
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName,
            userPhoto: this.currentUser.photoURL,
            content,
            type,
            timestamp: serverTimestamp()
        };
        
        await push(ref(db, `rooms/${this.currentRoom}/messages`), messageData);
        
        return messageData;
    }
    
    /**
     * Add activity to room feed
     * @param {string} roomId - Room ID
     * @param {Object} activity - Activity data
     */
    async addActivity(roomId, activity) {
        const activityData = {
            ...activity,
            timestamp: serverTimestamp()
        };
        
        await push(ref(db, `rooms/${roomId}/activity`), activityData);
    }
    
    /**
     * Start Pomodoro timer for room
     * @param {number} duration - Duration in minutes
     * @param {boolean} isBreak - Whether this is a break
     */
    async startPomodoro(duration = 25, isBreak = false) {
        if (!this.currentRoom) return;
        
        const pomodoroData = {
            isRunning: true,
            startTime: Date.now(),
            duration: duration * 60 * 1000,
            isBreak,
            startedBy: this.currentUser.uid
        };
        
        await update(ref(db, `rooms/${this.currentRoom}/pomodoro`), pomodoroData);
        
        await this.addActivity(this.currentRoom, {
            type: isBreak ? 'break_started' : 'pomodoro_started',
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName,
            duration
        });
    }
    
    /**
     * Stop Pomodoro timer
     */
    async stopPomodoro() {
        if (!this.currentRoom) return;
        
        await update(ref(db, `rooms/${this.currentRoom}/pomodoro`), {
            isRunning: false,
            startTime: null
        });
        
        await this.addActivity(this.currentRoom, {
            type: 'pomodoro_stopped',
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName
        });
    }
    
    /**
     * Listen to room updates
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    listenToRoom(callback) {
        if (!this.currentRoom) return () => {};
        
        const unsubscribe = onValue(ref(db, `rooms/${this.currentRoom}`), (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            }
        });
        
        this.listeners.push(unsubscribe);
        return unsubscribe;
    }
    
    /**
     * Listen to participants updates
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    listenToParticipants(callback) {
        if (!this.currentRoom) return () => {};
        
        const unsubscribe = onValue(ref(db, `rooms/${this.currentRoom}/participants`), (snapshot) => {
            const participants = snapshot.exists() ? snapshot.val() : {};
            callback(Object.values(participants));
        });
        
        this.listeners.push(unsubscribe);
        return unsubscribe;
    }
    
    /**
     * Listen to chat messages
     * @param {Function} callback - Callback function
     * @param {number} limit - Max messages to fetch
     * @returns {Function} Unsubscribe function
     */
    listenToMessages(callback, limit = 100) {
        if (!this.currentRoom) return () => {};
        
        const messagesQuery = query(
            ref(db, `rooms/${this.currentRoom}/messages`),
            orderByChild('timestamp'),
            limitToLast(limit)
        );
        
        const unsubscribe = onValue(messagesQuery, (snapshot) => {
            const messages = [];
            snapshot.forEach((child) => {
                messages.push({ id: child.key, ...child.val() });
            });
            callback(messages);
        });
        
        this.listeners.push(unsubscribe);
        return unsubscribe;
    }
    
    /**
     * Listen to activity feed
     * @param {Function} callback - Callback function
     * @param {number} limit - Max activities to fetch
     * @returns {Function} Unsubscribe function
     */
    listenToActivity(callback, limit = 50) {
        if (!this.currentRoom) return () => {};
        
        const activityQuery = query(
            ref(db, `rooms/${this.currentRoom}/activity`),
            orderByChild('timestamp'),
            limitToLast(limit)
        );
        
        const unsubscribe = onValue(activityQuery, (snapshot) => {
            const activities = [];
            snapshot.forEach((child) => {
                activities.push({ id: child.key, ...child.val() });
            });
            callback(activities);
        });
        
        this.listeners.push(unsubscribe);
        return unsubscribe;
    }
    
    /**
     * Listen to Pomodoro updates
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    listenToPomodoro(callback) {
        if (!this.currentRoom) return () => {};
        
        const unsubscribe = onValue(ref(db, `rooms/${this.currentRoom}/pomodoro`), (snapshot) => {
            if (snapshot.exists()) {
                callback(snapshot.val());
            }
        });
        
        this.listeners.push(unsubscribe);
        return unsubscribe;
    }
    
    /**
     * Set up connection state listener
     */
    setupConnectionListener() {
        const connectedRef = ref(db, '.info/connected');
        onValue(connectedRef, (snapshot) => {
            this.isConnected = snapshot.val() === true;
            
            if (this.isConnected) {
                this.reconnectAttempts = 0;
                this.notifyConnectionChange(true);
            } else {
                this.notifyConnectionChange(false);
                this.attemptReconnect();
            }
        });
    }
    
    /**
     * Attempt to reconnect
     */
    attemptReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }
        
        this.reconnectAttempts++;
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
        
        setTimeout(() => {
            if (!this.isConnected && this.currentRoom) {
                this.joinRoom(this.currentRoom).catch(console.error);
            }
        }, delay);
    }
    
    /**
     * Notify connection status change
     * @param {boolean} connected - Connection status
     */
    notifyConnectionChange(connected) {
        window.dispatchEvent(new CustomEvent('roomConnectionChange', {
            detail: { connected }
        }));
    }
    
    /**
     * Handle disconnect
     */
    handleDisconnect() {
        this.leaveRoom();
    }
    
    /**
     * Remove all listeners
     */
    removeAllListeners() {
        this.listeners.forEach(unsubscribe => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.listeners = [];
    }
    
    /**
     * Get room info
     * @param {string} roomId - Room ID
     * @returns {Promise<Object>} Room data
     */
    async getRoomInfo(roomId) {
        const snapshot = await get(ref(db, `rooms/${roomId}`));
        return snapshot.exists() ? snapshot.val() : null;
    }
    
    /**
     * Get public rooms list
     * @param {number} limit - Max rooms to fetch
     * @returns {Promise<Array>} List of public rooms
     */
    async getPublicRooms(limit = 20) {
        const roomsRef = ref(db, 'rooms');
        const snapshot = await get(roomsRef);
        
        const rooms = [];
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                const room = child.val();
                if (!room.settings?.isPrivate) {
                    const participantCount = Object.keys(room.participants || {}).length;
                    if (participantCount < (room.settings?.maxParticipants || this.MAX_PARTICIPANTS)) {
                        rooms.push({
                            ...room,
                            id: child.key,
                            participantCount
                        });
                    }
                }
            });
        }
        
        return rooms.slice(0, limit);
    }
    
    /**
     * Delete room (only creator can delete)
     * @param {string} roomId - Room ID
     */
    async deleteRoom(roomId) {
        const room = await this.getRoomInfo(roomId);
        
        if (!room) {
            throw new Error('Room not found');
        }
        
        if (room.createdBy !== this.currentUser?.uid) {
            throw new Error('Only room creator can delete the room');
        }
        
        await remove(ref(db, `rooms/${roomId}`));
    }
    
    /**
     * Update room settings
     * @param {Object} settings - New settings
     */
    async updateRoomSettings(settings) {
        if (!this.currentRoom) return;
        
        const room = await this.getRoomInfo(this.currentRoom);
        if (room.createdBy !== this.currentUser?.uid) {
            throw new Error('Only room creator can update settings');
        }
        
        await update(ref(db, `rooms/${this.currentRoom}/settings`), settings);
    }
    
    /**
     * Get current room ID
     * @returns {string|null} Current room ID
     */
    getCurrentRoom() {
        return this.currentRoom;
    }
    
    /**
     * Get current user
     * @returns {Object|null} Current user
     */
    getCurrentUser() {
        return this.currentUser;
    }
    
    /**
     * Cleanup on page unload
     */
    cleanup() {
        window.removeEventListener('beforeunload', this.handleDisconnect);
        this.leaveRoom();
    }
}

// Export singleton instance
export const roomService = new RoomService();
export default roomService;
