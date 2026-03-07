/**
 * Ant Colony Optimization (ACO) Algorithm
 * Pheromone-based swarm intelligence for solving TSP
 * Based on the behavior of real ant colonies
 */

export class AntColonyOptimizer {
    constructor(nodes, params = {}) {
        this.nodes = nodes;

        // ACO Parameters
        this.numAnts = params.numAnts || 50;
        this.numIterations = params.numIterations || 100;
        this.alpha = params.alpha || 1; // Pheromone importance
        this.beta = params.beta || 2; // Distance importance
        this.evaporationRate = params.evaporationRate || 0.5;
        this.Q = params.Q || 100; // Pheromone deposit factor

        // Initialize pheromone matrix
        this.pheromones = this.initializePheromones();

        // Best solution tracking
        this.bestPath = null;
        this.bestDistance = Infinity;
        this.convergenceHistory = [];
    }

    /**
     * Initialize pheromone matrix with small random values
     */
    initializePheromones() {
        const n = this.nodes.length;
        const pheromones = Array(n).fill(null).map(() => Array(n).fill(0.1));
        return pheromones;
    }

    /**
     * Calculate Euclidean distance between two nodes
     */
    distance(i, j) {
        const dx = this.nodes[j].x - this.nodes[i].x;
        const dy = this.nodes[j].y - this.nodes[i].y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Calculate probability of moving from node i to node j
     */
    calculateProbability(i, j, visited) {
        if (visited.has(j)) return 0;

        const pheromone = Math.pow(this.pheromones[i][j], this.alpha);
        const visibility = Math.pow(1 / (this.distance(i, j) + 0.001), this.beta);

        return pheromone * visibility;
    }

    /**
     * Select next node based on probabilities
     */
    selectNextNode(currentIdx, visited) {
        const probabilities = [];
        let totalProbability = 0;

        for (let i = 0; i < this.nodes.length; i++) {
            const prob = this.calculateProbability(currentIdx, i, visited);
            probabilities.push(prob);
            totalProbability += prob;
        }

        if (totalProbability === 0) {
            // Random selection if all probabilities are 0
            const unvisited = [];
            for (let i = 0; i < this.nodes.length; i++) {
                if (!visited.has(i)) unvisited.push(i);
            }
            return unvisited[Math.floor(Math.random() * unvisited.length)];
        }

        // Roulette wheel selection
        let random = Math.random() * totalProbability;
        let sum = 0;

        for (let i = 0; i < probabilities.length; i++) {
            sum += probabilities[i];
            if (sum >= random) return i;
        }

        return this.nodes.length - 1;
    }

    /**
     * Construct a tour for a single ant
     */
    constructAntTour() {
        const visited = new Set();
        const tour = [];

        // Start from random node
        let current = Math.floor(Math.random() * this.nodes.length);
        tour.push(current);
        visited.add(current);

        // Build tour
        while (visited.size < this.nodes.length) {
            const next = this.selectNextNode(current, visited);
            tour.push(next);
            visited.add(next);
            current = next;
        }

        // Return to start
        tour.push(tour[0]);

        return tour;
    }

    /**
     * Calculate total distance of a tour
     */
    calculateTourDistance(tour) {
        let totalDistance = 0;
        for (let i = 0; i < tour.length - 1; i++) {
            totalDistance += this.distance(tour[i], tour[i + 1]);
        }
        return totalDistance;
    }

    /**
     * Update pheromones based on ant tours
     */
    updatePheromones(antTours) {
        // Evaporation
        for (let i = 0; i < this.pheromones.length; i++) {
            for (let j = 0; j < this.pheromones[i].length; j++) {
                this.pheromones[i][j] *= (1 - this.evaporationRate);
            }
        }

        // Deposit pheromones
        for (const { tour, distance } of antTours) {
            const deposit = this.Q / distance;

            for (let i = 0; i < tour.length - 1; i++) {
                const from = tour[i];
                const to = tour[i + 1];
                this.pheromones[from][to] += deposit;
                this.pheromones[to][from] += deposit; // Symmetric
            }
        }
    }

    /**
     * Run ACO algorithm
     */
    async solve(onProgress = null) {
        this.bestPath = null;
        this.bestDistance = Infinity;
        this.convergenceHistory = [];

        const startTime = performance.now();

        for (let iteration = 0; iteration < this.numIterations; iteration++) {
            const antTours = [];

            // Construct tours for all ants
            for (let ant = 0; ant < this.numAnts; ant++) {
                const tour = this.constructAntTour();
                const distance = this.calculateTourDistance(tour);

                antTours.push({ tour, distance });

                // Update best solution
                if (distance < this.bestDistance) {
                    this.bestDistance = distance;
                    this.bestPath = [...tour];
                }
            }

            // Update pheromones
            this.updatePheromones(antTours);

            // Track convergence
            this.convergenceHistory.push(this.bestDistance);

            // Progress callback
            if (onProgress) {
                await onProgress({
                    iteration: iteration + 1,
                    bestDistance: this.bestDistance,
                    bestPath: this.bestPath
                });
            }

            // Allow UI to update
            if (iteration % 10 === 0) {
                await new Promise(resolve => setTimeout(resolve, 0));
            }
        }

        const endTime = performance.now();

        // Convert indices to node IDs
        const pathIds = this.bestPath.map(idx => this.nodes[idx].id);

        return {
            path: pathIds,
            distance: this.bestDistance,
            convergenceHistory: this.convergenceHistory,
            computationTime: endTime - startTime,
            iterations: this.numIterations
        };
    }

    /**
     * Get pheromone strength between two nodes (for visualization)
     */
    getPheromone(i, j) {
        return this.pheromones[i][j];
    }
}
