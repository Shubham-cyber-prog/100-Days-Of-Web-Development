/**
 * Filter Node Implementation
 * Implements Biquad and Low-pass filter algorithms.
 */

import { engine } from '../core/audioBus.js';

export class FilterNodeWrapper {
    constructor(type = 'lowpass', cutoff = 2000, q = 1) {
        this.ctx = engine.context;
        this.node = this.ctx.createBiquadFilter();

        this.node.type = type;
        this.node.frequency.value = cutoff;
        this.node.Q.value = q;
    }

    setCutoff(freq) {
        this.node.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.03);
    }

    setResonance(val) {
        this.node.Q.setTargetAtTime(val, this.ctx.currentTime, 0.03);
    }

    setType(type) {
        this.node.type = type;
    }

    connect(target) {
        this.node.connect(target);
    }

    disconnect() {
        this.node.disconnect();
    }
}
