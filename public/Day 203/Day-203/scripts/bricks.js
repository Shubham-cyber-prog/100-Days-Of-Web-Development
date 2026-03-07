/**
 * Brick Manager
 * Handles level generation, brick grids, and destruction logic.
 */

export class BrickManager {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;

        this.padding = 10;
        this.offsetTop = 60;
        this.offsetLeft = 35;

        this.bricks = [];
        this.brickWidth = 70;
        this.brickHeight = 25;

        this.themes = [
            { id: 1, name: 'Neon Blue', color: '#00f3ff', glow: 'rgba(0, 243, 255, 0.5)' },
            { id: 2, name: 'Magmatic', color: '#ff3366', glow: 'rgba(255, 51, 102, 0.5)' },
            { id: 3, name: 'Toxic', color: '#39ff14', glow: 'rgba(57, 255, 20, 0.5)' },
            { id: 4, name: 'Electric', color: '#ffff00', glow: 'rgba(255, 255, 0, 0.5)' },
            { id: 5, name: 'Void', color: '#ff00ff', glow: 'rgba(255, 0, 255, 0.5)' }
        ];
    }

    createLevel(levelNumber) {
        this.bricks = [];
        const rows = 3 + Math.floor(levelNumber / 2);
        const cols = 9;

        // Calculate dynamic padding to center bricks
        const totalGridWidth = cols * (this.brickWidth + this.padding) - this.padding;
        this.offsetLeft = (this.canvasWidth - totalGridWidth) / 2;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const brickX = c * (this.brickWidth + this.padding) + this.offsetLeft;
                const brickY = r * (this.brickHeight + this.padding) + this.offsetTop;

                // Determine brick health/type
                let health = 1;
                if (levelNumber > 2 && Math.random() < 0.2) health = 2; // Harder bricks

                const theme = this.themes[r % this.themes.length];

                this.bricks.push({
                    x: brickX,
                    y: brickY,
                    w: this.brickWidth,
                    h: this.brickHeight,
                    health: health,
                    maxHealth: health,
                    color: theme.color,
                    glow: theme.glow,
                    points: (rows - r) * 10,
                    status: 1 // 1 = visible
                });
            }
        }
    }

    draw(ctx) {
        this.bricks.forEach(brick => {
            if (brick.status === 0) return;

            ctx.save();

            // Draw glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = brick.glow;

            // Adjust appearance based on health
            if (brick.health > 1) {
                // Cracked/Heavy look
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(brick.x, brick.y, brick.w, brick.h);
            }

            // Rounded corners for bricks
            const r = 4;
            ctx.beginPath();
            ctx.moveTo(brick.x + r, brick.y);
            ctx.lineTo(brick.x + brick.w - r, brick.y);
            ctx.quadraticCurveTo(brick.x + brick.w, brick.y, brick.x + brick.w, brick.y + r);
            ctx.lineTo(brick.x + brick.w, brick.y + brick.h - r);
            ctx.quadraticCurveTo(brick.x + brick.w, brick.y + brick.h, brick.x + brick.w - r, brick.y + brick.h);
            ctx.lineTo(brick.x + r, brick.y + brick.h);
            ctx.quadraticCurveTo(brick.x, brick.y + brick.h, brick.x, brick.y + brick.h - r);
            ctx.lineTo(brick.x, brick.y + r);
            ctx.quadraticCurveTo(brick.x, brick.y, brick.x + r, brick.y);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(brick.x, brick.y, brick.x, brick.y + brick.h);
            gradient.addColorStop(0, brick.color);
            gradient.addColorStop(1, '#000000');
            ctx.fillStyle = gradient;
            ctx.fill();

            // Bevel highlight
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.restore();
        });
    }

    checkCollision(ball) {
        let hitResult = null;

        for (let i = 0; i < this.bricks.length; i++) {
            const b = this.bricks[i];

            if (b.status === 1) {
                if (
                    ball.x + ball.radius > b.x &&
                    ball.x - ball.radius < b.x + b.w &&
                    ball.y + ball.radius > b.y &&
                    ball.y - ball.radius < b.y + b.h
                ) {
                    // Collision detected
                    // Determine if horizontal or vertical collision
                    const prevBallX = ball.x - ball.dx;
                    const prevBallY = ball.y - ball.dy;

                    if (prevBallX <= b.x || prevBallX >= b.x + b.w) {
                        ball.dx *= -1;
                    } else {
                        ball.dy *= -1;
                    }

                    b.health -= 1;
                    if (b.health <= 0) {
                        b.status = 0;
                        hitResult = {
                            destroyed: true,
                            x: b.x + b.w / 2,
                            y: b.y + b.h / 2,
                            points: b.points,
                            color: b.color
                        };
                    } else {
                        hitResult = {
                            destroyed: false,
                            x: b.x + b.w / 2,
                            y: b.y + b.h / 2,
                            color: b.color
                        };
                    }

                    break; // Only hit one brick per check
                }
            }
        }

        return hitResult;
    }

    getRemainingBricks() {
        return this.bricks.filter(b => b.status === 1).length;
    }

    reset() {
        this.bricks = [];
    }
}
