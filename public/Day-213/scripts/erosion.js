class ErosionSimulator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // A simple thermal erosion/smoothing algorithm
    thermalErosion(grid, iterations = 1, talus = 0.01) {
        let currentGrid = grid.map(row => new Float32Array(row));

        for (let iter = 0; iter < iterations; iter++) {
            const nextGrid = currentGrid.map(row => new Float32Array(row));

            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const h = currentGrid[y][x];

                    // Check neighbors
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;

                            const nx = x + dx;
                            const ny = y + dy;

                            if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                                const nh = currentGrid[ny][nx];
                                const diff = h - nh;

                                if (diff > talus) {
                                    const move = diff * 0.1;
                                    nextGrid[y][x] -= move;
                                    nextGrid[ny][nx] += move;
                                }
                            }
                        }
                    }
                }
            }
            currentGrid = nextGrid;
        }
        return currentGrid;
    }

    // Hydraulic erosion is much more complex, let's stick to a simpler version
    // for this tool or just implement a particle-based approach if requested.
    // Let's do a simple Laplacian smoothing which acts as basic erosion.
    smooth(grid, iterations = 1) {
        let currentGrid = grid.map(row => new Float32Array(row));

        for (let iter = 0; iter < iterations; iter++) {
            const nextGrid = currentGrid.map(row => new Float32Array(row));

            for (let y = 1; y < this.height - 1; y++) {
                for (let x = 1; x < this.width - 1; x++) {
                    let sum = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            sum += currentGrid[y + dy][x + dx];
                        }
                    }
                    nextGrid[y][x] = sum / 9;
                }
            }
            currentGrid = nextGrid;
        }
        return currentGrid;
    }

    carveRivers(grid, count = 3) {
        const heightMap = grid.map(row => new Float32Array(row));

        for (let i = 0; i < count; i++) {
            // Find a high point
            let x = Math.floor(Math.random() * this.width);
            let y = Math.floor(Math.random() * this.height);

            // Step downwards
            for (let step = 0; step < 200; step++) {
                heightMap[y][x] -= 0.05; // Carve

                let lowestH = heightMap[y][x];
                let nextX = x, nextY = y;

                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nx = x + dx, ny = y + dy;
                        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                            if (heightMap[ny][nx] < lowestH) {
                                lowestH = heightMap[ny][nx];
                                nextX = nx;
                                nextY = ny;
                            }
                        }
                    }
                }

                if (nextX === x && nextY === y) break; // Trapped in a hole
                x = nextX;
                y = nextY;

                if (heightMap[y][x] < 0.3) break; // Reached ocean
            }
        }
        return heightMap;
    }
}

window.ErosionSimulator = ErosionSimulator;
