/**
 * Main Game Controller
 */

import { DungeonGenerator } from './dungeon.js';
import { Player } from './player.js';
import { Enemy, CombatManager } from './combat.js';
import { Item, ItemManager } from './items.js';

class DungeonGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Game settings
        this.tileSize = 32;
        this.viewWidth = 20;
        this.viewHeight = 15;
        this.canvas.width = this.viewWidth * this.tileSize;
        this.canvas.height = this.viewHeight * this.tileSize;

        // Game state
        this.floor = 1;
        this.dungeon = null;
        this.player = null;
        this.enemies = [];
        this.items = [];
        this.explored = []; // Fog of War

        // Camera
        this.cameraX = 0;
        this.cameraY = 0;

        // Input
        this.keys = {};

        this.init();
    }

    init() {
        this.bindEvents();
        this.generateDungeon();
        this.gameLoop();
    }

    bindEvents() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key === ' ') {
                e.preventDefault();
                this.handleAttack();
            } else if (e.key.toLowerCase() === 'e') {
                this.handleUseItem();
            } else if (e.key.toLowerCase() === 'q') {
                this.handleDropItem();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // UI Buttons
        document.getElementById('new-dungeon-btn').addEventListener('click', () => {
            this.floor = 1;
            this.generateDungeon();
        });

        document.getElementById('continue-btn').addEventListener('click', () => {
            document.getElementById('level-up-modal').classList.remove('active');
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            document.getElementById('game-over-modal').classList.remove('active');
            this.floor = 1;
            this.generateDungeon();
        });

        // Inventory clicks
        document.getElementById('inventory').addEventListener('click', (e) => {
            const slot = e.target.closest('.inventory-slot');
            if (slot) {
                const index = parseInt(slot.dataset.index);
                this.selectInventorySlot(index);
            }
        });
    }

    generateDungeon() {
        const generator = new DungeonGenerator(50, 50);
        const { tiles, rooms, startPos } = generator.generate(8 + Math.floor(this.floor / 2));

        this.dungeon = tiles;
        this.player = new Player(startPos.x, startPos.y);
        this.enemies = CombatManager.spawnEnemies(rooms, this.floor);
        this.items = ItemManager.spawnItems(rooms, this.floor);

        // Reset fog of war
        this.explored = Array(tiles.length).fill(0).map(() =>
            Array(tiles[0].length).fill(false)
        );

        this.updateUI();
        this.addMessage(`Entered floor ${this.floor}...`);
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (!this.player.isAlive()) {
            return;
        }

        // Handle movement
        let dx = 0;
        let dy = 0;

        if (this.keys['w'] || this.keys['arrowup']) dy = -1;
        if (this.keys['s'] || this.keys['arrowdown']) dy = 1;
        if (this.keys['a'] || this.keys['arrowleft']) dx = -1;
        if (this.keys['d'] || this.keys['arrowright']) dx = 1;

        if (dx !== 0 || dy !== 0) {
            if (this.player.move(dx, dy, this.dungeon)) {
                // Check for item pickup
                const item = ItemManager.checkPickup(this.player, this.items);
                if (item) {
                    if (this.player.addItem(item)) {
                        this.addMessage(`Picked up ${item.name}`);
                        this.updateInventory();
                    }
                }

                // Check for stairs
                if (this.dungeon[this.player.y][this.player.x] === 3) {
                    this.nextFloor();
                }
            }
        }

        // Update fog of war
        this.updateFogOfWar();

        // Update enemies
        this.enemies.forEach(enemy => {
            if (enemy.isAlive()) {
                enemy.update(this.player, this.dungeon);

                // Enemy attack
                const damage = enemy.tryAttack(this.player);
                if (damage) {
                    this.showDamageNumber(this.player.x, this.player.y, damage, 'damage');
                    this.updateUI();

                    if (!this.player.isAlive()) {
                        this.gameOver();
                    }
                }
            }
        });

        // Remove dead enemies
        this.enemies = this.enemies.filter(e => e.isAlive());

        // Update camera
        this.updateCamera();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw dungeon
        this.drawDungeon();

        // Draw items
        this.items.forEach(item => {
            item.draw(this.ctx, this.cameraX, this.cameraY, this.tileSize, this.explored);
        });

        // Draw enemies
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx, this.cameraX, this.cameraY, this.explored);
        });

        // Draw player
        this.player.draw(this.ctx, this.cameraX, this.cameraY);
    }

    drawDungeon() {
        for (let y = 0; y < this.dungeon.length; y++) {
            for (let x = 0; x < this.dungeon[y].length; x++) {
                const screenX = (x - this.cameraX) * this.tileSize;
                const screenY = (y - this.cameraY) * this.tileSize;

                // Skip if off-screen
                if (screenX < -this.tileSize || screenX > this.canvas.width ||
                    screenY < -this.tileSize || screenY > this.canvas.height) {
                    continue;
                }

                const tile = this.dungeon[y][x];
                const explored = this.explored[y][x];

                if (!explored) {
                    // Unexplored - black
                    this.ctx.fillStyle = '#000';
                    this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                } else {
                    // Draw based on tile type
                    if (tile === 1) {
                        // Wall
                        this.ctx.fillStyle = '#444';
                        this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                    } else if (tile === 0 || tile === 2) {
                        // Floor
                        this.ctx.fillStyle = '#222';
                        this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                    } else if (tile === 3) {
                        // Stairs
                        this.ctx.fillStyle = '#222';
                        this.ctx.fillRect(screenX, screenY, this.tileSize, this.tileSize);
                        this.ctx.fillStyle = '#ffd700';
                        this.ctx.fillRect(screenX + 8, screenY + 8, this.tileSize - 16, this.tileSize - 16);
                    }

                    // Grid lines
                    this.ctx.strokeStyle = '#111';
                    this.ctx.strokeRect(screenX, screenY, this.tileSize, this.tileSize);
                }
            }
        }
    }

    updateFogOfWar() {
        const visionRange = 5;

        for (let dy = -visionRange; dy <= visionRange; dy++) {
            for (let dx = -visionRange; dx <= visionRange; dx++) {
                const x = this.player.x + dx;
                const y = this.player.y + dy;

                if (y >= 0 && y < this.explored.length && x >= 0 && x < this.explored[0].length) {
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist <= visionRange) {
                        this.explored[y][x] = true;
                    }
                }
            }
        }
    }

    updateCamera() {
        this.cameraX = this.player.x - Math.floor(this.viewWidth / 2);
        this.cameraY = this.player.y - Math.floor(this.viewHeight / 2);

        // Clamp camera
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.dungeon[0].length - this.viewWidth));
        this.cameraY = Math.max(0, Math.min(this.cameraY, this.dungeon.length - this.viewHeight));
    }

    handleAttack() {
        const hits = this.player.attack(this.enemies);

        hits.forEach(({ enemy, damage }) => {
            this.showDamageNumber(enemy.x, enemy.y, damage, 'damage');

            if (!enemy.isAlive()) {
                const leveledUp = this.player.gainXP(enemy.xpValue);
                this.player.kills++;
                this.addMessage(`Defeated ${enemy.type}!`);

                if (leveledUp) {
                    this.showLevelUp();
                }
            }
        });

        this.updateUI();
    }

    handleUseItem() {
        const item = this.player.useItem();
        if (item) {
            this.addMessage(`Used ${item.name}`);
            this.showDamageNumber(this.player.x, this.player.y, item.value, 'heal');
            this.updateInventory();
            this.updateUI();
        }
    }

    handleDropItem() {
        const item = this.player.dropItem();
        if (item) {
            item.x = this.player.x;
            item.y = this.player.y;
            this.items.push(item);
            this.addMessage(`Dropped ${item.name}`);
            this.updateInventory();
        }
    }

    selectInventorySlot(index) {
        this.player.selectedSlot = index;
        this.updateInventory();
    }

    showDamageNumber(x, y, value, type) {
        const screenX = (x - this.cameraX) * this.tileSize + this.tileSize / 2;
        const screenY = (y - this.cameraY) * this.tileSize;

        const div = document.createElement('div');
        div.className = `damage-number ${type}`;
        div.textContent = type === 'heal' ? `+${value}` : `-${value}`;
        div.style.left = `${screenX}px`;
        div.style.top = `${screenY}px`;

        document.getElementById('damage-numbers').appendChild(div);

        setTimeout(() => div.remove(), 1000);
    }

    updateUI() {
        // Health
        const hpPercent = (this.player.hp / this.player.maxHp) * 100;
        document.getElementById('health-fill').style.width = `${hpPercent}%`;
        document.getElementById('health-text').textContent = `${this.player.hp}/${this.player.maxHp}`;

        // XP
        const xpPercent = (this.player.xp / this.player.xpToNextLevel) * 100;
        document.getElementById('xp-fill').style.width = `${xpPercent}%`;
        document.getElementById('xp-text').textContent = `${this.player.xp}/${this.player.xpToNextLevel}`;

        // Stats
        document.getElementById('level-text').textContent = this.player.level;
        document.getElementById('floor-text').textContent = this.floor;
        document.getElementById('stat-attack').textContent = this.player.attack;
        document.getElementById('stat-defense').textContent = this.player.defense;
        document.getElementById('stat-kills').textContent = this.player.kills;
    }

    updateInventory() {
        const container = document.getElementById('inventory');
        container.innerHTML = '';

        for (let i = 0; i < this.player.maxInventorySize; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.dataset.index = i;

            if (i < this.player.inventory.length) {
                const item = this.player.inventory[i];
                slot.innerHTML = `<span class="item-icon">${item.icon}</span>`;
                slot.title = item.name;
            } else {
                slot.classList.add('empty');
                slot.textContent = '—';
            }

            if (i === this.player.selectedSlot) {
                slot.classList.add('selected');
            }

            container.appendChild(slot);
        }
    }

    addMessage(text) {
        const log = document.getElementById('message-log');
        const p = document.createElement('p');
        p.textContent = text;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    showLevelUp() {
        document.getElementById('new-level').textContent = this.player.level;
        document.getElementById('level-up-modal').classList.add('active');
        this.addMessage(`Level up! Now level ${this.player.level}`);
    }

    nextFloor() {
        this.floor++;
        this.addMessage(`Descending to floor ${this.floor}...`);
        this.generateDungeon();
    }

    gameOver() {
        document.getElementById('death-floor').textContent = this.floor;
        document.getElementById('death-kills').textContent = this.player.kills;
        document.getElementById('game-over-modal').classList.add('active');
        this.addMessage('You died...');
    }
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
    new DungeonGame();
});
