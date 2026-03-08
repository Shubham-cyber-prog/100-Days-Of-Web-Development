class QuadTree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // {x, y, w, h}
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, w, h } = this.boundary;
        const hw = w / 2;
        const hh = h / 2;

        this.northeast = new QuadTree({ x: x + hw, y, w: hw, h: hh }, this.capacity);
        this.northwest = new QuadTree({ x, y, w: hw, h: hh }, this.capacity);
        this.southeast = new QuadTree({ x: x + hw, y: y + hh, w: hw, h: hh }, this.capacity);
        this.southwest = new QuadTree({ x, y: y + hh, w: hw, h: hh }, this.capacity);

        this.divided = true;
    }

    insert(body) {
        if (!this.contains(body.position)) return false;

        if (this.points.length < this.capacity) {
            this.points.push(body);
            return true;
        }

        if (!this.divided) {
            this.subdivide();
        }

        return (
            this.northeast.insert(body) ||
            this.northwest.insert(body) ||
            this.southeast.insert(body) ||
            this.southwest.insert(body)
        );
    }

    contains(point) {
        return (
            point.x >= this.boundary.x &&
            point.x <= this.boundary.x + this.boundary.w &&
            point.y >= this.boundary.y &&
            point.y <= this.boundary.y + this.boundary.h
        );
    }

    query(range, found) {
        if (!found) found = [];
        if (!this.intersects(range)) return found;

        for (const p of this.points) {
            if (this.pointInRange(p.position, range)) {
                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }

    intersects(range) {
        return !(
            range.x > this.boundary.x + this.boundary.w ||
            range.x + range.w < this.boundary.x ||
            range.y > this.boundary.y + this.boundary.h ||
            range.y + range.h < this.boundary.y
        );
    }

    pointInRange(point, range) {
        return (
            point.x >= range.x &&
            point.x <= range.x + range.w &&
            point.y >= range.y &&
            point.y <= range.y + range.h
        );
    }
}

window.QuadTree = QuadTree;
