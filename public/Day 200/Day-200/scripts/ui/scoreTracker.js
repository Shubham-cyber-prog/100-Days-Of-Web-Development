/**
 * Score Tracker with localStorage persistence
 */

export class ScoreTracker {
    constructor() {
        this.storageKey = 'tictactoe-stats';
        this.stats = this.loadStats();
        this.updateDisplay();
    }

    /**
     * Load stats from localStorage
     */
    loadStats() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load stats:', error);
        }

        return {
            wins: 0,
            losses: 0,
            draws: 0
        };
    }

    /**
     * Save stats to localStorage
     */
    saveStats() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.stats));
        } catch (error) {
            console.error('Failed to save stats:', error);
        }
    }

    /**
     * Record a win
     */
    recordWin() {
        this.stats.wins++;
        this.saveStats();
        this.updateDisplay();
        this.flashStat('wins');
    }

    /**
     * Record a loss
     */
    recordLoss() {
        this.stats.losses++;
        this.saveStats();
        this.updateDisplay();
        this.flashStat('losses');
    }

    /**
     * Record a draw
     */
    recordDraw() {
        this.stats.draws++;
        this.saveStats();
        this.updateDisplay();
        this.flashStat('draws');
    }

    /**
     * Calculate win rate
     */
    getWinRate() {
        const total = this.stats.wins + this.stats.losses + this.stats.draws;
        if (total === 0) return 0;
        return Math.round((this.stats.wins / total) * 100);
    }

    /**
     * Update display
     */
    updateDisplay() {
        const winsEl = document.getElementById('stat-wins');
        const lossesEl = document.getElementById('stat-losses');
        const drawsEl = document.getElementById('stat-draws');
        const rateEl = document.getElementById('stat-rate');

        if (winsEl) winsEl.textContent = this.stats.wins;
        if (lossesEl) lossesEl.textContent = this.stats.losses;
        if (drawsEl) drawsEl.textContent = this.stats.draws;
        if (rateEl) rateEl.textContent = `${this.getWinRate()}%`;
    }

    /**
     * Flash animation on stat update
     */
    flashStat(type) {
        const elementId = `stat-${type}`;
        const element = document.getElementById(elementId);

        if (element) {
            element.classList.add('flash');
            setTimeout(() => {
                element.classList.remove('flash');
            }, 400);
        }
    }

    /**
     * Reset all stats
     */
    resetStats() {
        this.stats = {
            wins: 0,
            losses: 0,
            draws: 0
        };
        this.saveStats();
        this.updateDisplay();
    }

    /**
     * Get current stats
     */
    getStats() {
        return {
            ...this.stats,
            winRate: this.getWinRate()
        };
    }
}
