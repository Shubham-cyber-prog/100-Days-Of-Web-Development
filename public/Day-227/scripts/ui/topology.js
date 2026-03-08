/**
 * Topology Layout & Renderer
 * Orchestrates the relationship between nodes, physics, and canvas rendering.
 */

import { ForceEngine } from '../physics/force.js';
import { PacketSimulator } from '../sim/packet.js';

class TopologyController {
    constructor() {
        this.canvas = document.getElementById('topology-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.links = [];
        this.physics = null;
        this.sim = null;
    }

    init() {
        this.setupDimensions();
        this.generateDefaultTopology();
        this.physics = new ForceEngine(this.nodes, this.links);
        this.sim = new PacketSimulator(this.nodes, this.links);

        window.addEventListener('resize', () => this.setupDimensions());
        this.loop();
    }

    setupDimensions() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    generateDefaultTopology() {
        // Core Router
        this.nodes.push({ id: 0, x: 400, y: 300, vx: 0, vy: 0, label: 'CORE_GW', type: 'router' });

        // Sub-networks
        for (let i = 1; i < 15; i++) {
            this.nodes.push({
                id: i,
                x: 400 + Math.random() * 100 - 50,
                y: 300 + Math.random() * 100 - 50,
                vx: 0, vy: 0,
                label: `NODE_${i}`,
                type: i % 4 === 0 ? 'server' : 'host'
            });
            this.links.push({ source: 0, target: i, length: 150 });
        }
    }

    loop() {
        this.physics.update();
        this.sim.update();
        this.render();
        requestAnimationFrame(() => this.loop());
    }

    render() {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        // Render Links
        ctx.strokeStyle = '#1a331a';
        ctx.lineWidth = 1;
        this.links.forEach(link => {
            const s = this.nodes[link.source];
            const t = this.nodes[link.target];
            ctx.beginPath();
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(t.x, t.y);
            ctx.stroke();
        });

        // Render Packets
        this.sim.packets.forEach(p => {
            const s = this.nodes[p.source];
            const t = this.nodes[p.target];
            const px = s.x + (t.x - s.x) * p.progress;
            const py = s.y + (t.y - s.y) * p.progress;

            ctx.fillStyle = p.isMalicious ? '#ff0000' : '#00ff00';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        });

        // Render Nodes
        this.nodes.forEach(node => {
            ctx.fillStyle = '#050505';
            ctx.strokeStyle = node.type === 'router' ? '#00aaff' : '#00ff00';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.roundRect(node.x - 10, node.y - 10, 20, 20, 4);
            ctx.fill();
            ctx.stroke();

            // Labels
            ctx.fillStyle = '#008800';
            ctx.font = '8px Share Tech Mono';
            ctx.fillText(node.label, node.x - 15, node.y + 20);
        });
    }
}

export const topology = new TopologyController();
