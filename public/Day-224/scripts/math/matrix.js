/**
 * Quantum Matrix & Linear Algebra Engine
 * Specialized in Kronecker Products and Unitary Matrix operations.
 */

import { Complex } from './complex.js';

export class QMatrix {
    constructor(rows, cols, data = null) {
        this.rows = rows;
        this.cols = cols;
        if (data) {
            this.data = data;
        } else {
            this.data = Array(rows).fill(0).map(() => Array(cols).fill(0).map(() => new Complex(0, 0)));
        }
    }

    /**
     * Compute Kronecker Product (Tensor Product) of two matrices
     * Essential for multi-qubit transformations.
     */
    static kronecker(A, B) {
        const resRows = A.rows * B.rows;
        const resCols = A.cols * B.cols;
        const result = new QMatrix(resRows, resCols);

        for (let i = 0; i < A.rows; i++) {
            for (let j = 0; j < A.cols; j++) {
                // For each element in A, multiply by matrix B
                for (let k = 0; k < B.rows; k++) {
                    for (let l = 0; l < B.cols; l++) {
                        result.data[i * B.rows + k][j * B.cols + l] = A.data[i][j].mul(B.data[k][l]);
                    }
                }
            }
        }
        return result;
    }

    /**
     * Multiply Matrix by Column Vector (State Vector)
     */
    multiplyVector(vec) {
        if (this.cols !== vec.length) throw new Error("Matrix dimensions mismatch");
        const result = Array(this.rows).fill(null).map(() => new Complex(0, 0));

        for (let i = 0; i < this.rows; i++) {
            let sum = new Complex(0, 0);
            for (let j = 0; j < this.cols; j++) {
                sum = sum.add(this.data[i][j].mul(vec[j]));
            }
            result[i] = sum;
        }
        return result;
    }

    static identity(n) {
        const size = Math.pow(2, n);
        const m = new QMatrix(size, size);
        for (let i = 0; i < size; i++) {
            m.data[i][i] = new Complex(1, 0);
        }
        return m;
    }
}
