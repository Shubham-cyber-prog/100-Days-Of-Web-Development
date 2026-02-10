/**
 * Game History - Move tracking and replay
 */

export class GameHistory {
    constructor() {
        this.moves = [];
        this.boardStates = [];
    }

    /**
     * Record a move
     */
    recordMove(player, position, boardState) {
        this.moves.push({
            player,
            position,
            timestamp: Date.now()
        });

        // Deep copy board state
        this.boardStates.push([...boardState]);
    }

    /**
     * Undo last move
     * Returns the previous board state
     */
    undoLastMove() {
        if (this.moves.length === 0) return null;

        this.moves.pop();
        this.boardStates.pop();

        // Return previous state (or empty board if no moves left)
        if (this.boardStates.length === 0) {
            return Array(9).fill(null);
        }

        return [...this.boardStates[this.boardStates.length - 1]];
    }

    /**
     * Get move count
     */
    getMoveCount() {
        return this.moves.length;
    }

    /**
     * Get last move
     */
    getLastMove() {
        return this.moves[this.moves.length - 1] || null;
    }

    /**
     * Get all moves
     */
    getAllMoves() {
        return this.moves;
    }

    /**
     * Clear history
     */
    clear() {
        this.moves = [];
        this.boardStates = [];
    }

    /**
     * Export history to JSON
     */
    export() {
        return JSON.stringify({
            moves: this.moves,
            boardStates: this.boardStates
        });
    }

    /**
     * Import history from JSON
     */
    import(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.moves = data.moves || [];
            this.boardStates = data.boardStates || [];
            return true;
        } catch (error) {
            console.error('Failed to import history:', error);
            return false;
        }
    }

    /**
     * Get formatted move list for display
     */
    getFormattedMoves() {
        return this.moves.map((move, index) => {
            const position = this.getPositionLabel(move.position);
            return {
                number: index + 1,
                player: move.player,
                position: position,
                timestamp: move.timestamp
            };
        });
    }

    /**
     * Convert position index to readable label
     */
    getPositionLabel(index) {
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        return `R${row}C${col}`;
    }

    /**
     * Can undo?
     */
    canUndo() {
        return this.moves.length > 0;
    }
}
