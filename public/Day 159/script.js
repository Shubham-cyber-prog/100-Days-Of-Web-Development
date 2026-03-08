// Alien Zoo Architect - 3D Habitat Builder with AI Creatures
class AlienZooArchitect {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        
        this.gameState = {
            credits: 1000,
            overallHappiness: 0,
            visitors: 0,
            mode: 'build',
            selectedBuildType: null,
            placementMode: false
        };
        
        this.gameObjects = [];
        this.creatures = [];
        this.habitats = [];
        this.structures = [];
        
        // Grid system
        this.gridSize = 20;
        this.cellSize = 2;
        
        this.init();
        this.setupEventListeners();
        this.startGameLoop();
    }
    
    init() {
        const canvas = document.getElementById('gameCanvas');
        
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x001122);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75, 
            canvas.clientWidth / canvas.clientHeight, 
            0.1, 
            1000
        );
        this.camera.position.set(15, 15, 15);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            antialias: true 
        });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.maxPolarAngle = Math.PI / 2 - 0.1;
        
        // Lighting
        this.setupLighting();
        
        // Ground
        this.createGround();
        
        // Resize handler
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
        this.scene.add(ambientLight);
        
        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 20, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -25;
        directionalLight.shadow.camera.right = 25;
        directionalLight.shadow.camera.top = 25;
        directionalLight.shadow.camera.bottom = -25;
        this.scene.add(directionalLight);
        
        // Colored accent lights
        const accentLight1 = new THREE.PointLight(0x00ffff, 0.3, 30);
        accentLight1.position.set(-10, 8, -10);
        this.scene.add(accentLight1);
        
        const accentLight2 = new THREE.PointLight(0xff00ff, 0.3, 30);
        accentLight2.position.set(10, 8, -10);
        this.scene.add(accentLight2);
    }
    
    createGround() {
        // Main ground
        const groundGeometry = new THREE.PlaneGeometry(40, 40);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a4a2a,
            transparent: true,
            opacity: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Grid helper
        const gridHelper = new THREE.GridHelper(40, 20, 0x444444, 0x222222);
        this.scene.add(gridHelper);
    }
    
    setupEventListeners() {
        const canvas = document.getElementById('gameCanvas');
        
        // Mouse events
        canvas.addEventListener('click', (event) => this.onMouseClick(event));
        canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            this.cancelPlacement();
        });
        
        // Build buttons
        document.querySelectorAll('.build-btn').forEach(btn => {
            btn.addEventListener('click', (event) => this.selectBuildItem(event));
        });
        
        // Mode buttons
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (event) => this.switchMode(event));
        });
        
        // Action buttons
        document.getElementById('clearBtn').addEventListener('click', () => this.clearAll());
        document.getElementById('randomBtn').addEventListener('click', () => this.createRandomZoo());
    }
    
    selectBuildItem(event) {
        const btn = event.target;
        const type = btn.dataset.type;
        const cost = parseInt(btn.dataset.cost);
        
        if (this.gameState.credits < cost) {
            this.showMessage('Not enough credits!', 'error');
            return;
        }
        
        // Clear previous selections
        document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        
        this.gameState.selectedBuildType = type;
        this.gameState.placementMode = true;
        
        this.updatePlacementGuide(`Click to place ${type} (${cost} credits)`);
    }
    
    switchMode(event) {
        const btn = event.target;
        const mode = btn.dataset.mode;
        
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        this.gameState.mode = mode;
        this.cancelPlacement();
        
        switch(mode) {
            case 'build':
                this.updatePlacementGuide('Select an item to build');
                break;
            case 'inspect':
                this.updatePlacementGuide('Click on objects to inspect them');
                break;
            case 'observe':
                this.updatePlacementGuide('Watch your creatures in action');
                break;
        }
    }
    
    onMouseClick(event) {
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        if (this.gameState.mode === 'build' && this.gameState.placementMode) {
            this.placeObject();
        } else if (this.gameState.mode === 'inspect') {
            this.inspectObject();
        }
    }
    
    onMouseMove(event) {
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    
    placeObject() {
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        const groundIntersect = intersects.find(intersect => 
            intersect.object.geometry instanceof THREE.PlaneGeometry
        );
        
        if (groundIntersect) {
            const position = groundIntersect.point;
            position.y = 0;
            
            // Snap to grid
            position.x = Math.round(position.x / this.cellSize) * this.cellSize;
            position.z = Math.round(position.z / this.cellSize) * this.cellSize;
            
            if (this.isValidPlacement(position)) {
                this.createGameObject(this.gameState.selectedBuildType, position);
                this.cancelPlacement();
            } else {
                this.showMessage('Cannot place here!', 'error');
            }
        }
    }
    
    inspectObject() {
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);
        const objectIntersect = intersects.find(intersect => 
            intersect.object.userData && intersect.object.userData.gameObject
        );
        
        if (objectIntersect) {
            const gameObject = objectIntersect.object.userData.gameObject;
            this.showObjectInfo(gameObject);
        }
    }
    
    isValidPlacement(position) {
        // Check if position is within bounds
        if (Math.abs(position.x) > 18 || Math.abs(position.z) > 18) {
            return false;
        }
        
        // Check if position is occupied
        return !this.gameObjects.some(obj => 
            Math.abs(obj.position.x - position.x) < this.cellSize &&
            Math.abs(obj.position.z - position.z) < this.cellSize
        );
    }
    
    createGameObject(type, position) {
        let mesh = null;
        let gameObject = null;
        
        switch(type) {
            case 'forest':
                mesh = this.createForestBiome();
                gameObject = new Habitat(type, position, mesh);
                break;
            case 'desert':
                mesh = this.createDesertBiome();
                gameObject = new Habitat(type, position, mesh);
                break;
            case 'ocean':
                mesh = this.createOceanBiome();
                gameObject = new Habitat(type, position, mesh);
                break;
            case 'crystal':
                mesh = this.createCrystalCavern();
                gameObject = new Habitat(type, position, mesh);
                break;
            case 'shelter':
            case 'feeding':
            case 'playground':
            case 'healing':
                mesh = this.createStructure(type);
                gameObject = new Structure(type, position, mesh);
                break;
            case 'flubber':
            case 'crystaling':
            case 'skydancer':
            case 'voidwhisper':
                mesh = this.createCreature(type);
                gameObject = new AlienCreature(type, position, mesh);
                this.creatures.push(gameObject);
                break;
        }
        
        if (mesh && gameObject) {
            mesh.position.copy(position);
            mesh.userData.gameObject = gameObject;
            this.scene.add(mesh);
            this.gameObjects.push(gameObject);
            
            const cost = this.getBuildCost(type);
            this.gameState.credits -= cost;
            this.updateUI();
            this.showMessage(`${type} placed!`, 'success');
        }
    }
    
    createForestBiome() {
        const group = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.CircleGeometry(3, 8);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x3a5a3a });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        base.position.y = 0.1;
        group.add(base);
        
        // Trees
        for (let i = 0; i < 5; i++) {
            const tree = new THREE.Group();
            
            // Trunk
            const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 2);
            const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3a2a });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.y = 1;
            tree.add(trunk);
            
            // Leaves
            const leavesGeometry = new THREE.SphereGeometry(0.8);
            const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x2a5a2a });
            const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
            leaves.position.y = 2.5;
            tree.add(leaves);
            
            const angle = (i / 5) * Math.PI * 2;
            tree.position.x = Math.cos(angle) * 2;
            tree.position.z = Math.sin(angle) * 2;
            group.add(tree);
        }
        
        return group;
    }
    
    createDesertBiome() {
        const group = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.CircleGeometry(3, 8);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x8a6a3a });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        base.position.y = 0.1;
        group.add(base);
        
        // Sand dunes
        for (let i = 0; i < 3; i++) {
            const duneGeometry = new THREE.SphereGeometry(1, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2);
            const duneMaterial = new THREE.MeshLambertMaterial({ color: 0x9a7a4a });
            const dune = new THREE.Mesh(duneGeometry, duneMaterial);
            const angle = (i / 3) * Math.PI * 2;
            dune.position.x = Math.cos(angle) * 1.5;
            dune.position.z = Math.sin(angle) * 1.5;
            dune.position.y = 0.1;
            group.add(dune);
        }
        
        // Cactus
        const cactusGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.5);
        const cactusMaterial = new THREE.MeshLambertMaterial({ color: 0x3a5a3a });
        const cactus = new THREE.Mesh(cactusGeometry, cactusMaterial);
        cactus.position.y = 0.75;
        group.add(cactus);
        
        return group;
    }
    
    createOceanBiome() {
        const group = new THREE.Group();
        
        // Water base
        const baseGeometry = new THREE.CircleGeometry(3, 8);
        const baseMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a4a8a, 
            transparent: true, 
            opacity: 0.8 
        });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        base.position.y = 0.1;
        group.add(base);
        
        // Coral
        for (let i = 0; i < 4; i++) {
            const coralGeometry = new THREE.SphereGeometry(0.3, 6, 6);
            const coralMaterial = new THREE.MeshLambertMaterial({ 
                color: i % 2 ? 0xff6a6a : 0x6aff6a 
            });
            const coral = new THREE.Mesh(coralGeometry, coralMaterial);
            const angle = (i / 4) * Math.PI * 2;
            coral.position.x = Math.cos(angle) * 2;
            coral.position.z = Math.sin(angle) * 2;
            coral.position.y = 0.3;
            group.add(coral);
        }
        
        return group;
    }
    
    createCrystalCavern() {
        const group = new THREE.Group();
        
        // Base
        const baseGeometry = new THREE.CircleGeometry(3, 8);
        const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3a6a });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.rotation.x = -Math.PI / 2;
        base.position.y = 0.1;
        group.add(base);
        
        // Crystals
        for (let i = 0; i < 6; i++) {
            const crystalGeometry = new THREE.OctahedronGeometry(0.5);
            const crystalMaterial = new THREE.MeshLambertMaterial({ 
                color: 0x8a6aff,
                transparent: true,
                opacity: 0.8
            });
            const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
            const angle = (i / 6) * Math.PI * 2;
            crystal.position.x = Math.cos(angle) * (1 + Math.random());
            crystal.position.z = Math.sin(angle) * (1 + Math.random());
            crystal.position.y = 0.5 + Math.random() * 0.5;
            crystal.rotation.y = Math.random() * Math.PI;
            group.add(crystal);
        }
        
        return group;
    }
    
    createStructure(type) {
        const group = new THREE.Group();
        
        let color, height;
        
        switch(type) {
            case 'shelter':
                color = 0x6a4a3a;
                height = 1.5;
                break;
            case 'feeding':
                color = 0x5a6a3a;
                height = 1;
                break;
            case 'playground':
                color = 0x6a5a8a;
                height = 2;
                break;
            case 'healing':
                color = 0x3a6a5a;
                height = 1.8;
                break;
        }
        
        const geometry = new THREE.BoxGeometry(1.5, height, 1.5);
        const material = new THREE.MeshLambertMaterial({ color });
        const structure = new THREE.Mesh(geometry, material);
        structure.position.y = height / 2;
        structure.castShadow = true;
        group.add(structure);
        
        // Add distinctive features
        if (type === 'feeding') {
            const bowlGeometry = new THREE.CylinderGeometry(0.3, 0.2, 0.2);
            const bowlMaterial = new THREE.MeshLambertMaterial({ color: 0x8a8a8a });
            const bowl = new THREE.Mesh(bowlGeometry, bowlMaterial);
            bowl.position.y = height + 0.1;
            group.add(bowl);
        } else if (type === 'playground') {
            const ballGeometry = new THREE.SphereGeometry(0.2);
            const ballMaterial = new THREE.MeshLambertMaterial({ color: 0xff6a6a });
            const ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.y = height + 0.2;
            ball.position.x = 0.5;
            group.add(ball);
        }
        
        return group;
    }
    
    createCreature(type) {
        const group = new THREE.Group();
        
        switch(type) {
            case 'flubber':
                // Green blob creature
                const flubberGeometry = new THREE.SphereGeometry(0.5);
                const flubberMaterial = new THREE.MeshLambertMaterial({ 
                    color: 0x3aff3a,
                    transparent: true,
                    opacity: 0.9
                });
                const flubber = new THREE.Mesh(flubberGeometry, flubberMaterial);
                flubber.position.y = 0.5;
                group.add(flubber);
                break;
                
            case 'crystaling':
                // Crystal creature
                const crystalingGeometry = new THREE.OctahedronGeometry(0.4);
                const crystalingMaterial = new THREE.MeshLambertMaterial({ 
                    color: 0x8a6aff,
                    transparent: true,
                    opacity: 0.8
                });
                const crystaling = new THREE.Mesh(crystalingGeometry, crystalingMaterial);
                crystaling.position.y = 0.4;
                group.add(crystaling);
                break;
                
            case 'skydancer':
                // Floating creature
                const skyGeometry = new THREE.SphereGeometry(0.3);
                const skyMaterial = new THREE.MeshLambertMaterial({ 
                    color: 0x6aff8a,
                    transparent: true,
                    opacity: 0.7
                });
                const sky = new THREE.Mesh(skyGeometry, skyMaterial);
                sky.position.y = 1.5;
                group.add(sky);
                
                // Wings
                for (let i = 0; i < 4; i++) {
                    const wingGeometry = new THREE.PlaneGeometry(0.3, 0.1);
                    const wingMaterial = new THREE.MeshLambertMaterial({ 
                        color: 0x8aff8a,
                        transparent: true,
                        opacity: 0.5
                    });
                    const wing = new THREE.Mesh(wingGeometry, wingMaterial);
                    const angle = (i / 4) * Math.PI * 2;
                    wing.position.x = Math.cos(angle) * 0.4;
                    wing.position.z = Math.sin(angle) * 0.4;
                    wing.position.y = 1.5;
                    group.add(wing);
                }
                break;
                
            case 'voidwhisper':
                // Mysterious dark creature
                const voidGeometry = new THREE.SphereGeometry(0.6);
                const voidMaterial = new THREE.MeshLambertMaterial({ 
                    color: 0x2a2a5a,
                    transparent: true,
                    opacity: 0.6
                });
                const voidCore = new THREE.Mesh(voidGeometry, voidMaterial);
                voidCore.position.y = 0.6;
                group.add(voidCore);
                
                // Aura
                const auraGeometry = new THREE.SphereGeometry(0.8);
                const auraMaterial = new THREE.MeshBasicMaterial({ 
                    color: 0x6a3aff,
                    transparent: true,
                    opacity: 0.1,
                    side: THREE.BackSide
                });
                const aura = new THREE.Mesh(auraGeometry, auraMaterial);
                aura.position.y = 0.6;
                group.add(aura);
                break;
        }
        
        return group;
    }
    
    getBuildCost(type) {
        const costs = {
            forest: 200, desert: 150, ocean: 300, crystal: 400,
            shelter: 100, feeding: 80, playground: 120, healing: 250,
            flubber: 500, crystaling: 600, skydancer: 700, voidwhisper: 800
        };
        return costs[type] || 0;
    }
    
    cancelPlacement() {
        this.gameState.placementMode = false;
        this.gameState.selectedBuildType = null;
        document.querySelectorAll('.build-btn').forEach(b => b.classList.remove('selected'));
        this.updatePlacementGuide('Select an item from the left panel to place it');
    }
    
    clearAll() {
        // Remove all objects except ground and lights
        const objectsToRemove = [];
        this.scene.traverse(child => {
            if (child.userData && child.userData.gameObject) {
                objectsToRemove.push(child);
            }
        });
        
        objectsToRemove.forEach(obj => this.scene.remove(obj));
        
        this.gameObjects = [];
        this.creatures = [];
        this.habitats = [];
        this.structures = [];
        
        this.gameState.credits += Math.floor(this.gameState.credits * 0.5); // Refund 50%
        this.updateUI();
        this.showMessage('Zoo cleared! 50% refund received.', 'info');
    }
    
    createRandomZoo() {
        this.clearAll();
        
        const types = ['forest', 'desert', 'shelter', 'feeding', 'flubber', 'crystaling'];
        const positions = [
            {x: -6, z: -6}, {x: 0, z: -6}, {x: 6, z: -6},
            {x: -6, z: 0}, {x: 6, z: 0},
            {x: -6, z: 6}, {x: 0, z: 6}, {x: 6, z: 6}
        ];
        
        positions.forEach((pos, i) => {
            if (i < types.length) {
                const type = types[i];
                const cost = this.getBuildCost(type);
                if (this.gameState.credits >= cost) {
                    this.createGameObject(type, new THREE.Vector3(pos.x, 0, pos.z));
                }
            }
        });
        
        this.showMessage('Random zoo created!', 'success');
    }
    
    updateCreatures() {
        this.creatures.forEach(creature => {
            creature.update(this.gameObjects, this.structures, this.habitats);
        });
        
        // Calculate overall happiness
        if (this.creatures.length > 0) {
            const totalHappiness = this.creatures.reduce((sum, creature) => 
                sum + creature.happiness, 0);
            this.gameState.overallHappiness = Math.round(totalHappiness / this.creatures.length);
        } else {
            this.gameState.overallHappiness = 0;
        }
        
        // Update visitors based on happiness
        this.gameState.visitors = Math.floor(this.gameState.overallHappiness * 0.5);
        
        // Award credits for high happiness
        if (this.gameState.overallHappiness > 80) {
            this.gameState.credits += 1;
        }
    }
    
    updateUI() {
        document.getElementById('overallHappiness').textContent = `${this.gameState.overallHappiness}%`;
        document.getElementById('credits').textContent = this.gameState.credits;
        document.getElementById('visitors').textContent = this.gameState.visitors;
        
        this.updateCreatureList();
    }
    
    updateCreatureList() {
        const list = document.getElementById('creatureList');
        
        if (this.creatures.length === 0) {
            list.innerHTML = '<p class="empty-state">No creatures yet. Add some aliens to get started!</p>';
            return;
        }
        
        list.innerHTML = this.creatures.map(creature => `
            <div class="creature-item">
                <div class="creature-name">${creature.type}</div>
                <div class="happiness-bar">
                    <div class="happiness-fill" style="width: ${creature.happiness}%"></div>
                </div>
                <div class="creature-happiness">Happiness: ${creature.happiness}%</div>
                <div class="creature-needs">${creature.getCurrentNeeds()}</div>
            </div>
        `).join('');
    }
    
    updatePlacementGuide(text) {
        document.getElementById('placementGuide').innerHTML = `
            <p>${text}</p>
            <p class="controls">Left click to place • Right click to cancel</p>
        `;
    }
    
    showObjectInfo(gameObject) {
        const info = document.getElementById('selectionInfo');
        
        if (gameObject instanceof AlienCreature) {
            info.innerHTML = `
                <h4>${gameObject.type}</h4>
                <p><strong>Happiness:</strong> ${gameObject.happiness}%</p>
                <p><strong>Current Mood:</strong> ${gameObject.mood}</p>
                <p><strong>Needs:</strong> ${gameObject.getCurrentNeeds()}</p>
                <p><strong>Preferred Biome:</strong> ${gameObject.preferredBiome}</p>
            `;
        } else {
            info.innerHTML = `
                <h4>${gameObject.type}</h4>
                <p><strong>Type:</strong> ${gameObject.constructor.name}</p>
                <p><strong>Position:</strong> (${Math.round(gameObject.position.x)}, ${Math.round(gameObject.position.z)})</p>
            `;
        }
    }
    
    showMessage(text, type = 'info') {
        // Create temporary message element
        const message = document.createElement('div');
        message.className = `message message-${type}`;
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'error' ? 'rgba(255,0,0,0.8)' : 
                           type === 'success' ? 'rgba(0,255,0,0.8)' : 'rgba(0,100,255,0.8)'};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => document.body.removeChild(message), 300);
        }, 2000);
    }
    
    onWindowResize() {
        const canvas = document.getElementById('gameCanvas');
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    startGameLoop() {
        const animate = () => {
            requestAnimationFrame(animate);
            
            this.controls.update();
            this.updateCreatures();
            this.updateUI();
            
            // Animate creatures
            this.creatures.forEach(creature => {
                if (creature.mesh) {
                    creature.mesh.rotation.y += 0.01;
                    creature.mesh.position.y = Math.sin(Date.now() * 0.001 + creature.position.x) * 0.1 + 0.5;
                }
            });
            
            this.renderer.render(this.scene, this.camera);
        };
        
        animate();
    }
}

// GameObject classes
class GameObject {
    constructor(type, position, mesh) {
        this.type = type;
        this.position = position;
        this.mesh = mesh;
        this.id = Math.random().toString(36).substr(2, 9);
    }
}

class Habitat extends GameObject {
    constructor(type, position, mesh) {
        super(type, position, mesh);
        this.biomeType = type;
        this.capacity = this.getCapacity();
        this.occupants = [];
    }
    
    getCapacity() {
        const capacities = { forest: 3, desert: 2, ocean: 4, crystal: 2 };
        return capacities[this.type] || 1;
    }
}

class Structure extends GameObject {
    constructor(type, position, mesh) {
        super(type, position, mesh);
        this.functionality = this.getFunctionality();
        this.range = 5; // Effect range
    }
    
    getFunctionality() {
        const functions = {
            shelter: 'comfort',
            feeding: 'hunger',
            playground: 'entertainment',
            healing: 'health'
        };
        return functions[this.type] || 'none';
    }
}

class AlienCreature extends GameObject {
    constructor(type, position, mesh) {
        super(type, position, mesh);
        this.happiness = 50;
        this.mood = 'neutral';
        this.needs = this.getCreatureNeeds();
        this.preferredBiome = this.getPreferredBiome();
        this.lastUpdate = Date.now();
        this.moveTarget = null;
        this.speed = 0.02;
    }
    
    getCreatureNeeds() {
        const needs = {
            flubber: { biome: 'forest', structure: 'playground', socializing: true },
            crystaling: { biome: 'crystal', structure: 'healing', isolation: true },
            skydancer: { biome: 'any', structure: 'feeding', movement: true },
            voidwhisper: { biome: 'any', structure: 'shelter', mystery: true }
        };
        return needs[this.type] || { biome: 'any', structure: 'any' };
    }
    
    getPreferredBiome() {
        const biomes = {
            flubber: 'forest',
            crystaling: 'crystal',
            skydancer: 'any',
            voidwhisper: 'desert'
        };
        return biomes[this.type] || 'any';
    }
    
    update(gameObjects, structures, habitats) {
        const now = Date.now();
        const deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;
        
        this.evaluateEnvironment(gameObjects, structures, habitats);
        this.updateMood();
        this.moveRandomly(deltaTime);
    }
    
    evaluateEnvironment(gameObjects, structures, habitats) {
        let satisfaction = 0;
        
        // Check for preferred biome
        const nearbyBiomes = habitats.filter(h => 
            this.getDistance(h.position) < 5
        );
        
        const preferredBiome = nearbyBiomes.find(b => 
            b.biomeType === this.preferredBiome
        );
        
        if (preferredBiome || this.preferredBiome === 'any') {
            satisfaction += 30;
        }
        
        // Check for needed structures
        const nearbyStructures = structures.filter(s => 
            this.getDistance(s.position) < s.range
        );
        
        const neededStructure = nearbyStructures.find(s => 
            s.type === this.needs.structure
        );
        
        if (neededStructure) {
            satisfaction += 25;
        }
        
        // Check for company (other creatures)
        const nearbyCreatures = gameObjects.filter(obj => 
            obj instanceof AlienCreature && 
            obj !== this && 
            this.getDistance(obj.position) < 3
        );
        
        if (this.needs.socializing && nearbyCreatures.length > 0) {
            satisfaction += 20;
        } else if (this.needs.isolation && nearbyCreatures.length === 0) {
            satisfaction += 20;
        }
        
        // General environment bonus
        satisfaction += Math.min(15, gameObjects.length * 2);
        
        // Update happiness gradually
        const targetHappiness = Math.min(100, satisfaction);
        this.happiness += (targetHappiness - this.happiness) * 0.1;
        this.happiness = Math.max(0, Math.min(100, this.happiness));
    }
    
    updateMood() {
        if (this.happiness > 80) {
            this.mood = 'ecstatic';
        } else if (this.happiness > 60) {
            this.mood = 'happy';
        } else if (this.happiness > 40) {
            this.mood = 'neutral';
        } else if (this.happiness > 20) {
            this.mood = 'sad';
        } else {
            this.mood = 'miserable';
        }
    }
    
    moveRandomly(deltaTime) {
        if (!this.moveTarget || this.getDistance(this.moveTarget) < 0.5) {
            // Set new random target within bounds
            this.moveTarget = {
                x: (Math.random() - 0.5) * 30,
                z: (Math.random() - 0.5) * 30
            };
        }
        
        // Move towards target
        if (this.moveTarget && this.mesh) {
            const direction = {
                x: this.moveTarget.x - this.position.x,
                z: this.moveTarget.z - this.position.z
            };
            const distance = Math.sqrt(direction.x * direction.x + direction.z * direction.z);
            
            if (distance > 0.1) {
                direction.x /= distance;
                direction.z /= distance;
                
                this.position.x += direction.x * this.speed * deltaTime * 60;
                this.position.z += direction.z * this.speed * deltaTime * 60;
                
                this.mesh.position.x = this.position.x;
                this.mesh.position.z = this.position.z;
            }
        }
    }
    
    getDistance(position) {
        const dx = this.position.x - position.x;
        const dz = this.position.z - position.z;
        return Math.sqrt(dx * dx + dz * dz);
    }
    
    getCurrentNeeds() {
        const needsList = [];
        
        if (this.needs.biome !== 'any') {
            needsList.push(`Needs ${this.needs.biome} biome`);
        }
        
        if (this.needs.structure !== 'any') {
            needsList.push(`Wants ${this.needs.structure}`);
        }
        
        if (this.needs.socializing) {
            needsList.push('Loves company');
        }
        
        if (this.needs.isolation) {
            needsList.push('Prefers solitude');
        }
        
        return needsList.length > 0 ? needsList.join(', ') : 'Content';
    }
}

// Initialize the game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new AlienZooArchitect();
});