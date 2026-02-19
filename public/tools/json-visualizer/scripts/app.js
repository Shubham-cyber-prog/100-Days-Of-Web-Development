/**
 * Main Controller
 * Initializes parsing, rendering, and UI interactions
 */

import { JsonParser } from './parser/jsonParser.js';
import { TreeRenderer } from './ui/treeRenderer.js';
import { SchemaValidator } from './validation/schemaValidator.js';
import { FileHandler } from './utils/fileHandler.js';

class App {
    constructor() {
        this.parser = new JsonParser();
        this.renderer = new TreeRenderer('tree-root');
        this.validator = new SchemaValidator();

        // UI References
        this.inputEl = document.getElementById('json-input');
        this.statusEl = document.getElementById('parse-status');
        this.validationEl = document.getElementById('validation-status');

        // Stats
        this.statSize = document.getElementById('stat-size');
        this.statNodes = document.getElementById('stat-nodes');
        this.statDepth = document.getElementById('stat-depth');

        this.init();
    }

    init() {
        this.loadTheme();
        this.bindEvents();

        // Load initial state if any or sample
        // this.loadSample();
    }

    bindEvents() {
        // Real-time parsing (debounced)
        let timeout;
        this.inputEl.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => this.handleInput(), 500);
        });

        // Toolbar Buttons
        document.getElementById('btn-format').addEventListener('click', () => {
            const result = this.parser.format(this.inputEl.value);
            this.inputEl.value = result;
            this.handleInput(); // Re-parse
        });

        document.getElementById('btn-minify').addEventListener('click', () => {
            const result = this.parser.minify(this.inputEl.value);
            this.inputEl.value = result;
            this.handleInput();
        });

        document.getElementById('btn-load-sample').addEventListener('click', () => {
            this.loadSample();
        });

        document.getElementById('file-upload').addEventListener('change', async (e) => {
            if (e.target.files.length > 0) {
                try {
                    const content = await FileHandler.readFile(e.target.files[0]);
                    this.inputEl.value = content;
                    this.handleInput();
                } catch (err) {
                    alert('Error reading file: ' + err.message);
                }
            }
        });

        document.getElementById('btn-export').addEventListener('click', () => {
            FileHandler.downloadJSON(this.inputEl.value);
        });

        // Theme Toggle
        document.getElementById('btn-theme').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Tree Controls
        document.getElementById('btn-expand').addEventListener('click', () => this.renderer.expandAll());
        document.getElementById('btn-collapse').addEventListener('click', () => this.renderer.collapseAll());
        document.getElementById('tree-search').addEventListener('input', (e) => this.renderer.search(e.target.value));

        // Resize Handle (Basic implementation)
        const handle = document.getElementById('resize-handle');
        const leftPane = document.querySelector('.input-pane');
        let isResizing = false;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.body.style.cursor = 'col-resize';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const percentage = (e.clientX / window.innerWidth) * 100;
            if (percentage > 20 && percentage < 80) {
                leftPane.style.flex = `0 0 ${percentage}%`;
            }
        });

        document.addEventListener('mouseup', () => {
            isResizing = false;
            document.body.style.cursor = 'default';
        });
    }

    handleInput() {
        const text = this.inputEl.value;
        const result = this.parser.parse(text);

        if (result.success) {
            this.statusEl.textContent = 'Valid JSON';
            this.statusEl.className = 'status-indicator';

            // Update Visualization
            this.renderer.render(result.data);

            // Update Stats
            this.updateStats(result.stats);

            // Validate Schema aspects
            this.validateSchema(result.data);
        } else {
            this.statusEl.textContent = 'Invalid JSON: ' + result.error;
            this.statusEl.className = 'status-indicator error';

            // Don't clear tree immediately to allow fixing typo
        }
    }

    validateSchema(data) {
        const validation = this.validator.validate(data);
        if (validation.isValid) {
            this.validationEl.innerHTML = '<i class="fa-solid fa-check-circle"></i> Schema Valid';
            this.validationEl.className = 'validation-status current-valid'; // reset error class
        } else {
            this.validationEl.innerHTML = `<i class="fa-solid fa-exclamation-circle"></i> ${validation.issues[0]}`;
            this.validationEl.className = 'validation-status error';
        }
    }

    updateStats(stats) {
        this.statSize.textContent = `Size: ${this.formatBytes(stats.size)}`;
        this.statNodes.textContent = `Nodes: ${stats.nodes}`;
        this.statDepth.textContent = `Depth: ${stats.depth}`;
    }

    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    loadSample() {
        const sample = {
            "project": "JSON Visualizer",
            "version": 1.0,
            "features": [
                "Syntax Highlighting",
                "Tree View",
                "Validation"
            ],
            "settings": {
                "theme": "dark",
                "autoSave": true,
                "nullValue": null
            },
            "contributors": [
                { "name": "User 1", "commits": 12 },
                { "name": "User 2", "commits": 5 }
            ]
        };
        this.inputEl.value = JSON.stringify(sample, null, 4);
        this.handleInput();
    }

    toggleTheme() {
        const body = document.body;
        const current = body.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);

        const icon = document.querySelector('#btn-theme i');
        icon.className = next === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    loadTheme() {
        const saved = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', saved);
        const icon = document.querySelector('#btn-theme i');
        icon.className = saved === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    new App();

    // Fallback for resize handle initial style
    document.querySelector('.input-pane').style.flex = '0 0 40%';
});
