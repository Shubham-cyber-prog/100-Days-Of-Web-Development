/**
 * Particle Renderer
 * High-performance canvas rendering for fluid particles.
 */

export class ParticleRenderer {
    constructor() {
        this.canvas = document.getElementById('sim-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.setup();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;

        window.addEventListener('sim-tick', (e) => {
            this.draw(e.detail.particles);
        });
    }

    draw(particles) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Batch rendering for performance
        ctx.fillStyle = '#58a6ff';
        particles.forEach(p => {
            // Velocity-based color shift
            const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            const hue = 210 + Math.min(vel * 10, 50);
            ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.6)`;

            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

new ParticleRenderer();
