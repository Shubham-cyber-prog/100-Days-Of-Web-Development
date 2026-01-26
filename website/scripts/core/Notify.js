/**
 * Notify - Unified Notification Service
 * System-wide toast notifications with consistent styling and animations
 * 
 * @version 1.0.0
 * @author 100 Days of Web Dev Team
 */

class NotificationService {
    constructor() {
        this.container = null;
        this.queue = [];
        this.activeNotifications = new Map();
        this.maxNotifications = 5;
        this.defaultDuration = 4000;
        this.position = 'top-right'; // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
        
        // Notification types with icons and colors
        this.types = {
            success: {
                icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
                color: '#10B981',
                bgColor: 'rgba(16, 185, 129, 0.15)'
            },
            error: {
                icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`,
                color: '#EF4444',
                bgColor: 'rgba(239, 68, 68, 0.15)'
            },
            warning: {
                icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
                color: '#F59E0B',
                bgColor: 'rgba(245, 158, 11, 0.15)'
            },
            info: {
                icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
                color: '#3B82F6',
                bgColor: 'rgba(59, 130, 246, 0.15)'
            },
            loading: {
                icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="notify-spinner"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`,
                color: '#8B5CF6',
                bgColor: 'rgba(139, 92, 246, 0.15)'
            }
        };

        // Initialize container
        this.init();
    }

    /**
     * Initialize notification container
     */
    init() {
        if (this.container) return;

        // Create container
        this.container = document.createElement('div');
        this.container.id = 'notify-container';
        this.container.className = `notify-container notify-${this.position}`;
        
        // Inject styles if not already present
        if (!document.getElementById('notify-styles')) {
            this.injectStyles();
        }

        // Add to DOM when ready
        if (document.body) {
            document.body.appendChild(this.container);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(this.container);
            });
        }

        console.log('🔔 NotificationService: Initialized');
    }

    /**
     * Inject notification styles into document
     */
    injectStyles() {
        const style = document.createElement('style');
        style.id = 'notify-styles';
        style.textContent = `
            /* Notification Container */
            .notify-container {
                position: fixed;
                z-index: 99999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                pointer-events: none;
                max-width: 420px;
                width: 100%;
                padding: 16px;
                box-sizing: border-box;
            }

            /* Position variants */
            .notify-top-right { top: 0; right: 0; align-items: flex-end; }
            .notify-top-left { top: 0; left: 0; align-items: flex-start; }
            .notify-top-center { top: 0; left: 50%; transform: translateX(-50%); align-items: center; }
            .notify-bottom-right { bottom: 0; right: 0; align-items: flex-end; flex-direction: column-reverse; }
            .notify-bottom-left { bottom: 0; left: 0; align-items: flex-start; flex-direction: column-reverse; }
            .notify-bottom-center { bottom: 0; left: 50%; transform: translateX(-50%); align-items: center; flex-direction: column-reverse; }

            /* Notification Toast */
            .notify-toast {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px;
                border-radius: 12px;
                background: var(--notify-bg, rgba(17, 17, 17, 0.95));
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid var(--notify-border, rgba(255, 255, 255, 0.1));
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05);
                pointer-events: auto;
                max-width: 100%;
                min-width: 300px;
                transform-origin: top right;
                animation: notifySlideIn 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
            }

            .notify-toast.notify-removing {
                animation: notifySlideOut 0.25s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
            }

            /* Icon Container */
            .notify-icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                padding: 2px;
            }

            .notify-icon svg {
                width: 20px;
                height: 20px;
            }

            /* Content */
            .notify-content {
                flex: 1;
                min-width: 0;
            }

            .notify-title {
                font-weight: 600;
                font-size: 14px;
                color: var(--notify-text, #ededed);
                margin-bottom: 2px;
                line-height: 1.4;
            }

            .notify-message {
                font-size: 13px;
                color: var(--notify-text-muted, #a1a1aa);
                line-height: 1.5;
                word-break: break-word;
            }

            /* Close Button */
            .notify-close {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                background: transparent;
                color: var(--notify-text-muted, #a1a1aa);
                cursor: pointer;
                border-radius: 6px;
                transition: all 0.2s;
                padding: 0;
            }

            .notify-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--notify-text, #ededed);
            }

            /* Progress Bar */
            .notify-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                background: var(--notify-accent, #3B82F6);
                border-radius: 0 0 12px 12px;
                animation: notifyProgress var(--notify-duration, 4000ms) linear forwards;
            }

            /* Action Buttons */
            .notify-actions {
                display: flex;
                gap: 8px;
                margin-top: 12px;
            }

            .notify-action {
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s;
                border: none;
            }

            .notify-action-primary {
                background: var(--notify-accent, #3B82F6);
                color: white;
            }

            .notify-action-primary:hover {
                filter: brightness(1.1);
            }

            .notify-action-secondary {
                background: rgba(255, 255, 255, 0.1);
                color: var(--notify-text, #ededed);
            }

            .notify-action-secondary:hover {
                background: rgba(255, 255, 255, 0.15);
            }

            /* Spinner Animation */
            .notify-spinner {
                animation: notifySpin 1s linear infinite;
            }

            /* Animations */
            @keyframes notifySlideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }

            @keyframes notifySlideOut {
                from {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateX(100%) scale(0.9);
                }
            }

            @keyframes notifyProgress {
                from { width: 100%; }
                to { width: 0%; }
            }

            @keyframes notifySpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Left-side animations */
            .notify-top-left .notify-toast,
            .notify-bottom-left .notify-toast {
                transform-origin: top left;
            }

            .notify-top-left .notify-toast,
            .notify-bottom-left .notify-toast {
                animation-name: notifySlideInLeft;
            }

            .notify-top-left .notify-toast.notify-removing,
            .notify-bottom-left .notify-toast.notify-removing {
                animation-name: notifySlideOutLeft;
            }

            @keyframes notifySlideInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-100%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }

            @keyframes notifySlideOutLeft {
                from {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateX(-100%) scale(0.9);
                }
            }

            /* Center animations */
            .notify-top-center .notify-toast,
            .notify-bottom-center .notify-toast {
                transform-origin: center;
            }

            .notify-top-center .notify-toast,
            .notify-bottom-center .notify-toast {
                animation-name: notifySlideInCenter;
            }

            .notify-top-center .notify-toast.notify-removing,
            .notify-bottom-center .notify-toast.notify-removing {
                animation-name: notifySlideOutCenter;
            }

            @keyframes notifySlideInCenter {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            @keyframes notifySlideOutCenter {
                from {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.9);
                }
            }

            /* Light theme support */
            [data-theme="light"] .notify-toast,
            .light-mode .notify-toast {
                --notify-bg: rgba(255, 255, 255, 0.98);
                --notify-border: rgba(0, 0, 0, 0.1);
                --notify-text: #09090b;
                --notify-text-muted: #52525b;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
            }

            /* Mobile responsive */
            @media (max-width: 480px) {
                .notify-container {
                    max-width: 100%;
                    padding: 12px;
                }

                .notify-toast {
                    min-width: unset;
                }

                .notify-top-center,
                .notify-bottom-center {
                    left: 0;
                    transform: none;
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Generate unique notification ID
     */
    generateId() {
        return 'notify_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Create and show a notification
     * @param {Object} options - Notification options
     * @returns {string} Notification ID
     */
    show(options = {}) {
        const {
            type = 'info',
            title = '',
            message = '',
            duration = this.defaultDuration,
            closable = true,
            showProgress = true,
            actions = [],
            onClose = null,
            id = this.generateId()
        } = options;

        // Check if we need to remove old notifications
        if (this.activeNotifications.size >= this.maxNotifications) {
            const oldestId = this.activeNotifications.keys().next().value;
            this.dismiss(oldestId);
        }

        const typeConfig = this.types[type] || this.types.info;

        // Create notification element
        const toast = document.createElement('div');
        toast.id = id;
        toast.className = 'notify-toast';
        toast.style.setProperty('--notify-accent', typeConfig.color);
        toast.style.setProperty('--notify-duration', `${duration}ms`);

        // Build HTML
        let actionsHtml = '';
        if (actions.length > 0) {
            actionsHtml = `
                <div class="notify-actions">
                    ${actions.map((action, i) => `
                        <button class="notify-action notify-action-${action.primary ? 'primary' : 'secondary'}" data-action-index="${i}">
                            ${action.label}
                        </button>
                    `).join('')}
                </div>
            `;
        }

        toast.innerHTML = `
            <div class="notify-icon" style="background: ${typeConfig.bgColor}; color: ${typeConfig.color}">
                ${typeConfig.icon}
            </div>
            <div class="notify-content">
                ${title ? `<div class="notify-title">${this.escapeHtml(title)}</div>` : ''}
                ${message ? `<div class="notify-message">${this.escapeHtml(message)}</div>` : ''}
                ${actionsHtml}
            </div>
            ${closable ? `
                <button class="notify-close" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            ` : ''}
            ${showProgress && duration > 0 && type !== 'loading' ? '<div class="notify-progress"></div>' : ''}
        `;

        // Add event listeners
        if (closable) {
            const closeBtn = toast.querySelector('.notify-close');
            closeBtn?.addEventListener('click', () => this.dismiss(id));
        }

        // Action button handlers
        actions.forEach((action, index) => {
            const btn = toast.querySelector(`[data-action-index="${index}"]`);
            btn?.addEventListener('click', () => {
                if (action.onClick) action.onClick();
                if (action.closeOnClick !== false) this.dismiss(id);
            });
        });

        // Store notification data
        this.activeNotifications.set(id, {
            element: toast,
            timeout: null,
            onClose
        });

        // Add to container
        this.container.appendChild(toast);

        // Auto-dismiss (except for loading type)
        if (duration > 0 && type !== 'loading') {
            const timeout = setTimeout(() => this.dismiss(id), duration);
            this.activeNotifications.get(id).timeout = timeout;
        }

        return id;
    }

    /**
     * Dismiss a notification
     * @param {string} id - Notification ID
     */
    dismiss(id) {
        const notification = this.activeNotifications.get(id);
        if (!notification) return;

        const { element, timeout, onClose } = notification;

        // Clear auto-dismiss timeout
        if (timeout) clearTimeout(timeout);

        // Add removing class for animation
        element.classList.add('notify-removing');

        // Remove after animation
        setTimeout(() => {
            element.remove();
            this.activeNotifications.delete(id);
            if (onClose) onClose();
        }, 250);
    }

    /**
     * Dismiss all notifications
     */
    dismissAll() {
        this.activeNotifications.forEach((_, id) => this.dismiss(id));
    }

    /**
     * Update a notification (useful for loading -> success/error transitions)
     * @param {string} id - Notification ID
     * @param {Object} options - New options
     */
    update(id, options = {}) {
        this.dismiss(id);
        return this.show({ ...options, id: this.generateId() });
    }

    // ========================================
    // CONVENIENCE METHODS
    // ========================================

    /**
     * Show success notification
     */
    success(message, options = {}) {
        return this.show({ type: 'success', message, ...options });
    }

    /**
     * Show error notification
     */
    error(message, options = {}) {
        return this.show({ type: 'error', message, duration: 6000, ...options });
    }

    /**
     * Show warning notification
     */
    warning(message, options = {}) {
        return this.show({ type: 'warning', message, duration: 5000, ...options });
    }

    /**
     * Show info notification
     */
    info(message, options = {}) {
        return this.show({ type: 'info', message, ...options });
    }

    /**
     * Show loading notification
     */
    loading(message, options = {}) {
        return this.show({ type: 'loading', message, duration: 0, closable: false, showProgress: false, ...options });
    }

    /**
     * Promise-based notification
     * Shows loading, then success/error based on promise result
     * @param {Promise} promise - Promise to track
     * @param {Object} messages - { loading, success, error }
     */
    async promise(promise, messages = {}) {
        const {
            loading = 'Loading...',
            success = 'Success!',
            error = 'Something went wrong'
        } = messages;

        const loadingId = this.loading(loading);

        try {
            const result = await promise;
            this.dismiss(loadingId);
            this.success(typeof success === 'function' ? success(result) : success);
            return result;
        } catch (err) {
            this.dismiss(loadingId);
            this.error(typeof error === 'function' ? error(err) : error);
            throw err;
        }
    }

    /**
     * Confirmation notification with actions
     */
    confirm(message, options = {}) {
        const { onConfirm, onCancel, confirmLabel = 'Confirm', cancelLabel = 'Cancel' } = options;
        
        return this.show({
            type: 'warning',
            message,
            duration: 0,
            closable: false,
            showProgress: false,
            actions: [
                { label: confirmLabel, primary: true, onClick: onConfirm },
                { label: cancelLabel, onClick: onCancel }
            ],
            ...options
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Set notification position
     * @param {string} position - Position value
     */
    setPosition(position) {
        const validPositions = ['top-right', 'top-left', 'top-center', 'bottom-right', 'bottom-left', 'bottom-center'];
        if (validPositions.includes(position)) {
            this.position = position;
            if (this.container) {
                this.container.className = `notify-container notify-${position}`;
            }
        }
    }
}

// Create singleton instance
const Notify = new NotificationService();

// Export for modules
export { Notify, NotificationService };

// Attach to window for non-module scripts
window.Notify = Notify;
window.NotificationService = NotificationService;

console.log('🔔 Notify: Module loaded');
