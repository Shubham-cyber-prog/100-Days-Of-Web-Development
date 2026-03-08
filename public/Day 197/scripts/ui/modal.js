/**
 * Modal Manager
 */

export class ModalManager {
    constructor(modalId, nextBtnId, timeId) {
        this.modalEl = document.getElementById(modalId);
        this.nextBtn = document.getElementById(nextBtnId);
        this.timeEl = document.getElementById(timeId);
    }

    show(timeStr, onNext) {
        this.timeEl.textContent = timeStr;
        this.modalEl.classList.add('active');

        // Single click handler
        const handler = () => {
            this.hide();
            onNext();
            this.nextBtn.removeEventListener('click', handler);
        };

        this.nextBtn.addEventListener('click', handler);
    }

    hide() {
        this.modalEl.classList.remove('active');
    }
}
