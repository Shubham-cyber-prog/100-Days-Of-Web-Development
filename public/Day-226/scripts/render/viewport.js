/**
 * Voxel Viewport Engine
 * Manages the rendering loop, camera matrices, and interactivity.
 */

import { Raycaster } from '../core/raycaster.js';
import { world } from '../state/world.js';

class Viewport {
    constructor() {
        this.canvas = document.getElementById('voxel-canvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.raycaster = new Raycaster(world.octree);

        this.camera = {
            pos: { x: 128, y: 128, z: -100 },
            rot: { x: 0, y: 0 },
            fov: 75
        };

        this.resScale = 2; // Performance mode by default
        this.setup();
    }

    setup() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse Controls
        this.canvas.addEventListener('mousemove', (e) => this.handleRotate(e));
        this.canvas.addEventListener('mousedown', (e) => this.handleClick(e));
    }

    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth / this.resScale;
        this.canvas.height = container.clientHeight / this.resScale;
    }

    start() {
        this.render();
    }

    render() {
        const { width, height } = this.canvas;
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;

        const forward = this.getForwardVector();
        const right = this.getRightVector();
        const up = this.getUpVector();

        const aspect = width / height;
        const fovRad = (this.camera.fov * Math.PI) / 180;
        const planeDist = 1 / Math.tan(fovRad / 2);

        // Raycasting Loop (Per Pixel)
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const nx = (2 * x / width - 1) * aspect;
                const ny = (1 - 2 * y / height);

                const dir = {
                    x: forward.x * planeDist + right.x * nx + up.x * ny,
                    y: forward.y * planeDist + right.y * nx + up.y * ny,
                    z: forward.z * planeDist + right.z * nx + up.z * ny
                };

                // Normalize dir
                const mag = Math.sqrt(dir.x * dir.x + dir.y * dir.y + dir.z * dir.z);
                const rayDir = { x: dir.x / mag, y: dir.y / mag, z: dir.z / mag };

                const hit = this.raycaster.cast(this.camera.pos, rayDir);
                const idx = (y * width + x) * 4;

                if (hit.hit) {
                    // Simple Lighting
                    const dot = Math.abs(hit.normal.x * 0.8 + hit.normal.y * 1.0 + hit.normal.z * 0.6);
                    const color = this.hexToRgb(hit.color);
                    data[idx] = color.r * dot;
                    data[idx + 1] = color.g * dot;
                    data[idx + 2] = color.b * dot;
                    data[idx + 3] = 255;
                } else {
                    // Background Sky
                    data[idx] = 10; data[idx + 1] = 10; data[idx + 2] = 20; data[idx + 3] = 255;
                }
            }
        }

        this.ctx.putImageData(imageData, 0, 0);
        requestAnimationFrame(() => this.render());
    }

    getForwardVector() {
        return {
            x: Math.sin(this.camera.rot.y) * Math.cos(this.camera.rot.x),
            y: Math.sin(this.camera.rot.x),
            z: Math.cos(this.camera.rot.y) * Math.cos(this.camera.rot.x)
        };
    }

    getRightVector() {
        return {
            x: Math.cos(this.camera.rot.y),
            y: 0,
            z: -Math.sin(this.camera.rot.y)
        };
    }

    getUpVector() {
        const f = this.getForwardVector();
        const r = this.getRightVector();
        return {
            x: f.y * r.z - f.z * r.y,
            y: f.z * r.x - f.x * r.z,
            z: f.x * r.y - f.y * r.x
        };
    }

    hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return { r, g, b };
    }

    handleRotate(e) {
        if (e.buttons === 2) { // RMB
            this.camera.rot.y += e.movementX * 0.01;
            this.camera.rot.x -= e.movementY * 0.01;
        }
    }

    handleClick(e) {
        if (e.buttons === 1) { // LMB
            // Implementation for Adding/Removing voxels via screen-to-world raycasting
        }
    }
}

export const viewport = new Viewport();
