/**
 * Pauli, Hadamard, and CNOT gate definitions
 */

const Gates = {
    I: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(1, 0)]
    ]),
    X: new QMatrix(2, 2, [
        [new Complex(0, 0), new Complex(1, 0)],
        [new Complex(1, 0), new Complex(0, 0)]
    ]),
    Y: new QMatrix(2, 2, [
        [new Complex(0, 0), new Complex(0, -1)],
        [new Complex(0, 1), new Complex(0, 0)]
    ]),
    Z: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(-1, 0)]
    ]),
    H: new QMatrix(2, 2, [
        [new Complex(1 / Math.sqrt(2), 0), new Complex(1 / Math.sqrt(2), 0)],
        [new Complex(1 / Math.sqrt(2), 0), new Complex(-1 / Math.sqrt(2), 0)]
    ]),
    S: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(0, 1)]
    ]),
    T: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4))]
    ])
};

// CNOT is special as it's a 2-qubit gate (4x4)
const CNOT = new QMatrix(4, 4, [
    [new Complex(1, 0), new Complex(0, 0), new Complex(0, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(1, 0), new Complex(0, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(0, 0), new Complex(0, 0), new Complex(1, 0)],
    [new Complex(0, 0), new Complex(0, 0), new Complex(1, 0), new Complex(0, 0)]
]);

window.Gates = Gates;
window.CNOT = CNOT;
