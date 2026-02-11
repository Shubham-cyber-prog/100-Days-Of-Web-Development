/**
 * Note Editor Component
 * Rich text editor with markdown support for notes
 */

class NoteEditor {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            placeholder: 'Start writing... (Markdown supported)',
            autosave: true,
            autosaveDelay: 2000,
            onSave: options.onSave || (() => {}),
            onChange: options.onChange || (() => {}),
            ...options
        };
        
        this.content = '';
        this.isPreviewMode = false;
        this.autosaveTimer = null;
        
        this.init();
    }
    
    /**
     * Initialize the editor
     */
    init() {
        if (!this.container) {
            console.error('NoteEditor: Container not found');
            return;
        }
        
        this.render();
        this.bindEvents();
    }
    
    /**
     * Render the editor
     */
    render() {
        this.container.innerHTML = `
            <div class="note-editor">
                <div class="editor-toolbar">
                    <div class="toolbar-group">
                        <button type="button" data-action="bold" title="Bold (Ctrl+B)">
                            <strong>B</strong>
                        </button>
                        <button type="button" data-action="italic" title="Italic (Ctrl+I)">
                            <em>I</em>
                        </button>
                        <button type="button" data-action="strikethrough" title="Strikethrough">
                            <s>S</s>
                        </button>
                    </div>
                    
                    <div class="toolbar-divider"></div>
                    
                    <div class="toolbar-group">
                        <button type="button" data-action="h1" title="Heading 1">H1</button>
                        <button type="button" data-action="h2" title="Heading 2">H2</button>
                        <button type="button" data-action="h3" title="Heading 3">H3</button>
                    </div>
                    
                    <div class="toolbar-divider"></div>
                    
                    <div class="toolbar-group">
                        <button type="button" data-action="ul" title="Bullet List">•</button>
                        <button type="button" data-action="ol" title="Numbered List">1.</button>
                        <button type="button" data-action="checklist" title="Checklist">☑</button>
                    </div>
                    
                    <div class="toolbar-divider"></div>
                    
                    <div class="toolbar-group">
                        <button type="button" data-action="code" title="Code">&lt;/&gt;</button>
                        <button type="button" data-action="codeblock" title="Code Block">{ }</button>
                        <button type="button" data-action="quote" title="Quote">"</button>
                        <button type="button" data-action="link" title="Link">🔗</button>
                        <button type="button" data-action="image" title="Image">🖼️</button>
                    </div>
                    
                    <div class="toolbar-divider"></div>
                    
                    <div class="toolbar-group">
                        <button type="button" data-action="hr" title="Horizontal Rule">—</button>
                        <button type="button" data-action="table" title="Table">⊞</button>
                    </div>
                    
                    <div class="toolbar-spacer"></div>
                    
                    <div class="toolbar-group">
                        <button type="button" data-action="preview" title="Toggle Preview" class="btn-preview">
                            👁️ Preview
                        </button>
                    </div>
                </div>
                
                <div class="editor-content">
                    <textarea 
                        class="editor-textarea" 
                        placeholder="${this.options.placeholder}"
                    ></textarea>
                    <div class="editor-preview hidden"></div>
                </div>
                
                <div class="editor-status">
                    <span class="status-indicator">
                        <span class="saving hidden">Saving...</span>
                        <span class="saved hidden">✓ Saved</span>
                    </span>
                    <span class="word-count">0 words</span>
                </div>
            </div>
        `;
        
        // Store references
        this.textarea = this.container.querySelector('.editor-textarea');
        this.preview = this.container.querySelector('.editor-preview');
        this.btnPreview = this.container.querySelector('.btn-preview');
        this.statusSaving = this.container.querySelector('.saving');
        this.statusSaved = this.container.querySelector('.saved');
        this.wordCount = this.container.querySelector('.word-count');
    }
    
    /**
     * Bind event listeners
     */
    bindEvents() {
        // Toolbar buttons
        this.container.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                
                if (action === 'preview') {
                    this.togglePreview();
                } else {
                    this.insertMarkdown(action);
                }
            });
        });
        
        // Textarea events
        this.textarea.addEventListener('input', () => {
            this.content = this.textarea.value;
            this.updateWordCount();
            this.options.onChange(this.content);
            
            if (this.options.autosave) {
                this.scheduleAutosave();
            }
        });
        
        // Keyboard shortcuts
        this.textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.insertMarkdown('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.insertMarkdown('italic');
                        break;
                    case 'k':
                        e.preventDefault();
                        this.insertMarkdown('link');
                        break;
                    case 's':
                        e.preventDefault();
                        this.save();
                        break;
                }
            }
            
            // Tab for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                this.insertText('  ');
            }
        });
    }
    
    /**
     * Insert markdown syntax
     */
    insertMarkdown(action) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selected = this.textarea.value.substring(start, end);
        
        let before = '', after = '', placeholder = '';
        
        switch (action) {
            case 'bold':
                before = '**'; after = '**'; placeholder = 'bold text';
                break;
            case 'italic':
                before = '*'; after = '*'; placeholder = 'italic text';
                break;
            case 'strikethrough':
                before = '~~'; after = '~~'; placeholder = 'strikethrough';
                break;
            case 'h1':
                before = '# '; placeholder = 'Heading 1';
                break;
            case 'h2':
                before = '## '; placeholder = 'Heading 2';
                break;
            case 'h3':
                before = '### '; placeholder = 'Heading 3';
                break;
            case 'ul':
                before = '- '; placeholder = 'List item';
                break;
            case 'ol':
                before = '1. '; placeholder = 'List item';
                break;
            case 'checklist':
                before = '- [ ] '; placeholder = 'Task';
                break;
            case 'code':
                before = '`'; after = '`'; placeholder = 'code';
                break;
            case 'codeblock':
                before = '```\n'; after = '\n```'; placeholder = 'code block';
                break;
            case 'quote':
                before = '> '; placeholder = 'Quote';
                break;
            case 'link':
                if (selected) {
                    before = '['; after = '](url)';
                } else {
                    before = '['; after = '](url)'; placeholder = 'link text';
                }
                break;
            case 'image':
                before = '!['; after = '](url)'; placeholder = 'alt text';
                break;
            case 'hr':
                before = '\n---\n';
                break;
            case 'table':
                before = '\n| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |\n';
                break;
        }
        
        const text = selected || placeholder;
        const newText = before + text + after;
        
        this.textarea.setRangeText(newText, start, end, 'end');
        
        // Select the inserted/placeholder text
        if (selected || placeholder) {
            this.textarea.selectionStart = start + before.length;
            this.textarea.selectionEnd = start + before.length + text.length;
        }
        
        this.textarea.focus();
        this.content = this.textarea.value;
        this.options.onChange(this.content);
    }
    
    /**
     * Insert text at cursor
     */
    insertText(text) {
        const start = this.textarea.selectionStart;
        this.textarea.setRangeText(text, start, start, 'end');
        this.content = this.textarea.value;
    }
    
    /**
     * Toggle preview mode
     */
    togglePreview() {
        this.isPreviewMode = !this.isPreviewMode;
        
        if (this.isPreviewMode) {
            this.preview.innerHTML = this.parseMarkdown(this.textarea.value);
            this.preview.classList.remove('hidden');
            this.textarea.classList.add('hidden');
            this.btnPreview.classList.add('active');
        } else {
            this.preview.classList.add('hidden');
            this.textarea.classList.remove('hidden');
            this.btnPreview.classList.remove('active');
            this.textarea.focus();
        }
    }
    
    /**
     * Parse markdown to HTML
     */
    parseMarkdown(markdown) {
        if (!markdown) return '<p class="text-secondary">Nothing to preview</p>';
        
        let html = this.escapeHtml(markdown);
        
        // Code blocks (must be first to prevent inner parsing)
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre class="code-block" data-lang="${lang || ''}"><code>${code}</code></pre>`;
        });
        
        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        
        // Headers
        html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
        
        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Strikethrough
        html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
        
        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
        
        // Checklists
        html = html.replace(/^\- \[x\] (.*$)/gm, '<div class="checklist"><input type="checkbox" checked disabled><span>$1</span></div>');
        html = html.replace(/^\- \[ \] (.*$)/gm, '<div class="checklist"><input type="checkbox" disabled><span>$1</span></div>');
        
        // Unordered lists
        html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
        
        // Blockquotes
        html = html.replace(/^&gt; (.*$)/gm, '<blockquote>$1</blockquote>');
        
        // Horizontal rules
        html = html.replace(/^---$/gm, '<hr>');
        
        // Tables
        html = this.parseTables(html);
        
        // Paragraphs (double newlines)
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        
        // Single line breaks
        html = html.replace(/\n/g, '<br>');
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><br><\/p>/g, '');
        
        return html;
    }
    
    /**
     * Parse markdown tables
     */
    parseTables(html) {
        const tableRegex = /\|(.+)\|\n\|[-|:\s]+\|\n((?:\|.+\|\n?)+)/g;
        
        return html.replace(tableRegex, (match, header, rows) => {
            const headers = header.split('|').filter(Boolean).map(h => h.trim());
            const rowData = rows.trim().split('\n').map(row => 
                row.split('|').filter(Boolean).map(cell => cell.trim())
            );
            
            let table = '<table><thead><tr>';
            headers.forEach(h => table += `<th>${h}</th>`);
            table += '</tr></thead><tbody>';
            
            rowData.forEach(row => {
                table += '<tr>';
                row.forEach(cell => table += `<td>${cell}</td>`);
                table += '</tr>';
            });
            
            table += '</tbody></table>';
            return table;
        });
    }
    
    /**
     * Schedule autosave
     */
    scheduleAutosave() {
        if (this.autosaveTimer) {
            clearTimeout(this.autosaveTimer);
        }
        
        this.statusSaving.classList.remove('hidden');
        this.statusSaved.classList.add('hidden');
        
        this.autosaveTimer = setTimeout(() => {
            this.save();
        }, this.options.autosaveDelay);
    }
    
    /**
     * Save content
     */
    async save() {
        try {
            await this.options.onSave(this.content);
            
            this.statusSaving.classList.add('hidden');
            this.statusSaved.classList.remove('hidden');
            
            setTimeout(() => {
                this.statusSaved.classList.add('hidden');
            }, 2000);
        } catch (error) {
            console.error('Save error:', error);
        }
    }
    
    /**
     * Update word count
     */
    updateWordCount() {
        const text = this.textarea.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        this.wordCount.textContent = `${words} word${words !== 1 ? 's' : ''}`;
    }
    
    /**
     * Get content
     */
    getContent() {
        return this.content;
    }
    
    /**
     * Set content
     */
    setContent(content) {
        this.content = content || '';
        this.textarea.value = this.content;
        this.updateWordCount();
        
        if (this.isPreviewMode) {
            this.preview.innerHTML = this.parseMarkdown(this.content);
        }
    }
    
    /**
     * Clear content
     */
    clear() {
        this.setContent('');
    }
    
    /**
     * Focus editor
     */
    focus() {
        if (!this.isPreviewMode) {
            this.textarea.focus();
        }
    }
    
    /**
     * Escape HTML characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Destroy editor
     */
    destroy() {
        if (this.autosaveTimer) {
            clearTimeout(this.autosaveTimer);
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export { NoteEditor };
export default NoteEditor;
