/**
 * Combat System and Enemy AI
 */

export class Enemy {
    constructor(x, y, type = 'goblin') {
        this.x = x;
        this.y = y;
        this.type = type;
        this.tileSize = 32;

        // Stats based on type
        const stats = this.getStatsForType(type);
        this.maxHp = stats.hp;
        this.hp = stats.hp;
        this.attack = stats.attack;
        this.defense = stats.defense;
        this.xpValue = stats.xp;
        this.color = stats.color;

        // AI State
        this.state = 'wander'; // wander or chase
        this.wanderTarget = null;
        this.lastMoveTime = 0;
        this.moveDelay = 300;
        this.lastAttackTime = 0;
        this.attackDelay = 1000;
        this.detectionRange = 6; // tiles
        this.attackRange = 1.2;
    }

    /**
     * Get stats for enemy type
     */
    getStatsForType(type) {
        const types = {
            goblin: { hp: 20, attack: 5, defense: 2, xp: 10, color: '#8b4513' },
            orc: { hp: 40, attack: 8, defense: 4, xp: 25, color: '#556b2f' },
            skeleton: { hp: 30, attack: 6, defense: 3, xp: 15, color: '#dcdcdc' }
        };
        return types[type] || types.goblin;
    }

    /**
     * Update enemy AI
     * @param {object} player
     * @param {Array} tiles
     */
    update(player, tiles) {
        const distToPlayer = this.getDistance(player);

        // State machine
        if (distToPlayer <= this.detectionRange) {
            this.state = 'chase';
        } else if (this.state === 'chase' && distToPlayer > this.detectionRange + 2) {
            this.state = 'wander';
        }

        if (this.state === 'chase') {
            this.chasePlayer(player, tiles);
            this.tryAttack(player);
        } else {
            this.wander(tiles);
        }
    }

    /**
     * Chase player
     */
    chasePlayer(player, tiles) {
        const now = Date.now();
        if (now - this.lastMoveTime < this.moveDelay) {
            return;
        }

        const dx = player.x - this.x;
        const dy = player.y - this.y;

        let moveX = 0;
        let moveY = 0;

        if (Math.abs(dx) > Math.abs(dy)) {
            moveX = dx > 0 ? 1 : -1;
        } else {
            moveY = dy > 0 ? 1 : -1;
        }

        if (this.canMoveTo(this.x + moveX, this.y + moveY, tiles)) {
            this.x += moveX;
            this.y += moveY;
            this.lastMoveTime = now;
        }
    }

    /**
     * Wander randomly
     */
    wander(tiles) {
        const now = Date.now();
        if (now - this.lastMoveTime < this.moveDelay * 2) {
            return;
        }

        if (!this.wanderTarget || Math.random() < 0.3) {
            const directions = [
                { x: 1, y: 0 },
                { x: -1, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: -1 }
            ];
            this.wanderTarget = directions[Math.floor(Math.random() * directions.length)];
        }

        const newX = this.x + this.wanderTarget.x;
        const newY = this.y + this.wanderTarget.y;

        if (this.canMoveTo(newX, newY, tiles)) {
            this.x = newX;
            this.y = newY;
            this.lastMoveTime = now;
        } else {
            this.wanderTarget = null;
        }
    }

    /**
     * Try to attack player
     */
    tryAttack(player) {
        const now = Date.now();
        if (now - this.lastAttackTime < this.attackDelay) {
            return null;
        }

        const dist = this.getDistance(player);
        if (dist <= this.attackRange) {
            this.lastAttackTime = now;
            const damage = Math.max(1, this.attack - player.defense);
            const actualDamage = player.takeDamage(damage);
            return actualDamage;
        }

        return null;
    }

    /**
     * Take damage
     */
    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
    }

    /**
     * Check if can move to position
     */
    canMoveTo(x, y, tiles) {
        if (y < 0 || y >= tiles.length || x < 0 || x >= tiles[0].length) {
            return false;
        }
        const tile = tiles[y][x];
        return tile === 0 || tile === 2; // floor or item
    }

    /**
     * Get distance to entity
     */
    getDistance(entity) {
        const dx = this.x - entity.x;
        const dy = this.y - entity.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Check if alive
     */
    isAlive() {
        return this.hp > 0;
    }

    /**
     * Draw enemy
     */
    draw(ctx, cameraX, cameraY, explored) {
        // Only draw if explored
        if (!explored[this.y] || !explored[this.y][this.x]) {
            return;
        }

        const screenX = (this.x - cameraX) * this.tileSize;
        const screenY = (this.y - cameraY) * this.tileSize;

        // Draw enemy
        ctx.fillStyle = this.color;
        ctx.fillRect(screenX + 6, screenY + 6, this.tileSize - 12, this.tileSize - 12);

        // Draw HP bar
        const barWidth = this.tileSize - 8;
        const barHeight = 4;
        const hpPercent = this.hp / this.maxHp;

        ctx.fillStyle = '#333';
        ctx.fillRect(screenX + 4, screenY + this.tileSize - 8, barWidth, barHeight);

        ctx.fillStyle = '#ff4444';
        ctx.fillRect(screenX + 4, screenY + this.tileSize - 8, barWidth * hpPercent, barHeight);
    }
}

/**
 * Combat Manager
 */
export class CombatManager {
    /**
     * Spawn enemies in dungeon rooms
     */
    static spawnEnemies(rooms, floor) {
        const enemies = [];
        const enemyTypes = ['goblin', 'orc', 'skeleton'];

        // Skip first room (player spawn)
        for (let i = 1; i < rooms.length; i++) {
            const room = rooms[i];
            const numEnemies = Math.floor(Math.random() * 3) + 1 + Math.floor(floor / 3);

            for (let j = 0; j < numEnemies; j++) {
                const x = room.x + Math.floor(Math.random() * room.width);
                const y = room.y + Math.floor(Math.random() * room.height);

                const typeIndex = Math.min(
                    Math.floor(Math.random() * (1 + floor / 2)),
                    enemyTypes.length - 1
                );
                const type = enemyTypes[typeIndex];

                enemies.push(new Enemy(x, y, type));
            }
        }

        return enemies;
    }
}
