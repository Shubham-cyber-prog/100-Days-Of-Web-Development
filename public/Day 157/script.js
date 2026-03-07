const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.8;
const friction = 0.9;
let keys = {};

const player = {
    x: 50,
    y: 300,
    w: 32,
    h: 48,
    vx: 0,
    vy: 0,
    speed: 4,
    jumpPower: 14,
    onGround: false
};

const platforms = [
    { x: 0, y: 360, w: 800, h: 40 },
    { x: 200, y: 290, w: 120, h: 12 },
    { x: 380, y: 230, w: 140, h: 12 },
    { x: 560, y: 180, w: 120, h: 12 }
];

let running = false;
let recording = [];
let ghostPath = null; // loaded from localStorage
let frameIndex = 0;
let ghostColor = 'rgba(0,0,0,0.35)';
let lastTimestamp = null;
let message = '';

function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function loadShadow() {
    const raw = localStorage.getItem('shadowPath');
    if (raw) {
        try {
            ghostPath = JSON.parse(raw);
        } catch (e) {
            console.warn('Failed to parse saved shadow');
            ghostPath = null;
        }
    }
}

function saveShadow(path) {
    try {
        localStorage.setItem('shadowPath', JSON.stringify(path));
    } catch (e) {
        console.warn('Failed to save shadow', e);
    }
}

function resetPlayer() {
    player.x = 50;
    player.y = 300;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
}

function startRun() {
    resetPlayer();
    recording = [];
    running = true;
    frameIndex = 0;
    message = '';
    lastTimestamp = null;
    loadShadow();
}

function endRun(reason) {
    running = false;
    message = reason || 'Run ended';
    if (recording.length) saveShadow(recording);
}

function resetShadow() {
    localStorage.removeItem('shadowPath');
    ghostPath = null;
}

function updatePhysics() {
    // horizontal input
    if (keys['ArrowLeft'] || keys['a']) player.vx = -player.speed;
    else if (keys['ArrowRight'] || keys['d']) player.vx = player.speed;
    else player.vx = 0;

    // jump
    if ((keys['ArrowUp'] || keys['w'] || keys[' ']) && player.onGround) {
        player.vy = -player.jumpPower;
        player.onGround = false;
    }

    // apply gravity
    player.vy += gravity;

    // apply velocity
    player.x += player.vx;
    player.y += player.vy;

    // platform collisions
    player.onGround = false;
    for (let p of platforms) {
        const platRect = { x: p.x, y: p.y, w: p.w, h: p.h };
        const playerRect = { x: player.x, y: player.y, w: player.w, h: player.h };
        // simple AABB resolution from top
        if (player.vy >= 0 &&
            player.x + player.w > p.x && player.x < p.x + p.w &&
            player.y + player.h > p.y && player.y + player.h < p.y + p.h + player.vy) {
            player.y = p.y - player.h;
            player.vy = 0;
            player.onGround = true;
        }
    }

    // world bounds
    if (player.x < 0) player.x = 0;
    if (player.x + player.w > canvas.width) player.x = canvas.width - player.w;
    if (player.y > canvas.height) {
        // fell off
        endRun('You fell!');
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw platforms
    ctx.fillStyle = '#654321';
    for (let p of platforms) {
        ctx.fillRect(p.x, p.y, p.w, p.h);
    }

    // draw finish flag
    ctx.fillStyle = 'gold';
    ctx.fillRect(canvas.width - 40, platforms[0].y - 80, 10, 80);
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - 30, platforms[0].y - 80 + 10, 30, 20);

    // draw ghost (previous run)
    if (ghostPath && ghostPath.length > 0) {
        const gp = ghostPath[Math.min(frameIndex, ghostPath.length - 1)];
        if (gp) {
            ctx.fillStyle = ghostColor;
            ctx.fillRect(gp.x, gp.y, player.w, player.h);
        }
    }

    // draw player
    ctx.fillStyle = '#0066ff';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // HUD
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('Controls: Arrow keys or A/D to move, Up/Space to jump', 10, 20);
    if (message) ctx.fillText('Status: ' + message, 10, 40);
    if (ghostPath) ctx.fillText('Shadow loaded (avoid colliding)', 10, 60);
}

function gameLoop(ts) {
    if (!lastTimestamp) lastTimestamp = ts;
    const dt = ts - lastTimestamp;
    lastTimestamp = ts;

    if (running) {
        updatePhysics();

        // record player position this frame
        recording.push({ x: player.x, y: player.y });

        // check collision with ghost
        if (ghostPath && ghostPath.length > 0) {
            const gp = ghostPath[Math.min(frameIndex, ghostPath.length - 1)];
            if (gp) {
                const playerRect = { x: player.x, y: player.y, w: player.w, h: player.h };
                const ghostRect = { x: gp.x, y: gp.y, w: player.w, h: player.h };
                if (rectsOverlap(playerRect, ghostRect)) {
                    endRun('Hit by your shadow!');
                }
            }
        }

        // check finish
        if (player.x + player.w >= canvas.width - 40 && player.y + player.h <= platforms[0].y) {
            endRun('Finished! Shadow updated.');
        }

        frameIndex++;
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Input handlers
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Buttons
document.getElementById('start').addEventListener('click', () => startRun());
document.getElementById('reset').addEventListener('click', () => { resetShadow(); message = 'Shadow reset'; });

// init
loadShadow();
requestAnimationFrame(gameLoop);
