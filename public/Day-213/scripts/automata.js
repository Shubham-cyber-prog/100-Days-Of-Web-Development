class CellularAutomata {
    constructor(width, height, fillProbability = 0.45) {
        this.width = width;
        this.height = height;
        this.grid = this.createEmptyGrid();
        this.fillProbability = fillProbability;
    }

    createEmptyGrid() {
        return Array.from({ length: this.height }, () => new Int8Array(this.width));
    }

    randomize(seed) {
        // Simple seeded LCG if needed, or just use Math.random
        // For studio, we might want reproducibility
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
                    this.grid[y][x] = 1; // Walls on boundaries
                } else {
                    this.grid[y][x] = Math.random() < this.fillProbability ? 1 : 0;
                }
            }
        }
    }

    step(birthThreshold = 4, deathThreshold = 4) {
        const newGrid = this.createEmptyGrid();

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const neighbors = this.countNeighbors(x, y);

                if (this.grid[y][x] === 1) {
                    newGrid[y][x] = neighbors >= deathThreshold ? 1 : 0;
                } else {
                    newGrid[y][x] = neighbors >= birthThreshold ? 1 : 0;
                }

                // Keep borders constant
                if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
                    newGrid[y][x] = 1;
                }
            }
        }

        this.grid = newGrid;
    }

    countNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const nx = x + i;
                const ny = y + j;

                if (nx < 0 || ny < 0 || nx >= this.width || ny >= this.height) {
                    count++;
                } else {
                    count += this.grid[ny][nx];
                }
            }
        }
        return count;
    }

    generate(iterations = 5) {
        this.randomize();
        for (let i = 0; i < iterations; i++) {
            this.step();
        }
        return this.grid;
    }
}

window.CellularAutomata = CellularAutomata;
