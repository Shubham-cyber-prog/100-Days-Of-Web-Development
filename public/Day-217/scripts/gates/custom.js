/**
 * Phase-shift and Arbitrary Rotations (Rx, Ry, Rz)
 */

class CustomGates {
    static Rx(theta) {
        let c = Math.cos(theta / 2);
        let s = Math.sin(theta / 2);
        return new QMatrix(2, 2, [
            [new Complex(c, 0), new Complex(0, -s)],
            [new Complex(0, -s), new Complex(c, 0)]
        ]);
    }

    static Ry(theta) {
        let c = Math.cos(theta / 2);
        let s = Math.sin(theta / 2);
        return new QMatrix(2, 2, [
            [new Complex(c, 0), new Complex(-s, 0)],
            [new Complex(s, 0), new Complex(c, 0)]
        ]);
    }

    static Rz(theta) {
        return new QMatrix(2, 2, [
            [new Complex(Math.cos(-theta / 2), Math.sin(-theta / 2)), new Complex(0, 0)],
            [new Complex(0, 0), new Complex(Math.cos(theta / 2), Math.sin(theta / 2))]
        ]);
    }
}

window.CustomGates = CustomGates;
