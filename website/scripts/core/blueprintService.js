/**
 * Blueprint Service - CRDT-Powered Collaborative Planning
 * Implements LWW (Last-Write-Wins) Element Map for real-time consistency
 * Issue #1158
 */

class BlueprintService {
    constructor() {
        this.nodes = new Map();
        this.links = new Map();
        this.userName = 'Explorer';
        this.userId = Math.random().toString(36).substr(2, 9);
        this.room = 'global-journey';
        this.onUpdate = null;
        this.onPresenceUpdate = null;
        this.presence = new Map();

        this.init();
    }

    /**
     * Initialize Service
     */
    async init() {
        // In a real app, this would connect to a WebSocket or Firebase
        // For this implementation, we handle local state and mock replication
        this.loadFromLocal();
        console.log('🏛️ Blueprint Service: Initialized');

        // Mock presence
        this.updatePresence(this.userId, { x: 0, y: 0, name: this.userName });
    }

    /**
     * Load state from LocalStorage/IndexedDB fallback
     */
    loadFromLocal() {
        const saved = localStorage.getItem(`blueprint_${this.room}`);
        if (saved) {
            const data = JSON.parse(saved);
            Object.entries(data.nodes || {}).forEach(([id, node]) => {
                this.nodes.set(id, node);
            });
            Object.entries(data.links || {}).forEach(([id, link]) => {
                this.links.set(id, link);
            });
        }
    }

    /**
     * Save state to LocalStorage
     */
    saveToLocal() {
        const data = {
            nodes: Object.fromEntries(this.nodes),
            links: Object.fromEntries(this.links)
        };
        localStorage.setItem(`blueprint_${this.room}`, JSON.stringify(data));
    }

    /**
     * CRDT LWW-Map: Add or Update Node
     */
    updateNode(id, data) {
        const existing = this.nodes.get(id);
        const timestamp = Date.now();

        // LWW Logic
        if (!existing || timestamp > (existing.lastModified || 0)) {
            const newNode = {
                ...existing,
                ...data,
                id,
                lastModified: timestamp,
                author: this.userId
            };
            this.nodes.set(id, newNode);
            this.saveToLocal();
            this.broadcast({ type: 'node_update', data: newNode });
            return true;
        }
        return false;
    }

    /**
     * CRDT LWW-Map: Delete Node
     */
    deleteNode(id) {
        if (this.nodes.has(id)) {
            this.nodes.delete(id);
            // Also delete associated links
            for (const [linkId, link] of this.links) {
                if (link.from === id || link.to === id) {
                    this.links.delete(linkId);
                }
            }
            this.saveToLocal();
            this.broadcast({ type: 'node_delete', id });
        }
    }

    /**
     * CRDT LWW-Map: Add/Update Link
     */
    updateLink(id, data) {
        const timestamp = Date.now();
        const existing = this.links.get(id);

        if (!existing || timestamp > (existing.lastModified || 0)) {
            const newLink = {
                ...existing,
                ...data,
                id,
                lastModified: timestamp
            };
            this.links.set(id, newLink);
            this.saveToLocal();
            this.broadcast({ type: 'link_update', data: newLink });
        }
    }

    /**
     * Remote Sync Handler
     */
    applyRemoteUpdate(update) {
        const { type, data, id } = update;

        switch (type) {
            case 'node_update':
                const existingNode = this.nodes.get(data.id);
                if (!existingNode || data.lastModified > existingNode.lastModified) {
                    this.nodes.set(data.id, data);
                    if (this.onUpdate) this.onUpdate();
                }
                break;
            case 'node_delete':
                this.nodes.delete(id);
                if (this.onUpdate) this.onUpdate();
                break;
            case 'link_update':
                const existingLink = this.links.get(data.id);
                if (!existingLink || data.lastModified > existingLink.lastModified) {
                    this.links.set(data.id, data);
                    if (this.onUpdate) this.onUpdate();
                }
                break;
            case 'presence':
                this.presence.set(id, data);
                if (this.onPresenceUpdate) this.onPresenceUpdate(this.presence);
                break;
        }
    }

    /**
     * Presence Tracking
     */
    updatePresence(id, data) {
        this.presence.set(id, { ...data, lastSeen: Date.now() });
        this.broadcast({ type: 'presence', id, data: this.presence.get(id) });
        if (this.onPresenceUpdate) this.onPresenceUpdate(this.presence);
    }

    /**
     * Broadcaster (Mock for now, would use Socket.io/Firebase)
     */
    async broadcast(message) {
        // Dispatch custom event for local integration testing
        const event = new CustomEvent('blueprint_sync', { detail: message });
        window.dispatchEvent(event);

        // Push to offline queue if needed
        if (window.offlineService) {
            window.offlineService.queueSyncAction({
                type: 'blueprint_update',
                data: message,
                room: this.room
            });
        }

        // Real-time Cloud Sync
        this.syncToCloud(message);
    }

    /**
     * Real-time Cloud Sync (Hooks for Firestore)
     */
    async syncToCloud(message) {
        if (!window.db || !this.userId) return;

        try {
            console.log('☁️ Blueprint: Cloud sync triggered for', message.type);
        } catch (error) {
            console.error('Cloud sync failed:', error);
        }
    }

    getNodes() {
        return Array.from(this.nodes.values());
    }

    getLinks() {
        return Array.from(this.links.values());
    }
}

export const blueprintService = new BlueprintService();
window.Blueprint = blueprintService;
