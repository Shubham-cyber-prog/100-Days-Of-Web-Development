// Titan Climb - Day 164
// Vertical traversal boss encounter

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Titan
const titanGroup = new THREE.Group();
scene.add(titanGroup);

// Body parts
const bodyGeometry = new THREE.BoxGeometry(4, 6, 2);
const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x696969 });
const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
body.position.y = 3;
titanGroup.add(body);

const headGeometry = new THREE.BoxGeometry(2, 2, 2);
const head = new THREE.Mesh(headGeometry, bodyMaterial);
head.position.y = 7;
titanGroup.add(head);

const armGeometry = new THREE.BoxGeometry(1, 4, 1);
const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
leftArm.position.set(-3, 4, 0);
titanGroup.add(leftArm);

const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
rightArm.position.set(3, 4, 0);
titanGroup.add(rightArm);

const legGeometry = new THREE.BoxGeometry(1.5, 5, 1.5);
const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
leftLeg.position.set(-1, -2.5, 0);
titanGroup.add(leftLeg);

const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
rightLeg.position.set(1, -2.5, 0);
titanGroup.add(rightLeg);

// Handholds
const handholdGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const handholdMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
const handholds = [];
const handholdPositions = [
    { x: -1.5, y: 1, z: 1.5 }, // on body
    { x: 1.5, y: 2, z: 1.5 },
    { x: 0, y: 3, z: 1.5 },
    { x: -2, y: 4, z: 1 }, // on left arm
    { x: 2, y: 4, z: 1 }, // on right arm
    { x: 0, y: 6, z: 1.5 }, // on head
    { x: -0.5, y: -1, z: 1.5 }, // on left leg
    { x: 0.5, y: -1, z: 1.5 }, // on right leg
];

handholdPositions.forEach(pos => {
    const handhold = new THREE.Mesh(handholdGeometry, handholdMaterial);
    handhold.position.set(pos.x, pos.y, pos.z);
    handhold.userData.isHandhold = true;
    titanGroup.add(handhold);
    handholds.push(handhold);
});

// Weak points (some handholds are weak points)
const weakPoints = [handholds[2], handholds[5]]; // middle body and head
weakPoints.forEach(wp => {
    wp.material.color.set(0xFF0000); // Red for weak points
    wp.userData.isWeakPoint = true;
});

// Player
let playerPosition = new THREE.Vector3(0, 0, 5); // Start at ground
let currentHandhold = null;
let stamina = 100;
let titanHealth = 100;

// Controls
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = true;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
        case 'Space': if (canJump) jump(); break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
    }
});

// Mouse look
let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;
const euler = new THREE.Euler(0, 0, 0, 'YXZ');

document.addEventListener('mousedown', (event) => {
    isMouseDown = true;
    // Check for handhold click
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(handholds);
    if (intersects.length > 0) {
        const handhold = intersects[0].object;
        climbToHandhold(handhold);
    }
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

// Functions
function climbToHandhold(handhold) {
    if (stamina > 10) {
        playerPosition.copy(handhold.position);
        playerPosition.z += 1; // Slightly in front
        currentHandhold = handhold;
        stamina -= 10;
        updateUI();

        if (handhold.userData.isWeakPoint) {
            titanHealth -= 20;
            updateUI();
            if (titanHealth <= 0) {
                alert('Titan defeated!');
            }
        }
    }
}

function jump() {
    if (currentHandhold) {
        // Jump off
        playerPosition.y -= 2;
        currentHandhold = null;
        canJump = false;
        setTimeout(() => canJump = true, 1000);
    }
}

function updateStamina() {
    if (currentHandhold) {
        stamina = Math.max(0, stamina - 0.5);
    } else {
        stamina = Math.min(100, stamina + 1);
    }
    updateUI();
}

function updateUI() {
    document.getElementById('stamina-bar').textContent = Math.floor(stamina);
    document.getElementById('titan-health').textContent = Math.floor(titanHealth);
}

setInterval(updateStamina, 100);

// Titan movement
function updateTitan() {
    titanGroup.rotation.y += 0.005; // Slow rotation
    titanGroup.position.y = Math.sin(Date.now() * 0.001) * 0.5; // Slight up/down
}

function animate() {
    requestAnimationFrame(animate);

    updateTitan();

    // Camera follows player
    camera.position.lerp(playerPosition.clone().add(new THREE.Vector3(0, 2, 5)), 0.1);

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});