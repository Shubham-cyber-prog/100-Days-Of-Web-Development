/**
 * Timing Diagram Renderer
 * Visualizes the history of digital signals over time.
 */

export class TimingRenderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.setup();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    render(components) {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        const laneHeight = 40;
        const padding = 20;
        let yOffset = padding;

        components.forEach(comp => {
            if (yOffset + laneHeight > height) return;

            // Draw Label
            ctx.fillStyle = '#707585';
            ctx.font = '10px Fira Code';
            ctx.textAlign = 'left';
            ctx.fillText(comp.type + ':' + comp.id.slice(-3), 5, yOffset + laneHeight / 2);

            // Draw Waveform
            ctx.strokeStyle = comp.state === 1 ? '#00ffaa' : '#333b50';
            ctx.lineWidth = 2;
            ctx.beginPath();

            const history = comp.history;
            const xStep = (width - 60) / 200;
            const baseline = yOffset + laneHeight - 5;
            const highLevel = yOffset + 5;

            history.forEach((point, i) => {
                const x = 60 + i * xStep;
                const y = point.state === 1 ? highLevel : baseline;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    // Vertical step for digital signal
                    const prevX = 60 + (i - 1) * xStep;
                    const prevY = history[i - 1].state === 1 ? highLevel : baseline;
                    if (prevY !== y) {
                        ctx.lineTo(x, prevY);
                    }
                    ctx.lineTo(x, y);
                }
            });

            ctx.stroke();
            yOffset += laneHeight;
        });
    }
}

export const timing = new TimingRenderer('timing-canvas');
