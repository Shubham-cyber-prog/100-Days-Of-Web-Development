/**
 * Code Output and History Manager
 */

export class CodeOutput {
    constructor() {
        this.codeEl = document.getElementById('css-output');
        this.historyList = document.getElementById('style-history');
        this.history = [];
        this.maxHistory = 10;

        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('btn-copy').addEventListener('click', () => {
            this.copyToClipboard();
        });
    }

    update(cssData) {
        let code = '';
        if (cssData.property === 'flexbox-compound') {
            code = `.container {\n    ${cssData.value}\n}`;
        } else {
            code = `${cssData.property}: ${cssData.value};`;
        }

        this.codeEl.textContent = code;
    }

    addToHistory(cssData) {
        // Prevent dupes at top of stack (simple check)
        const lastEntry = this.history[0];
        if (lastEntry && JSON.stringify(lastEntry) === JSON.stringify(cssData)) return;

        this.history.unshift(cssData);
        if (this.history.length > this.maxHistory) {
            this.history.pop();
        }

        this.renderHistory();
    }

    renderHistory() {
        this.historyList.innerHTML = '';
        this.history.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'history-item';

            // Preview text
            let text = '';
            if (item.property === 'box-shadow') text = 'Box Shadow';
            else if (item.property === 'background') text = 'Gradient';
            else text = 'Flexbox Layout';

            const time = new Date().toLocaleTimeString();
            li.innerHTML = `<span>${text}</span> <span style="color:var(--text-muted); font-size: 0.7rem; float:right">${time}</span>`;

            li.onclick = () => {
                // Determine event to replay (This is complex to wire back to inputs, 
                // for this L3 scope, showing visual history is enough, or we emit an event)
                // Let's implement full restoration in App controller via custom event
                const event = new CustomEvent('restore-state', { detail: item });
                document.dispatchEvent(event);
            };

            this.historyList.appendChild(li);
        });
    }

    async copyToClipboard() {
        try {
            await navigator.clipboard.writeText(this.codeEl.textContent);
            this.showToast();
        } catch (err) {
            console.error('Failed to copy', err);
        }
    }

    showToast() {
        const toast = document.getElementById('toast');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}
