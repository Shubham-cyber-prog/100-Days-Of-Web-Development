export const shake = (element) => {
    element.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' },
    ], { duration: 200, iterations: 1 });
};

export const flash = (element) => {
    element.animate([
        { backgroundColor: 'rgba(255,255,255,0.5)' },
        { backgroundColor: 'transparent' }
    ], { duration: 300 });
};
