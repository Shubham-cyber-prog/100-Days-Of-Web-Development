/**
 * Mission Control - Page Orchestration
 * Integrates IDE, Preview, and Console components
 * Issue #1118
 */

import { IDEComponent } from '../components/IDE.js';
import { VFS } from '../core/vfsService.js';

class MissionControl {
    constructor() {
        this.ide = null;
        this.currentProject = null;
        this.previewDebounceTimer = null;
        this.consoleMessages = [];
        
        this.init();
    }

    /**
     * Initialize Mission Control
     */
    async init() {
        console.log('🚀 Mission Control initializing...');
        
        // Wait for VFS to be ready
        await VFS.readyPromise;
        
        // Initialize IDE
        this.ide = new IDEComponent('ideContainer', {
            theme: 'vs-dark',
            autoSave: true,
            autoSaveDelay: 1000,
            onFileChange: (path, content) => this.handleFileChange(path, content),
            onFileSave: (path, content) => this.handleFileSave(path, content)
        });

        // Bind UI events
        this.bindEvents();
        
        // Setup console interceptor
        this.setupConsoleInterceptor();
        
        // Setup resize functionality
        this.setupResize();
        
        // Load projects into selector
        await this.loadProjectList();
        
        // Check URL for project param
        const urlParams = new URLSearchParams(window.location.search);
        const projectParam = urlParams.get('project');
        if (projectParam) {
            await this.loadProject(projectParam);
        }

        console.log('✅ Mission Control ready!');
    }

    /**
     * Bind UI event handlers
     */
    bindEvents() {
        // Project selector
        const projectSelector = document.getElementById('projectSelector');
        projectSelector?.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                this.createNewProject();
                e.target.value = '';
            } else if (e.target.value) {
                this.loadProject(e.target.value);
            }
        });

        // Save all button
        document.getElementById('saveAllBtn')?.addEventListener('click', () => {
            this.ide?.saveActiveFile();
            this.showNotification('Files saved!', 'success');
        });

        // Sync to cloud button
        document.getElementById('syncCloudBtn')?.addEventListener('click', () => {
            this.syncToCloud();
        });

        // Run button
        document.getElementById('runBtn')?.addEventListener('click', () => {
            this.runPreview();
        });

        // Refresh preview button
        document.getElementById('refreshPreviewBtn')?.addEventListener('click', () => {
            this.runPreview();
        });

        // Open external button
        document.getElementById('openExternalBtn')?.addEventListener('click', () => {
            this.openInNewTab();
        });

        // Device buttons
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setDeviceMode(btn.dataset.device);
            });
        });

        // Clear console button
        document.getElementById('clearConsoleBtn')?.addEventListener('click', () => {
            this.clearConsole();
        });

        // Console tabs
        document.querySelectorAll('.console-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.console-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter = Run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runPreview();
            }
        });
    }

    /**
     * Load list of available projects
     */
    async loadProjectList() {
        const files = await VFS.listAllFiles();
        const projects = [...new Set(files.map(f => f.projectId).filter(Boolean))];
        
        const selector = document.getElementById('projectSelector');
        if (!selector) return;

        // Clear existing options except first two
        while (selector.options.length > 1) {
            selector.remove(1);
        }

        // Add project options
        projects.forEach(projectId => {
            const option = document.createElement('option');
            option.value = projectId;
            option.textContent = this.formatProjectName(projectId);
            selector.insertBefore(option, selector.lastElementChild);
        });

        // Re-add custom option at end
        const customOption = document.createElement('option');
        customOption.value = 'custom';
        customOption.textContent = '+ New Project';
        selector.appendChild(customOption);
    }

    /**
     * Format project ID to display name
     */
    formatProjectName(projectId) {
        if (projectId.startsWith('day-')) {
            const day = projectId.replace('day-', '');
            return `Day ${day}`;
        }
        return projectId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    /**
     * Load a project
     */
    async loadProject(projectId) {
        this.currentProject = projectId;
        
        // Update URL
        const url = new URL(window.location);
        url.searchParams.set('project', projectId);
        window.history.replaceState({}, '', url);

        // Update selector
        const selector = document.getElementById('projectSelector');
        if (selector) selector.value = projectId;

        // Load in IDE
        await this.ide.loadProject(projectId);
        
        // Run initial preview
        setTimeout(() => this.runPreview(), 500);
        
        this.logToConsole('info', `Loaded project: ${this.formatProjectName(projectId)}`);
    }

    /**
     * Create a new project
     */
    async createNewProject() {
        const name = prompt('Enter project name:');
        if (!name) return;

        const projectId = name.toLowerCase().replace(/\s+/g, '-');
        await VFS.createProject(projectId, name);
        await this.loadProjectList();
        await this.loadProject(projectId);
        
        this.showNotification(`Created project: ${name}`, 'success');
    }

    /**
     * Handle file change from IDE
     */
    handleFileChange(path, content) {
        // Debounce preview updates
        clearTimeout(this.previewDebounceTimer);
        this.previewDebounceTimer = setTimeout(() => {
            this.runPreview();
        }, 500);
    }

    /**
     * Handle file save from IDE
     */
    handleFileSave(path, content) {
        this.logToConsole('info', `Saved: ${path.split('/').pop()}`);
    }

    /**
     * Run the preview
     */
    async runPreview() {
        if (!this.currentProject) {
            this.logToConsole('warn', 'No project loaded');
            return;
        }

        try {
            const files = await this.ide.getProjectFiles();
            
            if (!files['index.html']) {
                this.logToConsole('error', 'No index.html found in project');
                return;
            }

            // Build the HTML document with embedded CSS and JS
            let html = files['index.html'];
            
            // Inject CSS inline
            if (files['style.css']) {
                const styleTag = `<style>${files['style.css']}</style>`;
                html = html.replace('</head>', `${styleTag}</head>`);
                // Also replace link tag if present
                html = html.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, '');
            }

            // Inject JS inline with console interceptor
            const consoleInterceptor = this.getConsoleInterceptorScript();
            
            if (files['script.js']) {
                const scriptContent = files['script.js'];
                html = html.replace(
                    /<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi,
                    `<script>${consoleInterceptor}\n${scriptContent}</script>`
                );
                // If no script tag was replaced, add before </body>
                if (!html.includes(consoleInterceptor)) {
                    html = html.replace(
                        '</body>',
                        `<script>${consoleInterceptor}\n${scriptContent}</script></body>`
                    );
                }
            } else {
                // Just add console interceptor
                html = html.replace(
                    '</body>',
                    `<script>${consoleInterceptor}</script></body>`
                );
            }

            // Create blob URL for sandboxed execution
            const blob = new Blob([html], { type: 'text/html' });
            const blobUrl = URL.createObjectURL(blob);

            // Update iframe
            const iframe = document.getElementById('previewFrame');
            if (iframe) {
                // Revoke old blob URL
                if (iframe.dataset.blobUrl) {
                    URL.revokeObjectURL(iframe.dataset.blobUrl);
                }
                
                iframe.src = blobUrl;
                iframe.dataset.blobUrl = blobUrl;
            }

            this.logToConsole('info', '▶ Preview updated');
        } catch (error) {
            this.logToConsole('error', `Preview error: ${error.message}`);
            console.error('Preview error:', error);
        }
    }

    /**
     * Get console interceptor script to inject into preview
     */
    getConsoleInterceptorScript() {
        return `
            (function() {
                const originalConsole = {
                    log: console.log.bind(console),
                    warn: console.warn.bind(console),
                    error: console.error.bind(console),
                    info: console.info.bind(console)
                };

                function sendToParent(type, args) {
                    try {
                        const message = {
                            type: 'console',
                            level: type,
                            args: Array.from(args).map(arg => {
                                if (arg === null) return 'null';
                                if (arg === undefined) return 'undefined';
                                if (typeof arg === 'object') {
                                    try {
                                        return JSON.stringify(arg, null, 2);
                                    } catch (e) {
                                        return String(arg);
                                    }
                                }
                                return String(arg);
                            })
                        };
                        window.parent.postMessage(message, '*');
                    } catch (e) {
                        originalConsole.error('Console intercept error:', e);
                    }
                }

                console.log = function(...args) {
                    originalConsole.log(...args);
                    sendToParent('log', args);
                };

                console.warn = function(...args) {
                    originalConsole.warn(...args);
                    sendToParent('warn', args);
                };

                console.error = function(...args) {
                    originalConsole.error(...args);
                    sendToParent('error', args);
                };

                console.info = function(...args) {
                    originalConsole.info(...args);
                    sendToParent('info', args);
                };

                // Catch unhandled errors
                window.onerror = function(msg, url, line, col, error) {
                    sendToParent('error', ['Uncaught Error: ' + msg + ' (line ' + line + ')']);
                    return false;
                };

                // Catch unhandled promise rejections
                window.onunhandledrejection = function(event) {
                    sendToParent('error', ['Unhandled Promise Rejection: ' + event.reason]);
                };
            })();
        `;
    }

    /**
     * Setup console message interceptor
     */
    setupConsoleInterceptor() {
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'console') {
                const { level, args } = event.data;
                this.logToConsole(level, args.join(' '));
            }
        });
    }

    /**
     * Log message to console panel
     */
    logToConsole(level, message) {
        const output = document.getElementById('consoleOutput');
        if (!output) return;

        // Remove empty state
        const emptyState = output.querySelector('.console-empty');
        if (emptyState) emptyState.remove();

        // Create log line
        const line = document.createElement('div');
        line.className = `console-line ${level}`;
        
        const time = new Date().toLocaleTimeString('en-US', { 
            hour12: false, 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
        });

        const prefix = {
            log: '›',
            warn: '⚠',
            error: '✖',
            info: 'ℹ'
        }[level] || '›';

        line.innerHTML = `
            <span class="console-line-prefix">[${time}] ${prefix}</span>
            <span>${this.escapeHtml(message)}</span>
        `;

        output.appendChild(line);
        output.scrollTop = output.scrollHeight;

        // Store message
        this.consoleMessages.push({ level, message, time: Date.now() });
    }

    /**
     * Clear console output
     */
    clearConsole() {
        const output = document.getElementById('consoleOutput');
        if (output) {
            output.innerHTML = '<div class="console-empty">Console output will appear here...</div>';
        }
        this.consoleMessages = [];
    }

    /**
     * Set device preview mode
     */
    setDeviceMode(device) {
        // Update buttons
        document.querySelectorAll('.device-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.device === device);
        });

        // Update wrapper class
        const wrapper = document.getElementById('previewWrapper');
        if (wrapper) {
            wrapper.className = `preview-frame-wrapper ${device}`;
        }
    }

    /**
     * Open preview in new tab
     */
    async openInNewTab() {
        const iframe = document.getElementById('previewFrame');
        if (iframe && iframe.dataset.blobUrl) {
            window.open(iframe.dataset.blobUrl, '_blank');
        } else {
            this.showNotification('No preview to open', 'warn');
        }
    }

    /**
     * Sync project to cloud
     */
    async syncToCloud() {
        if (!this.currentProject) {
            this.showNotification('No project loaded', 'warn');
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            this.showNotification('Please login to sync to cloud', 'warn');
            return;
        }

        try {
            const synced = await VFS.syncToCloud(this.currentProject, userId);
            if (synced) {
                this.showNotification('Synced to cloud!', 'success');
                this.logToConsole('info', '☁️ Project synced to cloud');
            } else {
                this.showNotification('Cloud sync unavailable', 'warn');
            }
        } catch (error) {
            this.showNotification('Sync failed: ' + error.message, 'error');
            this.logToConsole('error', 'Cloud sync failed: ' + error.message);
        }
    }

    /**
     * Setup panel resize functionality
     */
    setupResize() {
        const handle = document.getElementById('resizeHandle');
        const idePanel = document.querySelector('.ide-panel');
        const previewPanel = document.querySelector('.preview-panel');
        
        if (!handle || !idePanel || !previewPanel) return;

        let isResizing = false;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const container = document.querySelector('.mission-main');
            const containerRect = container.getBoundingClientRect();
            const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;

            if (percentage > 20 && percentage < 80) {
                idePanel.style.flex = `0 0 ${percentage}%`;
                previewPanel.style.flex = `0 0 ${100 - percentage}%`;
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Use Notify if available
        if (window.Notify) {
            window.Notify[type](message);
            return;
        }

        // Fallback notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 60px;
            right: 20px;
            padding: 12px 20px;
            background: ${type === 'success' ? '#3fb950' : type === 'error' ? '#f85149' : type === 'warn' ? '#d29922' : '#58a6ff'};
            color: white;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Escape HTML for safe display
     */
    escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Initialize Mission Control when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.missionControl = new MissionControl();
});

export { MissionControl };
