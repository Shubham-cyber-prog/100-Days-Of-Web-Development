/**
 * High-Performance Tile/Grid Renderer
 * Efficient rendering for large-scale maps
 */

export class TileRenderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.tileSize = 100;
        this.gridVisible = false;
    }

    /**
     * Clear canvas
     */
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw background grid
     */
    drawGrid() {
        if (!this.gridVisible) return;

        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.lineWidth = 1;

        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    /**
     * Draw a node
     */
    drawNode(node, options = {}) {
        const {
            radius = 8,
            color = '#0066cc',
            label = true,
            selected = false
        } = options;

        // Node circle
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Border
        this.ctx.strokeStyle = selected ? '#00c853' : '#ffffff';
        this.ctx.lineWidth = selected ? 3 : 2;
        this.ctx.stroke();

        // Label
        if (label && node.label) {
            this.ctx.fillStyle = '#212529';
            this.ctx.font = '12px Inter';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'top';
            this.ctx.fillText(node.label, node.x, node.y + radius + 4);
        }
    }

    /**
     * Draw an edge between two nodes
     */
    drawEdge(node1, node2, options = {}) {
        const {
            color = 'rgba(0, 0, 0, 0.2)',
            width = 1,
            dashed = false,
            label = false
        } = options;

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;

        if (dashed) {
            this.ctx.setLineDash([5, 5]);
        } else {
            this.ctx.setLineDash([]);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(node1.x, node1.y);
        this.ctx.lineTo(node2.x, node2.y);
        this.ctx.stroke();

        // Distance label
        if (label) {
            const midX = (node1.x + node2.x) / 2;
            const midY = (node1.y + node2.y) / 2;
            const distance = Math.sqrt(
                Math.pow(node2.x - node1.x, 2) +
                Math.pow(node2.y - node1.y, 2)
            );

            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillRect(midX - 20, midY - 8, 40, 16);
            this.ctx.fillStyle = '#6c757d';
            this.ctx.font = '10px JetBrains Mono';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(Math.round(distance) + 'km', midX, midY);
        }

        this.ctx.setLineDash([]);
    }

    /**
     * Draw a path (tour)
     */
    drawPath(nodes, path, options = {}) {
        const {
            color = '#0066cc',
            width = 3,
            animated = false
        } = options;

        if (path.length < 2) return;

        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Draw path segments
        for (let i = 0; i < path.length - 1; i++) {
            const node1 = nodes.find(n => n.id === path[i]);
            const node2 = nodes.find(n => n.id === path[i + 1]);

            if (node1 && node2) {
                this.ctx.beginPath();
                this.ctx.moveTo(node1.x, node1.y);
                this.ctx.lineTo(node2.x, node2.y);
                this.ctx.stroke();

                // Draw direction arrow
                this.drawArrow(node1, node2, color);
            }
        }
    }

    /**
     * Draw directional arrow on edge
     */
    drawArrow(from, to, color) {
        const headlen = 10;
        const angle = Math.atan2(to.y - from.y, to.x - from.x);

        // Arrow position (80% along the edge)
        const arrowX = from.x + (to.x - from.x) * 0.8;
        const arrowY = from.y + (to.y - from.y) * 0.8;

        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(arrowX, arrowY);
        this.ctx.lineTo(
            arrowX - headlen * Math.cos(angle - Math.PI / 6),
            arrowY - headlen * Math.sin(angle - Math.PI / 6)
        );
        this.ctx.lineTo(
            arrowX - headlen * Math.cos(angle + Math.PI / 6),
            arrowY - headlen * Math.sin(angle + Math.PI / 6)
        );
        this.ctx.closePath();
        this.ctx.fill();
    }

    /**
     * Draw obstacle
     */
    drawObstacle(obstacle) {
        this.ctx.fillStyle = 'rgba(211, 47, 47, 0.3)';
        this.ctx.strokeStyle = '#d32f2f';
        this.ctx.lineWidth = 2;

        if (obstacle.type === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.stroke();
        } else if (obstacle.type === 'rect') {
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            this.ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        }
    }

    /**
     * Highlight node on hover
     */
    highlightNode(node) {
        this.ctx.fillStyle = 'rgba(0, 200, 83, 0.2)';
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, 15, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
