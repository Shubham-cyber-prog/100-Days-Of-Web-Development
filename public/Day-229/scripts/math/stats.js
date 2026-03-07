/**
 * Statistical Math Engine
 * Implements Normal Distributions and Error Functions for Black-Scholes.
 */

export class Stats {
    /**
     * Standard Normal Cumulative Distribution Function (CDF)
     */
    static CND(x) {
        if (x < 0) return 1 - this.CND(-x);

        const b1 = 0.319381530;
        const b2 = -0.356563782;
        const b3 = 1.781477937;
        const b4 = -1.821255978;
        const b5 = 1.330274429;
        const p = 0.2316419;
        const c = 0.39894228;

        const t = 1.0 / (1.0 + p * x);
        const q = c * Math.exp(-x * x / 2.0) * t * (t * (t * (t * (t * b5 + b4) + b3) + b2) + b1);
        return 1.0 - q;
    }

    /**
     * Standard Normal Probability Density Function (PDF)
     */
    static PDF(x) {
        return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    }

    /**
     * Box-Muller transform for generating Gaussian random numbers.
     */
    static randN() {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }
}
