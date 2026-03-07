/**
 * Complex Number Math Engine
 * Supports addition, multiplication, and magnitude for Quantum Amplitudes.
 */

export class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    add(other) {
        return new Complex(this.re + other.re, this.im + other.im);
    }

    sub(other) {
        return new Complex(this.re - other.re, this.im - other.im);
    }

    mul(other) {
        if (typeof other === 'number') {
            return new Complex(this.re * other, this.im * other);
        }
        return new Complex(
            this.re * other.re - this.im * other.im,
            this.re * other.im + this.im * other.re
        );
    }

    magSq() {
        return this.re * this.re + this.im * this.im;
    }

    mag() {
        return Math.sqrt(this.magSq());
    }

    phase() {
        return Math.atan2(this.im, this.re);
    }

    toString(precision = 2) {
        if (Math.abs(this.im) < 0.0001) return this.re.toFixed(precision);
        if (Math.abs(this.re) < 0.0001) return this.im.toFixed(precision) + "i";
        const sign = this.im >= 0 ? "+" : "-";
        return `${this.re.toFixed(precision)}${sign}${Math.abs(this.im).toFixed(precision)}i`;
    }

    clone() {
        return new Complex(this.re, this.im);
    }
}
