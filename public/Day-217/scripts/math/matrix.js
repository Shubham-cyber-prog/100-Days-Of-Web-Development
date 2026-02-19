/**
 * Linear Algebra & Tensor engine for Quantum Simulation
 */

class QMatrix {
    constructor(rows, cols, data = null) {
        this.rows = rows;
        this.cols = cols;
        this.data = data || Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => new Complex(0, 0))
        );
    }

    static identity(n) {
        let res = new QMatrix(n, n);
        for (let i = 0; i < n; i++) res.data[i][i] = new Complex(1, 0);
        return res;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) throw new Error("Incompatible matrices for multiplication");
        let res = new QMatrix(a.rows, b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                let sum = new Complex(0, 0);
                for (let k = 0; k < a.cols; k++) {
                    sum = Complex.add(sum, Complex.mul(a.data[i][k], b.data[k][j]));
                }
                res.data[i][j] = sum;
            }
        }
        return res;
    }

    /**
     * Krönecker Product (Tensor Product)
     */
    static tensorProduct(a, b) {
        let res = new QMatrix(a.rows * b.rows, a.cols * b.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                for (let k = 0; k < b.rows; k++) {
                    for (let l = 0; l < b.cols; l++) {
                        res.data[i * b.rows + k][j * b.cols + l] = Complex.mul(a.data[i][j], b.data[k][l]);
                    }
                }
            }
        }
        return res;
    }

    static fromArray(arr) {
        let res = new QMatrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) res.data[i][0] = arr[i];
        return res;
    }

    toArray() {
        return this.data.map(row => row[0]);
    }
}

window.QMatrix = QMatrix;
