/**
 * Force-Directed Graph Layout Engine
 * Implements N-body simulation for network topology optimization.
 */

export class ForceEngine {
    constructor(nodes, links) {
        this.nodes = nodes;
        this.links = links;
        this.attraction = 0.05;
        this.repulsion = 50.0;
        this.damping = 0.9;
    }

    update() {
        // Repulsion (Coulomb's Law approximation)
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const n1 = this.nodes[i];
                const n2 = this.nodes[j];
                const dx = n1.x - n2.x;
                const dy = n1.y - n2.y;
                const distSq = dx * dx + dy * dy + 0.1;
                const force = this.repulsion / distSq;

                const fx = (dx / Math.sqrt(distSq)) * force;
                const fy = (dy / Math.sqrt(distSq)) * force;

                n1.vx += fx; n1.vy += fy;
                n2.vx -= fx; n2.vy -= fy;
            }
        }

        // Attraction (Hooke's Law for spring links)
        this.links.forEach(link => {
            const n1 = this.nodes[link.source];
            const n2 = this.nodes[link.target];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = (dist - link.length) * this.attraction;

            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;

            n1.vx -= fx; n1.vy -= fy;
            n2.vx += fx; n2.vy += fy;
        });

        // Apply Forces & Center Gravity
        this.nodes.forEach(node => {
            // Apply velocity
            node.x += node.vx;
            node.y += node.vy;

            // Damping
            node.vx *= this.damping;
            node.vy *= this.damping;

            // Gravity to center
            node.vx += (400 - node.x) * 0.001;
            node.vy += (300 - node.y) * 0.001;
        });
    }
}
