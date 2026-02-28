const BIOMES = {
    DEEP_OCEAN: { name: 'Deep Ocean', color: '#1a2a44', height: [0, 0.2] },
    OCEAN: { name: 'Ocean', color: '#2a4466', height: [0.2, 0.3] },
    BEACH: { name: 'Beach', color: '#e3c28e', height: [0.3, 0.35] },
    SCORCHED: { name: 'Scorched', color: '#555555', moisture: [0, 0.2], height: [0.8, 1] },
    BARE: { name: 'Bare', color: '#888888', moisture: [0.2, 0.4], height: [0.8, 1] },
    TUNDRA: { name: 'Tundra', color: '#bbbbaa', moisture: [0.4, 0.6], height: [0.8, 1] },
    SNOW: { name: 'Snow', color: '#ffffff', moisture: [0.6, 1], height: [0.8, 1] },
    TEMPERATE_DESERT: { name: 'Temperate Desert', color: '#c2b280', moisture: [0, 0.3], height: [0.35, 0.8] },
    SHRUBLAND: { name: 'Shrubland', color: '#889977', moisture: [0.3, 0.5], height: [0.35, 0.8] },
    GRASSLAND: { name: 'Grassland', color: '#88aa55', moisture: [0.5, 0.7], height: [0.35, 0.8] },
    FOREST: { name: 'Forest', color: '#679459', moisture: [0.7, 0.9], height: [0.35, 0.8] },
    RAINFOREST: { name: 'Rainforest', color: '#448855', moisture: [0.9, 1], height: [0.35, 0.8] }
};

class BiomeSystem {
    static getBiome(e, m) {
        // e: elevation (0-1), m: moisture (0-1)
        if (e < 0.2) return BIOMES.DEEP_OCEAN;
        if (e < 0.3) return BIOMES.OCEAN;
        if (e < 0.35) return BIOMES.BEACH;

        if (e > 0.8) {
            if (m < 0.1) return BIOMES.SCORCHED;
            if (m < 0.2) return BIOMES.BARE;
            if (m < 0.5) return BIOMES.TUNDRA;
            return BIOMES.SNOW;
        }

        if (e > 0.6) {
            if (m < 0.33) return BIOMES.TEMPERATE_DESERT;
            if (m < 0.66) return BIOMES.SHRUBLAND;
            return BIOMES.BARE;
        }

        if (e > 0.3) {
            if (m < 0.16) return BIOMES.TEMPERATE_DESERT;
            if (m < 0.33) return BIOMES.GRASSLAND;
            if (m < 0.66) return BIOMES.FOREST;
            return BIOMES.RAINFOREST;
        }

        return BIOMES.OCEAN;
    }
}

window.BIOMES = BIOMES;
window.BiomeSystem = BiomeSystem;
