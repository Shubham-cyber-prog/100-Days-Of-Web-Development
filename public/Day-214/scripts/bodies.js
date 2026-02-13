/**
 * Rigid Bodies and Obstacles
 */

class ObstacleSystem {
    constructor() {
        this.obstacles = [];
    }

    addBox(x, y, w, h) {
        this.obstacles.push({
            type: 'box',
            x: x,
            y: y,
            w: w,
            h: h
        });
    }

    addCircle(x, y, r) {
        this.obstacles.push({
            type: 'circle',
            x: x,
            y: y,
            r: r
        });
    }

    resolveCollisions(particles) {
        for (const p of particles) {
            for (const ob of this.obstacles) {
                if (ob.type === 'box') {
                    this.resolveBox(p, ob);
                } else if (ob.type === 'circle') {
                    this.resolveCircle(p, ob);
                }
            }
        }
    }

    resolveBox(p, box) {
        const margin = 2;
        if (p.x > box.x - margin && p.x < box.x + box.w + margin &&
            p.y > box.y - margin && p.y < box.y + box.h + margin) {

            // Find closest edge
            const dLeft = p.x - box.x;
            const dRight = (box.x + box.w) - p.x;
            const dTop = p.y - box.y;
            const dBottom = (box.y + box.h) - p.y;

            const min = Math.min(dLeft, dRight, dTop, dBottom);

            if (min === dLeft) { p.x = box.x - margin; p.vx *= -0.5; }
            else if (min === dRight) { p.x = box.x + box.w + margin; p.vx *= -0.5; }
            else if (min === dTop) { p.y = box.y - margin; p.vy *= -0.5; }
            else { p.y = box.y + box.h + margin; p.vy *= -0.5; }
        }
    }

    resolveCircle(p, circ) {
        const dx = p.x - circ.x;
        const dy = p.y - circ.y;
        const dist2 = dx * dx + dy * dy;
        const minHeight = circ.r + 2;

        if (dist2 < minHeight * minHeight) {
            const dist = Math.sqrt(dist2);
            const nx = dx / dist;
            const ny = dy / dist;

            // Repel
            p.x = circ.x + nx * minHeight;
            p.y = circ.y + ny * minHeight;

            // Reflect velocity
            const dot = p.vx * nx + p.vy * ny;
            p.vx = (p.vx - 2 * dot * nx) * 0.5;
            p.vy = (p.vy - 2 * dot * ny) * 0.5;
        }
    }
}
