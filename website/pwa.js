const PWAManager = {
  swRegistration: null,

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.swRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('[PWA] Service Worker registered:', this.swRegistration.scope);

        this.swRegistration.addEventListener('updatefound', () => {
          const newWorker = this.swRegistration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });

        this.setupPeriodicSync();
        this.setupBackgroundSync();
      } catch (error) {
        console.error('[PWA] Service Worker registration failed:', error);
      }
    }

    this.setupOfflineHandling();
    this.reportWebVitals();
  },

  showUpdateNotification() {
    const updateBanner = document.createElement('div');
    updateBanner.id = 'update-banner';
    updateBanner.innerHTML = `
      <style>
        #update-banner {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Inter', sans-serif;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          z-index: 10000;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        #update-banner p {
          color: #f8fafc;
          font-size: 14px;
          margin: 0;
        }
        #update-banner button {
          background: #38bdf8;
          border: none;
          border-radius: 8px;
          padding: 8px 16px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          font-size: 13px;
        }
        #update-banner button:hover {
          background: #0ea5e9;
        }
      </style>
      <p>A new version is available!</p>
      <button id="update-btn">Update</button>
    `;

    document.body.appendChild(updateBanner);

    document.getElementById('update-btn').addEventListener('click', () => {
      this.swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    });
  },

  setupOfflineHandling() {
    const offlineIndicator = document.createElement('offline-indicator');
    document.body.appendChild(offlineIndicator);

    const installPrompt = document.createElement('install-prompt');
    document.body.appendChild(installPrompt);
  },

  async setupPeriodicSync() {
    if ('periodicSync' in this.swRegistration) {
      try {
        const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
        if (status.state === 'granted') {
          await this.swRegistration.periodicSync.register('sync-progress', {
            minInterval: 24 * 60 * 60 * 1000
          });
        }
      } catch (error) {
        console.log('[PWA] Periodic sync not available:', error);
      }
    }
  },

  setupBackgroundSync() {
    window.addEventListener('online', async () => {
      if ('sync' in this.swRegistration) {
        try {
          await this.swRegistration.sync.register('sync-progress');
        } catch (error) {
          console.log('[PWA] Background sync failed:', error);
        }
      }
    });
  },

  async cacheProject(projectPath) {
    if (!this.swRegistration) return;

    const projectUrls = [
      `${projectPath}/index.html`,
      `${projectPath}/style.css`,
      `${projectPath}/script.js`
    ];

    this.swRegistration.active?.postMessage({
      type: 'CACHE_PROJECT',
      urls: projectUrls
    });
  },

  reportWebVitals() {
    if ('PerformanceObserver' in window) {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`[PWA] ${entry.name}: ${entry.startTime}ms`);
        }
      });
      try {
        po.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
      } catch (e) {
        console.log('[PWA] Performance observer not supported');
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  PWAManager.init();
});

window.PWAManager = PWAManager;