/**
 * SPH Mathematical Kernels and SPH Engine logic
 * Smoothed Particle Hydrodynamics (SPH)
 */

class SPHSim {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        // Physics Parameters
        this.h = 24.0;             // Smoothing radius
        this.gravity = 981.0;      // Gravity constant
        this.dt = 0.016;           // Time step
        this.rho0 = 1.0;           // Rest density
        this.k = 2000.0;           // Gas constant (stiffness)
        this.mu = 200.0;           // Viscosity
        this.mass = 1.0;           // Particle mass

        this.particles = [];
        this.spatialGrid = null;   // Set by caller

        // Kernel Pre-calculated Constants
        this.POLY6 = 315.0 / (64.0 * Math.PI * Math.pow(this.h, 9));
        this.SPIKY_GRAD = -45.0 / (Math.PI * Math.pow(this.h, 6));
        this.VISC_LAP = 45.0 / (Math.PI * Math.pow(this.h, 6));
    }

    addParticle(x, y) {
        this.particles.push({
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            rho: 0,
            p: 0,
            id: this.particles.length
        });
    }

    // Poly6 Kernel for Density
    W_poly6(r2) {
        const h2 = this.h * this.h;
        if (r2 < 0 || r2 > h2) return 0;
        const diff = h2 - r2;
        return this.POLY6 * diff * diff * diff;
    }

    // Spiky Kernel Gradient for Pressure
    W_spiky_grad(r, diffX, diffY) {
        if (r <= 0 || r > this.h) return { x: 0, y: 0 };
        const coeff = this.SPIKY_GRAD * Math.pow(this.h - r, 2) / r;
        return {
            x: coeff * diffX,
            y: coeff * diffY
        };
    }

    // Viscosity Kernel Laplacian
    W_visc_lap(r) {
        if (r <= 0 || r > this.h) return 0;
        return this.VISC_LAP * (this.h - r);
    }

    computeDensityPressure() {
        for (let i = 0; i < this.particles.length; i++) {
            const pi = this.particles[i];
            pi.rho = 0;

            // Get neighbors via spatial grid
            const neighbors = this.spatialGrid.getNeighbors(pi.x, pi.y, this.h);

            for (const pj of neighbors) {
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const r2 = dx * dx + dy * dy;

                pi.rho += this.mass * this.W_poly6(r2);
            }

            // Equation of State (Tait equation simplification)
            pi.p = this.k * (pi.rho - this.rho0);
        }
    }

    computeForces() {
        for (let i = 0; i < this.particles.length; i++) {
            const pi = this.particles[i];
            let fpx = 0, fpy = 0; // Pressure force
            let fvx = 0, fvy = 0; // Viscosity force

            const neighbors = this.spatialGrid.getNeighbors(pi.x, pi.y, this.h);

            for (const pj of neighbors) {
                if (pi === pj) continue;

                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const r = Math.sqrt(dx * dx + dy * dy);

                if (r < this.h) {
                    // Pressure force
                    const grad = this.W_spiky_grad(r, dx, dy);
                    const pTerm = -(this.mass * (pi.p + pj.p) / (2 * pj.rho));
                    fpx += pTerm * grad.x;
                    fpy += pTerm * grad.y;

                    // Viscosity force
                    const lap = this.W_visc_lap(r);
                    const vTerm = this.mu * this.mass * lap / pj.rho;
                    fvx += vTerm * (pj.vx - pi.vx);
                    fvy += vTerm * (pj.vy - pi.vy);
                }
            }

            const fgx = 0;
            const fgy = this.gravity * pi.rho;

            pi.ax = (fpx + fvx + fgx) / pi.rho;
            pi.ay = (fpy + fvy + fgy) / pi.rho;
        }
    }

    integrate() {
        for (const p of this.particles) {
            // Forward Euler
            p.vx += p.ax * this.dt;
            p.vy += p.ay * this.dt;
            p.x += p.vx * this.dt;
            p.y += p.vy * this.dt;

            // Boundary Conditions (Simple damping)
            const margin = 10;
            const damping = -0.5;

            if (p.x < margin) {
                p.x = margin;
                p.vx *= damping;
            } else if (p.x > this.width - margin) {
                p.x = this.width - margin;
                p.vx *= damping;
            }

            if (p.y < margin) {
                p.y = margin;
                p.vy *= damping;
            } else if (p.y > this.height - margin) {
                p.y = this.height - margin;
                p.vy *= damping;
            }
        }
    }

    step() {
        this.spatialGrid.update(this.particles);
        this.computeDensityPressure();
        this.computeForces();
        this.integrate();
    }
}
