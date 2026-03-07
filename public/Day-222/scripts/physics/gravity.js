/**
 * Gravitational Physics Engine
 * Implements N-body simulation with RK4 integration and quad-tree optimization
 */

import { RK4Integrator, Vector2D } from '../math/rk4.js';
import { QuadTree } from './spatial.js';
import { TrailRenderer } from '../render/trace.js';
import { GlowRenderer } from '../render/glow.js';

export class CelestialBody {
    constructor(x, y, vx, vy, mass, radius, color) {
        this.position = { x, y };
        this.velocity = { x: vx, y: vy };
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.id = Math.random().toString(36).substr(2, 9);
        this.trail = [];
        this.maxTrailLength = 500;
    }

    addToTrail() {
        this.trail.push({ x: this.position.x, y: this.position.y });
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    kineticEnergy() {
        const vSq = this.velocity.x ** 2 + this.velocity.y ** 2;
        return 0.5 * this.mass * vSq;
    }
}

export class Simulation {
    constructor() {
        this.bodies = [];
        this.G = 6.674e-11; // Gravitational constant (scaled for visualization)
        this.softening = 1;
        this.timeScale = 1.0;
        this.substeps = 1;
        this.time = 0;
        this.dt = 0.016; // ~60 FPS
        this.paused = true;
        this.useQuadTree = true;
        this.theta = 0.5; // Barnes-Hut threshold

        // Canvas setup
        this.mainCanvas = document.getElementById('main-canvas');
        this.trailCanvas = document.getElementById('trail-canvas');
        this.glowCanvas = document.getElementById('glow-canvas');

        this.mainCtx = this.mainCanvas.getContext('2d');
        this.trailCtx = this.trailCanvas.getContext('2d');
        this.glowCtx = this.glowCanvas.getContext('2d');

        // Renderers
        this.trailRenderer = new TrailRenderer(this.trailCtx);
        this.glowRenderer = new GlowRenderer(this.glowCtx);

        // Settings
        this.settings = {
            showTrails: true,
            showGlow: true,
            showGrid: false,
            showVectors: false
        };

        this.selectedBody = null;
        this.fps = 60;
        this.lastFrameTime = performance.now();

        this.setupCanvas();
        this.setupEventListeners();
        this.setupUI();
        this.animate();
    }

    setupCanvas() {
        const resize = () => {
            const container = this.mainCanvas.parentElement;
            this.mainCanvas.width = container.clientWidth;
            this.mainCanvas.height = container.clientHeight;
            this.trailCanvas.width = container.clientWidth;
            this.trailCanvas.height = container.clientHeight;
            this.glowCanvas.width = container.clientWidth;
            this.glowCanvas.height = container.clientHeight;
        };
        resize();
        window.addEventListener('resize', resize);
    }

    setupEventListeners() {
        this.mainCanvas.addEventListener('click', (e) => this.handleClick(e));
        this.mainCanvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    }

    setupUI() {
        document.getElementById('btn-play').addEventListener('click', () => this.start());
        document.getElementById('btn-pause').addEventListener('click', () => this.pause());
        document.getElementById('btn-reset').addEventListener('click', () => this.reset());

        // Preset scenarios
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.loadPreset(btn.dataset.preset));
        });

        // Settings toggles
        document.getElementById('toggle-trails').addEventListener('change', (e) => {
            this.settings.showTrails = e.target.checked;
        });
        document.getElementById('toggle-glow').addEventListener('change', (e) => {
            this.settings.showGlow = e.target.checked;
        });
        document.getElementById('toggle-grid').addEventListener('change', (e) => {
            this.settings.showGrid = e.target.checked;
        });
        document.getElementById('toggle-vectors').addEventListener('change', (e) => {
            this.settings.showVectors = e.target.checked;
        });

        // Time controls
        document.getElementById('slider-timescale').addEventListener('input', (e) => {
            this.timeScale = parseFloat(e.target.value);
            document.getElementById('timescale-value').textContent = this.timeScale.toFixed(1) + 'x';
            document.getElementById('timestep-display').textContent = this.timeScale.toFixed(1) + 'x';
        });

        document.getElementById('slider-substeps').addEventListener('input', (e) => {
            this.substeps = parseInt(e.target.value);
            document.getElementById('substeps-value').textContent = this.substeps;
        });

        // Physics parameters
        document.getElementById('input-gravity').addEventListener('change', (e) => {
            this.G = parseFloat(e.target.value) * 1e-11;
        });

        document.getElementById('input-softening').addEventListener('change', (e) => {
            this.softening = parseFloat(e.target.value);
        });

        // Add body
        document.getElementById('btn-add-body').addEventListener('click', () => {
            const mass = parseFloat(document.getElementById('input-mass').value) * 1e24;
            const radius = parseFloat(document.getElementById('input-radius').value);
            const color = document.getElementById('input-color').value;

            // Add at center with random velocity
            const cx = this.mainCanvas.width / 2;
            const cy = this.mainCanvas.height / 2;
            const vx = (Math.random() - 0.5) * 50;
            const vy = (Math.random() - 0.5) * 50;

            this.addBody(new CelestialBody(cx, cy, vx, vy, mass, radius, color));
        });
    }

    addBody(body) {
        this.bodies.push(body);
        this.updateBodyCount();
    }

    updateBodyCount() {
        document.getElementById('body-count').textContent = this.bodies.length;
    }

    start() {
        this.paused = false;
        document.getElementById('btn-play').disabled = true;
        document.getElementById('btn-pause').disabled = false;
    }

    pause() {
        this.paused = true;
        document.getElementById('btn-play').disabled = false;
        document.getElementById('btn-pause').disabled = true;
    }

    reset() {
        this.bodies = [];
        this.time = 0;
        this.selectedBody = null;
        this.updateBodyCount();
        this.clearTrails();
        this.pause();
    }

    clearTrails() {
        this.trailCtx.clearRect(0, 0, this.trailCanvas.width, this.trailCanvas.height);
        this.bodies.forEach(b => b.trail = []);
    }

    loadPreset(preset) {
        this.reset();
        const cx = this.mainCanvas.width / 2;
        const cy = this.mainCanvas.height / 2;

        switch (preset) {
            case 'binary':
                this.addBody(new CelestialBody(cx - 100, cy, 0, 30, 2e30, 15, '#ffaa00'));
                this.addBody(new CelestialBody(cx + 100, cy, 0, -30, 2e30, 15, '#00aaff'));
                break;
            case 'triple':
                this.addBody(new CelestialBody(cx, cy - 100, 40, 0, 1.5e30, 12, '#ff6b35'));
                this.addBody(new CelestialBody(cx - 87, cy + 50, -20, -35, 1.5e30, 12, '#00d9ff'));
                this.addBody(new CelestialBody(cx + 87, cy + 50, -20, 35, 1.5e30, 12, '#00ff88'));
                break;
            case 'solar':
                // Sun
                this.addBody(new CelestialBody(cx, cy, 0, 0, 1.989e30, 20, '#ffcc00'));
                // Earth-like
                this.addBody(new CelestialBody(cx + 150, cy, 0, 50, 5.972e24, 6, '#4a9eff'));
                // Mars-like
                this.addBody(new CelestialBody(cx + 230, cy, 0, 40, 6.39e23, 4, '#ff6b35'));
                break;
            case 'chaos':
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2;
                    const dist = 150;
                    const x = cx + Math.cos(angle) * dist;
                    const y = cy + Math.sin(angle) * dist;
                    const vx = -Math.sin(angle) * 40;
                    const vy = Math.cos(angle) * 40;
                    this.addBody(new CelestialBody(x, y, vx, vy, 1e29, 8, `hsl(${i * 45}, 80%, 60%)`));
                }
                break;
            case 'galaxy':
                // Central black hole
                this.addBody(new CelestialBody(cx, cy, 0, 0, 1e31, 10, '#ffffff'));
                // Spiral arms
                for (let i = 0; i < 50; i++) {
                    const angle = (i / 50) * Math.PI * 4;
                    const dist = 50 + i * 3;
                    const x = cx + Math.cos(angle) * dist;
                    const y = cy + Math.sin(angle) * dist;
                    const speed = Math.sqrt(this.G * 1e31 / dist) * 0.8;
                    const vx = -Math.sin(angle) * speed;
                    const vy = Math.cos(angle) * speed;
                    this.addBody(new CelestialBody(x, y, vx, vy, 1e27, 3, `hsl(${200 + i * 2}, 70%, 60%)`));
                }
                break;
        }
    }

    computeAcceleration(body, allBodies) {
        if (this.useQuadTree && allBodies.length > 10) {
            // Use quad-tree for optimization
            const boundary = {
                x: 0,
                y: 0,
                width: this.mainCanvas.width,
                height: this.mainCanvas.height
            };
            const tree = new QuadTree(boundary);
            allBodies.forEach(b => tree.insert(b));

            const force = tree.calculateForce(body, this.theta, this.G, this.softening);
            return {
                x: force.x / body.mass,
                y: force.y / body.mass
            };
        } else {
            // Direct N² calculation
            let ax = 0, ay = 0;
            for (const other of allBodies) {
                if (other === body) continue;

                const dx = other.position.x - body.position.x;
                const dy = other.position.y - body.position.y;
                const distSq = dx * dx + dy * dy + this.softening * this.softening;
                const dist = Math.sqrt(distSq);

                const force = this.G * other.mass / distSq;
                ax += force * dx / dist;
                ay += force * dy / dist;
            }
            return { x: ax, y: ay };
        }
    }

    update() {
        if (this.paused) return;

        const effectiveDt = this.dt * this.timeScale / this.substeps;

        for (let step = 0; step < this.substeps; step++) {
            // RK4 integration for each body
            const newStates = this.bodies.map(body => {
                const derivative = (t, state) => {
                    const tempBody = { ...body, position: state.position, velocity: state.velocity };
                    const acc = this.computeAcceleration(tempBody, this.bodies);
                    return {
                        velocity: state.velocity,
                        acceleration: acc
                    };
                };

                const state = {
                    position: { ...body.position },
                    velocity: { ...body.velocity }
                };

                return RK4Integrator.integrate(derivative, this.time, state, effectiveDt);
            });

            // Update all bodies
            this.bodies.forEach((body, i) => {
                body.position = newStates[i].position;
                body.velocity = newStates[i].velocity;
            });

            this.time += effectiveDt;
        }

        // Update trails
        this.bodies.forEach(body => body.addToTrail());

        // Update energy display
        this.updateEnergyDisplay();
    }

    updateEnergyDisplay() {
        let kineticEnergy = 0;
        let potentialEnergy = 0;

        this.bodies.forEach(body => {
            kineticEnergy += body.kineticEnergy();
        });

        for (let i = 0; i < this.bodies.length; i++) {
            for (let j = i + 1; j < this.bodies.length; j++) {
                const dx = this.bodies[j].position.x - this.bodies[i].position.x;
                const dy = this.bodies[j].position.y - this.bodies[i].position.y;
                const dist = Math.sqrt(dx * dx + dy * dy + this.softening * this.softening);
                potentialEnergy -= this.G * this.bodies[i].mass * this.bodies[j].mass / dist;
            }
        }

        document.getElementById('energy-kinetic').textContent = kineticEnergy.toExponential(2);
        document.getElementById('energy-potential').textContent = potentialEnergy.toExponential(2);
        document.getElementById('energy-total').textContent = (kineticEnergy + potentialEnergy).toExponential(2);
    }

    render() {
        // Clear main canvas
        this.mainCtx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

        // Render trails
        if (this.settings.showTrails) {
            this.trailRenderer.render(this.bodies);
        }

        // Render glow
        if (this.settings.showGlow) {
            this.glowRenderer.render(this.bodies);
        }

        // Render grid
        if (this.settings.showGrid) {
            this.renderGrid();
        }

        // Render bodies
        this.bodies.forEach(body => {
            this.mainCtx.fillStyle = body.color;
            this.mainCtx.beginPath();
            this.mainCtx.arc(body.position.x, body.position.y, body.radius, 0, Math.PI * 2);
            this.mainCtx.fill();

            // Highlight selected
            if (body === this.selectedBody) {
                this.mainCtx.strokeStyle = '#00ff88';
                this.mainCtx.lineWidth = 2;
                this.mainCtx.stroke();
            }

            // Velocity vectors
            if (this.settings.showVectors) {
                this.mainCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                this.mainCtx.lineWidth = 1;
                this.mainCtx.beginPath();
                this.mainCtx.moveTo(body.position.x, body.position.y);
                this.mainCtx.lineTo(
                    body.position.x + body.velocity.x,
                    body.position.y + body.velocity.y
                );
                this.mainCtx.stroke();
            }
        });
    }

    renderGrid() {
        const boundary = {
            x: 0,
            y: 0,
            width: this.mainCanvas.width,
            height: this.mainCanvas.height
        };
        const tree = new QuadTree(boundary);
        this.bodies.forEach(b => tree.insert(b));
        tree.draw(this.mainCtx);
    }

    animate() {
        this.update();
        this.render();

        // FPS counter
        const now = performance.now();
        this.fps = Math.round(1000 / (now - this.lastFrameTime));
        this.lastFrameTime = now;
        document.getElementById('fps-counter').textContent = this.fps;

        requestAnimationFrame(() => this.animate());
    }

    handleClick(e) {
        const rect = this.mainCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.selectedBody = null;
        for (const body of this.bodies) {
            const dist = Math.sqrt((x - body.position.x) ** 2 + (y - body.position.y) ** 2);
            if (dist < body.radius + 5) {
                this.selectedBody = body;
                this.updateInspector();
                break;
            }
        }

        if (!this.selectedBody) {
            document.getElementById('body-inspector').innerHTML = '<p class="placeholder">Click on a body to inspect</p>';
        }
    }

    handleMouseMove(e) {
        // Tooltip logic could go here
    }

    updateInspector() {
        if (!this.selectedBody) return;

        const b = this.selectedBody;
        const speed = Math.sqrt(b.velocity.x ** 2 + b.velocity.y ** 2);

        document.getElementById('body-inspector').innerHTML = `
            <dl>
                <dt>Mass:</dt>
                <dd>${(b.mass / 1e24).toFixed(2)} × 10²⁴ kg</dd>
                <dt>Position:</dt>
                <dd>(${b.position.x.toFixed(1)}, ${b.position.y.toFixed(1)})</dd>
                <dt>Velocity:</dt>
                <dd>${speed.toFixed(2)} px/s</dd>
                <dt>Kinetic Energy:</dt>
                <dd>${b.kineticEnergy().toExponential(2)} J</dd>
            </dl>
        `;
    }
}
