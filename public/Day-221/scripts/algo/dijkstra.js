/**
 * Dijkstra's Shortest Path Algorithm
 * Foundational shortest-path logic for single-source pathfinding
 */

export class DijkstraPathfinder {
    constructor(nodes, edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    /**
     * Calculate Euclidean distance between two nodes
     */
    static distance(node1, node2) {
        const dx = node2.x - node1.x;
        const dy = node2.y - node1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Build adjacency list from nodes
     */
    buildGraph() {
        const graph = new Map();

        // Initialize graph
        this.nodes.forEach(node => {
            graph.set(node.id, []);
        });

        // Add edges (complete graph for TSP)
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const distance = DijkstraPathfinder.distance(this.nodes[i], this.nodes[j]);

                graph.get(this.nodes[i].id).push({
                    node: this.nodes[j].id,
                    weight: distance
                });

                graph.get(this.nodes[j].id).push({
                    node: this.nodes[i].id,
                    weight: distance
                });
            }
        }

        return graph;
    }

    /**
     * Find shortest path from start to end using Dijkstra's algorithm
     */
    findPath(startId, endId) {
        const graph = this.buildGraph();
        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        // Initialize
        this.nodes.forEach(node => {
            distances.set(node.id, Infinity);
            previous.set(node.id, null);
            unvisited.add(node.id);
        });

        distances.set(startId, 0);

        while (unvisited.size > 0) {
            // Find node with minimum distance
            let currentId = null;
            let minDistance = Infinity;

            for (const nodeId of unvisited) {
                if (distances.get(nodeId) < minDistance) {
                    minDistance = distances.get(nodeId);
                    currentId = nodeId;
                }
            }

            if (currentId === null || currentId === endId) break;

            unvisited.delete(currentId);

            // Update distances to neighbors
            const neighbors = graph.get(currentId);
            for (const neighbor of neighbors) {
                if (!unvisited.has(neighbor.node)) continue;

                const alt = distances.get(currentId) + neighbor.weight;
                if (alt < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, alt);
                    previous.set(neighbor.node, currentId);
                }
            }
        }

        // Reconstruct path
        const path = [];
        let current = endId;

        while (current !== null) {
            path.unshift(current);
            current = previous.get(current);
        }

        return {
            path,
            distance: distances.get(endId)
        };
    }

    /**
     * Greedy Nearest Neighbor heuristic for TSP
     * Fast but not optimal
     */
    nearestNeighborTSP(startId = null) {
        if (this.nodes.length === 0) return { path: [], distance: 0 };

        const visited = new Set();
        const path = [];
        let totalDistance = 0;

        // Start from specified node or first node
        let current = startId || this.nodes[0].id;
        path.push(current);
        visited.add(current);

        while (visited.size < this.nodes.length) {
            let nearestNode = null;
            let nearestDistance = Infinity;

            const currentNode = this.nodes.find(n => n.id === current);

            for (const node of this.nodes) {
                if (visited.has(node.id)) continue;

                const dist = DijkstraPathfinder.distance(currentNode, node);
                if (dist < nearestDistance) {
                    nearestDistance = dist;
                    nearestNode = node.id;
                }
            }

            if (nearestNode) {
                path.push(nearestNode);
                visited.add(nearestNode);
                totalDistance += nearestDistance;
                current = nearestNode;
            }
        }

        // Return to start
        if (path.length > 1) {
            const firstNode = this.nodes.find(n => n.id === path[0]);
            const lastNode = this.nodes.find(n => n.id === path[path.length - 1]);
            totalDistance += DijkstraPathfinder.distance(lastNode, firstNode);
            path.push(path[0]);
        }

        return { path, distance: totalDistance };
    }
}

/**
 * Priority Queue for Dijkstra's algorithm
 */
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        this.items.push({ element, priority });
        this.items.sort((a, b) => a.priority - b.priority);
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}
