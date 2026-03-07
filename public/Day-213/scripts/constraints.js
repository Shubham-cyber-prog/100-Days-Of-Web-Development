class Constraint {
    constructor(b1, b2, length, stiffness = 0.5) {
        this.b1 = b1;
        this.b2 = b2;
        this.length = length;
        this.stiffness = stiffness;
    }

    solve() {
        const dx = this.b2.position.x - this.b1.position.x;
        const dy = this.b2.position.y - this.b1.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        const diff = (this.length - dist) / dist * this.stiffness;
        const offsetX = dx * diff;
        const offsetY = dy * diff;

        const m1 = this.b1.isStatic ? 0 : 1 / this.b1.mass;
        const m2 = this.b2.isStatic ? 0 : 1 / this.b2.mass;
        const totalM = m1 + m2;

        if (totalM === 0) return;

        if (!this.b1.isStatic) {
            this.b1.position.x -= offsetX * (m1 / totalM);
            this.b1.position.y -= offsetY * (m1 / totalM);
        }
        if (!this.b2.isStatic) {
            this.b2.position.x += offsetX * (m2 / totalM);
            this.b2.position.y += offsetY * (m2 / totalM);
        }
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.b1.position.x, this.b1.position.y);
        ctx.lineTo(this.b2.position.x, this.b2.position.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

class PivotConstraint {
    constructor(body, point, length, stiffness = 1) {
        this.body = body;
        this.point = point;
        this.length = length;
        this.stiffness = stiffness;
    }

    solve() {
        const dx = this.body.position.x - this.point.x;
        const dy = this.body.position.y - this.point.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        const diff = (this.length - dist) / dist * this.stiffness;
        const offsetX = dx * diff;
        const offsetY = dy * diff;

        this.body.position.x += offsetX;
        this.body.position.y += offsetY;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.point.x, this.point.y);
        ctx.lineTo(this.body.position.x, this.body.position.y);
        ctx.strokeStyle = '#f43f5e';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#f43f5e';
        ctx.fill();
    }
}

window.Constraint = Constraint;
window.PivotConstraint = PivotConstraint;
