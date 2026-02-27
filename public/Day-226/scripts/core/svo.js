/**
 * Sparse Voxel Octree (SVO) Implementation
 * High-performance hierarchical spatial partitioning for volumetric data.
 */

export class OctreeNode {
    constructor(isLeaf = false, color = null) {
        this.isLeaf = isLeaf;
        this.color = color;
        this.children = isLeaf ? null : Array(8).fill(null);
    }
}

export class SparseVoxelOctree {
    constructor(maxDepth = 8) {
        this.maxDepth = maxDepth;
        this.worldSize = Math.pow(2, maxDepth);
        this.root = new OctreeNode();
    }

    set(x, y, z, color) {
        this._set(this.root, 0, 0, 0, this.worldSize, 0, x, y, z, color);
    }

    _set(node, nx, ny, nz, size, depth, x, y, z, color) {
        if (depth === this.maxDepth) {
            node.isLeaf = true;
            node.color = color;
            node.children = null;
            return;
        }

        const half = size / 2;
        const ix = x < nx + half ? 0 : 1;
        const iy = y < ny + half ? 0 : 1;
        const iz = z < nz + half ? 0 : 1;
        const childIdx = ix + (iy << 1) + (iz << 2);

        if (!node.children[childIdx]) {
            node.children[childIdx] = new OctreeNode();
        }

        this._set(
            node.children[childIdx],
            nx + ix * half,
            ny + iy * half,
            nz + iz * half,
            half,
            depth + 1,
            x, y, z, color
        );

        // Optimization: Collapse identical children
        this.collapse(node);
    }

    get(x, y, z) {
        let node = this.root;
        let nx = 0, ny = 0, nz = 0;
        let size = this.worldSize;

        for (let d = 0; d <= this.maxDepth; d++) {
            if (node.isLeaf) return node.color;
            if (!node.children) return null;

            const half = size / 2;
            const ix = x < nx + half ? 0 : 1;
            const iy = y < ny + half ? 0 : 1;
            const iz = z < nz + half ? 0 : 1;
            const childIdx = ix + (iy << 1) + (iz << 2);

            node = node.children[childIdx];
            if (!node) return null;

            nx += ix * half;
            ny += iy * half;
            nz += iz * half;
            size = half;
        }
        return node.color;
    }

    collapse(node) {
        if (node.isLeaf) return;

        // Only collapse if all children exist, are leaves, and have same color
        const first = node.children[0];
        if (!first || !first.isLeaf || first.color === null) return;

        for (let i = 1; i < 8; i++) {
            const child = node.children[i];
            if (!child || !child.isLeaf || child.color !== first.color) return;
        }

        node.isLeaf = true;
        node.color = first.color;
        node.children = null;
    }

    clear() {
        this.root = new OctreeNode();
    }
}
