/**
 * Arena Service - Real-time Global Arena & Peer-Mentorship System
 * Firebase Realtime Database integration for presence, war rooms, and SOS relay
 * Issue #1116
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js';
import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    onDisconnect,
    serverTimestamp,
    remove,
    update,
    query,
    orderByChild,
    limitToLast,
    get
} from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js';

class ArenaService {
    constructor() {
        this.db = null;
        this.auth = null;
        this.currentUser = null;
        this.presenceRef = null;
        this.listeners = new Map();
        this.localState = {
            onlineUsers: [],
            currentRoom: null,
            messages: [],
            sosAlerts: []
        };

        // Optimistic update callbacks
        this.callbacks = {
            onPresenceUpdate: null,
            onRoomUpdate: null,
            onMessageReceived: null,
            onSOSReceived: null
        };

        this.init();
    }

    /**
     * Initialize Firebase and auth listener
     */
    async init() {
        try {
            // Get existing Firebase app or wait for it
            const app = await this.getFirebaseApp();
            this.db = getDatabase(app);
            this.auth = getAuth(app);

            // Listen for auth state changes
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    this.currentUser = {
                        uid: user.uid,
                        displayName: user.displayName || 'Anonymous Coder',
                        photoURL: user.photoURL || null,
                        email: user.email
                    };
                    this.setupPresence();
                } else {
                    this.currentUser = null;
                    this.cleanupPresence();
                }
            });

            console.log('ArenaService initialized');
        } catch (error) {
            console.error('ArenaService init error:', error);
        }
    }

    /**
     * Get Firebase app instance
     */
    async getFirebaseApp() {
        // Check if Firebase is already initialized
        if (typeof firebase !== 'undefined' && firebase.apps?.length) {
            return firebase.apps[0];
        }

        // Try to get from window
        if (window.firebaseApp) {
            return window.firebaseApp;
        }

        // Initialize with config
        const firebaseConfig = {
            apiKey: window.FIREBASE_CONFIG?.apiKey || "demo-api-key",
            authDomain: window.FIREBASE_CONFIG?.authDomain || "demo.firebaseapp.com",
            databaseURL: window.FIREBASE_CONFIG?.databaseURL || "https://demo-default-rtdb.firebaseio.com",
            projectId: window.FIREBASE_CONFIG?.projectId || "demo-project",
            storageBucket: window.FIREBASE_CONFIG?.storageBucket || "demo.appspot.com",
            messagingSenderId: window.FIREBASE_CONFIG?.messagingSenderId || "000000000000",
            appId: window.FIREBASE_CONFIG?.appId || "1:000000000000:web:0000000000000000"
        };

        return initializeApp(firebaseConfig);
    }

    // ==========================================
    // PRESENCE SYSTEM
    // ==========================================

    /**
     * Setup user presence tracking
     */
    async setupPresence() {
        if (!this.currentUser || !this.db) return;

        const userPresenceRef = ref(this.db, `presence/${this.currentUser.uid}`);
        this.presenceRef = userPresenceRef;

        // User data to store
        const presenceData = {
            uid: this.currentUser.uid,
            displayName: this.currentUser.displayName,
            photoURL: this.currentUser.photoURL,
            status: 'online',
            currentDay: await this.getCurrentProjectDay(),
            currentRoom: null,
            lastSeen: serverTimestamp(),
            joinedAt: serverTimestamp()
        };

        // Set presence
        await set(userPresenceRef, presenceData);

        // Setup disconnect handler
        onDisconnect(userPresenceRef).remove();

        // Start listening to presence updates
        this.listenToPresence();
    }

    /**
     * Get user's current project day
     */
    async getCurrentProjectDay() {
        try {
            const savedProgress = localStorage.getItem('progress-data');
            if (savedProgress) {
                const data = JSON.parse(savedProgress);
                return data.totalCompleted || 1;
            }
        } catch (e) {
            console.warn('Could not get current day');
        }
        return Math.floor(Math.random() * 50) + 1; // Demo fallback
    }

    /**
     * Listen to all online users
     */
    listenToPresence() {
        if (!this.db) return;

        const presenceRef = ref(this.db, 'presence');
        
        const unsubscribe = onValue(presenceRef, (snapshot) => {
            const users = [];
            snapshot.forEach((child) => {
                const userData = child.val();
                if (userData.status === 'online') {
                    users.push({
                        ...userData,
                        isCurrentUser: userData.uid === this.currentUser?.uid
                    });
                }
            });

            this.localState.onlineUsers = users;
            
            if (this.callbacks.onPresenceUpdate) {
                this.callbacks.onPresenceUpdate(users);
            }
        });

        this.listeners.set('presence', unsubscribe);
    }

    /**
     * Update user status
     */
    async updateStatus(status, additionalData = {}) {
        if (!this.presenceRef) return;

        await update(this.presenceRef, {
            status,
            lastSeen: serverTimestamp(),
            ...additionalData
        });
    }

    /**
     * Cleanup presence on logout
     */
    async cleanupPresence() {
        if (this.presenceRef) {
            await remove(this.presenceRef);
            this.presenceRef = null;
        }

        // Cleanup all listeners
        this.listeners.forEach((unsubscribe) => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        });
        this.listeners.clear();
    }

    /**
     * Get online users count
     */
    getOnlineCount() {
        return this.localState.onlineUsers.length;
    }

    /**
     * Get online users list
     */
    getOnlineUsers() {
        return [...this.localState.onlineUsers];
    }

    // ==========================================
    // WAR ROOMS (Tech-based Chat Rooms)
    // ==========================================

    /**
     * Get available war rooms
     */
    async getWarRooms() {
        if (!this.db) return this.getDefaultRooms();

        try {
            const roomsRef = ref(this.db, 'warRooms');
            const snapshot = await get(roomsRef);
            
            if (snapshot.exists()) {
                const rooms = [];
                snapshot.forEach((child) => {
                    rooms.push({
                        id: child.key,
                        ...child.val()
                    });
                });
                return rooms;
            }
        } catch (error) {
            console.error('Error getting war rooms:', error);
        }

        return this.getDefaultRooms();
    }

    /**
     * Default war rooms
     */
    getDefaultRooms() {
        return [
            { id: 'html-css', name: 'HTML & CSS', tag: '#HTML-CSS', icon: '🎨', memberCount: 0, description: 'Markup & styling discussions' },
            { id: 'javascript', name: 'JavaScript', tag: '#JavaScript', icon: '⚡', memberCount: 0, description: 'JS fundamentals & DOM' },
            { id: 'react', name: 'React', tag: '#React', icon: '⚛️', memberCount: 0, description: 'React components & hooks' },
            { id: 'nodejs', name: 'Node.js', tag: '#NodeJS', icon: '🟢', memberCount: 0, description: 'Backend & APIs' },
            { id: 'general', name: 'General', tag: '#General', icon: '💬', memberCount: 0, description: 'Open discussion' },
            { id: 'help', name: 'Help Center', tag: '#Help', icon: '🆘', memberCount: 0, description: 'Get help from peers' }
        ];
    }

    /**
     * Join a war room
     */
    async joinRoom(roomId) {
        if (!this.db || !this.currentUser) return false;

        try {
            // Leave current room first
            if (this.localState.currentRoom) {
                await this.leaveRoom(this.localState.currentRoom);
            }

            // Update presence with room info
            await this.updateStatus('online', { currentRoom: roomId });

            // Add user to room members
            const memberRef = ref(this.db, `warRooms/${roomId}/members/${this.currentUser.uid}`);
            await set(memberRef, {
                uid: this.currentUser.uid,
                displayName: this.currentUser.displayName,
                photoURL: this.currentUser.photoURL,
                joinedAt: serverTimestamp()
            });

            // Setup disconnect to auto-leave
            onDisconnect(memberRef).remove();

            // Update local state (optimistic)
            this.localState.currentRoom = roomId;
            this.localState.messages = [];

            // Start listening to room messages
            this.listenToRoomMessages(roomId);

            return true;
        } catch (error) {
            console.error('Error joining room:', error);
            return false;
        }
    }

    /**
     * Leave current room
     */
    async leaveRoom(roomId) {
        if (!this.db || !this.currentUser) return;

        try {
            // Remove from room members
            const memberRef = ref(this.db, `warRooms/${roomId}/members/${this.currentUser.uid}`);
            await remove(memberRef);

            // Update presence
            await this.updateStatus('online', { currentRoom: null });

            // Stop listening to messages
            if (this.listeners.has(`room-${roomId}`)) {
                this.listeners.get(`room-${roomId}`)();
                this.listeners.delete(`room-${roomId}`);
            }

            this.localState.currentRoom = null;
            this.localState.messages = [];
        } catch (error) {
            console.error('Error leaving room:', error);
        }
    }

    /**
     * Listen to room messages
     */
    listenToRoomMessages(roomId) {
        if (!this.db) return;

        const messagesRef = query(
            ref(this.db, `warRooms/${roomId}/messages`),
            orderByChild('timestamp'),
            limitToLast(100)
        );

        const unsubscribe = onValue(messagesRef, (snapshot) => {
            const messages = [];
            snapshot.forEach((child) => {
                messages.push({
                    id: child.key,
                    ...child.val()
                });
            });

            this.localState.messages = messages;

            if (this.callbacks.onMessageReceived) {
                this.callbacks.onMessageReceived(messages, roomId);
            }
        });

        this.listeners.set(`room-${roomId}`, unsubscribe);
    }

    /**
     * Send message to current room
     */
    async sendMessage(text, metadata = {}) {
        if (!this.db || !this.currentUser || !this.localState.currentRoom) {
            return null;
        }

        const roomId = this.localState.currentRoom;
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        const message = {
            id: messageId,
            text: text.trim(),
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName,
            userPhoto: this.currentUser.photoURL,
            timestamp: serverTimestamp(),
            type: metadata.type || 'text',
            codeLink: metadata.codeLink || null,
            ...metadata
        };

        // Optimistic update
        const optimisticMessage = {
            ...message,
            timestamp: Date.now(),
            pending: true
        };
        this.localState.messages.push(optimisticMessage);

        if (this.callbacks.onMessageReceived) {
            this.callbacks.onMessageReceived([...this.localState.messages], roomId);
        }

        try {
            const messageRef = ref(this.db, `warRooms/${roomId}/messages/${messageId}`);
            await set(messageRef, message);

            // Remove pending flag
            const idx = this.localState.messages.findIndex(m => m.id === messageId);
            if (idx !== -1) {
                this.localState.messages[idx].pending = false;
            }

            return message;
        } catch (error) {
            console.error('Error sending message:', error);
            // Mark as failed
            const idx = this.localState.messages.findIndex(m => m.id === messageId);
            if (idx !== -1) {
                this.localState.messages[idx].failed = true;
            }
            return null;
        }
    }

    /**
     * Share Mission Control code link
     */
    async shareCodeLink(projectId, description = '') {
        const codeLink = `/website/pages/mission-control.html?project=${projectId}`;
        return this.sendMessage(description || 'Check out my code!', {
            type: 'code-share',
            codeLink,
            projectId
        });
    }

    /**
     * Get room member count
     */
    async getRoomMemberCount(roomId) {
        if (!this.db) return 0;

        try {
            const membersRef = ref(this.db, `warRooms/${roomId}/members`);
            const snapshot = await get(membersRef);
            return snapshot.size || 0;
        } catch (error) {
            return 0;
        }
    }

    // ==========================================
    // SOS NOTIFICATION RELAY
    // ==========================================

    /**
     * Broadcast SOS for help on a specific day
     */
    async broadcastSOS(dayNumber, problemDescription, tags = []) {
        if (!this.db || !this.currentUser) return null;

        const sosId = `sos_${Date.now()}_${this.currentUser.uid}`;

        const sosData = {
            id: sosId,
            userId: this.currentUser.uid,
            userName: this.currentUser.displayName,
            userPhoto: this.currentUser.photoURL,
            dayNumber,
            problemDescription,
            tags,
            status: 'open',
            createdAt: serverTimestamp(),
            helpers: {}
        };

        try {
            // Save SOS to database
            const sosRef = ref(this.db, `sosAlerts/${sosId}`);
            await set(sosRef, sosData);

            // Notify users who completed this day
            await this.notifyEligibleHelpers(dayNumber, sosId);

            return sosData;
        } catch (error) {
            console.error('Error broadcasting SOS:', error);
            return null;
        }
    }

    /**
     * Notify users who can help (completed the day)
     */
    async notifyEligibleHelpers(dayNumber, sosId) {
        // In a real implementation, this would trigger push notifications
        // or in-app notifications to users who have completed this day
        console.log(`Notifying helpers for Day ${dayNumber}, SOS: ${sosId}`);
    }

    /**
     * Listen to SOS alerts
     */
    listenToSOSAlerts() {
        if (!this.db) return;

        const sosRef = query(
            ref(this.db, 'sosAlerts'),
            orderByChild('status'),
            limitToLast(20)
        );

        const unsubscribe = onValue(sosRef, (snapshot) => {
            const alerts = [];
            snapshot.forEach((child) => {
                const alert = child.val();
                if (alert.status === 'open') {
                    alerts.push({
                        id: child.key,
                        ...alert
                    });
                }
            });

            this.localState.sosAlerts = alerts.reverse();

            if (this.callbacks.onSOSReceived) {
                this.callbacks.onSOSReceived(alerts);
            }
        });

        this.listeners.set('sos', unsubscribe);
    }

    /**
     * Respond to an SOS alert
     */
    async respondToSOS(sosId, message) {
        if (!this.db || !this.currentUser) return false;

        try {
            const helperRef = ref(this.db, `sosAlerts/${sosId}/helpers/${this.currentUser.uid}`);
            await set(helperRef, {
                userId: this.currentUser.uid,
                userName: this.currentUser.displayName,
                userPhoto: this.currentUser.photoURL,
                message,
                respondedAt: serverTimestamp()
            });

            return true;
        } catch (error) {
            console.error('Error responding to SOS:', error);
            return false;
        }
    }

    /**
     * Close an SOS alert (by creator)
     */
    async closeSOS(sosId) {
        if (!this.db || !this.currentUser) return false;

        try {
            const sosRef = ref(this.db, `sosAlerts/${sosId}`);
            const snapshot = await get(sosRef);
            
            if (snapshot.exists() && snapshot.val().userId === this.currentUser.uid) {
                await update(sosRef, { status: 'resolved' });
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error closing SOS:', error);
            return false;
        }
    }

    /**
     * Get active SOS alerts
     */
    getActiveSOSAlerts() {
        return [...this.localState.sosAlerts];
    }

    // ==========================================
    // CALLBACK REGISTRATION
    // ==========================================

    /**
     * Register callback for presence updates
     */
    onPresenceUpdate(callback) {
        this.callbacks.onPresenceUpdate = callback;
        // Immediately call with current state
        if (this.localState.onlineUsers.length > 0) {
            callback(this.localState.onlineUsers);
        }
    }

    /**
     * Register callback for room updates
     */
    onRoomUpdate(callback) {
        this.callbacks.onRoomUpdate = callback;
    }

    /**
     * Register callback for messages
     */
    onMessageReceived(callback) {
        this.callbacks.onMessageReceived = callback;
        // Immediately call with current messages
        if (this.localState.messages.length > 0) {
            callback(this.localState.messages, this.localState.currentRoom);
        }
    }

    /**
     * Register callback for SOS alerts
     */
    onSOSReceived(callback) {
        this.callbacks.onSOSReceived = callback;
        this.listenToSOSAlerts();
    }

    // ==========================================
    // DEMO MODE (Offline Fallback)
    // ==========================================

    /**
     * Generate demo users for offline mode
     */
    generateDemoUsers() {
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
        const statuses = ['online', 'online', 'online', 'coding', 'coding'];
        
        return names.slice(0, Math.floor(Math.random() * 5) + 3).map((name, i) => ({
            uid: `demo_${i}`,
            displayName: name,
            photoURL: `https://i.pravatar.cc/150?u=${name.toLowerCase()}`,
            status: statuses[Math.floor(Math.random() * statuses.length)],
            currentDay: Math.floor(Math.random() * 50) + 1,
            currentRoom: Math.random() > 0.5 ? 'general' : null,
            isCurrentUser: false
        }));
    }

    /**
     * Enable demo mode for offline testing
     */
    enableDemoMode() {
        this.localState.onlineUsers = this.generateDemoUsers();
        
        if (this.callbacks.onPresenceUpdate) {
            this.callbacks.onPresenceUpdate(this.localState.onlineUsers);
        }

        // Simulate periodic updates
        setInterval(() => {
            // Add/remove random user
            if (Math.random() > 0.7) {
                this.localState.onlineUsers = this.generateDemoUsers();
                if (this.callbacks.onPresenceUpdate) {
                    this.callbacks.onPresenceUpdate(this.localState.onlineUsers);
                }
            }
        }, 10000);
    }
}

// Singleton instance
const Arena = new ArenaService();

// Export for modules
export { Arena, ArenaService };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.Arena = Arena;
}
