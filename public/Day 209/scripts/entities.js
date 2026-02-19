/**
 * Game Entities - Coins, Spikes, Checkpoints, Goal
 */

export class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.collected = false;
        this.animationFrame = 0;
        this.value = 1;
    }

    collect() {
        this.collected = true;
    }

    draw(ctx, cameraX, cameraY, time) {
        if (this.collected) return;

        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // Spinning animation
        const scale = Math.abs(Math.sin(time * 0.005));
        const width = this.width * scale;

        ctx.fillStyle = '#ffbe0b';
        ctx.beginPath();
        ctx.ellipse(
            screenX + this.width / 2,
            screenY + this.height / 2,
            width / 2,
            this.height / 2,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Inner shine
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(
            screenX + this.width / 2,
            screenY + this.height / 2 - 3,
            width / 4,
            this.height / 4,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}

export class Spike {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // Draw triangular spikes
        ctx.fillStyle = '#ff006e';
        const numSpikes = Math.floor(this.width / 20);
        const spikeWidth = this.width / numSpikes;

        for (let i = 0; i < numSpikes; i++) {
            ctx.beginPath();
            ctx.moveTo(screenX + i * spikeWidth, screenY + this.height);
            ctx.lineTo(screenX + (i + 0.5) * spikeWidth, screenY);
            ctx.lineTo(screenX + (i + 1) * spikeWidth, screenY + this.height);
            ctx.closePath();
            ctx.fill();
        }

        // Outline
        ctx.strokeStyle = '#cc0058';
        ctx.lineWidth = 2;
        ctx.strokeRect(screenX, screenY, this.width, this.height);
    }
}

export class Checkpoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 40;
        this.activated = false;
    }

    activate() {
        this.activated = true;
    }

    draw(ctx, cameraX, cameraY, time) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // Flag pole
        ctx.fillStyle = '#666';
        ctx.fillRect(screenX + 8, screenY, 4, this.height);

        // Flag
        const flagColor = this.activated ? '#06ffa5' : '#aaa';
        ctx.fillStyle = flagColor;
        ctx.beginPath();
        ctx.moveTo(screenX + 12, screenY + 5);
        ctx.lineTo(screenX + 12, screenY + 20);
        ctx.lineTo(screenX + 30, screenY + 12.5);
        ctx.closePath();
        ctx.fill();

        // Glow effect when activated
        if (this.activated) {
            const glowSize = 5 + Math.sin(time * 0.01) * 2;
            ctx.shadowColor = '#06ffa5';
            ctx.shadowBlur = glowSize;
            ctx.fillStyle = 'rgba(6, 255, 165, 0.3)';
            ctx.fillRect(screenX, screenY, this.width, this.height);
            ctx.shadowBlur = 0;
        }
    }
}

export class Goal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 60;
    }

    draw(ctx, cameraX, cameraY, time) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // Portal effect
        const gradient = ctx.createRadialGradient(
            screenX + this.width / 2,
            screenY + this.height / 2,
            0,
            screenX + this.width / 2,
            screenY + this.height / 2,
            this.width / 2
        );
        gradient.addColorStop(0, '#00d9ff');
        gradient.addColorStop(0.5, '#0099cc');
        gradient.addColorStop(1, 'rgba(0, 153, 204, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(screenX, screenY, this.width, this.height);

        // Rotating particles
        for (let i = 0; i < 8; i++) {
            const angle = (time * 0.002) + (i * Math.PI / 4);
            const radius = 20;
            const px = screenX + this.width / 2 + Math.cos(angle) * radius;
            const py = screenY + this.height / 2 + Math.sin(angle) * radius;

            ctx.fillStyle = '#00d9ff';
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    /**
     * Create particles
     */
    emit(x, y, count, type = 'jump') {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const speed = 50 + Math.random() * 50;
            const particle = {
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                type
            };
            this.particles.push(particle);
        }
    }

    /**
     * Update particles
     */
    update(deltaTime) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * deltaTime * 0.01;
            p.y += p.vy * deltaTime * 0.01;
            p.life -= deltaTime * 0.001;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    /**
     * Draw particles
     */
    draw(ctx, cameraX, cameraY) {
        this.particles.forEach(p => {
            const screenX = p.x - cameraX;
            const screenY = p.y - cameraY;

            const colors = {
                jump: '#00d9ff',
                land: '#06ffa5',
                coin: '#ffbe0b',
                death: '#ff006e'
            };

            ctx.fillStyle = colors[p.type] || '#fff';
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(screenX, screenY, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }
}
