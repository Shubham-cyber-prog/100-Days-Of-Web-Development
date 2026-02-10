/**
 * Level Manager
 * Handles progression and hint generation
 */

import { levels } from '../../data/levels.js';

export class LevelManager {
    constructor() {
        this.currentLevelIdx = 0;
    }

    getCurrentLevel() {
        return levels[this.currentLevelIdx];
    }

    nextLevel() {
        if (this.currentLevelIdx < levels.length - 1) {
            this.currentLevelIdx++;
            return true;
        }
        return false; // No more levels
    }

    resetProgression() {
        this.currentLevelIdx = 0;
    }

    /**
     * Get a hint (shows one correct cell)
     * For simplicity, this requires knowing the 'correct' solution which we don't store.
     * In a real version, we'd use a solver. 
     * Here we just provide a generic tip.
     */
    getHint() {
        const tips = [
            "Remember: . matches any character except return.",
            "Character classes like [abc] mean 'a', 'b', OR 'c'.",
            "Quantifiers like * mean 0 or more times, while + means 1 or more.",
            "The pipe symbol | works like a logical OR.",
            "Check both the row AND column regex for the current square."
        ];
        return tips[Math.floor(Math.random() * tips.length)];
    }
}
