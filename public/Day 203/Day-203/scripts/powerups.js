/**
 * Powerups System
 * Handles spawning, falling, and collection of game modifiers.
 */

export const POWERUP_TYPES = {
    EXTEND_PADDLE: { id: 'ext', color: '#00f3ff', label: 'WIDE', icon: '↔', chance: 0.3 },
    MULTI_BALL: { id: 'multi', color: '#ff3366', label: 'TRIO', icon: '⚽', chance: 0.2 },
    LASER: { id: 'laser', color: '#ff00ff', label: 'LASER', icon: '⚡', chance: 0.1 },
    SLOW_BALL: { id: 'slow', color: '#39ff14', label: 'SLOW', icon: '⏳', chance: 0.4 }
};

export class PowerupManager {
    constructor(canvasWidth, canvasHeight, paddle) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.paddle = paddle;

        this.items = [];
        this.size = 20;
        this.fallSpeed = 3;
    }

    spawn(x, y) {
        // Only spawn occasionally
        if (Math.random() > 0.8) {
            const keys = Object.keys(POWERUP_TYPES);
            const type = POWERUP_TYPES[keys[Math.floor(Math.random() * keys.length)]];

            this.items.push({
                x: x,
                y: y,
                type: type,
                status: 1
            });
        }
    }

    draw(ctx) {
        ctx.save();
        this.items.forEach(p => {
            if (p.status === 0) return;

            // Draw circular capsule
            ctx.beginPath();
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.type.color;
            ctx.fillStyle = p.type.color;
            ctx.arc(p.x, p.y, this.size / 2, 0, Math.PI * 2);
            ctx.fill();

            // Draw inner icon/label
            ctx.fillStyle = '#000000';
            ctx.font = 'bold 12px Rajdhani';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.type.icon, p.x, p.y);
        });
        ctx.restore();
    }

    update() {
        let collected = [];

        for (let i = 0; i < this.items.length; i++) {
            const p = this.items[i];
            if (p.status === 0) continue;

            p.y += this.fallSpeed;

            // Collision with paddle
            if (
                p.y + this.size / 2 > this.paddle.y &&
                p.y - this.size / 2 < this.paddle.y + this.paddle.height &&
                p.x > this.paddle.x &&
                p.x < this.paddle.x + this.paddle.width
            ) {
                p.status = 0;
                collected.push(p.type);
            }

            // Boundary check
            if (p.y > this.canvasHeight) {
                p.status = 0;
            }
        }

        return collected;
    }

    reset() {
        this.items = [];
    }
}
