/**
 * Ball Class
 * Handles movement, collisions with walls/paddle/bricks, and rendering.
 */

export class Ball {
    constructor(canvasWidth, canvasHeight, paddle) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.paddle = paddle;

        this.radius = 8;
        this.reset();

        // Style
        this.color = '#ffffff';
        this.glowColor = 'rgba(255, 255, 255, 0.8)';

        // State
        this.isStuck = true; // Starts stuck to the paddle
    }

    reset() {
        this.x = this.paddle.x + this.paddle.width / 2;
        this.y = this.paddle.y - this.radius;
        this.speed = 5;
        this.dx = 0;
        this.dy = 0;
        this.isStuck = true;
    }

    launch() {
        if (this.isStuck) {
            this.isStuck = false;
            this.dx = (Math.random() - 0.5) * 6; // Random initial X direction
            this.dy = -this.speed;
        }
    }

    draw(ctx) {
        ctx.save();

        // Draw glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.glowColor;

        // Radial gradient for 3D look
        const gradient = ctx.createRadialGradient(
            this.x - this.radius * 0.3,
            this.y - this.radius * 0.3,
            this.radius * 0.1,
            this.x,
            this.y,
            this.radius
        );
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(1, '#00f3ff');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    update() {
        if (this.isStuck) {
            this.x = this.paddle.x + this.paddle.width / 2;
            this.y = this.paddle.y - this.radius;
            return;
        }

        this.x += this.dx;
        this.y += this.dy;

        // Wall collisions
        if (this.x + this.radius > this.canvasWidth || this.x - this.radius < 0) {
            this.dx *= -1;
            this.spawnBounceEffect(this.x, this.y);
        }

        if (this.y - this.radius < 0) {
            this.dy *= -1;
            this.spawnBounceEffect(this.x, this.y);
        }

        // Paddle collision
        if (
            this.y + this.radius > this.paddle.y &&
            this.y - this.radius < this.paddle.y + this.paddle.height &&
            this.x > this.paddle.x &&
            this.x < this.paddle.x + this.paddle.width
        ) {
            // Calculate bounce angle based on where it hit the paddle
            const hitPoint = (this.x - (this.paddle.x + this.paddle.width / 2)) / (this.paddle.width / 2);
            const maxAngle = Math.PI / 3; // 60 degrees
            const bounceAngle = hitPoint * maxAngle;

            this.dx = this.speed * Math.sin(bounceAngle);
            this.dy = -this.speed * Math.cos(bounceAngle);

            // Push out of paddle to avoid multi-collision
            this.y = this.paddle.y - this.radius;

            this.spawnBounceEffect(this.x, this.y);
        }
    }

    spawnBounceEffect(x, y) {
        // This would be hooked into a particle system in game.js
        const event = new CustomEvent('ball-bounce', { detail: { x, y } });
        window.dispatchEvent(event);
    }

    isOutOfBounds() {
        return this.y - this.radius > this.canvasHeight;
    }

    increaseSpeed(multiplier = 1.1) {
        this.speed *= multiplier;
        // Normalize dx and dy to new speed
        const currentSpeed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        this.dx = (this.dx / currentSpeed) * this.speed;
        this.dy = (this.dy / currentSpeed) * this.speed;
    }
}
