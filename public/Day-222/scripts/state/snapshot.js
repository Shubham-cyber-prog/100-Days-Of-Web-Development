/**
 * Snapshot Manager
 * Binary system save-state management for simulation persistence
 */

export class SnapshotManager {
    constructor(simulation) {
        this.sim = simulation;
        this.snapshots = [];
        this.currentSnapshotIndex = -1;

        this.setupUI();
    }

    setupUI() {
        document.getElementById('btn-snapshot').addEventListener('click', () => {
            this.saveSnapshot();
        });
    }

    /**
     * Create a snapshot of current simulation state
     */
    createSnapshot() {
        return {
            version: '1.0',
            timestamp: Date.now(),
            time: this.sim.time,
            settings: {
                G: this.sim.G,
                softening: this.sim.softening,
                timeScale: this.sim.timeScale,
                substeps: this.sim.substeps,
                useQuadTree: this.sim.useQuadTree,
                theta: this.sim.theta
            },
            bodies: this.sim.bodies.map(body => ({
                id: body.id,
                position: { x: body.position.x, y: body.position.y },
                velocity: { x: body.velocity.x, y: body.velocity.y },
                mass: body.mass,
                radius: body.radius,
                color: body.color,
                trail: body.trail.map(p => ({ x: p.x, y: p.y }))
            })),
            canvasSize: {
                width: this.sim.mainCanvas.width,
                height: this.sim.mainCanvas.height
            }
        };
    }

    /**
     * Save snapshot to file
     */
    saveSnapshot() {
        const snapshot = this.createSnapshot();

        // Convert to JSON
        const json = JSON.stringify(snapshot, null, 2);

        // Create download
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astrophys_snapshot_${snapshot.timestamp}.json`;
        a.click();
        URL.revokeObjectURL(url);

        console.log('Snapshot saved:', snapshot);
    }

    /**
     * Load snapshot from file
     */
    async loadSnapshot(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const snapshot = JSON.parse(e.target.result);
                    this.restoreSnapshot(snapshot);
                    resolve(snapshot);
                } catch (error) {
                    console.error('Failed to load snapshot:', error);
                    reject(error);
                }
            };

            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    /**
     * Restore simulation from snapshot
     */
    restoreSnapshot(snapshot) {
        // Clear current simulation
        this.sim.bodies = [];
        this.sim.time = snapshot.time;

        // Restore settings
        this.sim.G = snapshot.settings.G;
        this.sim.softening = snapshot.settings.softening;
        this.sim.timeScale = snapshot.settings.timeScale;
        this.sim.substeps = snapshot.settings.substeps;
        this.sim.useQuadTree = snapshot.settings.useQuadTree;
        this.sim.theta = snapshot.settings.theta;

        // Restore bodies
        snapshot.bodies.forEach(bodyData => {
            const body = {
                id: bodyData.id,
                position: { ...bodyData.position },
                velocity: { ...bodyData.velocity },
                mass: bodyData.mass,
                radius: bodyData.radius,
                color: bodyData.color,
                trail: bodyData.trail.map(p => ({ ...p })),
                maxTrailLength: 500,
                addToTrail: function () {
                    this.trail.push({ x: this.position.x, y: this.position.y });
                    if (this.trail.length > this.maxTrailLength) {
                        this.trail.shift();
                    }
                },
                kineticEnergy: function () {
                    const vSq = this.velocity.x ** 2 + this.velocity.y ** 2;
                    return 0.5 * this.mass * vSq;
                }
            };

            this.sim.bodies.push(body);
        });

        // Update UI
        this.sim.updateBodyCount();

        // Update form values
        document.getElementById('input-gravity').value = (this.sim.G / 1e-11).toFixed(3);
        document.getElementById('input-softening').value = this.sim.softening;
        document.getElementById('slider-timescale').value = this.sim.timeScale;
        document.getElementById('timescale-value').textContent = this.sim.timeScale.toFixed(1) + 'x';
        document.getElementById('slider-substeps').value = this.sim.substeps;
        document.getElementById('substeps-value').textContent = this.sim.substeps;

        console.log('Snapshot restored:', snapshot);
    }

    /**
     * Create binary snapshot (more compact)
     * Uses ArrayBuffer for efficient storage
     */
    createBinarySnapshot() {
        const snapshot = this.createSnapshot();

        // Calculate buffer size
        const bodyCount = snapshot.bodies.length;
        const headerSize = 64; // Version, timestamp, settings
        const bodySize = 56; // position(8) + velocity(8) + mass(8) + radius(4) + color(24) + trail length(4)
        const bufferSize = headerSize + bodyCount * bodySize;

        const buffer = new ArrayBuffer(bufferSize);
        const view = new DataView(buffer);

        let offset = 0;

        // Header
        view.setFloat64(offset, snapshot.timestamp); offset += 8;
        view.setFloat64(offset, snapshot.time); offset += 8;
        view.setFloat64(offset, snapshot.settings.G); offset += 8;
        view.setFloat64(offset, snapshot.settings.softening); offset += 8;
        view.setFloat64(offset, snapshot.settings.timeScale); offset += 8;
        view.setUint32(offset, snapshot.settings.substeps); offset += 4;
        view.setUint32(offset, bodyCount); offset += 4;

        // Bodies
        snapshot.bodies.forEach(body => {
            view.setFloat64(offset, body.position.x); offset += 8;
            view.setFloat64(offset, body.position.y); offset += 8;
            view.setFloat64(offset, body.velocity.x); offset += 8;
            view.setFloat64(offset, body.velocity.y); offset += 8;
            view.setFloat64(offset, body.mass); offset += 8;
            view.setFloat64(offset, body.radius); offset += 8;
        });

        return buffer;
    }

    /**
     * Export snapshot as binary file
     */
    exportBinary() {
        const buffer = this.createBinarySnapshot();
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astrophys_${Date.now()}.bin`;
        a.click();
        URL.revokeObjectURL(url);
    }
}
