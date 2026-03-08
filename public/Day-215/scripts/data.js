/**
 * Dataset Generators for Training
 */

const Datasets = {
    xor: () => ({
        inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
        targets: [[0], [1], [1], [0]],
        inputSize: 2,
        outputSize: 1
    }),
    and: () => ({
        inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
        targets: [[0], [0], [0], [1]],
        inputSize: 2,
        outputSize: 1
    }),
    or: () => ({
        inputs: [[0, 0], [0, 1], [1, 0], [1, 1]],
        targets: [[0], [1], [1], [1]],
        inputSize: 2,
        outputSize: 1
    }),
    circle: (count = 200) => {
        let inputs = [];
        let targets = [];
        for (let i = 0; i < count; i++) {
            let x = Math.random() * 2 - 1;
            let y = Math.random() * 2 - 1;
            let inside = (x * x + y * y < 0.6) ? 1 : 0;
            inputs.push([x, y]);
            targets.push([inside]);
        }
        return { inputs, targets, inputSize: 2, outputSize: 1 };
    },
    linear: (count = 200) => {
        let inputs = [];
        let targets = [];
        for (let i = 0; i < count; i++) {
            let x = Math.random() * 2 - 1;
            let y = Math.random() * 2 - 1;
            let side = (y > 0.5 * x + 0.1) ? 1 : 0;
            inputs.push([x, y]);
            targets.push([side]);
        }
        return { inputs, targets, inputSize: 2, outputSize: 1 };
    }
};

window.Datasets = Datasets;
