/**
 * Bloch Sphere 3D Projection
 * Visualizes the state of a single qubit as a point on a sphere.
 */

export class BlochSphere {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.state = { theta: 0, phi: 0 };
        this.setup();
        this.animate();
    }

    setup() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
    }

    /**
     * Update state based on amplitudes alpha and beta:
     * |Ψ> = alpha|0> + beta|1>
     * theta = 2 * acos(|alpha|)
     * phi = angle(beta) - angle(alpha)
     */
    update(alpha, beta) {
        this.state.theta = 2 * Math.acos(Math.min(1, alpha.mag()));
        this.state.phi = beta.phase() - alpha.phase();
    }

    project(theta, phi) {
        const r = 100;
        // Spherical to Cartesian
        const x = r * Math.sin(theta) * Math.cos(phi);
        const y = r * Math.sin(theta) * Math.sin(phi);
        const z = r * Math.cos(theta);

        // Simple 3D projection
        const scale = 300 / (300 + y);
        return {
            px: this.canvas.width / 2 + x * scale,
            py: this.canvas.height / 2 - z * scale,
            scale: scale
        };
    }

    animate() {
        const ctx = this.ctx;
        const { width, height } = this.canvas;
        ctx.clearRect(0, 0, width, height);

        // Draw Sphere wiredframe (Circles)
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 1;

        ctx.beginPath(); ctx.ellipse(width / 2, height / 2, 100, 100, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(width / 2, height / 2, 100, 30, 0, 0, Math.PI * 2); ctx.stroke();

        // Draw Axes
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2 - 120); ctx.lineTo(width / 2, height / 2 + 120); // Z
        ctx.stroke();

        // Draw State Vector
        const p = this.project(this.state.theta, this.state.phi);

        ctx.strokeStyle = '#00f2fe';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(p.px, p.py);
        ctx.stroke();

        // Draw Tip
        ctx.fillStyle = '#8e2de2';
        ctx.beginPath();
        ctx.arc(p.px, p.py, 5 * p.scale, 0, Math.PI * 2);
        ctx.fill();

        requestAnimationFrame(() => this.animate());
    }
}

export const bloch = new BlochSphere('bloch-canvas');
