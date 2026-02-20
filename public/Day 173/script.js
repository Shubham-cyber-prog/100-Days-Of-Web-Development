const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Audio context for sounds
let audioCtx;
try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
} catch (e) {
    console.warn('Web Audio API not supported');
}

function playSound(frequency, duration, type = 'sine') {
    if (!audioCtx) return;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    oscillator.type = type;
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
}

const gravity = 0.5;
const jumpStrength = -12;
let playerSpeed = 5;

let player = {
    x: 50,
    y: 400,
    width: 20,
    height: 20,
    vx: 0,
    vy: 0,
    onGround: false,
    frame: 0,
    direction: 1 // 1 right, -1 left
};

let keys = {};

let score = 0;
let lives = 3;
let time = 0;
let level = 1;
let gameState = 'start'; // 'start', 'playing', 'paused', 'gameover', 'win'
let paused = false;

let particles = [];

let conveyors = [];
let machines = [];
let powerUps = [];
let exit = {};

let ground = { x: 0, y: 440, width: 1000, height: 60 };

function initLevel() {
    conveyors = [
        { x: 100, y: 420, width: 200, height: 20, speed: 2 },
        { x: 400, y: 420, width: 200, height: 20, speed: -2 },
        { x: 700, y: 420, width: 150, height: 20, speed: 3 }
    ];
    if (level > 1) {
        conveyors.push({ x: 200, y: 380, width: 100, height: 20, speed: -1 });
        conveyors.push({ x: 500, y: 380, width: 100, height: 20, speed: 1 });
    }
    machines = [
        { x: 150, y: 380, width: 30, height: 40, active: true, blink: 0 },
        { x: 450, y: 380, width: 30, height: 40, active: true, blink: 0 },
        { x: 750, y: 380, width: 30, height: 40, active: true, blink: 0 }
    ];
    if (level > 1) {
        machines.push({ x: 200, y: 340, width: 30, height: 40, active: true, blink: 0 });
        machines.push({ x: 500, y: 340, width: 30, height: 40, active: true, blink: 0 });
    }
    powerUps = [
        { x: 300, y: 400, width: 20, height: 20, type: 'speed', collected: false },
        { x: 600, y: 400, width: 20, height: 20, type: 'life', collected: false }
    ];
    if (level > 1) {
        powerUps.push({ x: 800, y: 400, width: 20, height: 20, type: 'speed', collected: false });
    }
    exit = { x: 900, y: 380, width: 50, height: 40 };
    particles = [];
}

function createParticles(x, y, color, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 30,
            color: color
        });
    }
}

function updateParticles() {
    particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
        if (p.life <= 0) particles.splice(i, 1);
    });
}

function drawParticles() {
    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    });
}

initLevel();

function update() {
    if (gameState !== 'playing' || paused) return;

    time += 1 / 60;

    updateParticles();

    // Player animation
    if (player.vx !== 0) {
        player.frame = (player.frame + 0.2) % 2;
        player.direction = player.vx > 0 ? 1 : -1;
    } else {
        player.frame = 0;
    }

    // Gravity
    player.vy += gravity;

    // Input
    if (keys.ArrowLeft) player.vx = -playerSpeed;
    else if (keys.ArrowRight) player.vx = playerSpeed;
    else player.vx = 0;

    if (keys[' '] && player.onGround) {
        player.vy = jumpStrength;
        player.onGround = false;
        playSound(400, 0.1, 'square');
        createParticles(player.x + player.width / 2, player.y + player.height, '#00f', 5);
    }

    // Move player
    player.x += player.vx;
    player.y += player.vy;

    // Check ground collision
    if (player.y + player.height >= ground.y && player.y + player.height <= ground.y + ground.height) {
        player.y = ground.y - player.height;
        player.vy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }

    // Check conveyor collisions
    let onConveyor = false;
    conveyors.forEach(conveyor => {
        if (player.x < conveyor.x + conveyor.width &&
            player.x + player.width > conveyor.x &&
            player.y + player.height >= conveyor.y &&
            player.y + player.height <= conveyor.y + conveyor.height) {
            player.y = conveyor.y - player.height;
            player.vy = 0;
            player.onGround = true;
            onConveyor = true;
            player.vx += conveyor.speed;
        }
    });

    if (!onConveyor && player.y + player.height < ground.y) {
        player.onGround = false;
    }

    // Update machines blink
    machines.forEach(machine => {
        if (machine.active) {
            machine.blink = (machine.blink + 0.1) % (Math.PI * 2);
        }
    });

    // Check machine collisions
    machines.forEach(machine => {
        if (machine.active &&
            player.x < machine.x + machine.width &&
            player.x + player.width > machine.x &&
            player.y < machine.y + machine.height &&
            player.y + player.height > machine.y) {
            lives--;
            playSound(200, 0.3, 'sawtooth');
            createParticles(player.x + player.width / 2, player.y + player.height / 2, '#f00', 15);
            if (lives <= 0) {
                gameState = 'gameover';
                document.getElementById('message').style.display = 'block';
            } else {
                resetPlayer();
            }
        }
    });

    // Check power-up collisions
    powerUps.forEach(powerUp => {
        if (!powerUp.collected &&
            player.x < powerUp.x + powerUp.width &&
            player.x + player.width > powerUp.x &&
            player.y < powerUp.y + powerUp.height &&
            player.y + player.height > powerUp.y) {
            powerUp.collected = true;
            playSound(600, 0.2, 'sine');
            createParticles(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, powerUp.type === 'speed' ? '#ff0' : '#f0f', 10);
            if (powerUp.type === 'speed') {
                playerSpeed += 1;
                score += 20;
            } else if (powerUp.type === 'life') {
                lives++;
                score += 30;
            }
        }
    });

    // Disable machine
    if (keys.d || keys.D) {
        machines.forEach(machine => {
            if (Math.abs(player.x - machine.x) < 50 && Math.abs(player.y - machine.y) < 50 && machine.active) {
                machine.active = false;
                playSound(300, 0.1, 'triangle');
                createParticles(machine.x + machine.width / 2, machine.y + machine.height / 2, '#0f0', 8);
                score += 50;
            }
        });
    }

    // Check exit
    if (player.x < exit.x + exit.width &&
        player.x + player.width > exit.x &&
        player.y < exit.y + exit.height &&
        player.y + player.height > exit.y) {
        score += 100 + Math.floor(1000 / time);
        playSound(800, 0.5, 'sine');
        createParticles(exit.x + exit.width / 2, exit.y + exit.height / 2, '#0f0', 20);
        gameState = 'win';
        document.getElementById('win-screen').style.display = 'block';
    }

    // Bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y > canvas.height) {
        lives--;
        playSound(150, 0.2, 'sawtooth');
        createParticles(player.x + player.width / 2, canvas.height, '#f00', 10);
        if (lives <= 0) {
            gameState = 'gameover';
            document.getElementById('message').style.display = 'block';
        } else {
            resetPlayer();
        }
    }

    // Update UI
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = time.toFixed(2);
    document.getElementById('level').textContent = level;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background gradient
    let bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#222');
    bgGradient.addColorStop(1, '#000');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#555';
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 2;
    ctx.strokeRect(ground.x, ground.y, ground.width, ground.height);

    // Draw conveyors
    conveyors.forEach(conveyor => {
        let conveyorGradient = ctx.createLinearGradient(conveyor.x, conveyor.y, conveyor.x, conveyor.y + conveyor.height);
        conveyorGradient.addColorStop(0, '#888');
        conveyorGradient.addColorStop(1, '#666');
        ctx.fillStyle = conveyorGradient;
        ctx.fillRect(conveyor.x, conveyor.y, conveyor.width, conveyor.height);
        ctx.strokeStyle = '#aaa';
        ctx.strokeRect(conveyor.x, conveyor.y, conveyor.width, conveyor.height);
        // Arrows
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        if (conveyor.speed > 0) {
            ctx.fillText('▶▶▶', conveyor.x + conveyor.width / 2 - 20, conveyor.y + 12);
        } else {
            ctx.fillText('◀◀◀', conveyor.x + conveyor.width / 2 - 20, conveyor.y + 12);
        }
    });

    // Draw machines
    machines.forEach(machine => {
        if (machine.active) {
            let intensity = (Math.sin(machine.blink) + 1) / 2;
            ctx.fillStyle = `rgb(${255 * intensity}, 0, 0)`;
            ctx.shadowColor = '#f00';
            ctx.shadowBlur = 10 * intensity;
        } else {
            ctx.fillStyle = '#0f0';
            ctx.shadowBlur = 0;
        }
        ctx.fillRect(machine.x, machine.y, machine.width, machine.height);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.strokeRect(machine.x, machine.y, machine.width, machine.height);
        // Add some details
        ctx.fillStyle = '#fff';
        ctx.fillRect(machine.x + 5, machine.y + 5, machine.width - 10, 5);
        ctx.fillRect(machine.x + 10, machine.y + 15, machine.width - 20, 5);
        if (machine.active) {
            ctx.fillStyle = '#ff0';
            ctx.beginPath();
            ctx.arc(machine.x + machine.width / 2, machine.y - 5, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw power-ups
    powerUps.forEach(powerUp => {
        if (!powerUp.collected) {
            if (powerUp.type === 'speed') {
                ctx.fillStyle = '#ff0';
            } else if (powerUp.type === 'life') {
                ctx.fillStyle = '#f0f';
            }
            ctx.beginPath();
            ctx.arc(powerUp.x + powerUp.width / 2, powerUp.y + powerUp.height / 2, powerUp.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            // Sparkle effect
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(powerUp.x + powerUp.width / 2 + Math.sin(time * 10) * 5, powerUp.y + powerUp.height / 2, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    });

    // Draw exit
    let exitGradient = ctx.createLinearGradient(exit.x, exit.y, exit.x, exit.y + exit.height);
    exitGradient.addColorStop(0, '#0f0');
    exitGradient.addColorStop(1, '#080');
    ctx.fillStyle = exitGradient;
    ctx.fillRect(exit.x, exit.y, exit.width, exit.height);
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(exit.x, exit.y, exit.width, exit.height);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('EXIT', exit.x + 10, exit.y + 25);

    // Draw player with animation
    ctx.save();
    if (player.direction === -1) {
        ctx.scale(-1, 1);
        ctx.translate(-player.x * 2 - player.width, 0);
    }
    let playerGradient = ctx.createRadialGradient(player.x + player.width / 2, player.y + player.height / 2, 0, player.x + player.width / 2, player.y + player.height / 2, player.width / 2);
    playerGradient.addColorStop(0, '#00f');
    playerGradient.addColorStop(1, '#005');
    ctx.fillStyle = playerGradient;
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + player.height / 2, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    // Eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(player.x + 7, player.y + 7, 2, 0, Math.PI * 2);
    ctx.arc(player.x + 13, player.y + 7, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(player.x + 7 + Math.sin(player.frame * Math.PI) * 0.5, player.y + 7, 1, 0, Math.PI * 2);
    ctx.arc(player.x + 13 + Math.sin(player.frame * Math.PI) * 0.5, player.y + 7, 1, 0, Math.PI * 2);
    ctx.fill();
    // Legs for walking
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(player.x + 5, player.y + player.height);
    ctx.lineTo(player.x + 5 + Math.sin(player.frame * Math.PI * 2) * 2, player.y + player.height + 5);
    ctx.moveTo(player.x + 15, player.y + player.height);
    ctx.lineTo(player.x + 15 - Math.sin(player.frame * Math.PI * 2) * 2, player.y + player.height + 5);
    ctx.stroke();
    ctx.restore();

    // Draw particles
    drawParticles();

    // Draw pause overlay
    if (paused) {
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
        ctx.textAlign = 'start';
    }

function resetPlayer() {
    player.x = 50;
    player.y = 400;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
}

function resetGame() {
    resetPlayer();
    score = 0;
    lives = 3;
    time = 0;
    level = 1;
    playerSpeed = 5;
    gameState = 'start';
    paused = false;
    initLevel();
    document.getElementById('start-screen').style.display = 'block';
    document.getElementById('message').style.display = 'none';
    document.getElementById('win-screen').style.display = 'none';
    document.getElementById('score').textContent = score;
    document.getElementById('lives').textContent = lives;
    document.getElementById('time').textContent = time.toFixed(2);
    document.getElementById('level').textContent = level;
}

function nextLevel() {
    level++;
    time = 0;
    initLevel();
    resetPlayer();
    gameState = 'playing';
    document.getElementById('win-screen').style.display = 'none';
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

document.getElementById('start-btn').addEventListener('click', () => {
    gameState = 'playing';
    document.getElementById('start-screen').style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === ' ') e.preventDefault();
    if (e.key === 'r' || e.key === 'R') {
        if (gameState === 'gameover') resetGame();
    }
    if (e.key === 'n' || e.key === 'N') {
        if (gameState === 'win') nextLevel();
    }
    if (e.key === 'p' || e.key === 'P') {
        if (gameState === 'playing') {
            paused = !paused;
        }
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

gameLoop();