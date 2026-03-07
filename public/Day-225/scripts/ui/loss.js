/**
 * Loss & Training Analysis Charts
 * Custom real-time charting without external dependencies.
 */

export class LossChart {
    constructor() {
        this.canvas = document.getElementById('loss-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.history = [];
        this.setup();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    addPoint(loss) {
        this.history.push(loss);
        if (this.history.length > 100) this.history.shift();
        this.render();
    }

    render() {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        if (this.history.length < 2) return;

        const maxLoss = Math.max(...this.history, 0.5);
        const xStep = width / (this.history.length - 1);

        ctx.beginPath();
        ctx.strokeStyle = '#00f5ff';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';

        this.history.forEach((loss, i) => {
            const x = i * xStep;
            const y = height - (loss / maxLoss) * (height - 20) - 10;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();

        // Area Fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
        ctx.fill();
    }

    reset() {
        this.history = [];
        this.render();
    }
}

export const lossChart = new LossChart();
