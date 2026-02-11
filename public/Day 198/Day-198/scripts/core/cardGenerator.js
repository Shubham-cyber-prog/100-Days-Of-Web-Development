/**
 * Card Generator and Shuffling Logic
 */

import { getCardSet } from '../data/cardSets.js';

export class CardGenerator {
    /**
     * Fisher-Yates Shuffle Algorithm
     * Randomly shuffles array in-place
     */
    static shuffle(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Generate shuffled card deck for the game
     */
    static generateDeck(theme, difficulty) {
        const pairCounts = {
            easy: 8,
            medium: 12,
            hard: 16
        };

        const pairCount = pairCounts[difficulty] || 8;
        const cards = getCardSet(theme, pairCount);

        return this.shuffle(cards);
    }

    /**
     * Create HTML element for a card
     */
    static createCardElement(cardData) {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.pairId = cardData.pairId;
        card.dataset.uniqueId = cardData.uniqueId;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-back"></div>
                <div class="card-face card-front card-theme-${cardData.theme}">
                    <div class="card-content">${cardData.content}</div>
                    <div class="card-label">${cardData.label}</div>
                </div>
            </div>
        `;

        return card;
    }

    /**
     * Render all cards to the game board
     */
    static renderCards(boardElement, cards) {
        boardElement.innerHTML = '';
        cards.forEach(cardData => {
            const cardEl = this.createCardElement(cardData);
            boardElement.appendChild(cardEl);
        });
    }
}
