/**
 * Tower Defense Main Game Controller
 */

import { Pathfinding } from './pathfinding.js';
import { Tower, TOWER_TYPES } from './towers.js';
import { Enemy, WaveManager } from './enemies.js';
import { Economy, ScoreCalculator } from './economy.js';

class TowerDefenseGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Game settings
        this.gridWidth = 20;
        this.gridHeight = 15;
        this.tileSize = 40;
        this.canvas.width = this.gridWidth * this.tileSize;
        this.canvas.height = this.gridHeight * this.tileSize;

        // Game state
        this.grid = Array(this.gridHeight).fill(0).map(() => Array(this.gridWidth).fill(0));
        this.path = Pathfinding.createDefaultPath(this.gridWidth, this.gridHeight);
        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.waveManager = new WaveManager();
        this.economy = new Economy();

        // UI state
        this.selectedTowerType = null;
        this.selectedTower = null;
        this.hoveredCell = null;
        this.gameSpeed = 1;

        // Wave state
        this.currentWave = 0;
        this.waveEnemies = [];
        this.waveStartTime = 0;
        this.enemiesSpawned = 0;
        this.enemiesKilled = 0;

        // Animation
        this.lastFrameTime = 0;

        this.init();
    }

    init() {
        this.markPathOnGrid();
        this.bindEvents();
        this.renderTowerShop();
        this.updateUI();
        this.loadHighScore();
        this.gameLoop(0);
    }

    markPathOnGrid() {
        this.path.forEach(pos => {
            this.grid[pos.y][pos.x] = 1; // Mark as path
        });
    }

    bindEvents() {
        // Canvas click
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / this.tileSize);
            const y = Math.floor((e.clientY - rect.top) / this.tileSize);
            this.handleCellClick(x, y);
        });

        // Canvas hover
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / this.tileSize);
            const y = Math.floor((e.clientY - rect.top) / this.tileSize);
            this.hoveredCell = { x, y };
        });

        // Buttons
        document.getElementById('start-wave').addEventListener('click', () => {
            this.startWave();
        });

        document.getElementById('speed-toggle').addEventListener('click', () => {
            this.toggleSpeed();
        });

        document.getElementById('sell-tower').addEventListener('click', () => {
            this.sellSelectedTower();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }

    renderTowerShop() {
        const shop = document.getElementById('tower-shop');
        shop.innerHTML = '';

        Object.keys(TOWER_TYPES).forEach(type => {
            const config = TOWER_TYPES[type];
            const btn = document.createElement('button');
            btn.className = 'tower-btn';
            btn.innerHTML = `
                <span class="icon">${config.icon}</span>
                <span class="name">${config.name}</span>
                <span class="cost">💰 ${config.baseCost}</span>
            `;

            btn.addEventListener('click', () => {
                this.selectTowerType(type);
            });

            shop.appendChild(btn);
        });
    }

    selectTowerType(type) {
        this.selectedTowerType = type;
        this.selectedTower = null;

        // Update UI
        document.querySelectorAll('.tower-btn').forEach((btn, i) => {
            btn.classList.remove('selected');
            if (Object.keys(TOWER_TYPES)[i] === type) {
                btn.classList.add('selected');
            }
        });

        this.updateTowerInfo();
    }

    handleCellClick(x, y) {
        // Check if clicking on existing tower
        const tower = this.towers.find(t => t.x === x && t.y === y);

        if (tower) {
            this.selectedTower = tower;
            this.selectedTowerType = null;
            this.updateTowerInfo();
            return;
        }

        // Try to place tower
        if (this.selectedTowerType) {
            this.placeTower(x, y);
        }
    }

    placeTower(x, y) {
        // Check if valid placement
        if (this.grid[y][x] !== 0) {
            this.addMessage('Cannot place tower on path!');
            return;
        }

        if (this.towers.some(t => t.x === x && t.y === y)) {
            this.addMessage('Cell already occupied!');
            return;
        }

        const cost = TOWER_TYPES[this.selectedTowerType].baseCost;

        if (!this.economy.spendGold(cost)) {
            this.addMessage('Not enough gold!');
            return;
        }

        const tower = new Tower(x, y, this.selectedTowerType, this.tileSize);
        this.towers.push(tower);
        this.grid[y][x] = 2; // Mark as tower

        this.addMessage(`Built ${TOWER_TYPES[this.selectedTowerType].name}`);
        this.updateUI();
    }

    sellSelectedTower() {
        if (!this.selectedTower) return;

        const sellValue = this.selectedTower.getSellValue();
        this.economy.addGold(sellValue);

        this.grid[this.selectedTower.y][this.selectedTower.x] = 0;
        this.towers = this.towers.filter(t => t !== this.selectedTower);

        this.addMessage(`Sold tower for 💰${sellValue}`);
        this.selectedTower = null;
        this.updateTowerInfo();
        this.updateUI();
    }

    startWave() {
        if (this.waveEnemies.length > 0) {
            this.addMessage('Wave already in progress!');
            return;
        }

        this.currentWave++;
        this.waveEnemies = this.waveManager.generateWave(
            this.currentWave,
            this.path,
            this.tileSize
        );
        this.waveStartTime = Date.now();
        this.enemiesSpawned = 0;
        this.enemiesKilled = 0;

        this.addMessage(`🌊 Wave ${this.currentWave} started!`);
        this.updateUI();
    }

    toggleSpeed() {
        this.gameSpeed = this.gameSpeed === 1 ? 2 : 1;
        document.getElementById('speed-toggle').textContent = `Speed: ${this.gameSpeed}x`;
    }

    gameLoop(timestamp) {
        const deltaTime = (timestamp - this.lastFrameTime) * this.gameSpeed;
        this.lastFrameTime = timestamp;

        this.update(deltaTime, timestamp);
        this.render();

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(deltaTime, currentTime) {
        // Spawn enemies
        if (this.waveEnemies.length > 0) {
            const elapsed = currentTime - this.waveStartTime;

            while (this.enemiesSpawned < this.waveEnemies.length) {
                const next = this.waveEnemies[this.enemiesSpawned];
                if (elapsed >= next.spawnTime) {
                    this.enemies.push(next.enemy);
                    this.enemiesSpawned++;
                } else {
                    break;
                }
            }
        }

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            const reachedEnd = enemy.move(deltaTime, currentTime);

            if (reachedEnd) {
                this.enemies.splice(i, 1);
                const gameOver = this.economy.loseLife();
                this.addMessage('❤️ Enemy reached the end!');
                this.updateUI();

                if (gameOver) {
                    this.endGame();
                }
            }
        }

        // Update towers
        this.towers.forEach(tower => {
            const projectile = tower.update(this.enemies, currentTime);
            if (projectile) {
                this.projectiles.push(projectile);
            }
        });

        // Update projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const proj = this.projectiles[i];

            // Move projectile
            const dx = proj.targetX - proj.x;
            const dy = proj.targetY - proj.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < proj.speed * deltaTime) {
                // Hit target
                this.handleProjectileHit(proj);
                this.projectiles.splice(i, 1);
            } else {
                proj.x += (dx / dist) * proj.speed * deltaTime;
                proj.y += (dy / dist) * proj.speed * deltaTime;

                // Update target position if still alive
                if (proj.target && proj.target.isAlive()) {
                    proj.targetX = proj.target.x;
                    proj.targetY = proj.target.y;
                }
            }
        }

        // Check wave completion
        if (this.waveEnemies.length > 0 &&
            this.enemiesSpawned === this.waveEnemies.length &&
            this.enemies.length === 0) {
            this.completeWave();
        }
    }

    handleProjectileHit(proj) {
        if (!proj.target || !proj.target.isAlive()) return;

        // Apply damage
        const killed = proj.target.takeDamage(proj.damage);

        // Apply slow effect
        if (proj.slowEffect > 0) {
            proj.target.applySlow(proj.slowEffect, proj.slowDuration, Date.now());
        }

        // Splash damage
        if (proj.splashRadius > 0) {
            this.enemies.forEach(enemy => {
                if (enemy === proj.target) return;

                const dx = enemy.x - proj.target.x;
                const dy = enemy.y - proj.target.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist <= proj.splashRadius) {
                    enemy.takeDamage(proj.damage * 0.5);
                }
            });
        }

        if (killed) {
            const gold = ScoreCalculator.calculateKillScore(proj.target, this.currentWave);
            this.economy.addGold(gold);
            this.enemiesKilled++;
            this.updateUI();
        }
    }

    completeWave() {
        const bonus = this.economy.completeWave(this.currentWave);
        this.addMessage(`✅ Wave ${this.currentWave} complete! Bonus: 💰${bonus}`);
        this.waveEnemies = [];
        this.updateUI();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid
        this.drawGrid();

        // Draw path
        this.drawPath();

        // Draw towers
        this.towers.forEach(tower => {
            const showRange = tower === this.selectedTower;
            tower.draw(this.ctx, showRange);
        });

        // Draw enemies
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });

        // Draw projectiles
        this.drawProjectiles();

        // Draw hover indicator
        if (this.hoveredCell && this.selectedTowerType) {
            this.drawPlacementPreview();
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = '#222';
        this.ctx.lineWidth = 1;

        for (let y = 0; y <= this.gridHeight; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.tileSize);
            this.ctx.lineTo(this.canvas.width, y * this.tileSize);
            this.ctx.stroke();
        }

        for (let x = 0; x <= this.gridWidth; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.tileSize, 0);
            this.ctx.lineTo(x * this.tileSize, this.canvas.height);
            this.ctx.stroke();
        }
    }

    drawPath() {
        this.ctx.fillStyle = '#2d2d44';
        this.path.forEach(pos => {
            this.ctx.fillRect(
                pos.x * this.tileSize,
                pos.y * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        });

        // Draw start and end
        const start = this.path[0];
        const end = this.path[this.path.length - 1];

        this.ctx.fillStyle = '#4ecca3';
        this.ctx.fillRect(
            start.x * this.tileSize + 5,
            start.y * this.tileSize + 5,
            this.tileSize - 10,
            this.tileSize - 10
        );

        this.ctx.fillStyle = '#e94560';
        this.ctx.fillRect(
            end.x * this.tileSize + 5,
            end.y * this.tileSize + 5,
            this.tileSize - 10,
            this.tileSize - 10
        );
    }

    drawProjectiles() {
        this.projectiles.forEach(proj => {
            const colors = {
                archer: '#8b4513',
                cannon: '#708090',
                freeze: '#87ceeb',
                laser: '#ff1493'
            };

            this.ctx.fillStyle = colors[proj.type] || '#fff';
            this.ctx.beginPath();
            this.ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawPlacementPreview() {
        const { x, y } = this.hoveredCell;

        if (x < 0 || x >= this.gridWidth || y < 0 || y >= this.gridHeight) return;

        const canPlace = this.grid[y][x] === 0 && !this.towers.some(t => t.x === x && t.y === y);

        this.ctx.fillStyle = canPlace ? 'rgba(78, 204, 163, 0.3)' : 'rgba(233, 69, 96, 0.3)';
        this.ctx.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
        );
    }

    updateTowerInfo() {
        const info = document.getElementById('tower-info');
        const sellBtn = document.getElementById('sell-tower');

        if (this.selectedTower) {
            const config = TOWER_TYPES[this.selectedTower.type];
            const upgradeCost = this.selectedTower.getUpgradeCost();

            info.innerHTML = `
                <div class="detail"><span class="label">Type:</span><span>${config.name}</span></div>
                <div class="detail"><span class="label">Level:</span><span>${this.selectedTower.level + 1}</span></div>
                <div class="detail"><span class="label">Damage:</span><span>${this.selectedTower.damage}</span></div>
                <div class="detail"><span class="label">Range:</span><span>${this.selectedTower.range}</span></div>
                <div class="detail"><span class="label">Sell Value:</span><span>💰${this.selectedTower.getSellValue()}</span></div>
                ${upgradeCost > 0 ? `<button class="btn btn-primary" onclick="window.game.upgradeTower()">Upgrade (💰${upgradeCost})</button>` : '<p>Max Level</p>'}
            `;
            sellBtn.disabled = false;
        } else if (this.selectedTowerType) {
            const config = TOWER_TYPES[this.selectedTowerType];
            info.innerHTML = `
                <div class="detail"><span class="label">Type:</span><span>${config.name}</span></div>
                <div class="detail"><span class="label">Cost:</span><span>💰${config.baseCost}</span></div>
                <div class="detail"><span class="label">Damage:</span><span>${config.damage}</span></div>
                <div class="detail"><span class="label">Range:</span><span>${config.range}</span></div>
                <div class="detail"><span class="label">Fire Rate:</span><span>${config.fireRate}ms</span></div>
            `;
            sellBtn.disabled = true;
        } else {
            info.innerHTML = '<p class="hint">Click a tower to view details</p>';
            sellBtn.disabled = true;
        }
    }

    upgradeTower() {
        if (!this.selectedTower) return;

        const cost = this.selectedTower.getUpgradeCost();
        if (cost < 0) return;

        if (this.economy.spendGold(cost)) {
            this.selectedTower.upgrade();
            this.addMessage(`Tower upgraded!`);
            this.updateTowerInfo();
            this.updateUI();
        } else {
            this.addMessage('Not enough gold!');
        }
    }

    updateUI() {
        const stats = this.economy.getStats();
        document.getElementById('gold').textContent = stats.gold;
        document.getElementById('lives').textContent = stats.lives;
        document.getElementById('wave').textContent = this.currentWave;

        const totalEnemies = this.waveManager.getTotalEnemies(this.currentWave);
        document.getElementById('enemies').textContent =
            `${this.enemies.length}/${totalEnemies}`;

        // Update tower shop buttons
        document.querySelectorAll('.tower-btn').forEach((btn, i) => {
            const type = Object.keys(TOWER_TYPES)[i];
            const cost = TOWER_TYPES[type].baseCost;
            btn.classList.toggle('disabled', stats.gold < cost);
        });
    }

    addMessage(text) {
        const log = document.getElementById('message-log');
        const p = document.createElement('p');
        p.textContent = text;
        log.appendChild(p);
        log.scrollTop = log.scrollHeight;
    }

    loadHighScore() {
        const highScore = this.economy.loadHighScore();
        document.getElementById('best-wave').textContent = highScore.wave;
        document.getElementById('best-score').textContent = highScore.score;
    }

    endGame() {
        this.economy.saveHighScore(this.currentWave);
        this.loadHighScore();

        document.getElementById('final-wave').textContent = this.currentWave;
        document.getElementById('final-score').textContent = this.economy.score;
        document.getElementById('game-over-modal').classList.add('active');
    }

    restart() {
        document.getElementById('game-over-modal').classList.remove('active');

        this.towers = [];
        this.enemies = [];
        this.projectiles = [];
        this.waveEnemies = [];
        this.currentWave = 0;
        this.economy = new Economy();

        this.grid = Array(this.gridHeight).fill(0).map(() => Array(this.gridWidth).fill(0));
        this.markPathOnGrid();

        this.selectedTowerType = null;
        this.selectedTower = null;

        this.updateUI();
        this.updateTowerInfo();
        this.addMessage('Game restarted!');
    }
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
    window.game = new TowerDefenseGame();
});
