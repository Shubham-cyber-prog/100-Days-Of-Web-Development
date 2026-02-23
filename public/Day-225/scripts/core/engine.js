/**
 * NeuroFlow Training Engine
 * Orchestrates Forward/Backward propagation and Gradient Descent.
 */

import { Layer } from './layers.js';
import { DataSets } from '../data/sets.js';
import { ui } from '../ui/network.js';
import { decision } from '../ui/decision.js';
import { lossChart } from '../ui/loss.js';

class Engine {
    constructor() {
        this.layers = [];
        this.dataset = [];
        this.lr = 0.03;
        this.epochs = 0;
        this.isRunning = false;
        this.currentDataName = 'xor';
    }

    init() {
        this.resetNetwork([2, 4, 3, 2]); // Default architecture
        this.loadDataset('xor');
        this.setupListeners();
        this.loop();
    }

    resetNetwork(shapes) {
        this.layers = [];
        for (let i = 0; i < shapes.length - 1; i++) {
            this.layers.push(new Layer(shapes[i], shapes[i + 1]));
        }
        this.epochs = 0;
        lossChart.reset();
        this.updateUI();
    }

    loadDataset(name) {
        this.currentDataName = name;
        this.dataset = DataSets.generate(name, 100);
        decision.renderData(this.dataset);
    }

    trainStep() {
        let totalLoss = 0;
        let correct = 0;

        this.dataset.forEach(({ x, y: target }) => {
            // Forward Pass
            let act = x;
            this.layers.forEach(l => act = l.forward(act));

            // Compute Loss (Mean Squared Error for simplicity in demo)
            const output = act;
            const targetVec = target === 1 ? [0, 1] : [1, 0];
            const error = output.map((v, i) => v - targetVec[i]);

            totalLoss += error.reduce((a, b) => a + b ** 2, 0) / 2;
            if ((output[1] > output[0] ? 1 : 0) === target) correct++;

            // Backward Pass
            let grad = error; // dE/dOut
            for (let i = this.layers.length - 1; i >= 0; i--) {
                const layer = this.layers[i];
                const nextGrad = Array(layer.inputSize).fill(0);

                for (let row = 0; row < layer.outputSize; row++) {
                    const delta = grad[row] * layer.derivative(layer.lastOutput[row]);

                    // Update Weights & Biases
                    for (let col = 0; col < layer.inputSize; col++) {
                        nextGrad[col] += delta * layer.weights[row][col];
                        layer.weights[row][col] -= this.lr * delta * layer.lastInput[col];
                    }
                    layer.biases[row] -= this.lr * delta;
                }
                grad = nextGrad;
            }
        });

        this.epochs++;
        this.updateMetrics(totalLoss / this.dataset.length, correct / this.dataset.length);
    }

    updateMetrics(loss, acc) {
        document.getElementById('epoch-count').textContent = this.epochs;
        document.getElementById('val-loss').textContent = loss.toFixed(4);
        document.getElementById('val-acc').textContent = Math.round(acc * 100) + '%';
        lossChart.addPoint(loss);
    }

    loop() {
        if (this.isRunning) {
            this.trainStep();
            if (this.epochs % 5 === 0) {
                ui.render(this.layers);
                decision.renderBoundary(this.layers);
            }
        }
        requestAnimationFrame(() => this.loop());
    }

    setupListeners() {
        document.getElementById('btn-play').addEventListener('click', (e) => {
            this.isRunning = !this.isRunning;
            e.target.textContent = this.isRunning ? '⏸ PAUSE' : '▶ TRAIN';
            document.getElementById('system-status').textContent = this.isRunning ? 'TRAINING' : 'PAUSED';
        });

        document.getElementById('btn-reset').addEventListener('click', () => {
            this.resetNetwork([2, 4, 3, 2]);
        });

        document.querySelectorAll('.data-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.data-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.loadDataset(btn.dataset.set);
                this.resetNetwork([2, 4, 3, 2]);
            });
        });

        document.getElementById('lr-input').addEventListener('input', (e) => {
            this.lr = parseFloat(e.target.value);
        });
    }

    updateUI() {
        ui.render(this.layers);
        decision.renderBoundary(this.layers);
    }
}

export const engine = new Engine();
