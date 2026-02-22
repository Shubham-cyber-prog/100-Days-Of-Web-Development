export default class WorldModel {
    constructor(width, length, height) {
        this.voxels = new Map(); // "x,y,z" -> color
    }

    setVoxel(x, y, z, color) {
        if (!color) {
            this.voxels.delete(`${x},${y},${z}`);
        } else {
            this.voxels.set(`${x},${y},${z}`, color);
        }
    }

    getSortedVoxels() {
        // Painters Algorithm: Sort by depth (Z then Y then X)
        const items = [];
        this.voxels.forEach((color, key) => {
            const [x, y, z] = key.split(',').map(Number);
            items.push({ x, y, z, color });
        });

        return items.sort((a, b) => {
            if (a.z !== b.z) return a.z - b.z;
            return (a.x + a.y) - (b.x + b.y);
        });
    }

    count() {
        return this.voxels.size;
    }

    clear() {
        this.voxels.clear();
    }
}
