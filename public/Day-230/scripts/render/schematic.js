/**
 * Schematic Visual Renderer
 * Handles the drawing of gates, ports, and wires on the canvas.
 */

export class SchematicRenderer {
    constructor(canvasId, svgId) {
        this.canvas = document.getElementById(canvasId);
        this.svg = document.getElementById(svgId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    draw(components, wires) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Wires first (behind gates)
        this.drawWires(wires, components);

        // Draw Components
        components.forEach(comp => {
            this.drawComponent(comp);
        });
    }

    drawComponent(comp) {
        const ctx = this.ctx;
        const w = 80;
        const h = 50;
        const x = comp.x - w / 2;
        const y = comp.y - h / 2;

        // Shadow
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;

        // Body
        ctx.fillStyle = '#1a1e2e';
        ctx.strokeStyle = comp.state === 1 ? '#00ffaa' : '#333b50';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 8);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(comp.type, comp.x, comp.y + 5);

        // State indicator for I/O
        if (comp.type === 'INPUT' || comp.type === 'OUTPUT' || comp.type === 'CLOCK') {
            ctx.fillStyle = comp.state === 1 ? '#00ffaa' : '#ff4444';
            ctx.beginPath();
            ctx.arc(comp.x + w / 2 - 15, comp.y, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawWires(wires, components) {
        const ctx = this.ctx;
        ctx.lineWidth = 2;

        wires.forEach(wire => {
            const start = components.get(wire.from);
            const end = components.get(wire.to);
            if (!start || !end) return;

            ctx.strokeStyle = start.state === 1 ? '#00ffaa' : '#333b50';

            ctx.beginPath();
            ctx.moveTo(start.x + 40, start.y);

            // Bezier curve for wires
            const cp1x = start.x + 40 + (end.x - 40 - (start.x + 40)) / 2;
            const cp2x = cp1x;

            ctx.bezierCurveTo(cp1x, start.y, cp2x, end.y, end.x - 40, end.y);
            ctx.stroke();
        });
    }
}
