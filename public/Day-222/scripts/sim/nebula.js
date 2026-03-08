/**
 * Procedural Nebula Generator
 * Gas-cloud density field using Perlin noise
 */

export class NebulaGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.scale = 0.005;
        this.octaves = 4;
        this.persistence = 0.5;
    }

    /**
     * Simple Perlin-like noise implementation
     * For production, consider using a proper Perlin/Simplex noise library
     */
    noise(x, y) {
        const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        return n - Math.floor(n);
    }

    /**
     * Interpolated noise
     */
    smoothNoise(x, y) {
        const intX = Math.floor(x);
        const intY = Math.floor(y);
        const fracX = x - intX;
        const fracY = y - intY;

        const v1 = this.noise(intX, intY);
        const v2 = this.noise(intX + 1, intY);
        const v3 = this.noise(intX, intY + 1);
        const v4 = this.noise(intX + 1, intY + 1);

        const i1 = this.interpolate(v1, v2, fracX);
        const i2 = this.interpolate(v3, v4, fracX);

        return this.interpolate(i1, i2, fracY);
    }

    interpolate(a, b, t) {
        const ft = t * Math.PI;
        const f = (1 - Math.cos(ft)) * 0.5;
        return a * (1 - f) + b * f;
    }

    /**
     * Multi-octave noise (fractal Brownian motion)
     */
    fbm(x, y) {
        let total = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;

        for (let i = 0; i < this.octaves; i++) {
            total += this.smoothNoise(x * frequency, y * frequency) * amplitude;
            maxValue += amplitude;
            amplitude *= this.persistence;
            frequency *= 2;
        }

        return total / maxValue;
    }

    /**
     * Generate nebula density field
     */
    generate() {
        const densityField = [];

        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                const density = this.fbm(x * this.scale, y * this.scale);
                row.push(density);
            }
            densityField.push(row);
        }

        return densityField;
    }

    /**
     * Render nebula to canvas
     */
    render(ctx, colorScheme = 'blue') {
        const densityField = this.generate();
        const imageData = ctx.createImageData(this.width, this.height);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const density = densityField[y][x];
                const index = (y * this.width + x) * 4;

                // Color based on density
                let r, g, b;
                switch (colorScheme) {
                    case 'blue':
                        r = density * 50;
                        g = density * 100;
                        b = density * 200;
                        break;
                    case 'purple':
                        r = density * 150;
                        g = density * 50;
                        b = density * 200;
                        break;
                    case 'orange':
                        r = density * 255;
                        g = density * 150;
                        b = density * 50;
                        break;
                    default:
                        r = g = b = density * 100;
                }

                imageData.data[index] = r;
                imageData.data[index + 1] = g;
                imageData.data[index + 2] = b;
                imageData.data[index + 3] = density * 100; // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }
}
