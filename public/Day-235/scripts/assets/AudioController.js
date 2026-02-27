export default class AudioController {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playKeypress() {
        this.beep(1200, 0.05, 'square');
    }

    playAction(type) {
        if (type === 'ATTACK') this.beep(200, 0.2, 'sawtooth');
        else if (type === 'HEAL') this.beep(1000, 0.3, 'sine');
        else this.beep(600, 0.1, 'triangle');
    }

    beep(freq, duration, type) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}
