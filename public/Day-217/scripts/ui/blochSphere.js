/**
 * 3D-projection visualizer for single-qubit states
 */

class BlochSphere {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.radius = 80;
    }

    draw(state) {
        let ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        let cx = this.width / 2;
        let cy = this.height / 2;

        // Draw Sphere (Circle)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Axes
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(cx - this.radius, cy);
        ctx.lineTo(cx + this.radius, cy); // X-axis
        ctx.moveTo(cx, cy - this.radius);
        ctx.lineTo(cx, cy + this.radius); // Z-axis
        ctx.stroke();
        ctx.setLineDash([]);

        // Calculate Bloch Vector (x, y, z)
        // |psi> = cos(theta/2)|0> + exp(i*phi)sin(theta/2)|1>
        // x = sin(theta)cos(phi)
        // y = sin(theta)sin(phi)
        // z = cos(theta)

        // From state amplitudes a|0> + b|1>
        let a = state[0];
        let b = state[1];

        // z = |a|^2 - |b|^2
        let z = Math.pow(a.mag(), 2) - Math.pow(b.mag(), 2);
        // x = 2 * Re(a* * b)
        let x = 2 * (a.re * b.re + a.im * b.im);
        // y = 2 * Im(a* * b)
        let y = 2 * (a.re * b.im - a.im * b.re);

        // Project 3D vector (x, y, z) to 2D
        // Standard isometric-ish projection
        let px = cx + x * this.radius;
        let py = cy - z * this.radius;

        // Draw Vector
        ctx.strokeStyle = "#00d2ff";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00d2ff";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(px, py);
        ctx.stroke();

        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

window.BlochSphere = BlochSphere;
