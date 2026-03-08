class Particle {
    constructor(x, y, vx, vy, options = {}) {
        this.position = { x, y };
        this.velocity = { x: vx, y: vy };
        this.life = options.life || 1.0;
        this.maxLife = this.life;
        this.color = options.color || '#ffffff';
        this.size = options.size || 2;
        this.gravity = options.gravity !== undefined ? options.gravity : 0.1;
        this.fade = options.fade !== undefined ? options.fade : true;
    }

    update(dt) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.y += this.gravity;
        this.life -= dt * (1.0 / this.maxLife);
    }

    render(ctx) {
        ctx.save();
        if (this.fade) {
            ctx.globalAlpha = Math.max(0, this.life);
        }
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit(x, y, count, options = {}) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            this.particles.push(new Particle(x, y, vx, vy, options));
        }
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(dt);
            if (this.particles[i].life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx) {
        for (const p of this.particles) {
            p.render(ctx);
        }
    }
}

window.ParticleSystem = ParticleSystem;
