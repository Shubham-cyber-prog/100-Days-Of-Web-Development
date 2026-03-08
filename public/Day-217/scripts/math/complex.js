/**
 * Custom Complex Number Math Library
 */

class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }

    static add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    static sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    static mul(a, b) {
        if (typeof b === 'number') {
            return new Complex(a.re * b, a.im * b);
        }
        return new Complex(
            a.re * b.re - a.im * b.im,
            a.re * b.im + a.im * b.re
        );
    }

    static div(a, b) {
        let denom = b.re * b.re + b.im * b.im;
        return new Complex(
            (a.re * b.re + a.im * b.im) / denom,
            (a.im * b.re - a.re * b.im) / denom
        );
    }

    mag() {
        return Math.sqrt(this.re * this.re + this.im * this.im);
    }

    arg() {
        return Math.atan2(this.im, this.re);
    }

    conj() {
        return new Complex(this.re, -this.im);
    }

    copy() {
        return new Complex(this.re, this.im);
    }

    toString() {
        return `${this.re.toFixed(3)} + ${this.im.toFixed(3)}i`;
    }
}

window.Complex = Complex;
