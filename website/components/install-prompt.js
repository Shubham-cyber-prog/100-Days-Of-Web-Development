class InstallPrompt extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.deferredPrompt = null;
    this.isInstalled = false;
  }

  connectedCallback() {
    this.checkInstalled();
    window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));
    window.addEventListener('appinstalled', this.handleAppInstalled.bind(this));
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt.bind(this));
    window.removeEventListener('appinstalled', this.handleAppInstalled.bind(this));
  }

  checkInstalled() {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }
  }

  handleBeforeInstallPrompt(event) {
    event.preventDefault();
    this.deferredPrompt = event;
    this.render();
  }

  handleAppInstalled() {
    this.isInstalled = true;
    this.deferredPrompt = null;
    this.render();
  }

  async handleInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      this.isInstalled = true;
    }

    this.deferredPrompt = null;
    this.render();
  }

  handleDismiss() {
    this.style.display = 'none';
    localStorage.setItem('install-prompt-dismissed', Date.now().toString());
  }

  wasRecentlyDismissed() {
    const dismissed = localStorage.getItem('install-prompt-dismissed');
    if (!dismissed) return false;
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - parseInt(dismissed) < oneDay;
  }

  render() {
    if (this.isInstalled || this.wasRecentlyDismissed()) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    if (!this.deferredPrompt) {
      this.shadowRoot.innerHTML = '';
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
        }

        .install-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 16px;
          padding: 20px;
          max-width: 320px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          font-family: 'Inter', sans-serif;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .install-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .install-title {
          color: #f8fafc;
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          font-size: 20px;
          line-height: 1;
        }

        .close-btn:hover {
          color: #f8fafc;
        }

        .install-description {
          color: #94a3b8;
          font-size: 13px;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .features {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
        }

        .feature {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #38bdf8;
          font-size: 12px;
        }

        .feature svg {
          width: 14px;
          height: 14px;
        }

        .install-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #38bdf8, #0ea5e9);
          border: none;
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .install-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(56, 189, 248, 0.3);
        }
      </style>

      <div class="install-card">
        <div class="install-header">
          <h3 class="install-title">Install Zenith</h3>
          <button class="close-btn" id="dismiss">&times;</button>
        </div>
        <p class="install-description">
          Install this app on your device for quick access, offline learning, and a better experience.
        </p>
        <div class="features">
          <span class="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            Offline access
          </span>
          <span class="feature">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            Fast loading
          </span>
        </div>
        <button class="install-btn" id="install">Install App</button>
      </div>
    `;

    this.shadowRoot.getElementById('install').addEventListener('click', () => this.handleInstall());
    this.shadowRoot.getElementById('dismiss').addEventListener('click', () => this.handleDismiss());
  }
}

customElements.define('install-prompt', InstallPrompt);