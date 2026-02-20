/**
 * Neural Network Layer abstractions
 */

class Layer {
    constructor(inputNodes, outputNodes, activationKey = 'sigmoid') {
        this.inputNodes = inputNodes;
        this.outputNodes = outputNodes;
        this.activationKey = activationKey;
        this.activation = Activations[activationKey];

        // Xavier/Glorot Initialization for Weights
        let scale = Math.sqrt(2 / (inputNodes + outputNodes));
        this.weights = new Matrix(outputNodes, inputNodes);
        this.weights.map(() => (Math.random() * 2 - 1) * scale);

        this.biases = new Matrix(outputNodes, 1);
        this.biases.map(() => (Math.random() * 2 - 1) * scale);

        // Gradient buffers
        this.weightGradients = new Matrix(outputNodes, inputNodes);
        this.biasGradients = new Matrix(outputNodes, 1);

        // Cache for backprop
        this.lastInputs = null;
        this.lastOutputs = null;
    }

    forward(inputs) {
        this.lastInputs = inputs;
        // z = w * i + b
        let weightedSum = Matrix.multiply(this.weights, inputs).add(this.biases);
        // a = f(z)
        this.lastOutputs = Matrix.map(weightedSum, this.activation.func);
        return this.lastOutputs;
    }

    // d_error/d_activation is passed as gradients
    backward(errorGradient) {
        // Output gradient: output * (1 - output) * error (for sigmoid)
        // More generally: f'(z) * dE/da
        let gradient = Matrix.map(this.lastOutputs, this.activation.dfunc);
        gradient.multiply(errorGradient);

        // Weight gradients: gradient * inputs_transpose
        let inputsT = Matrix.transpose(this.lastInputs);
        let weightGrads = Matrix.multiply(gradient, inputsT);
        this.weightGradients.add(weightGrads);
        this.biasGradients.add(gradient);

        // Gradient for previous layer: weights_transpose * local_gradient
        let weightsT = Matrix.transpose(this.weights);
        return Matrix.multiply(weightsT, gradient);
    }

    updateWeights(optimizer) {
        optimizer.update(this.weights, this.weightGradients, 'weights-' + this.id);
        optimizer.update(this.biases, this.biasGradients, 'biases-' + this.id);

        // Reset gradients after update
        this.weightGradients.map(() => 0);
        this.biasGradients.map(() => 0);
    }
}

window.Layer = Layer;
