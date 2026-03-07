/**
 * Main Application Core
 * Orchestrates simulation, UI, and input
 */

class FluidApp {
    constructor() {
        this.canvas = document.getElementById('sim-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();

        this.sim = new SPHSim(this.width, this.height);
        this.grid = new SpatialGrid(this.width, this.height, this.sim.h);
        this.sim.spatialGrid = this.grid;

        this.renderer = new FluidRenderer(this.ctx, this.width, this.height);
        this.obstacles = new ObstacleSystem();

        this.isPaused = false;
        this.currentTool = 'water';
        this.isMouseDown = false;

        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        this.setupEvents();
        this.loop();

        // Initial particles
        this.spawnBlock(200, 200, 15, 15);
    }

    resize() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        if (this.renderer) {
            this.renderer.width = this.width;
            this.renderer.height = this.height;
        }
    }

    spawnBlock(startX, startY, countX, countY) {
        const spacing = 10;
        for (let ix = 0; ix < countX; ix++) {
            for (let iy = 0; iy < countY; iy++) {
                this.sim.addParticle(startX + ix * spacing, startY + iy * spacing);
            }
        }
    }

    setupEvents() {
        this.canvas.addEventListener('mousedown', (e) => {
            this.isMouseDown = true;
            this.handleInput(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (this.isMouseDown) this.handleInput(e);
        });

        window.addEventListener('mouseup', () => {
            this.isMouseDown = false;
        });

        // Tool Selection
        document.querySelectorAll('.tool-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentTool = btn.dataset.tool;
            };
        });

        // Vis checkboxes
        document.getElementById('check-metaball').onchange = (e) => this.renderer.config.metaball = e.target.checked;
        document.getElementById('check-heatmap').onchange = (e) => this.renderer.config.heatmap = e.target.checked;
        document.getElementById('check-vectors').onchange = (e) => this.renderer.config.vectors = e.target.checked;

        document.getElementById('btn-pause').onclick = () => {
            this.isPaused = !this.isPaused;
            document.getElementById('btn-pause').textContent = this.isPaused ? 'Resume Sim' : 'Pause Sim';
        };

        document.getElementById('btn-reset').onclick = () => {
            this.sim.particles = [];
            this.obstacles.obstacles = [];
        };

        document.getElementById('btn-save').onclick = () => {
            SimulationExporter.save(this.sim, this.obstacles.obstacles);
        };

        document.getElementById('btn-load').onclick = () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = (e) => {
                SimulationExporter.load(e.target.files[0], (state) => {
                    this.sim.particles = state.particles.map((p, idx) => ({
                        ...p,
                        ax: 0,
                        ay: 0,
                        rho: 0,
                        p: 0,
                        id: idx
                    }));
                    this.obstacles.obstacles = state.obstacles;
                    this.sim.mu = state.params.viscosity;
                    this.sim.rho0 = state.params.density;
                    this.sim.k = state.params.k;

                    // Update UI to custom
                    document.getElementById('fluid-preset').value = 'custom';
                    document.querySelector('.custom-params').classList.remove('hidden');
                });
            };
            input.click();
        };

        // Presets
        const presetSelect = document.getElementById('fluid-preset');
        const customParams = document.querySelector('.custom-params');

        presetSelect.onchange = (e) => {
            const val = e.target.value;
            if (val === 'custom') {
                customParams.classList.remove('hidden');
            } else {
                customParams.classList.add('hidden');
                if (val === 'water') {
                    this.sim.mu = 200.0;
                    this.sim.rho0 = 1.0;
                    this.sim.k = 2000.0;
                } else if (val === 'honey') {
                    this.sim.mu = 2000.0;
                    this.sim.rho0 = 1.2;
                    this.sim.k = 1000.0;
                } else if (val === 'oil') {
                    this.sim.mu = 100.0;
                    this.sim.rho0 = 0.8;
                    this.sim.k = 2500.0;
                }
            }
        };

        // Sliders
        document.getElementById('param-visc').oninput = (e) => {
            this.sim.mu = parseFloat(e.target.value) * 10;
        };
        document.getElementById('param-tension').oninput = (e) => {
            // Surface tension isn't directly in the simplified SPH yet, 
            // but we can map it to stiffness k for demo purposes
            this.sim.k = 1000 + parseFloat(e.target.value) * 100;
        };
        document.getElementById('param-density').oninput = (e) => {
            this.sim.rho0 = parseFloat(e.target.value) / 25.0;
        };
    }

    handleInput(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.currentTool === 'water') {
            this.sim.addParticle(x, y);
        } else if (this.currentTool === 'obstacle') {
            // Simple: add a circle obstacle at click
            if (this.isMouseDown && !this.lastObSpawn) {
                this.obstacles.addCircle(x, y, 20);
                this.lastObSpawn = true;
                setTimeout(() => this.lastObSpawn = false, 200);
            }
        } else if (this.currentTool === 'gravity') {
            // Apply force towards mouse for all particles
            for (const p of this.sim.particles) {
                const dx = x - p.x;
                const dy = y - p.y;
                const dist2 = dx * dx + dy * dy;
                if (dist2 < 40000) {
                    const dist = Math.sqrt(dist2);
                    p.vx += (dx / dist) * 10;
                    p.vy += (dy / dist) * 10;
                }
            }
        }
    }

    loop() {
        const start = performance.now();

        if (!this.isPaused) {
            this.sim.step();
            this.obstacles.resolveCollisions(this.sim.particles);
        }

        this.renderer.render(this.sim.particles, this.obstacles.obstacles);

        const end = performance.now();

        // Update Stats
        document.getElementById('fps-val').textContent = Math.round(1000 / (end - start));
        document.getElementById('part-val').textContent = this.sim.particles.length;
        document.getElementById('time-val').textContent = (end - start).toFixed(2) + 'ms';

        requestAnimationFrame(() => this.loop());
    }
}

// Start App
window.onload = () => new FluidApp();
