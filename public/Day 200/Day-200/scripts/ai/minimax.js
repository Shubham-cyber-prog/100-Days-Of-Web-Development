/**
 * Minimax Algorithm Implementation
 * Provides optimal move calculation with alpha-beta pruning
 */

import { BoardEvaluator } from '../core/boardEvaluator.js';

export class MinimaxAI {
    constructor(difficulty = 'hard') {
        this.difficulty = difficulty;
        this.maxDepth = this.getMaxDepth(difficulty);
        this.evaluator = new BoardEvaluator();
    }

    /**
     * Get depth limit based on difficulty
     */
    getMaxDepth(difficulty) {
        switch (difficulty) {
            case 'easy': return 0; // Random moves
            case 'medium': return 3; // Limited depth
            case 'hard': return 9; // Full depth (unbeatable)
            default: return 9;
        }
    }

    /**
     * Get best move for AI
     */
    getBestMove(board, player) {
        if (this.difficulty === 'easy') {
            return this.getRandomMove(board);
        }

        const opponent = player === 'X' ? 'O' : 'X';
        let bestScore = -Infinity;
        let bestMove = null;

        // Try all possible moves
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = player; // Make move

                const score = this.minimax(board, 0, false, player, opponent, -Infinity, Infinity);

                board[i] = null; // Undo move

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    /**
     * Minimax algorithm with alpha-beta pruning
     * @param {Array} board - Current board state
     * @param {number} depth - Current depth in game tree
     * @param {boolean} isMaximizing - Is this AI's turn?
     * @param {string} aiPlayer - AI player symbol
     * @param {string} humanPlayer - Human player symbol
     * @param {number} alpha - Alpha value for pruning
     * @param {number} beta - Beta value for pruning
     */
    minimax(board, depth, isMaximizing, aiPlayer, humanPlayer, alpha, beta) {
        // Check terminal states
        const winner = this.evaluator.checkWinner(board);

        if (winner === aiPlayer) return 10 - depth; // AI wins (prefer faster wins)
        if (winner === humanPlayer) return depth - 10; // Human wins (prefer slower losses)
        if (this.evaluator.isBoardFull(board)) return 0; // Draw

        // Depth limit for medium difficulty
        if (this.difficulty === 'medium' && depth >= this.maxDepth) {
            return this.evaluatePosition(board, aiPlayer, humanPlayer);
        }

        if (isMaximizing) {
            // AI's turn - maximize score
            let maxScore = -Infinity;

            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = aiPlayer;
                    const score = this.minimax(board, depth + 1, false, aiPlayer, humanPlayer, alpha, beta);
                    board[i] = null;

                    maxScore = Math.max(score, maxScore);
                    alpha = Math.max(alpha, score);

                    // Alpha-beta pruning
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return maxScore;
        } else {
            // Human's turn - minimize score
            let minScore = Infinity;

            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = humanPlayer;
                    const score = this.minimax(board, depth + 1, true, aiPlayer, humanPlayer, alpha, beta);
                    board[i] = null;

                    minScore = Math.min(score, minScore);
                    beta = Math.min(beta, score);

                    // Alpha-beta pruning
                    if (beta <= alpha) {
                        break;
                    }
                }
            }
            return minScore;
        }
    }

    /**
     * Evaluate position heuristically (for medium difficulty)
     */
    evaluatePosition(board, aiPlayer, humanPlayer) {
        let score = 0;

        // Check all winning combinations
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        lines.forEach(line => {
            const [a, b, c] = line;
            const lineScore = this.evaluateLine(board[a], board[b], board[c], aiPlayer, humanPlayer);
            score += lineScore;
        });

        return score;
    }

    /**
     * Evaluate a single line
     */
    evaluateLine(pos1, pos2, pos3, aiPlayer, humanPlayer) {
        let score = 0;

        const aiCount = [pos1, pos2, pos3].filter(p => p === aiPlayer).length;
        const humanCount = [pos1, pos2, pos3].filter(p => p === humanPlayer).length;
        const emptyCount = [pos1, pos2, pos3].filter(p => p === null).length;

        // AI has pieces in this line
        if (aiCount > 0 && humanCount === 0) {
            if (aiCount === 2) score += 5; // Two in a row
            else if (aiCount === 1) score += 1; // One in a row
        }

        // Human has pieces in this line
        if (humanCount > 0 && aiCount === 0) {
            if (humanCount === 2) score -= 5; // Block opponent
            else if (humanCount === 1) score -= 1;
        }

        return score;
    }

    /**
     * Get random valid move (for easy difficulty)
     */
    getRandomMove(board) {
        const availableMoves = [];
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                availableMoves.push(i);
            }
        }

        if (availableMoves.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        return availableMoves[randomIndex];
    }

    /**
     * Change difficulty
     */
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        this.maxDepth = this.getMaxDepth(difficulty);
    }
}
