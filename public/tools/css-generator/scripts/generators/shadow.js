/**
 * Box Shadow Generator Logic
 */

export class ShadowGenerator {
    constructor() {
        this.state = {
            x: 10,
            y: 10,
            blur: 20,
            spread: 0,
            color: '#000000',
            inset: false
        };
    }

    update(key, value) {
        if (key in this.state) {
            this.state[key] = value;
        }
    }

    getCSS() {
        const { x, y, blur, spread, color, inset } = this.state;
        const insetStr = inset ? 'inset ' : '';
        const rgbColor = this.hexToRgba(color, 1);

        return {
            property: 'box-shadow',
            value: `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${rgbColor}`
        };
    }

    // Helper to format color (could be moved to generic util)
    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }
}
