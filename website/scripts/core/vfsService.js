/**
 * Virtual File System (VFS) Service
 * IndexedDB-based file storage with Firestore cloud sync
 * For Mission Control IDE - Issue #1118
 */

const DB_NAME = 'ZenithVFS';
const DB_VERSION = 1;
const STORE_NAME = 'files';

class VirtualFileSystem {
    constructor() {
        this.db = null;
        this.isReady = false;
        this.readyPromise = this.init();
        
        // File change listeners
        this.listeners = new Map();
    }

    /**
     * Initialize IndexedDB
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = () => {
                console.error('❌ VFS: Failed to open IndexedDB:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                this.isReady = true;
                console.log('✅ VFS: IndexedDB initialized');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create files store
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, { keyPath: 'path' });
                    
                    // Indexes for querying
                    store.createIndex('projectId', 'projectId', { unique: false });
                    store.createIndex('type', 'type', { unique: false });
                    store.createIndex('updatedAt', 'updatedAt', { unique: false });
                    
                    console.log('📁 VFS: Created files store');
                }
            };
        });
    }

    /**
     * Ensure DB is ready before operations
     */
    async ensureReady() {
        if (!this.isReady) {
            await this.readyPromise;
        }
    }

    /**
     * Create or update a file
     * @param {string} path - File path (e.g., "day-01/index.html")
     * @param {string} content - File content
     * @param {object} metadata - Additional metadata
     */
    async saveFile(path, content, metadata = {}) {
        await this.ensureReady();

        const file = {
            path,
            content,
            type: this.getFileType(path),
            projectId: metadata.projectId || this.extractProjectId(path),
            name: path.split('/').pop(),
            size: new Blob([content]).size,
            createdAt: metadata.createdAt || Date.now(),
            updatedAt: Date.now(),
            ...metadata
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(file);

            request.onsuccess = () => {
                console.log(`💾 VFS: Saved ${path}`);
                this.notifyListeners('save', file);
                resolve(file);
            };

            request.onerror = () => {
                console.error(`❌ VFS: Failed to save ${path}:`, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Read a file
     * @param {string} path - File path
     */
    async readFile(path) {
        await this.ensureReady();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(path);

            request.onsuccess = () => {
                if (request.result) {
                    resolve(request.result);
                } else {
                    resolve(null);
                }
            };

            request.onerror = () => {
                console.error(`❌ VFS: Failed to read ${path}:`, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Delete a file
     * @param {string} path - File path
     */
    async deleteFile(path) {
        await this.ensureReady();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(path);

            request.onsuccess = () => {
                console.log(`🗑️ VFS: Deleted ${path}`);
                this.notifyListeners('delete', { path });
                resolve(true);
            };

            request.onerror = () => {
                console.error(`❌ VFS: Failed to delete ${path}:`, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * List all files for a project
     * @param {string} projectId - Project identifier
     */
    async listProjectFiles(projectId) {
        await this.ensureReady();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const index = store.index('projectId');
            const request = index.getAll(projectId);

            request.onsuccess = () => {
                resolve(request.result || []);
            };

            request.onerror = () => {
                console.error(`❌ VFS: Failed to list files for ${projectId}:`, request.error);
                reject(request.error);
            };
        });
    }

    /**
     * List all files in VFS
     */
    async listAllFiles() {
        await this.ensureReady();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                resolve(request.result || []);
            };

            request.onerror = () => {
                console.error('❌ VFS: Failed to list all files:', request.error);
                reject(request.error);
            };
        });
    }

    /**
     * Create a new project with default files
     * @param {string} projectId - Project identifier (e.g., "day-01")
     * @param {string} title - Project title
     */
    async createProject(projectId, title = 'Untitled Project') {
        const defaultHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>Hello, ${title}!</h1>
    <p>Start coding your project here.</p>
    
    <script src="script.js"></script>
</body>
</html>`;

        const defaultCSS = `/* ${title} Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #eee;
}

h1 {
    margin-bottom: 1rem;
    color: #00d9ff;
}

p {
    color: #aaa;
}
`;

        const defaultJS = `// ${title} JavaScript

console.log('🚀 ${title} loaded!');

// Your code here
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM ready!');
});
`;

        const metadata = { projectId, title };

        await Promise.all([
            this.saveFile(`${projectId}/index.html`, defaultHTML, metadata),
            this.saveFile(`${projectId}/style.css`, defaultCSS, metadata),
            this.saveFile(`${projectId}/script.js`, defaultJS, metadata)
        ]);

        console.log(`📦 VFS: Created project ${projectId}`);
        return projectId;
    }

    /**
     * Delete an entire project
     * @param {string} projectId - Project identifier
     */
    async deleteProject(projectId) {
        const files = await this.listProjectFiles(projectId);
        
        await Promise.all(files.map(file => this.deleteFile(file.path)));
        
        console.log(`🗑️ VFS: Deleted project ${projectId}`);
        return true;
    }

    /**
     * Export project as ZIP (returns blob URLs for files)
     * @param {string} projectId - Project identifier
     */
    async exportProject(projectId) {
        const files = await this.listProjectFiles(projectId);
        
        return files.map(file => ({
            name: file.name,
            path: file.path,
            content: file.content,
            type: file.type
        }));
    }

    /**
     * Import files into a project
     * @param {string} projectId - Project identifier
     * @param {Array} files - Array of {name, content} objects
     */
    async importFiles(projectId, files) {
        const imports = files.map(file => 
            this.saveFile(`${projectId}/${file.name}`, file.content, { projectId })
        );
        
        await Promise.all(imports);
        console.log(`📥 VFS: Imported ${files.length} files to ${projectId}`);
    }

    /**
     * Sync project to Firestore (cloud backup)
     * @param {string} projectId - Project identifier
     * @param {string} userId - User ID for cloud storage
     */
    async syncToCloud(projectId, userId) {
        try {
            // Check if Firestore is available
            const { db } = await import('../../firebase-config.js');
            const { doc, setDoc, collection } = await import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js');
            
            const files = await this.listProjectFiles(projectId);
            
            const projectRef = doc(db, 'users', userId, 'projects', projectId);
            await setDoc(projectRef, {
                projectId,
                files: files.map(f => ({
                    path: f.path,
                    content: f.content,
                    type: f.type,
                    name: f.name
                })),
                updatedAt: Date.now(),
                syncedAt: Date.now()
            }, { merge: true });
            
            console.log(`☁️ VFS: Synced ${projectId} to cloud`);
            return true;
        } catch (error) {
            console.warn('☁️ VFS: Cloud sync unavailable:', error.message);
            return false;
        }
    }

    /**
     * Load project from Firestore
     * @param {string} projectId - Project identifier
     * @param {string} userId - User ID
     */
    async loadFromCloud(projectId, userId) {
        try {
            const { db } = await import('../../firebase-config.js');
            const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js');
            
            const projectRef = doc(db, 'users', userId, 'projects', projectId);
            const snapshot = await getDoc(projectRef);
            
            if (snapshot.exists()) {
                const data = snapshot.data();
                
                // Import files to local VFS
                for (const file of data.files) {
                    await this.saveFile(file.path, file.content, { projectId });
                }
                
                console.log(`☁️ VFS: Loaded ${projectId} from cloud`);
                return true;
            }
            
            return false;
        } catch (error) {
            console.warn('☁️ VFS: Cloud load unavailable:', error.message);
            return false;
        }
    }

    /**
     * Get file type from extension
     */
    getFileType(path) {
        const ext = path.split('.').pop().toLowerCase();
        const types = {
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json',
            'md': 'text/markdown',
            'txt': 'text/plain',
            'svg': 'image/svg+xml'
        };
        return types[ext] || 'text/plain';
    }

    /**
     * Get language for Monaco editor
     */
    getLanguage(path) {
        const ext = path.split('.').pop().toLowerCase();
        const languages = {
            'html': 'html',
            'htm': 'html',
            'css': 'css',
            'js': 'javascript',
            'json': 'json',
            'md': 'markdown',
            'txt': 'plaintext',
            'svg': 'xml'
        };
        return languages[ext] || 'plaintext';
    }

    /**
     * Extract project ID from path
     */
    extractProjectId(path) {
        return path.split('/')[0] || 'default';
    }

    /**
     * Subscribe to file changes
     */
    subscribe(callback) {
        const id = Date.now().toString();
        this.listeners.set(id, callback);
        return () => this.listeners.delete(id);
    }

    /**
     * Notify listeners of changes
     */
    notifyListeners(action, data) {
        this.listeners.forEach(callback => {
            try {
                callback(action, data);
            } catch (e) {
                console.error('VFS listener error:', e);
            }
        });
    }

    /**
     * Get storage usage info
     */
    async getStorageInfo() {
        const files = await this.listAllFiles();
        const totalSize = files.reduce((sum, f) => sum + (f.size || 0), 0);
        
        return {
            fileCount: files.length,
            totalSize,
            formattedSize: this.formatBytes(totalSize)
        };
    }

    /**
     * Format bytes to human readable
     */
    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Clear all files (danger!)
     */
    async clearAll() {
        await this.ensureReady();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => {
                console.log('🗑️ VFS: Cleared all files');
                resolve(true);
            };

            request.onerror = () => {
                reject(request.error);
            };
        });
    }
}

// Singleton instance
const VFS = new VirtualFileSystem();

// Export for modules
export { VFS, VirtualFileSystem };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.VFS = VFS;
}
