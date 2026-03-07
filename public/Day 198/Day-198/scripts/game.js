/**
 * Main Game Controller
 * Orchestrates all game components
 */

import { CardGenerator } from './core/cardGenerator.js';
import { MatchValidator } from './core/matchValidator.js';
import { GameTimer, HighScoreManager } from './ui/timer.js';

class MemoryGame {
    constructor() {
        // Game components
        this.validator = new MatchValidator();
        this.timer = new GameTimer(document.getElementById('timer-display'));
        this.scoreManager = new HighScoreManager();

        // Game state
        this.difficulty = 'easy';
        this.theme = 'mixed';
        this.gameActive = false;

        // DOM elements
        this.board = document.getElementById('game-board');
        this.movesDisplay = document.getElementById('moves-display');
        this.matchesDisplay = document.getElementById('matches-display');
        this.totalPairsDisplay = document.getElementById('total-pairs');
        this.modal = document.getElementById('victory-modal');

        this.init();
    }

    init() {
        this.bindEvents();
        this.renderHighScores();
    }

    bindEvents() {
        // Difficulty selection
        document.querySelectorAll('.btn-difficulty').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-difficulty').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.level;
            });
        });

        // Theme selection
        document.getElementById('card-theme').addEventListener('change', (e) => {
            this.theme = e.target.value;
        });

        // Start game
        document.getElementById('btn-start-game').addEventListener('click', () => {
            this.startNewGame();
        });

        // Modal actions
        document.getElementById('btn-play-again').addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.startNewGame();
        });

        document.getElementById('btn-close-modal').addEventListener('click', () => {
            this.modal.classList.remove('active');
        });
    }

    startNewGame() {
        // Reset game state
        this.gameActive = true;
        this.timer.reset();

        // Generate and render cards
        const cards = CardGenerator.generateDeck(this.theme, this.difficulty);
        const pairCount = cards.length / 2;

        // Initialize validator
        this.validator.init(pairCount);

        // Update grid class
        this.board.className = 'game-board';
        this.board.classList.add(`grid-${this.difficulty}`);

        // Render cards
        CardGenerator.renderCards(this.board, cards);

        // Update displays
        this.totalPairsDisplay.textContent = pairCount;
        this.updateStats();

        // Bind card click events
        this.bindCardEvents();

        // Start timer
        this.timer.start();
    }

    bindCardEvents() {
        const cards = this.board.querySelectorAll('.memory-card');
        cards.forEach(card => {
            card.addEventListener('click', () => this.handleCardClick(card));
        });
    }

    handleCardClick(cardElement) {
        if (!this.gameActive) return;

        const result = this.validator.handleCardFlip(cardElement);

        if (!result.canFlip) return;

        if (result.shouldCheck) {
            // Wait for flip animation
            setTimeout(() => {
                this.checkForMatch();
            }, 600);
        }

        this.updateStats();
    }

    checkForMatch() {
        const result = this.validator.checkMatch();

        if (result.isMatch) {
            // Cards match - keep them flipped
            setTimeout(() => {
                this.validator.clearMatched();

                if (result.isComplete) {
                    this.handleGameComplete();
                }
            }, 600);
        } else {
            // No match - flip back after delay
            setTimeout(() => {
                this.validator.resetFlipped();
            }, 1200);
        }

        this.updateStats();
    }

    handleGameComplete() {
        this.gameActive = false;
        this.timer.stop();

        const stats = this.validator.getStats();
        const time = this.timer.getElapsedSeconds();
        const formattedTime = this.timer.getFormattedTime();

        // Save score
        this.scoreManager.addScore(
            this.difficulty,
            this.theme,
            time,
            stats.moves,
            stats.accuracy
        );

        // Update high scores display
        this.renderHighScores();

        // Show victory modal
        this.showVictoryModal(formattedTime, stats);
    }

    showVictoryModal(time, stats) {
        document.getElementById('final-time').textContent = time;
        document.getElementById('final-moves').textContent = stats.moves;
        document.getElementById('final-accuracy').textContent = `${stats.accuracy}%`;

        this.modal.classList.add('active');
    }

    updateStats() {
        const stats = this.validator.getStats();
        this.movesDisplay.textContent = stats.moves;
        this.matchesDisplay.textContent = stats.matched;
    }

    renderHighScores() {
        const container = document.getElementById('high-scores-list');
        const scores = this.scoreManager.getTopScores(5);

        if (scores.length === 0) {
            container.innerHTML = '<div class="no-scores">Play your first game to see scores!</div>';
            return;
        }

        container.innerHTML = scores.map((score, index) => {
            const date = new Date(score.timestamp);
            return `
                <div class="score-entry">
                    <div class="score-header">
                        <span class="score-difficulty">#${index + 1} ${score.difficulty.toUpperCase()}</span>
                        <span class="score-time">${this.formatTime(score.time)}</span>
                    </div>
                    <div class="score-details">
                        ${score.moves} moves · ${score.accuracy}% accuracy
                    </div>
                </div>
            `;
        }).join('');
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
}

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
