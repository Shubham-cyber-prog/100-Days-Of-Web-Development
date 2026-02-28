/**
 * CodePlayground.js
 * Interactive code editor component using Monaco Editor
 * Provides HTML/CSS/JS panels with live preview functionality
 */

export class CodePlayground {
    constructor(container) {
        this.container = container;
        this.editors = {};
        this.previewFrame = null;
        this.currentProject = null;
        this.savedSnippets = JSON.parse(localStorage.getItem('codeplayground_snippets') || '{}');

        this.init();
    }

    async init() {
        // Wait for Monaco to load
        if (!window.monaco) {
            await this.loadMonaco();
        }

        this.createUI();
        this.setupEventListeners();
        this.loadDefaultCode();
    }

    async loadMonaco() {
        return new Promise((resolve) => {
            require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });
            require(['vs/editor/editor.main'], () => {
                resolve();
            });
        });
    }

    createUI() {
        this.container.innerHTML = `
            <div class="code-playground">
                <div class="playground-toolbar">
                    <div class="panel-tabs">
                        <button class="panel-tab active" data-panel="html">HTML</button>
                        <button class="panel-tab" data-panel="css">CSS</button>
                        <button class="panel-tab" data-panel="js">JS</button>
                    </div>
                    <div class="playground-actions">
                        <button class="action-btn" id="runCode" title="Run Code">
                            <i class="fas fa-play"></i> Run
                        </button>
                        <button class="action-btn" id="saveSnippet" title="Save Snippet">
                            <i class="fas fa-save"></i> Save
                        </button>
                        <button class="action-btn" id="forkSnippet" title="Fork Snippet">
                            <i class="fas fa-code-branch"></i> Fork
                        </button>
                        <button class="action-btn" id="resetCode" title="Reset Code">
                            <i class="fas fa-undo"></i> Reset
                        </button>
                    </div>
                </div>

                <div class="playground-content">
                    <div class="code-panels">
                        <div class="code-panel active" data-panel="html">
                            <div class="editor-container" id="htmlEditor"></div>
                        </div>
                        <div class="code-panel" data-panel="css">
                            <div class="editor-container" id="cssEditor"></div>
                        </div>
                        <div class="code-panel" data-panel="js">
                            <div class="editor-container" id="jsEditor"></div>
                        </div>
                    </div>

                    <div class="preview-panel">
                        <div class="preview-toolbar">
                            <span class="preview-label">Live Preview</span>
                            <div class="preview-controls">
                                <button class="control-btn" id="refreshPreview" title="Refresh">
                                    <i class="fas fa-sync-alt"></i>
                                </button>
                                <button class="control-btn" id="openInNewTab" title="Open in New Tab">
                                    <i class="fas fa-external-link-alt"></i>
                                </button>
                            </div>
                        </div>
                        <iframe class="preview-iframe" id="previewFrame" sandbox="allow-scripts allow-same-origin"></iframe>
                    </div>
                </div>
            </div>
        `;

        // Initialize Monaco editors
        this.initEditors();
    }

    initEditors() {
        const editorOptions = {
            theme: 'vs-dark',
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false
        };

        // HTML Editor
        this.editors.html = monaco.editor.create(
            document.getElementById('htmlEditor'),
            {
                ...editorOptions,
                language: 'html',
                value: this.getDefaultCode('html')
            }
        );

        // CSS Editor
        this.editors.css = monaco.editor.create(
            document.getElementById('cssEditor'),
            {
                ...editorOptions,
                language: 'css',
                value: this.getDefaultCode('css')
            }
        );

        // JS Editor
        this.editors.js = monaco.editor.create(
            document.getElementById('jsEditor'),
            {
                ...editorOptions,
                language: 'javascript',
                value: this.getDefaultCode('js')
            }
        );

        this.previewFrame = document.getElementById('previewFrame');
    }

    setupEventListeners() {
        // Panel tabs
        this.container.querySelectorAll('.panel-tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchPanel(tab.dataset.panel));
        });

        // Action buttons
        document.getElementById('runCode').addEventListener('click', () => this.runCode());
        document.getElementById('saveSnippet').addEventListener('click', () => this.saveSnippet());
        document.getElementById('forkSnippet').addEventListener('click', () => this.forkSnippet());
        document.getElementById('resetCode').addEventListener('click', () => this.resetCode());
        document.getElementById('refreshPreview').addEventListener('click', () => this.runCode());
        document.getElementById('openInNewTab').addEventListener('click', () => this.openInNewTab());

        // Auto-run on editor changes (debounced)
        let timeout;
        Object.values(this.editors).forEach(editor => {
            editor.onDidChangeModelContent(() => {
                clearTimeout(timeout);
                timeout = setTimeout(() => this.runCode(), 500);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.saveSnippet();
                        break;
                    case 'Enter':
                        if (e.shiftKey) {
                            e.preventDefault();
                            this.runCode();
                        }
                        break;
                }
            }
        });
    }

    switchPanel(panel) {
        // Update tab states
        this.container.querySelectorAll('.panel-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.panel === panel);
        });

        // Update panel states
        this.container.querySelectorAll('.code-panel').forEach(p => {
            p.classList.toggle('active', p.dataset.panel === panel);
        });

        // Focus the editor
        if (this.editors[panel]) {
            this.editors[panel].focus();
        }
    }

    runCode() {
        const html = this.editors.html.getValue();
        const css = this.editors.css.getValue();
        const js = this.editors.js.getValue();

        const fullHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Playground Preview</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
                    ${css}
                </style>
            </head>
            <body>
                ${html}
                <script>
                    try {
                        ${js}
                    } catch (error) {
                        console.error('JavaScript Error:', error);
                        document.body.innerHTML += '<div style="color: red; margin-top: 20px; padding: 10px; border: 1px solid red; background: #fee;">JavaScript Error: ' + error.message + '</div>';
                    }
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        this.previewFrame.src = url;

        // Clean up the blob URL after a delay
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    saveSnippet() {
        const name = prompt('Enter a name for your snippet:');
        if (!name) return;

        const snippet = {
            name,
            html: this.editors.html.getValue(),
            css: this.editors.css.getValue(),
            js: this.editors.js.getValue(),
            timestamp: Date.now(),
            projectId: this.currentProject?.day || 'custom'
        };

        this.savedSnippets[name] = snippet;
        localStorage.setItem('codeplayground_snippets', JSON.stringify(this.savedSnippets));

        // Show success message
        this.showNotification('Snippet saved successfully!', 'success');
    }

    forkSnippet() {
        const snippets = Object.keys(this.savedSnippets);
        if (snippets.length === 0) {
            this.showNotification('No saved snippets to fork from', 'info');
            return;
        }

        const selected = prompt(`Choose a snippet to fork:\n${snippets.join('\n')}`);
        if (!selected || !this.savedSnippets[selected]) return;

        const snippet = this.savedSnippets[selected];
        const forkName = `${selected} (Fork)`;

        // Load the snippet
        this.editors.html.setValue(snippet.html);
        this.editors.css.setValue(snippet.css);
        this.editors.js.setValue(snippet.js);

        this.showNotification(`Forked from "${selected}"`, 'success');
    }

    resetCode() {
        if (confirm('Reset all code to default? This will lose unsaved changes.')) {
            this.loadDefaultCode();
            this.runCode();
        }
    }

    loadDefaultCode() {
        this.editors.html.setValue(this.getDefaultCode('html'));
        this.editors.css.setValue(this.getDefaultCode('css'));
        this.editors.js.setValue(this.getDefaultCode('js'));
    }

    loadProjectCode(project) {
        this.currentProject = project;

        // Try to load project-specific code or fall back to defaults
        const projectSnippet = Object.values(this.savedSnippets).find(s => s.projectId === project.day);
        if (projectSnippet) {
            this.editors.html.setValue(projectSnippet.html);
            this.editors.css.setValue(projectSnippet.css);
            this.editors.js.setValue(projectSnippet.js);
        } else {
            this.loadDefaultCode();
        }

        this.runCode();
    }

    openInNewTab() {
        const html = this.editors.html.getValue();
        const css = this.editors.css.getValue();
        const js = this.editors.js.getValue();

        const fullHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Code Playground - ${this.currentProject?.title || 'Custom'}</title>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;

        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        window.open(url, '_blank');

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    }

    getDefaultCode(type) {
        const defaults = {
            html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>Welcome to the interactive code playground.</p>
        <button id="myButton">Click me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`,
            css: `body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    min-height: 100vh;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
    color: #4a5568;
    text-align: center;
    margin-bottom: 20px;
}

button {
    background: #4299e1;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;
}

button:hover {
    background: #3182ce;
}

#output {
    margin-top: 20px;
    padding: 15px;
    background: #f7fafc;
    border-radius: 5px;
    border-left: 4px solid #4299e1;
}`,
            js: `// JavaScript Code
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('myButton');
    const output = document.getElementById('output');

    button.addEventListener('click', function() {
        const timestamp = new Date().toLocaleString();
        output.innerHTML = '<p>Button clicked at: ' + timestamp + '</p>';
        output.innerHTML += '<p>Random number: ' + Math.floor(Math.random() * 100) + '</p>';

        // Add some animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    });

    // Add keyboard shortcut
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            button.click();
        }
    });

    console.log('Code playground initialized!');
});`
        };

        return defaults[type] || '';
    }

    showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
            color: white;
            padding: 12px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    destroy() {
        // Clean up editors
        Object.values(this.editors).forEach(editor => {
            if (editor) editor.dispose();
        });
        this.editors = {};
    }
}

// CSS for the playground component
const playgroundStyles = `
<style>
.code-playground {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-primary, #1e1e1e);
    border-radius: 8px;
    overflow: hidden;
}

.playground-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-secondary, #2d2d2d);
    border-bottom: 1px solid var(--border-color, #404040);
}

.panel-tabs {
    display: flex;
    gap: 4px;
}

.panel-tab {
    background: transparent;
    border: 1px solid var(--border-color, #555);
    color: var(--text-secondary, #ccc);
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s ease;
}

.panel-tab.active {
    background: var(--accent-color, #007acc);
    border-color: var(--accent-color, #007acc);
    color: white;
}

.panel-tab:hover {
    border-color: var(--accent-color, #007acc);
    color: var(--text-primary, #fff);
}

.playground-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    background: var(--bg-tertiary, #404040);
    border: 1px solid var(--border-color, #555);
    color: var(--text-secondary, #ccc);
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
}

.action-btn:hover {
    background: var(--accent-color, #007acc);
    border-color: var(--accent-color, #007acc);
    color: white;
}

.playground-content {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.code-panels {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--border-color, #404040);
}

.code-panel {
    flex: 1;
    display: none;
    position: relative;
}

.code-panel.active {
    display: block;
}

.editor-container {
    width: 100%;
    height: 100%;
}

.preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
}

.preview-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: var(--bg-secondary, #f5f5f5);
    border-bottom: 1px solid var(--border-color, #ddd);
}

.preview-label {
    font-size: 13px;
    font-weight: 500;
    color: var(--text-primary, #333);
}

.preview-controls {
    display: flex;
    gap: 4px;
}

.control-btn {
    background: transparent;
    border: 1px solid var(--border-color, #ccc);
    color: var(--text-secondary, #666);
    padding: 4px 8px;
    border-radius: 3px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.2s ease;
}

.control-btn:hover {
    background: var(--accent-color, #007acc);
    border-color: var(--accent-color, #007acc);
    color: white;
}

.preview-iframe {
    flex: 1;
    width: 100%;
    border: none;
    background: white;
}

.notification {
    font-family: Arial, sans-serif;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
    .playground-content {
        flex-direction: column;
    }

    .code-panels {
        border-right: none;
        border-bottom: 1px solid var(--border-color, #404040);
        max-height: 50vh;
    }

    .preview-panel {
        max-height: 50vh;
    }

    .playground-toolbar {
        flex-wrap: wrap;
        gap: 8px;
    }

    .playground-actions {
        flex-wrap: wrap;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', playgroundStyles);
