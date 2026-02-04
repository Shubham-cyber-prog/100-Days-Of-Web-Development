/**
 * Simple SQL Editor UI logic
 */

export class SQLEditor {
    constructor(textareaId, lineNumbersId) {
        this.textarea = document.getElementById(textareaId);
        this.lineNumbers = document.getElementById(lineNumbersId);

        this.init();
    }

    init() {
        this.textarea.addEventListener('input', () => {
            this.updateLineNumbers();
        });

        this.textarea.addEventListener('scroll', () => {
            this.lineNumbers.scrollTop = this.textarea.scrollTop;
        });

        this.textarea.addEventListener('keydown', (e) => this.handleKeydown(e));

        this.updateLineNumbers();
    }

    updateLineNumbers() {
        const lines = this.textarea.value.split('\n').length;
        this.lineNumbers.innerHTML = Array.from({ length: lines }, (_, i) => `<div>${i + 1}</div>`).join('');
    }

    handleKeydown(e) {
        // Tab key
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = this.textarea.selectionStart;
            const end = this.textarea.selectionEnd;
            this.textarea.value = this.textarea.value.substring(0, start) + '    ' + this.textarea.value.substring(end);
            this.textarea.selectionStart = this.textarea.selectionEnd = start + 4;
            this.updateLineNumbers();
        }

        // Ctrl + Enter to run
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('btn-run').click();
        }
    }

    getValue() {
        // Only return selected text if there is any, otherwise full content
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (start !== end) {
            return this.textarea.value.substring(start, end);
        }
        return this.textarea.value;
    }

    setValue(val) {
        this.textarea.value = val;
        this.updateLineNumbers();
    }

    clear() {
        this.textarea.value = '';
        this.updateLineNumbers();
    }
}
