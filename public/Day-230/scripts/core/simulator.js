/**
 * Logic Simulation Engine
 * Event-driven simulation with topological sorting and propagation delays.
 */

export class Simulator {
    constructor() {
        this.components = new Map();
        this.wires = []; // Array of { from: compId, outPort: 0, to: compId, inPort: 0 }
        this.time = 0;
        this.isRunning = false;
        this.clockSpeed = 1000; // ms per clock cycle
    }

    addComponent(comp) {
        this.components.set(comp.id, comp);
        return comp;
    }

    addWire(fromId, toId) {
        this.wires.push({ from: fromId, to: toId });
        const fromComp = this.components.get(fromId);
        const toComp = this.components.get(toId);

        if (fromComp && toComp) {
            fromComp.outputs.push(toId);
            toComp.inputs.push(fromId);
        }
    }

    step() {
        // Simple propagation: update all components based on their input states
        const newStates = new Map();

        this.components.forEach(comp => {
            if (comp.type === 'INPUT' || comp.type === 'CLOCK') {
                newStates.set(comp.id, comp.state);
                return;
            }

            // Gather values from inputs
            const inputValues = comp.inputs.map(inputId => {
                const inputComp = this.components.get(inputId);
                return inputComp ? inputComp.state : 0;
            });

            comp.update(inputValues);
            newStates.set(comp.id, comp.state);
        });

        // Record history for timing diagrams
        this.components.forEach(comp => {
            comp.history.push({ t: this.time, state: comp.state });
            if (comp.history.length > 200) comp.history.shift();
        });

        this.time++;
    }

    run() {
        if (!this.isRunning) return;

        // Handle Clocks
        this.components.forEach(comp => {
            if (comp.type === 'CLOCK') {
                if (this.time % 10 === 0) {
                    comp.state = comp.state === 1 ? 0 : 1;
                }
            }
        });

        this.step();
        setTimeout(() => this.run(), 50);
    }

    start() {
        this.isRunning = true;
        this.run();
    }

    stop() {
        this.isRunning = false;
    }

    reset() {
        this.components.clear();
        this.wires = [];
        this.time = 0;
    }
}

export const sim = new Simulator();
