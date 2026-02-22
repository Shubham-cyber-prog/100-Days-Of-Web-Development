export default class UIManager {
    constructor() {
        this.logEl = document.getElementById('battle-log');
        this.scriptEl = document.getElementById('script-steps');
    }

    log(msg) {
        const line = document.createElement('div');
        line.className = 'line';
        line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
        this.logEl.appendChild(line);
        this.logEl.scrollTop = this.logEl.scrollHeight;
    }

    initHP(unit, type) {
        const container = document.getElementById(`${type}-hp`);
        container.innerHTML = '';
        for (let i = 0; i < unit.maxHp; i++) {
            const pip = document.createElement('div');
            pip.className = 'pip';
            container.appendChild(pip);
        }
    }

    updateHP(unit, type) {
        const pips = document.querySelectorAll(`#${type}-hp .pip`);
        pips.forEach((pip, idx) => {
            if (idx >= unit.hp) pip.classList.add('depleted');
            else pip.classList.remove('depleted');
        });
    }

    renderScript(script) {
        this.scriptEl.innerHTML = script.map((step, idx) => `
            <div class="script-step">
                <span>0${idx + 1} // ${step}</span>
                <span class="status">VALIDATED</span>
            </div>
        `).join('');

        if (script.length === 0) {
            this.scriptEl.innerHTML = '<p style="color: #444; font-size: 0.8rem;">[ NO_DIRECTIVES_IN_BUFFER ]</p>';
        }
    }
}
