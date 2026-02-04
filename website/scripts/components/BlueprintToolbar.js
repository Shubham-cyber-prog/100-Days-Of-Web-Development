/**
 * Blueprint Toolbar Component
 * Tool selection, color picker, and action buttons
 * @version 1.0.0
 */

export class BlueprintToolbar {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.currentTool = 'select';
        this.currentColor = options.defaultColor || '#58a6ff';
        this.listeners = [];
        
        this.tools = [
            { id: 'select', icon: '↖️', label: 'Select', shortcut: 'V' },
            { id: 'rectangle', icon: '▢', label: 'Rectangle', shortcut: 'R' },
            { id: 'circle', icon: '○', label: 'Circle', shortcut: 'C' },
            { id: 'line', icon: '╱', label: 'Line', shortcut: 'L' },
            { id: 'arrow', icon: '→', label: 'Arrow', shortcut: 'A' },
            { id: 'text', icon: 'T', label: 'Text', shortcut: 'T' }
        ];
        
        this.render();
        this.setupKeyboardShortcuts();
    }

    render() {
        this.container.innerHTML = `
            <div class="blueprint-toolbar">
                <div class="toolbar-section">
                    <h4 class="toolbar-title">Tools</h4>
                    <div class="tool-buttons">
                        ${this.tools.map(tool => `
                            <button 
                                class="tool-btn ${tool.id === this.currentTool ? 'active' : ''}" 
                                data-tool="${tool.id}"
                                title="${tool.label} (${tool.shortcut})">
                                <span class="tool-icon">${tool.icon}</span>
                                <span class="tool-label">${tool.label}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <h4 class="toolbar-title">Color</h4>
                    <div class="color-picker-wrapper">
                        <input type="color" id="colorPicker" value="${this.currentColor}" class="color-input">
                        <div class="color-presets">
                            <button class="color-preset" data-color="#58a6ff" style="background: #58a6ff;"></button>
                            <button class="color-preset" data-color="#39d353" style="background: #39d353;"></button>
                            <button class="color-preset" data-color="#f97316" style="background: #f97316;"></button>
                            <button class="color-preset" data-color="#c297ff" style="background: #c297ff;"></button>
                            <button class="color-preset" data-color="#ffffff" style="background: #ffffff;"></button>
                            <button class="color-preset" data-color="#000000" style="background: #000000;"></button>
                        </div>
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <h4 class="toolbar-title">Actions</h4>
                    <div class="action-buttons">
                        <button class="action-btn" id="undoBtn" title="Undo (Ctrl+Z)">
                            <span>↶</span> Undo
                        </button>
                        <button class="action-btn" id="redoBtn" title="Redo (Ctrl+Y)">
                            <span>↷</span> Redo
                        </button>
                        <button class="action-btn" id="clearBtn" title="Clear All">
                            <span>🗑️</span> Clear
                        </button>
                        <button class="action-btn" id="exportBtn" title="Export">
                            <span>💾</span> Export
                        </button>
                        <button class="action-btn" id="importBtn" title="Import">
                            <span>📁</span> Import
                        </button>
                    </div>
                </div>
                
                <div class="toolbar-section">
                    <h4 class="toolbar-title">Collaborators</h4>
                    <div id="collaboratorsList" class="collaborators-list">
                        <div class="collaborator-placeholder">No one else here yet...</div>
                    </div>
                </div>
            </div>
        `;
        
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Tool buttons
        this.container.querySelectorAll('.tool-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tool = btn.dataset.tool;
                this.setTool(tool);
                this.emit('toolChanged', tool);
            });
        });
        
        // Color picker
        const colorPicker = this.container.querySelector('#colorPicker');
        colorPicker.addEventListener('change', (e) => {
            this.currentColor = e.target.value;
            this.emit('colorChanged', this.currentColor);
        });
        
        // Color presets
        this.container.querySelectorAll('.color-preset').forEach(btn => {
            btn.addEventListener('click', () => {
                const color = btn.dataset.color;
                this.currentColor = color;
                colorPicker.value = color;
                this.emit('colorChanged', color);
            });
        });
        
        // Action buttons
        document.getElementById('undoBtn')?.addEventListener('click', () => this.emit('undo'));
        document.getElementById('redoBtn')?.addEventListener('click', () => this.emit('redo'));
        document.getElementById('clearBtn')?.addEventListener('click', () => this.emit('clear'));
        document.getElementById('exportBtn')?.addEventListener('click', () => this.emit('export'));
        document.getElementById('importBtn')?.addEventListener('click', () => this.emit('import'));
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Tool shortcuts
            if (!e.ctrlKey && !e.metaKey) {
                const toolMap = {
                    'v': 'select', 'r': 'rectangle', 'c': 'circle',
                    'l': 'line', 'a': 'arrow', 't': 'text'
                };
                
                const tool = toolMap[e.key.toLowerCase()];
                if (tool) {
                    this.setTool(tool);
                    this.emit('toolChanged', tool);
                }
            }
            
            // Undo/Redo
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 'z' && !e.shiftKey) {
                    e.preventDefault();
                    this.emit('undo');
                } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
                    e.preventDefault();
                    this.emit('redo');
                }
            }
        });
    }

    setTool(toolId) {
        this.currentTool = toolId;
        this.container.querySelectorAll('.tool-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tool === toolId);
        });
    }

    updateCollaborators(users) {
        const listContainer = this.container.querySelector('#collaboratorsList');
        
        if (users.length === 0) {
            listContainer.innerHTML = '<div class="collaborator-placeholder">No one else here yet...</div>';
            return;
        }
        
        listContainer.innerHTML = users.map(user => `
            <div class="collaborator-item" style="--user-color: ${user.color}">
                <div class="collaborator-avatar" style="background: ${user.color}">
                    ${user.name.charAt(0).toUpperCase()}
                </div>
                <span class="collaborator-name">${user.name}</span>
            </div>
        `).join('');
    }

    emit(eventName, data) {
        this.listeners
            .filter(l => l.eventName === eventName)
            .forEach(l => l.callback(data));
    }

    on(eventName, callback) {
        this.listeners.push({ eventName, callback });
        return () => {
            this.listeners = this.listeners.filter(
                l => l.eventName !== eventName || l.callback !== callback
            );
        };
    }
}
