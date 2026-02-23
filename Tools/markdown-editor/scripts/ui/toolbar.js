/**
 * Toolbar Handler
 * Manages formatting buttons and text insertion
 */

export class Toolbar {
    constructor(textareaId) {
        this.textarea = document.getElementById(textareaId);
        this.buttons = document.querySelectorAll('.tool-btn[data-action]');
        this.init();
    }

    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleAction(action);
            });
        });

        // Keyboard shortcuts
        this.textarea.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.handleAction('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.handleAction('italic');
                        break;
                    case 'k':
                        e.preventDefault();
                        this.handleAction('link');
                        break;
                }
            }
        });
    }

    handleAction(action) {
        const actions = {
            'bold': () => this.wrapText('**', '**'),
            'italic': () => this.wrapText('*', '*'),
            'strikethrough': () => this.wrapText('~~', '~~'),
            'heading': () => this.insertPrefix('## '),
            'link': () => this.insertLink(),
            'image': () => this.insertImage(),
            'code': () => this.insertCodeBlock(),
            'ul': () => this.insertList('-'),
            'ol': () => this.insertList('1.'),
            'quote': () => this.insertPrefix('> ')
        };

        if (actions[action]) {
            actions[action]();
            this.textarea.focus();
            // Trigger input event to update preview
            this.textarea.dispatchEvent(new Event('input'));
        }
    }

    /**
     * Wrap selected text with prefix and suffix
     */
    wrapText(prefix, suffix) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;
        const selectedText = text.substring(start, end);

        const before = text.substring(0, start);
        const after = text.substring(end);

        this.textarea.value = before + prefix + selectedText + suffix + after;

        // Set cursor position
        if (selectedText) {
            this.textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        } else {
            const newPos = start + prefix.length;
            this.textarea.setSelectionRange(newPos, newPos);
        }
    }

    /**
     * Insert prefix at the start of line
     */
    insertPrefix(prefix) {
        const start = this.textarea.selectionStart;
        const text = this.textarea.value;

        // Find start of current line
        let lineStart = text.lastIndexOf('\n', start - 1) + 1;

        const before = text.substring(0, lineStart);
        const after = text.substring(lineStart);

        this.textarea.value = before + prefix + after;

        const newPos = lineStart + prefix.length;
        this.textarea.setSelectionRange(newPos, newPos);
    }

    /**
     * Insert link
     */
    insertLink() {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;
        const selectedText = text.substring(start, end);

        const linkText = selectedText || 'link text';
        const url = prompt('Enter URL:', 'https://');

        if (!url) return;

        const markdown = `[${linkText}](${url})`;
        const before = text.substring(0, start);
        const after = text.substring(end);

        this.textarea.value = before + markdown + after;

        const newPos = start + markdown.length;
        this.textarea.setSelectionRange(newPos, newPos);
    }

    /**
     * Insert image
     */
    insertImage() {
        const url = prompt('Enter image URL:', 'https://');
        const alt = prompt('Enter alt text:', 'image');

        if (!url) return;

        const markdown = `![${alt}](${url})`;
        this.insertAtCursor(markdown);
    }

    /**
     * Insert code block
     */
    insertCodeBlock() {
        const lang = prompt('Enter language (optional):', '');
        const markdown = `\n\`\`\`${lang}\ncode here\n\`\`\`\n`;
        this.insertAtCursor(markdown);
    }

    /**
     * Insert list item
     */
    insertList(prefix) {
        const start = this.textarea.selectionStart;
        const text = this.textarea.value;

        // Find start of current line
        let lineStart = text.lastIndexOf('\n', start - 1) + 1;

        const before = text.substring(0, lineStart);
        const after = text.substring(lineStart);

        this.textarea.value = before + prefix + ' ' + after;

        const newPos = lineStart + prefix.length + 1;
        this.textarea.setSelectionRange(newPos, newPos);
    }

    /**
     * Insert text at cursor position
     */
    insertAtCursor(insertText) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const text = this.textarea.value;

        const before = text.substring(0, start);
        const after = text.substring(end);

        this.textarea.value = before + insertText + after;

        const newPos = start + insertText.length;
        this.textarea.setSelectionRange(newPos, newPos);
    }
}
