/**
 * Swap, Fall, and Match Effect Animations
 */

export class AnimationManager {
    constructor(boardElement) {
        this.boardElement = boardElement;
        this.animationQueue = [];
    }

    /**
     * Animate tile swap
     */
    async animateSwap(tile1, tile2) {
        return new Promise((resolve) => {
            const el1 = tile1.element;
            const el2 = tile2.element;

            if (!el1 || !el2) {
                resolve();
                return;
            }

            const rect1 = el1.getBoundingClientRect();
            const rect2 = el2.getBoundingClientRect();

            const dx = rect2.left - rect1.left;
            const dy = rect2.top - rect1.top;

            el1.style.setProperty('--swap-x', `${dx}px`);
            el1.style.setProperty('--swap-y', `${dy}px`);
            el2.style.setProperty('--swap-x', `${-dx}px`);
            el2.style.setProperty('--swap-y', `${-dy}px`);

            el1.classList.add('swapping');
            el2.classList.add('swapping');

            setTimeout(() => {
                el1.classList.remove('swapping');
                el2.classList.remove('swapping');
                el1.style.removeProperty('--swap-x');
                el1.style.removeProperty('--swap-y');
                el2.style.removeProperty('--swap-x');
                el2.style.removeProperty('--swap-y');
                resolve();
            }, 300);
        });
    }

    /**
     * Animate tiles falling
     */
    async animateFall(tiles) {
        return new Promise((resolve) => {
            if (tiles.length === 0) {
                resolve();
                return;
            }

            tiles.forEach(tile => {
                if (tile.element) {
                    tile.element.classList.add('falling');
                }
            });

            setTimeout(() => {
                tiles.forEach(tile => {
                    if (tile.element) {
                        tile.element.classList.remove('falling');
                    }
                });
                resolve();
            }, 400);
        });
    }

    /**
     * Animate matched tiles disappearing
     */
    async animateMatch(tiles) {
        return new Promise((resolve) => {
            if (tiles.length === 0) {
                resolve();
                return;
            }

            tiles.forEach(tile => {
                if (tile.element) {
                    tile.element.classList.add('matching');
                }
            });

            setTimeout(() => {
                tiles.forEach(tile => {
                    tile.remove();
                });
                resolve();
            }, 400);
        });
    }

    /**
     * Animate special tile explosion
     */
    async animateExplosion(tiles, centerX, centerY) {
        return new Promise((resolve) => {
            // Create particles
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = `${centerX}px`;
                particle.style.top = `${centerY}px`;
                particle.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`;

                const angle = (Math.PI * 2 * i) / 20;
                const distance = 50 + Math.random() * 50;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                particle.style.setProperty('--particle-x', `${tx}px`);
                particle.style.setProperty('--particle-y', `${ty}px`);

                this.boardElement.parentElement.appendChild(particle);

                setTimeout(() => particle.remove(), 600);
            }

            // Animate tiles
            tiles.forEach(tile => {
                if (tile.element) {
                    tile.element.classList.add('exploding');
                }
            });

            setTimeout(() => {
                tiles.forEach(tile => {
                    tile.remove();
                });
                resolve();
            }, 500);
        });
    }

    /**
     * Show combo text
     */
    showCombo(combo, x, y) {
        const comboText = document.createElement('div');
        comboText.className = 'combo-text';
        comboText.textContent = `${combo}x COMBO!`;
        comboText.style.left = `${x}px`;
        comboText.style.top = `${y}px`;

        this.boardElement.parentElement.appendChild(comboText);

        setTimeout(() => comboText.remove(), 1000);
    }

    /**
     * Show score popup
     */
    showScorePopup(score, x, y) {
        const scorePopup = document.createElement('div');
        scorePopup.className = 'score-popup';
        scorePopup.textContent = `+${score}`;
        scorePopup.style.left = `${x}px`;
        scorePopup.style.top = `${y}px`;

        this.boardElement.parentElement.appendChild(scorePopup);

        setTimeout(() => scorePopup.remove(), 1000);
    }

    /**
     * Shake board
     */
    shakeBoard() {
        this.boardElement.classList.add('shaking');
        setTimeout(() => {
            this.boardElement.classList.remove('shaking');
        }, 300);
    }

    /**
     * Add shimmer effect to tile
     */
    addShimmer(tile) {
        if (tile.element) {
            tile.element.classList.add('shimmer');
            setTimeout(() => {
                if (tile.element) {
                    tile.element.classList.remove('shimmer');
                }
            }, 2000);
        }
    }
}
