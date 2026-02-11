/**
 * Physics Engine with Gravity, Velocity, and AABB Collision Detection
 */

export class Physics {
    constructor() {
        this.gravity = 0.6;
        this.maxFallSpeed = 15;
        this.friction = 0.8;
    }

    /**
     * Apply gravity to entity
     */
    applyGravity(entity, deltaTime) {
        entity.velocityY += this.gravity * deltaTime;
        entity.velocityY = Math.min(entity.velocityY, this.maxFallSpeed);
    }

    /**
     * Apply friction to horizontal movement
     */
    applyFriction(entity) {
        entity.velocityX *= this.friction;

        // Stop if very slow
        if (Math.abs(entity.velocityX) < 0.1) {
            entity.velocityX = 0;
        }
    }

    /**
     * Update entity position based on velocity
     */
    updatePosition(entity, deltaTime) {
        entity.x += entity.velocityX * deltaTime;
        entity.y += entity.velocityY * deltaTime;
    }

    /**
     * AABB (Axis-Aligned Bounding Box) collision detection
     * @param {object} a - First entity {x, y, width, height}
     * @param {object} b - Second entity {x, y, width, height}
     * @returns {boolean} - True if colliding
     */
    checkAABB(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    /**
     * Resolve collision between player and platform
     * @param {object} player
     * @param {object} platform
     * @returns {string|null} - Collision side ('top', 'bottom', 'left', 'right') or null
     */
    resolveCollision(player, platform) {
        if (!this.checkAABB(player, platform)) {
            return null;
        }

        // Calculate overlap on each axis
        const overlapX = Math.min(
            player.x + player.width - platform.x,
            platform.x + platform.width - player.x
        );
        const overlapY = Math.min(
            player.y + player.height - platform.y,
            platform.y + platform.height - player.y
        );

        // Resolve on axis with smallest overlap
        if (overlapX < overlapY) {
            // Horizontal collision
            if (player.x < platform.x) {
                // Hit from left
                player.x = platform.x - player.width;
                player.velocityX = 0;
                return 'left';
            } else {
                // Hit from right
                player.x = platform.x + platform.width;
                player.velocityX = 0;
                return 'right';
            }
        } else {
            // Vertical collision
            if (player.y < platform.y) {
                // Hit from top (landing on platform)
                player.y = platform.y - player.height;
                player.velocityY = 0;
                player.isGrounded = true;
                player.canDoubleJump = true;
                return 'top';
            } else {
                // Hit from bottom (hitting ceiling)
                player.y = platform.y + platform.height;
                player.velocityY = 0;
                return 'bottom';
            }
        }
    }

    /**
     * Check if player is on a moving platform
     */
    attachToMovingPlatform(player, platform) {
        if (platform.velocityX) {
            player.x += platform.velocityX;
        }
        if (platform.velocityY) {
            player.y += platform.velocityY;
        }
    }

    /**
     * Check point collision (for coins, checkpoints)
     */
    checkPointCollision(player, point, radius = 20) {
        const centerX = player.x + player.width / 2;
        const centerY = player.y + player.height / 2;
        const pointCenterX = point.x + (point.width || 0) / 2;
        const pointCenterY = point.y + (point.height || 0) / 2;

        const dx = centerX - pointCenterX;
        const dy = centerY - pointCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance < radius;
    }
}
