/**
 * Local Storage Auto-Save
 * Automatically saves content to localStorage with debouncing
 */

export class LocalSaver {
    constructor(textareaId, storageKey = 'markdown-content') {
        this.textarea = document.getElementById(textareaId);
        this.storageKey = storageKey;
        this.statusEl = document.getElementById('save-status');
        this.saveTimeout = null;
        this.debounceDelay = 1000; // 1 second

        this.init();
    }

    init() {
        // Load saved content on startup
        this.loadContent();

        // Listen for changes
        this.textarea.addEventListener('input', () => {
            this.scheduleAutoSave();
        });

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveContent(true);
        });
    }

    /**
     * Schedule auto-save with debouncing
     */
    scheduleAutoSave() {
        // Update status to "saving..."
        if (this.statusEl) {
            this.statusEl.textContent = 'Saving...';
            this.statusEl.classList.add('saving');
        }

        // Clear existing timeout
        if (this.saveTimeout) {
            clearTimeout(this.saveTimeout);
        }

        // Schedule new save
        this.saveTimeout = setTimeout(() => {
            this.saveContent();
        }, this.debounceDelay);
    }

    /**
     * Save content to localStorage
     */
    saveContent(immediate = false) {
        try {
            const content = this.textarea.value;
            const timestamp = Date.now();

            const data = {
                content,
                timestamp,
                version: 1
            };

            localStorage.setItem(this.storageKey, JSON.stringify(data));

            // Update status
            if (this.statusEl && !immediate) {
                this.statusEl.textContent = 'All changes saved';
                this.statusEl.classList.remove('saving');
            }

            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);

            if (this.statusEl) {
                this.statusEl.textContent = 'Save failed';
                this.statusEl.classList.remove('saving');
            }

            return false;
        }
    }

    /**
     * Load content from localStorage
     */
    loadContent() {
        try {
            const saved = localStorage.getItem(this.storageKey);

            if (!saved) return false;

            const data = JSON.parse(saved);

            if (data.content) {
                this.textarea.value = data.content;

                // Trigger input event to update preview
                this.textarea.dispatchEvent(new Event('input'));

                // Update status
                if (this.statusEl) {
                    const date = new Date(data.timestamp);
                    this.statusEl.textContent = `Loaded from ${date.toLocaleString()}`;
                }

                return true;
            }

            return false;
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            return false;
        }
    }

    /**
     * Clear saved content
     */
    clearSaved() {
        try {
            localStorage.removeItem(this.storageKey);
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }

    /**
     * Export current state as JSON
     */
    exportState() {
        const content = this.textarea.value;
        const timestamp = Date.now();

        return {
            content,
            timestamp,
            version: 1
        };
    }

    /**
     * Import state from JSON
     */
    importState(data) {
        if (data && data.content) {
            this.textarea.value = data.content;
            this.textarea.dispatchEvent(new Event('input'));
            this.saveContent();
            return true;
        }
        return false;
    }
}

/**
 * Download Manager
 * Handles markdown file downloads
 */
export class DownloadManager {
    constructor() {
        this.init();
    }

    init() {
        const downloadBtn = document.getElementById('btn-download');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => this.downloadMarkdown());
        }
    }

    downloadMarkdown() {
        const textarea = document.getElementById('markdown-input');
        const content = textarea.value;

        if (!content.trim()) {
            alert('No content to download.');
            return;
        }

        const filename = this.getSuggestedFilename();
        this.downloadFile(content, filename, 'text/markdown');
    }

    getSuggestedFilename() {
        const textarea = document.getElementById('markdown-input');
        const firstLine = textarea.value.split('\n')[0];

        // Try to extract title from first heading
        const titleMatch = firstLine.match(/^#{1,6}\s+(.+)$/);
        if (titleMatch) {
            const title = titleMatch[1]
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
                .substring(0, 50);
            return `${title}.md`;
        }

        const date = new Date().toISOString().split('T')[0];
        return `document-${date}.md`;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }
}
