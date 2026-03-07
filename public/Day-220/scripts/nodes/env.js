/**
 * ADSR Envelope Implementation
 * Manages Attack, Decay, Sustain, and Release signal modulation.
 */

import { engine } from '../core/audioBus.js';

export class EnvelopeNodeWrapper {
    constructor() {
        this.ctx = engine.context;
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0;

        this.settings = {
            attack: 0.1,
            decay: 0.2,
            sustain: 0.5,
            release: 0.5
        };
    }

    trigger() {
        const now = this.ctx.currentTime;
        const { attack, decay, sustain } = this.settings;

        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(0, now);

        // Attack
        this.gainNode.gain.linearRampToValueAtTime(1, now + attack);

        // Decay to Sustain
        this.gainNode.gain.exponentialRampToValueAtTime(sustain + 0.001, now + attack + decay);
    }

    release() {
        const now = this.ctx.currentTime;
        const { release } = this.settings;

        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, now + release);
        this.gainNode.gain.setValueAtTime(0, now + release + 0.01);
    }

    setParam(name, value) {
        if (this.settings.hasOwnProperty(name)) {
            this.settings[name] = parseFloat(value);
        }
    }

    connect(target) {
        this.gainNode.connect(target);
    }

    disconnect() {
        this.gainNode.disconnect();
    }

    get input() {
        return this.gainNode;
    }
}
