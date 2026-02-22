/**
 * Organism Entity: High-level state machine and lifecycle
 */

class Organism {
    constructor(x, y, genome = null) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.rotation = Math.random() * Math.PI * 2;

        this.genome = genome || new Genome(128);
        this.metabolism = new Metabolism(this.genome);

        // Brain: 5 Inputs (Nearby Nutrients, Energy, Health, X, Y), 4 Hidden, 2 Outputs (Turn, Speed)
        this.brain = new Brain(this.genome, 5, 4, 2);

        this.color = this.deriveColor();
        this.size = 3 + this.genome.getTrait(15) * 5;
    }

    deriveColor() {
        const r = Math.floor(this.genome.getTrait(0) * 255);
        const g = Math.floor(this.genome.getTrait(1) * 255);
        const b = Math.floor(this.genome.getTrait(2) * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    update(width, height, localNutrients) {
        if (!this.metabolism.isAlive) return;

        // Neural decision
        const sensors = [
            localNutrients,
            this.metabolism.energy / this.metabolism.maxEnergy,
            Math.sin(this.metabolism.age),
            this.x / width,
            this.y / height
        ];

        const [turn, speed] = this.brain.decide(sensors);

        // Physics
        this.rotation += turn * 0.2;
        const currentSpeed = (speed + 1) * 2; // Map [-1, 1] to [0, 4]

        this.vx = Math.cos(this.rotation) * currentSpeed;
        this.vy = Math.sin(this.rotation) * currentSpeed;

        this.x += this.vx;
        this.y += this.vy;

        // Wall bounce
        if (this.x < 0 || this.x > width) this.rotation = Math.PI - this.rotation;
        if (this.y < 0 || this.y > height) this.rotation = -this.rotation;

        // Metabolic cost and feeding
        return this.metabolism.update(currentSpeed, localNutrients);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(-this.size, this.size / 2);
        ctx.lineTo(-this.size, -this.size / 2);
        ctx.fill();

        // Energy indicator (Health bar)
        ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
        ctx.fillRect(-this.size, this.size, (this.metabolism.energy / this.metabolism.maxEnergy) * this.size * 2, 2);

        ctx.restore();
    }
}

window.Organism = Organism;
