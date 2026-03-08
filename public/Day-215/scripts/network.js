/**
 * Neural Network core class
 */

class NeuralNetwork {
    constructor(nodeCounts, activation = 'sigmoid') {
        this.layers = [];
        for (let i = 0; i < nodeCounts.length - 1; i++) {
            let layer = new Layer(nodeCounts[i], nodeCounts[i + 1], activation);
            layer.id = i;
            this.layers.push(layer);
        }
        this.optimizer = new Adam(0.01);
    }

    predict(inputArray) {
        let inputs = Matrix.fromArray(inputArray);
        let current = inputs;
        for (let layer of this.layers) {
            current = layer.forward(current);
        }
        return current.toArray();
    }

    train(inputArray, targetArray) {
        let inputs = Matrix.fromArray(inputArray);
        let targets = Matrix.fromArray(targetArray);

        // Forward propagation
        let current = inputs;
        for (let layer of this.layers) {
            current = layer.forward(current);
        }

        // Compute error gradient at output (MSE derivative)
        // Error = 0.5 * (target - output)^2
        // dE/da = -(target - output)
        let outputErrors = Matrix.subtract(targets, current).multiply(-1);

        // Backpropagation
        let grad = outputErrors;
        for (let i = this.layers.length - 1; i >= 0; i--) {
            grad = this.layers[i].backward(grad);
        }

        // Optimization step
        for (let layer of this.layers) {
            layer.updateWeights(this.optimizer);
        }

        // Return current MSE
        let mse = 0;
        let out = current.toArray();
        for (let i = 0; i < targetArray.length; i++) {
            mse += Math.pow(targetArray[i] - out[i], 2);
        }
        return mse / targetArray.length;
    }

    setOptimizer(type, lr) {
        if (type === 'sgd') this.optimizer = new SGD(lr);
        else this.optimizer = new Adam(lr);
    }

    serialize() {
        return JSON.stringify({
            nodeCounts: this.getNodeCounts(),
            layers: this.layers.map(l => ({
                weights: l.weights.data,
                biases: l.biases.data,
                activation: l.activationKey
            }))
        });
    }

    static deserialize(json) {
        let data = JSON.parse(json);
        let nn = new NeuralNetwork(data.nodeCounts);
        for (let i = 0; i < nn.layers.length; i++) {
            nn.layers[i].weights.data = data.layers[i].weights;
            nn.layers[i].biases.data = data.layers[i].biases;
            nn.layers[i].activationKey = data.layers[i].activation;
            nn.layers[i].activation = Activations[data.layers[i].activation];
        }
        return nn;
    }

    getNodeCounts() {
        let counts = [this.layers[0].inputNodes];
        for (let layer of this.layers) {
            counts.push(layer.outputNodes);
        }
        return counts;
    }
}

window.NeuralNetwork = NeuralNetwork;
