/**
 * Points, Combos, and Objectives System
 */

export class ScoringSystem {
    constructor() {
        this.score = 0;
        this.combo = 0;
        this.basePoints = 10;
    }

    /**
     * Calculate score for a match
     */
    calculateMatchScore(matchLength) {
        const multiplier = 1 + (this.combo * 0.5);
        const lengthBonus = (matchLength - 3) * 5;
        return Math.floor((this.basePoints + lengthBonus) * multiplier);
    }

    /**
     * Add score
     */
    addScore(points) {
        this.score += points;
        return this.score;
    }

    /**
     * Increment combo
     */
    incrementCombo() {
        this.combo++;
        return this.combo;
    }

    /**
     * Reset combo
     */
    resetCombo() {
        this.combo = 0;
    }

    /**
     * Get current score
     */
    getScore() {
        return this.score;
    }

    /**
     * Get current combo
     */
    getCombo() {
        return this.combo;
    }

    /**
     * Reset scoring
     */
    reset() {
        this.score = 0;
        this.combo = 0;
    }
}

export class LevelObjective {
    constructor(targetScore, moves) {
        this.targetScore = targetScore;
        this.maxMoves = moves;
        this.movesRemaining = moves;
        this.stars = [
            { threshold: targetScore * 0.5, earned: false },
            { threshold: targetScore * 0.75, earned: false },
            { threshold: targetScore, earned: false }
        ];
    }

    /**
     * Use a move
     */
    useMove() {
        this.movesRemaining--;
        return this.movesRemaining;
    }

    /**
     * Check if objective is complete
     */
    isComplete(score) {
        return score >= this.targetScore;
    }

    /**
     * Check if out of moves
     */
    isOutOfMoves() {
        return this.movesRemaining <= 0;
    }

    /**
     * Update stars based on score
     */
    updateStars(score) {
        let starsEarned = 0;
        this.stars.forEach((star, index) => {
            if (score >= star.threshold && !star.earned) {
                star.earned = true;
                starsEarned = index + 1;
            }
        });
        return starsEarned;
    }

    /**
     * Get earned stars count
     */
    getEarnedStars() {
        return this.stars.filter(s => s.earned).length;
    }

    /**
     * Get progress percentage
     */
    getProgress(score) {
        return Math.min((score / this.targetScore) * 100, 100);
    }
}

export class LevelManager {
    constructor() {
        this.currentLevel = 1;
        this.levels = [
            { targetScore: 1000, moves: 30 },
            { targetScore: 2000, moves: 25 },
            { targetScore: 3500, moves: 25 },
            { targetScore: 5000, moves: 20 },
            { targetScore: 7500, moves: 20 }
        ];
    }

    /**
     * Get current level config
     */
    getCurrentLevel() {
        const index = Math.min(this.currentLevel - 1, this.levels.length - 1);
        return this.levels[index];
    }

    /**
     * Go to next level
     */
    nextLevel() {
        this.currentLevel++;
        return this.getCurrentLevel();
    }

    /**
     * Reset to level 1
     */
    reset() {
        this.currentLevel = 1;
    }

    /**
     * Save progress
     */
    saveProgress(level, stars) {
        try {
            const saved = this.loadProgress();
            if (level > saved.level || (level === saved.level && stars > saved.stars)) {
                localStorage.setItem('match3-progress', JSON.stringify({ level, stars }));
            }
        } catch (e) {
            console.error('Failed to save progress', e);
        }
    }

    /**
     * Load progress
     */
    loadProgress() {
        try {
            const saved = localStorage.getItem('match3-progress');
            return saved ? JSON.parse(saved) : { level: 1, stars: 0 };
        } catch (e) {
            return { level: 1, stars: 0 };
        }
    }
}
