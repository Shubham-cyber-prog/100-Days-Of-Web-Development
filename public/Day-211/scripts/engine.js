/**
 * Simulation Engine
 */

class CircuitEngine {
    constructor() {
        this.components = [];
        this.wires = null; // Will be set by App
        this.tickCount = 0;
        this.isRunning = true;
        this.tickRate = 100; // ms per tick
        this.lastUpdateTime = 0;

        // Initialize Worker for background tasks
        if (window.Worker) {
            this.worker = new Worker('scripts/worker.js');
            this.worker.onmessage = (e) => {
                console.log('Worker message:', e.data);
            };
        }
    }

    addComponent(component) {
        this.components.push(component);
        return component;
    }

    removeComponent(id) {
        const index = this.components.findIndex(c => c.id === id);
        if (index > -1) {
            // Remove wires associated with this component's pins
            const component = this.components[index];
            const pins = [...component.inputs, ...component.outputs];
            pins.forEach(pin => {
                const wiresToRemove = this.wires.getWiresForPin(pin.id);
                wiresToRemove.forEach(w => this.wires.removeWire(w.id));
            });

            this.components.splice(index, 1);
            return true;
        }
        return false;
    }

    tick() {
        if (!this.isRunning) return;

        this.tickCount++;

        // 1. Reset all input pin states to 0 if not connected? 
        // Actually, wires handle setting input states.

        // 2. Update logic components (gates)
        // We do multiple passes for combinational logic propagation in one tick
        // To be safe, we can do N passes where N is max path length, 
        // but for a simple sim, 5-10 passes or until steady state works.
        for (let pass = 0; pass < 5; pass++) {
            this.components.forEach(c => c.update());
            if (this.wires) this.wires.update();
        }

        this.updateUI();
    }

    updateUI() {
        const tickEl = document.getElementById('tick-count');
        if (tickEl) tickEl.textContent = this.tickCount;

        // Update gate visuals (high/low states)
        this.components.forEach(c => {
            const el = document.getElementById(c.id);
            if (el) {
                if (c.type === 'switch') {
                    el.classList.toggle('on', c.isOn);
                } else if (c.type === 'bulb') {
                    el.classList.toggle('on', c.state === 1);
                }

                // Update pin colors
                [...c.inputs, ...c.outputs].forEach(pin => {
                    const pinEl = document.getElementById(pin.id);
                    if (pinEl) {
                        pinEl.classList.toggle('high', pin.state === 1);
                        pinEl.classList.toggle('low', pin.state === 0);
                    }
                });
            }
        });
    }

    start() {
        this.isRunning = true;
        this.runLoop();
    }

    stop() {
        this.isRunning = false;
    }

    runLoop() {
        if (!this.isRunning) return;

        this.tick();
        setTimeout(() => this.runLoop(), this.tickRate);
    }
}

window.CircuitEngine = CircuitEngine;
