/**
 * Time-Domain Oscilloscope
 * Renders the audio waveform in real-time.
 */

import { engine } from '../core/audioBus.js';

export class Oscilloscope {
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

        const bufferLength = engine.analyser.fftSize;
        const dataArray = new Uint8Array(bufferLength);
        engine.analyser.getByteTimeDomainData(dataArray);

        const width = this.canvas.width;
        const height = this.canvas.height;
        this.ctx.clearRect(0, 0, width, height);

        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#00ff41';
        this.ctx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * height) / 2;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.ctx.lineTo(width, height / 2);
        this.ctx.stroke();

        requestAnimationFrame(() => this.render());
    }
}
