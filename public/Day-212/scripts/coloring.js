/**
 * Fractal Coloring Algorithms
 */

class ColoringSystem {
    constructor() {
        this.palettes = {
            ultra: [
                { offset: 0, color: [0, 7, 100] },
                { offset: 0.16, color: [32, 107, 203] },
                { offset: 0.42, color: [237, 255, 255] },
                { offset: 0.642, color: [255, 170, 0] },
                { offset: 0.857, color: [0, 2, 0] }
            ],
            fire: [
                { offset: 0, color: [0, 0, 0] },
                { offset: 0.5, color: [255, 0, 0] },
                { offset: 0.8, color: [255, 255, 0] },
                { offset: 1, color: [255, 255, 255] }
            ],
            neon: [
                { offset: 0, color: [0, 0, 0] },
                { offset: 0.3, color: [255, 0, 255] },
                { offset: 0.6, color: [0, 255, 255] },
                { offset: 1, color: [255, 255, 255] }
            ],
            ice: [
                { offset: 0, color: [0, 0, 50] },
                { offset: 0.5, color: [100, 150, 255] },
                { offset: 1, color: [255, 255, 255] }
            ],
            forest: [
                { offset: 0, color: [0, 20, 0] },
                { offset: 0.4, color: [34, 139, 34] },
                { offset: 0.8, color: [255, 255, 0] },
                { offset: 1, color: [255, 255, 255] }
            ],
            deepsea: [
                { offset: 0, color: [0, 0, 20] },
                { offset: 0.3, color: [0, 105, 148] },
                { offset: 0.7, color: [144, 238, 144] },
                { offset: 1, color: [255, 255, 255] }
            ]
        };
        this.currentPalette = 'ultra';
    }

    getColor(iter, maxIter, orbit = 0) {
        if (iter === -1) return [0, 0, 0];

        // Combine escape time with orbit trap for complex effects
        const palette = this.palettes[this.currentPalette];
        let t = (iter % 100) / 100;

        // Apply orbit trap influence if provided (pseudo-effect)
        if (orbit > 0) {
            t = (t + orbit) % 1;
        }

        for (let i = 0; i < palette.length - 1; i++) {
            const p1 = palette[i];
            const p2 = palette[i + 1];

            if (t >= p1.offset && t <= p2.offset) {
                const factor = (t - p1.offset) / (p2.offset - p1.offset);
                return [
                    Math.round(p1.color[0] + factor * (p2.color[0] - p1.color[0])),
                    Math.round(p1.color[1] + factor * (p2.color[1] - p1.color[1])),
                    Math.round(p1.color[2] + factor * (p2.color[2] - p1.color[2]))
                ];
            }
        }

        return palette[palette.length - 1].color;
    }

    setPalette(name) {
        if (this.palettes[name]) {
            this.currentPalette = name;
        }
    }
}

window.ColoringSystem = ColoringSystem;
