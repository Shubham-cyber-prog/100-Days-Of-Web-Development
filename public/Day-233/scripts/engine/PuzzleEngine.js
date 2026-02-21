export default class PuzzleEngine {
    constructor(canvas, ui) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ui = ui;
        this.nodes = [];
        this.connections = [];
        this.target = 0;
        this.level = null;

        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    loadLevel(levelData) {
        this.level = levelData;
        this.nodes = [...levelData.initialNodes];
        this.connections = [];
        this.target = levelData.target;
        this.ui.updateLevelInfo(levelData);
    }

    addNode(type, x, y) {
        const id = Math.random().toString(36).substr(2, 9);
        this.nodes.push({ id, type, x, y, inputs: [], output: 0 });
    }

    addConnection(fromId, toId) {
        this.connections.push({ from: fromId, to: toId });
    }

    evaluate() {
        console.log("SIMULATING_NEURAL_PATH...");
        // Logic evaluation based on graph traversal
        // Simplified for now: just trigger UI update
        const result = this.calculateOutputs();
        this.ui.updateResult(result, this.target === result);
    }

    calculateOutputs() {
        // Mock computation
        return Math.random() > 0.5 ? 1 : 0;
    }

    reset() {
        if (this.level) this.loadLevel(this.level);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawConnections();
        this.drawNodes();
        requestAnimationFrame(() => this.animate());
    }

    drawNodes() {
        this.nodes.forEach(node => {
            this.ctx.fillStyle = node.output ? '#00f3ff' : '#1a1c23';
            this.ctx.strokeStyle = '#00f3ff';
            this.ctx.lineWidth = 2;

            this.ctx.beginPath();
            this.ctx.roundRect(node.x - 40, node.y - 30, 80, 60, 8);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 12px "JetBrains Mono"';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(node.type, node.x, node.y + 5);
        });
    }

    drawConnections() {
        this.connections.forEach(conn => {
            const fromNode = this.nodes.find(n => n.id === conn.from);
            const toNode = this.nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return;

            this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x + 40, fromNode.y);
            this.ctx.lineTo(toNode.x - 40, toNode.y);
            this.ctx.stroke();
        });
    }
}
