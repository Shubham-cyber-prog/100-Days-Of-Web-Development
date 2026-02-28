// Planet Terraformer Lite - Enhanced Version
// Day 178 - 100 Days of Web Development
// This script implements a comprehensive terrain simulation game

// Constants
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TERRAIN_TYPES = {
    DIRT: 0,
    GRASS: 1,
    WATER: 2,
    ROCK: 3,
    FOREST: 4,
    CITY: 5
};
const TERRAIN_COLORS = ['#8B4513', '#32CD32', '#0000FF', '#696969', '#228B22', '#FF6347'];
const TERRAIN_NAMES = ['Dirt', 'Grass', 'Water', 'Rock', 'Forest', 'City'];
const MAX_POPULATION = 1000;
const MAX_RESOURCES = 500;

// Global variables
let canvas, ctx;
let terrainGrid = [];
let buildings = [];
let mouseDown = false;
let currentTool = 'raise';
let brushSize = 20;
let gameTime = 0;
let lastUpdate = Date.now();

// Stats
let atmosphere = 50;
let water = 50;
let heat = 50;
let population = 0;
let happiness = 50;
let food = 100;
let energy = 100;
let minerals = 100;

// Events log
let eventsLog = ['Welcome to Planet Terraformer!'];

// Initialize the game
function init() {
    canvas = document.getElementById('terrain-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    // Initialize terrain grid (simplified 2D array for height and type)
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        terrainGrid[x] = [];
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            terrainGrid[x][y] = {
                height: Math.random() * 100 + 200,
                type: TERRAIN_TYPES.DIRT
            };
        }
    }

    // Generate initial terrain features
    generateInitialTerrain();

    // Set up event listeners
    setupEventListeners();

    // Start game loop
    gameLoop();
}

// Generate initial terrain with some variety
function generateInitialTerrain() {
    // Add some water bodies
    for (let i = 0; i < 5; i++) {
        let centerX = Math.random() * CANVAS_WIDTH;
        let centerY = Math.random() * CANVAS_HEIGHT;
        let radius = Math.random() * 50 + 20;
        for (let x = Math.max(0, centerX - radius); x < Math.min(CANVAS_WIDTH, centerX + radius); x++) {
            for (let y = Math.max(0, centerY - radius); y < Math.min(CANVAS_HEIGHT, centerY + radius); y++) {
                let dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                if (dist < radius) {
                    terrainGrid[x][y].height = Math.max(100, terrainGrid[x][y].height - 50);
                    terrainGrid[x][y].type = TERRAIN_TYPES.WATER;
                }
            }
        }
    }

    // Add some hills
    for (let i = 0; i < 3; i++) {
        let centerX = Math.random() * CANVAS_WIDTH;
        let centerY = Math.random() * CANVAS_HEIGHT;
        let radius = Math.random() * 80 + 40;
        for (let x = Math.max(0, centerX - radius); x < Math.min(CANVAS_WIDTH, centerX + radius); x++) {
            for (let y = Math.max(0, centerY - radius); y < Math.min(CANVAS_HEIGHT, centerY + radius); y++) {
                let dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
                if (dist < radius) {
                    terrainGrid[x][y].height += (radius - dist) / radius * 100;
                    terrainGrid[x][y].type = TERRAIN_TYPES.ROCK;
                }
            }
        }
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Canvas mouse events
    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mouseleave', handleMouseUp);

    // Tool buttons
    document.getElementById('raise-terrain').addEventListener('click', () => setTool('raise'));
    document.getElementById('lower-terrain').addEventListener('click', () => setTool('lower'));
    document.getElementById('flatten-terrain').addEventListener('click', () => setTool('flatten'));
    document.getElementById('add-water').addEventListener('click', () => setTool('water'));
    document.getElementById('plant-forest').addEventListener('click', () => setTool('forest'));
    document.getElementById('build-city').addEventListener('click', () => setTool('city'));

    // Special tools
    document.getElementById('disaster-mode').addEventListener('click', triggerDisaster);
    document.getElementById('terraform-wave').addEventListener('click', terraformWave);
    document.getElementById('save-game').addEventListener('click', saveGame);
    document.getElementById('load-game').addEventListener('click', loadGame);

    // Brush size slider
    document.getElementById('brush-slider').addEventListener('input', (e) => {
        brushSize = parseInt(e.target.value);
        document.getElementById('brush-size-value').textContent = brushSize;
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);
}

// Handle mouse down on canvas
function handleMouseDown(e) {
    mouseDown = true;
    applyTool(e.offsetX, e.offsetY);
}

// Handle mouse move on canvas
function handleMouseMove(e) {
    if (mouseDown) {
        applyTool(e.offsetX, e.offsetY);
    }
}

// Handle mouse up
function handleMouseUp() {
    mouseDown = false;
}

// Set current tool and update UI
function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(tool.replace('-', '-')).classList.add('active');
    addEvent(`Switched to ${tool} tool`);
}

// Apply current tool at position
function applyTool(x, y) {
    let radius = brushSize;
    for (let i = Math.max(0, x - radius); i < Math.min(CANVAS_WIDTH, x + radius); i++) {
        for (let j = Math.max(0, y - radius); j < Math.min(CANVAS_HEIGHT, y + radius); j++) {
            let dist = Math.sqrt((i - x) ** 2 + (j - y) ** 2);
            if (dist < radius) {
                let factor = (radius - dist) / radius;
                applyToolEffect(i, j, factor);
            }
        }
    }
    updateStats();
    drawTerrain();
}

// Apply specific tool effect
function applyToolEffect(x, y, factor) {
    switch (currentTool) {
        case 'raise':
            terrainGrid[x][y].height += factor * 10;
            terrainGrid[x][y].type = TERRAIN_TYPES.DIRT;
            break;
        case 'lower':
            terrainGrid[x][y].height -= factor * 10;
            terrainGrid[x][y].type = TERRAIN_TYPES.DIRT;
            break;
        case 'flatten':
            terrainGrid[x][y].height = (terrainGrid[x][y].height + 250) / 2;
            terrainGrid[x][y].type = TERRAIN_TYPES.GRASS;
            break;
        case 'water':
            terrainGrid[x][y].height = Math.min(terrainGrid[x][y].height, 150);
            terrainGrid[x][y].type = TERRAIN_TYPES.WATER;
            break;
        case 'forest':
            if (terrainGrid[x][y].height > 200) {
                terrainGrid[x][y].type = TERRAIN_TYPES.FOREST;
            }
            break;
        case 'city':
            if (terrainGrid[x][y].height > 220 && terrainGrid[x][y].type !== TERRAIN_TYPES.WATER) {
                terrainGrid[x][y].type = TERRAIN_TYPES.CITY;
                buildings.push({x, y, type: 'city'});
            }
            break;
    }
    terrainGrid[x][y].height = Math.max(0, Math.min(CANVAS_HEIGHT, terrainGrid[x][y].height));
}

// Trigger disaster event
function triggerDisaster() {
    let disasterType = Math.floor(Math.random() * 4);
    switch (disasterType) {
        case 0:
            // Earthquake
            for (let i = 0; i < 100; i++) {
                let x = Math.floor(Math.random() * CANVAS_WIDTH);
                let y = Math.floor(Math.random() * CANVAS_HEIGHT);
                terrainGrid[x][y].height += (Math.random() - 0.5) * 50;
            }
            addEvent('Earthquake struck the planet!');
            break;
        case 1:
            // Flood
            for (let x = 0; x < CANVAS_WIDTH; x++) {
                for (let y = 0; y < CANVAS_HEIGHT; y++) {
                    if (terrainGrid[x][y].height < 180) {
                        terrainGrid[x][y].type = TERRAIN_TYPES.WATER;
                    }
                }
            }
            addEvent('Massive flood covered low-lying areas!');
            break;
        case 2:
            // Drought
            water -= 20;
            food -= 30;
            addEvent('Severe drought reduced water and food supplies!');
            break;
        case 3:
            // Meteor strike
            let centerX = Math.floor(Math.random() * CANVAS_WIDTH);
            let centerY = Math.floor(Math.random() * CANVAS_HEIGHT);
            for (let x = Math.max(0, centerX - 30); x < Math.min(CANVAS_WIDTH, centerX + 30); x++) {
                for (let y = Math.max(0, centerY - 30); y < Math.min(CANVAS_HEIGHT, centerY + 30); y++) {
                    terrainGrid[x][y].height -= 50;
                    terrainGrid[x][y].type = TERRAIN_TYPES.ROCK;
                }
            }
            addEvent('Meteor impact created a new crater!');
            break;
    }
    updateStats();
    drawTerrain();
}

// Terraform wave - smooths terrain
function terraformWave() {
    let newGrid = JSON.parse(JSON.stringify(terrainGrid));
    for (let x = 1; x < CANVAS_WIDTH - 1; x++) {
        for (let y = 1; y < CANVAS_HEIGHT - 1; y++) {
            let avg = (
                terrainGrid[x-1][y].height + terrainGrid[x+1][y].height +
                terrainGrid[x][y-1].height + terrainGrid[x][y+1].height
            ) / 4;
            newGrid[x][y].height = (terrainGrid[x][y].height + avg) / 2;
        }
    }
    terrainGrid = newGrid;
    addEvent('Terraforming wave smoothed the terrain');
    updateStats();
    drawTerrain();
}

// Save game state
function saveGame() {
    let gameState = {
        terrainGrid,
        buildings,
        atmosphere,
        water,
        heat,
        population,
        happiness,
        food,
        energy,
        minerals,
        gameTime,
        eventsLog
    };
    localStorage.setItem('planetTerraformerSave', JSON.stringify(gameState));
    addEvent('Game saved successfully');
}

// Load game state
function loadGame() {
    let saved = localStorage.getItem('planetTerraformerSave');
    if (saved) {
        let gameState = JSON.parse(saved);
        terrainGrid = gameState.terrainGrid;
        buildings = gameState.buildings;
        atmosphere = gameState.atmosphere;
        water = gameState.water;
        heat = gameState.heat;
        population = gameState.population;
        happiness = gameState.happiness;
        food = gameState.food;
        energy = gameState.energy;
        minerals = gameState.minerals;
        gameTime = gameState.gameTime;
        eventsLog = gameState.eventsLog;
        updateUI();
        drawTerrain();
        addEvent('Game loaded successfully');
    } else {
        addEvent('No saved game found');
    }
}

// Handle keyboard input
function handleKeyDown(e) {
    switch (e.key.toLowerCase()) {
        case 'r':
            setTool('raise');
            break;
        case 'l':
            setTool('lower');
            break;
        case 'f':
            setTool('flatten');
            break;
        case 'w':
            setTool('water');
            break;
        case 't':
            setTool('forest');
            break;
        case 'c':
            setTool('city');
            break;
        case 'd':
            triggerDisaster();
            break;
        case 's':
            saveGame();
            break;
        case 'o':
            loadGame();
            break;
    }
}

// Draw the terrain
function drawTerrain() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw sky gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw terrain
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            let cell = terrainGrid[x][y];
            if (y >= CANVAS_HEIGHT - cell.height) {
                ctx.fillStyle = TERRAIN_COLORS[cell.type];
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    // Draw buildings
    buildings.forEach(building => {
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(building.x - 2, CANVAS_HEIGHT - terrainGrid[building.x][building.y].height - 10, 4, 10);
    });
}

// Update all stats
function updateStats() {
    // Calculate atmosphere based on forest coverage
    let forestCount = 0;
    let totalCells = CANVAS_WIDTH * CANVAS_HEIGHT;
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            if (terrainGrid[x][y].type === TERRAIN_TYPES.FOREST) forestCount++;
        }
    }
    atmosphere = Math.min(100, Math.max(0, (forestCount / totalCells) * 200 + 20));

    // Calculate water based on water coverage
    let waterCount = 0;
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            if (terrainGrid[x][y].type === TERRAIN_TYPES.WATER) waterCount++;
        }
    }
    water = Math.min(100, Math.max(0, (waterCount / totalCells) * 300));

    // Calculate heat based on rock coverage
    let rockCount = 0;
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            if (terrainGrid[x][y].type === TERRAIN_TYPES.ROCK) rockCount++;
        }
    }
    heat = Math.min(100, Math.max(0, (rockCount / totalCells) * 150 + 30));

    // Calculate population based on cities
    population = buildings.length * 100;
    population = Math.min(MAX_POPULATION, population);

    // Calculate happiness based on various factors
    happiness = Math.min(100, Math.max(0, (atmosphere + water + (100 - heat) + food / 5 + energy / 5 + minerals / 5) / 6));

    // Update resources based on terrain and buildings
    updateResources();

    updateUI();
}

// Update resources
function updateResources() {
    // Food from grasslands and forests
    let foodProduction = 0;
    let energyProduction = 0;
    let mineralProduction = 0;

    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            switch (terrainGrid[x][y].type) {
                case TERRAIN_TYPES.GRASS:
                    foodProduction += 0.1;
                    break;
                case TERRAIN_TYPES.FOREST:
                    foodProduction += 0.2;
                    energyProduction += 0.1;
                    break;
                case TERRAIN_TYPES.ROCK:
                    mineralProduction += 0.3;
                    break;
                case TERRAIN_TYPES.CITY:
                    energyProduction -= 0.5; // Cities consume energy
                    food -= 0.1; // Cities consume food
                    break;
            }
        }
    }

    food = Math.min(MAX_RESOURCES, Math.max(0, food + foodProduction - population * 0.01));
    energy = Math.min(MAX_RESOURCES, Math.max(0, energy + energyProduction));
    minerals = Math.min(MAX_RESOURCES, Math.max(0, minerals + mineralProduction));
}

// Update UI elements
function updateUI() {
    document.getElementById('atmosphere-value').textContent = Math.round(atmosphere);
    document.getElementById('atmosphere-bar').value = atmosphere;
    document.getElementById('water-value').textContent = Math.round(water);
    document.getElementById('water-bar').value = water;
    document.getElementById('heat-value').textContent = Math.round(heat);
    document.getElementById('heat-bar').value = heat;
    document.getElementById('population-value').textContent = population;
    document.getElementById('population-bar').value = population;
    document.getElementById('happiness-value').textContent = Math.round(happiness);
    document.getElementById('happiness-bar').value = happiness;
    document.getElementById('food-value').textContent = Math.round(food);
    document.getElementById('food-bar').value = food;
    document.getElementById('energy-value').textContent = Math.round(energy);
    document.getElementById('energy-bar').value = energy;
    document.getElementById('minerals-value').textContent = Math.round(minerals);
    document.getElementById('minerals-bar').value = minerals;

    // Update events log
    let eventsList = document.getElementById('events-list');
    eventsList.innerHTML = '';
    eventsLog.slice(-10).forEach(event => {
        let li = document.createElement('li');
        li.textContent = event;
        eventsList.appendChild(li);
    });
}

// Add event to log
function addEvent(message) {
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    eventsLog.push(`[${timeString}] ${message}`);
    updateUI();
}

// Game loop
function gameLoop() {
    let now = Date.now();
    let deltaTime = now - lastUpdate;
    lastUpdate = now;

    gameTime += deltaTime;

    // Periodic updates every 5 seconds
    if (gameTime % 5000 < deltaTime) {
        periodicUpdate();
    }

    requestAnimationFrame(gameLoop);
}

// Periodic game updates
function periodicUpdate() {
    // Random events
    if (Math.random() < 0.1) {
        let events = [
            'A new species of plant has been discovered!',
            'Weather patterns are becoming more stable.',
            'Scientists report increased biodiversity.',
            'Population growth is accelerating.',
            'New mineral deposits found.'
        ];
        addEvent(events[Math.floor(Math.random() * events.length)]);
    }

    // Resource consumption
    food = Math.max(0, food - population * 0.01);
    energy = Math.max(0, energy - population * 0.005);

    // Population growth if conditions are good
    if (happiness > 70 && food > 50 && water > 50) {
        population = Math.min(MAX_POPULATION, population + 1);
    }

    updateStats();
}

// Add more constants and variables
const BUILDING_TYPES = {
    CITY: 'city',
    FARM: 'farm',
    POWER_PLANT: 'power_plant',
    MINE: 'mine'
};
let particles = [];
let animations = [];
let hoverInfo = { show: false, x: 0, y: 0, info: '' };

// Particle system for effects
class Particle {
    constructor(x, y, vx, vy, color, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw() {
        let alpha = this.life / this.maxLife;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.globalAlpha = 1;
    }
}

// Animation system
class Animation {
    constructor(x, y, type, duration) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.duration = duration;
        this.maxDuration = duration;
        this.frame = 0;
    }

    update() {
        this.duration--;
        this.frame++;
    }

    draw() {
        let progress = 1 - (this.duration / this.maxDuration);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = Math.min(1, this.duration / 30);

        switch (this.type) {
            case 'terraform':
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 20 + progress * 30, 0, Math.PI * 2 * progress);
                ctx.stroke();
                break;
            case 'disaster':
                ctx.fillStyle = '#FF0000';
                ctx.fillRect(-10, -10, 20, 20);
                ctx.fillStyle = '#FFFF00';
                ctx.fillRect(-5 + Math.sin(this.frame * 0.5) * 5, -5, 10, 10);
                break;
        }

        ctx.restore();
    }
}

// Add particle effect
function addParticle(x, y, color) {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(
            x, y,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            color,
            30 + Math.random() * 20
        ));
    }
}

// Add animation
function addAnimation(x, y, type) {
    animations.push(new Animation(x, y, type, 60));
}

// Enhanced applyToolEffect with particles
function applyToolEffect(x, y, factor) {
    let oldType = terrainGrid[x][y].type;
    switch (currentTool) {
        case 'raise':
            terrainGrid[x][y].height += factor * 10;
            terrainGrid[x][y].type = TERRAIN_TYPES.DIRT;
            addParticle(x, y, '#8B4513');
            break;
        case 'lower':
            terrainGrid[x][y].height -= factor * 10;
            terrainGrid[x][y].type = TERRAIN_TYPES.DIRT;
            addParticle(x, y, '#654321');
            break;
        case 'flatten':
            terrainGrid[x][y].height = (terrainGrid[x][y].height + 250) / 2;
            terrainGrid[x][y].type = TERRAIN_TYPES.GRASS;
            addParticle(x, y, '#32CD32');
            break;
        case 'water':
            terrainGrid[x][y].height = Math.min(terrainGrid[x][y].height, 150);
            terrainGrid[x][y].type = TERRAIN_TYPES.WATER;
            addParticle(x, y, '#0000FF');
            break;
        case 'forest':
            if (terrainGrid[x][y].height > 200) {
                terrainGrid[x][y].type = TERRAIN_TYPES.FOREST;
                addParticle(x, y, '#228B22');
            }
            break;
        case 'city':
            if (terrainGrid[x][y].height > 220 && terrainGrid[x][y].type !== TERRAIN_TYPES.WATER) {
                terrainGrid[x][y].type = TERRAIN_TYPES.CITY;
                buildings.push({x, y, type: BUILDING_TYPES.CITY});
                addParticle(x, y, '#FF6347');
                addAnimation(x, y, 'terraform');
            }
            break;
    }

    if (oldType !== terrainGrid[x][y].type) {
        addEvent(`Changed terrain at (${x}, ${y}) from ${TERRAIN_NAMES[oldType]} to ${TERRAIN_NAMES[terrainGrid[x][y].type]}`);
    }

    terrainGrid[x][y].height = Math.max(0, Math.min(CANVAS_HEIGHT, terrainGrid[x][y].height));
}

// Enhanced drawTerrain with particles and animations
function drawTerrain() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw sky gradient
    let gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98FB98');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw terrain
    for (let x = 0; x < CANVAS_WIDTH; x++) {
        for (let y = 0; y < CANVAS_HEIGHT; y++) {
            let cell = terrainGrid[x][y];
            if (y >= CANVAS_HEIGHT - cell.height) {
                ctx.fillStyle = TERRAIN_COLORS[cell.type];
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    // Draw buildings with more detail
    buildings.forEach(building => {
        let height = terrainGrid[building.x][building.y].height;
        ctx.fillStyle = '#FF6347';
        ctx.fillRect(building.x - 3, CANVAS_HEIGHT - height - 15, 6, 15);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(building.x - 2, CANVAS_HEIGHT - height - 12, 4, 3); // Window
    });

    // Draw particles
    particles.forEach(particle => particle.draw());

    // Draw animations
    animations.forEach(animation => animation.draw());

    // Draw hover info
    if (hoverInfo.show) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(hoverInfo.x + 10, hoverInfo.y - 30, 150, 25);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Arial';
        ctx.fillText(hoverInfo.info, hoverInfo.x + 15, hoverInfo.y - 15);
    }
}

// Update particles and animations
function updateEffects() {
    particles = particles.filter(particle => {
        particle.update();
        return particle.life > 0;
    });

    animations = animations.filter(animation => {
        animation.update();
        return animation.duration > 0;
    });
}

// Enhanced canvas events with hover
canvas.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        applyTool(e.offsetX, e.offsetY);
    }

    // Update hover info
    let x = Math.floor(e.offsetX);
    let y = Math.floor(e.offsetY);
    if (x >= 0 && x < CANVAS_WIDTH && y >= 0 && y < CANVAS_HEIGHT) {
        let cell = terrainGrid[x][y];
        let terrainHeight = CANVAS_HEIGHT - cell.height;
        if (y >= terrainHeight) {
            hoverInfo.show = true;
            hoverInfo.x = e.offsetX;
            hoverInfo.y = e.offsetY;
            hoverInfo.info = `${TERRAIN_NAMES[cell.type]} | Height: ${Math.round(cell.height)}`;
        } else {
            hoverInfo.show = false;
        }
    } else {
        hoverInfo.show = false;
    }
});

canvas.addEventListener('mouseleave', () => {
    hoverInfo.show = false;
});

// More building types
function addBuilding(x, y, type) {
    if (terrainGrid[x][y].type !== TERRAIN_TYPES.WATER && terrainGrid[x][y].height > 200) {
        buildings.push({x, y, type});
        terrainGrid[x][y].type = TERRAIN_TYPES.CITY;
        addEvent(`Built ${type} at (${x}, ${y})`);
        addAnimation(x, y, 'terraform');
    }
}

// Enhanced periodic update with more events
function periodicUpdate() {
    // Random events
    if (Math.random() < 0.1) {
        let events = [
            'A new species of plant has been discovered!',
            'Weather patterns are becoming more stable.',
            'Scientists report increased biodiversity.',
            'Population growth is accelerating.',
            'New mineral deposits found.',
            'Alien signal detected!',
            'Solar flare increases energy production.',
            'Migration of wildlife observed.',
            'Underground water source discovered.',
            'Volcanic activity detected.'
        ];
        addEvent(events[Math.floor(Math.random() * events.length)]);
    }

    // Resource consumption
    food = Math.max(0, food - population * 0.01);
    energy = Math.max(0, energy - population * 0.005);

    // Population growth if conditions are good
    if (happiness > 70 && food > 50 && water > 50) {
        population = Math.min(MAX_POPULATION, population + 1);
    }

    // Random disasters (rare)
    if (Math.random() < 0.02) {
        triggerDisaster();
    }

    // Auto-terraforming for cities (slow growth)
    buildings.forEach(building => {
        if (Math.random() < 0.1) {
            let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
            let dir = directions[Math.floor(Math.random() * directions.length)];
            let nx = building.x + dir[0];
            let ny = building.y + dir[1];
            if (nx >= 0 && nx < CANVAS_WIDTH && ny >= 0 && ny < CANVAS_HEIGHT) {
                if (terrainGrid[nx][ny].type === TERRAIN_TYPES.DIRT) {
                    terrainGrid[nx][ny].type = TERRAIN_TYPES.GRASS;
                    addParticle(nx, ny, '#32CD32');
                }
            }
        }
    });

    updateEffects();
    updateStats();
}

// Enhanced game loop
function gameLoop() {
    let now = Date.now();
    let deltaTime = now - lastUpdate;
    lastUpdate = now;

    gameTime += deltaTime;

    // Periodic updates every 5 seconds
    if (gameTime % 5000 < deltaTime) {
        periodicUpdate();
    }

    // Update effects every frame
    updateEffects();

    // Redraw
    drawTerrain();

    requestAnimationFrame(gameLoop);
}

// Add more keyboard shortcuts
function handleKeyDown(e) {
    switch (e.key.toLowerCase()) {
        case 'r':
            setTool('raise');
            break;
        case 'l':
            setTool('lower');
            break;
        case 'f':
            setTool('flatten');
            break;
        case 'w':
            setTool('water');
            break;
        case 't':
            setTool('forest');
            break;
        case 'c':
            setTool('city');
            break;
        case 'd':
            triggerDisaster();
            break;
        case 's':
            saveGame();
            break;
        case 'o':
            loadGame();
            break;
        case 'q':
            terraformWave();
            break;
        case '1':
            document.getElementById('brush-slider').value = 10;
            brushSize = 10;
            document.getElementById('brush-size-value').textContent = 10;
            break;
        case '2':
            document.getElementById('brush-slider').value = 20;
            brushSize = 20;
            document.getElementById('brush-size-value').textContent = 20;
            break;
        case '3':
            document.getElementById('brush-slider').value = 30;
            brushSize = 30;
            document.getElementById('brush-size-value').textContent = 30;
            break;
    }
}

// Add tooltips to buttons
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.title = `Shortcut: ${btn.id.charAt(0).toUpperCase()}`;
});

// Enhanced disaster with animation
function triggerDisaster() {
    let disasterType = Math.floor(Math.random() * 4);
    let centerX = Math.floor(Math.random() * CANVAS_WIDTH);
    let centerY = Math.floor(Math.random() * CANVAS_HEIGHT);

    addAnimation(centerX, centerY, 'disaster');

    switch (disasterType) {
        case 0:
            // Earthquake
            for (let i = 0; i < 100; i++) {
                let x = Math.floor(Math.random() * CANVAS_WIDTH);
                let y = Math.floor(Math.random() * CANVAS_HEIGHT);
                terrainGrid[x][y].height += (Math.random() - 0.5) * 50;
                addParticle(x, y, '#8B4513');
            }
            addEvent('Earthquake struck the planet!');
            break;
        case 1:
            // Flood
            for (let x = 0; x < CANVAS_WIDTH; x++) {
                for (let y = 0; y < CANVAS_HEIGHT; y++) {
                    if (terrainGrid[x][y].height < 180) {
                        terrainGrid[x][y].type = TERRAIN_TYPES.WATER;
                        addParticle(x, y, '#0000FF');
                    }
                }
            }
            addEvent('Massive flood covered low-lying areas!');
            break;
        case 2:
            // Drought
            water -= 20;
            food -= 30;
            addEvent('Severe drought reduced water and food supplies!');
            break;
        case 3:
            // Meteor strike
            for (let x = Math.max(0, centerX - 30); x < Math.min(CANVAS_WIDTH, centerX + 30); x++) {
                for (let y = Math.max(0, centerY - 30); y < Math.min(CANVAS_HEIGHT, centerY + 30); y++) {
                    terrainGrid[x][y].height -= 50;
                    terrainGrid[x][y].type = TERRAIN_TYPES.ROCK;
                    addParticle(x, y, '#696969');
                }
            }
            addEvent('Meteor impact created a new crater!');
            break;
    }
    updateStats();
}

// Start the game when page loads
window.onload = init;