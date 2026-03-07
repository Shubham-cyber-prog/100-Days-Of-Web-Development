/**
 * High-Performance Fluid Renderer
 * Metaball effect using Canvas blurring or Particle points
 */

class FluidRenderer {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.config = {
            metaball: true,
            heatmap: false,
            vectors: false
        };
    }

    render(particles, obstacles) {
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (this.config.metaball) {
            this.renderMetaballs(particles);
        } else {
            this.renderSimple(particles);
        }

        if (this.config.vectors) {
            this.renderVectors(particles);
        }

        this.renderObstacles(obstacles);
    }

    renderSimple(particles) {
        this.ctx.fillStyle = '#00d2ff';
        for (const p of particles) {
            const color = this.config.heatmap ? this.getHeatmapColor(p.rho) : '#00d2ff';
            this.ctx.fillStyle = color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    renderMetaballs(particles) {
        this.ctx.save();
        this.ctx.filter = 'blur(12px) contrast(200%)';

        for (const p of particles) {
            this.ctx.fillStyle = this.config.heatmap ? this.getHeatmapColor(p.rho) : '#00d2ff';
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 14, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    renderVectors(particles) {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        for (const p of particles) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.x + p.vx * 0.1, p.y + p.vy * 0.1);
            this.ctx.stroke();
        }
    }

    renderObstacles(obstacles) {
        this.ctx.fillStyle = '#1e293b';
        this.ctx.strokeStyle = '#38bdf8';
        this.ctx.lineWidth = 2;

        for (const ob of obstacles) {
            if (ob.type === 'box') {
                this.ctx.fillRect(ob.x, ob.y, ob.w, ob.h);
                this.ctx.strokeRect(ob.x, ob.y, ob.w, ob.h);
            } else if (ob.type === 'circle') {
                this.ctx.beginPath();
                this.ctx.arc(ob.x, ob.y, ob.r, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
            }
        }
    }

    getHeatmapColor(density) {
        // Red = high density/pressure, Blue = low
        const t = Math.min(density / 10, 1.0);
        const r = Math.floor(t * 255);
        const b = Math.floor((1 - t) * 255);
        return `rgb(${r}, 100, ${b})`;
    }
}
