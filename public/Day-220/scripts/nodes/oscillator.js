/**
 * Oscillator Node Implementation
 * Handles signal generation with custom waveform types.
 */

import { engine } from '../core/audioBus.js';

export class OscillatorNodeWrapper {
    constructor(type = 'sine', frequency = 440) {
        this.ctx = engine.context;
        this.node = this.ctx.createOscillator();
        this.gainNode = this.ctx.createGain();

        this.node.type = type;
        this.node.frequency.value = frequency;
        this.gainNode.gain.value = 0.5;

        this.node.connect(this.gainNode);
        this.isPlaying = false;

        // For phase-accumulation visualization/math logic (theoretical)
        this.phase = 0;
        this.sampleRate = this.ctx.sampleRate;
    }

    start() {
        if (!this.isPlaying) {
            this.node.start();
            this.isPlaying = true;
        }
    }

    stop() {
        if (this.isPlaying) {
            this.node.stop();
            this.isPlaying = false;
        }
    }

    setFrequency(freq) {
        this.node.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.03);
    }

    setType(type) {
        this.node.type = type;
    }

    setGain(val) {
        this.gainNode.gain.setTargetAtTime(val, this.ctx.currentTime, 0.03);
    }

    connect(target) {
        this.gainNode.connect(target);
    }

    disconnect() {
        this.gainNode.disconnect();
    }

    /**
     * Theoretical Phase Accumulation Logic:
     * function getNextSample(freq) {
     *    const increment = (2 * Math.PI * freq) / sampleRate;
     *    phase += increment;
     *    if (phase > 2 * Math.PI) phase -= 2 * Math.PI;
     *    return Math.sin(phase);
     * }
     */
}
