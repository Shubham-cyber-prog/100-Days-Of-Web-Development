/**
 * Volatility Surface 3D Renderer
 * Maps implied volatility against Strike (K) and Time (T).
 */

export class VolSurfaceRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.angle = 0.5;
        this.setup();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    render(data) {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        const rows = data.length;
        const cols = data[0].length;
        const padding = 50;

        // Simple Perspective Projection
        const project = (r, c, val) => {
            const x = (c / cols - 0.5) * 300;
            const y = (r / rows - 0.5) * 300;
            const z = val * 200;

            const rotX = x * Math.cos(this.angle) - y * Math.sin(this.angle);
            const rotY = x * Math.sin(this.angle) + y * Math.cos(this.angle);

            return {
                px: width / 2 + rotX,
                py: height / 2 + rotY * 0.5 - z
            };
        };

        ctx.strokeStyle = '#58a6ff';
        ctx.lineWidth = 1;

        for (let r = 0; r < rows - 1; r++) {
            for (let c = 0; c < cols - 1; c++) {
                const p1 = project(r, c, data[r][c]);
                const p2 = project(r, c + 1, data[r][c + 1]);
                const p3 = project(r + 1, c, data[r + 1][c]);

                ctx.beginPath();
                ctx.moveTo(p1.px, p1.py);
                ctx.lineTo(p2.px, p2.py);
                ctx.lineTo(p3.px, p3.py);
                ctx.stroke();
            }
        }
    }
}

export const surface = new VolSurfaceRenderer('surface-canvas');
