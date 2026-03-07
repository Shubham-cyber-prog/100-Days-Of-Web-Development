/**
 * Enemy Waves and Movement System
 */

export const ENEMY_TYPES = {
    basic: {
        name: 'Scout',
        hp: 50,
        speed: 1.5,
        goldReward: 5,
        color: '#ff6b6b'
    },
    fast: {
        name: 'Runner',
        hp: 30,
        speed: 3,
        goldReward: 8,
        color: '#4ecdc4'
    },
    tank: {
        name: 'Tank',
        hp: 150,
        speed: 0.8,
        goldReward: 15,
        color: '#95e1d3'
    },
    boss: {
        name: 'Boss',
        hp: 500,
        speed: 1,
        goldReward: 50,
        color: '#f38181'
    }
};

export class Enemy {
    constructor(path, type, tileSize) {
        this.path = path;
        this.type = type;
        this.tileSize = tileSize;
        this.pathIndex = 0;

        const config = ENEMY_TYPES[type];
        this.maxHp = config.hp;
        this.hp = config.hp;
        this.baseSpeed = config.speed;
        this.speed = config.speed;
        this.goldReward = config.goldReward;
        this.color = config.color;

        // Position at start of path
        this.x = path[0].x * tileSize + tileSize / 2;
        this.y = path[0].y * tileSize + tileSize / 2;

        // Slow effect
        this.slowMultiplier = 1;
        this.slowEndTime = 0;
    }

    /**
     * Move along path
     * @param {number} deltaTime - Time since last frame
     * @param {number} currentTime - Current timestamp
     * @returns {boolean} - True if reached end
     */
    move(deltaTime, currentTime) {
        // Update slow effect
        if (currentTime > this.slowEndTime) {
            this.slowMultiplier = 1;
        }

        if (this.pathIndex >= this.path.length - 1) {
            return true; // Reached end
        }

        const target = this.path[this.pathIndex + 1];
        const targetX = target.x * this.tileSize + this.tileSize / 2;
        const targetY = target.y * this.tileSize + this.tileSize / 2;

        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 2) {
            // Reached waypoint
            this.pathIndex++;
            return false;
        }

        // Move towards target
        const effectiveSpeed = this.speed * this.slowMultiplier * deltaTime;
        const moveX = (dx / distance) * effectiveSpeed;
        const moveY = (dy / distance) * effectiveSpeed;

        this.x += moveX;
        this.y += moveY;

        return false;
    }

    /**
     * Take damage
     * @param {number} damage
     * @returns {boolean} - True if killed
     */
    takeDamage(damage) {
        this.hp -= damage;
        return this.hp <= 0;
    }

    /**
     * Apply slow effect
     * @param {number} slowMultiplier - 0.5 = 50% slow
     * @param {number} duration - Duration in ms
     * @param {number} currentTime
     */
    applySlow(slowMultiplier, duration, currentTime) {
        this.slowMultiplier = Math.min(this.slowMultiplier, slowMultiplier);
        this.slowEndTime = currentTime + duration;
    }

    /**
     * Check if alive
     */
    isAlive() {
        return this.hp > 0;
    }

    /**
     * Draw enemy on canvas
     */
    draw(ctx) {
        // Draw enemy body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tileSize / 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw HP bar
        const barWidth = this.tileSize - 8;
        const barHeight = 4;
        const hpPercent = this.hp / this.maxHp;

        ctx.fillStyle = '#333';
        ctx.fillRect(
            this.x - barWidth / 2,
            this.y - this.tileSize / 2 - 8,
            barWidth,
            barHeight
        );

        ctx.fillStyle = hpPercent > 0.5 ? '#4ecca3' : hpPercent > 0.25 ? '#ffd700' : '#ff4444';
        ctx.fillRect(
            this.x - barWidth / 2,
            this.y - this.tileSize / 2 - 8,
            barWidth * hpPercent,
            barHeight
        );

        // Draw slow indicator
        if (this.slowMultiplier < 1) {
            ctx.fillStyle = '#87ceeb';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('❄️', this.x, this.y - this.tileSize / 2 - 15);
        }
    }
}

/**
 * Wave Manager
 */
export class WaveManager {
    constructor() {
        this.currentWave = 0;
        this.waveInProgress = false;
    }

    /**
     * Generate enemies for a wave
     * @param {number} waveNumber
     * @param {Array} path
     * @param {number} tileSize
     * @returns {Array} - Array of enemies
     */
    generateWave(waveNumber, path, tileSize) {
        const enemies = [];
        const spawnDelay = 800; // ms between spawns

        // Wave composition based on wave number
        let basicCount = 5 + waveNumber * 2;
        let fastCount = Math.floor(waveNumber / 2);
        let tankCount = Math.floor(waveNumber / 3);
        let bossCount = waveNumber % 5 === 0 ? 1 : 0;

        let spawnTime = 0;

        // Spawn basic enemies
        for (let i = 0; i < basicCount; i++) {
            enemies.push({
                enemy: new Enemy(path, 'basic', tileSize),
                spawnTime: spawnTime
            });
            spawnTime += spawnDelay;
        }

        // Spawn fast enemies
        for (let i = 0; i < fastCount; i++) {
            enemies.push({
                enemy: new Enemy(path, 'fast', tileSize),
                spawnTime: spawnTime
            });
            spawnTime += spawnDelay;
        }

        // Spawn tanks
        for (let i = 0; i < tankCount; i++) {
            enemies.push({
                enemy: new Enemy(path, 'tank', tileSize),
                spawnTime: spawnTime
            });
            spawnTime += spawnDelay * 1.5;
        }

        // Spawn boss
        if (bossCount > 0) {
            enemies.push({
                enemy: new Enemy(path, 'boss', tileSize),
                spawnTime: spawnTime
            });
        }

        return enemies;
    }

    /**
     * Get total enemies in wave
     */
    getTotalEnemies(waveNumber) {
        let basicCount = 5 + waveNumber * 2;
        let fastCount = Math.floor(waveNumber / 2);
        let tankCount = Math.floor(waveNumber / 3);
        let bossCount = waveNumber % 5 === 0 ? 1 : 0;

        return basicCount + fastCount + tankCount + bossCount;
    }
}
