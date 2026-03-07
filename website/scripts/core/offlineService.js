/**
 * Offline Service
 * Manages IndexedDB for offline data persistence and Background Sync
 */

class OfflineService {
    constructor() {
        this.dbName = 'ZenithOfflineDB';
        this.dbVersion = 1;
        this.db = null;
        this.initDB();
    }

    /**
     * Initialize IndexedDB
     */
    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Store for pending sync actions
                if (!db.objectStoreNames.contains('syncQueue')) {
                    db.createObjectStore('syncQueue', { keyPath: 'id', autoIncrement: true });
                }
                // Store for local progress cache
                if (!db.objectStoreNames.contains('progressCache')) {
                    db.createObjectStore('progressCache', { keyPath: 'userId' });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onerror = (event) => {
                console.error('IndexedDB error:', event.target.error);
                reject(event.target.error);
            };
        });
    }

    /**
     * Add an action to the sync queue
     * @param {Object} action - { type: 'toggleDay', data: { day: 45 }, userId: '...' }
     */
    async queueSyncAction(action) {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.add({
                ...action,
                timestamp: Date.now()
            });

            request.onsuccess = () => {
                console.log('Action queued for background sync');
                // Register for background sync if supported
                this.registerBackgroundSync();
                resolve();
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Register for Background Sync via Service Worker
     */
    async registerBackgroundSync() {
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                await registration.sync.register('sync-progress');
                console.log('Background sync registered');
            } catch (err) {
                console.log('Background sync registration failed (expected in some browsers):', err);
            }
        }
    }

    /**
     * Get all pending sync actions
     */
    async getSyncQueue() {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readonly');
            const store = transaction.objectStore('syncQueue');
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear the sync queue
     */
    async clearSyncQueue() {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['syncQueue'], 'readwrite');
            const store = transaction.objectStore('syncQueue');
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Cache progress data locally
     */
    async cacheProgress(userId, completedDays) {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['progressCache'], 'readwrite');
            const store = transaction.objectStore('progressCache');
            const request = store.put({ userId, completedDays, updatedAt: Date.now() });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get cached progress data
     */
    async getCachedProgress(userId) {
        if (!this.db) await this.initDB();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['progressCache'], 'readonly');
            const store = transaction.objectStore('progressCache');
            const request = store.get(userId);

            request.onsuccess = () => resolve(request.result?.completedDays || null);
            request.onerror = () => reject(request.error);
        });
    }
}

export const offlineService = new OfflineService();
window.offlineService = offlineService;
