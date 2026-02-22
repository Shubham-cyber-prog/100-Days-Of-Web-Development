/**
 * Circuit Composer UI
 * Handles drag-and-drop gate placement and wire rendering.
 */

import { QuantumCircuit } from '../core/circuit.js';
import { uiProbs } from './probs.js';
import { bloch } from './bloch.js';

class CircuitComposer {
    constructor() {
        this.qubitCount = 3;
        this.circuit = new QuantumCircuit(3);
        this.steps = []; // Array of columns [ { qubit: 0, gate: 'H' }, ... ]
    }

    init() {
        this.renderWires();
        this.setupListeners();
        this.updateViz();
    }

    renderWires() {
        const container = document.getElementById('circuit-wire-container');
        container.innerHTML = '';

        for (let i = 0; i < this.qubitCount; i++) {
            const wire = document.createElement('div');
            wire.className = 'qubit-wire';
            wire.dataset.label = `q${i}`;
            wire.dataset.idx = i;

            // Interaction: Drop zones
            wire.addEventListener('dragover', (e) => e.preventDefault());
            wire.addEventListener('drop', (e) => this.handleDrop(e, i));

            container.appendChild(wire);
        }
    }

    handleDrop(e, qubitIdx) {
        const gateType = e.dataTransfer.getData('gate');
        this.addGateAction(gateType, qubitIdx);
    }

    addGateAction(gate, qubit) {
        this.steps.push({ gate, qubit });
        this.log(`Applied ${gate} on q${qubit}`);
        this.runSimulation();
    }

    runSimulation() {
        this.circuit.reset();
        this.steps.forEach(step => {
            if (step.gate === 'CX') {
                // Simplified CX: previous qubit is control
                const control = (step.qubit > 0) ? step.qubit - 1 : 0;
                this.circuit.applyCNOT(control, step.qubit);
            } else {
                this.circuit.applyGate(step.gate, step.qubit);
            }
        });
        this.updateViz();
    }

    updateViz() {
        const probs = this.circuit.getProbabilities();
        const vector = this.circuit.getStateVector();

        uiProbs.render(probs);
        this.renderStateVector(vector);

        // Update Bloch Sphere for q0 (simplified)
        const q0Amp0 = this.circuit.state[0];
        const q0Amp1 = this.circuit.state[1];
        bloch.update(q0Amp0, q0Amp1);
    }

    renderStateVector(vector) {
        const display = document.getElementById('state-vector-display');
        display.innerHTML = vector.map((v, i) => {
            const binary = i.toString(2).padStart(this.qubitCount, '0');
            return `<div class="vector-line"><span class="v-amp">${v}</span> |${binary}⟩</div>`;
        }).join('');
    }

    setupListeners() {
        document.querySelectorAll('.gate-tool').forEach(tool => {
            tool.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('gate', e.target.dataset.gate);
            });
        });

        document.getElementById('qubit-slider').addEventListener('input', (e) => {
            this.qubitCount = parseInt(e.target.value);
            document.getElementById('qubit-count-val').textContent = this.qubitCount;
            this.circuit = new QuantumCircuit(this.qubitCount);
            this.steps = [];
            this.renderWires();
            this.updateViz();
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            this.steps = [];
            this.circuit.reset();
            this.updateViz();
            this.log('Circuit reset.');
        });
    }

    log(msg) {
        const logs = document.getElementById('quantum-logs');
        const p = document.createElement('p');
        p.textContent = `> ${msg}`;
        logs.prepend(p);
    }
}

// Inject drag styles
const style = document.createElement('style');
style.textContent = `
    .vector-line { font-family: var(--font-mono); font-size: 0.8rem; margin-bottom: 5px; color: var(--text-dim); }
    .v-amp { color: var(--accent-quantum); font-weight: 700; display: inline-block; min-width: 140px; }
`;
document.head.appendChild(style);

export const composer = new CircuitComposer();
