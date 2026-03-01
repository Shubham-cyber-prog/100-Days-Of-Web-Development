/**
 * Fractal Calculation Worker
 */

importScripts('fractals.js');

self.onmessage = function (e) {
    const {
        width,
        height,
        startX,
        startY,
        endX,
        endY,
        minR,
        maxR,
        minI,
        maxI,
        maxIter,
        type,
        juliaC
    } = e.data;

    const buffer = new Float32Array(width * height);
    const stepR = (maxR - minR) / (e.data.fullWidth || width);
    const stepI = (maxI - minI) / (e.data.fullHeight || height);

    for (let y = 0; y < height; y++) {
        const ci = minI + (startY + y) * stepI;
        for (let x = 0; x < width; x++) {
            const cr = minR + (startX + x) * stepR;
            let iter;

            if (type === 'mandelbrot') {
                iter = FractalAlgorithms.mandelbrot(cr, ci, maxIter);
            } else if (type === 'julia') {
                iter = FractalAlgorithms.julia(cr, ci, juliaC.r, juliaC.i, maxIter);
            } else if (type === 'burningShip') {
                iter = FractalAlgorithms.burningShip(cr, ci, maxIter);
            } else if (type === 'tricorn') {
                iter = FractalAlgorithms.tricorn(cr, ci, maxIter);
            } else if (type === 'buffalo') {
                iter = FractalAlgorithms.buffalo(cr, ci, maxIter);
            } else if (type === 'newton') {
                iter = FractalAlgorithms.newton(cr, ci, maxIter);
            }

            buffer[y * width + x] = iter;
        }
    }

    self.postMessage({ buffer, startX, startY, width, height }, [buffer.buffer]);
};
