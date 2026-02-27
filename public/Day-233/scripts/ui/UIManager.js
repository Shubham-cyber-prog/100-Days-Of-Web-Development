export default class UIManager {
    constructor() {
        this.notif = document.getElementById('notif-system');
        this.targetEl = document.getElementById('target-value');
        this.currentEl = document.getElementById('current-value');
    }

    updateLevelInfo(level) {
        document.getElementById('level-title').textContent = level.name;
        this.targetEl.textContent = level.target;
        this.currentEl.textContent = '0';
    }

    updateResult(val, success) {
        this.currentEl.textContent = val;
        this.currentEl.style.color = success ? '#00f3ff' : '#ff007a';

        if (success) {
            this.showToast("MISSION_SUCCESS: Logic Synapse Stabilized.");
        } else {
            this.showToast("MISSION_FAILURE: Signal Mismatch.");
        }
    }

    showToast(msg) {
        this.notif.textContent = msg;
        this.notif.classList.remove('hidden');
        setTimeout(() => this.notif.classList.add('hidden'), 3000);
    }
}
