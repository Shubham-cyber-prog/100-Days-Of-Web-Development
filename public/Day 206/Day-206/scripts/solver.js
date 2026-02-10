/**
 * Sudoku Solver using Backtracking Algorithm
 */

export class SudokuSolver {
    /**
     * Solve the Sudoku puzzle using backtracking
     * @param {number[][]} board - 9x9 grid
     * @returns {boolean} - True if solved, false if unsolvable
     */
    solve(board) {
        const emptyCell = this.findEmptyCell(board);

        if (!emptyCell) {
            return true; // Puzzle solved
        }

        const [row, col] = emptyCell;

        for (let num = 1; num <= 9; num++) {
            if (this.isValid(board, row, col, num)) {
                board[row][col] = num;

                if (this.solve(board)) {
                    return true;
                }

                // Backtrack
                board[row][col] = 0;
            }
        }

        return false; // Trigger backtracking
    }

    /**
     * Find the next empty cell (0)
     * @param {number[][]} board
     * @returns {number[]|null} - [row, col] or null if no empty cells
     */
    findEmptyCell(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }

    /**
     * Check if placing num at board[row][col] is valid
     * @param {number[][]} board
     * @param {number} row
     * @param {number} col
     * @param {number} num
     * @returns {boolean}
     */
    isValid(board, row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (board[row][c] === num) {
                return false;
            }
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (board[r][col] === num) {
                return false;
            }
        }

        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if (board[r][c] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Get a hint by solving one cell
     * @param {number[][]} board
     * @returns {object|null} - {row, col, value} or null
     */
    getHint(board) {
        const boardCopy = board.map(row => [...row]);

        if (this.solve(boardCopy)) {
            // Find first difference
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    if (board[row][col] === 0 && boardCopy[row][col] !== 0) {
                        return {
                            row,
                            col,
                            value: boardCopy[row][col]
                        };
                    }
                }
            }
        }

        return null;
    }

    /**
     * Check if the current board state is valid (no conflicts)
     * @param {number[][]} board
     * @returns {boolean}
     */
    isValidState(board) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== 0) {
                    const num = board[row][col];
                    board[row][col] = 0; // Temporarily remove

                    if (!this.isValid(board, row, col, num)) {
                        board[row][col] = num; // Restore
                        return false;
                    }

                    board[row][col] = num; // Restore
                }
            }
        }
        return true;
    }
}
