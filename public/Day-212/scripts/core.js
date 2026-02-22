/**
 * Fractal Core Engine
 */

class FractalEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.view = {
            minR: -2.0,
            maxR: 1.0,
            minI: -1.2,
            maxI: 1.2,
            maxIter: 256,
            type: 'mandelbrot',
            juliaC: { r: -0.8, i: 0.156 }
        };

        this.workers = [];
        this.numWorkers = navigator.hardwareConcurrency || 4;
        this.coloring = new ColoringSystem();
        this.isRendering = false;

        this.stats = {
            startTime: 0,
            endTime: 0,
            pixelCount: 0
        };

        this.initWorkers();
    }

    /**
     * Initializes the Web Worker pool for parallel processing.
     * Each worker will handle a horizontal slice of the fractal image.
     */
    initWorkers() {
        for (let i = 0; i < this.numWorkers; i++) {
            const worker = new Worker('scripts/worker.js');
            worker.onmessage = (e) => this.handleWorkerMessage(e.data);
            this.workers.push(worker);
        }
    }

    /**
     * Handles the data returned from a calculation worker.
     * Colors the pixels based on escape time and renders the slice to the canvas.
     * @param {Object} data Buffer and coordinate data from worker.
     */
    handleWorkerMessage(data) {
        const { buffer, startX, startY, width, height } = data;
        const imageData = this.ctx.createImageData(width, height);
        const pixels = imageData.data;

        for (let i = 0; i < buffer.length; i++) {
            const iter = buffer[i];
            const color = this.coloring.getColor(iter, this.view.maxIter);
            const idx = i * 4;
            pixels[idx] = color[0];
            pixels[idx + 1] = color[1];
            pixels[idx + 2] = color[2];
            pixels[idx + 3] = 255;
        }

        this.ctx.putImageData(imageData, startX, startY);

        this.workersFinished++;
        this.stats.pixelCount += buffer.length;

        if (this.workersFinished === this.numWorkers) {
            this.stats.endTime = performance.now();
            this.isRendering = false;
            this.updateStats();
            if (this.onRenderComplete) this.onRenderComplete();
        }
    }

    updateStats() {
        const duration = (this.stats.endTime - this.stats.startTime) / 1000;
        const speed = Math.round(this.stats.pixelCount / duration);
        const el = document.getElementById('speed-val');
        if (el) el.textContent = `${(speed / 1e6).toFixed(1)}M px/s`;
    }

    /**
     * Splits the viewport into tiles and sends calculation tasks to workers.
     * Tracks performance metrics during the render cycle.
     */
    async exportTo4K() {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 3840;
        offCanvas.height = 2160;
        const offCtx = offCanvas.getContext('2d');

        // This would require a separate high-iter pass. 
        // For simplicity, we just scale the current view to a high-res pass.
        // In a real high-perf app, this would use a tiled high-res worker pass.

        console.log('Starting 4K Export...');
        const originalWidth = this.width;
        const originalHeight = this.height;
        const originalCanvas = this.canvas;
        const originalCtx = this.ctx;

        this.width = 3840;
        this.height = 2160;
        this.canvas = offCanvas;
        this.ctx = offCtx;

        return new Promise(resolve => {
            this.onRenderComplete = () => {
                const link = document.createElement('a');
                link.download = 'fractal_4k.png';
                link.href = offCanvas.toDataURL('image/png');
                link.click();

                // Restore
                this.width = originalWidth;
                this.height = originalHeight;
                this.canvas = originalCanvas;
                this.ctx = originalCtx;
                this.onRenderComplete = null;
                resolve();
            };
            this.render();
        });
    }

    render() {
        if (this.isRendering) return;
        this.isRendering = true;
        this.workersFinished = 0;
        this.stats.pixelCount = 0;
        this.stats.startTime = performance.now();

        const tileHeight = Math.ceil(this.height / this.numWorkers);

        for (let i = 0; i < this.numWorkers; i++) {
            const startY = i * tileHeight;
            const currentTileHeight = Math.min(tileHeight, this.height - startY);

            this.workers[i].postMessage({
                width: this.width,
                height: currentTileHeight,
                startX: 0,
                startY: startY,
                fullWidth: this.width,
                fullHeight: this.height,
                minR: this.view.minR,
                maxR: this.view.maxR,
                minI: this.view.minI,
                maxI: this.view.maxI,
                maxIter: this.view.maxIter,
                type: this.view.type,
                juliaC: this.view.juliaC
            });
        }
    }

    zoom(x, y, factor) {
        const rRange = this.view.maxR - this.view.minR;
        const iRange = this.view.maxI - this.view.minI;

        const mouseR = this.view.minR + (x / this.width) * rRange;
        const mouseI = this.view.minI + (y / this.height) * iRange;

        const newRRange = rRange * factor;
        const newIRange = iRange * factor;

        this.view.minR = mouseR - (x / this.width) * newRRange;
        this.view.maxR = this.view.minR + newRRange;
        this.view.minI = mouseI - (y / this.height) * newIRange;
        this.view.maxI = this.view.minI + newIRange;

        this.render();
    }

    pan(dx, dy) {
        const rRange = this.view.maxR - this.view.minR;
        const iRange = this.view.maxI - this.view.minI;

        const shiftR = (dx / this.width) * rRange;
        const shiftI = (dy / this.height) * iRange;

        this.view.minR -= shiftR;
        this.view.maxR -= shiftR;
        this.view.minI -= shiftI;
        this.view.maxI -= shiftI;

        this.render();
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Maintain aspect ratio
        const aspect = this.width / this.height;
        const rRange = this.view.maxR - this.view.minR;
        const targetIRange = rRange / aspect;
        const iCenter = (this.view.minI + this.view.maxI) / 2;

        this.view.minI = iCenter - targetIRange / 2;
        this.view.maxI = iCenter + targetIRange / 2;

        this.render();
    }
}

window.FractalEngine = FractalEngine;
