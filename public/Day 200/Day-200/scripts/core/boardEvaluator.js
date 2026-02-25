/**
 * Board Evaluator - Win condition checking
 */

export class BoardEvaluator {
    constructor() {
        // All 8 possible winning combinations
        this.winningCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal top-left to bottom-right
            [2, 4, 6]  // Diagonal top-right to bottom-left
        ];
    }

    /**
     * Check if there's a winner
     * @returns {string|null} 'X', 'O', or null
     */
    checkWinner(board) {
        for (const combo of this.winningCombinations) {
            const [a, b, c] = combo;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Return the winning player
            }
        }
        return null; // No winner
    }

    /**
     * Get winning combination indices
     */
    getWinningCombo(board) {
        for (const combo of this.winningCombinations) {
            const [a, b, c] = combo;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return combo; // Return the winning indices
            }
        }
        return null;
    }

    /**
     * Check if board is full (draw condition)
     */
    isBoardFull(board) {
        return board.every(cell => cell !== null);
    }

    /**
     * Check if game is over
     */
    isGameOver(board) {
        return this.checkWinner(board) !== null || this.isBoardFull(board);
    }

    /**
     * Get game status
     */
    getGameStatus(board) {
        const winner = this.checkWinner(board);

        if (winner) {
            return { status: 'win', winner, combo: this.getWinningCombo(board) };
        }

        if (this.isBoardFull(board)) {
            return { status: 'draw' };
        }

        return { status: 'ongoing' };
    }

    /**
     * Count empty cells
     */
    getEmptyCells(board) {
        const empty = [];
        board.forEach((cell, index) => {
            if (cell === null) {
                empty.push(index);
            }
        });
        return empty;
    }
}
