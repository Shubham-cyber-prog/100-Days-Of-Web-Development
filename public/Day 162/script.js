// Volcanic Run - Day 162
// Cinematic chase gameplay with falling debris, lava waves, and branching paths

class VolcanicRun {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.gameState = 'menu'; // 'menu', 'playing', 'pathChoice', 'gameOver'
        this.gameStartTime = 0;
        
        // Player
        this.player = {
            x: 100,
            y: 300,
            width: 20,
            height: 30,
            speed: 5,
            maxSpeed: 8,
            health: 100,
            invulnerable: 0,
            sprinting: false
        };
        
        // World scrolling
        this.worldOffset = 0;
        this.scrollSpeed = 3;
        this.targetScrollSpeed = 3;
        
        // Hazards
        this.debris = [];
        this.lavaWaves = [];
        this.pathSegments = [];
        
        // Game stats
        this.stats = {
            distance: 0,
            debrisDodged: 0,
            pathsChosen: 0,
            maxSpeed: 0
        };
        
        // Controls
        this.keys = {};
        
        // UI elements
        this.elements = {
            instructions: document.getElementById('instructions'),
            gameOver: document.getElementById('gameOver'),
            pathChoice: document.getElementById('pathChoice'),
            warningSystem: document.getElementById('warningSystem'),
            debrisWarning: document.getElementById('debrisWarning'),
            lavaWarning: document.getElementById('lavaWarning'),
            pathWarning: document.getElementById('pathWarning'),
            miniLavaWave: document.getElementById('miniLavaWave'),
            miniPlayer: document.getElementById('miniPlayer'),
            
            distance: document.getElementById('distance'),
            healthBar: document.getElementById('healthBar'),
            healthValue: document.getElementById('healthValue'),
            speed: document.getElementById('speed'),
            dangerLevel: document.getElementById('dangerLevel'),
            
            finalDistance: document.getElementById('finalDistance'),
            debrisDodged: document.getElementById('debrisDodged'),
            pathsChosen: document.getElementById('pathsChosen'),
            maxSpeed: document.getElementById('maxSpeed'),
            pathTimer: document.getElementById('pathTimer')
        };
        
        // Timing
        this.lastTime = 0;
        this.nextDebrisSpawn = 0;
        this.nextLavaWave = 10000; // 10 seconds
        this.nextPathChoice = 20000; // 20 seconds
        this.pathChoiceTimer = 0;
        
        this.resize();
        this.setupEventListeners();
        this.gameLoop();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight - 80; // Account for HUD
    }
    
    setupEventListeners() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            
            if (this.gameState === 'pathChoice') {
                if (e.code === 'Digit1') this.choosePath('high');
                else if (e.code === 'Digit2') this.choosePath('medium');
                else if (e.code === 'Digit3') this.choosePath('low');
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
        
        // Buttons
        document.getElementById('startGame').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('restartGame').addEventListener('click', () => {
            this.restartGame();
        });
        
        // Path choice buttons
        document.querySelectorAll('.path-option').forEach(button => {
            button.addEventListener('click', (e) => {
                const path = e.target.closest('.path-option').dataset.path;
                this.choosePath(path);
            });
        });
        
        // Window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    startGame() {
        this.gameState = 'playing';
        this.gameStartTime = Date.now();
        this.elements.instructions.style.display = 'none';
        
        // Reset game state
        this.player.x = 100;
        this.player.y = this.canvas.height / 2;
        this.player.health = 100;
        this.worldOffset = 0;
        this.scrollSpeed = 3;
        this.targetScrollSpeed = 3;
        
        this.debris = [];
        this.lavaWaves = [];
        this.pathSegments = [];
        
        this.stats = {
            distance: 0,
            debrisDodged: 0,
            pathsChosen: 0,
            maxSpeed: 0
        };
        
        this.nextDebrisSpawn = 1000;
        this.nextLavaWave = 10000;
        this.nextPathChoice = 20000;
        
        this.hideAllWarnings();
    }
    
    restartGame() {
        this.elements.gameOver.style.display = 'none';
        this.startGame();
    }
    
    choosePath(pathType) {
        this.gameState = 'playing';
        this.elements.pathChoice.style.display = 'none';
        this.hideAllWarnings();
        
        this.stats.pathsChosen++;
        
        // Apply path effects
        switch(pathType) {
            case 'high':
                // High risk: speed boost but more debris
                this.targetScrollSpeed += 2;
                this.nextDebrisSpawn = Date.now() + 500;
                this.spawnDebrisCluster();
                break;
            case 'medium':
                // Medium risk: health pack but moderate debris
                this.player.health = Math.min(100, this.player.health + 25);
                this.nextDebrisSpawn = Date.now() + 2000;
                break;
            case 'low':
                // Low risk: safe distance but slower
                this.clearNearbyHazards();
                this.nextDebrisSpawn = Date.now() + 4000;
                break;
        }
        
        this.nextPathChoice = Date.now() + 25000 + Math.random() * 10000;
    }
    
    clearNearbyHazards() {
        this.debris = this.debris.filter(d => d.x > this.player.x + 200);
    }
    
    spawnDebrisCluster() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.spawnDebris();
            }, i * 200);
        }
    }
    
    hideAllWarnings() {
        this.elements.debrisWarning.classList.remove('active');
        this.elements.lavaWarning.classList.remove('active');
        this.elements.pathWarning.classList.remove('active');
    }
    
    update(deltaTime) {
        if (this.gameState !== 'playing' && this.gameState !== 'pathChoice') return;
        
        const now = Date.now();
        
        // Update player movement
        this.updatePlayer(deltaTime);
        
        // Update world scrolling
        this.scrollSpeed += (this.targetScrollSpeed - this.scrollSpeed) * 0.02;
        this.worldOffset += this.scrollSpeed;
        this.stats.distance = Math.floor(this.worldOffset / 10);
        this.stats.maxSpeed = Math.max(this.stats.maxSpeed, Math.floor(this.scrollSpeed));
        
        // Spawn hazards
        if (now >= this.nextDebrisSpawn) {
            this.spawnDebris();
            this.nextDebrisSpawn = now + 1500 + Math.random() * 2000 - this.stats.distance;
        }
        
        if (now >= this.nextLavaWave) {
            this.spawnLavaWave();
            this.nextLavaWave = now + 15000 + Math.random() * 10000;
        }
        
        // Path choice timing
        if (now >= this.nextPathChoice && this.gameState === 'playing') {
            this.showPathChoice();
        }
        
        // Update hazards
        this.updateDebris(deltaTime);
        this.updateLavaWaves(deltaTime);
        
        // Check collisions
        this.checkCollisions();
        
        // Update UI
        this.updateUI();
        
        // Update invulnerability
        if (this.player.invulnerable > 0) {
            this.player.invulnerable -= deltaTime;
        }
        
        // Increase difficulty over time
        this.targetScrollSpeed = 3 + Math.min(5, this.stats.distance / 1000);
    }
    
    updatePlayer(deltaTime) {
        // Movement controls
        const moveSpeed = this.player.speed + (this.keys['ShiftLeft'] ? 3 : 0);
        
        if (this.keys['KeyW'] || this.keys['ArrowUp']) {
            this.player.y = Math.max(50, this.player.y - moveSpeed);
        }
        if (this.keys['KeyS'] || this.keys['ArrowDown']) {
            this.player.y = Math.min(this.canvas.height - 50, this.player.y + moveSpeed);
        }
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) {
            this.player.x = Math.max(20, this.player.x - moveSpeed);
        }
        if (this.keys['KeyD'] || this.keys['ArrowRight']) {
            this.player.x = Math.min(this.canvas.width - 50, this.player.x + moveSpeed);
        }
        
        // Jump (temporary invulnerability)
        if (this.keys['Space'] && this.player.invulnerable <= 0) {
            this.player.invulnerable = 500; // 0.5 seconds
            this.keys['Space'] = false; // Prevent holding
        }
    }
    
    spawnDebris() {
        const debris = {
            x: this.canvas.width + Math.random() * 200,
            y: Math.random() * (this.canvas.height - 100) + 50,
            width: 15 + Math.random() * 20,
            height: 15 + Math.random() * 20,
            speed: this.scrollSpeed + Math.random() * 3,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.2,
            type: Math.random() > 0.7 ? 'large' : 'small'
        };
        
        this.debris.push(debris);
        
        // Show warning
        this.elements.debrisWarning.classList.add('active');
        setTimeout(() => {
            this.elements.debrisWarning.classList.remove('active');
        }, 2000);
    }
    
    spawnLavaWave() {
        const wave = {
            x: -100,
            y: 0,
            width: this.canvas.width + 200,
            height: this.canvas.height,
            speed: this.scrollSpeed * 0.8,
            intensity: 0
        };
        
        this.lavaWaves.push(wave);
        
        // Show warning
        this.elements.lavaWarning.classList.add('active');
        setTimeout(() => {
            this.elements.lavaWarning.classList.remove('active');
        }, 3000);
    }
    
    updateDebris(deltaTime) {
        for (let i = this.debris.length - 1; i >= 0; i--) {
            const debris = this.debris[i];
            debris.x -= debris.speed;
            debris.rotation += debris.rotationSpeed;
            
            // Remove off-screen debris
            if (debris.x + debris.width < 0) {
                this.debris.splice(i, 1);
                this.stats.debrisDodged++;
            }
        }
    }
    
    updateLavaWaves(deltaTime) {
        for (let i = this.lavaWaves.length - 1; i >= 0; i--) {
            const wave = this.lavaWaves[i];
            wave.x += wave.speed;
            wave.intensity = Math.min(1, wave.intensity + deltaTime / 2000);
            
            // Remove off-screen waves
            if (wave.x > this.canvas.width + 100) {
                this.lavaWaves.splice(i, 1);
            }
        }
    }
    
    checkCollisions() {
        // Debris collision
        if (this.player.invulnerable <= 0) {
            this.debris.forEach((debris, index) => {
                if (this.isColliding(this.player, debris)) {
                    this.player.health -= debris.type === 'large' ? 20 : 10;
                    this.player.invulnerable = 1000;
                    this.debris.splice(index, 1);
                    this.shakeScreen();
                }
            });
        }
        
        // Lava wave collision
        this.lavaWaves.forEach(wave => {
            if (wave.x < this.player.x + this.player.width && this.player.invulnerable <= 0) {
                this.player.health -= 50;
                this.player.invulnerable = 2000;
                this.shakeScreen();
            }
        });
        
        // Check death
        if (this.player.health <= 0) {
            this.gameOver();
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    shakeScreen() {
        document.body.classList.add('shake');
        setTimeout(() => {
            document.body.classList.remove('shake');
        }, 500);
    }
    
    showPathChoice() {
        this.gameState = 'pathChoice';
        this.elements.pathChoice.style.display = 'block';
        this.elements.pathWarning.classList.add('active');
        
        this.pathChoiceTimer = 5;
        const countdown = setInterval(() => {
            this.pathChoiceTimer--;
            this.elements.pathTimer.textContent = this.pathChoiceTimer;
            
            if (this.pathChoiceTimer <= 0) {
                clearInterval(countdown);
                this.choosePath('medium'); // Default choice
            }
        }, 1000);
    }
    
    gameOver() {
        this.gameState = 'gameOver';
        this.elements.gameOver.style.display = 'block';
        
        // Update final stats
        this.elements.finalDistance.textContent = this.stats.distance;
        this.elements.debrisDodged.textContent = this.stats.debrisDodged;
        this.elements.pathsChosen.textContent = this.stats.pathsChosen;
        this.elements.maxSpeed.textContent = this.stats.maxSpeed;
        
        // Update game over title based on cause
        if (this.player.health <= 0) {
            document.getElementById('gameOverTitle').textContent = '💀 OVERWHELMED BY VOLCANO';
            document.getElementById('gameOverMessage').innerHTML = 
                `The volcanic fury was too much! You escaped <span id="finalDistance">${this.stats.distance}</span> meters before being consumed.`;
        }
    }
    
    updateUI() {
        this.elements.distance.textContent = this.stats.distance + 'm';
        this.elements.healthBar.style.width = Math.max(0, this.player.health) + '%';
        this.elements.healthValue.textContent = Math.max(0, Math.round(this.player.health)) + '%';
        this.elements.speed.textContent = Math.round(this.scrollSpeed);
        
        // Update danger level
        if (this.stats.distance < 500) {
            this.elements.dangerLevel.textContent = 'MODERATE';
            this.elements.dangerLevel.style.color = '#ffaa44';
        } else if (this.stats.distance < 1500) {
            this.elements.dangerLevel.textContent = 'HIGH';
            this.elements.dangerLevel.style.color = '#ff6644';
        } else {
            this.elements.dangerLevel.textContent = 'EXTREME';
            this.elements.dangerLevel.style.color = '#ff4444';
        }
        
        // Update mini-map
        const lavaProgress = Math.min(95, (this.worldOffset / 10000) * 100);
        this.elements.miniLavaWave.style.left = lavaProgress + '%';
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.gameState === 'menu') return;
        
        // Draw background
        this.drawBackground();
        
        // Draw lava waves
        this.drawLavaWaves();
        
        // Draw debris
        this.drawDebris();
        
        // Draw player
        this.drawPlayer();
        
        // Draw effects
        this.drawEffects();
    }
    
    drawBackground() {
        // Volcanic landscape
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#8a3030');
        gradient.addColorStop(0.7, '#5a2020');
        gradient.addColorStop(1, '#2a1010');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Ground with moving lava cracks
        this.ctx.fillStyle = '#1a0808';
        this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);
        
        // Moving lava veins
        this.ctx.strokeStyle = '#ff6644';
        this.ctx.lineWidth = 3;
        this.ctx.globalAlpha = 0.7;
        
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            const y = this.canvas.height - 80 + i * 15;
            const offset = (this.worldOffset + i * 100) % (this.canvas.width + 200);
            this.ctx.moveTo(-200 + offset, y);
            this.ctx.lineTo(200 + offset, y + Math.sin(offset * 0.01) * 20);
            this.ctx.stroke();
        }
        
        this.ctx.globalAlpha = 1;
    }
    
    drawLavaWaves() {
        this.lavaWaves.forEach(wave => {
            const gradient = this.ctx.createLinearGradient(wave.x, 0, wave.x + 200, 0);
            gradient.addColorStop(0, `rgba(255, 68, 68, ${wave.intensity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 136, 68, ${wave.intensity})`);
            gradient.addColorStop(1, `rgba(255, 68, 68, ${wave.intensity * 0.6})`);
            
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(wave.x, wave.y, wave.width, wave.height);
            
            // Lava glow effect
            this.ctx.shadowColor = '#ff6644';
            this.ctx.shadowBlur = 20 * wave.intensity;
            this.ctx.fillRect(wave.x, wave.y, 50, wave.height);
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawDebris() {
        this.debris.forEach(debris => {
            this.ctx.save();
            this.ctx.translate(debris.x + debris.width / 2, debris.y + debris.height / 2);
            this.ctx.rotate(debris.rotation);
            
            // Different debris types
            if (debris.type === 'large') {
                this.ctx.fillStyle = '#8a4a3a';
                this.ctx.fillRect(-debris.width / 2, -debris.height / 2, debris.width, debris.height);
                
                // Glow for large debris
                this.ctx.shadowColor = '#ff8844';
                this.ctx.shadowBlur = 10;
                this.ctx.fillStyle = '#aa5a4a';
                this.ctx.fillRect(-debris.width / 2 + 3, -debris.height / 2 + 3, 
                                debris.width - 6, debris.height - 6);
            } else {
                this.ctx.fillStyle = '#6a3a2a';
                this.ctx.fillRect(-debris.width / 2, -debris.height / 2, debris.width, debris.height);
            }
            
            this.ctx.restore();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawPlayer() {
        this.ctx.save();
        
        // Player invulnerability effect
        if (this.player.invulnerable > 0) {
            this.ctx.globalAlpha = 0.5 + 0.5 * Math.sin(Date.now() * 0.02);
        }
        
        // Player character (running figure)
        this.ctx.fillStyle = this.player.invulnerable > 0 ? '#44ff44' : '#ffffff';
        
        // Simple running figure
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Player glow
        this.ctx.shadowColor = this.player.invulnerable > 0 ? '#44ff44' : '#ffffff';
        this.ctx.shadowBlur = 15;
        this.ctx.fillRect(this.player.x + 5, this.player.y + 5, 
                         this.player.width - 10, this.player.height - 10);
        
        this.ctx.restore();
    }
    
    drawEffects() {
        // Speed lines
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.5, this.scrollSpeed / 10)})`;
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 10; i++) {
            this.ctx.beginPath();
            const x = (this.worldOffset * (1 + i * 0.1)) % (this.canvas.width + 100);
            this.ctx.moveTo(-100 + x, i * (this.canvas.height / 10));
            this.ctx.lineTo(-50 + x, i * (this.canvas.height / 10));
            this.ctx.stroke();
        }
        
        // Heat distortion effect
        if (this.lavaWaves.length > 0) {
            this.ctx.globalAlpha = 0.1;
            this.ctx.fillStyle = '#ff6644';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalAlpha = 1;
        }
    }
    
    gameLoop() {
        const currentTime = performance.now();
        const deltaTime = Math.min(50, currentTime - this.lastTime);
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Initialize the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new VolcanicRun();
});