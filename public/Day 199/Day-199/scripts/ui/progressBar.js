/**
 * Progress Bar Component
 */

export class ProgressBar {
    constructor(containerId, fillId, charsId, totalId) {
        this.container = document.getElementById(containerId);
        this.fillElement = document.getElementById(fillId);
        this.charsElement = document.getElementById(charsId);
        this.totalElement = document.getElementById(totalId);
    }

    /**
     * Initialize with total character count
     */
    init(totalChars) {
        this.totalChars = totalChars;
        if (this.totalElement) {
            this.totalElement.textContent = totalChars;
        }
        this.update(0);
    }

    /**
     * Update progress
     */
    update(currentChars) {
        const percentage = (currentChars / this.totalChars) * 100;

        if (this.fillElement) {
            this.fillElement.style.width = `${Math.min(percentage, 100)}%`;
        }

        if (this.charsElement) {
            this.charsElement.textContent = currentChars;
        }
    }

    /**
     * Complete animation
     */
    complete() {
        if (this.fillElement) {
            this.fillElement.style.width = '100%';
            this.fillElement.style.background = 'var(--success)';
        }
    }

    /**
     * Reset progress
     */
    reset() {
        if (this.fillElement) {
            this.fillElement.style.width = '0%';
            this.fillElement.style.background = '';
        }
        if (this.charsElement) {
            this.charsElement.textContent = '0';
        }
    }
}
