/**
 * Sudoku Main Application
 */

import { SudokuGenerator } from './generator.js';
import { SudokuSolver } from './solver.js';
import { SudokuValidator } from './validator.js';
import { GameTimer, SessionManager } from './timer.js';

class SudokuApp {
    constructor() {
        this.generator = new SudokuGenerator();
        this.solver = new SudokuSolver();
        this.validator = new SudokuValidator();
        this.timer = new GameTimer(document.getElementById('timer'));
        this.sessionManager = new SessionManager();

        // Game state
        this.puzzle = null;
        this.solution = null;
        this.currentBoard = null;
        this.fixedCells = new Set();
        this.selectedCell = null;
        this.difficulty = 'medium';
        this.pencilMode = false;
        this.pencilMarks = {}; // {row-col: Set of numbers}
        this.history = [];
        this.historyIndex = -1;

        // DOM elements
        this.boardElement = document.getElementById('game-board');
        this.difficultySelector = document.getElementById('difficulty-selector');
        this.winModal = document.getElementById('win-modal');

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadTheme();
        this.checkSavedGame();
    }

    bindEvents() {
        // Difficulty selection
        document.querySelectorAll('.diff-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.difficulty = e.target.dataset.difficulty;
            });
        });

        // Start game
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.startNewGame();
        });

        // Number pad
        document.querySelectorAll('.num-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const num = parseInt(e.target.dataset.num);
                this.handleNumberInput(num);
            });
        });

        // Keyboard input
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                this.handleNumberInput(parseInt(e.key));
            } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
                this.handleNumberInput(0);
            } else if (e.key === 'p' || e.key === 'P') {
                this.togglePencilMode();
            } else if (e.ctrlKey && e.key === 'z') {
                this.undo();
            } else if (e.ctrlKey && e.key === 'y') {
                this.redo();
            }
        });

        // Action buttons
        document.getElementById('pencil-toggle').addEventListener('click', () => {
            this.togglePencilMode();
        });

        document.getElementById('hint-btn').addEventListener('click', () => {
            this.showHint();
        });

        document.getElementById('undo-btn').addEventListener('click', () => {
            this.undo();
        });

        document.getElementById('redo-btn').addEventListener('click', () => {
            this.redo();
        });

        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.difficultySelector.classList.remove('hidden');
        });

        document.getElementById('validate-btn').addEventListener('click', () => {
            this.validateSolution();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.winModal.classList.remove('active');
            this.difficultySelector.classList.remove('hidden');
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    startNewGame() {
        this.difficultySelector.classList.add('hidden');

        // Generate puzzle
        const { puzzle, solution } = this.generator.generate(this.difficulty);
        this.puzzle = puzzle;
        this.solution = solution;
        this.currentBoard = puzzle.map(row => [...row]);

        // Track fixed cells
        this.fixedCells.clear();
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (puzzle[row][col] !== 0) {
                    this.fixedCells.add(`${row}-${col}`);
                }
            }
        }

        // Reset state
        this.pencilMarks = {};
        this.history = [];
        this.historyIndex = -1;
        this.selectedCell = null;

        // Update difficulty display
        document.getElementById('difficulty-display').textContent =
            this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);

        // Render board
        this.renderBoard();

        // Start timer
        this.timer.reset();
        this.timer.start();

        // Save state
        this.saveGame();
    }

    renderBoard() {
        this.boardElement.innerHTML = '';

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;

                const value = this.currentBoard[row][col];
                const key = `${row}-${col}`;

                if (this.fixedCells.has(key)) {
                    cell.classList.add('fixed');
                }

                if (value !== 0) {
                    cell.textContent = value;
                } else if (this.pencilMarks[key]) {
                    // Render pencil marks
                    const marksDiv = document.createElement('div');
                    marksDiv.className = 'pencil-marks';
                    for (let i = 1; i <= 9; i++) {
                        const span = document.createElement('span');
                        if (this.pencilMarks[key].has(i)) {
                            span.textContent = i;
                        }
                        marksDiv.appendChild(span);
                    }
                    cell.appendChild(marksDiv);
                }

                cell.addEventListener('click', () => {
                    this.selectCell(row, col);
                });

                this.boardElement.appendChild(cell);
            }
        }

        this.updateCellHighlights();
    }

    selectCell(row, col) {
        const key = `${row}-${col}`;

        if (this.fixedCells.has(key)) {
            return; // Can't select fixed cells
        }

        this.selectedCell = { row, col };
        this.updateCellHighlights();
    }

    updateCellHighlights() {
        const cells = this.boardElement.querySelectorAll('.cell');

        cells.forEach(cell => {
            cell.classList.remove('selected', 'same-number', 'error');
        });

        if (!this.selectedCell) return;

        const { row, col } = this.selectedCell;
        const selectedValue = this.currentBoard[row][col];

        // Highlight selected cell
        const selectedElement = this.boardElement.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        if (selectedElement) {
            selectedElement.classList.add('selected');
        }

        // Highlight same numbers
        if (selectedValue !== 0) {
            const sameCells = this.validator.getSameNumberCells(this.currentBoard, selectedValue);
            sameCells.forEach(({ row: r, col: c }) => {
                const cellElement = this.boardElement.querySelector(`[data-row="${r}"][data-col="${c}"]`);
                if (cellElement) {
                    cellElement.classList.add('same-number');
                }
            });
        }

        // Highlight errors
        const errors = this.validator.getAllErrors(this.currentBoard);
        errors.forEach(({ row: r, col: c }) => {
            const cellElement = this.boardElement.querySelector(`[data-row="${r}"][data-col="${c}"]`);
            if (cellElement) {
                cellElement.classList.add('error');
            }
        });
    }

    handleNumberInput(num) {
        if (!this.selectedCell) return;

        const { row, col } = this.selectedCell;
        const key = `${row}-${col}`;

        if (this.fixedCells.has(key)) return;

        // Save to history
        this.saveToHistory();

        if (this.pencilMode && num !== 0) {
            // Toggle pencil mark
            if (!this.pencilMarks[key]) {
                this.pencilMarks[key] = new Set();
            }

            if (this.pencilMarks[key].has(num)) {
                this.pencilMarks[key].delete(num);
            } else {
                this.pencilMarks[key].add(num);
            }

            if (this.pencilMarks[key].size === 0) {
                delete this.pencilMarks[key];
            }
        } else {
            // Place number
            this.currentBoard[row][col] = num;
            delete this.pencilMarks[key]; // Clear pencil marks
        }

        this.renderBoard();
        this.selectCell(row, col); // Reselect

        // Check if solved
        if (this.validator.isSolved(this.currentBoard, this.solution)) {
            this.onWin();
        }

        this.saveGame();
    }

    togglePencilMode() {
        this.pencilMode = !this.pencilMode;
        const btn = document.getElementById('pencil-toggle');
        btn.classList.toggle('active', this.pencilMode);
    }

    showHint() {
        const hint = this.solver.getHint(this.currentBoard);

        if (hint) {
            this.saveToHistory();
            this.currentBoard[hint.row][hint.col] = hint.value;
            this.renderBoard();
            this.selectCell(hint.row, hint.col);
            this.saveGame();
        }
    }

    saveToHistory() {
        // Remove future history if we're not at the end
        this.history = this.history.slice(0, this.historyIndex + 1);

        // Save current state
        this.history.push({
            board: this.currentBoard.map(row => [...row]),
            pencilMarks: JSON.parse(JSON.stringify(this.pencilMarks))
        });

        this.historyIndex++;

        // Limit history size
        if (this.history.length > 50) {
            this.history.shift();
            this.historyIndex--;
        }

        this.updateUndoRedoButtons();
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            const state = this.history[this.historyIndex];
            this.currentBoard = state.board.map(row => [...row]);
            this.pencilMarks = JSON.parse(JSON.stringify(state.pencilMarks));
            this.renderBoard();
            this.updateUndoRedoButtons();
            this.saveGame();
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            const state = this.history[this.historyIndex];
            this.currentBoard = state.board.map(row => [...row]);
            this.pencilMarks = JSON.parse(JSON.stringify(state.pencilMarks));
            this.renderBoard();
            this.updateUndoRedoButtons();
            this.saveGame();
        }
    }

    updateUndoRedoButtons() {
        document.getElementById('undo-btn').disabled = this.historyIndex <= 0;
        document.getElementById('redo-btn').disabled = this.historyIndex >= this.history.length - 1;
    }

    validateSolution() {
        const errors = this.validator.getAllErrors(this.currentBoard);

        if (errors.length === 0) {
            if (this.validator.isSolved(this.currentBoard, this.solution)) {
                this.onWin();
            } else {
                alert('No errors, but puzzle is not complete yet!');
            }
        } else {
            alert(`Found ${errors.length} error(s). Check highlighted cells.`);
        }
    }

    onWin() {
        this.timer.pause();
        document.getElementById('final-time').textContent = this.timer.getFormattedTime();
        this.winModal.classList.add('active');
        this.sessionManager.clearState();
    }

    saveGame() {
        const state = {
            puzzle: this.puzzle,
            solution: this.solution,
            currentBoard: this.currentBoard,
            fixedCells: Array.from(this.fixedCells),
            difficulty: this.difficulty,
            time: this.timer.getTime(),
            pencilMarks: this.pencilMarks,
            history: this.history,
            historyIndex: this.historyIndex
        };

        this.sessionManager.saveState(state);
    }

    checkSavedGame() {
        const saved = this.sessionManager.loadState();

        if (saved) {
            const resume = confirm('Resume previous game?');

            if (resume) {
                this.loadGame(saved);
            } else {
                this.sessionManager.clearState();
            }
        }
    }

    loadGame(state) {
        this.puzzle = state.puzzle;
        this.solution = state.solution;
        this.currentBoard = state.currentBoard;
        this.fixedCells = new Set(state.fixedCells);
        this.difficulty = state.difficulty;
        this.pencilMarks = state.pencilMarks || {};
        this.history = state.history || [];
        this.historyIndex = state.historyIndex || -1;

        document.getElementById('difficulty-display').textContent =
            this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);

        this.difficultySelector.classList.add('hidden');
        this.renderBoard();
        this.timer.setTime(state.time || 0);
        this.timer.start();
        this.updateUndoRedoButtons();
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('sudoku-theme', isDark ? 'dark' : 'light');

        const icon = document.querySelector('.theme-toggle .icon');
        icon.textContent = isDark ? '☀️' : '🌙';
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('sudoku-theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            document.querySelector('.theme-toggle .icon').textContent = '☀️';
        }
    }
}

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    new SudokuApp();
});
