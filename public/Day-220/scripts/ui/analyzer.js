/**
 * FFT Frequency Analyzer
 * Renders real-time frequency spectrum from the Master Bus.
 */

import { engine } from '../core/audioBus.js';

export class FFTAnalyzer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.render();
    }

    render() {
        if (!engine.isInitialized || !engine.analyser) {
            requestAnimationFrame(() => this.render());
            return;
        }

        const bufferLength = engine.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        engine.analyser.getByteFrequencyData(dataArray);

        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.clearRect(0, 0, width, height);

        const barWidth = (width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * height;

            this.ctx.fillStyle = `rgb(0, ${dataArray[i] + 100}, 65)`;
            this.ctx.fillRect(x, height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }

        requestAnimationFrame(() => this.render());
    }
}
