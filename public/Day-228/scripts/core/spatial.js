/**
 * Spatial Hash Grid for SPH
 * Optimized O(1) broadphase neighbor discovery.
 */

export class SpatialHash {
    constructor(cellSize) {
        this.cellSize = cellSize;
        this.grid = new Map();
    }

    clear() {
        this.grid.clear();
    }

    key(x, y) {
        const gx = Math.floor(x / this.cellSize);
        const gy = Math.floor(y / this.cellSize);
        return `${gx},${gy}`;
    }

    insert(particle) {
        const k = this.key(particle.x, particle.y);
        if (!this.grid.has(k)) {
            this.grid.set(k, []);
        }
        this.grid.get(k).push(particle);
    }

    getNeighbors(particle, h) {
        const neighbors = [];
        const gx = Math.floor(particle.x / this.cellSize);
        const gy = Math.floor(particle.y / this.cellSize);
        const range = Math.ceil(h / this.cellSize);

        for (let dx = -range; dx <= range; dx++) {
            for (let dy = -range; dy <= range; dy++) {
                const k = `${gx + dx},${gy + dy}`;
                const particles = this.grid.get(k);
                if (particles) {
                    for (const p of particles) {
                        if (p === particle) continue;
                        const distSq = (p.x - particle.x) ** 2 + (p.y - particle.y) ** 2;
                        if (distSq < h * h) {
                            neighbors.push(p);
                        }
                    }
                }
            }
        }
        return neighbors;
    }
}
