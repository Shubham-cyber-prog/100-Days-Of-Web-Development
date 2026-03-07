/**
 * Match Validation and Scoring Logic
 */

export class MatchValidator {
    constructor() {
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 0;
        this.moves = 0;
        this.isProcessing = false;
    }

    /**
     * Initialize for a new game
     */
    init(totalPairs) {
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = totalPairs;
        this.moves = 0;
        this.isProcessing = false;
    }

    /**
     * Handle card flip attempt
     * Returns { canFlip, shouldCheck }
     */
    handleCardFlip(cardElement) {
        // Can't flip if processing or already flipped/matched
        if (this.isProcessing) return { canFlip: false };
        if (cardElement.classList.contains('flipped')) return { canFlip: false };
        if (cardElement.classList.contains('matched')) return { canFlip: false };

        // Flip the card
        cardElement.classList.add('flipped');
        this.flippedCards.push(cardElement);

        // Check if we have two cards to compare
        if (this.flippedCards.length === 2) {
            this.moves++;
            this.isProcessing = true;
            return { canFlip: true, shouldCheck: true };
        }

        return { canFlip: true, shouldCheck: false };
    }

    /**
     * Check if two flipped cards match
     * Returns { isMatch, isComplete }
     */
    checkMatch() {
        if (this.flippedCards.length !== 2) {
            return { isMatch: false };
        }

        const [card1, card2] = this.flippedCards;
        const pairId1 = card1.dataset.pairId;
        const pairId2 = card2.dataset.pairId;
        const uniqueId1 = card1.dataset.uniqueId;
        const uniqueId2 = card2.dataset.uniqueId;

        // Same pair but different unique IDs
        const isMatch = pairId1 === pairId2 && uniqueId1 !== uniqueId2;

        if (isMatch) {
            this.matchedPairs++;
            card1.classList.add('matched');
            card2.classList.add('matched');
        } else {
            // Add wrong class for shake animation
            card1.classList.add('wrong');
            card2.classList.add('wrong');
        }

        const isComplete = this.matchedPairs === this.totalPairs;

        return { isMatch, isComplete };
    }

    /**
     * Reset flipped cards (for non-matches)
     */
    resetFlipped() {
        this.flippedCards.forEach(card => {
            card.classList.remove('flipped', 'wrong');
        });
        this.flippedCards = [];
        this.isProcessing = false;
    }

    /**
     * Clear state for matched cards
     */
    clearMatched() {
        this.flippedCards = [];
        this.isProcessing = false;
    }

    /**
     * Get current game statistics
     */
    getStats() {
        return {
            moves: this.moves,
            matched: this.matchedPairs,
            total: this.totalPairs,
            accuracy: this.moves === 0 ? 100 : Math.round((this.matchedPairs / this.moves) * 100)
        };
    }
}
