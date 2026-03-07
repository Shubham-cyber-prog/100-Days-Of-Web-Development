/**
 * Player Entity with movement and attributes
 */

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tileSize = 32;

        // Stats
        this.maxHp = 100;
        this.hp = 100;
        this.attack = 10;
        this.defense = 5;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 100;
        this.kills = 0;

        // Movement
        this.speed = 1; // Tiles per move
        this.lastMoveTime = 0;
        this.moveDelay = 150; // ms between moves

        // Combat
        this.lastAttackTime = 0;
        this.attackDelay = 500;
        this.attackRange = 1.5; // tiles

        // Inventory
        this.inventory = [];
        this.maxInventorySize = 12;
        this.selectedSlot = -1;
    }

    /**
     * Move player
     * @param {number} dx - Delta X
     * @param {number} dy - Delta Y
     * @param {Array} tiles - Dungeon tiles
     * @returns {boolean} - True if moved
     */
    move(dx, dy, tiles) {
        const now = Date.now();
        if (now - this.lastMoveTime < this.moveDelay) {
            return false;
        }

        const newX = this.x + dx;
        const newY = this.y + dy;

        // Check bounds and collision
        if (this.canMoveTo(newX, newY, tiles)) {
            this.x = newX;
            this.y = newY;
            this.lastMoveTime = now;
            return true;
        }

        return false;
    }

    /**
     * Check if player can move to position
     */
    canMoveTo(x, y, tiles) {
        if (y < 0 || y >= tiles.length || x < 0 || x >= tiles[0].length) {
            return false;
        }

        const tile = tiles[y][x];
        return tile === 0 || tile === 2 || tile === 3; // floor, item, stairs
    }

    /**
     * Attack nearby enemies
     * @param {Array} enemies
     * @returns {Array} - Hit enemies
     */
    attack(enemies) {
        const now = Date.now();
        if (now - this.lastAttackTime < this.attackDelay) {
            return [];
        }

        this.lastAttackTime = now;
        const hitEnemies = [];

        enemies.forEach(enemy => {
            const dist = this.getDistance(enemy);
            if (dist <= this.attackRange) {
                const damage = Math.max(1, this.attack - enemy.defense);
                enemy.takeDamage(damage);
                hitEnemies.push({ enemy, damage });
            }
        });

        return hitEnemies;
    }

    /**
     * Take damage
     * @param {number} damage
     * @returns {number} - Actual damage taken
     */
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - this.defense);
        this.hp = Math.max(0, this.hp - actualDamage);
        return actualDamage;
    }

    /**
     * Heal player
     * @param {number} amount
     */
    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    /**
     * Gain XP
     * @param {number} amount
     * @returns {boolean} - True if leveled up
     */
    gainXP(amount) {
        this.xp += amount;

        if (this.xp >= this.xpToNextLevel) {
            this.levelUp();
            return true;
        }

        return false;
    }

    /**
     * Level up
     */
    levelUp() {
        this.level++;
        this.xp -= this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);

        // Stat increases
        this.maxHp += 10;
        this.hp = this.maxHp; // Full heal on level up
        this.attack += 2;
        this.defense += 1;
    }

    /**
     * Add item to inventory
     * @param {object} item
     * @returns {boolean} - True if added
     */
    addItem(item) {
        if (this.inventory.length < this.maxInventorySize) {
            this.inventory.push(item);
            return true;
        }
        return false;
    }

    /**
     * Use selected item
     * @returns {object|null} - Used item or null
     */
    useItem() {
        if (this.selectedSlot >= 0 && this.selectedSlot < this.inventory.length) {
            const item = this.inventory[this.selectedSlot];

            // Apply item effect
            if (item.type === 'potion') {
                this.heal(item.value);
                this.inventory.splice(this.selectedSlot, 1);
                this.selectedSlot = -1;
                return item;
            }
        }
        return null;
    }

    /**
     * Drop selected item
     * @returns {object|null} - Dropped item or null
     */
    dropItem() {
        if (this.selectedSlot >= 0 && this.selectedSlot < this.inventory.length) {
            const item = this.inventory.splice(this.selectedSlot, 1)[0];
            this.selectedSlot = -1;
            return item;
        }
        return null;
    }

    /**
     * Get distance to another entity
     */
    getDistance(entity) {
        const dx = this.x - entity.x;
        const dy = this.y - entity.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Check if player is alive
     */
    isAlive() {
        return this.hp > 0;
    }

    /**
     * Draw player on canvas
     */
    draw(ctx, cameraX, cameraY) {
        const screenX = (this.x - cameraX) * this.tileSize;
        const screenY = (this.y - cameraY) * this.tileSize;

        // Draw player (simple square for now)
        ctx.fillStyle = '#4ecca3';
        ctx.fillRect(screenX + 4, screenY + 4, this.tileSize - 8, this.tileSize - 8);

        // Draw attack indicator
        if (Date.now() - this.lastAttackTime < 200) {
            ctx.strokeStyle = '#ff4444';
            ctx.lineWidth = 3;
            ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
        }
    }
}
