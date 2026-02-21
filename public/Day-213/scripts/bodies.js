class Body {
    constructor(x, y, options = {}) {
        this.position = { x, y };
        this.oldPosition = { x, y };
        this.acceleration = { x: 0, y: 0 };

        this.mass = options.mass || 1;
        this.isStatic = options.isStatic || false;
        this.color = options.color || '#38bdf8';
        this.type = 'generic';
    }

    update(dt, friction) {
        if (this.isStatic) return;

        const vx = (this.position.x - this.oldPosition.x) * friction;
        const vy = (this.position.y - this.oldPosition.y) * friction;

        this.oldPosition.x = this.position.x;
        this.oldPosition.y = this.position.y;

        this.position.x += vx + this.acceleration.x * dt * dt;
        this.position.y += vy + this.acceleration.y * dt * dt;

        this.acceleration.x = 0;
        this.acceleration.y = 0;
    }
}

class CircleBody extends Body {
    constructor(x, y, radius, options = {}) {
        super(x, y, options);
        this.radius = radius;
        this.type = 'circle';
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.stroke();
    }
}

class BoxBody extends Body {
    constructor(x, y, width, height, options = {}) {
        super(x, y, options);
        this.width = width;
        this.height = height;
        this.type = 'box';
        this.rotation = options.rotation || 0;
    }

    getVertices() {
        const hw = this.width / 2;
        const hh = this.height / 2;
        const vertices = [
            { x: -hw, y: -hh },
            { x: hw, y: -hh },
            { x: hw, y: hh },
            { x: -hw, y: hh }
        ];

        return vertices.map(v => {
            const rx = v.x * Math.cos(this.rotation) - v.y * Math.sin(this.rotation);
            const ry = v.x * Math.sin(this.rotation) + v.y * Math.cos(this.rotation);
            return {
                x: this.position.x + rx,
                y: this.position.y + ry
            };
        });
    }

    render(ctx) {
        const vertices = this.getVertices();
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.stroke();
    }
}

window.CircleBody = CircleBody;
window.BoxBody = BoxBody;
