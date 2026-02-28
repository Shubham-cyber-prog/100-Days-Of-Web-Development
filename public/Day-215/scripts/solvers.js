/**
 * Optimizers: SGD and Adam
 */

class SGD {
    constructor(learningRate = 0.1) {
        this.lr = learningRate;
    }

    update(params, gradients) {
        // params = params - lr * gradients
        let delta = gradients.copy().multiply(this.lr);
        params.add(delta.multiply(-1));
    }
}

class Adam {
    constructor(lr = 0.01, beta1 = 0.9, beta2 = 0.999, epsilon = 1e-8) {
        this.lr = lr;
        this.beta1 = beta1;
        this.beta2 = beta2;
        this.epsilon = epsilon;
        this.t = 0;
        this.m = new Map(); // First moment
        this.v = new Map(); // Second moment
    }

    update(params, gradients, key) {
        this.t++;
        if (!this.m.has(key)) {
            this.m.set(key, new Matrix(params.rows, params.cols));
            this.v.set(key, new Matrix(params.rows, params.cols));
        }

        let m = this.m.get(key);
        let v = this.v.get(key);

        for (let i = 0; i < params.rows; i++) {
            for (let j = 0; j < params.cols; j++) {
                let g = gradients.data[i][j];

                // Update moment estimates
                m.data[i][j] = this.beta1 * m.data[i][j] + (1 - this.beta1) * g;
                v.data[i][j] = this.beta2 * v.data[i][j] + (1 - this.beta2) * g * g;

                // Bias correction
                let mHat = m.data[i][j] / (1 - Math.pow(this.beta1, this.t));
                let vHat = v.data[i][j] / (1 - Math.pow(this.beta2, this.t));

                // Update params
                params.data[i][j] -= (this.lr * mHat) / (Math.sqrt(vHat) + this.epsilon);
            }
        }
    }
}

window.SGD = SGD;
window.Adam = Adam;
Riverside: 
