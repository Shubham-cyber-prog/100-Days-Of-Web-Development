/**
 * Matrix Math Engine and Activation Functions
 */

class Matrix {
    constructor(rows, cols, data = null) {
        this.rows = rows;
        this.cols = cols;
        this.data = data || Array.from({ length: rows }, () => new Float64Array(cols).fill(0));
    }

    static fromArray(arr) {
        return new Matrix(arr.length, 1, arr.map(x => [x]));
    }

    toArray() {
        return this.data.flat();
    }

    static random(rows, cols) {
        let res = new Matrix(rows, cols);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                res.data[i][j] = Math.random() * 2 - 1; // Random between -1 and 1
            }
        }
        return res;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error('Columns of A must match Rows of B');
        }
        let res = new Matrix(a.rows, b.cols);
        for (let i = 0; i < res.rows; i++) {
            for (let j = 0; j < res.cols; j++) {
                let sum = 0;
                for (let k = 0; k < a.cols; k++) {
                    sum += a.data[i][k] * b.data[k][j];
                }
                res.data[i][j] = sum;
            }
        }
        return res;
    }

    multiply(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= n;
                }
            }
        }
        return this;
    }

    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += n;
                }
            }
        }
        return this;
    }

    static subtract(a, b) {
        let res = new Matrix(a.rows, a.cols);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                res.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return res;
    }

    static transpose(a) {
        let res = new Matrix(a.cols, a.rows);
        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < a.cols; j++) {
                res.data[j][i] = a.data[i][j];
            }
        }
        return res;
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j], i, j);
            }
        }
        return this;
    }

    static map(m, func) {
        let res = new Matrix(m.rows, m.cols);
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                res.data[i][j] = func(m.data[i][j], i, j);
            }
        }
        return res;
    }

    copy() {
        let res = new Matrix(this.rows, this.cols);
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                res.data[i][j] = this.data[i][j];
            }
        }
        return res;
    }
}

/**
 * Activation Functions & Derivatives
 */
const Activations = {
    sigmoid: {
        func: x => 1 / (1 + Math.exp(-x)),
        dfunc: y => y * (1 - y) // input y is expected to be sigmoid(x)
    },
    tanh: {
        func: x => Math.tanh(x),
        dfunc: y => 1 - y * y // input y is expected to be tanh(x)
    },
    relu: {
        func: x => Math.max(0, x),
        dfunc: x => (x > 0 ? 1 : 0)
    },
    leakyRelu: {
        func: x => (x > 0 ? x : 0.01 * x),
        dfunc: x => (x > 0 ? 1 : 0.01)
    }
};

window.Matrix = Matrix;
window.Activations = Activations;
