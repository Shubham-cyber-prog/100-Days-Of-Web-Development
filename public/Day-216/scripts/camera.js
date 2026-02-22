/**
 * Logarithmic Camera and Zoom System
 */

class Camera {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = 0;
        this.y = 0;
        this.zoom = 1.0; // Higher = smaller view (zoomed out)
        this.targetZoom = 1.0;
        this.minZoom = 0.0001; // Deep in
        this.maxZoom = 1000.0; // Far out
    }

    worldToScreen(wx, wy) {
        const sx = (wx - this.x) / this.zoom + this.canvas.width / 2;
        const sy = (wy - this.y) / this.zoom + this.canvas.height / 2;

        return {
            x: sx,
            y: sy,
            visible: sx > -100 && sx < this.canvas.width + 100 &&
                sy > -100 && sy < this.canvas.height + 100
        };
    }

    screenToWorld(sx, sy) {
        const wx = (sx - this.canvas.width / 2) * this.zoom + this.x;
        const wy = (sy - this.canvas.height / 2) * this.zoom + this.y;
        return { x: wx, y: wy };
    }

    zoomAt(sx, sy, factor) {
        const before = this.screenToWorld(sx, sy);
        this.targetZoom *= factor;
        this.targetZoom = Math.min(Math.max(this.targetZoom, this.minZoom), this.maxZoom);

        // Immediate update for smooth tracking
        this.zoom = this.targetZoom;
        const after = this.screenToWorld(sx, sy);

        this.x += (before.x - after.x);
        this.y += (before.y - after.y);
    }

    update() {
        // Smooth zoom interpolation
        this.zoom += (this.targetZoom - this.zoom) * 0.1;
    }
}

window.Camera = Camera;
