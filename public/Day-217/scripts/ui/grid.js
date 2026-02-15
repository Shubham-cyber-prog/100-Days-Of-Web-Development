/**
 * Drag-and-drop assembly system for Quantum Circuits
 */

class CircuitUI {
    constructor(containerId, numQubits, steps) {
        this.container = document.getElementById(containerId);
        this.numQubits = numQubits;
        this.steps = steps;
        this.grid = Array.from({ length: numQubits }, () => Array(steps).fill(null));
        this.onCircuitChange = null;
    }

    render() {
        this.container.innerHTML = '';
        for (let q = 0; q < this.numQubits; q++) {
            let row = document.createElement('div');
            row.className = 'qubit-row';

            let label = document.createElement('div');
            label.className = 'qubit-label';
            label.textContent = `|q${q}⟩`;
            row.appendChild(label);

            for (let s = 0; s < this.steps; s++) {
                let cell = document.createElement('div');
                cell.className = 'circuit-cell';
                cell.dataset.qubit = q;
                cell.dataset.step = s;

                if (this.grid[q][s]) {
                    let gate = document.createElement('div');
                    gate.className = `gate gate-${this.grid[q][s]}`;
                    gate.textContent = this.grid[q][s];
                    gate.draggable = true;
                    gate.onclick = () => {
                        this.grid[q][s] = null;
                        this.render();
                        if (this.onCircuitChange) this.onCircuitChange();
                    };
                    cell.appendChild(gate);
                }

                cell.ondragover = (e) => e.preventDefault();
                cell.ondrop = (e) => {
                    let gateType = e.dataTransfer.getData('gate-type');
                    this.grid[q][s] = gateType;
                    this.render();
                    if (this.onCircuitChange) this.onCircuitChange();
                };

                row.appendChild(cell);
            }
            this.container.appendChild(row);
        }
    }

    getCircuit() {
        return this.grid;
    }
}

window.CircuitUI = CircuitUI;
Riverside: 
