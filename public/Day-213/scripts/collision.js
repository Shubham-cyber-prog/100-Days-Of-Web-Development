class CollisionSystem {
    static check(b1, b2) {
        if (b1.type === 'circle' && b2.type === 'circle') {
            return this.checkCircleCircle(b1, b2);
        }
        if (b1.type === 'circle' && b2.type === 'box') {
            return this.checkCircleBox(b1, b2);
        }
        if (b1.type === 'box' && b2.type === 'circle') {
            return this.checkCircleBox(b2, b1);
        }
        // Box-Box would use SAT, keeping it simple for now
        return false;
    }

    static checkCircleCircle(c1, c2) {
        const dx = c2.position.x - c1.position.x;
        const dy = c2.position.y - c1.position.y;
        const distSq = dx * dx + dy * dy;
        const radiusSum = c1.radius + c2.radius;
        return distSq < radiusSum * radiusSum;
    }

    static checkCircleBox(circle, box) {
        // Simple AABB-Circle for now (not handling rotation yet)
        const hw = box.width / 2;
        const hh = box.height / 2;

        const closestX = Math.max(box.position.x - hw, Math.min(circle.position.x, box.position.x + hw));
        const closestY = Math.max(box.position.y - hh, Math.min(circle.position.y, box.position.y + hh));

        const dx = circle.position.x - closestX;
        const dy = circle.position.y - closestY;
        const distSq = dx * dx + dy * dy;

        return distSq < circle.radius * circle.radius;
    }

    static resolve(b1, b2, restitution) {
        if (b1.type === 'circle' && b2.type === 'circle') {
            this.resolveCircleCircle(b1, b2, restitution);
        }
    }

    static resolveCircleCircle(c1, c2, restitution) {
        const dx = c2.position.x - c1.position.x;
        const dy = c2.position.y - c1.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        const normal = { x: dx / dist, y: dy / dist };
        const overlap = (c1.radius + c2.radius) - dist;

        // Separate them based on mass
        const totalMass = (c1.isStatic ? 0 : c1.mass) + (c2.isStatic ? 0 : c2.mass);
        if (totalMass === 0) return;

        const m1Ratio = c1.isStatic ? 0 : (c2.isStatic ? 1 : c2.mass / totalMass);
        const m2Ratio = c2.isStatic ? 0 : (c1.isStatic ? 1 : c1.mass / totalMass);

        if (!c1.isStatic) {
            c1.position.x -= normal.x * overlap * m1Ratio;
            c1.position.y -= normal.y * overlap * m1Ratio;
        }
        if (!c2.isStatic) {
            c2.position.x += normal.x * overlap * m2Ratio;
            c2.position.y += normal.y * overlap * m2Ratio;
        }

        // Velocity correction (impulse-like for Verlet)
        // In Verlet, velocity is inferred from position change.
        // We can nudge the old positions to simulate bounce.
        const v1x = c1.position.x - c1.oldPosition.x;
        const v1y = c1.position.y - c1.oldPosition.y;
        const v2x = c2.position.x - c2.oldPosition.x;
        const v2y = c2.position.y - c2.oldPosition.y;

        const relativeVelocity = {
            x: v2x - v1x,
            y: v2y - v1y
        };

        const velAlongNormal = relativeVelocity.x * normal.x + relativeVelocity.y * normal.y;

        if (velAlongNormal > 0) return;

        const j = -(1 + restitution) * velAlongNormal;
        const impulse = {
            x: j * normal.x,
            y: j * normal.y
        };

        if (!c1.isStatic) {
            c1.oldPosition.x += impulse.x * m1Ratio;
            c1.oldPosition.y += impulse.y * m1Ratio;
        }
        if (!c2.isStatic) {
            c2.oldPosition.x -= impulse.x * m2Ratio;
            c2.oldPosition.y -= impulse.y * m2Ratio;
        }
    }
}

window.CollisionSystem = CollisionSystem;
