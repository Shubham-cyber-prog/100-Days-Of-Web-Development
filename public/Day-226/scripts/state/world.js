/**
 * World State Manager
 * Tracks the Sparse Voxel Octree data and simulation parameters.
 */

import { SparseVoxelOctree } from '../core/svo.js';

class World {
    constructor() {
        this.octree = new SparseVoxelOctree(8); // 256x256x256
        this.selectedColor = "#ffffff";
        this.currentTool = "add";
    }

    init() {
        // Create a floor
        for (let x = 0; x < 256; x += 4) {
            for (let z = 0; z < 256; z += 4) {
                this.octree.set(x, 0, z, "#333333");
            }
        }

        // Initial structure
        this.generateStructure(128, 10, 128);
    }

    generateStructure(cx, cy, cz) {
        for (let x = -20; x < 20; x++) {
            for (let y = 0; y < 40; y++) {
                for (let z = -20; z < 20; z++) {
                    if (Math.abs(x) < 5 || Math.abs(z) < 5 || y < 5) {
                        this.octree.set(cx + x, cy + y, cz + z, "#3b82f6");
                    }
                }
            }
        }
    }

    addVoxel(x, y, z) {
        this.octree.set(x, y, z, this.selectedColor);
    }

    removeVoxel(x, y, z) {
        this.octree.set(x, y, z, null);
    }
}

export const world = new World();
