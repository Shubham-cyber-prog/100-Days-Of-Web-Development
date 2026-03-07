/**
 * Render Orchestration and Nebula Effects
 */

class UniverseRenderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.noise = new Noise(42);
    }

    drawNebula(camera) {
        // Draw multi-layered fbm noise for gas clouds
        // Optimized: Only draw when zoomed out enough to see the texture
        if (camera.zoom < 0.1) return;

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'screen';

        const res = 50;
        const w = this.canvas.width;
        const h = this.canvas.height;

        for (let x = 0; x < w; x += res) {
            for (let y = 0; y < h; y += res) {
                const world = camera.screenToWorld(x, y);
                const val = this.noise.fbm(world.x * 0.001, world.y * 0.001, 3);

                if (val > 0.4) {
                    const alpha = (val - 0.4) * 0.2;
                    this.ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`;
                    this.ctx.fillRect(x, y, res, res);
                }
            }
        }
        this.ctx.restore();
    }

    drawParallaxLayers(camera) {
        // Draw background star-field
        this.ctx.fillStyle = '#ffffff';
        const numStars = 200;
        const seed = 123;
        const rand = new Random(seed);

        for (let i = 0; i < numStars; i++) {
            const x = rand.next() * this.canvas.width;
            const y = rand.next() * this.canvas.height;
            const size = rand.next() * 1.5;

            // Fixed screen position but with slight movement for parallax
            const ox = (camera.x * 0.01) % this.canvas.width;
            const oy = (camera.y * 0.01) % this.canvas.height;

            this.ctx.beginPath();
            this.ctx.arc((x - ox + this.canvas.width) % this.canvas.width,
                (y - oy + this.canvas.height) % this.canvas.height,
                size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
}

window.UniverseRenderer = UniverseRenderer;
