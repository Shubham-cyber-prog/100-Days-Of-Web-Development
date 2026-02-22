/**
 * SPH Fluid Simulator (Mueller et al. 2003)
 * Implements Navier-Stokes approximations for incompressible fluid flow.
 */

import { SpatialHash } from './spatial.js';
import { scene } from '../state/scene.js';

class SPHSimulator {
    constructor() {
        this.particles = [];
        this.params = {
            h: 16,            // Smoothing radius
            mass: 1.0,
            restDensity: 400,
            viscosity: 0.05,
            stiffness: 20,    // Gas constant (k)
            gravity: 0.5,
            dt: 0.16
        };

        this.hash = new SpatialHash(this.params.h);
        this.isRunning = false;
    }

    init() {
        this.spawnBlock(200, 100, 30, 40);
        this.loop();
    }

    spawnBlock(x, y, rows, cols) {
        const spacing = this.params.h / 1.5;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                this.particles.push({
                    x: x + j * spacing,
                    y: y + i * spacing,
                    vx: 0, vy: 0,
                    ax: 0, ay: 0,
                    rho: 0, pressure: 0,
                    neighbors: []
                });
            }
        }
    }

    update() {
        if (!this.isRunning) return;

        this.hash.clear();
        this.particles.forEach(p => this.hash.insert(p));

        const h = this.params.h;
        const h2 = h * h;
        const poly6 = 315 / (64 * Math.PI * Math.pow(h, 9));
        const spikyGrad = -45 / (Math.PI * Math.pow(h, 6));
        const viscLap = 45 / (Math.PI * Math.pow(h, 6));

        // 1. Calculate Density & Pressure
        this.particles.forEach(p => {
            p.neighbors = this.hash.getNeighbors(p, h);
            p.rho = 0;
            p.neighbors.forEach(n => {
                const r2 = (p.x - n.x) ** 2 + (p.y - n.y) ** 2;
                p.rho += this.params.mass * poly6 * Math.pow(h2 - r2, 3);
            });
            p.rho = Math.max(p.rho, this.params.restDensity);
            p.pressure = this.params.stiffness * (p.rho - this.params.restDensity);
        });

        // 2. Calculate Forces
        this.particles.forEach(p => {
            let fPresX = 0, fPresY = 0;
            let fViscX = 0, fViscY = 0;

            p.neighbors.forEach(n => {
                const dx = p.x - n.x;
                const dy = p.y - n.y;
                const r = Math.sqrt(dx * dx + dy * dy);
                const hMinusR = h - r;

                // Pressure Force
                const forceP = (p.pressure + n.pressure) / (2 * n.rho) * spikyGrad * hMinusR * hMinusR;
                fPresX += this.params.mass * forceP * (dx / r);
                fPresY += this.params.mass * forceP * (dy / r);

                // Viscosity Force
                const forceV = this.params.viscosity * viscLap * hMinusR;
                fViscX += this.params.mass * forceV * (n.vx - p.vx) / n.rho;
                fViscY += this.params.mass * forceV * (n.vy - p.vy) / n.rho;
            });

            p.ax = (-fPresX + fViscX) / p.rho;
            p.ay = (-fPresY + fViscY) / p.rho + this.params.gravity;
        });

        // 3. Integration & Constraints
        this.particles.forEach(p => {
            p.vx += p.ax * this.params.dt;
            p.vy += p.ay * this.params.dt;
            p.x += p.vx * this.params.dt;
            p.y += p.vy * this.params.dt;

            // Boundary Collisions
            const bounds = scene.getBounds();
            const damping = -0.5;

            if (p.x < bounds.left) { p.x = bounds.left; p.vx *= damping; }
            if (p.x > bounds.right) { p.x = bounds.right; p.vx *= damping; }
            if (p.y < bounds.top) { p.y = bounds.top; p.vy *= damping; }
            if (p.y > bounds.bottom) { p.y = bounds.bottom; p.vy *= damping; }
        });
    }

    loop() {
        this.update();
        window.dispatchEvent(new CustomEvent('sim-tick', { detail: { particles: this.particles } }));
        requestAnimationFrame(() => this.loop());
    }
}

export const simulator = new SPHSimulator();
