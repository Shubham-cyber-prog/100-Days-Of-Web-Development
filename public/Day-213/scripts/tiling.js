class TileMapper {
    /**
     * Bitmasking for auto-tiling
     * Neighbors order: Top, Right, Bottom, Left
     */
    static getTileMask(grid, x, y, targetValue) {
        let mask = 0;
        const width = grid[0].length;
        const height = grid.length;

        // Top
        if (y > 0 && grid[y - 1][x] === targetValue) mask |= 1;
        // Right
        if (x < width - 1 && grid[y][x + 1] === targetValue) mask |= 2;
        // Bottom
        if (y < height - 1 && grid[y + 1][x] === targetValue) mask |= 4;
        // Left
        if (x > 0 && grid[y][x - 1] === targetValue) mask |= 8;

        return mask;
    }

    /**
     * Map a bitmask (0-15) to a tile offset or style
     */
    static getTileFromMask(mask) {
        // This would return specific coordinates in a sprite sheet
        // For now, let's return a name that we can use for styling
        const masks = {
            0: 'isolated',
            1: 'top-only',
            2: 'right-only',
            3: 'top-right',
            4: 'bottom-only',
            5: 'top-bottom',
            6: 'bottom-right',
            7: 'top-bottom-right',
            8: 'left-only',
            9: 'top-left',
            10: 'left-right',
            11: 'top-left-right',
            12: 'bottom-left',
            13: 'top-bottom-left',
            14: 'bottom-left-right',
            15: 'full'
        };
        return masks[mask];
    }
}

window.TileMapper = TileMapper;
