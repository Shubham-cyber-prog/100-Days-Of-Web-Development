/**
 * Sudoku Validator - Real-time rule checking
 */

export class SudokuValidator {
    /**
     * Check if a number placement creates conflicts
     * @param {number[][]} board
     * @param {number} row
     * @param {number} col
     * @param {number} num
     * @returns {object} - {valid: boolean, conflicts: Array}
     */
    validatePlacement(board, row, col, num) {
        const conflicts = [];

        if (num === 0) {
            return { valid: true, conflicts: [] };
        }

        // Check row conflicts
        for (let c = 0; c < 9; c++) {
            if (c !== col && board[row][c] === num) {
                conflicts.push({ row, col: c, type: 'row' });
            }
        }

        // Check column conflicts
        for (let r = 0; r < 9; r++) {
            if (r !== row && board[r][col] === num) {
                conflicts.push({ row: r, col, type: 'column' });
            }
        }

        // Check 3x3 box conflicts
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;

        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if ((r !== row || c !== col) && board[r][c] === num) {
                    conflicts.push({ row: r, col: c, type: 'box' });
                }
            }
        }

        return {
            valid: conflicts.length === 0,
            conflicts
        };
    }

    /**
     * Get all cells with the same number
     * @param {number[][]} board
     * @param {number} num
     * @returns {Array} - Array of {row, col}
     */
    getSameNumberCells(board, num) {
        const cells = [];

        if (num === 0) return cells;

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] === num) {
                    cells.push({ row, col });
                }
            }
        }

        return cells;
    }

    /**
     * Check if the puzzle is completely solved
     * @param {number[][]} board
     * @param {number[][]} solution
     * @returns {boolean}
     */
    isSolved(board, solution) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (board[row][col] !== solution[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Get all error cells (conflicts)
     * @param {number[][]} board
     * @returns {Array} - Array of {row, col}
     */
    getAllErrors(board) {
        const errorCells = new Set();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const num = board[row][col];
                if (num !== 0) {
                    const result = this.validatePlacement(board, row, col, num);
                    if (!result.valid) {
                        errorCells.add(`${row},${col}`);
                        result.conflicts.forEach(conflict => {
                            errorCells.add(`${conflict.row},${conflict.col}`);
                        });
                    }
                }
            }
        }

        return Array.from(errorCells).map(key => {
            const [row, col] = key.split(',').map(Number);
            return { row, col };
        });
    }
}
