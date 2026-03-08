/**
 * Grid Management and Matching Logic
 */

import { Tile, TileFactory, TILE_TYPES } from './tiles.js';

export class Board {
    constructor(rows = 8, cols = 8, numTypes = 6) {
        this.rows = rows;
        this.cols = cols;
        this.numTypes = numTypes;
        this.grid = [];
        this.selectedTile = null;
    }

    /**
     * Initialize board with random tiles (no initial matches)
     */
    initialize() {
        this.grid = [];

        for (let r = 0; r < this.rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < this.cols; c++) {
                let tile;
                let attempts = 0;

                do {
                    tile = TileFactory.createRandom(r, c, this.numTypes);
                    attempts++;
                } while (this.wouldCreateMatch(r, c, tile.type) && attempts < 100);

                this.grid[r][c] = tile;
            }
        }
    }

    /**
     * Check if placing a tile would create a match
     */
    wouldCreateMatch(row, col, type) {
        // Check horizontal
        let horizontalCount = 1;
        // Check left
        for (let c = col - 1; c >= 0 && this.grid[row][c] && this.grid[row][c].type === type; c--) {
            horizontalCount++;
        }
        // Check right
        for (let c = col + 1; c < this.cols && this.grid[row][c] && this.grid[row][c].type === type; c++) {
            horizontalCount++;
        }

        if (horizontalCount >= 3) return true;

        // Check vertical
        let verticalCount = 1;
        // Check up
        for (let r = row - 1; r >= 0 && this.grid[r][col] && this.grid[r][col].type === type; r--) {
            verticalCount++;
        }
        // Check down
        for (let r = row + 1; r < this.rows && this.grid[r][col] && this.grid[r][col].type === type; r++) {
            verticalCount++;
        }

        return verticalCount >= 3;
    }

    /**
     * Swap two tiles
     */
    swap(tile1, tile2) {
        const tempRow = tile1.row;
        const tempCol = tile1.col;

        tile1.updatePosition(tile2.row, tile2.col);
        tile2.updatePosition(tempRow, tempCol);

        this.grid[tile1.row][tile1.col] = tile1;
        this.grid[tile2.row][tile2.col] = tile2;
    }

    /**
     * Check if swap is valid (adjacent tiles)
     */
    isValidSwap(tile1, tile2) {
        const rowDiff = Math.abs(tile1.row - tile2.row);
        const colDiff = Math.abs(tile1.col - tile2.col);

        return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
    }

    /**
     * Find all matches on the board
     * @returns {Array} - Array of match groups
     */
    findMatches() {
        const matches = [];
        const matched = Array(this.rows).fill(0).map(() => Array(this.cols).fill(false));

        // Find horizontal matches
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols - 2; c++) {
                const tile = this.grid[r][c];
                if (!tile || tile.tileType !== TILE_TYPES.NORMAL) continue;

                let matchLength = 1;
                let matchTiles = [tile];

                for (let i = c + 1; i < this.cols; i++) {
                    const nextTile = this.grid[r][i];
                    if (nextTile && nextTile.type === tile.type && nextTile.tileType === TILE_TYPES.NORMAL) {
                        matchLength++;
                        matchTiles.push(nextTile);
                    } else {
                        break;
                    }
                }

                if (matchLength >= 3) {
                    matches.push({ tiles: matchTiles, length: matchLength, direction: 'horizontal' });
                    matchTiles.forEach(t => matched[t.row][t.col] = true);
                }
            }
        }

        // Find vertical matches
        for (let c = 0; c < this.cols; c++) {
            for (let r = 0; r < this.rows - 2; r++) {
                const tile = this.grid[r][c];
                if (!tile || tile.tileType !== TILE_TYPES.NORMAL) continue;

                let matchLength = 1;
                let matchTiles = [tile];

                for (let i = r + 1; i < this.rows; i++) {
                    const nextTile = this.grid[i][c];
                    if (nextTile && nextTile.type === tile.type && nextTile.tileType === TILE_TYPES.NORMAL) {
                        matchLength++;
                        matchTiles.push(nextTile);
                    } else {
                        break;
                    }
                }

                if (matchLength >= 3) {
                    // Check if not already matched
                    if (!matched[matchTiles[0].row][matchTiles[0].col]) {
                        matches.push({ tiles: matchTiles, length: matchLength, direction: 'vertical' });
                        matchTiles.forEach(t => matched[t.row][t.col] = true);
                    }
                }
            }
        }

        return matches;
    }

    /**
     * Remove matched tiles and return special tile info
     */
    removeMatches(matches) {
        const specialTiles = [];

        matches.forEach(match => {
            match.tiles.forEach(tile => {
                tile.match();
                this.grid[tile.row][tile.col] = null;
            });

            // Create special tile for matches of 4+
            if (match.length >= 4) {
                const centerTile = match.tiles[Math.floor(match.length / 2)];
                specialTiles.push({
                    row: centerTile.row,
                    col: centerTile.col,
                    type: centerTile.type,
                    matchSize: match.length
                });
            }
        });

        return specialTiles;
    }

    /**
     * Apply gravity (tiles fall down)
     * @returns {boolean} - True if any tiles fell
     */
    applyGravity() {
        let tilesFell = false;

        for (let c = 0; c < this.cols; c++) {
            let emptyRow = this.rows - 1;

            for (let r = this.rows - 1; r >= 0; r--) {
                if (this.grid[r][c]) {
                    if (r !== emptyRow) {
                        this.grid[emptyRow][c] = this.grid[r][c];
                        this.grid[emptyRow][c].updatePosition(emptyRow, c);
                        this.grid[r][c] = null;
                        tilesFell = true;
                    }
                    emptyRow--;
                }
            }
        }

        return tilesFell;
    }

    /**
     * Fill empty spaces with new tiles
     * @returns {Array} - New tiles created
     */
    fillEmpty() {
        const newTiles = [];

        for (let c = 0; c < this.cols; c++) {
            for (let r = this.rows - 1; r >= 0; r--) {
                if (!this.grid[r][c]) {
                    const tile = TileFactory.createRandom(r, c, this.numTypes);
                    this.grid[r][c] = tile;
                    newTiles.push(tile);
                }
            }
        }

        return newTiles;
    }

    /**
     * Find possible moves
     * @returns {Array} - Array of possible swaps
     */
    findPossibleMoves() {
        const moves = [];

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = this.grid[r][c];
                if (!tile) continue;

                // Try swapping with right neighbor
                if (c < this.cols - 1) {
                    const neighbor = this.grid[r][c + 1];
                    if (neighbor) {
                        this.swap(tile, neighbor);
                        if (this.findMatches().length > 0) {
                            moves.push({ tile1: tile, tile2: neighbor });
                        }
                        this.swap(tile, neighbor); // Swap back
                    }
                }

                // Try swapping with bottom neighbor
                if (r < this.rows - 1) {
                    const neighbor = this.grid[r + 1][c];
                    if (neighbor) {
                        this.swap(tile, neighbor);
                        if (this.findMatches().length > 0) {
                            moves.push({ tile1: tile, tile2: neighbor });
                        }
                        this.swap(tile, neighbor); // Swap back
                    }
                }
            }
        }

        return moves;
    }

    /**
     * Shuffle board
     */
    shuffle() {
        const tiles = [];

        // Collect all tiles
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    tiles.push(this.grid[r][c].type);
                }
            }
        }

        // Shuffle array
        for (let i = tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
        }

        // Reassign tiles
        let index = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.grid[r][c]) {
                    this.grid[r][c].type = tiles[index];
                    index++;
                }
            }
        }
    }

    /**
     * Get tile at position
     */
    getTile(row, col) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            return this.grid[row][col];
        }
        return null;
    }
}
