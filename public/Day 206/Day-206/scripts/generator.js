/**
 * Sudoku Puzzle Generator
 */

import { SudokuSolver } from './solver.js';

export class SudokuGenerator {
    constructor() {
        this.solver = new SudokuSolver();
    }

    /**
     * Generate a complete valid Sudoku board
     * @returns {number[][]} - Filled 9x9 grid
     */
    generateComplete() {
        const board = Array(9).fill(0).map(() => Array(9).fill(0));
        this.fillBoard(board);
        return board;
    }

    /**
     * Fill the board with a valid solution
     * @param {number[][]} board
     * @returns {boolean}
     */
    fillBoard(board) {
        const emptyCell = this.solver.findEmptyCell(board);

        if (!emptyCell) {
            return true; // Board filled
        }

        const [row, col] = emptyCell;
        const numbers = this.shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of numbers) {
            if (this.solver.isValid(board, row, col, num)) {
                board[row][col] = num;

                if (this.fillBoard(board)) {
                    return true;
                }

                board[row][col] = 0;
            }
        }

        return false;
    }

    /**
     * Generate a puzzle by removing numbers from a complete board
     * @param {string} difficulty - 'easy', 'medium', or 'hard'
     * @returns {object} - {puzzle: number[][], solution: number[][]}
     */
    generate(difficulty = 'medium') {
        const solution = this.generateComplete();
        const puzzle = solution.map(row => [...row]);

        const cellsToRemove = this.getCellsToRemove(difficulty);
        let removed = 0;

        while (removed < cellsToRemove) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);

            if (puzzle[row][col] !== 0) {
                const backup = puzzle[row][col];
                puzzle[row][col] = 0;

                // Ensure puzzle still has unique solution
                const testBoard = puzzle.map(r => [...r]);
                if (this.hasUniqueSolution(testBoard)) {
                    removed++;
                } else {
                    puzzle[row][col] = backup;
                }
            }
        }

        return {
            puzzle,
            solution
        };
    }

    /**
     * Get number of cells to remove based on difficulty
     * @param {string} difficulty
     * @returns {number}
     */
    getCellsToRemove(difficulty) {
        switch (difficulty) {
            case 'easy':
                return 35; // Remove 35 numbers
            case 'medium':
                return 45; // Remove 45 numbers
            case 'hard':
                return 55; // Remove 55 numbers
            default:
                return 45;
        }
    }

    /**
     * Check if puzzle has a unique solution (simplified check)
     * @param {number[][]} board
     * @returns {boolean}
     */
    hasUniqueSolution(board) {
        const boardCopy = board.map(row => [...row]);
        return this.solver.solve(boardCopy);
    }

    /**
     * Shuffle array using Fisher-Yates algorithm
     * @param {Array} array
     * @returns {Array}
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}
