/**
 * RK4 (Runge-Kutta 4th Order) Integration
 * High-precision numerical solver for differential equations
 * Essential for stable orbital mechanics simulation
 */

export class RK4Integrator {
    /**
     * Solve a system of ODEs using RK4 method
     * @param {Function} derivative - Function that computes dy/dt given (t, y)
     * @param {number} t - Current time
     * @param {Object} state - Current state {position, velocity}
     * @param {number} dt - Time step
     * @returns {Object} New state after integration
     */
    static integrate(derivative, t, state, dt) {
        // k1 = f(t, y)
        const k1 = derivative(t, state);

        // k2 = f(t + dt/2, y + k1*dt/2)
        const state2 = this.addScaled(state, k1, dt / 2);
        const k2 = derivative(t + dt / 2, state2);

        // k3 = f(t + dt/2, y + k2*dt/2)
        const state3 = this.addScaled(state, k2, dt / 2);
        const k3 = derivative(t + dt / 2, state3);

        // k4 = f(t + dt, y + k3*dt)
        const state4 = this.addScaled(state, k3, dt);
        const k4 = derivative(t + dt, state4);

        // y_new = y + (dt/6) * (k1 + 2*k2 + 2*k3 + k4)
        const newState = {
            position: {
                x: state.position.x + (dt / 6) * (k1.velocity.x + 2 * k2.velocity.x + 2 * k3.velocity.x + k4.velocity.x),
                y: state.position.y + (dt / 6) * (k1.velocity.y + 2 * k2.velocity.y + 2 * k3.velocity.y + k4.velocity.y)
            },
            velocity: {
                x: state.velocity.x + (dt / 6) * (k1.acceleration.x + 2 * k2.acceleration.x + 2 * k3.acceleration.x + k4.acceleration.x),
                y: state.velocity.y + (dt / 6) * (k1.acceleration.y + 2 * k2.acceleration.y + 2 * k3.acceleration.y + k4.acceleration.y)
            }
        };

        return newState;
    }

    /**
     * Helper: Add scaled derivative to state
     */
    static addScaled(state, derivative, scale) {
        return {
            position: {
                x: state.position.x + derivative.velocity.x * scale,
                y: state.position.y + derivative.velocity.y * scale
            },
            velocity: {
                x: state.velocity.x + derivative.acceleration.x * scale,
                y: state.velocity.y + derivative.acceleration.y * scale
            }
        };
    }
}

/**
 * Vector Math Utilities
 */
export class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return new Vector2D(this.x / scalar, this.y / scalar);
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const mag = this.magnitude();
        return mag > 0 ? this.divide(mag) : new Vector2D(0, 0);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    distanceTo(v) {
        return this.subtract(v).magnitude();
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }
}
