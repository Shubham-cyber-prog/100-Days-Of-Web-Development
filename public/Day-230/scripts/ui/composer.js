/**
 * Circuit Composer UI Orchestrator
 * Handles drag-and-drop, component wiring, and simulation lifecycle.
 */

import { sim } from '../core/simulator.js';
import { Component } from '../core/logic.js';
import { SchematicRenderer } from '../render/schematic.js';
import { timing } from '../render/timing.js';

class Composer {
    constructor() {
        this.renderer = null;
        this.dragNode = null;
        this.wireStart = null;
    }

    init() {
        this.renderer = new SchematicRenderer('schematic-canvas', 'wire-svg');
        this.setupDragDrop();
        this.setupInteraction();
        this.setupControls();
        this.loop();
    }

    setupDragDrop() {
        const container = document.getElementById('draw-container');

        document.querySelectorAll('.gate-item').forEach(item => {
            item.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('type', e.target.dataset.type);
            });
        });

        container.addEventListener('dragover', (e) => e.preventDefault());
        container.addEventListener('drop', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const type = e.dataTransfer.getData('type');

            const comp = new Component(type, x, y);
            sim.addComponent(comp);
            this.updateStats();
        });
    }

    setupInteraction() {
        const container = document.getElementById('draw-container');

        container.addEventListener('mousedown', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Check for component click
            const comp = this.getComponentAt(x, y);
            if (comp) {
                if (e.shiftKey) {
                    // Start wiring
                    this.wireStart = comp.id;
                } else {
                    this.dragNode = comp;
                }
            }
        });

        container.addEventListener('mousemove', (e) => {
            if (this.dragNode) {
                const rect = container.getBoundingClientRect();
                this.dragNode.x = e.clientX - rect.left;
                this.dragNode.y = e.clientY - rect.top;
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (this.wireStart) {
                const rect = container.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const endComp = this.getComponentAt(x, y);

                if (endComp && endComp.id !== this.wireStart) {
                    sim.addWire(this.wireStart, endComp.id);
                    this.updateStats();
                }
            }
            this.dragNode = null;
            this.wireStart = null;
        });

        container.addEventListener('dblclick', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const comp = this.getComponentAt(x, y);

            if (comp && comp.type === 'INPUT') {
                comp.state = comp.state === 1 ? 0 : 1;
            }
        });
    }

    getComponentAt(x, y) {
        for (const comp of sim.components.values()) {
            const dx = Math.abs(comp.x - x);
            const dy = Math.abs(comp.y - y);
            if (dx < 40 && dy < 25) return comp;
        }
        return null;
    }

    setupControls() {
        document.getElementById('btn-run').addEventListener('click', (e) => {
            if (sim.isRunning) {
                sim.stop();
                e.target.textContent = 'RUN DESIGN';
            } else {
                sim.start();
                e.target.textContent = 'STOP SIM';
            }
        });

        document.getElementById('btn-clear').addEventListener('click', () => {
            sim.reset();
            this.updateStats();
        });
    }

    updateStats() {
        document.getElementById('stat-gates').textContent = sim.components.size;
        document.getElementById('stat-wires').textContent = sim.wires.length;
    }

    loop() {
        this.renderer.draw(sim.components, sim.wires);
        timing.render(Array.from(sim.components.values()));
        requestAnimationFrame(() => this.loop());
    }
}

export const composer = new Composer();
