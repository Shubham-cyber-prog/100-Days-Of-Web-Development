/**
 * Economy System - Gold, Costs, and Scoring
 */

export class Economy {
    constructor() {
        this.gold = 200; // Starting gold
        this.lives = 20; // Starting lives
        this.score = 0;
        this.waveBonus = 0;
    }

    /**
     * Add gold
     */
    addGold(amount) {
        this.gold += amount;
        this.score += amount;
    }

    /**
     * Spend gold
     * @returns {boolean} - True if successful
     */
    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            return true;
        }
        return false;
    }

    /**
     * Lose a life
     * @returns {boolean} - True if game over
     */
    loseLife() {
        this.lives--;
        return this.lives <= 0;
    }

    /**
     * Award wave completion bonus
     */
    completeWave(waveNumber) {
        const bonus = 50 + (waveNumber * 10);
        this.addGold(bonus);
        this.waveBonus = bonus;
        return bonus;
    }

    /**
     * Get current stats
     */
    getStats() {
        return {
            gold: this.gold,
            lives: this.lives,
            score: this.score
        };
    }

    /**
     * Save high score
     */
    saveHighScore(wave) {
        const saved = this.loadHighScore();

        if (wave > saved.wave || (wave === saved.wave && this.score > saved.score)) {
            localStorage.setItem('towerDefense-highScore', JSON.stringify({
                wave,
                score: this.score
            }));
            return true;
        }

        return false;
    }

    /**
     * Load high score
     */
    loadHighScore() {
        try {
            const saved = localStorage.getItem('towerDefense-highScore');
            return saved ? JSON.parse(saved) : { wave: 0, score: 0 };
        } catch {
            return { wave: 0, score: 0 };
        }
    }
}

/**
 * Score Calculator
 */
export class ScoreCalculator {
    /**
     * Calculate score for killing an enemy
     */
    static calculateKillScore(enemy, waveNumber) {
        const baseScore = enemy.goldReward;
        const waveMultiplier = 1 + (waveNumber * 0.1);
        return Math.floor(baseScore * waveMultiplier);
    }

    /**
     * Calculate wave completion bonus
     */
    static calculateWaveBonus(waveNumber, livesRemaining) {
        const baseBonus = 50 + (waveNumber * 10);
        const livesBonus = livesRemaining * 2;
        return baseBonus + livesBonus;
    }
}
