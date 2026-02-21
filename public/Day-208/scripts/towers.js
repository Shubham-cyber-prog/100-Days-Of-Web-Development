/**
 * Tower Types and Upgrade System
 */

export const TOWER_TYPES = {
    archer: {
        name: 'Archer Tower',
        icon: '🏹',
        baseCost: 50,
        damage: 10,
        range: 100,
        fireRate: 1000, // ms
        projectileSpeed: 5,
        targeting: 'first',
        upgrades: [
            { cost: 40, damageBonus: 5, rangeBonus: 20 },
            { cost: 80, damageBonus: 10, rangeBonus: 30, fireRateBonus: -200 },
            { cost: 150, damageBonus: 20, rangeBonus: 50, fireRateBonus: -300 }
        ]
    },
    cannon: {
        name: 'Cannon Tower',
        icon: '💣',
        baseCost: 100,
        damage: 30,
        range: 80,
        fireRate: 2000,
        projectileSpeed: 3,
        targeting: 'strongest',
        splashRadius: 40,
        upgrades: [
            { cost: 80, damageBonus: 15, splashRadiusBonus: 10 },
            { cost: 150, damageBonus: 30, splashRadiusBonus: 20, fireRateBonus: -400 },
            { cost: 250, damageBonus: 50, splashRadiusBonus: 30, fireRateBonus: -600 }
        ]
    },
    freeze: {
        name: 'Freeze Tower',
        icon: '❄️',
        baseCost: 80,
        damage: 5,
        range: 90,
        fireRate: 1500,
        projectileSpeed: 4,
        targeting: 'nearest',
        slowEffect: 0.5, // 50% slow
        slowDuration: 2000, // ms
        upgrades: [
            { cost: 60, slowEffectBonus: 0.1, rangeBonus: 15 },
            { cost: 120, slowEffectBonus: 0.15, slowDurationBonus: 1000, rangeBonus: 25 },
            { cost: 200, slowEffectBonus: 0.2, slowDurationBonus: 2000, damageBonus: 10 }
        ]
    },
    laser: {
        name: 'Laser Tower',
        icon: '⚡',
        baseCost: 150,
        damage: 50,
        range: 120,
        fireRate: 500,
        projectileSpeed: 10,
        targeting: 'strongest',
        upgrades: [
            { cost: 120, damageBonus: 25, fireRateBonus: -100 },
            { cost: 200, damageBonus: 50, rangeBonus: 30, fireRateBonus: -150 },
            { cost: 350, damageBonus: 100, rangeBonus: 50, fireRateBonus: -200 }
        ]
    }
};

export class Tower {
    constructor(x, y, type, tileSize) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.tileSize = tileSize;
        this.level = 0;

        const config = TOWER_TYPES[type];
        this.damage = config.damage;
        this.range = config.range;
        this.fireRate = config.fireRate;
        this.projectileSpeed = config.projectileSpeed;
        this.targeting = config.targeting;
        this.splashRadius = config.splashRadius || 0;
        this.slowEffect = config.slowEffect || 0;
        this.slowDuration = config.slowDuration || 0;

        this.lastFireTime = 0;
        this.target = null;
    }

    /**
     * Upgrade tower to next level
     * @returns {number} - Upgrade cost or -1 if max level
     */
    upgrade() {
        const config = TOWER_TYPES[this.type];

        if (this.level >= config.upgrades.length) {
            return -1; // Max level
        }

        const upgrade = config.upgrades[this.level];
        this.level++;

        // Apply upgrades
        if (upgrade.damageBonus) this.damage += upgrade.damageBonus;
        if (upgrade.rangeBonus) this.range += upgrade.rangeBonus;
        if (upgrade.fireRateBonus) this.fireRate += upgrade.fireRateBonus;
        if (upgrade.splashRadiusBonus) this.splashRadius += upgrade.splashRadiusBonus;
        if (upgrade.slowEffectBonus) this.slowEffect += upgrade.slowEffectBonus;
        if (upgrade.slowDurationBonus) this.slowDuration += upgrade.slowDurationBonus;

        return upgrade.cost;
    }

    /**
     * Get upgrade cost for next level
     */
    getUpgradeCost() {
        const config = TOWER_TYPES[this.type];
        if (this.level >= config.upgrades.length) {
            return -1;
        }
        return config.upgrades[this.level].cost;
    }

    /**
     * Get sell value (50% of total investment)
     */
    getSellValue() {
        const config = TOWER_TYPES[this.type];
        let totalCost = config.baseCost;

        for (let i = 0; i < this.level; i++) {
            totalCost += config.upgrades[i].cost;
        }

        return Math.floor(totalCost * 0.5);
    }

    /**
     * Update tower (find and shoot at targets)
     */
    update(enemies, currentTime) {
        if (currentTime - this.lastFireTime < this.fireRate) {
            return null; // Not ready to fire
        }

        // Find target
        this.target = this.findTarget(enemies);

        if (this.target) {
            this.lastFireTime = currentTime;
            return this.createProjectile();
        }

        return null;
    }

    /**
     * Find target based on targeting strategy
     */
    findTarget(enemies) {
        const inRange = enemies.filter(enemy => {
            const dist = this.getDistance(enemy);
            return dist <= this.range && enemy.isAlive();
        });

        if (inRange.length === 0) return null;

        switch (this.targeting) {
            case 'first':
                // Furthest along path
                return inRange.reduce((best, enemy) =>
                    enemy.pathIndex > best.pathIndex ? enemy : best
                );

            case 'nearest':
                return inRange.reduce((best, enemy) => {
                    const dist = this.getDistance(enemy);
                    const bestDist = this.getDistance(best);
                    return dist < bestDist ? enemy : best;
                });

            case 'strongest':
                return inRange.reduce((best, enemy) =>
                    enemy.hp > best.hp ? enemy : best
                );

            default:
                return inRange[0];
        }
    }

    /**
     * Create projectile
     */
    createProjectile() {
        return {
            x: this.x * this.tileSize + this.tileSize / 2,
            y: this.y * this.tileSize + this.tileSize / 2,
            targetX: this.target.x,
            targetY: this.target.y,
            target: this.target,
            damage: this.damage,
            speed: this.projectileSpeed,
            type: this.type,
            splashRadius: this.splashRadius,
            slowEffect: this.slowEffect,
            slowDuration: this.slowDuration
        };
    }

    /**
     * Get distance to enemy
     */
    getDistance(enemy) {
        const dx = (this.x * this.tileSize + this.tileSize / 2) - enemy.x;
        const dy = (this.y * this.tileSize + this.tileSize / 2) - enemy.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Draw tower on canvas
     */
    draw(ctx, showRange = false) {
        const x = this.x * this.tileSize;
        const y = this.y * this.tileSize;

        // Draw range circle if selected
        if (showRange) {
            ctx.strokeStyle = 'rgba(78, 204, 163, 0.5)';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.arc(
                x + this.tileSize / 2,
                y + this.tileSize / 2,
                this.range,
                0,
                Math.PI * 2
            );
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Draw tower base
        const colors = {
            archer: '#8b4513',
            cannon: '#708090',
            freeze: '#87ceeb',
            laser: '#ff1493'
        };

        ctx.fillStyle = colors[this.type] || '#666';
        ctx.beginPath();
        ctx.arc(
            x + this.tileSize / 2,
            y + this.tileSize / 2,
            this.tileSize / 2 - 4,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw level indicator
        if (this.level > 0) {
            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(
                this.level,
                x + this.tileSize - 8,
                y + 8
            );
        }
    }
}
