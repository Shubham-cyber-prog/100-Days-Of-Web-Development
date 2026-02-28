/**
 * Decision Boundary Visualization
 * Renders the high-dimensional prediction heatmap into a 2D viewport.
 */

export class DecisionViz {
    constructor() {
        this.boundaryCanvas = document.getElementById('boundary-canvas');
        this.dataCanvas = document.getElementById('data-canvas');
        this.setup();
    }

    setup() {
        [this.boundaryCanvas, this.dataCanvas].forEach(c => {
            const parent = c.parentElement;
            c.width = parent.clientWidth;
            c.height = parent.clientHeight;
        });
    }

    renderBoundary(layers) {
        const ctx = this.boundaryCanvas.getContext('2d');
        const { width, height } = this.boundaryCanvas;
        const resolution = 4; // Grid size for heatmap

        ctx.clearRect(0, 0, width, height);

        for (let x = 0; x < width; x += resolution) {
            for (let y = 0; y < height; y += resolution) {
                // Normalize to [-1, 1]
                const nx = (x / width) * 2 - 1;
                const ny = (y / height) * 2 - 1;

                // Forward Pass
                let act = [nx, ny];
                layers.forEach(l => act = l.forward(act));

                // Predict Class
                const prob = act[1] / (act[0] + act[1] + 0.0001);
                const r = Math.floor(255 * (1 - prob));
                const b = Math.floor(255 * prob);

                ctx.fillStyle = `rgba(${r}, 0, ${b}, 0.5)`;
                ctx.fillRect(x, y, resolution, resolution);
            }
        }
    }

    renderData(points) {
        const ctx = this.dataCanvas.getContext('2d');
        const { width, height } = this.dataCanvas;
        ctx.clearRect(0, 0, width, height);

        points.forEach(({ x, y: label }) => {
            const px = (x[0] + 1) / 2 * width;
            const py = (x[1] + 1) / 2 * height;

            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = label === 1 ? '#00f5ff' : '#ff3e3e';
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }
}

export const decision = new DecisionViz();
