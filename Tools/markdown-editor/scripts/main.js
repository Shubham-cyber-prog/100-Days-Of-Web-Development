/**
 * Main Application Entry Point
 * Initializes and coordinates all modules
 */

import { MarkdownParser } from './core/parser.js';
import { Toolbar } from './ui/toolbar.js';
import { PDFExporter, HTMLExporter } from './utils/pdfExport.js';
import { LocalSaver, DownloadManager } from './utils/localSaver.js';

class MarkWriteApp {
    constructor() {
        // Initialize Core Components
        this.parser = new MarkdownParser();
        this.toolbar = new Toolbar('markdown-input');

        // Initialize Storage & Downloads
        this.saver = new LocalSaver('markdown-input');
        this.downloader = new DownloadManager();
        this.pdfExport = new PDFExporter();
        this.htmlExport = new HTMLExporter();

        // UI Elements
        this.textarea = document.getElementById('markdown-input');
        this.preview = document.getElementById('preview-content');
        this.wordCountEl = document.getElementById('word-count');
        this.charCountEl = document.getElementById('char-count');
        this.resizer = document.getElementById('resize-divider');
        this.syncScrollCheckbox = document.getElementById('sync-scroll');

        // State
        this.isResizing = false;

        this.init();
    }

    init() {
        // Initial parse
        this.updatePreview();

        // Bind Events
        this.bindEvents();
    }

    bindEvents() {
        // Live Rendering
        this.textarea.addEventListener('input', () => {
            this.updatePreview();
        });

        // Synchronized Scrolling
        this.textarea.addEventListener('scroll', () => {
            if (this.syncScrollCheckbox.checked) {
                this.syncScroll();
            }
        });

        // Split View Resizing
        this.resizer.addEventListener('mousedown', (e) => this.startResizing(e));
        document.addEventListener('mousemove', (e) => this.handleResizing(e));
        document.addEventListener('mouseup', () => this.stopResizing());

        // Keyboard Shortcuts (Tab support)
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.handleTab();
            }
        });
    }

    /**
     * Update the HTML preview
     */
    updatePreview() {
        const markdown = this.textarea.value;
        const html = this.parser.parse(markdown);

        // Update DOM
        this.preview.innerHTML = html || '<p class="placeholder">Preview will appear here...</p>';

        // Update Stats
        this.updateStats(markdown);
    }

    /**
     * Update word and character counts
     */
    updateStats(text) {
        const stats = this.parser.getStats(text);
        this.wordCountEl.textContent = `${stats.words} ${stats.words === 1 ? 'word' : 'words'}`;
        this.charCountEl.textContent = `${stats.chars} ${stats.chars === 1 ? 'character' : 'characters'}`;
    }

    /**
     * Synchronize scroll position between editor and preview
     */
    syncScroll() {
        const editorScrollRange = this.textarea.scrollHeight - this.textarea.clientHeight;
        const previewScrollRange = this.preview.scrollHeight - this.preview.clientHeight;

        if (editorScrollRange > 0) {
            const scrollPercent = this.textarea.scrollTop / editorScrollRange;
            this.preview.scrollTop = scrollPercent * previewScrollRange;
        }
    }

    /**
     * Handle Tab key for indentation
     */
    handleTab() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;

        // Insert 4 spaces
        this.textarea.value = text.substring(0, start) + '    ' + text.substring(end);

        // Set cursor position
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
    }

    /**
     * Start the resizing process
     */
    startResizing(e) {
        this.isResizing = true;
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    }

    /**
     * Handle the mouse move during resizing
     */
    handleResizing(e) {
        if (!this.isResizing) return;

        const containerWidth = document.querySelector('.editor-workspace').clientWidth;
        const percentage = (e.clientX / containerWidth) * 100;

        // Boundary checks (between 20% and 80%)
        if (percentage >= 20 && percentage <= 80) {
            document.querySelector('.editor-pane').style.flex = `0 0 ${percentage}%`;
        }
    }

    /**
     * Stop the resizing process
     */
    stopResizing() {
        if (this.isResizing) {
            this.isResizing = false;
            document.body.style.cursor = 'default';
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new MarkWriteApp();
});
