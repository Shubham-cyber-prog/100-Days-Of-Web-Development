export const calculateSignal = (type, inputs) => {
    switch (type) {
        case 'AND': return inputs.every(i => i === 1) ? 1 : 0;
        case 'OR': return inputs.some(i => i === 1) ? 1 : 0;
        case 'NOT': return inputs[0] === 1 ? 0 : 1;
        case 'XOR': return inputs.filter(i => i === 1).length === 1 ? 1 : 0;
        default: return 0;
    }
};

export const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};
