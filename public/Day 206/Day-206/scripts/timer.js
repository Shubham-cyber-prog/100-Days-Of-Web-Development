/**
 * Game Timer and Session Manager
 */

export class GameTimer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.seconds = 0;
        this.interval = null;
        this.isRunning = false;
    }

    /**
     * Start the timer
     */
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.interval = setInterval(() => {
            this.seconds++;
            this.updateDisplay();
        }, 1000);
    }

    /**
     * Pause the timer
     */
    pause() {
        if (!this.isRunning) return;

        this.isRunning = false;
        clearInterval(this.interval);
        this.interval = null;
    }

    /**
     * Reset the timer
     */
    reset() {
        this.pause();
        this.seconds = 0;
        this.updateDisplay();
    }

    /**
     * Get current time in seconds
     * @returns {number}
     */
    getTime() {
        return this.seconds;
    }

    /**
     * Set time (for loading saved games)
     * @param {number} seconds
     */
    setTime(seconds) {
        this.seconds = seconds;
        this.updateDisplay();
    }

    /**
     * Update the display element
     */
    updateDisplay() {
        const minutes = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        if (this.displayElement) {
            this.displayElement.textContent = formatted;
        }
    }

    /**
     * Get formatted time string
     * @returns {string}
     */
    getFormattedTime() {
        const minutes = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}

/**
 * Session Manager for saving/loading game state
 */
export class SessionManager {
    constructor() {
        this.storageKey = 'sudoku-session';
    }

    /**
     * Save current game state
     * @param {object} state
     */
    saveState(state) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(state));
        } catch (error) {
            console.error('Failed to save state:', error);
        }
    }

    /**
     * Load saved game state
     * @returns {object|null}
     */
    loadState() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Failed to load state:', error);
            return null;
        }
    }

    /**
     * Clear saved state
     */
    clearState() {
        try {
            localStorage.removeItem(this.storageKey);
        } catch (error) {
            console.error('Failed to clear state:', error);
        }
    }

    /**
     * Check if there's a saved game
     * @returns {boolean}
     */
    hasSavedGame() {
        return localStorage.getItem(this.storageKey) !== null;
    }
}
