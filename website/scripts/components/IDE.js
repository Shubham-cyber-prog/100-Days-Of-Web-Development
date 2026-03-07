/**
 * IDE Component - Monaco Editor Integration
 * Full-featured code editor with multi-file support
 * For Mission Control - Issue #1118
 */

import { VFS } from '../core/vfsService.js';

class IDEComponent {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error(`IDE container '${containerId}' not found`);
        }

        this.options = {
            theme: options.theme || 'vs-dark',
            fontSize: options.fontSize || 14,
            minimap: options.minimap !== false,
            wordWrap: options.wordWrap || 'on',
            autoSave: options.autoSave !== false,
            autoSaveDelay: options.autoSaveDelay || 1000,
            ...options
        };

        this.editors = new Map(); // path -> editor instance
        this.activeFile = null;
        this.currentProject = null;
        this.monaco = null;
        this.autoSaveTimer = null;
        this.isDirty = new Set(); // Unsaved files

        // Callbacks
        this.onFileChange = options.onFileChange || (() => {});
        this.onFileSave = options.onFileSave || (() => {});
        this.onFileOpen = options.onFileOpen || (() => {});

        this.init();
    }

    /**
     * Initialize the IDE
     */
    async init() {
        this.render();
        await this.loadMonaco();
        this.setupKeyBindings();
        console.log('✅ IDE: Initialized');
    }

    /**
     * Render IDE UI structure
     */
    render() {
        this.container.innerHTML = `
            <div class="ide-container">
                <!-- File Explorer Sidebar -->
                <aside class="ide-sidebar">
                    <div class="ide-sidebar-header">
                        <h3>📁 Explorer</h3>
                        <div class="ide-sidebar-actions">
                            <button class="ide-btn-icon" id="newFileBtn" title="New File">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="ide-btn-icon" id="refreshFilesBtn" title="Refresh">
                                <i class="fas fa-sync-alt"></i>
                            </button>
                        </div>
                    </div>
                    <div class="ide-file-tree" id="fileTree">
                        <p class="ide-empty-state">No project loaded</p>
                    </div>
                    <div class="ide-storage-info" id="storageInfo"></div>
                </aside>

                <!-- Main Editor Area -->
                <main class="ide-main">
                    <!-- Tabs -->
                    <div class="ide-tabs" id="editorTabs">
                        <div class="ide-tabs-placeholder">Open a file to start editing</div>
                    </div>

                    <!-- Editor Container -->
                    <div class="ide-editor-wrapper">
                        <div class="ide-editor" id="monacoEditor">
                            <div class="ide-welcome">
                                <div class="ide-welcome-icon">🚀</div>
                                <h2>Mission Control IDE</h2>
                                <p>Select a file from the explorer or create a new project</p>
                                <div class="ide-welcome-actions">
                                    <button class="btn btn-primary" id="createProjectBtn">
                                        <i class="fas fa-folder-plus"></i> New Project
                                    </button>
                                    <button class="btn btn-secondary" id="loadDayProjectBtn">
                                        <i class="fas fa-calendar-day"></i> Load Day Project
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Status Bar -->
                    <div class="ide-statusbar">
                        <div class="ide-status-left">
                            <span id="statusFile">No file open</span>
                            <span id="statusDirty" class="ide-status-dirty" style="display: none;">●</span>
                        </div>
                        <div class="ide-status-right">
                            <span id="statusLanguage">-</span>
                            <span id="statusPosition">Ln 1, Col 1</span>
                            <span id="statusEncoding">UTF-8</span>
                        </div>
                    </div>
                </main>
            </div>
        `;

        this.injectStyles();
        this.bindUIEvents();
    }

    /**
     * Inject IDE-specific styles
     */
    injectStyles() {
        if (document.getElementById('ide-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'ide-styles';
        styles.textContent = `
            .ide-container {
                display: flex;
                height: 100%;
                background: #1e1e1e;
                color: #d4d4d4;
                font-family: 'Segoe UI', Tahoma, sans-serif;
                overflow: hidden;
            }

            /* Sidebar */
            .ide-sidebar {
                width: 250px;
                background: #252526;
                border-right: 1px solid #3c3c3c;
                display: flex;
                flex-direction: column;
            }

            .ide-sidebar-header {
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #3c3c3c;
            }

            .ide-sidebar-header h3 {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: #bbbbbb;
                margin: 0;
            }

            .ide-sidebar-actions {
                display: flex;
                gap: 4px;
            }

            .ide-btn-icon {
                background: transparent;
                border: none;
                color: #cccccc;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.2s;
            }

            .ide-btn-icon:hover {
                background: #3c3c3c;
            }

            .ide-file-tree {
                flex: 1;
                overflow-y: auto;
                padding: 8px 0;
            }

            .ide-file-item {
                padding: 6px 16px 6px 24px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                transition: background 0.15s;
            }

            .ide-file-item:hover {
                background: #2a2d2e;
            }

            .ide-file-item.active {
                background: #37373d;
            }

            .ide-file-item.dirty::after {
                content: '●';
                color: #e2c08d;
                margin-left: auto;
            }

            .ide-file-icon {
                width: 16px;
                text-align: center;
            }

            .ide-file-icon.html { color: #e44d26; }
            .ide-file-icon.css { color: #264de4; }
            .ide-file-icon.js { color: #f7df1e; }
            .ide-file-icon.json { color: #cbcb41; }

            .ide-folder-item {
                padding: 6px 16px;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                font-weight: 500;
            }

            .ide-folder-item:hover {
                background: #2a2d2e;
            }

            .ide-empty-state {
                color: #6e6e6e;
                font-size: 12px;
                padding: 16px;
                text-align: center;
            }

            .ide-storage-info {
                padding: 8px 16px;
                font-size: 11px;
                color: #6e6e6e;
                border-top: 1px solid #3c3c3c;
            }

            /* Main Editor Area */
            .ide-main {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            /* Tabs */
            .ide-tabs {
                display: flex;
                background: #2d2d2d;
                border-bottom: 1px solid #3c3c3c;
                overflow-x: auto;
                min-height: 35px;
            }

            .ide-tabs::-webkit-scrollbar {
                height: 3px;
            }

            .ide-tabs::-webkit-scrollbar-thumb {
                background: #555;
            }

            .ide-tabs-placeholder {
                padding: 8px 16px;
                color: #6e6e6e;
                font-size: 12px;
            }

            .ide-tab {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 12px;
                background: transparent;
                border: none;
                border-right: 1px solid #3c3c3c;
                color: #969696;
                font-size: 13px;
                cursor: pointer;
                white-space: nowrap;
                transition: background 0.15s;
            }

            .ide-tab:hover {
                background: #2a2d2e;
            }

            .ide-tab.active {
                background: #1e1e1e;
                color: #ffffff;
                border-bottom: 2px solid #007acc;
            }

            .ide-tab.dirty .ide-tab-name::after {
                content: ' ●';
                color: #e2c08d;
            }

            .ide-tab-close {
                background: none;
                border: none;
                color: inherit;
                opacity: 0.5;
                cursor: pointer;
                padding: 2px;
                border-radius: 3px;
                display: flex;
            }

            .ide-tab-close:hover {
                opacity: 1;
                background: rgba(255,255,255,0.1);
            }

            /* Editor */
            .ide-editor-wrapper {
                flex: 1;
                overflow: hidden;
            }

            .ide-editor {
                height: 100%;
                width: 100%;
            }

            .ide-welcome {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                text-align: center;
                color: #6e6e6e;
            }

            .ide-welcome-icon {
                font-size: 64px;
                margin-bottom: 16px;
            }

            .ide-welcome h2 {
                color: #cccccc;
                margin-bottom: 8px;
            }

            .ide-welcome-actions {
                display: flex;
                gap: 12px;
                margin-top: 24px;
            }

            /* Status Bar */
            .ide-statusbar {
                display: flex;
                justify-content: space-between;
                padding: 4px 12px;
                background: #007acc;
                color: white;
                font-size: 12px;
            }

            .ide-status-left,
            .ide-status-right {
                display: flex;
                align-items: center;
                gap: 16px;
            }

            .ide-status-dirty {
                color: #ffd700;
            }

            /* Buttons */
            .ide-container .btn {
                padding: 8px 16px;
                border-radius: 4px;
                border: none;
                cursor: pointer;
                font-size: 13px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: all 0.2s;
            }

            .ide-container .btn-primary {
                background: #0e639c;
                color: white;
            }

            .ide-container .btn-primary:hover {
                background: #1177bb;
            }

            .ide-container .btn-secondary {
                background: #3c3c3c;
                color: #cccccc;
            }

            .ide-container .btn-secondary:hover {
                background: #4c4c4c;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .ide-sidebar {
                    width: 200px;
                }
            }

            @media (max-width: 600px) {
                .ide-sidebar {
                    position: absolute;
                    left: -250px;
                    height: 100%;
                    z-index: 100;
                    transition: left 0.3s;
                }

                .ide-sidebar.open {
                    left: 0;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    /**
     * Load Monaco Editor from CDN
     */
    async loadMonaco() {
        return new Promise((resolve, reject) => {
            // Check if already loaded
            if (window.monaco) {
                this.monaco = window.monaco;
                resolve(this.monaco);
                return;
            }

            // Load Monaco loader
            const loaderScript = document.createElement('script');
            loaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs/loader.min.js';
            
            loaderScript.onload = () => {
                window.require.config({
                    paths: {
                        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs'
                    }
                });

                window.require(['vs/editor/editor.main'], () => {
                    this.monaco = window.monaco;
                    console.log('✅ IDE: Monaco Editor loaded');
                    resolve(this.monaco);
                });
            };

            loaderScript.onerror = () => {
                console.error('❌ IDE: Failed to load Monaco');
                reject(new Error('Failed to load Monaco Editor'));
            };

            document.head.appendChild(loaderScript);
        });
    }

    /**
     * Bind UI event handlers
     */
    bindUIEvents() {
        // New file button
        document.getElementById('newFileBtn')?.addEventListener('click', () => {
            this.createNewFile();
        });

        // Refresh files button
        document.getElementById('refreshFilesBtn')?.addEventListener('click', () => {
            this.refreshFileTree();
        });

        // Create project button
        document.getElementById('createProjectBtn')?.addEventListener('click', () => {
            this.createNewProject();
        });

        // Load day project button
        document.getElementById('loadDayProjectBtn')?.addEventListener('click', () => {
            this.showDayProjectPicker();
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyBindings() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + S = Save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveActiveFile();
            }

            // Ctrl/Cmd + W = Close tab
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                e.preventDefault();
                if (this.activeFile) {
                    this.closeFile(this.activeFile);
                }
            }

            // Ctrl/Cmd + P = Quick open
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.showQuickOpen();
            }
        });
    }

    /**
     * Load a project into the IDE
     * @param {string} projectId - Project identifier
     */
    async loadProject(projectId) {
        this.currentProject = projectId;
        
        // Get or create project files
        let files = await VFS.listProjectFiles(projectId);
        
        if (files.length === 0) {
            // Create default project structure
            await VFS.createProject(projectId, `Day ${projectId.replace('day-', '')} Project`);
            files = await VFS.listProjectFiles(projectId);
        }

        this.refreshFileTree();
        
        // Open index.html by default
        const indexFile = files.find(f => f.name === 'index.html');
        if (indexFile) {
            await this.openFile(indexFile.path);
        }

        console.log(`📂 IDE: Loaded project ${projectId}`);
    }

    /**
     * Refresh the file tree display
     */
    async refreshFileTree() {
        const fileTree = document.getElementById('fileTree');
        if (!fileTree) return;

        if (!this.currentProject) {
            fileTree.innerHTML = '<p class="ide-empty-state">No project loaded</p>';
            return;
        }

        const files = await VFS.listProjectFiles(this.currentProject);
        
        if (files.length === 0) {
            fileTree.innerHTML = '<p class="ide-empty-state">No files in project</p>';
            return;
        }

        fileTree.innerHTML = `
            <div class="ide-folder-item">
                <span>📂</span>
                <span>${this.currentProject}</span>
            </div>
            ${files.map(file => `
                <div class="ide-file-item ${file.path === this.activeFile ? 'active' : ''} ${this.isDirty.has(file.path) ? 'dirty' : ''}" 
                     data-path="${file.path}">
                    <span class="ide-file-icon ${file.name.split('.').pop()}">${this.getFileIcon(file.name)}</span>
                    <span>${file.name}</span>
                </div>
            `).join('')}
        `;

        // Bind click events
        fileTree.querySelectorAll('.ide-file-item').forEach(item => {
            item.addEventListener('click', () => {
                this.openFile(item.dataset.path);
            });
        });

        // Update storage info
        this.updateStorageInfo();
    }

    /**
     * Open a file in the editor
     * @param {string} path - File path
     */
    async openFile(path) {
        const file = await VFS.readFile(path);
        if (!file) {
            console.error(`❌ IDE: File not found: ${path}`);
            return;
        }

        this.activeFile = path;
        
        // Create or get editor
        await this.createOrShowEditor(path, file.content, VFS.getLanguage(path));
        
        // Update tabs
        this.updateTabs();
        
        // Update file tree selection
        this.refreshFileTree();
        
        // Update status bar
        this.updateStatusBar(path);
        
        this.onFileOpen(path, file);
        console.log(`📄 IDE: Opened ${path}`);
    }

    /**
     * Create or show an editor for a file
     */
    async createOrShowEditor(path, content, language) {
        const editorContainer = document.getElementById('monacoEditor');
        
        // Clear welcome screen
        const welcome = editorContainer.querySelector('.ide-welcome');
        if (welcome) {
            welcome.remove();
        }

        // Hide all existing editors
        this.editors.forEach((editor, editorPath) => {
            const container = editor.getContainerDomNode();
            if (container) {
                container.style.display = editorPath === path ? 'block' : 'none';
            }
        });

        // Check if editor already exists
        if (this.editors.has(path)) {
            const existingEditor = this.editors.get(path);
            existingEditor.getContainerDomNode().style.display = 'block';
            existingEditor.focus();
            return existingEditor;
        }

        // Create new editor container
        const editorDiv = document.createElement('div');
        editorDiv.id = `editor-${path.replace(/[^a-z0-9]/gi, '-')}`;
        editorDiv.style.height = '100%';
        editorDiv.style.width = '100%';
        editorContainer.appendChild(editorDiv);

        // Wait for Monaco
        await this.loadMonaco();

        // Create Monaco editor
        const editor = this.monaco.editor.create(editorDiv, {
            value: content,
            language: language,
            theme: this.options.theme,
            fontSize: this.options.fontSize,
            minimap: { enabled: this.options.minimap },
            wordWrap: this.options.wordWrap,
            automaticLayout: true,
            scrollBeyondLastLine: false,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            formatOnPaste: true,
            formatOnType: true,
            tabSize: 2
        });

        // Track changes
        editor.onDidChangeModelContent(() => {
            this.markDirty(path);
            
            // Auto-save with debounce
            if (this.options.autoSave) {
                clearTimeout(this.autoSaveTimer);
                this.autoSaveTimer = setTimeout(() => {
                    this.saveFile(path, editor.getValue());
                }, this.options.autoSaveDelay);
            }

            this.onFileChange(path, editor.getValue());
        });

        // Track cursor position
        editor.onDidChangeCursorPosition((e) => {
            const position = e.position;
            document.getElementById('statusPosition').textContent = 
                `Ln ${position.lineNumber}, Col ${position.column}`;
        });

        this.editors.set(path, editor);
        editor.focus();

        return editor;
    }

    /**
     * Update tabs display
     */
    updateTabs() {
        const tabsContainer = document.getElementById('editorTabs');
        if (!tabsContainer) return;

        const openFiles = Array.from(this.editors.keys());

        if (openFiles.length === 0) {
            tabsContainer.innerHTML = '<div class="ide-tabs-placeholder">Open a file to start editing</div>';
            return;
        }

        tabsContainer.innerHTML = openFiles.map(path => {
            const name = path.split('/').pop();
            const isActive = path === this.activeFile;
            const isDirty = this.isDirty.has(path);

            return `
                <button class="ide-tab ${isActive ? 'active' : ''} ${isDirty ? 'dirty' : ''}" 
                        data-path="${path}">
                    <span class="ide-file-icon ${name.split('.').pop()}">${this.getFileIcon(name)}</span>
                    <span class="ide-tab-name">${name}</span>
                    <span class="ide-tab-close" data-close="${path}">
                        <i class="fas fa-times"></i>
                    </span>
                </button>
            `;
        }).join('');

        // Bind tab events
        tabsContainer.querySelectorAll('.ide-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                if (!e.target.closest('.ide-tab-close')) {
                    this.openFile(tab.dataset.path);
                }
            });
        });

        tabsContainer.querySelectorAll('.ide-tab-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeFile(closeBtn.dataset.close);
            });
        });
    }

    /**
     * Close a file
     * @param {string} path - File path
     */
    async closeFile(path) {
        // Check for unsaved changes
        if (this.isDirty.has(path)) {
            const save = confirm(`Save changes to ${path.split('/').pop()}?`);
            if (save) {
                await this.saveFile(path);
            }
        }

        // Destroy editor
        const editor = this.editors.get(path);
        if (editor) {
            const container = editor.getContainerDomNode();
            editor.dispose();
            container?.remove();
            this.editors.delete(path);
        }

        this.isDirty.delete(path);

        // Switch to another open file
        if (this.activeFile === path) {
            const remainingFiles = Array.from(this.editors.keys());
            if (remainingFiles.length > 0) {
                this.openFile(remainingFiles[0]);
            } else {
                this.activeFile = null;
                this.showWelcome();
            }
        }

        this.updateTabs();
    }

    /**
     * Save a file
     * @param {string} path - File path
     * @param {string} content - Optional content (uses editor content if not provided)
     */
    async saveFile(path, content = null) {
        const editor = this.editors.get(path);
        const fileContent = content || (editor ? editor.getValue() : null);
        
        if (!fileContent) {
            console.warn(`IDE: No content to save for ${path}`);
            return;
        }

        await VFS.saveFile(path, fileContent, { projectId: this.currentProject });
        
        this.isDirty.delete(path);
        this.updateTabs();
        this.refreshFileTree();
        this.updateStatusBar(path);
        
        this.onFileSave(path, fileContent);
        console.log(`💾 IDE: Saved ${path}`);
    }

    /**
     * Save the active file
     */
    async saveActiveFile() {
        if (this.activeFile) {
            await this.saveFile(this.activeFile);
        }
    }

    /**
     * Mark a file as dirty (unsaved changes)
     */
    markDirty(path) {
        this.isDirty.add(path);
        this.updateTabs();
        
        const dirtyIndicator = document.getElementById('statusDirty');
        if (dirtyIndicator) {
            dirtyIndicator.style.display = 'inline';
        }
    }

    /**
     * Update status bar
     */
    updateStatusBar(path) {
        document.getElementById('statusFile').textContent = path || 'No file open';
        document.getElementById('statusLanguage').textContent = 
            path ? VFS.getLanguage(path).toUpperCase() : '-';
        
        const dirtyIndicator = document.getElementById('statusDirty');
        if (dirtyIndicator) {
            dirtyIndicator.style.display = this.isDirty.has(path) ? 'inline' : 'none';
        }
    }

    /**
     * Update storage info display
     */
    async updateStorageInfo() {
        const info = await VFS.getStorageInfo();
        const infoEl = document.getElementById('storageInfo');
        if (infoEl) {
            infoEl.textContent = `${info.fileCount} files · ${info.formattedSize}`;
        }
    }

    /**
     * Show welcome screen
     */
    showWelcome() {
        const editorContainer = document.getElementById('monacoEditor');
        editorContainer.innerHTML = `
            <div class="ide-welcome">
                <div class="ide-welcome-icon">🚀</div>
                <h2>Mission Control IDE</h2>
                <p>Select a file from the explorer or create a new project</p>
                <div class="ide-welcome-actions">
                    <button class="btn btn-primary" id="createProjectBtn">
                        <i class="fas fa-folder-plus"></i> New Project
                    </button>
                    <button class="btn btn-secondary" id="loadDayProjectBtn">
                        <i class="fas fa-calendar-day"></i> Load Day Project
                    </button>
                </div>
            </div>
        `;
        this.bindUIEvents();
    }

    /**
     * Create a new project
     */
    async createNewProject() {
        const name = prompt('Enter project name (e.g., day-01, my-project):');
        if (!name) return;

        const projectId = name.toLowerCase().replace(/\s+/g, '-');
        await VFS.createProject(projectId, name);
        await this.loadProject(projectId);
    }

    /**
     * Create a new file in current project
     */
    async createNewFile() {
        if (!this.currentProject) {
            alert('Please load a project first');
            return;
        }

        const fileName = prompt('Enter file name (e.g., utils.js):');
        if (!fileName) return;

        const path = `${this.currentProject}/${fileName}`;
        await VFS.saveFile(path, '', { projectId: this.currentProject });
        await this.refreshFileTree();
        await this.openFile(path);
    }

    /**
     * Show day project picker
     */
    showDayProjectPicker() {
        const day = prompt('Enter day number (1-100):');
        if (!day || isNaN(day)) return;

        const projectId = `day-${day.padStart(2, '0')}`;
        this.loadProject(projectId);
    }

    /**
     * Show quick open dialog
     */
    async showQuickOpen() {
        const files = await VFS.listAllFiles();
        const fileNames = files.map(f => f.path).join('\n');
        const selected = prompt('Quick Open (enter file path):\n\n' + fileNames);
        
        if (selected && files.some(f => f.path === selected)) {
            this.openFile(selected);
        }
    }

    /**
     * Get file icon based on extension
     */
    getFileIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            'html': '📄',
            'htm': '📄',
            'css': '🎨',
            'js': '⚡',
            'json': '📋',
            'md': '📝',
            'txt': '📃',
            'svg': '🖼️'
        };
        return icons[ext] || '📄';
    }

    /**
     * Get current project files for preview
     */
    async getProjectFiles() {
        if (!this.currentProject) return {};
        
        const files = await VFS.listProjectFiles(this.currentProject);
        const result = {};
        
        for (const file of files) {
            // Use editor content if open, otherwise file content
            const editor = this.editors.get(file.path);
            result[file.name] = editor ? editor.getValue() : file.content;
        }
        
        return result;
    }

    /**
     * Dispose all editors and cleanup
     */
    dispose() {
        this.editors.forEach(editor => editor.dispose());
        this.editors.clear();
        this.isDirty.clear();
        clearTimeout(this.autoSaveTimer);
    }
}

// Export for modules
export { IDEComponent };

// Global for non-module scripts
if (typeof window !== 'undefined') {
    window.IDEComponent = IDEComponent;
}
