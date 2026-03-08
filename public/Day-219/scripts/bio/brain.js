/**
 * Neural Network Behavioral Controller
 * Simple Feed-forward network driven by genomic weights
 */

class Brain {
    constructor(genome, inputSize, hiddenSize, outputSize) {
        this.inputSize = inputSize;
        this.hiddenSize = hiddenSize;
        this.outputSize = outputSize;

        // Extract weights from genome
        this.weightsIH = this.extractWeights(genome, 0, hiddenSize * inputSize);
        this.weightsHO = this.extractWeights(genome, hiddenSize * inputSize, outputSize * hiddenSize);
    }

    extractWeights(genome, start, count) {
        const weights = [];
        for (let i = 0; i < count; i++) {
            // Map byte 0-255 to weight -1 to 1
            weights.push((genome.getTrait(start + i) * 2) - 1);
        }
        return weights;
    }

    /**
     * Activation Function (Tanh)
     */
    activate(x) {
        return Math.tanh(x);
    }

    /**
     * Feedforward pass
     */
    decide(inputs) {
        // Input -> Hidden
        const hidden = new Array(this.hiddenSize).fill(0);
        for (let j = 0; j < this.hiddenSize; j++) {
            let sum = 0;
            for (let i = 0; i < this.inputSize; i++) {
                sum += inputs[i] * this.weightsIH[j * this.inputSize + i];
            }
            hidden[j] = this.activate(sum);
        }

        // Hidden -> Output
        const outputs = new Array(this.outputSize).fill(0);
        for (let k = 0; k < this.outputSize; k++) {
            let sum = 0;
            for (let j = 0; j < this.hiddenSize; j++) {
                sum += hidden[j] * this.weightsHO[k * this.hiddenSize + j];
            }
            outputs[k] = this.activate(sum);
        }

        return outputs;
    }
}

window.Brain = Brain;
