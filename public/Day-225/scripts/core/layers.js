/**
 * Matrix-based Neural Network Layers
 * Implements Dense (Fully Connected) logic and Activations from scratch.
 */

export class Layer {
    constructor(inputSize, outputSize, activation = 'relu') {
        this.inputSize = inputSize;
        this.outputSize = outputSize;
        this.activationName = activation;

        // Xavier/Glorot Initialization
        const limit = Math.sqrt(6 / (inputSize + outputSize));
        this.weights = Array(outputSize).fill(0).map(() =>
            Array(inputSize).fill(0).map(() => (Math.random() * 2 - 1) * limit)
        );
        this.biases = Array(outputSize).fill(0);

        // Cache for backprop
        this.lastInput = null;
        this.lastOutput = null;
    }

    forward(input) {
        this.lastInput = input;
        const output = Array(this.outputSize).fill(0);

        for (let i = 0; i < this.outputSize; i++) {
            let sum = 0;
            for (let j = 0; j < this.inputSize; j++) {
                sum += input[j] * this.weights[i][j];
            }
            output[i] = this.activate(sum + this.biases[i]);
        }

        this.lastOutput = output;
        return output;
    }

    activate(x) {
        switch (this.activationName) {
            case 'relu': return Math.max(0, x);
            case 'tanh': return Math.tanh(x);
            case 'sigmoid': return 1 / (1 + Math.exp(-x));
            default: return x;
        }
    }

    derivative(x) {
        switch (this.activationName) {
            case 'relu': return x > 0 ? 1 : 0;
            case 'tanh': return 1 - Math.pow(Math.tanh(x), 2);
            case 'sigmoid': {
                const s = 1 / (1 + Math.exp(-x));
                return s * (1 - s);
            }
            default: return 1;
        }
    }
}

/**
 * Math Utilities for Matrix Operations
 */
export const MathOps = {
    dot: (a, b) => a.map((x, i) => x * b[i]).reduce((m, n) => m + n, 0),
    softmax: (arr) => {
        const max = Math.max(...arr); // stability
        const exps = arr.map(v => Math.exp(v - max));
        const sum = exps.reduce((a, b) => a + b);
        return exps.map(v => v / sum);
    }
};
