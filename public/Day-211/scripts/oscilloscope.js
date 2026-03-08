/**
 * Oscilloscope Visualization
 */

class Oscilloscope {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.data = [];
        this.maxLength = 200;
        this.targetPin = null;
        this.isActive = false;

        this.init();
    }

    init() {
        this.animate();
    }

    setTarget(pin) {
        this.targetPin = pin;
        this.data = [];
        this.isActive = true;
        document.getElementById('oscilloscope-panel').classList.remove('hidden');
    }

    addSample() {
        if (!this.isActive || !this.targetPin) return;

        this.data.push(this.targetPin.state);
        if (this.data.length > this.maxLength) {
            this.data.shift();
        }
    }

    render() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;

        ctx.fillStyle = '#05070a';
        ctx.fillRect(0, 0, w, h);

        // Grid
        ctx.strokeStyle = '#1a1f26';
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
        }
        for (let j = 0; j < h; j += 40) {
            ctx.beginPath(); ctx.moveTo(0, j); ctx.lineTo(w, j); ctx.stroke();
        }

        if (this.data.length < 2) return;

        // Waveform
        ctx.strokeStyle = '#00ff88';
        ctx.lineWidth = 2;
        ctx.beginPath();

        const step = w / this.maxLength;
        const midY = h / 2;
        const amp = h / 3;

        this.data.forEach((val, i) => {
            const x = i * step;
            const y = val === 1 ? midY - amp : midY + amp;

            if (i === 0) ctx.moveTo(x, y);
            else {
                // Square wave step
                const prevX = (i - 1) * step;
                const prevVal = this.data[i - 1];
                const prevY = prevVal === 1 ? midY - amp : midY + amp;

                ctx.lineTo(x, prevY);
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ff88';
        ctx.stroke();
        ctx.shadowBlur = 0;
    }

    animate() {
        this.addSample();
        this.render();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.oscilloscope = new Oscilloscope('osc-canvas');

    document.getElementById('close-osc').onclick = () => {
        document.getElementById('oscilloscope-panel').classList.add('hidden');
        window.oscilloscope.isActive = false;
    };
});

// Hook into interaction to allow "Attach Scope"
// We'll update interaction.js or add a context menu item
