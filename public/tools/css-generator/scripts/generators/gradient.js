/**
 * Gradient Generator Logic
 */

export class GradientGenerator {
    constructor() {
        this.state = {
            type: 'linear',
            angle: 90,
            color1: '#3b82f6',
            color2: '#ec4899'
        };
    }

    update(key, value) {
        if (key in this.state) {
            this.state[key] = value;
        }
    }

    getCSS() {
        const { type, angle, color1, color2 } = this.state;

        let value = '';
        if (type === 'linear') {
            value = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        } else {
            value = `radial-gradient(circle, ${color1}, ${color2})`;
        }

        return {
            property: 'background',
            value: value
        };
    }
}
