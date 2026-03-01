/**
 * Tile Types and Special Tiles
 */

export const TILE_TYPES = {
    NORMAL: 'normal',
    BOMB: 'bomb',
    LIGHTNING: 'lightning'
};

export const TILE_ICONS = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];

export class Tile {
    constructor(row, col, type, tileType = TILE_TYPES.NORMAL) {
        this.row = row;
        this.col = col;
        this.type = type; // 0-5 for normal tiles
        this.tileType = tileType;
        this.element = null;
        this.isMatched = false;
        this.isFalling = false;
    }

    /**
     * Create DOM element for tile
     */
    createElement() {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.row = this.row;
        tile.dataset.col = this.col;
        tile.dataset.type = this.type;

        if (this.tileType === TILE_TYPES.BOMB) {
            tile.classList.add('bomb');
            tile.textContent = '💣';
        } else if (this.tileType === TILE_TYPES.LIGHTNING) {
            tile.classList.add('lightning');
            tile.textContent = '⚡';
        } else {
            tile.textContent = TILE_ICONS[this.type];
        }

        this.element = tile;
        return tile;
    }

    /**
     * Update tile position
     */
    updatePosition(row, col) {
        this.row = row;
        this.col = col;
        if (this.element) {
            this.element.dataset.row = row;
            this.element.dataset.col = col;
        }
    }

    /**
     * Mark as matched
     */
    match() {
        this.isMatched = true;
        if (this.element) {
            this.element.classList.add('matching');
        }
    }

    /**
     * Activate special tile
     * @returns {Array} - Tiles to destroy
     */
    activate(board) {
        const tilesToDestroy = [];

        if (this.tileType === TILE_TYPES.BOMB) {
            // Destroy 3x3 area
            for (let r = this.row - 1; r <= this.row + 1; r++) {
                for (let c = this.col - 1; c <= this.col + 1; c++) {
                    if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
                        if (board[r][c]) {
                            tilesToDestroy.push(board[r][c]);
                        }
                    }
                }
            }
        } else if (this.tileType === TILE_TYPES.LIGHTNING) {
            // Destroy entire row and column
            for (let c = 0; c < board[0].length; c++) {
                if (board[this.row][c]) {
                    tilesToDestroy.push(board[this.row][c]);
                }
            }
            for (let r = 0; r < board.length; r++) {
                if (board[r][this.col]) {
                    tilesToDestroy.push(board[r][this.col]);
                }
            }
        }

        return tilesToDestroy;
    }

    /**
     * Remove tile from DOM
     */
    remove() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

/**
 * Tile Factory
 */
export class TileFactory {
    /**
     * Create random normal tile
     */
    static createRandom(row, col, numTypes = 6) {
        const type = Math.floor(Math.random() * numTypes);
        return new Tile(row, col, type, TILE_TYPES.NORMAL);
    }

    /**
     * Create special tile based on match size
     */
    static createSpecial(row, col, type, matchSize) {
        if (matchSize === 4) {
            return new Tile(row, col, type, TILE_TYPES.BOMB);
        } else if (matchSize >= 5) {
            return new Tile(row, col, type, TILE_TYPES.LIGHTNING);
        }
        return new Tile(row, col, type, TILE_TYPES.NORMAL);
    }
}
