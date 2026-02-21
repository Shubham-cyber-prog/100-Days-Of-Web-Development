/**
 * Spiral Galaxy Generation Logic
 * Density Wave Theory Implementation
 */

class Galaxy {
    constructor(seed, config = {}) {
        this.seed = seed;
        this.rand = new Random(seed);
        this.noise = new Noise(seed);

        this.arms = config.arms || 2 + Math.floor(this.rand.next() * 4);
        this.stars = [];
        this.numStars = config.numStars || 5000;
        this.radius = config.radius || 1000;
        this.tightness = config.tightness || 0.4;

        this.generate();
    }

    generate() {
        for (let i = 0; i < this.numStars; i++) {
            const dist = Math.pow(this.rand.next(), 2) * this.radius;
            const angle = this.rand.next() * Math.PI * 2;

            // Apply spiral arm offset
            const armOffset = (dist * this.tightness);
            const armIndex = Math.floor(this.rand.next() * this.arms);
            const finalAngle = angle + armOffset + (armIndex * (Math.PI * 2 / this.arms));

            // Dispersion
            const dispersion = (this.radius / (dist + 10)) * 20;
            const x = Math.cos(finalAngle) * dist + (this.rand.next() - 0.5) * dispersion;
            const y = Math.sin(finalAngle) * dist + (this.rand.next() - 0.5) * dispersion;

            // Star properties
            this.stars.push({
                x, y,
                size: 0.5 + this.rand.next() * 1.5,
                color: this.getStarColor(this.rand.next()),
                id: i
            });
        }
    }

    getStarColor(t) {
        if (t < 0.1) return '#ff4444'; // Red dwarf
        if (t < 0.3) return '#ffcc33'; // Yellow
        if (t < 0.7) return '#ffffff'; // White
        return '#38bdf8'; // Blue giant
    }

    render(ctx, camera) {
        for (const star of this.stars) {
            const screen = camera.worldToScreen(star.x, star.y);
            if (screen.visible) {
                ctx.fillStyle = star.color;
                const size = star.size / camera.zoom;
                if (size > 0.1) {
                    ctx.beginPath();
                    ctx.arc(screen.x, screen.y, Math.max(0.5, size), 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
}

window.Galaxy = Galaxy;
