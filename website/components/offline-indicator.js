class OfflineIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOnline = navigator.onLine;
  }

  connectedCallback() {
    this.render();
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  disconnectedCallback() {
    window.removeEventListener('online', this.handleOnline.bind(this));
    window.removeEventListener('offline', this.handleOffline.bind(this));
  }

  handleOnline() {
    this.isOnline = true;
    this.render();
    this.dispatchEvent(new CustomEvent('connection-restored'));
  }

  handleOffline() {
    this.isOnline = false;
    this.render();
    this.dispatchEvent(new CustomEvent('connection-lost'));
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10000;
          transition: all 0.3s ease;
        }

        .indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 50px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          animation: slideUp 0.3s ease;
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

        .offline {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
        }

        .online {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
        }

        svg {
          width: 16px;
          height: 16px;
        }

        :host(.hidden) {
          display: none;
        }
      </style>

      ${!this.isOnline ? `
        <div class="indicator offline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"/>
          </svg>
          <span>You're offline. Some features may be limited.</span>
        </div>
      ` : ''}
    `;
  }
}

customElements.define('offline-indicator', OfflineIndicator);