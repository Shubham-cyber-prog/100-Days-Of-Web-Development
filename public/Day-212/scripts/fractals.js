/**
 * Fractal Algorithms
 */

class FractalAlgorithms {
    static mandelbrot(cx, cy, maxIter) {
        let x = 0, y = 0;
        let x2 = 0, y2 = 0;
        let iter = 0;

        while (x2 + y2 <= 4 && iter < maxIter) {
            y = 2 * x * y + cy;
            x = x2 - y2 + cx;
            x2 = x * x;
            y2 = y * y;
            iter++;
        }

        return iter === maxIter ? -1 : iter + 1 - Math.log(Math.log(x2 + y2) / Math.log(4)) / Math.log(2);
    }

    static julia(zx, zy, cx, cy, maxIter) {
        let x = zx, y = zy;
        let x2 = x * x, y2 = y * y;
        let iter = 0;

        while (x2 + y2 <= 4 && iter < maxIter) {
            y = 2 * x * y + cy;
            x = x2 - y2 + cx;
            x2 = x * x;
            y2 = y * y;
            iter++;
        }

        return iter === maxIter ? -1 : iter + 1 - Math.log(Math.log(x2 + y2) / Math.log(4)) / Math.log(2);
    }

    static burningShip(cx, cy, maxIter) {
        let x = 0, y = 0;
        let x2 = 0, y2 = 0;
        let iter = 0;

        while (x2 + y2 <= 4 && iter < maxIter) {
            y = Math.abs(2 * x * y) + cy;
            x = x2 - y2 + cx;
            x2 = x * x;
            y2 = y * y;
            iter++;
        }

        return iter === maxIter ? -1 : iter + 1 - Math.log(Math.log(x2 + y2) / Math.log(4)) / Math.log(2);
    }

    static tricorn(cx, cy, maxIter) {
        let x = 0, y = 0;
        let x2 = 0, y2 = 0;
        let iter = 0;

        while (x2 + y2 <= 4 && iter < maxIter) {
            y = -2 * x * y + cy;
            x = x2 - y2 + cx;
            x2 = x * x;
            y2 = y * y;
            iter++;
        }

        return iter === maxIter ? -1 : iter + 1 - Math.log(Math.log(x2 + y2) / Math.log(4)) / Math.log(2);
    }

    static buffalo(cx, cy, maxIter) {
        let x = 0, y = 0;
        let x2 = 0, y2 = 0;
        let iter = 0;

        while (x2 + y2 <= 4 && iter < maxIter) {
            y = Math.abs(2 * x * y) + cy;
            x = Math.abs(x2 - y2) + cx;
            x2 = x * x;
            y2 = y * y;
            iter++;
        }

        return iter === maxIter ? -1 : iter + 1 - Math.log(Math.log(x2 + y2) / Math.log(4)) / Math.log(2);
    }

    static newton(zx, zy, maxIter) {
        let x = zx, y = zy;
        let iter = 0;
        const tolerance = 0.000001;

        while (iter < maxIter) {
            // f(z) = z^3 - 1
            // f'(z) = 3z^2
            // z = z - f(z)/f'(z)
            let x2 = x * x, y2 = y * y;
            let d2 = 3 * (x2 + y2);
            if (d2 === 0) break;

            let nextX = (2 * x) / 3 + (x2 - y2) / (3 * (x2 + y2) * (x2 + y2));
            let nextY = (2 * y) / 3 - (2 * x * y) / (3 * (x2 + y2) * (x2 + y2));

            if (Math.abs(nextX - x) < tolerance && Math.abs(nextY - y) < tolerance) break;
            x = nextX;
            y = nextY;
            iter++;
        }

        // Return root index for coloring or iteration count
        return iter;
    }
}

// For worker environment
if (typeof self !== 'undefined') {
    self.FractalAlgorithms = FractalAlgorithms;
}
