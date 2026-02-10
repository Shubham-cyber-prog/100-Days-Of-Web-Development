/**
 * Game Timer and Statistics Tracker
 */

export class GameTimer {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.startTime = null;
        this.elapsedTime = 0;
        this.timerInterval = null;
        this.isRunning = false;
    }

    /**
     * Start the timer
     */
    start() {
        if (this.isRunning) return;

        this.startTime = Date.now() - this.elapsedTime;
        this.isRunning = true;

        this.timerInterval = setInterval(() => {
            this.elapsedTime = Date.now() - this.startTime;
            this.updateDisplay();
        }, 100); // Update every 100ms for smooth display
    }

    /**
     * Stop the timer
     */
    stop() {
        if (!this.isRunning) return;

        clearInterval(this.timerInterval);
        this.isRunning = false;
    }

    /**
     * Reset the timer
     */
    reset() {
        this.stop();
        this.elapsedTime = 0;
        this.startTime = null;
        this.updateDisplay();
    }

    /**
     * Get elapsed time in seconds
     */
    getElapsedSeconds() {
        return Math.floor(this.elapsedTime / 1000);
    }

    /**
     * Get formatted time string (MM:SS)
     */
    getFormattedTime() {
        const totalSeconds = this.getElapsedSeconds();
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    /**
     * Update the display element
     */
    updateDisplay() {
        if (this.displayElement) {
            this.displayElement.textContent = this.getFormattedTime();
        }
    }
}

/**
 * High Score Manager
 * Stores best times in localStorage
 */
export class HighScoreManager {
    constructor() {
        this.storageKey = 'devmemory-highscores';
        this.scores = this.loadScores();
    }

    /**
     * Load scores from localStorage
     */
    loadScores() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to load scores:', error);
            return [];
        }
    }

    /**
     * Save scores to localStorage
     */
    saveScores() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.scores));
            return true;
        } catch (error) {
            console.error('Failed to save scores:', error);
            return false;
        }
    }

    /**
     * Add a new score
     */
    addScore(difficulty, theme, time, moves, accuracy) {
        const score = {
            difficulty,
            theme,
            time,
            moves,
            accuracy,
            timestamp: Date.now()
        };

        this.scores.push(score);

        // Sort by time (fastest first) and keep only top 10
        this.scores.sort((a, b) => a.time - b.time);
        this.scores = this.scores.slice(0, 10);

        this.saveScores();
        return score;
    }

    /**
     * Get top scores
     */
    getTopScores(limit = 10) {
        return this.scores.slice(0, limit);
    }

    /**
     * Check if a score qualifies for high scores
     */
    isHighScore(time) {
        if (this.scores.length < 10) return true;
        return time < this.scores[9].time;
    }

    /**
     * Clear all scores
     */
    clearScores() {
        this.scores = [];
        this.saveScores();
    }
}
