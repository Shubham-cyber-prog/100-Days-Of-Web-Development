/**
 * Option Analytics Charting
 * Renders payoff diagrams and stochastic path visualizations.
 */

export class ChartRenderer {
    constructor(payoffId, pathsId) {
        this.payoffCanvas = document.getElementById(payoffId);
        this.pathsCanvas = document.getElementById(pathsId);
        this.setup();
    }

    setup() {
        if (this.payoffCanvas) {
            const p = this.payoffCanvas.parentElement;
            this.payoffCanvas.width = p.clientWidth;
            this.payoffCanvas.height = p.clientHeight;
        }
        if (this.pathsCanvas) {
            const p = this.pathsCanvas.parentElement;
            this.pathsCanvas.width = p.clientWidth;
            this.pathsCanvas.height = p.clientHeight;
        }
    }

    renderPayoff(K, isCall = true) {
        const ctx = this.payoffCanvas.getContext('2d');
        const { width, height } = this.payoffCanvas;
        ctx.clearRect(0, 0, width, height);

        const margin = 40;
        const centerX = margin + (K / 200) * (width - 2 * margin);
        const centerY = height - margin;

        ctx.strokeStyle = '#3fb950';
        ctx.lineWidth = 3;
        ctx.beginPath();

        // Pre-strike
        ctx.moveTo(margin, centerY);
        ctx.lineTo(centerX, centerY);

        // Post-strike
        if (isCall) {
            ctx.lineTo(width - margin, margin);
        } else {
            ctx.moveTo(margin, margin);
            ctx.lineTo(centerX, centerY);
            ctx.lineTo(width - margin, centerY);
        }
        ctx.stroke();

        // Axis
        ctx.strokeStyle = '#30363d';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(margin, height - margin); ctx.lineTo(width - margin, height - margin);
        ctx.moveTo(margin, margin); ctx.lineTo(margin, height - margin);
        ctx.stroke();
    }

    renderPaths(paths) {
        const ctx = this.pathsCanvas.getContext('2d');
        const { width, height } = this.pathsCanvas;
        ctx.clearRect(0, 0, width, height);

        const xStep = (width - 40) / paths[0].length;
        const yScale = (height - 40) / 200;

        ctx.lineWidth = 1;
        paths.forEach((path, i) => {
            ctx.strokeStyle = `hsla(210, 80%, 60%, 0.3)`;
            ctx.beginPath();
            ctx.moveTo(20, height - path[0] * yScale);
            path.forEach((val, j) => {
                ctx.lineTo(20 + j * xStep, height - val * yScale);
            });
            ctx.stroke();
        });
    }
}

export const charts = new ChartRenderer('payoff-canvas', 'paths-canvas');
