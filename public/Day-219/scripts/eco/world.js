/**
 * Ecosystem World: Nutrient distribution and mapping
 */

class World {
    constructor(width, height, tileSize = 20) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.cols = Math.ceil(width / tileSize);
        this.rows = Math.ceil(height / tileSize);

        // Nutrients (Phosphorus/Nitrogen abstraction)
        this.nutrients = new Float32Array(this.cols * this.rows);
        this.regenRate = 0.005;
        this.maxNutrients = 10.0;

        this.init();
    }

    init() {
        for (let i = 0; i < this.nutrients.length; i++) {
            this.nutrients[i] = Math.random() * this.maxNutrients;
        }
    }

    getNutrientsAt(x, y) {
        const c = Math.floor(x / this.tileSize);
        const r = Math.floor(y / this.tileSize);
        if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
            return this.nutrients[r * this.cols + c];
        }
        return 0;
    }

    consumeAt(x, y, amount) {
        const c = Math.floor(x / this.tileSize);
        const r = Math.floor(y / this.tileSize);
        const idx = r * this.cols + c;
        if (idx >= 0 && idx < this.nutrients.length) {
            const actual = Math.min(this.nutrients[idx], amount);
            this.nutrients[idx] -= actual;
            return actual;
        }
        return 0;
    }

    update() {
        // Regenerate nutrients
        for (let i = 0; i < this.nutrients.length; i++) {
            if (this.nutrients[i] < this.maxNutrients) {
                this.nutrients[i] += this.regenRate;
            }
        }
    }

    draw(ctx, mode = 'standard') {
        const ts = this.tileSize;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const val = this.nutrients[r * this.cols + c];
                const intensity = val / this.maxNutrients;

                if (mode === 'standard') {
                    ctx.fillStyle = `rgba(34, 197, 94, ${intensity * 0.2})`; // Greenish
                } else if (mode === 'thermal') {
                    // Phosphorus Heatmap
                    ctx.fillStyle = `rgba(251, 191, 36, ${intensity * 0.5})`; // Amber/Goldish
                }

                ctx.fillRect(c * ts, r * ts, ts, ts);
            }
        }
    }
}

window.World = World;
