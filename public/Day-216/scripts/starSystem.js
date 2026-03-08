/**
 * Procedural Star System and Planet Generation
 */

class StarSystem {
    constructor(seed, x, y) {
        this.seed = seed;
        this.x = x;
        this.y = y;
        this.rand = new Random(seed);

        this.starType = this.getStarType();
        this.planets = [];
        this.generatePlanets();
    }

    getStarType() {
        const r = this.rand.next();
        if (r < 0.05) return { name: 'Neutron', color: '#94a3b8', size: 10 };
        if (r < 0.15) return { name: 'Red Giant', color: '#ef4444', size: 60 };
        if (r < 0.5) return { name: 'Main Sequence', color: '#fbbf24', size: 30 };
        return { name: 'White Dwarf', color: '#f8fafc', size: 15 };
    }

    generatePlanets() {
        const numPlanets = 1 + Math.floor(this.rand.next() * 8);
        for (let i = 0; i < numPlanets; i++) {
            const orbit = 80 + i * 50 + this.rand.next() * 30;
            const size = 3 + this.rand.next() * 12;
            this.planets.push({
                orbit,
                size,
                speed: 0.001 / (orbit * 0.01),
                phase: this.rand.next() * Math.PI * 2,
                color: this.getPlanetColor(),
                name: `Planet-${i + 1}`
            });
        }
    }

    getPlanetColor() {
        const colors = ['#38bdf8', '#fb7185', '#34d399', '#a78bfa', '#fbbf24'];
        return colors[Math.floor(this.rand.next() * colors.length)];
    }

    update(dt) {
        for (const p of this.planets) {
            p.phase += p.speed * dt;
        }
    }

    render(ctx, camera) {
        const screen = camera.worldToScreen(this.x, this.y);
        if (!screen.visible) return;

        // Draw Star
        ctx.fillStyle = this.starType.color;
        ctx.shadowBlur = 20 / camera.zoom;
        ctx.shadowColor = this.starType.color;
        ctx.beginPath();
        ctx.arc(screen.x, screen.y, this.starType.size / camera.zoom, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Planets
        for (const p of this.planets) {
            const px = this.x + Math.cos(p.phase) * p.orbit;
            const py = this.y + Math.sin(p.phase) * p.orbit;
            const pScreen = camera.worldToScreen(px, py);

            // Orbit line
            ctx.strokeStyle = 'rgba(255,255,255,0.05)';
            ctx.beginPath();
            ctx.arc(screen.x, screen.y, p.orbit / camera.zoom, 0, Math.PI * 2);
            ctx.stroke();

            if (pScreen.visible) {
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(pScreen.x, pScreen.y, p.size / camera.zoom, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}

window.StarSystem = StarSystem;
Riverside: 
