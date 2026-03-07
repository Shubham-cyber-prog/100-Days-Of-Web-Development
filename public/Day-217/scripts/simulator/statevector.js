/**
 * 2^n State Vector Simulator logic
 */

class QuantumSimulator {
    constructor(numQubits) {
        this.numQubits = numQubits;
        this.reset();
    }

    reset() {
        let size = Math.pow(2, this.numQubits);
        this.state = new QMatrix(size, 1);
        this.state.data[0][0] = new Complex(1, 0); // Initial state |00...0>
    }

    applyGate(gate, qubitIndex) {
        // Construct full system operator: I ⊗ I ⊗ ... ⊗ Gate ⊗ ... ⊗ I
        let operator = QMatrix.identity(1);
        for (let i = 0; i < this.numQubits; i++) {
            if (i === qubitIndex) {
                operator = QMatrix.tensorProduct(operator, gate);
            } else {
                operator = QMatrix.tensorProduct(operator, Gates.I);
            }
        }
        this.state = QMatrix.multiply(operator, this.state);
    }

    applyCNOT(control, target) {
        // CNOT is a multi-qubit gate, construction is more complex
        // This is a simplified version for adjacent qubits or specific indices
        // Full construction requires projection operators and summation
        let size = Math.pow(2, this.numQubits);
        let operator = new QMatrix(size, size);

        for (let i = 0; i < size; i++) {
            let bits = i.toString(2).padStart(this.numQubits, '0').split('').map(Number);
            let nextBits = [...bits];
            if (bits[control] === 1) {
                nextBits[target] = 1 - bits[target];
            }
            let nextIndex = parseInt(nextBits.join(''), 2);
            operator.data[nextIndex][i] = new Complex(1, 0);
        }
        this.state = QMatrix.multiply(operator, this.state);
    }

    getProbabilities() {
        return this.state.toArray().map(amp => Math.pow(amp.mag(), 2));
    }
}

window.QuantumSimulator = QuantumSimulator;
