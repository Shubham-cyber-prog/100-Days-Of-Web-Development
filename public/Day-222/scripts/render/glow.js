/**
 * Glow Renderer
 * Bloom and light-scattering effects for celestial bodies
 */

export class GlowRenderer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    render(bodies) {
        // Clear glow canvas
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        bodies.forEach(body => {
            // Create radial gradient for glow effect
            const gradient = this.ctx.createRadialGradient(
                body.position.x, body.position.y, 0,
                body.position.x, body.position.y, body.radius * 4
            );

            // Extract RGB from hex color
            const rgb = this.hexToRgb(body.color);

            gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
            gradient.addColorStop(0.3, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
            gradient.addColorStop(0.6, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
            gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(
                body.position.x,
                body.position.y,
                body.radius * 4,
                0,
                Math.PI * 2
            );
            this.ctx.fill();

            // Add extra bright core
            const coreGradient = this.ctx.createRadialGradient(
                body.position.x, body.position.y, 0,
                body.position.x, body.position.y, body.radius * 1.5
            );

            coreGradient.addColorStop(0, `rgba(255, 255, 255, 0.9)`);
            coreGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
            coreGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

            this.ctx.fillStyle = coreGradient;
            this.ctx.beginPath();
            this.ctx.arc(
                body.position.x,
                body.position.y,
                body.radius * 1.5,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }
}
