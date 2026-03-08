/**
 * Population Statistics and Analytics Charting
 */

class StatisticsUI {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.history = [];
        this.maxDataPoints = 100;
    }

    record(popCount, avgEnergy) {
        this.history.push({ popCount, avgEnergy });
        if (this.history.length > this.maxDataPoints) {
            this.history.shift();
        }
    }

    draw() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        if (this.history.length < 2) return;

        // Draw Population Trend
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();

        const stepX = w / (this.maxDataPoints - 1);
        const maxPop = Math.max(...this.history.map(d => d.popCount), 10);

        this.history.forEach((data, i) => {
            const x = i * stepX;
            const y = h - (data.popCount / maxPop) * h * 0.8 - 10;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        // Label
        ctx.fillStyle = "#38bdf8";
        ctx.font = "10px Inter";
        ctx.fillText(`Pop: ${this.history[this.history.length - 1].popCount}`, 10, 15);
    }
}

window.StatisticsUI = StatisticsUI;
