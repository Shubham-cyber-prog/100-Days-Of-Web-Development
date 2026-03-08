/**
 * ChatBubbles Component - Real-time Chat UI
 * Message bubbles, user avatars, typing indicators, and SOS cards
 * Issue #1116
 */

class ChatBubbles {
    constructor() {
        this.injectStyles();
    }

    /**
     * Inject component styles
     */
    injectStyles() {
        if (document.getElementById('chat-bubbles-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'chat-bubbles-styles';
        styles.textContent = `
            /* Chat Container */
            .chat-container {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: var(--bg-secondary, #161b22);
                border-radius: 12px;
                overflow: hidden;
            }

            .chat-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 20px;
                background: var(--bg-tertiary, #21262d);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .chat-room-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .chat-room-icon {
                font-size: 24px;
            }

            .chat-room-name {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary, #e6edf3);
            }

            .chat-room-tag {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
            }

            .chat-member-count {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
                color: var(--text-secondary, #8b949e);
            }

            .chat-member-dot {
                width: 8px;
                height: 8px;
                background: #3fb950;
                border-radius: 50%;
            }

            /* Messages Area */
            .chat-messages {
                flex: 1;
                overflow-y: auto;
                padding: 16px;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .chat-messages::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
            }

            /* Message Bubble */
            .chat-message {
                display: flex;
                gap: 12px;
                max-width: 85%;
                animation: slideIn 0.2s ease-out;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .chat-message.own {
                flex-direction: row-reverse;
                margin-left: auto;
            }

            .chat-avatar {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                overflow: hidden;
                flex-shrink: 0;
            }

            .chat-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .chat-avatar-placeholder {
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #58a6ff 0%, #8857e4 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 600;
                color: white;
            }

            .chat-bubble {
                background: var(--bg-tertiary, #21262d);
                border-radius: 16px;
                padding: 10px 14px;
                position: relative;
            }

            .chat-message.own .chat-bubble {
                background: linear-gradient(135deg, #58a6ff 0%, #4493e6 100%);
            }

            .chat-bubble-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 4px;
            }

            .chat-sender {
                font-size: 12px;
                font-weight: 600;
                color: #58a6ff;
            }

            .chat-message.own .chat-sender {
                color: rgba(255, 255, 255, 0.9);
            }

            .chat-time {
                font-size: 10px;
                color: var(--text-secondary, #8b949e);
            }

            .chat-message.own .chat-time {
                color: rgba(255, 255, 255, 0.7);
            }

            .chat-text {
                font-size: 14px;
                line-height: 1.5;
                color: var(--text-primary, #e6edf3);
                word-wrap: break-word;
            }

            .chat-message.own .chat-text {
                color: white;
            }

            .chat-pending {
                opacity: 0.6;
            }

            .chat-failed {
                border: 1px solid #f85149;
            }

            .chat-failed::after {
                content: '⚠️ Failed';
                font-size: 10px;
                color: #f85149;
                display: block;
                margin-top: 4px;
            }

            /* Code Share Card */
            .chat-code-share {
                background: rgba(88, 166, 255, 0.1);
                border: 1px solid rgba(88, 166, 255, 0.3);
                border-radius: 8px;
                padding: 12px;
                margin-top: 8px;
            }

            .chat-code-header {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 8px;
            }

            .chat-code-icon {
                font-size: 16px;
            }

            .chat-code-label {
                font-size: 12px;
                font-weight: 600;
                color: #58a6ff;
            }

            .chat-code-link {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: #58a6ff;
                color: white;
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                text-decoration: none;
                transition: opacity 0.2s;
            }

            .chat-code-link:hover {
                opacity: 0.9;
            }

            /* Typing Indicator */
            .chat-typing {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                font-size: 13px;
                color: var(--text-secondary, #8b949e);
            }

            .typing-dots {
                display: flex;
                gap: 3px;
            }

            .typing-dot {
                width: 6px;
                height: 6px;
                background: var(--text-secondary, #8b949e);
                border-radius: 50%;
                animation: typingBounce 1.4s infinite ease-in-out;
            }

            .typing-dot:nth-child(1) { animation-delay: 0s; }
            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-4px); }
            }

            /* Chat Input */
            .chat-input-container {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 16px;
                background: var(--bg-tertiary, #21262d);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }

            .chat-input {
                flex: 1;
                background: var(--bg-secondary, #161b22);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 24px;
                padding: 12px 18px;
                font-size: 14px;
                color: var(--text-primary, #e6edf3);
                outline: none;
                transition: border-color 0.2s;
            }

            .chat-input:focus {
                border-color: #58a6ff;
            }

            .chat-input::placeholder {
                color: var(--text-secondary, #8b949e);
            }

            .chat-send-btn {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, #58a6ff 0%, #4493e6 100%);
                border: none;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: transform 0.1s, opacity 0.2s;
            }

            .chat-send-btn:hover {
                transform: scale(1.05);
            }

            .chat-send-btn:active {
                transform: scale(0.95);
            }

            .chat-send-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .chat-send-btn svg {
                width: 20px;
                height: 20px;
                fill: white;
            }

            .chat-actions {
                display: flex;
                gap: 8px;
            }

            .chat-action-btn {
                width: 36px;
                height: 36px;
                background: var(--bg-secondary, #161b22);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: border-color 0.2s;
                font-size: 16px;
            }

            .chat-action-btn:hover {
                border-color: #58a6ff;
            }

            /* SOS Alert Card */
            .sos-card {
                background: linear-gradient(135deg, rgba(248, 81, 73, 0.15) 0%, rgba(210, 153, 34, 0.15) 100%);
                border: 1px solid rgba(248, 81, 73, 0.3);
                border-radius: 12px;
                padding: 16px;
                margin: 8px 0;
                animation: sosGlow 2s infinite;
            }

            @keyframes sosGlow {
                0%, 100% { box-shadow: 0 0 5px rgba(248, 81, 73, 0.2); }
                50% { box-shadow: 0 0 20px rgba(248, 81, 73, 0.4); }
            }

            .sos-header {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .sos-icon {
                font-size: 24px;
                animation: sosPulse 1s infinite;
            }

            @keyframes sosPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }

            .sos-title {
                font-size: 14px;
                font-weight: 600;
                color: #f85149;
            }

            .sos-day {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
            }

            .sos-user {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 12px;
            }

            .sos-user-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                overflow: hidden;
            }

            .sos-user-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .sos-user-name {
                font-size: 13px;
                font-weight: 500;
                color: var(--text-primary, #e6edf3);
            }

            .sos-problem {
                font-size: 13px;
                color: var(--text-secondary, #8b949e);
                line-height: 1.5;
                margin-bottom: 12px;
                padding: 10px;
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
            }

            .sos-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-bottom: 12px;
            }

            .sos-tag {
                font-size: 11px;
                background: rgba(88, 166, 255, 0.2);
                color: #58a6ff;
                padding: 4px 8px;
                border-radius: 4px;
            }

            .sos-actions {
                display: flex;
                gap: 8px;
            }

            .sos-help-btn {
                flex: 1;
                padding: 10px 16px;
                background: #3fb950;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: opacity 0.2s;
            }

            .sos-help-btn:hover {
                opacity: 0.9;
            }

            .sos-skip-btn {
                padding: 10px 16px;
                background: transparent;
                color: var(--text-secondary, #8b949e);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                font-size: 13px;
                cursor: pointer;
                transition: border-color 0.2s;
            }

            .sos-skip-btn:hover {
                border-color: var(--text-secondary, #8b949e);
            }

            /* User Presence Card */
            .user-presence-card {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: var(--bg-tertiary, #21262d);
                border-radius: 10px;
                transition: background 0.2s;
            }

            .user-presence-card:hover {
                background: rgba(255, 255, 255, 0.05);
            }

            .user-presence-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                position: relative;
            }

            .user-presence-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .user-presence-status {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                border: 2px solid var(--bg-tertiary, #21262d);
            }

            .user-presence-status.online {
                background: #3fb950;
            }

            .user-presence-status.coding {
                background: #58a6ff;
            }

            .user-presence-status.away {
                background: #d29922;
            }

            .user-presence-info {
                flex: 1;
            }

            .user-presence-name {
                font-size: 14px;
                font-weight: 500;
                color: var(--text-primary, #e6edf3);
            }

            .user-presence-activity {
                font-size: 12px;
                color: var(--text-secondary, #8b949e);
            }

            .user-presence-day {
                font-size: 11px;
                background: rgba(88, 166, 255, 0.2);
                color: #58a6ff;
                padding: 4px 8px;
                border-radius: 4px;
            }

            /* Empty State */
            .chat-empty {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px;
                text-align: center;
            }

            .chat-empty-icon {
                font-size: 48px;
                margin-bottom: 16px;
            }

            .chat-empty-title {
                font-size: 16px;
                font-weight: 600;
                color: var(--text-primary, #e6edf3);
                margin-bottom: 8px;
            }

            .chat-empty-text {
                font-size: 13px;
                color: var(--text-secondary, #8b949e);
            }
        `;

        document.head.appendChild(styles);
    }

    // ==========================================
    // MESSAGE RENDERING
    // ==========================================

    /**
     * Render a single message bubble
     */
    renderMessage(message, isOwn = false) {
        const time = message.timestamp 
            ? new Date(typeof message.timestamp === 'number' ? message.timestamp : message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : '';

        const pendingClass = message.pending ? 'chat-pending' : '';
        const failedClass = message.failed ? 'chat-failed' : '';

        let codeShareHtml = '';
        if (message.type === 'code-share' && message.codeLink) {
            codeShareHtml = `
                <div class="chat-code-share">
                    <div class="chat-code-header">
                        <span class="chat-code-icon">💻</span>
                        <span class="chat-code-label">Shared Code</span>
                    </div>
                    <a href="${message.codeLink}" class="chat-code-link" target="_blank">
                        <span>View in Mission Control</span>
                        <span>→</span>
                    </a>
                </div>
            `;
        }

        return `
            <div class="chat-message ${isOwn ? 'own' : ''} ${pendingClass} ${failedClass}">
                <div class="chat-avatar">
                    ${message.userPhoto 
                        ? `<img src="${message.userPhoto}" alt="${message.userName}" />`
                        : `<div class="chat-avatar-placeholder">${(message.userName || 'U')[0].toUpperCase()}</div>`
                    }
                </div>
                <div class="chat-bubble">
                    ${!isOwn ? `
                        <div class="chat-bubble-header">
                            <span class="chat-sender">${message.userName || 'Anonymous'}</span>
                            <span class="chat-time">${time}</span>
                        </div>
                    ` : ''}
                    <div class="chat-text">${this.escapeHtml(message.text)}</div>
                    ${codeShareHtml}
                    ${isOwn ? `<span class="chat-time" style="display: block; text-align: right; margin-top: 4px;">${time}</span>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Render messages list
     */
    renderMessages(messages, currentUserId) {
        if (!messages || messages.length === 0) {
            return `
                <div class="chat-empty">
                    <span class="chat-empty-icon">💬</span>
                    <h3 class="chat-empty-title">No messages yet</h3>
                    <p class="chat-empty-text">Be the first to say something!</p>
                </div>
            `;
        }

        return messages.map(msg => 
            this.renderMessage(msg, msg.userId === currentUserId)
        ).join('');
    }

    /**
     * Render typing indicator
     */
    renderTypingIndicator(users = []) {
        if (!users || users.length === 0) return '';

        const names = users.slice(0, 2).map(u => u.displayName).join(', ');
        const suffix = users.length > 2 ? ` and ${users.length - 2} others` : '';

        return `
            <div class="chat-typing">
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
                <span>${names}${suffix} typing...</span>
            </div>
        `;
    }

    // ==========================================
    // SOS CARD RENDERING
    // ==========================================

    /**
     * Render SOS alert card
     */
    renderSOSCard(sos, onHelp, onSkip) {
        const helpersCount = Object.keys(sos.helpers || {}).length;

        return `
            <div class="sos-card" data-sos-id="${sos.id}">
                <div class="sos-header">
                    <span class="sos-icon">🆘</span>
                    <div>
                        <div class="sos-title">Help Needed!</div>
                        <div class="sos-day">Day ${sos.dayNumber}</div>
                    </div>
                </div>
                <div class="sos-user">
                    <div class="sos-user-avatar">
                        ${sos.userPhoto 
                            ? `<img src="${sos.userPhoto}" alt="${sos.userName}" />`
                            : `<div class="chat-avatar-placeholder">${(sos.userName || 'U')[0].toUpperCase()}</div>`
                        }
                    </div>
                    <span class="sos-user-name">${sos.userName}</span>
                </div>
                <div class="sos-problem">${this.escapeHtml(sos.problemDescription)}</div>
                ${sos.tags?.length ? `
                    <div class="sos-tags">
                        ${sos.tags.map(tag => `<span class="sos-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="sos-actions">
                    <button class="sos-help-btn" onclick="handleSOSHelp('${sos.id}')">
                        🤝 Offer Help ${helpersCount > 0 ? `(${helpersCount})` : ''}
                    </button>
                    <button class="sos-skip-btn" onclick="handleSOSSkip('${sos.id}')">
                        Skip
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render SOS list
     */
    renderSOSList(sosAlerts) {
        if (!sosAlerts || sosAlerts.length === 0) {
            return `
                <div class="chat-empty" style="padding: 20px;">
                    <span class="chat-empty-icon">✅</span>
                    <h3 class="chat-empty-title">No active SOS</h3>
                    <p class="chat-empty-text">Everyone's doing great!</p>
                </div>
            `;
        }

        return sosAlerts.map(sos => this.renderSOSCard(sos)).join('');
    }

    // ==========================================
    // USER PRESENCE RENDERING
    // ==========================================

    /**
     * Render user presence card
     */
    renderUserCard(user) {
        const statusClass = user.status || 'online';
        const activity = user.currentRoom 
            ? `In #${user.currentRoom}`
            : statusClass === 'coding' ? 'Coding...' : 'Online';

        return `
            <div class="user-presence-card" data-user-id="${user.uid}">
                <div class="user-presence-avatar">
                    ${user.photoURL 
                        ? `<img src="${user.photoURL}" alt="${user.displayName}" />`
                        : `<div class="chat-avatar-placeholder">${(user.displayName || 'U')[0].toUpperCase()}</div>`
                    }
                    <span class="user-presence-status ${statusClass}"></span>
                </div>
                <div class="user-presence-info">
                    <div class="user-presence-name">
                        ${user.displayName}
                        ${user.isCurrentUser ? '<span style="color: #58a6ff;"> (You)</span>' : ''}
                    </div>
                    <div class="user-presence-activity">${activity}</div>
                </div>
                <span class="user-presence-day">Day ${user.currentDay || '?'}</span>
            </div>
        `;
    }

    /**
     * Render users list
     */
    renderUsersList(users) {
        if (!users || users.length === 0) {
            return `
                <div class="chat-empty" style="padding: 20px;">
                    <span class="chat-empty-icon">👤</span>
                    <h3 class="chat-empty-title">No one online</h3>
                    <p class="chat-empty-text">You're the first one here!</p>
                </div>
            `;
        }

        return users.map(user => this.renderUserCard(user)).join('');
    }

    // ==========================================
    // CHAT INPUT
    // ==========================================

    /**
     * Render chat input area
     */
    renderChatInput(options = {}) {
        const { placeholder = 'Type a message...', showCodeShare = true } = options;

        return `
            <div class="chat-input-container">
                ${showCodeShare ? `
                    <div class="chat-actions">
                        <button class="chat-action-btn" id="share-code-btn" title="Share Code">
                            💻
                        </button>
                    </div>
                ` : ''}
                <input type="text" 
                       class="chat-input" 
                       id="chat-message-input"
                       placeholder="${placeholder}"
                       autocomplete="off" />
                <button class="chat-send-btn" id="chat-send-btn">
                    <svg viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
        `;
    }

    // ==========================================
    // FULL CHAT COMPONENT
    // ==========================================

    /**
     * Render complete chat component
     */
    renderChat(room, messages, currentUserId, options = {}) {
        const { memberCount = 0, typingUsers = [] } = options;

        return `
            <div class="chat-container">
                <div class="chat-header">
                    <div class="chat-room-info">
                        <span class="chat-room-icon">${room.icon || '💬'}</span>
                        <div>
                            <div class="chat-room-name">${room.name}</div>
                            <div class="chat-room-tag">${room.tag || ''}</div>
                        </div>
                    </div>
                    <div class="chat-member-count">
                        <span class="chat-member-dot"></span>
                        <span>${memberCount} online</span>
                    </div>
                </div>
                <div class="chat-messages" id="chat-messages">
                    ${this.renderMessages(messages, currentUserId)}
                    ${this.renderTypingIndicator(typingUsers)}
                </div>
                ${this.renderChatInput()}
            </div>
        `;
    }

    // ==========================================
    // UTILITIES
    // ==========================================

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Scroll chat to bottom
     */
    scrollToBottom(containerId = 'chat-messages') {
        const container = document.getElementById(containerId);
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    /**
     * Auto-resize textarea
     */
    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
}

// Singleton instance
const Chat = new ChatBubbles();

// Export for modules
export { Chat, ChatBubbles };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.Chat = Chat;
}
