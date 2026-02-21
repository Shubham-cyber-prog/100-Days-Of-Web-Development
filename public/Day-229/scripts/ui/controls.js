/**
 * FinQuant UI controller
 * Coordinates model calculations with visual updates.
 */

import { BlackScholes } from '../core/blackScholes.js';
import { MonteCarlo } from '../core/monteCarlo.js';
import { charts } from '../render/charts.js';
import { surface } from '../render/surface.js';

class QuantUI {
    constructor() {
        this.model = null;
    }

    init() {
        this.setupListeners();
        this.calculate();
    }

    calculate() {
        const S = parseFloat(document.getElementById('input-spot').value);
        const K = parseFloat(document.getElementById('input-strike').value);
        const T = parseFloat(document.getElementById('input-expiry').value);
        const r = parseFloat(document.getElementById('input-rate').value);
        const sigma = parseFloat(document.getElementById('input-vol').value);

        this.model = new BlackScholes(S, K, T, r, sigma);

        // Update Greeks
        const greeks = this.model.getGreeks();
        document.getElementById('val-delta').textContent = greeks.delta.toFixed(3);
        document.getElementById('val-gamma').textContent = greeks.gamma.toFixed(4);
        document.getElementById('val-theta').textContent = greeks.theta.toFixed(3);
        document.getElementById('val-vega').textContent = greeks.vega.toFixed(3);

        // Update Prices
        document.getElementById('val-call').textContent = `$${this.model.getPrice(true).toFixed(2)}`;
        document.getElementById('val-put').textContent = `$${this.model.getPrice(false).toFixed(2)}`;

        // Update Charts
        charts.renderPayoff(K, true);

        this.log(`Recalculated BSM for S=${S}, K=${K}`);
    }

    runMonteCarlo() {
        const S = parseFloat(document.getElementById('input-spot').value);
        const K = parseFloat(document.getElementById('input-strike').value);
        const T = parseFloat(document.getElementById('input-expiry').value);
        const r = parseFloat(document.getElementById('input-rate').value);
        const sigma = parseFloat(document.getElementById('input-vol').value);

        const mc = new MonteCarlo(S, T, r, sigma);
        const paths = mc.generatePaths(100, 100);
        charts.renderPaths(paths);

        const est = mc.estimatePrice(K, true, 10000);
        this.log(`Monte Carlo Estimation: $${est.toFixed(2)} (10k sims)`);
    }

    generateSurface() {
        // Generate dummy data for surface grid (Vol vs Strike vs Time)
        const grid = Array(10).fill(0).map((_, r) =>
            Array(10).fill(0).map((_, c) => 0.2 + (r * c) / 200)
        );
        surface.render(grid);
        this.log(`Vol Surface mesh generated.`);
    }

    setupListeners() {
        const inputs = ['input-spot', 'input-strike', 'input-expiry', 'input-vol', 'input-rate'];
        inputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => this.calculate());
        });

        document.getElementById('btn-monte-carlo').addEventListener('click', () => this.runMonteCarlo());
        document.getElementById('btn-vol-surface').addEventListener('click', () => this.generateSurface());
    }

    log(msg) {
        const logs = document.getElementById('quant-logs');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `>> ${msg}`;
        logs.prepend(entry);
    }
}

export const quantUI = new QuantUI();
