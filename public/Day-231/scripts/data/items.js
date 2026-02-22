export const ItemRegistry = {
    'DECRYPT_KEY_VOX': {
        name: "Vox Encryption Key",
        description: "Standard security bypass tool for early civilian ships.",
        type: "UTILITY"
    },
    'DATA_PAD': {
        name: "Old Data Pad",
        description: "Belonged to a crew member. Might contain logs.",
        type: "LORE"
    },
    'ENERGY_CELL': {
        name: "Energy Cell",
        description: "Restores 25 Energy points.",
        type: "CONSUMABLE",
        onUse: (player) => player.energy = Math.min(player.maxEnergy, player.energy + 25)
    }
};
