class MapEngine {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 64;
        this.height = 64;
        this.tileSize = 16;
        this.seed = Math.random().toString(36).substring(7);

        this.params = {
            noiseScale: 0.1,
            octaves: 4,
            persistence: 0.5,
            moistureScale: 0.08,
            erosionSteps: 2,
            caveIterations: 4,
            caveProbability: 0.45
        };

        this.layers = {
            elevation: null,
            moisture: null,
            caves: null,
            biomes: null,
            structures: []
        };

        this.view = {
            zoom: 1,
            offsetX: 0,
            offsetY: 0
        };

        this.init();
    }

    init() {
        this.resizeCanvas();
        this.generate();
        this.setupInteractions();
    }

    resizeCanvas() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
        this.render();
    }

    setupInteractions() {
        let isDragging = false;
        let lastX, lastY;

        this.canvas.addEventListener('mousedown', e => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
        });

        window.addEventListener('mousemove', e => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Coordinate tracking
            const worldX = Math.floor((mouseX - this.view.offsetX) / (this.tileSize * this.view.zoom));
            const worldY = Math.floor((mouseY - this.view.offsetY) / (this.tileSize * this.view.zoom));

            if (worldX >= 0 && worldX < this.width && worldY >= 0 && worldY < this.height) {
                document.getElementById('coord-display').textContent = `${worldX}:${worldY}`;
                const biome = this.layers.biomes[worldY][worldX];
                document.getElementById('biome-display').textContent = `Biome: ${biome.name}`;
            }

            if (!isDragging) return;
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            this.view.offsetX += dx;
            this.view.offsetY += dy;
            lastX = e.clientX;
            lastY = e.clientY;
            this.render();
        });

        window.addEventListener('mouseup', () => isDragging = false);

        this.canvas.addEventListener('wheel', e => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            this.view.zoom *= delta;
            this.view.zoom = Math.max(0.1, Math.min(10, this.view.zoom));
            this.render();
        }, { passive: false });
    }

    generate() {
        console.log(`Generating with seed: ${this.seed}`);
        const simplex = new SimplexNoise(this.seed);
        const moistureSimplex = new SimplexNoise(this.seed + '_moisture');
        const erosion = new ErosionSimulator(this.width, this.height);
        const automata = new CellularAutomata(this.width, this.height, this.params.caveProbability);

        // 1. Elevation
        let elevation = Array.from({ length: this.height }, (_, y) =>
            new Float32Array(this.width).map((_, x) =>
                (simplex.fractal(x, y, this.params.octaves, this.params.persistence, this.params.noiseScale) + 1) / 2
            )
        );

        // 2. Erosion & Rivers
        if (this.params.erosionSteps > 0) {
            elevation = erosion.smooth(elevation, this.params.erosionSteps);
            elevation = erosion.carveRivers(elevation, 5);
        }

        // 3. Moisture
        const moisture = Array.from({ length: this.height }, (_, y) =>
            new Float32Array(this.width).map((_, x) =>
                (moistureSimplex.fractal(x, y, 3, 0.5, this.params.moistureScale) + 1) / 2
            )
        );

        // 4. Biomes
        const biomes = Array.from({ length: this.height }, (_, y) =>
            Array.from({ length: this.width }, (_, x) =>
                BiomeSystem.getBiome(elevation[y][x], moisture[y][x])
            )
        );

        // 5. Caves
        const caves = automata.generate(this.params.caveIterations);

        // 6. Structures
        const structGen = new StructureGenerator(this.width, this.height);
        const structures = [
            ...structGen.generateCities(elevation, biomes, 3),
            ...structGen.generatePOIs(elevation, biomes, 5)
        ];

        this.layers = { elevation, moisture, caves, biomes, structures };
        this.render();
    }

    render() {
        if (!this.layers.biomes) return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();
        ctx.translate(this.view.offsetX, this.view.offsetY);
        ctx.scale(this.view.zoom, this.view.zoom);

        const ts = this.tileSize;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const biome = this.layers.biomes[y][x];
                const isCave = this.layers.caves[y][x] === 1;

                if (isCave) {
                    ctx.fillStyle = '#111111';
                } else {
                    ctx.fillStyle = biome.color;
                }

                ctx.fillRect(x * ts, y * ts, ts, ts);

                // Auto-tiling / Biome Borders Logic
                const mask = TileMapper.getTileMask(this.layers.caves, x, y, 1);
                if (isCave && mask !== 15) {
                    ctx.strokeStyle = '#444';
                    ctx.lineWidth = 1 / this.view.zoom;
                    if (!(mask & 1)) { ctx.beginPath(); ctx.moveTo(x * ts, y * ts); ctx.lineTo((x + 1) * ts, y * ts); ctx.stroke(); }
                    if (!(mask & 2)) { ctx.beginPath(); ctx.moveTo((x + 1) * ts, y * ts); ctx.lineTo((x + 1) * ts, (y + 1) * ts); ctx.stroke(); }
                    if (!(mask & 4)) { ctx.beginPath(); ctx.moveTo(x * ts, (y + 1) * ts); ctx.lineTo((x + 1) * ts, (y + 1) * ts); ctx.stroke(); }
                    if (!(mask & 8)) { ctx.beginPath(); ctx.moveTo(x * ts, y * ts); ctx.lineTo(x * ts, (y + 1) * ts); ctx.stroke(); }
                }

                // Add subtle shading based on elevation
                const e = this.layers.elevation[y][x];
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, e - 0.5) * 0.3})`;
                ctx.fillRect(x * ts, y * ts, ts, ts);
                ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0, 0.5 - e) * 0.3})`;
                ctx.fillRect(x * ts, y * ts, ts, ts);
            }
        }

        // Render Structures
        this.layers.structures.forEach(s => {
            ctx.fillStyle = s.type === 'city' ? '#ff4444' : '#ffcc00';
            const size = (s.size || 1) * ts;
            ctx.fillRect(s.x * ts - size / 2, s.y * ts - size / 2, size, size);

            // Subtle shadow/outline for structures
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            ctx.lineWidth = 1 / this.view.zoom;
            ctx.strokeRect(s.x * ts - size / 2, s.y * ts - size / 2, size, size);
        });

        ctx.restore();
        this.renderMiniMap();
    }

    renderMiniMap() {
        const miniMapSize = 150;
        const ctx = this.ctx;
        const padding = 20;

        ctx.save();
        ctx.translate(this.canvas.width - miniMapSize - padding, padding);
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(-2, -2, miniMapSize + 4, miniMapSize + 4);

        const scaleX = miniMapSize / this.width;
        const scaleY = miniMapSize / this.height;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                ctx.fillStyle = this.layers.biomes[y][x].color;
                ctx.fillRect(x * scaleX, y * scaleY, scaleX + 0.5, scaleY + 0.5);
            }
        }

        // Viewport rectangle
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        const vx = (-this.view.offsetX / (this.tileSize * this.view.zoom)) * scaleX;
        const vy = (-this.view.offsetY / (this.tileSize * this.view.zoom)) * scaleY;
        const vw = (this.canvas.width / (this.tileSize * this.view.zoom)) * scaleX;
        const vh = (this.canvas.height / (this.tileSize * this.view.zoom)) * scaleY;
        ctx.strokeRect(vx, vy, vw, vh);

        ctx.restore();
    }

    setParam(key, value) {
        this.params[key] = parseFloat(value);
        this.generate();
    }

    setSize(w, h) {
        this.width = parseInt(w);
        this.height = parseInt(h);
        this.generate();
    }

    setSeed(s) {
        this.seed = s;
        this.generate();
    }

    exportPNG() {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.width * this.tileSize;
        tempCanvas.height = this.height * this.tileSize;
        const tempCtx = tempCanvas.getContext('2d');

        // Render to temp canvas
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const biome = this.layers.biomes[y][x];
                const isCave = this.layers.caves[y][x] === 1;
                tempCtx.fillStyle = isCave ? '#111111' : biome.color;
                tempCtx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
            }
        }

        MapExporter.exportToPNG(tempCanvas, `map_${this.seed}.png`);
    }

    exportJSON() {
        const data = {
            seed: this.seed,
            width: this.width,
            height: this.height,
            params: this.params,
            tiles: this.layers.biomes.map((row, y) =>
                row.map((biome, x) => ({
                    biome: biome.name,
                    elevation: this.layers.elevation[y][x],
                    moisture: this.layers.moisture[y][x],
                    isCave: this.layers.caves[y][x] === 1
                }))
            )
        };
        MapExporter.exportToJSON(data, `map_${this.seed}.json`);
    }
}

window.MapEngine = MapEngine;
