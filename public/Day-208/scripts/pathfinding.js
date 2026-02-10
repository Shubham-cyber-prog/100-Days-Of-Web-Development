/**
 * A* Pathfinding Algorithm for Enemy Movement
 */

export class Pathfinding {
    /**
     * Find path from start to end using A* algorithm
     * @param {object} start - {x, y}
     * @param {object} end - {x, y}
     * @param {Array} grid - 2D array where 0 = walkable, 1 = blocked
     * @returns {Array} - Array of {x, y} positions
     */
    static findPath(start, end, grid) {
        const openSet = [];
        const closedSet = new Set();
        const cameFrom = new Map();

        const gScore = new Map();
        const fScore = new Map();

        const startKey = `${start.x},${start.y}`;
        const endKey = `${end.x},${end.y}`;

        openSet.push(start);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(start, end));

        while (openSet.length > 0) {
            // Get node with lowest fScore
            let current = openSet[0];
            let currentIndex = 0;

            for (let i = 1; i < openSet.length; i++) {
                const key = `${openSet[i].x},${openSet[i].y}`;
                const currentKey = `${current.x},${current.y}`;

                if (fScore.get(key) < fScore.get(currentKey)) {
                    current = openSet[i];
                    currentIndex = i;
                }
            }

            const currentKey = `${current.x},${current.y}`;

            // Reached goal
            if (currentKey === endKey) {
                return this.reconstructPath(cameFrom, current);
            }

            // Move current from open to closed
            openSet.splice(currentIndex, 1);
            closedSet.add(currentKey);

            // Check neighbors
            const neighbors = this.getNeighbors(current, grid);

            for (const neighbor of neighbors) {
                const neighborKey = `${neighbor.x},${neighbor.y}`;

                if (closedSet.has(neighborKey)) {
                    continue;
                }

                const tentativeGScore = gScore.get(currentKey) + 1;

                if (!openSet.some(n => `${n.x},${n.y}` === neighborKey)) {
                    openSet.push(neighbor);
                } else if (tentativeGScore >= gScore.get(neighborKey)) {
                    continue;
                }

                // This path is the best so far
                cameFrom.set(neighborKey, current);
                gScore.set(neighborKey, tentativeGScore);
                fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, end));
            }
        }

        // No path found
        return [];
    }

    /**
     * Reconstruct path from cameFrom map
     */
    static reconstructPath(cameFrom, current) {
        const path = [current];
        let currentKey = `${current.x},${current.y}`;

        while (cameFrom.has(currentKey)) {
            current = cameFrom.get(currentKey);
            currentKey = `${current.x},${current.y}`;
            path.unshift(current);
        }

        return path;
    }

    /**
     * Manhattan distance heuristic
     */
    static heuristic(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    /**
     * Get walkable neighbors
     */
    static getNeighbors(node, grid) {
        const neighbors = [];
        const directions = [
            { x: 0, y: -1 }, // up
            { x: 1, y: 0 },  // right
            { x: 0, y: 1 },  // down
            { x: -1, y: 0 }  // left
        ];

        for (const dir of directions) {
            const x = node.x + dir.x;
            const y = node.y + dir.y;

            if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
                if (grid[y][x] === 0) { // walkable
                    neighbors.push({ x, y });
                }
            }
        }

        return neighbors;
    }

    /**
     * Create a simple predefined path for the game
     * @param {number} gridWidth
     * @param {number} gridHeight
     * @returns {Array} - Path waypoints
     */
    static createDefaultPath(gridWidth, gridHeight) {
        const path = [];
        const midY = Math.floor(gridHeight / 2);

        // Start from left
        for (let x = 0; x < Math.floor(gridWidth / 3); x++) {
            path.push({ x, y: midY });
        }

        // Go down
        for (let y = midY; y < midY + 4; y++) {
            path.push({ x: Math.floor(gridWidth / 3), y });
        }

        // Go right
        for (let x = Math.floor(gridWidth / 3); x < Math.floor(2 * gridWidth / 3); x++) {
            path.push({ x, y: midY + 4 });
        }

        // Go up
        for (let y = midY + 4; y >= midY - 2; y--) {
            path.push({ x: Math.floor(2 * gridWidth / 3), y });
        }

        // Go to end
        for (let x = Math.floor(2 * gridWidth / 3); x < gridWidth; x++) {
            path.push({ x, y: midY - 2 });
        }

        return path;
    }
}
