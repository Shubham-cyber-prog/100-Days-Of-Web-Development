/**
 * Metabolic System: Digestion and Kinetic Energy Math
 */

class Metabolism {
    constructor(genome) {
        // Traits derived from genome
        this.baseMetabolicRate = 0.05 + (genome.getTrait(10) * 0.1);
        this.digestiveEfficiency = 0.5 + (genome.getTrait(11) * 0.4);
        this.maxEnergy = 100 + (genome.getTrait(12) * 200);

        this.energy = this.maxEnergy * 0.6; // Start with 60% energy
        this.age = 0;
        this.isAlive = true;
    }

    /**
     * Update energy based on movement and idle life
     */
    update(speed, worldNutrients) {
        // Base cost + Movement cost (velocity squared)
        const cost = this.baseMetabolicRate + (speed * speed * 2);
        this.energy -= cost;

        // Nutrients intake if available on tile
        if (worldNutrients > 0) {
            const intake = Math.min(worldNutrients, 1.0) * this.digestiveEfficiency;
            this.energy = Math.min(this.energy + intake, this.maxEnergy);
            return intake; // Return nutrient consumed
        }

        if (this.energy <= 0) {
            this.isAlive = false;
        }

        this.age += 0.01;
        return 0;
    }

    canReproduce() {
        return this.energy > this.maxEnergy * 0.7 && this.age > 10;
    }

    reproduce() {
        this.energy -= this.maxEnergy * 0.4;
    }
}

window.Metabolism = Metabolism;
Riverside: 
