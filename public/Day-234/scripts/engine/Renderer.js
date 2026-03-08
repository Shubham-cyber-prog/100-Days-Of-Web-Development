export default class Renderer {
    constructor(canvas, world) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.world = world;
        this.rotation = 0;

        // Cube settings
        this.sideLen = 20;
        this.hLen = this.sideLen * Math.cos(Math.PI / 6);
        this.vLen = this.sideLen * Math.sin(Math.PI / 6);

        this.resize();
    }

    resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    setRotation(rot) {
        this.rotation = rot;
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const voxels = this.world.getSortedVoxels(this.rotation);
        const offsetX = this.canvas.width / 2;
        const offsetY = this.canvas.height / 2 + 100;

        voxels.forEach(v => {
            this.drawCube(v.x, v.y, v.z, v.color, offsetX, offsetY);
        });
    }

    drawCube(x, y, z, color, offX, offY) {
        // Isometric Projection
        const px = offX + (x - y) * this.hLen;
        const py = offY + (x + y) * this.vLen - z * this.sideLen;

        // Top Face
        this.ctx.fillStyle = color;
        this.drawFace(px, py, px + this.hLen, py + this.vLen, px, py + 2 * this.vLen, px - this.hLen, py + this.vLen);

        // Right Face (Darker)
        this.ctx.fillStyle = this.shade(color, -20);
        this.drawFace(px, py + 2 * this.vLen, px + this.hLen, py + this.vLen, px + this.hLen, py + this.vLen + this.sideLen, px, py + 2 * this.vLen + this.sideLen);

        // Left Face (Middle)
        this.ctx.fillStyle = this.shade(color, -10);
        this.drawFace(px, py + 2 * this.vLen, px - this.hLen, py + this.vLen, px - this.hLen, py + this.vLen + this.sideLen, px, py + 2 * this.vLen + this.sideLen);
    }

    drawFace(x1, y1, x2, y2, x3, y3, x4, y4) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.lineTo(x4, y4);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.strokeStyle = 'rgba(0,0,0,0.1)';
        this.ctx.stroke();
    }

    shade(color, percent) {
        // Simplified shading
        return color; // Placeholder
    }

    getGridPosition(mx, my) {
        // Mock raycasting for demo
        return { x: Math.floor(Math.random() * 10), y: Math.floor(Math.random() * 10), z: 0 };
    }
}
