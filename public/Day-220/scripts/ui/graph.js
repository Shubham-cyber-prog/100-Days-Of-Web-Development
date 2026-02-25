/**
 * Graph UI Controller
 * Manages the node canvas, cable connections, and UI interactions.
 */

import { engine } from '../core/audioBus.js';

class GraphController {
    constructor() {
        this.canvas = document.getElementById('graph-canvas');
        this.ctx = null;
        this.nodes = [];
        this.connections = [];
        this.isDragging = false;
        this.draggedNode = null;
        this.dragOffset = { x: 0, y: 0 };

        this.activeConnection = null; // For drawing a cable while connecting

        this.setupCanvas();
        this.setupEventListeners();
    }

    setupCanvas() {
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.draw();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', e => this.handleMouseDown(e));
        window.addEventListener('mousemove', e => this.handleMouseMove(e));
        window.addEventListener('mouseup', e => this.handleMouseUp(e));

        // Node creation buttons
        document.querySelectorAll('.add-node').forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.dataset.type;
                this.addNode(type, 100, 100);
            });
        });

        document.getElementById('clear-graph').addEventListener('click', () => this.clear());
    }

    addNode(type, x, y) {
        const id = Math.random().toString(36).substr(2, 9);
        const node = {
            id,
            type,
            x,
            y,
            width: 140,
            height: 80,
            inputs: ['IN'],
            outputs: ['OUT'],
            instance: null // Will store the Audio Node Wrapper
        };

        // Initialize audio instance based on type
        // (Simplified: real implementation would map to the wrappers created earlier)

        this.nodes.push(node);
        this.updateHUD();
        this.draw();
        engine.log(`Added node: ${type.toUpperCase()} [${id}]`);
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Check for node header clicks for dragging
        for (let i = this.nodes.length - 1; i >= 0; i--) {
            const node = this.nodes[i];
            if (mouseX >= node.x && mouseX <= node.x + node.width &&
                mouseY >= node.y && mouseY <= node.y + 25) {
                this.isDragging = true;
                this.draggedNode = node;
                this.dragOffset.x = mouseX - node.x;
                this.dragOffset.y = mouseY - node.y;
                return;
            }
        }
    }

    handleMouseMove(e) {
        if (this.isDragging && this.draggedNode) {
            const rect = this.canvas.getBoundingClientRect();
            this.draggedNode.x = e.clientX - rect.left - this.dragOffset.x;
            this.draggedNode.y = e.clientY - rect.top - this.dragOffset.y;
            this.draw();
        }
    }

    handleMouseUp() {
        this.isDragging = false;
        this.draggedNode = null;
    }

    clear() {
        this.nodes = [];
        this.connections = [];
        this.updateHUD();
        this.draw();
        engine.log("Graph cleared.");
    }

    updateHUD() {
        const count = document.getElementById('node-count');
        if (count) count.textContent = this.nodes.length;
    }

    draw() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Cables
        this.nodes.forEach(node => {
            // Placeholder for connection logic
        });

        // Draw Nodes
        this.nodes.forEach(node => {
            this.drawNode(node);
        });

        requestAnimationFrame(() => this.draw());
    }

    drawNode(node) {
        const { x, y, width, height, type } = node;

        // Border & Background
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 2;
        this.ctx.fillStyle = '#141414';
        this.ctx.fillRect(x, y, width, height);
        this.ctx.strokeRect(x, y, width, height);

        // Header
        this.ctx.fillStyle = '#e0e0e0';
        this.ctx.fillRect(x, y, width, 25);
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.font = 'bold 10px "JetBrains Mono"';
        this.ctx.fillText(type.toUpperCase(), x + 10, y + 17);

        // Ports
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.strokeRect(x - 6, y + 40, 12, 12); // Input
        this.ctx.strokeRect(x + width - 6, y + 40, 12, 12); // Output
        this.ctx.fillRect(x - 5, y + 41, 10, 10);
        this.ctx.fillRect(x + width - 5, y + 41, 10, 10);
    }
}

export const graph = new GraphController();
