/**
 * Match-3 Puzzle Main Game Controller
 */

import { Board } from './board.js';
import { TileFactory, TILE_TYPES } from './tiles.js';
import { AnimationManager } from './animations.js';
import { ScoringSystem, LevelObjective, LevelManager } from './scoring.js';

class Match3Game {
    constructor() {
        this.boardElement = document.getElementById('game-board');
        this.board = new Board(8, 8, 6);
        this.animationManager = new AnimationManager(this.boardElement);
        this.scoringSystem = new ScoringSystem();
        this.levelManager = new LevelManager();

        this.selectedTile = null;
        this.isProcessing = false;
        this.hintTimeout = null;
        this.currentObjective = null;

        this.init();
    }

    init() {
        this.startLevel();
        this.bindEvents();
        this.startHintTimer();
    }

    startLevel() {
        const levelConfig = this.levelManager.getCurrentLevel();
        this.currentObjective = new LevelObjective(levelConfig.targetScore, levelConfig.moves);
        this.scoringSystem.reset();

        this.board.initialize();
        this.renderBoard();
        this.updateUI();
    }

    bindEvents() {
        this.boardElement.addEventListener('click', (e) => {
            if (this.isProcessing) return;

            const tileElement = e.target.closest('.tile');
            if (!tileElement) return;

            const row = parseInt(tileElement.dataset.row);
            const col = parseInt(tileElement.dataset.col);
            const tile = this.board.getTile(row, col);

            if (!tile) return;

            this.handleTileClick(tile);
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('shuffle-btn').addEventListener('click', () => {
            this.shuffleBoard();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartLevel();
        });

        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('retry-btn').addEventListener('click', () => {
            this.restartLevel();
        });
    }

    handleTileClick(tile) {
        this.resetHintTimer();

        if (!this.selectedTile) {
            this.selectTile(tile);
        } else if (this.selectedTile === tile) {
            this.deselectTile();
        } else if (this.board.isValidSwap(this.selectedTile, tile)) {
            this.attemptSwap(this.selectedTile, tile);
        } else {
            this.deselectTile();
            this.selectTile(tile);
        }
    }

    selectTile(tile) {
        this.selectedTile = tile;
        if (tile.element) {
            tile.element.classList.add('selected');
        }
    }

    deselectTile() {
        if (this.selectedTile && this.selectedTile.element) {
            this.selectedTile.element.classList.remove('selected');
        }
        this.selectedTile = null;
    }

    async attemptSwap(tile1, tile2) {
        this.isProcessing = true;
        this.deselectTile();

        // Animate swap
        await this.animationManager.animateSwap(tile1, tile2);
        this.board.swap(tile1, tile2);
        this.updateTilePositions();

        // Check for matches
        const matches = this.board.findMatches();

        if (matches.length > 0) {
            // Valid move
            this.currentObjective.useMove();
            this.updateUI();

            await this.processMatches();

            // Check win/lose conditions
            if (this.currentObjective.isComplete(this.scoringSystem.getScore())) {
                this.levelComplete();
            } else if (this.currentObjective.isOutOfMoves()) {
                this.gameOver();
            } else {
                // Check if no moves available
                const possibleMoves = this.board.findPossibleMoves();
                if (possibleMoves.length === 0) {
                    await this.shuffleBoard();
                }
            }
        } else {
            // Invalid move - swap back
            await this.animationManager.animateSwap(tile1, tile2);
            this.board.swap(tile1, tile2);
            this.updateTilePositions();
        }

        this.isProcessing = false;
    }

    async processMatches() {
        let cascadeCount = 0;

        while (true) {
            const matches = this.board.findMatches();
            if (matches.length === 0) break;

            cascadeCount++;

            // Calculate score
            let totalScore = 0;
            matches.forEach(match => {
                const score = this.scoringSystem.calculateMatchScore(match.length);
                totalScore += score;
            });

            this.scoringSystem.addScore(totalScore);
            if (cascadeCount > 1) {
                this.scoringSystem.incrementCombo();
            }

            // Show combo if applicable
            if (this.scoringSystem.getCombo() > 0) {
                const rect = this.boardElement.getBoundingClientRect();
                this.animationManager.showCombo(
                    this.scoringSystem.getCombo(),
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            }

            // Remove matches and create special tiles
            const specialTileInfo = this.board.removeMatches(matches);

            // Animate matches
            const allMatchedTiles = matches.flatMap(m => m.tiles);
            await this.animationManager.animateMatch(allMatchedTiles);

            // Create special tiles
            specialTileInfo.forEach(info => {
                const specialTile = TileFactory.createSpecial(info.row, info.col, info.type, info.matchSize);
                this.board.grid[info.row][info.col] = specialTile;
                this.animationManager.addShimmer(specialTile);
            });

            // Apply gravity
            this.board.applyGravity();

            // Fill empty spaces
            const newTiles = this.board.fillEmpty();

            // Render and animate
            this.renderBoard();
            await this.animationManager.animateFall(newTiles);

            // Update UI
            this.updateUI();
        }

        // Reset combo after cascade ends
        if (cascadeCount > 1) {
            setTimeout(() => {
                this.scoringSystem.resetCombo();
                this.updateUI();
            }, 1000);
        }
    }

    renderBoard() {
        this.boardElement.innerHTML = '';

        for (let r = 0; r < this.board.rows; r++) {
            for (let c = 0; c < this.board.cols; c++) {
                const tile = this.board.grid[r][c];
                if (tile) {
                    const element = tile.createElement();
                    this.boardElement.appendChild(element);
                }
            }
        }
    }

    updateTilePositions() {
        for (let r = 0; r < this.board.rows; r++) {
            for (let c = 0; c < this.board.cols; c++) {
                const tile = this.board.grid[r][c];
                if (tile && tile.element) {
                    tile.element.dataset.row = r;
                    tile.element.dataset.col = c;
                }
            }
        }
    }

    updateUI() {
        // Score
        document.getElementById('score').textContent = this.scoringSystem.getScore();
        document.getElementById('score').classList.add('flash');
        setTimeout(() => document.getElementById('score').classList.remove('flash'), 400);

        // Moves
        document.getElementById('moves').textContent = this.currentObjective.movesRemaining;

        // Combo
        document.getElementById('combo').textContent = `${this.scoringSystem.getCombo()}x`;

        // Target
        document.getElementById('target-score').textContent = this.currentObjective.targetScore;

        // Level
        document.getElementById('current-level').textContent = this.levelManager.currentLevel;

        // Progress
        const progress = this.currentObjective.getProgress(this.scoringSystem.getScore());
        document.getElementById('progress-fill').style.width = `${progress}%`;

        // Stars
        const starsEarned = this.currentObjective.updateStars(this.scoringSystem.getScore());
        const starElements = document.querySelectorAll('#stars .star');
        starElements.forEach((star, index) => {
            if (this.currentObjective.stars[index].earned) {
                star.classList.add('active');
                if (starsEarned === index + 1) {
                    star.classList.add('earning');
                    setTimeout(() => star.classList.remove('earning'), 600);
                }
            }
        });
    }

    showHint() {
        const possibleMoves = this.board.findPossibleMoves();

        if (possibleMoves.length === 0) {
            this.shuffleBoard();
            return;
        }

        const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

        if (move.tile1.element) move.tile1.element.classList.add('hint');
        if (move.tile2.element) move.tile2.element.classList.add('hint');

        setTimeout(() => {
            if (move.tile1.element) move.tile1.element.classList.remove('hint');
            if (move.tile2.element) move.tile2.element.classList.remove('hint');
        }, 2000);
    }

    startHintTimer() {
        this.hintTimeout = setTimeout(() => {
            if (!this.isProcessing) {
                this.showHint();
            }
            this.startHintTimer();
        }, 5000);
    }

    resetHintTimer() {
        if (this.hintTimeout) {
            clearTimeout(this.hintTimeout);
        }
        this.startHintTimer();
    }

    async shuffleBoard() {
        this.isProcessing = true;
        this.animationManager.shakeBoard();

        await new Promise(resolve => setTimeout(resolve, 300));

        this.board.shuffle();
        this.renderBoard();

        this.isProcessing = false;
    }

    restartLevel() {
        document.getElementById('game-over-modal').classList.remove('active');
        this.startLevel();
    }

    nextLevel() {
        document.getElementById('level-complete-modal').classList.remove('active');
        this.levelManager.nextLevel();
        this.startLevel();
    }

    levelComplete() {
        const starsEarned = this.currentObjective.getEarnedStars();
        this.levelManager.saveProgress(this.levelManager.currentLevel, starsEarned);

        document.getElementById('final-score').textContent = this.scoringSystem.getScore();

        const starElements = document.querySelectorAll('#stars-earned .star');
        starElements.forEach((star, index) => {
            if (index < starsEarned) {
                star.classList.add('active');
            }
        });

        document.getElementById('level-complete-modal').classList.add('active');
    }

    gameOver() {
        document.getElementById('game-over-score').textContent = this.scoringSystem.getScore();
        document.getElementById('game-over-modal').classList.add('active');
    }
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
    new Match3Game();
});
