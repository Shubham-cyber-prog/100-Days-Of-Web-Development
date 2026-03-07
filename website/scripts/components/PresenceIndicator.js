/**
 * PresenceIndicator - UI Component for showing real-time online activity
 * Displays "Who's coding this right now" on project cards and dashboard nodes.
 */

import { Arena } from '../core/arenaService.js';

export class PresenceIndicator {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            day: null,
            showAvatars: true,
            maxAvatars: 3,
            compact: false,
            ...options
        };

        this.element = null;
        this.init();
    }

    init() {
        if (!this.container) return;

        // Create element
        this.element = document.createElement('div');
        this.element.className = `presence-indicator ${this.options.compact ? 'presence-compact' : ''}`;
        this.container.appendChild(this.element);

        // Styling (if not in CSS)
        if (!document.getElementById('presence-indicator-styles')) {
            this.injectStyles();
        }

        // Listen for presence updates
        Arena.onPresenceUpdate((users) => {
            this.update(users);
        });
    }

    /**
     * Update the indicator with new presence data
     */
    update(allOnlineUsers) {
        if (!this.element) return;

        // Filter users by day if specified
        const relevantUsers = this.options.day
            ? allOnlineUsers.filter(u => u.currentDay === this.options.day)
            : allOnlineUsers;

        if (relevantUsers.length === 0) {
            this.element.innerHTML = '';
            this.element.style.display = 'none';
            return;
        }

        this.element.style.display = 'flex';

        // Build avatars list
        let avatarsHtml = '';
        if (this.options.showAvatars) {
            const displayUsers = relevantUsers.slice(0, this.options.maxAvatars);
            avatarsHtml = `
                <div class="presence-avatars">
                    ${displayUsers.map((user, i) => `
                        <div class="presence-avatar" style="z-index: ${this.options.maxAvatars - i}; transform: translateX(-${i * 8}px)">
                            <img src="${user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=random`}" 
                                 alt="${user.displayName}" 
                                 title="${user.displayName} is coding Day ${user.currentDay}">
                        </div>
                    `).join('')}
                    ${relevantUsers.length > this.options.maxAvatars ? `
                        <div class="presence-avatar-more" style="transform: translateX(-${this.options.maxAvatars * 8}px)">
                            +${relevantUsers.length - this.options.maxAvatars}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        const countText = this.options.compact ? '' : `${relevantUsers.length} online`;

        this.element.innerHTML = `
            ${avatarsHtml}
            ${countText ? `<span class="presence-text">${countText}</span>` : ''}
            <span class="presence-pulse"></span>
        `;
    }

    injectStyles() {
        const style = document.createElement('style');
        style.id = 'presence-indicator-styles';
        style.textContent = `
            .presence-indicator {
                display: flex;
                align-items: center;
                gap: 8px;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(4px);
                padding: 4px 8px;
                border-radius: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
                font-size: 11px;
                color: var(--text-secondary, #8b949e);
                pointer-events: none;
                transition: all 0.3s ease;
            }

            .presence-compact {
                padding: 2px;
                background: transparent;
                border: none;
                backdrop-filter: none;
            }

            .presence-avatars {
                display: flex;
                align-items: center;
                height: 20px;
            }

            .presence-avatar {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid #0d1117;
                overflow: hidden;
                transition: transform 0.2s;
            }

            .presence-avatar img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .presence-avatar-more {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: var(--bg-tertiary, #21262d);
                border: 2px solid #0d1117;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 8px;
                font-weight: 700;
                color: var(--text-primary, #e6edf3);
            }

            .presence-pulse {
                width: 6px;
                height: 6px;
                background: #3fb950;
                border-radius: 50%;
                box-shadow: 0 0 0 rgba(63, 185, 80, 0.4);
                animation: presence-pulse-anim 2s infinite;
            }

            @keyframes presence-pulse-anim {
                0% { box-shadow: 0 0 0 0 rgba(63, 185, 80, 0.7); }
                70% { box-shadow: 0 0 0 6px rgba(63, 185, 80, 0); }
                100% { box-shadow: 0 0 0 0 rgba(63, 185, 80, 0); }
            }
            
            .presence-text {
                white-space: nowrap;
            }
        `;
        document.head.appendChild(style);
    }
}
