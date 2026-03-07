/**
 * Main Game Controller
 */

import { MinimaxAI } from './ai/minimax.js';
import { BoardEvaluator } from './core/boardEvaluator.js';
import { ScoreTracker } from './ui/scoreTracker.js';
import { GameHistory } from './utils/gameHistory.js';

class TicTacToeGame {
    constructor() {
        // Game components
        this.ai = new MinimaxAI('hard');
        this.evaluator = new BoardEvaluator();
        this.scoreTracker = new ScoreTracker();
        this.history = new GameHistory();

        // Game state
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X'; // X is always human
        this.gameActive = false;
        this.difficulty = 'hard';
        this.playerStarts = true;

        // DOM elements
        this.cells = document.querySelectorAll('.cell');
        this.turnIndicator = document.getElementById('turn-indicator');
        this.modal = document.getElementById('game-over-modal');
        this.winLine = document.getElementById('win-line');
        this.historyList = document.getElementById('history-list');

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Cell clicks
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        // Difficulty selection
        document.querySelectorAll('.btn-diff').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-diff').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
                this.ai.setDifficulty(this.difficulty);
            });
        });

        // Player starts toggle
        document.getElementById('player-starts').addEventListener('change', (e) => {
            this.playerStarts = e.target.checked;
        });

        // New game
        document.getElementById('btn-new-game').addEventListener('click', () => {
            this.startNewGame();
        });

        // Play again
        document.getElementById('btn-play-again').addEventListener('click', () => {
            this.modal.classList.remove('active');
            this.startNewGame();
        });

        // Reset stats
        document.getElementById('btn-reset-stats').addEventListener('click', () => {
            if (confirm('Reset all statistics?')) {
                this.scoreTracker.resetStats();
            }
        });

        // Undo
        document.getElementById('btn-undo').addEventListener('click', () => {
            this.undoMove();
        });
    }

    startNewGame() {
        // Reset board
        this.board = Array(9).fill(null);
        this.gameActive = true;
        this.history.clear();

        // Clear cells
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'taken', 'winning');
        });

        // Hide win line
        this.hideWinLine();

        // Update history display
        this.updateHistoryDisplay();
        this.updateUndoButton();

        // Determine who starts
        if (!this.playerStarts) {
            this.currentPlayer = 'O'; // AI plays as O
            this.updateTurnIndicator();
            setTimeout(() => this.makeAIMove(), 500);
        } else {
            this.currentPlayer = 'X'; // Player plays as X
            this.updateTurnIndicator();
        }
    }

    handleCellClick(index) {
        // Validate move
        if (!this.gameActive) return;
        if (this.board[index] !== null) return;
        if (this.currentPlayer === 'O') return; // AI's turn

        // Make move
        this.makeMove(index, this.currentPlayer);

        // Check game status
        const status = this.evaluator.getGameStatus(this.board);
        if (status.status !== 'ongoing') {
            this.endGame(status);
            return;
        }

        // Switch to AI
        this.currentPlayer = 'O';
        this.updateTurnIndicator();

        // AI makes move after delay
        setTimeout(() => this.makeAIMove(), 600);
    }

    makeMove(index, player) {
        // Update board
        this.board[index] = player;

        // Record in history
        this.history.recordMove(player, index, this.board);

        // Update display
        this.cells[index].textContent = player;
        this.cells[index].classList.add(player.toLowerCase(), 'taken');

        // Update history display
        this.updateHistoryDisplay();
        this.updateUndoButton();
    }

    makeAIMove() {
        if (!this.gameActive) return;

        // Get best move from AI
        const move = this.ai.getBestMove([...this.board], 'O');

        if (move === null) return;

        // Make move
        this.makeMove(move, 'O');

        // Check game status
        const status = this.evaluator.getGameStatus(this.board);
        if (status.status !== 'ongoing') {
            this.endGame(status);
            return;
        }

        // Switch back to player
        this.currentPlayer = 'X';
        this.updateTurnIndicator();
    }

    endGame(status) {
        this.gameActive = false;

        if (status.status === 'win') {
            const winner = status.winner;

            // Draw win line
            if (status.combo) {
                this.drawWinLine(status.combo);
                this.highlightWinningCells(status.combo);
            }

            // Update stats and show modal
            if (winner === 'X') {
                this.scoreTracker.recordWin();
                this.showModal('win', 'You Win!', 'Congratulations! You beat the AI!');
            } else {
                this.scoreTracker.recordLoss();
                this.showModal('lose', 'You Lose!', 'The AI was unbeatable this time.');
            }
        } else if (status.status === 'draw') {
            this.scoreTracker.recordDraw();
            this.showModal('draw', 'Draw!', "It's a tie! Well played.");
        }
    }

    updateTurnIndicator() {
        if (!this.turnIndicator) return;

        if (this.currentPlayer === 'X') {
            this.turnIndicator.textContent = 'Your Turn (X)';
            this.turnIndicator.style.borderColor = 'var(--player-x)';
        } else {
            this.turnIndicator.textContent = 'AI Turn (O)';
            this.turnIndicator.style.borderColor = 'var(--player-o)';
        }
    }

    drawWinLine(combo) {
        if (!this.winLine) return;

        const line = this.winLine.querySelector('line');
        const board = document.getElementById('game-board');
        const boardRect = board.getBoundingClientRect();

        // Get center positions of winning cells
        const firstCell = this.cells[combo[0]];
        const lastCell = this.cells[combo[2]];

        const firstRect = firstCell.getBoundingClientRect();
        const lastRect = lastCell.getBoundingClientRect();

        const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
        const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;
        const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
        const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('active');
    }

    hideWinLine() {
        if (!this.winLine) return;
        const line = this.winLine.querySelector('line');
        line.classList.remove('active');
    }

    highlightWinningCells(combo) {
        combo.forEach(index => {
            this.cells[index].classList.add('winning');
        });
    }

    showModal(type, title, message) {
        const icon = document.getElementById('modal-icon');
        const titleEl = document.getElementById('modal-title');
        const messageEl = document.getElementById('modal-message');

        // Update content
        icon.className = `modal-icon ${type}`;

        if (type === 'win') {
            icon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
        } else if (type === 'lose') {
            icon.innerHTML = '<i class="fa-solid fa-robot"></i>';
        } else {
            icon.innerHTML = '<i class="fa-solid fa-handshake"></i>';
        }

        titleEl.textContent = title;
        messageEl.textContent = message;

        // Show modal
        setTimeout(() => {
            this.modal.classList.add('active');
        }, 800);
    }

    updateHistoryDisplay() {
        if (!this.historyList) return;

        const moves = this.history.getFormattedMoves();

        if (moves.length === 0) {
            this.historyList.innerHTML = '<div class="no-history">No moves yet</div>';
            return;
        }

        this.historyList.innerHTML = moves.map(move => `
            <div class="history-item">
                <span class="history-move">${move.number}. ${move.player} → ${move.position}</span>
            </div>
        `).join('');
    }

    updateUndoButton() {
        const undoBtn = document.getElementById('btn-undo');
        if (undoBtn) {
            undoBtn.disabled = !this.history.canUndo() || !this.gameActive;
        }
    }

    undoMove() {
        if (!this.history.canUndo() || !this.gameActive) return;

        // Undo last two moves (player + AI)
        const lastMove = this.history.getLastMove();

        if (lastMove && lastMove.player === 'O') {
            // Undo AI move
            const boardState = this.history.undoLastMove();
            if (boardState) {
                this.board = boardState;
                this.updateBoardDisplay();
            }
        }

        // Undo player move
        const boardState = this.history.undoLastMove();
        if (boardState) {
            this.board = boardState;
            this.updateBoardDisplay();
        }

        this.currentPlayer = 'X';
        this.updateTurnIndicator();
        this.updateHistoryDisplay();
        this.updateUndoButton();
    }

    updateBoardDisplay() {
        this.cells.forEach((cell, index) => {
            cell.textContent = this.board[index] || '';
            cell.classList.remove('x', 'o', 'taken');

            if (this.board[index]) {
                cell.classList.add(this.board[index].toLowerCase(), 'taken');
            }
        });
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToeGame();
});
