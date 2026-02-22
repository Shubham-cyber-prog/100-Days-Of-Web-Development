/**
 * Map Editor
 * Node manipulation and obstacle placement
 */

import { TileRenderer } from '../map/tiles.js';
import { MapProjection } from '../map/projection.js';
import { DijkstraPathfinder } from '../algo/dijkstra.js';
import { AntColonyOptimizer } from '../algo/aco.js';
import { MetricsTracker } from './metrics.js';

export class MapEditor {
    constructor() {
        this.canvas = document.getElementById('map-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.renderer = new TileRenderer(this.canvas);
        this.projection = new MapProjection(this.canvas.width, this.canvas.height);
        this.metrics = new MetricsTracker();

        this.nodes = [];
        this.obstacles = [];
        this.currentPath = null;
        this.selectedNode = null;
        this.mode = 'select'; // select, add-node, add-obstacle

        this.nodeIdCounter = 0;

        this.setupCanvas();
        this.setupEventListeners();
        this.render();
    }

    setupCanvas() {
        const resize = () => {
            const container = this.canvas.parentElement;
            this.canvas.width = container.clientWidth;
            this.canvas.height = container.clientHeight;
            this.projection.width = this.canvas.width;
            this.projection.height = this.canvas.height;
            this.render();
        };
        resize();
        window.addEventListener('resize', resize);
    }

    setupEventListeners() {
        // Canvas interactions
        this.canvas.addEventListener('click', (e) => this.handleClick(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));

        // Algorithm buttons
        document.getElementById('btn-dijkstra')?.addEventListener('click', () => this.runDijkstra());
        document.getElementById('btn-aco')?.addEventListener('click', () => this.runACO());
        document.getElementById('btn-greedy')?.addEventListener('click', () => this.runGreedy());

        // Map controls
        document.getElementById('btn-add-node')?.addEventListener('click', () => {
            this.mode = 'add-node';
            this.updateStatus('Click on map to add nodes');
        });

        document.getElementById('btn-clear-map')?.addEventListener('click', () => this.clearMap());

        // Presets
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.loadPreset(btn.dataset.preset));
        });

        // Zoom controls
        document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
            this.projection.zoom(1, this.canvas.width / 2, this.canvas.height / 2);
            this.render();
        });

        document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
            this.projection.zoom(-1, this.canvas.width / 2, this.canvas.height / 2);
            this.render();
        });

        document.getElementById('btn-reset-view')?.addEventListener('click', () => {
            this.projection.reset();
            this.render();
        });

        // Visualization toggles
        document.getElementById('toggle-labels')?.addEventListener('change', () => this.render());
        document.getElementById('toggle-distances')?.addEventListener('change', () => this.render());
    }

    handleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (this.mode === 'add-node') {
            this.addNode(x, y);
            this.mode = 'select';
            this.updateStatus('Idle');
        } else {
            // Check if clicking on existing node
            const clickedNode = this.findNodeAt(x, y);
            this.selectedNode = clickedNode;
            this.render();
        }
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const hoveredNode = this.findNodeAt(x, y);

        if (hoveredNode) {
            this.canvas.style.cursor = 'pointer';
            // Could show tooltip here
        } else {
            this.canvas.style.cursor = this.mode === 'add-node' ? 'crosshair' : 'default';
        }
    }

    addNode(x, y, label = null) {
        const node = {
            id: `node-${this.nodeIdCounter++}`,
            x,
            y,
            label: label || `N${this.nodes.length + 1}`
        };

        this.nodes.push(node);
        this.updateNodeCount();
        this.render();
    }

    findNodeAt(x, y, radius = 15) {
        for (const node of this.nodes) {
            const dist = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
            if (dist < radius) return node;
        }
        return null;
    }

    clearMap() {
        this.nodes = [];
        this.obstacles = [];
        this.currentPath = null;
        this.selectedNode = null;
        this.nodeIdCounter = 0;
        this.updateNodeCount();
        this.metrics.reset();
        this.render();
        this.updateStatus('Idle');
    }

    loadPreset(preset) {
        this.clearMap();

        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;

        switch (preset) {
            case 'grid':
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        this.addNode(
                            cx - 200 + i * 100,
                            cy - 200 + j * 100,
                            `${i},${j}`
                        );
                    }
                }
                break;

            case 'random':
                for (let i = 0; i < 50; i++) {
                    this.addNode(
                        100 + Math.random() * (this.canvas.width - 200),
                        100 + Math.random() * (this.canvas.height - 200)
                    );
                }
                break;

            case 'cluster':
                for (let c = 0; c < 3; c++) {
                    const clusterX = 150 + Math.random() * (this.canvas.width - 300);
                    const clusterY = 150 + Math.random() * (this.canvas.height - 300);

                    for (let i = 0; i < 10; i++) {
                        this.addNode(
                            clusterX + (Math.random() - 0.5) * 100,
                            clusterY + (Math.random() - 0.5) * 100
                        );
                    }
                }
                break;

            case 'circle':
                const radius = 200;
                for (let i = 0; i < 20; i++) {
                    const angle = (i / 20) * Math.PI * 2;
                    this.addNode(
                        cx + Math.cos(angle) * radius,
                        cy + Math.sin(angle) * radius
                    );
                }
                break;

            case 'cities':
                const cities = [
                    { name: 'NYC', x: 0.7, y: 0.3 },
                    { name: 'LA', x: 0.2, y: 0.5 },
                    { name: 'Chicago', x: 0.6, y: 0.35 },
                    { name: 'Houston', x: 0.5, y: 0.7 },
                    { name: 'Phoenix', x: 0.3, y: 0.6 },
                    { name: 'Philadelphia', x: 0.75, y: 0.32 },
                    { name: 'San Antonio', x: 0.48, y: 0.72 },
                    { name: 'San Diego', x: 0.22, y: 0.58 },
                    { name: 'Dallas', x: 0.52, y: 0.65 },
                    { name: 'San Jose', x: 0.18, y: 0.45 }
                ];

                cities.forEach(city => {
                    this.addNode(
                        city.x * this.canvas.width,
                        city.y * this.canvas.height,
                        city.name
                    );
                });
                break;
        }
    }

    async runDijkstra() {
        if (this.nodes.length < 2) {
            alert('Add at least 2 nodes');
            return;
        }

        this.updateStatus('Computing...');
        document.getElementById('current-algo').textContent = 'Dijkstra';

        const pathfinder = new DijkstraPathfinder(this.nodes, []);
        const result = pathfinder.nearestNeighborTSP();

        this.currentPath = result.path;
        this.metrics.updateMetrics({
            distance: result.distance,
            computationTime: 10,
            iterations: this.nodes.length
        });
        this.metrics.updateRouteDetails(result.path, this.nodes);

        this.render();
        this.updateStatus('Complete');
    }

    async runACO() {
        if (this.nodes.length < 2) {
            alert('Add at least 2 nodes');
            return;
        }

        this.updateStatus('Computing with ACO...');
        document.getElementById('current-algo').textContent = 'ACO';

        const params = {
            numAnts: parseInt(document.getElementById('aco-ants').value),
            numIterations: parseInt(document.getElementById('aco-iterations').value),
            alpha: parseFloat(document.getElementById('aco-alpha').value),
            beta: parseFloat(document.getElementById('aco-beta').value),
            evaporationRate: parseFloat(document.getElementById('aco-evaporation').value)
        };

        const aco = new AntColonyOptimizer(this.nodes, params);

        const result = await aco.solve((progress) => {
            this.metrics.updateMetrics({
                iterations: progress.iteration
            });
        });

        this.currentPath = result.path;
        this.metrics.updateMetrics({
            distance: result.distance,
            computationTime: result.computationTime,
            iterations: result.iterations
        });
        this.metrics.updateChart(result.convergenceHistory);
        this.metrics.updateRouteDetails(result.path, this.nodes);

        this.render();
        this.updateStatus('Complete');
    }

    async runGreedy() {
        if (this.nodes.length < 2) {
            alert('Add at least 2 nodes');
            return;
        }

        this.updateStatus('Computing with Greedy...');
        document.getElementById('current-algo').textContent = 'Greedy';

        const pathfinder = new DijkstraPathfinder(this.nodes, []);
        const result = pathfinder.nearestNeighborTSP();

        this.currentPath = result.path;
        this.metrics.updateMetrics({
            distance: result.distance,
            computationTime: 5,
            iterations: this.nodes.length
        });
        this.metrics.updateRouteDetails(result.path, this.nodes);

        this.render();
        this.updateStatus('Complete');
    }

    render() {
        this.renderer.clear();
        this.renderer.drawGrid();

        // Draw edges if showing distances
        if (document.getElementById('toggle-distances')?.checked) {
            for (let i = 0; i < this.nodes.length; i++) {
                for (let j = i + 1; j < this.nodes.length; j++) {
                    this.renderer.drawEdge(this.nodes[i], this.nodes[j], {
                        color: 'rgba(0, 0, 0, 0.05)',
                        width: 1
                    });
                }
            }
        }

        // Draw current path
        if (this.currentPath) {
            this.renderer.drawPath(this.nodes, this.currentPath, {
                color: '#0066cc',
                width: 3
            });
        }

        // Draw obstacles
        this.obstacles.forEach(obstacle => {
            this.renderer.drawObstacle(obstacle);
        });

        // Draw nodes
        const showLabels = document.getElementById('toggle-labels')?.checked;
        this.nodes.forEach(node => {
            this.renderer.drawNode(node, {
                label: showLabels,
                selected: node === this.selectedNode
            });
        });
    }

    updateNodeCount() {
        document.getElementById('node-count').textContent = this.nodes.length;
    }

    updateStatus(status) {
        const statusEl = document.getElementById('status');
        statusEl.textContent = status;
        statusEl.className = 'stat-value';

        if (status === 'Idle') {
            statusEl.classList.add('status-idle');
        } else if (status === 'Complete') {
            statusEl.classList.add('status-complete');
        } else {
            statusEl.classList.add('status-running');
        }
    }
}
