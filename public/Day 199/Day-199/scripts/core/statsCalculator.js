/**
 * Statistics Calculator - WPM, accuracy, performance tracking
 */

export class StatsCalculator {
    constructor() {
        this.startTime = null;
        this.endTime = null;
        this.wpmHistory = [];
        this.updateInterval = null;
    }

    /**
     * Start tracking time
     */
    start() {
        this.startTime = Date.now();
        this.endTime = null;
        this.wpmHistory = [];
    }

    /**
     * Stop tracking
     */
    stop() {
        this.endTime = Date.now();
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }

    /**
     * Calculate WPM (Words Per Minute)
     * Formula: (characters typed / 5) / (time in minutes)
     * Standard word = 5 characters
     */
    calculateWPM(charactersTyped) {
        const timeElapsed = this.getElapsedMinutes();
        if (timeElapsed === 0) return 0;

        const words = charactersTyped / 5;
        const wpm = Math.round(words / timeElapsed);

        return wpm;
    }

    /**
     * Calculate accuracy percentage
     */
    calculateAccuracy(correctChars, totalTyped) {
        if (totalTyped === 0) return 100;
        return Math.round((correctChars / totalTyped) * 100);
    }

    /**
     * Get elapsed time in minutes
     */
    getElapsedMinutes() {
        const endTime = this.endTime || Date.now();
        const elapsed = (endTime - this.startTime) / 1000 / 60; // Convert to minutes
        return elapsed;
    }

    /**
     * Get elapsed time in seconds
     */
    getElapsedSeconds() {
        const endTime = this.endTime || Date.now();
        return Math.floor((endTime - this.startTime) / 1000);
    }

    /**
     * Record WPM at current moment (for graphing)
     */
    recordWPM(wpm) {
        const timestamp = this.getElapsedSeconds();
        this.wpmHistory.push({ timestamp, wpm });
    }

    /**
     * Get WPM history for charting
     */
    getWPMHistory() {
        return this.wpmHistory;
    }

    /**
     * Start periodic WPM recording
     */
    startPeriodicRecording(wpmCallback, interval = 1000) {
        this.updateInterval = setInterval(() => {
            const wpm = wpmCallback();
            this.recordWPM(wpm);
        }, interval);
    }

    /**
     * Calculate comprehensive final stats
     */
    getFinalStats(correctChars, totalTyped, totalChars, errors) {
        const timeElapsed = this.getElapsedSeconds();
        const wpm = this.calculateWPM(totalTyped);
        const accuracy = this.calculateAccuracy(correctChars, totalTyped);
        const errorRate = totalTyped === 0 ? 0 : Math.round((errors / totalTyped) * 100);

        return {
            wpm,
            accuracy,
            correctChars,
            totalTyped,
            totalChars,
            errors,
            errorRate,
            timeElapsed,
            wpmHistory: this.wpmHistory
        };
    }

    /**
     * Reset calculator
     */
    reset() {
        this.startTime = null;
        this.endTime = null;
        this.wpmHistory = [];
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
    }
}
