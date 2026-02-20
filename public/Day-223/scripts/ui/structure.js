/**
 * 3D Protein folding Simulation (Theoretical)
 * Renders a procedural backbone based on sequence properties.
 */

export class StructureViz {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.points = [];
        this.angle = 0;
        this.animate();
    }

    setFromSequence(sequence) {
        this.points = [];
        let x = 0, y = 0, z = 0;

        // Simple procedural walk representing amino acid interactions
        sequence.split('').forEach((base, i) => {
            const spread = 20;
            switch (base) {
                case 'A': x += spread; z += spread / 2; break;
                case 'T': x -= spread; z -= spread / 2; break;
                case 'C': y += spread; break;
                case 'G': y -= spread; break;
            }
            this.points.push({ x, y, z, base });
        });
    }

    project(p, width, height) {
        const rad = this.angle;
        // Rotation around Y
        const rotX = p.x * Math.cos(rad) - p.z * Math.sin(rad);
        const rotZ = p.x * Math.sin(rad) + p.z * Math.cos(rad);

        const scale = 400 / (400 + rotZ);
        return {
            x: width / 2 + rotX * scale,
            y: height / 2 + p.y * scale,
            scale: scale
        };
    }

    animate() {
        if (!this.canvas) return;
        const ctx = this.ctx;
        const { width, height } = this.canvas;

        ctx.clearRect(0, 0, width, height);
        this.angle += 0.01;

        if (this.points.length > 1) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#334155';

            for (let i = 0; i < this.points.length; i++) {
                const p = this.project(this.points[i], width, height);
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);

                // Draw base node
                ctx.fillStyle = this.getBaseColor(this.points[i].base);
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
                ctx.fill();
                ctx.moveTo(p.x, p.y);
            }
            ctx.stroke();
        }

        requestAnimationFrame(() => this.animate());
    }

    getBaseColor(base) {
        switch (base) {
            case 'A': return '#f87171';
            case 'T': return '#60a5fa';
            case 'C': return '#fbbf24';
            case 'G': return '#a78bfa';
            default: return '#fff';
        }
    }
}

export const folding = new StructureViz('3d-canvas');
