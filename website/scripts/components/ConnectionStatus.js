/**
 * Connection Status Component
 * Displays an offline indicator and handles online/offline events
 */

export class ConnectionStatus {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.createUI();
        this.addStyles();
        this.attachListeners();
        this.updateStatus();
    }

    createUI() {
        this.container = document.createElement('div');
        this.container.id = 'connection-status';
        this.container.className = 'connection-status hidden';
        this.container.innerHTML = `
            <div class="status-content">
                <span class="status-icon">📡</span>
                <span class="status-text">You are currently offline. Progress will sync later.</span>
            </div>
        `;
        document.body.appendChild(this.container);
    }

    addStyles() {
        if (document.getElementById('connection-status-styles')) return;

        const style = document.createElement('style');
        style.id = 'connection-status-styles';
        style.textContent = `
            .connection-status {
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(15, 23, 42, 0.9);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 122, 24, 0.3);
                color: white;
                padding: 12px 24px;
                border-radius: 100px;
                z-index: 9999;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(255, 122, 24, 0.1);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .connection-status.hidden {
                bottom: -100px;
                opacity: 0;
            }

            .connection-status.offline {
                border-color: #ef4444;
                background: rgba(153, 27, 27, 0.9);
            }

            .connection-status.online-recovered {
                border-color: #10b981;
                background: rgba(6, 95, 70, 0.9);
            }

            .status-content {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 500;
                font-size: 0.9rem;
            }

            @keyframes pulse-connection {
                0% { opacity: 0.6; }
                50% { opacity: 1; }
                100% { opacity: 0.6; }
            }

            .status-icon {
                animation: pulse-connection 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    attachListeners() {
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());
    }

    updateStatus() {
        if (!navigator.onLine) {
            this.handleOffline();
        }
    }

    handleOffline() {
        this.container.querySelector('.status-text').textContent = 'You are currently offline. Changes will sync later.';
        this.container.querySelector('.status-icon').textContent = '📡';
        this.container.classList.remove('hidden', 'online-recovered');
        this.container.classList.add('offline');

        if (window.Notify) {
            window.Notify.warning('Switched to offline mode');
        }
    }

    handleOnline() {
        this.container.querySelector('.status-text').textContent = 'Connection restored. Syncing data...';
        this.container.querySelector('.status-icon').textContent = '✅';
        this.container.classList.remove('offline');
        this.container.classList.add('online-recovered');

        if (window.Notify) {
            window.Notify.success('Back online! Syncing progress...');
        }

        // Hide after a delay
        setTimeout(() => {
            this.container.classList.add('hidden');
        }, 4000);
    }

    showCustomMessage(message, type = 'info') {
        this.container.querySelector('.status-text').textContent = message;
        this.container.classList.remove('hidden', 'offline', 'online-recovered');
        if (type === 'success') this.container.classList.add('online-recovered');
        if (type === 'error') this.container.classList.add('offline');

        setTimeout(() => {
            this.container.classList.add('hidden');
        }, 5000);
    }
}
