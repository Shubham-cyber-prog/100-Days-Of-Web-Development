// Asteroid Forge - Day 163
// Micro survival crafting in zero-G

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Player controls
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let moveUp = false;
let moveDown = false;

const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const euler = new THREE.Euler(0, 0, 0, 'YXZ');

let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
        case 'Space': moveUp = true; event.preventDefault(); break;
        case 'ShiftLeft': moveDown = true; break;
        case 'KeyE': landOnAsteroid(); break;
        case 'KeyM': if (landed) mineResources(); break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
        case 'Space': moveUp = false; break;
        case 'ShiftLeft': moveDown = false; break;
    }
});

document.addEventListener('mousedown', () => {
    isMouseDown = true;
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        mouseX += event.movementX * 0.002;
        mouseY += event.movementY * 0.002;
        mouseY = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, mouseY));
        euler.set(mouseY, mouseX, 0);
        camera.quaternion.setFromEuler(euler);
    }
});

// Asteroids
const asteroids = [];
const asteroidGeometry = new THREE.SphereGeometry(1, 16, 16);
const asteroidMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });

for (let i = 0; i < 10; i++) {
    const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
    asteroid.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
    asteroid.scale.setScalar(Math.random() * 2 + 0.5);
    scene.add(asteroid);
    asteroids.push(asteroid);
}

// Game state
let oxygen = 100;
let resources = 0;
let landed = false;
let currentAsteroid = null;
let oxygenInterval;

function updateOxygen() {
    oxygen -= 0.1;
    if (oxygen <= 0) {
        oxygen = 0;
        alert('Oxygen depleted! Game Over.');
        clearInterval(oxygenInterval);
    }
    document.getElementById('oxygen').textContent = Math.floor(oxygen);
}

oxygenInterval = setInterval(updateOxygen, 100);

function landOnAsteroid() {
    if (landed) {
        // Take off
        landed = false;
        document.getElementById('crafting').style.display = 'none';
        return;
    }

    // Check if close to an asteroid
    const playerPos = camera.position;
    for (const asteroid of asteroids) {
        if (playerPos.distanceTo(asteroid.position) < asteroid.scale.x * 2) {
            landed = true;
            currentAsteroid = asteroid;
            document.getElementById('crafting').style.display = 'block';
            break;
        }
    }
}

function mineResources() {
    if (landed && currentAsteroid) {
        resources += Math.floor(Math.random() * 5) + 1;
        document.getElementById('resource-count').textContent = resources;
    }
}

// Add mining button or auto-mine
document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyM' && landed) {
        mineResources();
    }
});

// Crafting
document.getElementById('craft-pickaxe').addEventListener('click', () => {
    if (resources >= 5) {
        resources -= 5;
        document.getElementById('resource-count').textContent = resources;
        alert('Pickaxe crafted! Mining speed increased.');
    } else {
        alert('Not enough resources!');
    }
});

document.getElementById('craft-drill').addEventListener('click', () => {
    if (resources >= 10) {
        resources -= 10;
        document.getElementById('resource-count').textContent = resources;
        alert('Drill crafted! Even faster mining.');
    } else {
        alert('Not enough resources!');
    }
});

function animate() {
    requestAnimationFrame(animate);

    // Movement
    direction.set(0, 0, 0);
    if (moveForward) direction.z -= 1;
    if (moveBackward) direction.z += 1;
    if (moveLeft) direction.x -= 1;
    if (moveRight) direction.x += 1;
    if (moveUp) direction.y += 1;
    if (moveDown) direction.y -= 1;

    direction.normalize();
    direction.applyQuaternion(camera.quaternion);

    camera.position.addScaledVector(direction, 0.5);

    velocity.multiplyScalar(0.9);

    // Rotate asteroids slowly
    asteroids.forEach(asteroid => {
        asteroid.rotation.x += 0.01;
        asteroid.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});