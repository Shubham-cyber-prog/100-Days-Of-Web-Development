/**
 * Game Controller
 * Main entry point for Regex Crossword
 */

import { LevelManager } from './core/levelGenerator.js';
import { GridRenderer } from './ui/gridRenderer.js';
import { Validator } from './core/validator.js';
import { ModalManager } from './ui/modal.js';

class RegexGame {
    constructor() {
        this.levels = new LevelManager();
        this.renderer = new GridRenderer('crossword-grid', 'row-clues', 'col-clues');
        this.modals = new ModalManager('win-modal', 'btn-next-level', 'final-time');

        this.timer = 0;
        this.timerInterval = null;

        this.init();
    }

    init() {
        this.loadLevel();
        this.bindGlobalEvents();
    }

    loadLevel() {
        const level = this.levels.getCurrentLevel();
        document.getElementById('level-display').textContent = `Level ${level.id}: ${level.title}`;

        this.renderer.render(level, () => this.onCellInput());
        this.resetTimer();
        this.startTimer();

        document.getElementById('match-status').textContent = 'Status: Solving...';
    }

    bindGlobalEvents() {
        document.getElementById('btn-reset').onclick = () => {
            if (confirm("Reset current level?")) this.loadLevel();
        };

        document.getElementById('btn-help').onclick = () => {
            alert(this.levels.getHint());
        };

        document.getElementById('btn-submit').onclick = () => {
            this.onCellInput(); // Force check
        };

        document.getElementById('btn-tutorial').onclick = () => {
            alert("Solve the grid! Each square must satisfy both horizontal and vertical regex patterns.");
        };
    }

    onCellInput() {
        const level = this.levels.getCurrentLevel();
        const gridState = this.renderer.getGridState(level.rows, level.cols);

        const results = Validator.checkGrid(gridState, level.rowRegex, level.colRegex);
        this.renderer.updateFeedback(results);

        if (results.isComplete) {
            this.handleWin();
        }
    }

    handleWin() {
        clearInterval(this.timerInterval);
        const timeStr = document.getElementById('game-timer').textContent;

        document.getElementById('match-status').textContent = 'Status: COMPLETED!';

        setTimeout(() => {
            this.modals.show(timeStr, () => {
                if (this.levels.nextLevel()) {
                    this.loadLevel();
                } else {
                    alert("Congratulations! You've finished all levels.");
                    this.levels.resetProgression();
                    this.loadLevel();
                }
            });
        }, 500);
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            const mins = Math.floor(this.timer / 60).toString().padStart(2, '0');
            const secs = (this.timer % 60).toString().padStart(2, '0');
            document.getElementById('game-timer').textContent = `${mins}:${secs}`;
        }, 1000);
    }

    resetTimer() {
        clearInterval(this.timerInterval);
        this.timer = 0;
        document.getElementById('game-timer').textContent = '00:00';
    }
}

// Bootstrap Game
document.addEventListener('DOMContentLoaded', () => {
    new RegexGame();
});
