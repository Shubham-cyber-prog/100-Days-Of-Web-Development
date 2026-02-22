/**
 * Paddle Class
 * Handles movement, resizing, and rendering of the player's paddle.
 */

export class Paddle {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        // Initial dimensions
        this.baseWidth = 100;
        this.width = this.baseWidth;
        this.height = 12;

        // Position
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - 30;

        // Movement
        this.speed = 8;
        this.dx = 0;

        // Style
        this.color = '#00f3ff';
        this.glowColor = 'rgba(0, 243, 255, 0.8)';

        // State
        this.isExtended = false;
        this.extensionTimeout = null;
    }

    draw(ctx) {
        ctx.save();

        // Draw glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.glowColor;

        // Draw main paddle body
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.3, this.color);
        gradient.addColorStop(1, '#005577');

        ctx.fillStyle = gradient;

        // Rounded rectangle for paddle
        const radius = 6;
        ctx.beginPath();
        ctx.moveTo(this.x + radius, this.y);
        ctx.lineTo(this.x + this.width - radius, this.y);
        ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
        ctx.lineTo(this.x + this.width, this.y + this.height - radius);
        ctx.quadraticCurveTo(this.x + this.width, this.y + this.height, this.x + this.width - radius, this.y + this.height);
        ctx.lineTo(this.x + radius, this.y + this.height);
        ctx.quadraticCurveTo(this.x, this.y + this.height, this.x, this.y + this.height - radius);
        ctx.lineTo(this.x, this.y + radius);
        ctx.quadraticCurveTo(this.x, this.y, this.x + radius, this.y);
        ctx.closePath();
        ctx.fill();

        // Draw highlight line on top
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 2;
        ctx.moveTo(this.x + 10, this.y + 3);
        ctx.lineTo(this.x + this.width - 10, this.y + 3);
        ctx.stroke();

        ctx.restore();
    }

    update() {
        // Move paddle
        this.x += this.dx;

        // Boundary check
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.canvasWidth) {
            this.x = this.canvasWidth - this.width;
        }
    }

    moveLeft() {
        this.dx = -this.speed;
    }

    moveRight() {
        this.dx = this.speed;
    }

    stop() {
        this.dx = 0;
    }

    moveTo(targetX) {
        // Direct move (for mouse control)
        this.x = targetX - this.width / 2;

        // Boundary check
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > this.canvasWidth) {
            this.x = this.canvasWidth - this.width;
        }
    }

    extend(duration = 10000) {
        if (this.isExtended) {
            clearTimeout(this.extensionTimeout);
        } else {
            const oldWidth = this.width;
            this.width = this.baseWidth * 1.5;
            this.x -= (this.width - oldWidth) / 2; // Center after resize
            this.isExtended = true;
        }

        this.extensionTimeout = setTimeout(() => {
            const oldWidth = this.width;
            this.width = this.baseWidth;
            this.x += (oldWidth - this.width) / 2;
            this.isExtended = false;
        }, duration);
    }

    reset() {
        this.width = this.baseWidth;
        this.x = (this.canvasWidth - this.width) / 2;
        this.isExtended = false;
        if (this.extensionTimeout) {
            clearTimeout(this.extensionTimeout);
        }
    }
}
