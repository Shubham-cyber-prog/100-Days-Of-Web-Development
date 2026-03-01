class StructureGenerator {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    generateCities(elevation, biomes, count = 5) {
        const structures = [];
        let attempts = 0;

        while (structures.length < count && attempts < 100) {
            attempts++;
            const x = Math.floor(Math.random() * (this.width - 4)) + 2;
            const y = Math.floor(Math.random() * (this.height - 4)) + 2;

            const e = elevation[y][x];
            const biome = biomes[y][x];

            // Cities prefer flat land near water but not in water
            if (e > 0.35 && e < 0.6 && biome.name !== 'Ocean' && biome.name !== 'Deep Ocean') {
                // Check if too close to another city
                const tooClose = structures.some(s => Math.hypot(s.x - x, s.y - y) < 10);
                if (!tooClose) {
                    structures.push({ type: 'city', x, y, size: Math.floor(Math.random() * 3) + 2 });
                }
            }
        }

        return structures;
    }

    generatePOIs(elevation, biomes, count = 10) {
        const pois = [];
        for (let i = 0; i < count; i++) {
            const x = Math.floor(Math.random() * this.width);
            const y = Math.floor(Math.random() * this.height);
            const e = elevation[y][x];

            if (e > 0.8) {
                pois.push({ type: 'mountain_keep', x, y });
            } else if (e < 0.32 && e > 0.28) {
                pois.push({ type: 'lighthouse', x, y });
            }
        }
        return pois;
    }
}

window.StructureGenerator = StructureGenerator;
