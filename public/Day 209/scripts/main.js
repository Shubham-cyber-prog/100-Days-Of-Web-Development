/**
 * Platformer Main Game Engine
 */

import { Physics } from './physics.js';
import { Player } from './player.js';
import { LevelManager } from './level.js';
import { Coin, Spike, Checkpoint, Goal, ParticleSystem } from './entities.js';

class PlatformerGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Canvas setup
        this.canvas.width = 800;
        this.canvas.height = 600;

        // Game systems
        this.physics = new Physics();
        this.levelManager = new LevelManager();
        this.particleSystem = new ParticleSystem();

        // Game state
        this.player = null;
        this.currentLevel = null;
        this.coins = [];
        this.spikes = [];
        this.checkpoints = [];
        this.goal = null;

        // Camera
        this.cameraX = 0;
        this.cameraY = 0;
        this.cameraSmoothing = 0.1;

        // Input
        this.keys = {};

        // Game stats
        this.coinsCollected = 0;
        this.totalCoins = 0;
        this.lives = 3;
        this.startTime = 0;
        this.elapsedTime = 0;

        // Animation
        this.lastFrameTime = 0;

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadLevel(0);
        this.gameLoop(0);
    }

    bindEvents() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;

            if (e.key === ' ') {
                e.preventDefault();
                const jumpType = this.player.jump(Date.now());
                if (jumpType) {
                    this.particleSystem.emit(
                        this.player.x + this.player.width / 2,
                        this.player.y + this.player.height,
                        8,
                        'jump'
                    );
                }
            } else if (e.key.toLowerCase() === 'r') {
                this.restartLevel();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Buttons
        document.getElementById('next-level-btn').addEventListener('click', () => {
            this.nextLevel();
        });

        document.getElementById('restart-game-btn').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }

    loadLevel(index) {
        const level = this.levelManager.loadLevel(index);
        if (!level) return false;

        this.currentLevel = level;

        // Create player
        this.player = new Player(level.spawn.x, level.spawn.y);

        // Create entities
        this.coins = level.coins.map(c => new Coin(c.x, c.y));
        this.spikes = level.spikes.map(s => new Spike(s.x, s.y, s.width, s.height));
        this.checkpoints = level.checkpoints.map(c => new Checkpoint(c.x, c.y));
        this.goal = new Goal(level.goal.x, level.goal.y);

        // Reset stats
        this.coinsCollected = 0;
        this.totalCoins = this.coins.length;
        this.startTime = Date.now();

        this.updateUI();
        return true;
    }

    gameLoop(timestamp) {
        const deltaTime = Math.min((timestamp - this.lastFrameTime) / 16, 2);
        this.lastFrameTime = timestamp;

        this.update(deltaTime, timestamp);
        this.render(timestamp);

        requestAnimationFrame((t) => this.gameLoop(t));
    }

    update(deltaTime, currentTime) {
        if (!this.player || !this.currentLevel) return;

        // Update timer
        this.elapsedTime = Math.floor((currentTime - this.startTime) / 1000);

        // Handle input
        if (this.keys['arrowleft'] || this.keys['a']) {
            this.player.moveLeft(deltaTime);
        }
        if (this.keys['arrowright'] || this.keys['d']) {
            this.player.moveRight(deltaTime);
        }

        // Apply physics
        this.physics.applyGravity(this.player, deltaTime);
        this.physics.applyFriction(this.player);
        this.physics.updatePosition(this.player, deltaTime);

        // Update moving platforms
        this.levelManager.updateMovingPlatforms(deltaTime);

        // Collision detection
        let wasGrounded = this.player.isGrounded;
        this.player.isGrounded = false;

        // Check platform collisions
        const allPlatforms = [
            ...this.currentLevel.platforms,
            ...(this.currentLevel.movingPlatforms || [])
        ];

        allPlatforms.forEach(platform => {
            const side = this.physics.resolveCollision(this.player, platform);

            if (side === 'top') {
                // Attach to moving platform
                if (platform.velocityX || platform.velocityY) {
                    this.physics.attachToMovingPlatform(this.player, platform);
                }
            }
        });

        // Update grounded state
        const landEvent = this.player.updateGroundedState(this.player.isGrounded, currentTime);
        if (landEvent === 'land') {
            this.particleSystem.emit(
                this.player.x + this.player.width / 2,
                this.player.y + this.player.height,
                6,
                'land'
            );
        }

        // Check coin collection
        this.coins.forEach(coin => {
            if (!coin.collected && this.physics.checkPointCollision(this.player, coin, 20)) {
                coin.collect();
                this.coinsCollected++;
                this.particleSystem.emit(coin.x + coin.width / 2, coin.y + coin.height / 2, 10, 'coin');
                this.flashHUD('coins');
                this.updateUI();
            }
        });

        // Check spike collision
        this.spikes.forEach(spike => {
            if (this.physics.checkAABB(this.player.getBounds(), spike)) {
                this.playerDeath();
            }
        });

        // Check pit death
        if (this.player.y > this.currentLevel.height + 100) {
            this.playerDeath();
        }

        // Check checkpoint activation
        this.checkpoints.forEach(checkpoint => {
            if (!checkpoint.activated && this.physics.checkPointCollision(this.player, checkpoint, 30)) {
                checkpoint.activate();
                this.player.setCheckpoint(checkpoint.x, checkpoint.y - this.player.height);
            }
        });

        // Check goal
        if (this.physics.checkPointCollision(this.player, this.goal, 40)) {
            this.completeLevel();
        }

        // Update particles
        this.particleSystem.update(deltaTime);

        // Update camera
        this.updateCamera();
    }

    render(timestamp) {
        // Clear canvas
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw parallax background
        this.drawParallaxBackground();

        // Draw platforms
        this.currentLevel.platforms.forEach(platform => {
            this.drawPlatform(platform);
        });

        // Draw moving platforms
        if (this.currentLevel.movingPlatforms) {
            this.currentLevel.movingPlatforms.forEach(platform => {
                this.drawPlatform(platform, true);
            });
        }

        // Draw spikes
        this.spikes.forEach(spike => {
            spike.draw(this.ctx, this.cameraX, this.cameraY);
        });

        // Draw checkpoints
        this.checkpoints.forEach(checkpoint => {
            checkpoint.draw(this.ctx, this.cameraX, this.cameraY, timestamp);
        });

        // Draw coins
        this.coins.forEach(coin => {
            coin.draw(this.ctx, this.cameraX, this.cameraY, timestamp);
        });

        // Draw goal
        this.goal.draw(this.ctx, this.cameraX, this.cameraY, timestamp);

        // Draw player
        this.player.draw(this.ctx, this.cameraX, this.cameraY);

        // Draw particles
        this.particleSystem.draw(this.ctx, this.cameraX, this.cameraY);
    }

    drawPlatform(platform, isMoving = false) {
        const screenX = platform.x - this.cameraX;
        const screenY = platform.y - this.cameraY;

        // Platform color
        const color = isMoving ? '#ff006e' : platform.type === 'ground' ? '#1a1e37' : '#2a2e47';

        this.ctx.fillStyle = color;
        this.ctx.fillRect(screenX, screenY, platform.width, platform.height);

        // Border
        this.ctx.strokeStyle = '#00d9ff';
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(screenX, screenY, platform.width, platform.height);

        // Grid pattern
        this.ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
        this.ctx.lineWidth = 1;
        for (let x = 0; x < platform.width; x += 20) {
            this.ctx.beginPath();
            this.ctx.moveTo(screenX + x, screenY);
            this.ctx.lineTo(screenX + x, screenY + platform.height);
            this.ctx.stroke();
        }
    }

    drawParallaxBackground() {
        // Layer 1 (slowest)
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.05)';
        const offset1 = (this.cameraX * 0.2) % 100;
        for (let x = -offset1; x < this.canvas.width; x += 100) {
            this.ctx.fillRect(x, 0, 2, this.canvas.height);
        }

        // Layer 2 (medium)
        this.ctx.fillStyle = 'rgba(0, 217, 255, 0.1)';
        const offset2 = (this.cameraX * 0.5) % 50;
        for (let x = -offset2; x < this.canvas.width; x += 50) {
            this.ctx.fillRect(x, 0, 1, this.canvas.height);
        }
    }

    updateCamera() {
        // Target camera position (follow player)
        const targetX = this.player.x - this.canvas.width / 2 + this.player.width / 2;
        const targetY = this.player.y - this.canvas.height / 2 + this.player.height / 2;

        // Smooth camera movement
        this.cameraX += (targetX - this.cameraX) * this.cameraSmoothing;
        this.cameraY += (targetY - this.cameraY) * this.cameraSmoothing;

        // Clamp camera to level bounds
        this.cameraX = Math.max(0, Math.min(this.cameraX, this.currentLevel.width - this.canvas.width));
        this.cameraY = Math.max(0, Math.min(this.cameraY, this.currentLevel.height - this.canvas.height));
    }

    playerDeath() {
        this.lives--;
        this.particleSystem.emit(
            this.player.x + this.player.width / 2,
            this.player.y + this.player.height / 2,
            20,
            'death'
        );

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.player.respawn();
            this.flashHUD('lives');
            this.updateUI();
        }
    }

    completeLevel() {
        document.getElementById('level-coins').textContent = this.coinsCollected;
        document.getElementById('level-time').textContent = this.formatTime(this.elapsedTime);

        if (this.levelManager.hasNextLevel()) {
            document.getElementById('level-complete-modal').classList.add('active');
        } else {
            this.victory();
        }
    }

    nextLevel() {
        document.getElementById('level-complete-modal').classList.remove('active');
        const loaded = this.loadLevel(this.levelManager.currentLevelIndex + 1);
        if (loaded) {
            this.updateUI();
        }
    }

    restartLevel() {
        this.loadLevel(this.levelManager.currentLevelIndex);
    }

    restartGame() {
        document.getElementById('game-over-modal').classList.remove('active');
        document.getElementById('victory-modal').classList.remove('active');
        this.lives = 3;
        this.loadLevel(0);
    }

    gameOver() {
        document.getElementById('final-level').textContent = this.levelManager.currentLevelIndex + 1;
        document.getElementById('final-coins').textContent = this.coinsCollected;
        document.getElementById('game-over-modal').classList.add('active');
    }

    victory() {
        document.getElementById('victory-coins').textContent = this.coinsCollected;
        document.getElementById('victory-time').textContent = this.formatTime(this.elapsedTime);
        document.getElementById('victory-modal').classList.add('active');
    }

    updateUI() {
        document.getElementById('coins').textContent = `${this.coinsCollected}/${this.totalCoins}`;
        document.getElementById('lives').textContent = this.lives;
        document.getElementById('level').textContent = this.levelManager.currentLevelIndex + 1;
        document.getElementById('timer').textContent = this.formatTime(this.elapsedTime);
    }

    flashHUD(id) {
        const element = document.getElementById(id);
        element.classList.add('flash');
        setTimeout(() => element.classList.remove('flash'), 300);
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

// Start game
window.addEventListener('DOMContentLoaded', () => {
    new PlatformerGame();
});
