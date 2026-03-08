/**
 * Player Character Controller
 */

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 32;

        // Physics
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = 4;
        this.jumpPower = 12;

        // State
        this.isGrounded = false;
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
        this.facing = 'right';

        // Coyote time (grace period after leaving platform)
        this.coyoteTime = 150; // ms
        this.lastGroundedTime = 0;

        // Jump buffering
        this.jumpBufferTime = 100; // ms
        this.lastJumpPressTime = 0;

        // Respawn
        this.spawnX = x;
        this.spawnY = y;
        this.checkpointX = x;
        this.checkpointY = y;

        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
    }

    /**
     * Move left
     */
    moveLeft(deltaTime) {
        this.velocityX = -this.speed * deltaTime;
        this.facing = 'left';
    }

    /**
     * Move right
     */
    moveRight(deltaTime) {
        this.velocityX = this.speed * deltaTime;
        this.facing = 'right';
    }

    /**
     * Jump with coyote time and double jump
     */
    jump(currentTime) {
        this.lastJumpPressTime = currentTime;

        // Regular jump (on ground or within coyote time)
        if (this.isGrounded || this.canCoyoteJump(currentTime)) {
            this.velocityY = -this.jumpPower;
            this.isGrounded = false;
            this.hasDoubleJumped = false;
            return 'jump';
        }
        // Double jump
        else if (this.canDoubleJump && !this.hasDoubleJumped) {
            this.velocityY = -this.jumpPower * 0.9;
            this.hasDoubleJumped = true;
            this.canDoubleJump = false;
            return 'double-jump';
        }

        return null;
    }

    /**
     * Check if coyote time is active
     */
    canCoyoteJump(currentTime) {
        return (currentTime - this.lastGroundedTime) < this.coyoteTime;
    }

    /**
     * Check if jump buffer is active
     */
    hasJumpBuffer(currentTime) {
        return (currentTime - this.lastJumpPressTime) < this.jumpBufferTime;
    }

    /**
     * Update grounded state
     */
    updateGroundedState(isGrounded, currentTime) {
        if (isGrounded && !this.isGrounded) {
            // Just landed
            this.lastGroundedTime = currentTime;
            this.isGrounded = true;
            this.canDoubleJump = true;
            this.hasDoubleJumped = false;

            // Check jump buffer
            if (this.hasJumpBuffer(currentTime)) {
                this.jump(currentTime);
            }

            return 'land';
        } else if (!isGrounded && this.isGrounded) {
            // Just left ground
            this.lastGroundedTime = currentTime;
            this.isGrounded = false;
        } else if (isGrounded) {
            this.lastGroundedTime = currentTime;
        }

        return null;
    }

    /**
     * Set checkpoint
     */
    setCheckpoint(x, y) {
        this.checkpointX = x;
        this.checkpointY = y;
    }

    /**
     * Respawn at checkpoint
     */
    respawn() {
        this.x = this.checkpointX;
        this.y = this.checkpointY;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
    }

    /**
     * Reset to level start
     */
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.spawnX = x;
        this.spawnY = y;
        this.checkpointX = x;
        this.checkpointY = y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
        this.canDoubleJump = false;
        this.hasDoubleJumped = false;
    }

    /**
     * Draw player on canvas
     */
    draw(ctx, cameraX, cameraY) {
        const screenX = this.x - cameraX;
        const screenY = this.y - cameraY;

        // Draw player (simple rectangle for now)
        ctx.fillStyle = '#00d9ff';
        ctx.fillRect(screenX, screenY, this.width, this.height);

        // Draw eyes based on facing direction
        ctx.fillStyle = '#ffffff';
        if (this.facing === 'right') {
            ctx.fillRect(screenX + 14, screenY + 8, 4, 4);
            ctx.fillRect(screenX + 14, screenY + 16, 4, 4);
        } else {
            ctx.fillRect(screenX + 6, screenY + 8, 4, 4);
            ctx.fillRect(screenX + 6, screenY + 16, 4, 4);
        }

        // Draw velocity indicator (for debugging)
        if (Math.abs(this.velocityX) > 0.1 || Math.abs(this.velocityY) > 0.1) {
            ctx.strokeStyle = '#06ffa5';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(screenX + this.width / 2, screenY + this.height / 2);
            ctx.lineTo(
                screenX + this.width / 2 + this.velocityX * 3,
                screenY + this.height / 2 + this.velocityY * 3
            );
            ctx.stroke();
        }
    }

    /**
     * Get bounding box
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
