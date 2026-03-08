/**
 * Genetic Recombination and Mutation Engine
 */

class Genome {
    constructor(length = 64, data = null) {
        this.length = length;
        // Data is a Uint8Array representing binary genetic code
        this.data = data || new Uint8Array(length).map(() => Math.floor(Math.random() * 256));
    }

    /**
     * Bit-flip mutation: Randomly flips bits based on a mutation rate
     */
    mutate(rate = 0.01) {
        for (let i = 0; i < this.length; i++) {
            for (let bit = 0; bit < 8; bit++) {
                if (Math.random() < rate) {
                    this.data[i] ^= (1 << bit);
                }
            }
        }
    }

    /**
     * Single-point crossover: Combines two genomes at a random junction
     */
    static crossover(parentA, parentB) {
        const pivot = Math.floor(Math.random() * parentA.length);
        const childData = new Uint8Array(parentA.length);

        for (let i = 0; i < parentA.length; i++) {
            childData[i] = i < pivot ? parentA.data[i] : parentB.data[i];
        }

        return new Genome(parentA.length, childData);
    }

    /**
     * Normalizes a segment of the genome to a float [0, 1]
     */
    getTrait(index, offset = 0) {
        return this.data[index % this.length] / 255;
    }

    copy() {
        return new Genome(this.length, new Uint8Array(this.data));
    }
}

window.Genome = Genome;
