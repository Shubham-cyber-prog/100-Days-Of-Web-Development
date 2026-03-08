/**
 * Monte Carlo Path Simulator
 * Uses Geometric Brownian Motion (GBM) for asset path modeling.
 */

import { Stats } from '../math/stats.js';

export class MonteCarlo {
    constructor(S, T, r, sigma) {
        this.S = S;
        this.T = T;
        this.r = r;
        this.sigma = sigma;
    }

    /**
     * Generate N paths of M steps each.
     */
    generatePaths(numPaths = 50, steps = 100) {
        const dt = this.T / steps;
        const drift = (this.r - 0.5 * this.sigma * this.sigma) * dt;
        const vol = this.sigma * Math.sqrt(dt);
        const paths = [];

        for (let i = 0; i < numPaths; i++) {
            const path = [this.S];
            let currentS = this.S;
            for (let j = 1; j < steps; j++) {
                currentS *= Math.exp(drift + vol * Stats.randN());
                path.push(currentS);
            }
            paths.push(path);
        }
        return paths;
    }

    /**
     * Estimate option value via expectation of terminal payoff.
     */
    estimatePrice(K, isCall = true, numSims = 5000) {
        let totalPayoff = 0;
        const dt = this.T;
        const drift = (this.r - 0.5 * this.sigma * this.sigma) * dt;
        const vol = this.sigma * Math.sqrt(dt);

        for (let i = 0; i < numSims; i++) {
            const ST = this.S * Math.exp(drift + vol * Stats.randN());
            const payoff = isCall ? Math.max(0, ST - K) : Math.max(0, K - ST);
            totalPayoff += payoff;
        }

        return (totalPayoff / numSims) * Math.exp(-this.r * this.T);
    }
}
