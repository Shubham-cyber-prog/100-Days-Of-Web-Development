/**
 * Quantum Circuit Engine
 * Manages state vectors and gate applications across N-qubits.
 */

import { Complex } from '../math/complex.js';
import { QMatrix } from '../math/matrix.js';
import { GATES, IDENTITY } from './gates.js';

export class QuantumCircuit {
    constructor(numQubits = 3) {
        this.numQubits = numQubits;
        this.stateSize = Math.pow(2, numQubits);
        this.reset();
    }

    reset() {
        // Initialize to |00...0>
        this.state = Array(this.stateSize).fill(null).map(() => new Complex(0, 0));
        this.state[0] = new Complex(1, 0);
    }

    /**
     * Apply Single Qubit Gate at specific wire
     */
    applyGate(gateType, qubitIndex) {
        const gateMatrix = GATES[gateType];
        if (!gateMatrix) return;

        // Construct Full Operator: I ⊗ I ⊗ G ⊗ I
        let fullOperator = null;
        for (let i = 0; i < this.numQubits; i++) {
            const op = (i === qubitIndex) ? gateMatrix : IDENTITY;
            if (fullOperator === null) {
                fullOperator = op;
            } else {
                fullOperator = QMatrix.kronecker(fullOperator, op);
            }
        }

        // Update state: |Ψ'> = U |Ψ>
        this.state = fullOperator.multiplyVector(this.state);
    }

    /**
     * Apply CNOT (CX) Gate
     */
    applyCNOT(control, target) {
        const size = this.stateSize;
        const newState = Array(size).fill(null).map(() => new Complex(0, 0));

        for (let i = 0; i < size; i++) {
            const amplitude = this.state[i];
            if (amplitude.mag() < 0.00001) continue;

            const binary = i.toString(2).padStart(this.numQubits, '0');
            const bits = binary.split('').map(Number);

            if (bits[control] === 1) {
                // Flip target bit
                bits[target] = 1 - bits[target];
                const newIndex = parseInt(bits.join(''), 2);
                newState[newIndex] = amplitude;
            } else {
                newState[i] = amplitude;
            }
        }
        this.state = newState;
    }

    getProbabilities() {
        return this.state.map(amp => amp.magSq());
    }

    getStateVector() {
        return this.state.map(amp => amp.toString());
    }
}
