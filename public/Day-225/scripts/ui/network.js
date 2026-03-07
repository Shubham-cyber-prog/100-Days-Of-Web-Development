/**
 * Network Architecture Graph
 * Renders nodes and dynamic links with weight-based thickness and color.
 */

export class NetworkViz {
    constructor() {
        this.canvas = document.getElementById('network-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setup();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    render(layers) {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        const layerCount = layers.length + 1;
        const xStep = width / layerCount;
        const nodeRadius = 12;

        // Draw Links first
        layers.forEach((layer, lIdx) => {
            const x1 = (lIdx + 0.5) * xStep;
            const x2 = (lIdx + 1.5) * xStep;

            for (let i = 0; i < layer.inputSize; i++) {
                const y1 = this.getY(i, layer.inputSize, height);
                for (let j = 0; j < layer.outputSize; j++) {
                    const y2 = this.getY(j, layer.outputSize, height);
                    const weight = layer.weights[j][i];

                    ctx.beginPath();
                    ctx.lineWidth = Math.min(Math.abs(weight) * 2, 5);
                    ctx.strokeStyle = weight > 0 ? `rgba(0, 255, 136, ${Math.abs(weight)})` : `rgba(255, 62, 62, ${Math.abs(weight)})`;
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            }
        });

        // Draw Nodes
        const shapes = [layers[0].inputSize, ...layers.map(l => l.outputSize)];
        shapes.forEach((count, lIdx) => {
            const x = (lIdx + 0.5) * xStep;
            for (let i = 0; i < count; i++) {
                const y = this.getY(i, count, height);

                ctx.beginPath();
                ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
                ctx.fillStyle = '#11111a';
                ctx.fill();
                ctx.strokeStyle = '#333345';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });
    }

    getY(idx, total, height) {
        const step = height / (total + 1);
        return (idx + 1) * step;
    }
}

export const ui = new NetworkViz();
