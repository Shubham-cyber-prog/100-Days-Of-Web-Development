/**/**
















































































































































































































































































































export const blueprintService = new BlueprintService();// Singleton instance}    }        console.log('🔌 Blueprint Service destroyed');        this.listeners = [];        this.ydoc.destroy();        }            this.indexeddbProvider.destroy();        if (this.indexeddbProvider) {        }            this.wsProvider.destroy();            this.wsProvider.disconnect();        if (this.wsProvider) {    destroy() {     */     * Disconnect and cleanup    /**    }            .forEach(l => l.callback(data));            .filter(l => l.eventName === eventName)        this.listeners    notifyListeners(eventName, data) {     */     * Notify all listeners    /**    }        };            );                l => l.eventName !== eventName || l.callback !== callback            this.listeners = this.listeners.filter(        return () => {        this.listeners.push({ eventName, callback });    on(eventName, callback) {     */     * Add event listener    /**    }        });            users: this.getConnectedUsers()            removed,            updated,            added,        this.notifyListeners('usersChanged', {    handleAwarenessChange({ added, updated, removed }) {     */     * Handle awareness change (users joining/leaving)    /**    }        });            shapes: this.getAllShapes()            event,        this.notifyListeners('shapesChanged', {    handleShapesChange(event) {     */     * Handle shapes change event    /**    }        }            this.awareness.setLocalStateField('cursor', { x, y, timestamp: Date.now() });        if (this.awareness) {    updateCursor(x, y) {     */     * Update local cursor position    /**    }        return users;        });            }                });                    cursor: state.cursor                    ...state.user,                    clientId,                users.push({            if (state.user) {        this.awareness.getStates().forEach((state, clientId) => {        const users = [];                if (!this.awareness) return [];    getConnectedUsers() {     */     * Get connected users    /**    }        });            this.shapes.insert(0, data.shapes);            this.shapes.delete(0, this.shapes.length);        this.ydoc.transact(() => {        }            throw new Error('Invalid blueprint data');        if (!data || !data.shapes) {    importJSON(data) {     */     * Import blueprint from JSON    /**    }        };            exportedBy: this.userId            exportedAt: Date.now(),            shapes: this.getAllShapes(),            roomId: this.roomId,            version: '1.0',        return {    exportJSON() {     */     * Export blueprint as JSON    /**    }        });            this.shapes.delete(0, this.shapes.length);        this.ydoc.transact(() => {    clearAll() {     */     * Clear all shapes    /**    }        return false;        }            return true;            this.notifyListeners('redo');            this.undoManager.redo();        if (this.undoManager.canRedo()) {    redo() {     */     * Redo last undone operation    /**    }        return false;        }            return true;            this.notifyListeners('undo');            this.undoManager.undo();        if (this.undoManager.canUndo()) {    undo() {     */     * Undo last operation    /**    }        return this.shapes.toArray().find(s => s.id === shapeId);    getShape(shapeId) {     */     * Get shape by ID    /**    }        return this.shapes.toArray();    getAllShapes() {     */     * Get all shapes    /**    }        });            }                this.shapes.delete(index, 1);            if (index !== -1) {            const index = shapes.findIndex(s => s.id === shapeId);            const shapes = this.shapes.toArray();        this.ydoc.transact(() => {    deleteShape(shapeId) {     */     * Delete shape    /**    }        });            }                this.shapes.insert(index, [updatedShape]);                this.shapes.delete(index, 1);                                };                    lastModifiedBy: this.userId                    lastModified: Date.now(),                    version: (shapes[index].version || 1) + 1,                    ...updates,                    ...shapes[index],                const updatedShape = {            if (index !== -1) {                        const index = shapes.findIndex(s => s.id === shapeId);            const shapes = this.shapes.toArray();        this.ydoc.transact(() => {    updateShape(shapeId, updates) {     */     * Update existing shape    /**    }        return shapeWithMeta.id;        });            this.shapes.push([shapeWithMeta]);        this.ydoc.transact(() => {        };            version: 1            timestamp: Date.now(),            userId: this.userId,            id: `shape_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,            ...shape,        const shapeWithMeta = {    addShape(shape) {     */     * Add shape to canvas    /**    }        return colors[hash % colors.length];        const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);        ];            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',         const colors = [    generateUserColor(userId) {     */     * Generate consistent color for user    /**    }        }            return false;            console.error('❌ Blueprint Service initialization failed:', error);        } catch (error) {            return true;            console.log('✅ Blueprint Service initialized:', { roomId, userId });            this.awareness.on('change', this.handleAwarenessChange.bind(this));            this.shapes.observe(this.handleShapesChange.bind(this));            // Listen for changes            });                color: this.generateUserColor(userId)                name: localStorage.getItem('user_name') || 'User',                id: userId,            this.awareness.setLocalStateField('user', {            this.awareness = this.wsProvider.awareness;            );                { connect: true }                this.ydoc,                `blueprint_${roomId}`,                wsUrl,            this.wsProvider = new WebsocketProvider(            // WebSocket provider for real-time sync            });                this.indexeddbProvider.once('synced', resolve);            await new Promise((resolve) => {                        this.indexeddbProvider = new IndexeddbPersistence(`blueprint_${roomId}`, this.ydoc);            // IndexedDB persistence for offline support        try {        this.userId = userId;        this.roomId = roomId;    async initialize(roomId, userId, wsUrl = 'wss://demos.yjs.dev') {     */     * @param {string} wsUrl - WebSocket server URL (optional)     * @param {string} userId - Current user ID     * @param {string} roomId - Collaboration room ID     * Initialize the blueprint service    /**    }        this.historyIndex = 0;        this.maxHistorySize = 100;        // History tracking                this.listeners = [];        this.awareness = null;        this.userId = null;        this.roomId = null;        this.indexeddbProvider = null;        this.wsProvider = null;        this.undoManager = new Y.UndoManager([this.shapes]);        this.shapes = this.ydoc.getArray('shapes');        this.ydoc = new Y.Doc();    constructor() {class BlueprintService {import { IndexeddbPersistence } from 'https://cdn.jsdelivr.net/npm/y-indexeddb@9.0.12/+esm';import { WebsocketProvider } from 'https://cdn.jsdelivr.net/npm/y-websocket@1.5.0/+esm';import * as Y from 'https://cdn.jsdelivr.net/npm/yjs@13.6.10/+esm'; */ * @version 1.0.0 * Supports WebSocket sync, IndexedDB persistence, and time-travel debugging * Uses Yjs for conflict-free replicated data types * Blueprint Service - CRDT-Based Real-Time Collaboration * Blueprint Service - CRDT-Based Collaborative Whiteboard
 * Uses Yjs for conflict-free replicated data types
 * Supports real-time multi-user collaboration with WebSocket sync
 * 
 * Features:
 * - CRDT synchronization (Yjs)
 * - Binary sync via WebSockets
 * - Time-travel undo/redo
 * - Offline-first architecture
 * - Conflict resolution
 */

import * as Y from 'https://cdn.jsdelivr.net/npm/yjs@13.6.10/+esm';
import { WebsocketProvider } from 'https://cdn.jsdelivr.net/npm/y-websocket@1.5.0/+esm';
import { IndexeddbPersistence } from 'https://cdn.jsdelivr.net/npm/y-indexeddb@9.0.12/+esm';

class BlueprintService {
    constructor() {
        this.ydoc = new Y.Doc();
        this.shapes = this.ydoc.getArray('shapes');
        this.metadata = this.ydoc.getMap('metadata');
        this.users = this.ydoc.getMap('users');
        
        this.wsProvider = null;
        this.indexeddbProvider = null;
        this.undoManager = null;
        
        this.localUserId = this._generateUserId();
        this.listeners = [];
        
        // Connection state
        this.connected = false;
        this.synced = false;
        
        // Performance optimization
        this.batchUpdates = [];
        this.batchTimeout = null;
    }

    /**
     * Initialize Blueprint Service
     * @param {string} roomId - Unique room identifier
     * @param {object} user - Current user info
     */
    async initialize(roomId = 'default', user = {}) {
        try {
            // IndexedDB persistence for offline support
            this.indexeddbProvider = new IndexeddbPersistence(
                `blueprint-${roomId}`,
                this.ydoc
            );

            await this.indexeddbProvider.whenSynced;
            console.log('📦 Blueprint: IndexedDB synced');

            // WebSocket provider for real-time sync
            const wsUrl = this._getWebSocketUrl();
            this.wsProvider = new WebsocketProvider(
                wsUrl,
                `blueprint-${roomId}`,
                this.ydoc,
                {
                    connect: true,
                    params: {
                        userId: this.localUserId,
                        userName: user.name || 'Anonymous'
                    }
                }
            );

            // Connection event handlers
            this.wsProvider.on('status', ({ status }) => {
                this.connected = status === 'connected';
                this._emit('connection', { connected: this.connected });
                console.log(`🔌 Blueprint WebSocket: ${status}`);
            });

            this.wsProvider.on('synced', ({ synced }) => {
                this.synced = synced;
                this._emit('synced', { synced });
                console.log('✅ Blueprint: Synced with server');
            });

            // Set up undo manager
            this.undoManager = new Y.UndoManager(this.shapes, {
                trackedOrigins: new Set([this.localUserId])
            });

            // Set user presence
            this._setUserPresence(user);

            // Observe changes
            this._setupObservers();

            console.log('✅ BlueprintService initialized:', roomId);
            return true;
        } catch (error) {
            console.error('❌ Blueprint init failed:', error);
            return false;
        }
    }

    /**
     * Add shape to canvas
     */
    addShape(shape) {
        const shapeData = {
            id: this._generateId(),
            ...shape,
            userId: this.localUserId,
            timestamp: Date.now(),
            version: 1
        };

        this.ydoc.transact(() => {
            this.shapes.push([shapeData]);
        }, this.localUserId);

        return shapeData.id;
    }

    /**
     * Update existing shape
     */
    updateShape(shapeId, updates) {
        this.ydoc.transact(() => {
            const index = this._findShapeIndex(shapeId);
            if (index !== -1) {
                const shape = this.shapes.get(index);
                const updated = {
                    ...shape,
                    ...updates,
                    version: (shape.version || 1) + 1,
                    lastModified: Date.now(),
                    lastModifiedBy: this.localUserId
                };
                this.shapes.delete(index, 1);
                this.shapes.insert(index, [updated]);
            }
        }, this.localUserId);
    }

    /**
     * Delete shape
     */
    deleteShape(shapeId) {
        this.ydoc.transact(() => {
            const index = this._findShapeIndex(shapeId);
            if (index !== -1) {
                this.shapes.delete(index, 1);
            }
        }, this.localUserId);
    }

    /**
     * Get all shapes
     */
    getShapes() {
        return this.shapes.toArray();
    }

    /**
     * Get shape by ID
     */
    getShape(shapeId) {
        const index = this._findShapeIndex(shapeId);
        return index !== -1 ? this.shapes.get(index) : null;
    }

    /**
     * Batch update multiple shapes (optimized)
     */
    batchUpdate(updates) {
        this.ydoc.transact(() => {
            updates.forEach(({ shapeId, changes }) => {
                const index = this._findShapeIndex(shapeId);
                if (index !== -1) {
                    const shape = this.shapes.get(index);
                    const updated = { ...shape, ...changes };
                    this.shapes.delete(index, 1);
                    this.shapes.insert(index, [updated]);
                }
            });
        }, this.localUserId);
    }

    /**
     * Undo last action
     */
    undo() {
        if (this.undoManager && this.undoManager.canUndo()) {
            this.undoManager.undo();
            return true;
        }
        return false;
    }

    /**
     * Redo last undone action
     */
    redo() {
        if (this.undoManager && this.undoManager.canRedo()) {
            this.undoManager.redo();
            return true;
        }
        return false;
    }

    /**
     * Clear all shapes
     */
    clear() {
        this.ydoc.transact(() => {
            this.shapes.delete(0, this.shapes.length);
        }, this.localUserId);
    }

    /**
     * Export blueprint data
     */
    export() {
        return {
            shapes: this.getShapes(),
            metadata: this.metadata.toJSON(),
            version: '1.0.0',
            exportedAt: new Date().toISOString(),
            exportedBy: this.localUserId
        };
    }

    /**
     * Import blueprint data
     */
    import(data) {
        this.ydoc.transact(() => {
            this.clear();
            if (data.shapes && Array.isArray(data.shapes)) {
                this.shapes.insert(0, data.shapes);
            }
            if (data.metadata) {
                Object.entries(data.metadata).forEach(([key, value]) => {
                    this.metadata.set(key, value);
                });
            }
        }, this.localUserId);
    }

    /**
     * Get active users
     */
    getActiveUsers() {
        return Array.from(this.users.values());
    }

    /**
     * Set user presence
     */
    _setUserPresence(user) {
        this.users.set(this.localUserId, {
            id: this.localUserId,
            name: user.name || 'Anonymous',
            color: user.color || this._generateColor(),
            lastSeen: Date.now(),
            cursor: { x: 0, y: 0 }
        });
    }

    /**
     * Update cursor position
     */
    updateCursor(x, y) {
        const user = this.users.get(this.localUserId);
        if (user) {
            this.users.set(this.localUserId, {
                ...user,
                cursor: { x, y },
                lastSeen: Date.now()
            });
        }
    }

    /**
     * Subscribe to changes
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    /**
     * Setup observers for real-time updates
     */
    _setupObservers() {
        // Shapes observer
        this.shapes.observe(event => {
            this._emit('shapesChanged', {
                changes: event.changes,
                shapes: this.getShapes()
            });
        });

        // Users observer
        this.users.observe(event => {
            this._emit('usersChanged', {
                users: this.getActiveUsers()
            });
        });

        // Metadata observer
        this.metadata.observe(event => {
            this._emit('metadataChanged', {
                metadata: this.metadata.toJSON()
            });
        });
    }

    /**
     * Find shape index by ID
     */
    _findShapeIndex(shapeId) {
        const shapes = this.shapes.toArray();
        return shapes.findIndex(s => s.id === shapeId);
    }

    /**
     * Emit event to listeners
     */
    _emit(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback({ event, data });
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    /**
     * Generate unique user ID
     */
    _generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    /**
     * Generate unique shape ID
     */
    _generateId() {
        return 'shape_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
    }

    /**
     * Generate random color for user
     */
    _generateColor() {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * Get WebSocket URL
     */
    _getWebSocketUrl() {
        // For production, use a proper WebSocket server
        // For demo, use a public Yjs server or local
        return 'wss://demos.yjs.dev';
    }

    /**
     * Cleanup
     */
    destroy() {
        if (this.wsProvider) {
            this.wsProvider.destroy();
        }
        if (this.indexeddbProvider) {
            this.indexeddbProvider.destroy();
        }
        this.ydoc.destroy();
        this.listeners = [];
    }
}

// Export singleton instance
export const blueprintService = new BlueprintService();
