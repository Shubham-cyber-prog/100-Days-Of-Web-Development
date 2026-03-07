/**
 * AudioBus: Master Context & Signal Orchestration
 * Manages the Web Audio API lifecycle and global routing.
 */

class AudioBus {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.analyser = null;
        this.isInitialized = false;
    }

    async init() {
        if (this.isInitialized) return;

        // Create Audio Context
        this.ctx = new (window.AudioContext || window.webkitAudioContext)({
            latencyHint: 'interactive',
            sampleRate: 44100,
        });

        // Master Chain
        this.masterGain = this.ctx.createGain();
        this.analyser = this.ctx.createAnalyser();
        this.analyser.fftSize = 2048;

        // Routing: Master Gain -> Analyser -> Destination
        this.masterGain.connect(this.analyser);
        this.analyser.connect(this.ctx.destination);

        // Resume context on user action (managed by UI)
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }

        this.isInitialized = true;
        this.log('Signal engine initialized at 44.1kHz');
    }

    get context() {
        return this.ctx;
    }

    get destination() {
        return this.masterGain;
    }

    log(message) {
        const logContent = document.getElementById('log-output');
        if (logContent) {
            const entry = document.createElement('p');
            entry.textContent = `> [${new Date().toLocaleTimeString()}] ${message}`;
            logContent.appendChild(entry);
            logContent.scrollTop = logContent.scrollHeight;
        }
    }

    updateVU() {
        if (!this.analyser) return 0;
        const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        return average / 128; // Normalize to 0-2 (roughly)
    }
}

export const engine = new AudioBus();

// VU Meter animation loop
function animateVU() {
    const fill = document.querySelector('.vumeter-fill');
    if (fill && engine.isInitialized) {
        const level = engine.updateVU();
        fill.style.width = `${Math.min(level * 100, 100)}%`;
    }
    requestAnimationFrame(animateVU);
}
animateVU();
