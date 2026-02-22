/**
 * Export System (PDF/Image)
 */

class ExportSystem {
    static async exportToPNG(app) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Find bounds of circuit
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        app.engine.components.forEach(c => {
            minX = Math.min(minX, c.x);
            minY = Math.min(minY, c.y);
            maxX = Math.max(maxX, c.x + 100);
            maxY = Math.max(maxY, c.y + 80);
        });

        if (app.engine.components.length === 0) {
            minX = 0; minY = 0; maxX = 800; maxY = 600;
        } else {
            // Add padding
            minX -= 50; minY -= 50; maxX += 50; maxY += 50;
        }

        canvas.width = maxX - minX;
        canvas.height = maxY - minY;

        // Background
        ctx.fillStyle = '#0a0e14';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.1)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 20) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 20) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // Draw Wires
        ctx.lineWidth = 3;
        app.wires.wires.forEach(wire => {
            const p1 = app.getPinPosition(wire.fromPin);
            const p2 = app.getPinPosition(wire.toPin);
            if (p1 && p2) {
                ctx.strokeStyle = wire.state === 1 ? '#00ff88' : '#8b949e';
                const cp1x = (p1.x - minX) + Math.abs(p1.x - p2.x) * 0.5;
                const cp2x = (p2.x - minX) - Math.abs(p1.x - p2.x) * 0.5;

                ctx.beginPath();
                ctx.moveTo(p1.x - minX, p1.y - minY);
                ctx.bezierCurveTo(cp1x, p1.y - minY, cp2x, p2.y - minY, p2.x - minX, p2.y - minY);
                ctx.stroke();
            }
        });

        // Draw Components
        app.engine.components.forEach(c => {
            const x = c.x - minX;
            const y = c.y - minY;

            ctx.fillStyle = '#0f131a';
            ctx.strokeStyle = '#00d2ff';
            ctx.lineWidth = 2;
            this.roundRect(ctx, x, y, 80, 60, 6, true, true);

            ctx.fillStyle = '#e6edf3';
            ctx.font = 'bold 12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(c.label, x + 40, y + 30);
            ctx.font = '8px Inter';
            ctx.fillStyle = '#8b949e';
            ctx.fillText(c.type.toUpperCase(), x + 40, y + 45);
        });

        // Download
        const link = document.createElement('a');
        link.download = 'circuit-diagram.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    static roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-export-pdf').onclick = () => {
        ExportSystem.exportToPNG(window.app);
    };
});
