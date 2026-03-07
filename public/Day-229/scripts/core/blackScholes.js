/**
 * Black-Scholes-Merton Pricing Engine
 * Solves for Option Value and calculates the "Greeks" sensitives.
 */

import { Stats } from '../math/stats.js';

export class BlackScholes {
    constructor(S, K, T, r, sigma) {
        this.S = S;       // Spot price
        this.K = K;       // Strike price
        this.T = T;       // Time to maturity (years)
        this.r = r;       // Risk-free rate
        this.sigma = sigma; // Volatility (implied)
        this.update();
    }

    update() {
        if (this.T <= 0) {
            this.d1 = 0; this.d2 = 0; return;
        }
        this.d1 = (Math.log(this.S / this.K) + (this.r + 0.5 * this.sigma * this.sigma) * this.T) / (this.sigma * Math.sqrt(this.T));
        this.d2 = this.d1 - this.sigma * Math.sqrt(this.T);
    }

    getPrice(isCall = true) {
        if (isCall) {
            return this.S * Stats.CND(this.d1) - this.K * Math.exp(-this.r * this.T) * Stats.CND(this.d2);
        } else {
            return this.K * Math.exp(-this.r * this.T) * Stats.CND(-this.d2) - this.S * Stats.CND(-this.d1);
        }
    }

    getGreeks() {
        const sqrtT = Math.sqrt(this.T);
        const expRT = Math.exp(-this.r * this.T);
        const phiD1 = Stats.PDF(this.d1);

        const delta = Stats.CND(this.d1);
        const gamma = phiD1 / (this.S * this.sigma * sqrtT);

        // Theta per day
        const theta = (-(this.S * phiD1 * this.sigma) / (2 * sqrtT) - this.r * this.K * expRT * Stats.CND(this.d2)) / 365;

        // Vega per 1% change in vol
        const vega = (this.S * sqrtT * phiD1) / 100;

        return { delta, gamma, theta, vega };
    }
}
