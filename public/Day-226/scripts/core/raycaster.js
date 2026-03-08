/**
 * DDA Raymarching Engine
 * High-performance voxel traversal for Sparse Voxel Octrees.
 */

export class Raycaster {
    constructor(world) {
        this.world = world; // Reference to SVO
    }

    cast(origin, direction, maxDist = 500) {
        let t = 0;
        const pos = { ...origin };

        // Ray direction normalization
        const invDir = {
            x: 1 / (direction.x || 0.0001),
            y: 1 / (direction.y || 0.0001),
            z: 1 / (direction.z || 0.0001)
        };

        const step = {
            x: Math.sign(direction.x),
            y: Math.sign(direction.y),
            z: Math.sign(direction.z)
        };

        // Current voxel coordinate
        let vx = Math.floor(pos.x);
        let vy = Math.floor(pos.y);
        let vz = Math.floor(pos.z);

        // Distance to next voxel boundary
        const tDelta = {
            x: Math.abs(invDir.x),
            y: Math.abs(invDir.y),
            z: Math.abs(invDir.z)
        };

        let tMax = {
            x: (step.x > 0 ? vx + 1 - pos.x : pos.x - vx) * tDelta.x,
            y: (step.y > 0 ? vy + 1 - pos.y : pos.y - vy) * tDelta.y,
            z: (step.z > 0 ? vz + 1 - pos.z : pos.z - vz) * tDelta.z
        };

        let lastNormal = { x: 0, y: 0, z: 0 };

        // Grid Traversal Loop
        while (t < maxDist) {
            // Check current voxel in SVO
            const color = this.world.get(vx, vy, vz);
            if (color) {
                return { hit: true, x: vx, y: vy, z: vz, color, normal: lastNormal, t };
            }

            // Step to next voxel
            if (tMax.x < tMax.y) {
                if (tMax.x < tMax.z) {
                    t = tMax.x;
                    tMax.x += tDelta.x;
                    vx += step.x;
                    lastNormal = { x: -step.x, y: 0, z: 0 };
                } else {
                    t = tMax.z;
                    tMax.z += tDelta.z;
                    vz += step.z;
                    lastNormal = { x: 0, y: 0, z: -step.z };
                }
            } else {
                if (tMax.y < tMax.z) {
                    t = tMax.y;
                    tMax.y += tDelta.y;
                    vy += step.y;
                    lastNormal = { x: 0, y: -step.y, z: 0 };
                } else {
                    t = tMax.z;
                    tMax.z += tDelta.z;
                    vz += step.z;
                    lastNormal = { x: 0, y: 0, z: -step.z };
                }
            }
        }

        return { hit: false };
    }
}
