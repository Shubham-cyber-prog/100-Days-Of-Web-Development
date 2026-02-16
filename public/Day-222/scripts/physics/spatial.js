/**
 * Quad-tree Spatial Partitioning
 * Optimizes N-body gravity calculations from O(n²) to O(n log n)
 * Uses Barnes-Hut algorithm for distant body approximation
 */

export class QuadTree {
    constructor(boundary, capacity = 4) {
        this.boundary = boundary; // {x, y, width, height}
        this.capacity = capacity;
        this.bodies = [];
        this.divided = false;

        // For Barnes-Hut: center of mass and total mass
        this.centerOfMass = { x: 0, y: 0 };
        this.totalMass = 0;
    }

    subdivide() {
        const { x, y, width, height } = this.boundary;
        const w = width / 2;
        const h = height / 2;

        this.northeast = new QuadTree({ x: x + w, y: y, width: w, height: h }, this.capacity);
        this.northwest = new QuadTree({ x: x, y: y, width: w, height: h }, this.capacity);
        this.southeast = new QuadTree({ x: x + w, y: y + h, width: w, height: h }, this.capacity);
        this.southwest = new QuadTree({ x: x, y: y + h, width: w, height: h }, this.capacity);

        this.divided = true;
    }

    insert(body) {
        if (!this.contains(body.position)) {
            return false;
        }

        if (this.bodies.length < this.capacity && !this.divided) {
            this.bodies.push(body);
            this.updateCenterOfMass();
            return true;
        }

        if (!this.divided) {
            this.subdivide();
            // Redistribute existing bodies
            for (const b of this.bodies) {
                this.northeast.insert(b) ||
                    this.northwest.insert(b) ||
                    this.southeast.insert(b) ||
                    this.southwest.insert(b);
            }
            this.bodies = [];
        }

        const inserted = this.northeast.insert(body) ||
            this.northwest.insert(body) ||
            this.southeast.insert(body) ||
            this.southwest.insert(body);

        if (inserted) {
            this.updateCenterOfMass();
        }

        return inserted;
    }

    contains(point) {
        return point.x >= this.boundary.x &&
            point.x < this.boundary.x + this.boundary.width &&
            point.y >= this.boundary.y &&
            point.y < this.boundary.y + this.boundary.height;
    }

    updateCenterOfMass() {
        let totalMass = 0;
        let comX = 0;
        let comY = 0;

        if (this.divided) {
            const children = [this.northeast, this.northwest, this.southeast, this.southwest];
            for (const child of children) {
                if (child.totalMass > 0) {
                    comX += child.centerOfMass.x * child.totalMass;
                    comY += child.centerOfMass.y * child.totalMass;
                    totalMass += child.totalMass;
                }
            }
        } else {
            for (const body of this.bodies) {
                comX += body.position.x * body.mass;
                comY += body.position.y * body.mass;
                totalMass += body.mass;
            }
        }

        if (totalMass > 0) {
            this.centerOfMass.x = comX / totalMass;
            this.centerOfMass.y = comY / totalMass;
        }
        this.totalMass = totalMass;
    }

    /**
     * Calculate gravitational force using Barnes-Hut approximation
     * @param {Object} body - Body to calculate force on
     * @param {number} theta - Approximation threshold (0.5 is typical)
     * @param {number} G - Gravitational constant
     * @param {number} softening - Softening parameter to prevent singularities
     */
    calculateForce(body, theta = 0.5, G = 6.674e-11, softening = 1) {
        if (this.totalMass === 0 || this.bodies.includes(body)) {
            return { x: 0, y: 0 };
        }

        const dx = this.centerOfMass.x - body.position.x;
        const dy = this.centerOfMass.y - body.position.y;
        const distSq = dx * dx + dy * dy + softening * softening;
        const dist = Math.sqrt(distSq);

        // If node is far enough, treat as single body
        const s = this.boundary.width;
        if (!this.divided || s / dist < theta) {
            const force = G * body.mass * this.totalMass / distSq;
            return {
                x: force * dx / dist,
                y: force * dy / dist
            };
        }

        // Otherwise, recurse into children
        let fx = 0, fy = 0;
        const children = [this.northeast, this.northwest, this.southeast, this.southwest];
        for (const child of children) {
            const childForce = child.calculateForce(body, theta, G, softening);
            fx += childForce.x;
            fy += childForce.y;
        }

        return { x: fx, y: fy };
    }

    /**
     * Draw quad-tree boundaries for visualization
     */
    draw(ctx) {
        ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.strokeRect(this.boundary.x, this.boundary.y, this.boundary.width, this.boundary.height);

        if (this.divided) {
            this.northeast.draw(ctx);
            this.northwest.draw(ctx);
            this.southeast.draw(ctx);
            this.southwest.draw(ctx);
        }
    }
}
