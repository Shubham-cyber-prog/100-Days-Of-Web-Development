/**
 * Arena Page Orchestrator
 * Coordinates Arena service with Chat UI components
 * Issue #1116
 */

import { Arena } from '../core/arenaService.js';
import { Chat } from '../components/ChatBubbles.js';

class ArenaPage {
    constructor() {
        this.arena = Arena;
        this.chat = Chat;
        this.currentRoom = null;
        this.currentUserId = null;
        this.selectedTags = [];
        this.isOnline = false;

        this.init();
    }

    /**
     * Initialize the arena page
     */
    async init() {
        // Wait for arena service to initialize
        await this.waitForService();

        // Get current user ID
        this.currentUserId = this.arena.currentUser?.uid || 'demo_user';

        // Setup callbacks
        this.setupCallbacks();

        // Load initial data
        await this.loadRooms();

        // Setup event listeners
        this.setupEventListeners();

        // Enable demo mode if offline
        if (!this.isOnline) {
            this.arena.enableDemoMode();
        }

        console.log('ArenaPage initialized');
    }

    /**
     * Wait for arena service to be ready
     */
    async waitForService() {
        return new Promise((resolve) => {
            let attempts = 0;
            const check = () => {
                if (this.arena.db || attempts > 10) {
                    this.isOnline = !!this.arena.db;
                    resolve();
                } else {
                    attempts++;
                    setTimeout(check, 500);
                }
            };
            check();
        });
    }

    /**
     * Setup arena service callbacks
     */
    setupCallbacks() {
        // Presence updates
        this.arena.onPresenceUpdate((users) => {
            this.renderOnlineUsers(users);
            this.updateOnlineCount(users.length);
        });

        // Message updates
        this.arena.onMessageReceived((messages, roomId) => {
            if (roomId === this.currentRoom?.id) {
                this.renderMessages(messages);
            }
        });

        // SOS alerts
        this.arena.onSOSReceived((alerts) => {
            this.renderSOSAlerts(alerts);
        });
    }

    /**
     * Load available war rooms
     */
    async loadRooms() {
        const roomsList = document.getElementById('rooms-list');
        
        try {
            const rooms = await this.arena.getWarRooms();
            this.renderRooms(rooms);
        } catch (error) {
            console.error('Error loading rooms:', error);
            roomsList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
                    <p>Unable to load rooms</p>
                </div>
            `;
        }
    }

    /**
     * Render war rooms list
     */
    renderRooms(rooms) {
        const roomsList = document.getElementById('rooms-list');
        
        roomsList.innerHTML = rooms.map(room => `
            <div class="room-item ${this.currentRoom?.id === room.id ? 'active' : ''}" 
                 data-room-id="${room.id}"
                 onclick="joinRoom('${room.id}')">
                <span class="room-icon">${room.icon}</span>
                <div class="room-info">
                    <div class="room-name">${room.name}</div>
                    <div class="room-description">${room.description}</div>
                </div>
                <span class="room-count">${room.memberCount || 0}</span>
            </div>
        `).join('');
    }

    /**
     * Join a war room
     */
    async joinRoom(roomId) {
        const rooms = await this.arena.getWarRooms();
        const room = rooms.find(r => r.id === roomId);
        
        if (!room) {
            console.error('Room not found:', roomId);
            return;
        }

        // Join room in service
        const success = await this.arena.joinRoom(roomId);
        
        if (success || !this.isOnline) {
            this.currentRoom = room;
            
            // Update room list UI
            document.querySelectorAll('.room-item').forEach(el => {
                el.classList.toggle('active', el.dataset.roomId === roomId);
            });

            // Render chat UI
            this.renderChatUI(room);
        }
    }

    /**
     * Leave current room
     */
    async leaveRoom() {
        if (this.currentRoom) {
            await this.arena.leaveRoom(this.currentRoom.id);
            this.currentRoom = null;
            
            // Show welcome screen
            this.renderWelcome();
            
            // Update room list
            document.querySelectorAll('.room-item').forEach(el => {
                el.classList.remove('active');
            });
        }
    }

    /**
     * Render welcome screen
     */
    renderWelcome() {
        const mainChat = document.getElementById('main-chat');
        mainChat.innerHTML = `
            <div class="chat-welcome">
                <span class="welcome-icon">🌐</span>
                <h2 class="welcome-title">Welcome to Global Arena</h2>
                <p class="welcome-text">
                    Join a War Room to connect with fellow developers, share code, 
                    and collaborate in real-time. Select a room from the sidebar to get started!
                </p>
                <div class="welcome-actions">
                    <button class="welcome-btn welcome-btn-primary" onclick="joinRoom('general')">
                        💬 Join General Chat
                    </button>
                    <button class="welcome-btn welcome-btn-secondary" onclick="showSOSModal()">
                        🆘 Request Help
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render chat UI for a room
     */
    renderChatUI(room) {
        const mainChat = document.getElementById('main-chat');
        const messages = this.arena.localState.messages || [];
        const memberCount = this.arena.getOnlineCount();

        mainChat.innerHTML = this.chat.renderChat(room, messages, this.currentUserId, {
            memberCount
        });

        // Focus input
        setTimeout(() => {
            const input = document.getElementById('chat-message-input');
            if (input) input.focus();
        }, 100);

        // Setup chat input handlers
        this.setupChatInputHandlers();
    }

    /**
     * Render messages in chat
     */
    renderMessages(messages) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const wasAtBottom = this.isScrolledToBottom(messagesContainer);

        messagesContainer.innerHTML = this.chat.renderMessages(messages, this.currentUserId);

        // Auto-scroll if was at bottom
        if (wasAtBottom) {
            this.chat.scrollToBottom();
        }
    }

    /**
     * Check if chat is scrolled to bottom
     */
    isScrolledToBottom(element) {
        return element.scrollHeight - element.clientHeight <= element.scrollTop + 50;
    }

    /**
     * Setup chat input event handlers
     */
    setupChatInputHandlers() {
        const input = document.getElementById('chat-message-input');
        const sendBtn = document.getElementById('chat-send-btn');
        const shareCodeBtn = document.getElementById('share-code-btn');

        if (input && sendBtn) {
            // Send on Enter
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Send button click
            sendBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        if (shareCodeBtn) {
            shareCodeBtn.addEventListener('click', () => {
                this.showCodeShareDialog();
            });
        }
    }

    /**
     * Send a message
     */
    async sendMessage() {
        const input = document.getElementById('chat-message-input');
        if (!input || !input.value.trim()) return;

        const text = input.value.trim();
        input.value = '';
        input.focus();

        await this.arena.sendMessage(text);
    }

    /**
     * Show code share dialog
     */
    showCodeShareDialog() {
        const projectId = prompt('Enter your project ID to share:');
        if (projectId) {
            this.arena.shareCodeLink(projectId, `Check out my Day ${projectId} project!`);
        }
    }

    /**
     * Render online users
     */
    renderOnlineUsers(users) {
        const usersList = document.getElementById('users-list');
        if (!usersList) return;

        usersList.innerHTML = this.chat.renderUsersList(users);
    }

    /**
     * Update online count display
     */
    updateOnlineCount(count) {
        const countEl = document.getElementById('online-count');
        if (countEl) {
            countEl.textContent = `${count} online`;
        }
    }

    /**
     * Render SOS alerts
     */
    renderSOSAlerts(alerts) {
        const sosList = document.getElementById('sos-list');
        const sosCount = document.getElementById('sos-count');
        
        if (sosList) {
            sosList.innerHTML = this.chat.renderSOSList(alerts);
        }
        
        if (sosCount) {
            sosCount.textContent = alerts.length;
        }
    }

    /**
     * Show SOS modal
     */
    showSOSModal() {
        const modal = document.getElementById('sos-modal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    /**
     * Hide SOS modal
     */
    hideSOSModal() {
        const modal = document.getElementById('sos-modal');
        if (modal) {
            modal.classList.remove('active');
            // Reset form
            document.getElementById('sos-day').value = '';
            document.getElementById('sos-problem').value = '';
            this.selectedTags = [];
            document.querySelectorAll('.form-tag').forEach(el => {
                el.classList.remove('selected');
            });
        }
    }

    /**
     * Broadcast SOS
     */
    async broadcastSOS() {
        const dayInput = document.getElementById('sos-day');
        const problemInput = document.getElementById('sos-problem');
        
        const dayNumber = parseInt(dayInput?.value);
        const problem = problemInput?.value.trim();

        if (!dayNumber || dayNumber < 1 || dayNumber > 100) {
            alert('Please enter a valid day number (1-100)');
            return;
        }

        if (!problem) {
            alert('Please describe your problem');
            return;
        }

        const result = await this.arena.broadcastSOS(dayNumber, problem, this.selectedTags);
        
        if (result) {
            this.hideSOSModal();
            alert('SOS sent! Help is on the way 🚀');
        } else {
            alert('Failed to send SOS. Please try again.');
        }
    }

    /**
     * Handle SOS help
     */
    async handleSOSHelp(sosId) {
        const message = prompt('Leave a helpful message:');
        if (message) {
            const success = await this.arena.respondToSOS(sosId, message);
            if (success) {
                alert('Thanks for helping! Your response has been sent.');
            }
        }
    }

    /**
     * Handle SOS skip
     */
    handleSOSSkip(sosId) {
        const card = document.querySelector(`[data-sos-id="${sosId}"]`);
        if (card) {
            card.style.display = 'none';
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Tag selection
        document.querySelectorAll('.form-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const tagName = tag.dataset.tag;
                tag.classList.toggle('selected');
                
                if (tag.classList.contains('selected')) {
                    this.selectedTags.push(tagName);
                } else {
                    this.selectedTags = this.selectedTags.filter(t => t !== tagName);
                }
            });
        });

        // Mobile tabs
        document.querySelectorAll('.mobile-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                
                // Update active tab
                document.querySelectorAll('.mobile-tab').forEach(t => {
                    t.classList.toggle('active', t === tab);
                });

                // Show corresponding section (simplified for demo)
                console.log('Switch to tab:', tabName);
            });
        });

        // Close modal on overlay click
        document.getElementById('sos-modal')?.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.hideSOSModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSOSModal();
            }
        });
    }
}

// Global functions for onclick handlers
window.joinRoom = async (roomId) => {
    if (window.arenaPage) {
        await window.arenaPage.joinRoom(roomId);
    }
};

window.showSOSModal = () => {
    if (window.arenaPage) {
        window.arenaPage.showSOSModal();
    }
};

window.hideSOSModal = () => {
    if (window.arenaPage) {
        window.arenaPage.hideSOSModal();
    }
};

window.broadcastSOS = async () => {
    if (window.arenaPage) {
        await window.arenaPage.broadcastSOS();
    }
};

window.handleSOSHelp = async (sosId) => {
    if (window.arenaPage) {
        await window.arenaPage.handleSOSHelp(sosId);
    }
};

window.handleSOSSkip = (sosId) => {
    if (window.arenaPage) {
        window.arenaPage.handleSOSSkip(sosId);
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    window.arenaPage = new ArenaPage();
});

export { ArenaPage };
