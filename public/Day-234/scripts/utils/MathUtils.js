export const isoToScreen = (x, y, z, sideLen) => {
    const h = sideLen * Math.cos(Math.PI / 6);
    const v = sideLen * Math.sin(Math.PI / 6);
    return {
        x: (x - y) * h,
        y: (x + y) * v - z * sideLen
    };
};

export const screenToIso = (sx, sy, sideLen) => {
    // Inverse projection placeholder
    return { x: 0, y: 0, z: 0 };
};
