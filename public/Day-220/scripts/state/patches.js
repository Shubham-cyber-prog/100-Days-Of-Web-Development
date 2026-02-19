/**
 * Patch Persistence System
 * Handles serialization and deserialization of synth patches.
 */

import { engine } from '../core/audioBus.js';

class PatchManager {
    constructor() {
        this.currentPatch = {
            name: "Initial Patch",
            nodes: [],
            connections: []
        };
    }

    save(nodes, connections) {
        const patchData = {
            version: "1.0",
            timestamp: Date.now(),
            name: `Patch_${new Date().toISOString()}`,
            nodes: nodes.map(n => ({
                id: n.id,
                type: n.type,
                x: n.x,
                y: n.y,
                params: n.instance ? n.instance.getParams() : {}
            })),
            connections: connections
        };

        const blob = new Blob([JSON.stringify(patchData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${patchData.name}.json`;
        a.click();

        engine.log(`Patch exported: ${patchData.name}`);
    }

    load(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    engine.log(`Loading patch: ${data.name}`);
                    resolve(data);
                } catch (err) {
                    engine.log("Error: Invalid patch file.");
                    reject(err);
                }
            };
            reader.readAsText(file);
        });
    }
}

export const patches = new PatchManager();
