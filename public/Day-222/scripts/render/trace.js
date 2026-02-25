/**
 * Orbital Trail Renderer
 * Long-exposure style path visualization for celestial bodies
 */

export class TrailRenderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.fadeRate = 0.02; // How quickly trails fade
    }

    render(bodies) {
        // Apply fade effect
        this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeRate})`;
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Draw trails for each body
        bodies.forEach(body => {
            if (body.trail.length < 2) return;

            this.ctx.strokeStyle = body.color;
            this.ctx.lineWidth = 1;
            this.ctx.globalAlpha = 0.6;

            // Draw trail with gradient opacity
            for (let i = 1; i < body.trail.length; i++) {
                const alpha = i / body.trail.length;
                this.ctx.globalAlpha = alpha * 0.6;

                this.ctx.beginPath();
                this.ctx.moveTo(body.trail[i - 1].x, body.trail[i - 1].y);
                this.ctx.lineTo(body.trail[i].x, body.trail[i].y);
                this.ctx.stroke();
            }

            this.ctx.globalAlpha = 1;
        });
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
