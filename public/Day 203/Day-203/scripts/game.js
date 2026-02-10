/**
 * Neon Breakout - Main Game Controller
 * Orchestrates game loops, input handling, rendering, and state management.
 */

import { Paddle } from './paddle.js';
import { Ball } from './ball.js';
import { BrickManager } from './bricks.js';
import { PowerupManager } from './powerups.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.container = document.getElementById('container');

        // Match canvas to CSS container size
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Game State
        this.score = 0;
        this.highScore = parseInt(localStorage.getItem('breakout-highscore')) || 0;
        this.lives = 3;
        this.level = 1;
        this.isPaused = false;
        this.status = 'START'; // START, PLAYING, GAMEOVER, WIN
        this.bonusTime = 10000;

        // Entities
        this.paddle = new Paddle(this.canvas.width, this.canvas.height);
        this.ball = new Ball(this.canvas.width, this.canvas.height, this.paddle);
        this.bricks = new BrickManager(this.canvas.width, this.canvas.height);
        this.powerups = new PowerupManager(this.canvas.width, this.canvas.height, this.paddle);

        this.combo = 0;

        // Effects
        this.particles = [];
        this.popups = [];

        // UI Elements
        this.ui = {
            score: document.getElementById('score-val'),
            highScore: document.getElementById('high-score-val'),
            level: document.getElementById('level-val'),
            lives: document.getElementById('lives-container'),
            overlay: document.getElementById('overlay'),
            start: document.getElementById('start-screen'),
            win: document.getElementById('win-screen'),
            lose: document.getElementById('lose-screen'),
            pause: document.getElementById('pause-screen')
        };

        this.init();
    }

    init() {
        this.bricks.createLevel(this.level);
        this.updateUI();
        this.bindEvents();
        this.gameLoop();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;

        if (this.paddle) {
            this.paddle.canvasWidth = this.canvas.width;
            this.paddle.canvasHeight = this.canvas.height;
            this.paddle.y = this.canvas.height - 30;
        }
        if (this.ball) {
            this.ball.canvasWidth = this.canvas.width;
            this.ball.canvasHeight = this.canvas.height;
        }
    }

    bindEvents() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'a') this.paddle.moveLeft();
            if (e.key === 'ArrowRight' || e.key === 'd') this.paddle.moveRight();
            if (e.key === ' ') {
                if (this.status === 'START') this.start();
                else if (this.status === 'PLAYING') this.ball.launch();
            }
            if (e.key === 'Escape') this.togglePause();
        });

        window.addEventListener('keyup', (e) => {
            if (['ArrowLeft', 'ArrowRight', 'a', 'd'].includes(e.key)) this.paddle.stop();
        });

        // Mouse
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.status === 'PLAYING' && !this.isPaused) {
                const rect = this.canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                this.paddle.moveTo(mouseX);
            }
        });

        this.canvas.addEventListener('click', () => {
            if (this.status === 'START') this.start();
            else if (this.status === 'PLAYING') this.ball.launch();
        });

        // UI Buttons
        document.getElementById('next-btn').addEventListener('click', () => this.nextLevel());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());

        // Visual effects hook
        window.addEventListener('ball-bounce', (e) => {
            this.createCollisionEffect(e.detail.x, e.detail.y);
            this.container.classList.add('shake');
            setTimeout(() => this.container.classList.remove('shake'), 200);

            // Reset combo if hit paddle
            if (e.detail.y > this.canvas.height - 50) {
                this.combo = 0;
            }
        });
    }

    start() {
        this.status = 'PLAYING';
        this.ui.overlay.classList.add('hidden');
        this.ui.start.classList.add('hidden');
    }

    togglePause() {
        if (this.status !== 'PLAYING') return;
        this.isPaused = !this.isPaused;
        this.ui.overlay.classList.toggle('hidden', !this.isPaused);
        this.ui.pause.classList.toggle('hidden', !this.isPaused);
    }

    gameLoop() {
        if (!this.isPaused) {
            this.update();
            this.draw();
        }
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        if (this.status !== 'PLAYING') return;

        this.paddle.update();
        this.ball.update();

        // Check brick collision
        const hit = this.bricks.checkCollision(this.ball);
        if (hit) {
            // Combo logic
            this.combo++;
            const points = hit.points * (1 + Math.floor(this.combo / 5));
            this.score += points;

            this.createBrickEffect(hit.x, hit.y, hit.color);
            this.spawnScorePopup(hit.x, hit.y, points, this.combo > 4);

            if (hit.destroyed) {
                this.powerups.spawn(hit.x, hit.y);
            }

            this.updateUI();

            if (this.bricks.getRemainingBricks() === 0) {
                this.win();
            }
        }

        // Powerups
        const collected = this.powerups.update();
        collected.forEach(p => this.applyPowerup(p));

        // Ball out of bounds
        if (this.ball.isOutOfBounds()) {
            this.loseLife();
        }

        // Update visual effects
        this.particles = this.particles.filter(p => p.life > 0);
        this.particles.forEach(p => {
            p.x += p.dx;
            p.y += p.dy;
            p.life -= 0.02;
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background grid (rendered onto canvas for performance)
        this.drawGrid();

        this.bricks.draw(this.ctx);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.powerups.draw(this.ctx);

        // Draw particles
        this.particles.forEach(p => {
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1.0;
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
        this.ctx.lineWidth = 1;
        const spacing = 40;
        for (let x = 0; x < this.canvas.width; x += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        for (let y = 0; y < this.canvas.height; y += spacing) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    applyPowerup(type) {
        if (type.id === 'ext') this.paddle.extend();
        if (type.id === 'slow') this.ball.speed = 4;
        // Visual collection feedback
        const ripple = document.createElement('div');
        ripple.className = 'power-collect';
        ripple.style.left = `${this.paddle.x + this.paddle.width / 2 - 20}px`;
        ripple.style.top = `${this.paddle.y - 20}px`;
        this.container.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    }

    loseLife() {
        this.lives--;
        this.updateUI();

        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.ball.reset();
        }
    }

    updateUI() {
        this.ui.score.textContent = this.score.toString().padStart(6, '0');
        this.ui.highScore.textContent = this.highScore.toString().padStart(6, '0');
        this.ui.level.textContent = this.level.toString().padStart(2, '0');

        // Update lives
        this.ui.lives.innerHTML = '';
        for (let i = 0; i < this.lives; i++) {
            const heart = document.createElement('div');
            heart.className = 'life-heart';
            this.ui.lives.appendChild(heart);
        }
    }

    createBrickEffect(x, y, color) {
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x, y,
                dx: (Math.random() - 0.5) * 8,
                dy: (Math.random() - 0.5) * 8,
                size: Math.random() * 4 + 2,
                color,
                life: 1.0
            });
        }
    }

    createCollisionEffect(x, y) {
        for (let i = 0; i < 5; i++) {
            this.particles.push({
                x, y,
                dx: (Math.random() - 0.5) * 4,
                dy: (Math.random() - 0.5) * 4,
                size: Math.random() * 2 + 1,
                color: '#ffffff',
                life: 0.5
            });
        }
    }

    spawnScorePopup(x, y, val) {
        const popup = document.createElement('div');
        popup.className = 'score-popup';
        popup.style.left = `${x}px`;
        popup.style.top = `${y}px`;
        popup.textContent = `+${val}`;
        this.container.appendChild(popup);
        setTimeout(() => popup.remove(), 800);
    }

    win() {
        this.status = 'WIN';
        this.ui.overlay.classList.remove('hidden');
        this.ui.win.classList.remove('hidden');
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('breakout-highscore', this.highScore);
        }
    }

    gameOver() {
        this.status = 'GAMEOVER';
        document.getElementById('final-score').textContent = this.score;
        this.ui.overlay.classList.remove('hidden');
        this.ui.lose.classList.remove('hidden');
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('breakout-highscore', this.highScore);
        }
    }

    nextLevel() {
        this.level++;
        this.ui.win.classList.add('hidden');
        this.bricks.createLevel(this.level);
        this.ball.reset();
        this.ball.increaseSpeed(1.05); // Speed up slightly each level
        this.start();
        this.updateUI();
    }

    restart() {
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.ui.lose.classList.add('hidden');
        this.bricks.createLevel(this.level);
        this.ball.reset();
        this.start();
        this.updateUI();
    }
}

// Start game when page loads
window.addEventListener('load', () => new Game());
