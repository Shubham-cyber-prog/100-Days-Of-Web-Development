/**
 * Spatial Grid for Neighbor Searching
 * Optimizes neighbor search from O(n^2) to O(n)
 */

class SpatialGrid {
    constructor(width, height, cellSize) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cols = Math.ceil(width / cellSize);
        this.rows = Math.ceil(height / cellSize);
        this.grid = new Map();
    }

    update(particles) {
        this.grid.clear();
        for (const p of particles) {
            const gx = Math.floor(p.x / this.cellSize);
            const gy = Math.floor(p.y / this.cellSize);
            const key = `${gx},${gy}`;

            if (!this.grid.has(key)) {
                this.grid.set(key, []);
            }
            this.grid.get(key).push(p);
        }
    }

    getNeighbors(x, y, radius) {
        const gx = Math.floor(x / this.cellSize);
        const gy = Math.floor(y / this.cellSize);
        const neighbors = [];

        // Search 3x3 tiles around the particle
        for (let ix = -1; ix <= 1; ix++) {
            for (let iy = -1; iy <= 1; iy++) {
                const nx = gx + ix;
                const ny = gy + iy;
                if (nx < 0 || ny < 0 || nx >= this.cols || ny >= this.rows) continue;

                const key = `${nx},${ny}`;
                const cell = this.grid.get(key);
                if (cell) {
                    for (const p of cell) {
                        const dx = x - p.x;
                        const dy = y - p.y;
                        if (dx * dx + dy * dy < radius * radius) {
                            neighbors.push(p);
                        }
                    }
                }
            }
        }
        return neighbors;
    }
}
