/**
 * Procedural Training Data Sets
 * Generates XOR, Circle, Spiral, and Gaussian clusters for classification tests.
 */

export class DataSets {
    static generate(type, count = 200) {
        let points = [];
        for (let i = 0; i < count; i++) {
            switch (type) {
                case 'xor': points.push(this.xor()); break;
                case 'circle': points.push(this.circle()); break;
                case 'spiral': points.push(this.spiral(i, count)); break;
                case 'gaussian': points.push(this.gaussian()); break;
            }
        }
        return points;
    }

    static xor() {
        const x = Math.random() * 2 - 1;
        const y = Math.random() * 2 - 1;
        const label = (x > 0 && y > 0) || (x < 0 && y < 0) ? 1 : 0;
        return { x: [x, y], y: label };
    }

    static circle() {
        const r = Math.random() < 0.5 ? Math.random() * 0.4 : 0.6 + Math.random() * 0.4;
        const angle = Math.random() * Math.PI * 2;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const label = r < 0.5 ? 1 : 0;
        return { x: [x, y], y: label };
    }

    static spiral(i, total) {
        const n = total / 2;
        if (i < n) {
            const r = i / n;
            const t = 1.75 * i / n * 2 * Math.PI;
            return { x: [r * Math.sin(t), r * Math.cos(t)], y: 1 };
        } else {
            const r = (i - n) / n;
            const t = 1.75 * (i - n) / n * 2 * Math.PI + Math.PI;
            return { x: [r * Math.sin(t), r * Math.cos(t)], y: 0 };
        }
    }

    static gaussian() {
        const cx = Math.random() < 0.5 ? -0.5 : 0.5;
        const cy = Math.random() < 0.5 ? -0.5 : 0.5;
        const x = cx + (Math.random() * 0.4 - 0.2);
        const y = cy + (Math.random() * 0.4 - 0.2);
        const label = cx === cy ? 1 : 0;
        return { x: [x, y], y: label };
    }
}
