/**
 * Visualization Engine for Neural Networks
 */

class NetworkVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.nodeRadius = 15;
    }

    draw(nn) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const counts = nn.getNodeCounts();
        const layerWidth = this.canvas.width / counts.length;

        // Draw weights first
        for (let l = 0; l < nn.layers.length; l++) {
            const layer = nn.layers[l];
            const x1 = (l + 0.5) * layerWidth;
            const x2 = (l + 1.5) * layerWidth;

            const nodes1 = layer.inputNodes;
            const nodes2 = layer.outputNodes;

            for (let i = 0; i < nodes1; i++) {
                for (let j = 0; j < nodes2; j++) {
                    const y1 = (i + 1) * (this.canvas.height / (nodes1 + 1));
                    const y2 = (j + 1) * (this.canvas.height / (nodes2 + 1));

                    const weight = layer.weights.data[j][i];
                    const alpha = Math.min(Math.abs(weight), 1);
                    this.ctx.strokeStyle = weight > 0 ? `rgba(0, 210, 255, ${alpha})` : `rgba(255, 68, 68, ${alpha})`;
                    this.ctx.lineWidth = Math.abs(weight) * 2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(x1, y1);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (let l = 0; l < counts.length; l++) {
            const x = (l + 0.5) * layerWidth;
            const nodes = counts[l];
            for (let i = 0; i < nodes; i++) {
                const y = (i + 1) * (this.canvas.height / (nodes + 1));

                // Draw glow
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#00d2ff';

                this.ctx.fillStyle = '#0f172a';
                this.ctx.strokeStyle = '#00d2ff';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.arc(x, y, this.nodeRadius, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();

                this.ctx.shadowBlur = 0;
            }
        }
    }

    drawDecisionBoundary(nn, drawCanvasId, dataset) {
        const canvas = document.getElementById(drawCanvasId);
        const ctx = canvas.getContext('2d');
        const res = 10; // resolution

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = 0; x < canvas.width; x += res) {
            for (let y = 0; y < canvas.height; y += res) {
                const inputX = (x / canvas.width) * 2 - 1;
                const inputY = (y / canvas.height) * 2 - 1;
                const output = nn.predict([inputX, inputY])[0];

                const alpha = Math.abs(output - 0.5) * 2;
                ctx.fillStyle = output > 0.5 ? `rgba(0, 210, 255, ${alpha * 0.3})` : `rgba(255, 68, 68, ${alpha * 0.3})`;
                ctx.fillRect(x, y, res, res);
            }
        }

        // Draw points from dataset
        if (dataset) {
            dataset.inputs.forEach((input, i) => {
                const px = (input[0] + 1) / 2 * canvas.width;
                const py = (input[1] + 1) / 2 * canvas.height;
                const target = dataset.targets[i][0];

                ctx.fillStyle = target > 0.5 ? '#00d2ff' : '#ff4444';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            });
        }
    }
}

window.NetworkVisualizer = NetworkVisualizer;
