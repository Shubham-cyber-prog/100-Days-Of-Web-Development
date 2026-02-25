/**
 * Logic Component Primitives
 * Functional definitions for digital gates and I/O.
 */

export const GATES = {
    AND: (inputs) => inputs.every(i => i === 1) ? 1 : 0,
    OR: (inputs) => inputs.some(i => i === 1) ? 1 : 0,
    XOR: (inputs) => inputs.reduce((a, b) => a ^ b, 0),
    NOT: (inputs) => inputs[0] === 1 ? 0 : 1,
    NAND: (inputs) => inputs.every(i => i === 1) ? 0 : 1,
    NOR: (inputs) => inputs.some(i => i === 1) ? 0 : 1
};

export class Component {
    constructor(type, x, y) {
        this.id = 'comp_' + Math.random().toString(36).substr(2, 5);
        this.type = type;
        this.x = x;
        this.y = y;
        this.inputs = [];  // IDs of components feeding this one
        this.outputs = []; // IDs of components this one feeds
        this.state = 0;
        this.history = []; // Timing history
        this.delay = 10;   // ns
    }

    update(inputValues) {
        if (this.type === 'INPUT') return; // State set externally
        if (this.type === 'CLOCK') {
            // Managed by simulator
            return;
        }

        const gateFn = GATES[this.type];
        if (gateFn) {
            this.state = gateFn(inputValues);
        }
    }
}
