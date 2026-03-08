/**
 * Quantum Logic Gates
 * Unitary Matrix definitions for H, X, Y, Z, and Controlled-NOT.
 */

import { Complex } from '../math/complex.js';
import { QMatrix } from '../math/matrix.js';

const invSqrt2 = 1 / Math.sqrt(2);

export const GATES = {
    // Hadamard Gate: Creates superposition
    H: new QMatrix(2, 2, [
        [new Complex(invSqrt2, 0), new Complex(invSqrt2, 0)],
        [new Complex(invSqrt2, 0), new Complex(-invSqrt2, 0)]
    ]),

    // Pauli-X (NOT) Gate: Flips |0> and |1>
    X: new QMatrix(2, 2, [
        [new Complex(0, 0), new Complex(1, 0)],
        [new Complex(1, 0), new Complex(0, 0)]
    ]),

    // Pauli-Y Gate
    Y: new QMatrix(2, 2, [
        [new Complex(0, 0), new Complex(0, -1)],
        [new Complex(0, 1), new Complex(0, 0)]
    ]),

    // Pauli-Z Gate: Phase flip
    Z: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(-1, 0)]
    ]),

    // S Gate (Phase)
    S: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(0, 1)]
    ]),

    // T Gate (pi/8)
    T: new QMatrix(2, 2, [
        [new Complex(1, 0), new Complex(0, 0)],
        [new Complex(0, 0), new Complex(Math.cos(Math.PI / 4), Math.sin(Math.PI / 4))]
    ]),

    // Controlled-NOT (CNOT) logic built dynamically in Circuit engine
    CX: null
};

export const IDENTITY = new QMatrix(2, 2, [
    [new Complex(1, 0), new Complex(0, 0)],
    [new Complex(0, 0), new Complex(1, 0)]
]);
