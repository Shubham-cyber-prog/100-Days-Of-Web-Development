export default class TerminalController {
    constructor(engine) {
        this.engine = engine;
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');

        this.setupListeners();
    }

    setupListeners() {
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = this.input.value;
                this.handleCommand(cmd);
                this.input.value = '';
            }
        });

        // Keep focus on input
        document.addEventListener('click', () => this.input.focus());
    }

    handleCommand(cmd) {
        if (!cmd.trim()) return;

        // Display user command
        this.write(`> ${cmd}`, 'user');

        // Process through engine
        const response = this.engine.processCommand(cmd);

        // Display engine response
        if (response) {
            setTimeout(() => {
                this.write(response, 'system');
            }, 100);
        }
    }

    write(text, type = 'normal') {
        const line = document.createElement('div');
        line.className = `line ${type}`;
        line.textContent = text;

        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;

        // Limit lines to 50 for performance
        if (this.output.children.length > 50) {
            this.output.removeChild(this.output.firstChild);
        }
    }
}
