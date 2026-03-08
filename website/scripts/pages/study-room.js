/**
 * Study Room Page Logic
 * Handles room creation, joining, real-time collaboration, and UI interactions
 */

import { roomService } from '../core/roomService.js';
import { RoomChat } from '../components/RoomChat.js';
import { ParticipantList } from '../components/ParticipantList.js';

// ============================================================
// STATE
// ============================================================

let currentRoom = null;
let roomChat = null;
let participantList = null;
let pomodoroTimer = null;
let pomodoroEndTime = null;

// ============================================================
// DOM ELEMENTS
// ============================================================

const elements = {
    // Lobby
    roomLobby: document.getElementById('roomLobby'),
    createRoomBtn: document.getElementById('createRoomBtn'),
    inviteCodeInput: document.getElementById('inviteCodeInput'),
    joinRoomBtn: document.getElementById('joinRoomBtn'),
    publicRoomsList: document.getElementById('publicRoomsList'),
    
    // Room View
    roomView: document.getElementById('roomView'),
    roomName: document.getElementById('roomName'),
    roomInviteCode: document.getElementById('roomInviteCode'),
    participantCount: document.getElementById('participantCount'),
    leaveRoomBtn: document.getElementById('leaveRoomBtn'),
    settingsBtn: document.getElementById('settingsBtn'),
    
    // Participants
    participantsList: document.getElementById('participantsList'),
    
    // Chat
    chatMessages: document.getElementById('chatMessages'),
    chatInput: document.getElementById('chatInput'),
    sendMessageBtn: document.getElementById('sendMessageBtn'),
    sendCodeBtn: document.getElementById('sendCodeBtn'),
    
    // Pomodoro
    timerDisplay: document.getElementById('timerDisplay'),
    timerLabel: document.getElementById('timerLabel'),
    timerProgress: document.getElementById('timerProgress'),
    pomodoroStartBtn: document.getElementById('pomodoroStartBtn'),
    pomodoroStopBtn: document.getElementById('pomodoroStopBtn'),
    breakBtn: document.getElementById('breakBtn'),
    
    // Working On
    daySelect: document.getElementById('daySelect'),
    updateStatusBtn: document.getElementById('updateStatusBtn'),
    currentWorkingOn: document.getElementById('currentWorkingOn'),
    workingOnText: document.getElementById('workingOnText'),
    clearStatusBtn: document.getElementById('clearStatusBtn'),
    
    // Activity
    activityFeed: document.getElementById('activityFeed'),
    
    // Modals
    createRoomModal: document.getElementById('createRoomModal'),
    createRoomForm: document.getElementById('createRoomForm'),
    closeCreateModal: document.getElementById('closeCreateModal'),
    cancelCreateBtn: document.getElementById('cancelCreateBtn'),
    
    codeSnippetModal: document.getElementById('codeSnippetModal'),
    closeCodeModal: document.getElementById('closeCodeModal'),
    cancelCodeBtn: document.getElementById('cancelCodeBtn'),
    shareCodeBtn: document.getElementById('shareCodeBtn'),
    codeLanguage: document.getElementById('codeLanguage'),
    codeContent: document.getElementById('codeContent'),
    
    // Connection
    connectionStatus: document.getElementById('connectionStatus')
};

// ============================================================
// INITIALIZATION
// ============================================================

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize room service
    const user = await initializeUser();
    await roomService.initialize(user);
    
    // Set up event listeners
    setupEventListeners();
    
    // Populate day select
    populateDaySelect();
    
    // Load public rooms
    loadPublicRooms();
    
    // Check for room in URL
    checkUrlForRoom();
});

/**
 * Initialize user from session/local storage
 */
async function initializeUser() {
    const isGuest = sessionStorage.getItem('authGuest') === 'true';
    const userName = localStorage.getItem('user_name') || 'Guest';
    const userId = localStorage.getItem('userId') || null;
    
    return {
        uid: userId || `guest_${Date.now()}`,
        displayName: userName,
        photoURL: null,
        isGuest: isGuest || !userId
    };
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Lobby actions
    elements.createRoomBtn?.addEventListener('click', openCreateRoomModal);
    elements.joinRoomBtn?.addEventListener('click', handleJoinRoom);
    elements.inviteCodeInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleJoinRoom();
    });
    
    // Room actions
    elements.leaveRoomBtn?.addEventListener('click', handleLeaveRoom);
    elements.roomInviteCode?.addEventListener('click', copyInviteCode);
    
    // Create room modal
    elements.closeCreateModal?.addEventListener('click', closeCreateRoomModal);
    elements.cancelCreateBtn?.addEventListener('click', closeCreateRoomModal);
    elements.createRoomForm?.addEventListener('submit', handleCreateRoom);
    
    // Code snippet modal
    elements.sendCodeBtn?.addEventListener('click', openCodeSnippetModal);
    elements.closeCodeModal?.addEventListener('click', closeCodeSnippetModal);
    elements.cancelCodeBtn?.addEventListener('click', closeCodeSnippetModal);
    elements.shareCodeBtn?.addEventListener('click', handleShareCode);
    
    // Chat
    elements.sendMessageBtn?.addEventListener('click', handleSendMessage);
    elements.chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });
    
    // Auto-resize chat input
    elements.chatInput?.addEventListener('input', autoResizeChatInput);
    
    // Pomodoro
    elements.pomodoroStartBtn?.addEventListener('click', handleStartPomodoro);
    elements.pomodoroStopBtn?.addEventListener('click', handleStopPomodoro);
    elements.breakBtn?.addEventListener('click', handleStartBreak);
    
    // Working on
    elements.updateStatusBtn?.addEventListener('click', handleUpdateWorkingOn);
    elements.clearStatusBtn?.addEventListener('click', handleClearWorkingOn);
    
    // Connection status
    window.addEventListener('roomConnectionChange', handleConnectionChange);
    
    // Modal overlays
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeCreateRoomModal();
            closeCodeSnippetModal();
        });
    });
    
    // Before unload
    window.addEventListener('beforeunload', () => {
        roomService.cleanup();
    });
}

// ============================================================
// PUBLIC ROOMS
// ============================================================

/**
 * Load and display public rooms
 */
async function loadPublicRooms() {
    try {
        const rooms = await roomService.getPublicRooms();
        renderPublicRooms(rooms);
    } catch (error) {
        console.error('Error loading public rooms:', error);
        elements.publicRoomsList.innerHTML = `
            <div class="error-state">
                <p>Failed to load rooms. <button onclick="loadPublicRooms()" class="btn-text">Retry</button></p>
            </div>
        `;
    }
}

/**
 * Render public rooms list
 */
function renderPublicRooms(rooms) {
    if (rooms.length === 0) {
        elements.publicRoomsList.innerHTML = `
            <div class="empty-state">
                <span class="empty-icon">🏠</span>
                <p>No public rooms available</p>
                <p class="text-secondary">Create one to get started!</p>
            </div>
        `;
        return;
    }
    
    elements.publicRoomsList.innerHTML = rooms.map(room => `
        <div class="room-card glass-panel" data-room-id="${room.id}">
            <div class="room-card-header">
                <h3>${escapeHtml(room.name)}</h3>
                <span class="participant-badge">${room.participantCount}/${room.settings?.maxParticipants || 10}</span>
            </div>
            <p class="room-card-desc">${escapeHtml(room.description || 'No description')}</p>
            <div class="room-card-footer">
                <span class="room-code">Code: ${room.inviteCode}</span>
                <button class="btn btn-primary btn-sm join-public-room" data-room-id="${room.id}">Join</button>
            </div>
        </div>
    `).join('');
    
    // Add click listeners
    document.querySelectorAll('.join-public-room').forEach(btn => {
        btn.addEventListener('click', () => joinRoomById(btn.dataset.roomId));
    });
}

// ============================================================
// ROOM MANAGEMENT
// ============================================================

/**
 * Open create room modal
 */
function openCreateRoomModal() {
    elements.createRoomModal.style.display = 'flex';
}

/**
 * Close create room modal
 */
function closeCreateRoomModal() {
    elements.createRoomModal.style.display = 'none';
    elements.createRoomForm.reset();
}

/**
 * Handle create room form submission
 */
async function handleCreateRoom(e) {
    e.preventDefault();
    
    const options = {
        name: document.getElementById('roomNameInput').value || undefined,
        description: document.getElementById('roomDescInput').value || undefined,
        pomodoroDuration: parseInt(document.getElementById('pomodoroDuration').value) || 25,
        breakDuration: parseInt(document.getElementById('breakDuration').value) || 5,
        isPrivate: document.getElementById('isPrivateRoom').checked
    };
    
    try {
        showLoading('Creating room...');
        const room = await roomService.createRoom(options);
        closeCreateRoomModal();
        enterRoom(room);
    } catch (error) {
        console.error('Error creating room:', error);
        showNotification('Failed to create room: ' + error.message, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Handle join room button click
 */
async function handleJoinRoom() {
    const code = elements.inviteCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        showNotification('Please enter an invite code', 'error');
        return;
    }
    
    if (code.length !== 6) {
        showNotification('Invite code must be 6 characters', 'error');
        return;
    }
    
    try {
        showLoading('Joining room...');
        const room = await roomService.joinRoom(code);
        enterRoom(room);
    } catch (error) {
        console.error('Error joining room:', error);
        showNotification(error.message, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Join room by ID
 */
async function joinRoomById(roomId) {
    try {
        showLoading('Joining room...');
        const room = await roomService.joinRoom(roomId);
        enterRoom(room);
    } catch (error) {
        console.error('Error joining room:', error);
        showNotification(error.message, 'error');
    } finally {
        hideLoading();
    }
}

/**
 * Enter and display room
 */
function enterRoom(room) {
    currentRoom = room;
    
    // Update URL
    history.pushState({ roomId: room.id }, '', `?room=${room.inviteCode}`);
    
    // Update UI
    elements.roomLobby.style.display = 'none';
    elements.roomView.style.display = 'block';
    
    elements.roomName.textContent = room.name;
    elements.roomInviteCode.querySelector('.code-value').textContent = room.inviteCode;
    
    // Initialize components
    initializeRoomComponents(room);
    
    // Set up listeners
    setupRoomListeners();
}

/**
 * Initialize room components
 */
function initializeRoomComponents(room) {
    // Initialize participant list
    participantList = new ParticipantList('participantsList', {
        currentUserId: roomService.getCurrentUser()?.uid
    });
    
    // Initialize chat
    roomChat = new RoomChat('chatMessages', {
        currentUserId: roomService.getCurrentUser()?.uid,
        onSendMessage: (content, type) => roomService.sendMessage(content, type)
    });
    
    // Set initial pomodoro duration
    updateTimerDisplay(room.settings?.pomodoroDuration * 60 || 25 * 60);
}

/**
 * Set up room event listeners
 */
function setupRoomListeners() {
    // Listen to participants
    roomService.listenToParticipants((participants) => {
        participantList?.update(participants);
        elements.participantCount.textContent = participants.length;
    });
    
    // Listen to messages
    roomService.listenToMessages((messages) => {
        roomChat?.updateMessages(messages);
    });
    
    // Listen to activity
    roomService.listenToActivity((activities) => {
        renderActivityFeed(activities);
    });
    
    // Listen to pomodoro
    roomService.listenToPomodoro((pomodoro) => {
        updatePomodoroUI(pomodoro);
    });
}

/**
 * Handle leave room
 */
async function handleLeaveRoom() {
    if (!confirm('Are you sure you want to leave this room?')) return;
    
    await roomService.leaveRoom();
    exitRoom();
}

/**
 * Exit room and return to lobby
 */
function exitRoom() {
    currentRoom = null;
    
    // Clear timer
    if (pomodoroTimer) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
    }
    
    // Reset URL
    history.pushState({}, '', window.location.pathname);
    
    // Update UI
    elements.roomView.style.display = 'none';
    elements.roomLobby.style.display = 'block';
    
    // Cleanup components
    participantList = null;
    roomChat = null;
    
    // Reload public rooms
    loadPublicRooms();
}

/**
 * Copy invite code to clipboard
 */
function copyInviteCode() {
    const code = elements.roomInviteCode.querySelector('.code-value').textContent;
    navigator.clipboard.writeText(code).then(() => {
        showNotification('Invite code copied!', 'success');
    });
}

/**
 * Check URL for room code
 */
function checkUrlForRoom() {
    const params = new URLSearchParams(window.location.search);
    const roomCode = params.get('room');
    
    if (roomCode) {
        elements.inviteCodeInput.value = roomCode;
        handleJoinRoom();
    }
}

// ============================================================
// CHAT
// ============================================================

/**
 * Handle send message
 */
async function handleSendMessage() {
    const content = elements.chatInput.value.trim();
    if (!content) return;
    
    try {
        await roomService.sendMessage(content, 'text');
        elements.chatInput.value = '';
        autoResizeChatInput();
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Failed to send message', 'error');
    }
}

/**
 * Auto resize chat input
 */
function autoResizeChatInput() {
    const textarea = elements.chatInput;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

/**
 * Open code snippet modal
 */
function openCodeSnippetModal() {
    elements.codeSnippetModal.style.display = 'flex';
}

/**
 * Close code snippet modal
 */
function closeCodeSnippetModal() {
    elements.codeSnippetModal.style.display = 'none';
    elements.codeContent.value = '';
}

/**
 * Handle share code
 */
async function handleShareCode() {
    const language = elements.codeLanguage.value;
    const code = elements.codeContent.value.trim();
    
    if (!code) {
        showNotification('Please enter some code', 'error');
        return;
    }
    
    const content = `\`\`\`${language}\n${code}\n\`\`\``;
    
    try {
        await roomService.sendMessage(content, 'code');
        closeCodeSnippetModal();
    } catch (error) {
        console.error('Error sharing code:', error);
        showNotification('Failed to share code', 'error');
    }
}

// ============================================================
// POMODORO
// ============================================================

/**
 * Handle start pomodoro
 */
async function handleStartPomodoro() {
    const duration = currentRoom?.settings?.pomodoroDuration || 25;
    await roomService.startPomodoro(duration, false);
}

/**
 * Handle stop pomodoro
 */
async function handleStopPomodoro() {
    await roomService.stopPomodoro();
}

/**
 * Handle start break
 */
async function handleStartBreak() {
    const duration = currentRoom?.settings?.breakDuration || 5;
    await roomService.startPomodoro(duration, true);
}

/**
 * Update pomodoro UI
 */
function updatePomodoroUI(pomodoro) {
    if (pomodoro.isRunning) {
        elements.pomodoroStartBtn.style.display = 'none';
        elements.pomodoroStopBtn.style.display = 'inline-flex';
        elements.breakBtn.disabled = true;
        
        elements.timerLabel.textContent = pomodoro.isBreak ? 'Break Time' : 'Focus Time';
        elements.timerLabel.className = `timer-label ${pomodoro.isBreak ? 'break' : 'focus'}`;
        
        // Start timer countdown
        startTimerCountdown(pomodoro.startTime, pomodoro.duration);
    } else {
        elements.pomodoroStartBtn.style.display = 'inline-flex';
        elements.pomodoroStopBtn.style.display = 'none';
        elements.breakBtn.disabled = false;
        
        // Reset timer
        if (pomodoroTimer) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = null;
        }
        
        const defaultDuration = (currentRoom?.settings?.pomodoroDuration || 25) * 60;
        updateTimerDisplay(defaultDuration);
        updateTimerProgress(1);
        elements.timerLabel.textContent = 'Focus Time';
    }
}

/**
 * Start timer countdown
 */
function startTimerCountdown(startTime, duration) {
    pomodoroEndTime = startTime + duration;
    
    if (pomodoroTimer) clearInterval(pomodoroTimer);
    
    pomodoroTimer = setInterval(() => {
        const remaining = Math.max(0, pomodoroEndTime - Date.now());
        const totalSeconds = Math.ceil(remaining / 1000);
        
        updateTimerDisplay(totalSeconds);
        updateTimerProgress(remaining / duration);
        
        if (remaining <= 0) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = null;
            playTimerSound();
            showNotification('Timer completed!', 'success');
        }
    }, 1000);
}

/**
 * Update timer display
 */
function updateTimerDisplay(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    elements.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

/**
 * Update timer progress circle
 */
function updateTimerProgress(progress) {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference * (1 - progress);
    elements.timerProgress.style.strokeDasharray = circumference;
    elements.timerProgress.style.strokeDashoffset = offset;
}

/**
 * Play timer completion sound
 */
function playTimerSound() {
    // Simple beep using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);
    } catch (e) {
        console.log('Audio not available');
    }
}

// ============================================================
// WORKING ON STATUS
// ============================================================

/**
 * Populate day select dropdown
 */
function populateDaySelect() {
    const select = elements.daySelect;
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Day ${i}`;
        select.appendChild(option);
    }
}

/**
 * Handle update working on status
 */
async function handleUpdateWorkingOn() {
    const day = parseInt(elements.daySelect.value);
    if (!day) {
        showNotification('Please select a day', 'error');
        return;
    }
    
    await roomService.updateWorkingOn(day, `Day ${day} Project`);
    
    elements.currentWorkingOn.style.display = 'flex';
    elements.workingOnText.textContent = `Day ${day}`;
    elements.daySelect.value = '';
}

/**
 * Handle clear working on status
 */
async function handleClearWorkingOn() {
    await roomService.updateWorkingOn(null);
    elements.currentWorkingOn.style.display = 'none';
}

// ============================================================
// ACTIVITY FEED
// ============================================================

/**
 * Render activity feed
 */
function renderActivityFeed(activities) {
    const feed = elements.activityFeed;
    
    if (activities.length === 0) {
        feed.innerHTML = '<div class="activity-empty">No activity yet</div>';
        return;
    }
    
    feed.innerHTML = activities.slice(-20).reverse().map(activity => {
        const icon = getActivityIcon(activity.type);
        const text = getActivityText(activity);
        const time = formatRelativeTime(activity.timestamp);
        
        return `
            <div class="activity-item ${activity.type}">
                <span class="activity-icon">${icon}</span>
                <span class="activity-text">${text}</span>
                <span class="activity-time">${time}</span>
            </div>
        `;
    }).join('');
    
    // Scroll to top
    feed.scrollTop = 0;
}

/**
 * Get activity icon
 */
function getActivityIcon(type) {
    const icons = {
        'room_created': '🎉',
        'user_joined': '👋',
        'user_left': '👋',
        'started_working': '💻',
        'completed_day': '✅',
        'pomodoro_started': '🍅',
        'pomodoro_stopped': '⏸️',
        'break_started': '☕'
    };
    return icons[type] || '📢';
}

/**
 * Get activity text
 */
function getActivityText(activity) {
    const name = escapeHtml(activity.userName || 'Someone');
    
    switch (activity.type) {
        case 'room_created':
            return `<strong>${name}</strong> created this room`;
        case 'user_joined':
            return `<strong>${name}</strong> joined the room`;
        case 'user_left':
            return `<strong>${name}</strong> left the room`;
        case 'started_working':
            return `<strong>${name}</strong> started working on Day ${activity.day}`;
        case 'completed_day':
            return `<strong>${name}</strong> completed Day ${activity.day}! 🎉`;
        case 'pomodoro_started':
            return `<strong>${name}</strong> started a ${activity.duration}min focus session`;
        case 'pomodoro_stopped':
            return `<strong>${name}</strong> stopped the timer`;
        case 'break_started':
            return `<strong>${name}</strong> started a break`;
        default:
            return `Activity by <strong>${name}</strong>`;
    }
}

// ============================================================
// CONNECTION STATUS
// ============================================================

/**
 * Handle connection status change
 */
function handleConnectionChange(event) {
    const { connected } = event.detail;
    
    if (connected) {
        elements.connectionStatus.style.display = 'none';
    } else {
        elements.connectionStatus.style.display = 'flex';
    }
}

// ============================================================
// UTILITIES
// ============================================================

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Show loading overlay
 */
function showLoading(message = 'Loading...') {
    let loader = document.getElementById('loadingOverlay');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loadingOverlay';
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="loading-content">
                <div class="spinner"></div>
                <span class="loading-text">${message}</span>
            </div>
        `;
        document.body.appendChild(loader);
    } else {
        loader.querySelector('.loading-text').textContent = message;
        loader.style.display = 'flex';
    }
}

/**
 * Hide loading overlay
 */
function hideLoading() {
    const loader = document.getElementById('loadingOverlay');
    if (loader) {
        loader.style.display = 'none';
    }
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format relative time
 */
function formatRelativeTime(timestamp) {
    if (!timestamp) return '';
    
    const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
}

// Make loadPublicRooms available globally for retry button
window.loadPublicRooms = loadPublicRooms;
