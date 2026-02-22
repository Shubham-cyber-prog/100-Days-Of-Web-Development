class ARStudio {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        this.currentMode = 'ar'; // ar, 3d, orbit
        this.currentObjectType = 'cube';
        this.currentColor = '#FF3B30';
        this.currentScale = 0.5;
        this.currentRotationSpeed = 0.5;
        this.currentBrightness = 1.0;
        
        this.placedObjects = [];
        this.isARSession = false;
        this.arSession = null;
        this.hitTestSource = null;
        this.refSpace = null;
        
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.clock = new THREE.Clock();
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        
        this.init();
    }
    
    async init() {
        // Initialize Three.js scene
        this.initThreeJS();
        
        // Setup UI events
        this.setupUI();
        
        // Update device info
        this.updateDeviceInfo();
        
        // Check WebXR support
        await this.checkWebXRSupport();
        
        // Hide loading screen
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 1500);
        
        // Start animation loop
        this.animate();
    }
    
    initThreeJS() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        
        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 1.6, 3);
        
        // Create renderer
        const canvas = document.getElementById('mainCanvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        this.renderer.xr.enabled = true;
        
        // Create orbit controls for 3D mode
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.maxPolarAngle = Math.PI;
        this.controls.minPolarAngle = 0;
        this.controls.maxDistance = 100;
        this.controls.minDistance = 0.1;
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Handle mouse events
        canvas.addEventListener('click', (event) => this.onCanvasClick(event));
        canvas.addEventListener('mousemove', (event) => this.onMouseMove(event));
        
        // Add grid helper for 3D mode
        const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x888888);
        gridHelper.visible = false;
        this.scene.add(gridHelper);
        this.gridHelper = gridHelper;
    }
    
    setupUI() {
        // Mode selection
        document.querySelectorAll('.mode-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const mode = e.currentTarget.dataset.mode;
                this.setMode(mode);
            });
        });
        
        // Object selection
        document.querySelectorAll('.object-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.object-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentObjectType = e.currentTarget.dataset.type;
                this.showToast(`Selected: ${this.currentObjectType}`);
            });
        });
        
        // Color selection
        document.querySelectorAll('.color-item').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.color-item').forEach(i => i.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentColor = e.currentTarget.dataset.color;
                this.showToast(`Color: ${this.currentColor === 'gradient' ? 'Gradient' : this.currentColor}`);
            });
        });
        
        // Slider controls
        document.getElementById('scaleSlider').addEventListener('input', (e) => {
            this.currentScale = parseFloat(e.target.value);
            document.getElementById('scaleValue').textContent = `${this.currentScale}x`;
        });
        
        document.getElementById('rotationSlider').addEventListener('input', (e) => {
            this.currentRotationSpeed = parseFloat(e.target.value);
            document.getElementById('rotationValue').textContent = `${this.currentRotationSpeed}x`;
        });
        
        document.getElementById('brightnessSlider').addEventListener('input', (e) => {
            this.currentBrightness = parseFloat(e.target.value);
            document.getElementById('brightnessValue').textContent = `${this.currentBrightness}x`;
            this.scene.traverse((object) => {
                if (object.isLight) {
                    object.intensity = this.currentBrightness;
                }
            });
        });
        
        // Control buttons
        document.getElementById('placeObject').addEventListener('click', () => {
            if (this.currentMode === 'ar' && this.isARSession) {
                // In AR mode, we'll place at camera position
                this.placeObjectAtCamera();
            } else {
                // In 3D/Orbit mode, place at center
                this.placeObjectAtPosition(new THREE.Vector3(0, 0, -2));
            }
        });
        
        document.getElementById('resetScene').addEventListener('click', () => {
            this.resetScene();
        });
        
        document.getElementById('toggleMode').addEventListener('click', () => {
            this.toggleMode();
        });
    }
    
    async checkWebXRSupport() {
        const statusElement = document.getElementById('cameraStatus');
        const deviceInfo = document.getElementById('deviceInfo');
        const modeText = document.getElementById('modeText');
        const toggleBtn = document.getElementById('toggleMode');
        
        // Update device info
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        deviceInfo.textContent = isMobile ? 'Mobile Device' : 'Desktop';
        
        // Check for WebXR
        if ('xr' in navigator) {
            try {
                const supported = await navigator.xr.isSessionSupported('immersive-ar');
                
                if (supported) {
                    statusElement.textContent = 'AR: Supported';
                    statusElement.style.color = '#10b981';
                    this.updateStatus('AR mode available. Click "Start AR" to begin.');
                    
                    // Update toggle button
                    toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to AR';
                    toggleBtn.onclick = () => this.startARSession();
                    
                    // Update mode text
                    modeText.innerHTML = '<i class="fas fa-vr-cardboard"></i> AR Mode Available';
                    
                } else {
                    statusElement.textContent = 'AR: Not supported';
                    statusElement.style.color = '#ef4444';
                    this.updateStatus('AR not supported. Using 3D viewer mode.');
                    this.setMode('3d');
                }
            } catch (error) {
                console.warn('WebXR check failed:', error);
                statusElement.textContent = 'AR: Error checking';
                this.setMode('3d');
            }
        } else {
            statusElement.textContent = 'WebXR: Not available';
            statusElement.style.color = '#ef4444';
            this.updateStatus('WebXR not available. Using 3D viewer mode.');
            this.setMode('3d');
        }
        
        // Update renderer info
        const rendererInfo = document.getElementById('rendererInfo');
        const gl = this.renderer.getContext();
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            rendererInfo.textContent = `${vendor} - ${renderer}`;
        }
    }
    
    async startARSession() {
        try {
            this.updateStatus('Starting AR session...');
            
            // Request AR session
            this.arSession = await navigator.xr.requestSession('immersive-ar', {
                requiredFeatures: ['local', 'hit-test'],
                optionalFeatures: ['dom-overlay'],
                domOverlay: { root: document.body }
            });
            
            // Set up renderer for AR
            await this.renderer.xr.setSession(this.arSession);
            
            // Get reference space
            this.refSpace = await this.arSession.requestReferenceSpace('local');
            
            // Request hit test source
            const viewerSpace = await this.arSession.requestReferenceSpace('viewer');
            this.hitTestSource = await this.arSession.requestHitTestSource({ space: viewerSpace });
            
            // Update UI for AR mode
            this.isARSession = true;
            this.setMode('ar');
            
            // Add controller
            this.setupXRInput();
            
            // Handle session end
            this.arSession.addEventListener('end', () => {
                this.isARSession = false;
                this.arSession = null;
                this.setMode('3d');
                this.updateStatus('AR session ended');
            });
            
            this.updateStatus('AR session started! Tap surfaces to place objects.');
            
        } catch (error) {
            console.error('Failed to start AR session:', error);
            this.updateStatus('Failed to start AR. Switching to 3D mode.');
            this.setMode('3d');
            this.showToast('AR not available. Using 3D viewer instead.');
        }
    }
    
    setupXRInput() {
        if (!this.arSession) return;
        
        // Create controller
        const controller = this.renderer.xr.getController(0);
        this.scene.add(controller);
        
        // Handle select event
        controller.addEventListener('select', () => {
            if (this.hitTestSource) {
                // For AR mode, we'll use a fixed position in front of camera
                const position = new THREE.Vector3(0, 0, -1);
                position.applyQuaternion(this.camera.quaternion);
                position.add(this.camera.position);
                this.placeObjectAtPosition(position);
            }
        });
    }
    
    setMode(mode) {
        this.currentMode = mode;
        
        // Update UI
        document.querySelectorAll('.mode-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.dataset.mode === mode) opt.classList.add('active');
        });
        
        // Update mode text
        const modeText = document.getElementById('modeText');
        const toggleBtn = document.getElementById('toggleMode');
        
        switch(mode) {
            case 'ar':
                modeText.innerHTML = '<i class="fas fa-vr-cardboard"></i> AR Mode';
                modeText.className = 'mode-ar';
                toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to 3D Viewer';
                toggleBtn.onclick = () => this.setMode('3d');
                break;
            case '3d':
                modeText.innerHTML = '<i class="fas fa-cube"></i> 3D Viewer';
                modeText.className = 'mode-3d';
                toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to Orbit View';
                toggleBtn.onclick = () => this.setMode('orbit');
                break;
            case 'orbit':
                modeText.innerHTML = '<i class="fas fa-globe-americas"></i> Orbit View';
                modeText.className = 'mode-orbit';
                toggleBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Switch to AR';
                toggleBtn.onclick = () => this.startARSession();
                break;
        }
        
        // Show/hide instructions
        document.querySelectorAll('.instruction').forEach(inst => inst.style.display = 'none');
        document.getElementById(`instruction${mode.toUpperCase()}`).style.display = 'block';
        
        // Update scene based on mode
        this.updateSceneForMode();
        
        this.showToast(`Switched to ${mode.toUpperCase()} mode`);
    }
    
    updateSceneForMode() {
        // Show/hide grid helper
        if (this.gridHelper) {
            this.gridHelper.visible = this.currentMode === '3d' || this.currentMode === 'orbit';
        }
        
        // Configure controls
        if (this.controls) {
            this.controls.enabled = this.currentMode === '3d' || this.currentMode === 'orbit';
            this.controls.autoRotate = this.currentMode === 'orbit';
            this.controls.autoRotateSpeed = 1.0;
        }
        
        // Update camera position
        if (this.currentMode === '3d') {
            this.camera.position.set(0, 1.6, 3);
            this.camera.lookAt(0, 0, 0);
        } else if (this.currentMode === 'orbit') {
            this.camera.position.set(5, 5, 5);
            this.camera.lookAt(0, 0, 0);
        }
    }
    
    toggleMode() {
        if (this.currentMode === 'ar') {
            this.setMode('3d');
        } else if (this.currentMode === '3d') {
            this.setMode('orbit');
        } else {
            this.startARSession();
        }
    }
    
    create3DObject(type, color) {
        let geometry, material;
        
        // Create geometry based on type
        switch(type) {
            case 'cube':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                break;
            case 'sphere':
                geometry = new THREE.SphereGeometry(0.5, 32, 32);
                break;
            case 'cone':
                geometry = new THREE.ConeGeometry(0.5, 1, 32);
                break;
            case 'cylinder':
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
                break;
            case 'torus':
                geometry = new THREE.TorusGeometry(0.5, 0.2, 16, 100);
                break;
            case 'pyramid':
                geometry = new THREE.ConeGeometry(0.7, 1, 4);
                break;
            case 'teapot':
                // Using a simple sphere for teapot (would need proper model in real app)
                geometry = new THREE.SphereGeometry(0.5, 16, 16);
                break;
            case 'monkey':
                // Using an octahedron for monkey (would need proper model in real app)
                geometry = new THREE.OctahedronGeometry(0.5);
                break;
            default:
                geometry = new THREE.BoxGeometry(1, 1, 1);
        }
        
        // Create material
        if (color === 'gradient') {
            // Create gradient material
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const context = canvas.getContext('2d');
            
            const gradient = context.createLinearGradient(0, 0, 256, 256);
            gradient.addColorStop(0, '#FF3B30');
            gradient.addColorStop(0.5, '#FF9500');
            gradient.addColorStop(1, '#FFCC00');
            
            context.fillStyle = gradient;
            context.fillRect(0, 0, 256, 256);
            
            const texture = new THREE.CanvasTexture(canvas);
            material = new THREE.MeshStandardMaterial({ 
                map: texture,
                roughness: 0.3,
                metalness: 0.2
            });
        } else {
            material = new THREE.MeshStandardMaterial({ 
                color: color,
                roughness: 0.3,
                metalness: 0.2
            });
        }
        
        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Add wireframe
        const wireframe = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 2 })
        );
        mesh.add(wireframe);
        
        return mesh;
    }
    
    placeObjectAtCamera() {
        // Place object 1 meter in front of camera
        const position = new THREE.Vector3(0, 0, -1);
        position.applyQuaternion(this.camera.quaternion);
        position.add(this.camera.position);
        this.placeObjectAtPosition(position);
    }
    
    placeObjectAtPosition(position) {
        // Create object
        const object = this.create3DObject(this.currentObjectType, this.currentColor);
        
        // Set position and scale
        object.position.copy(position);
        object.scale.setScalar(this.currentScale);
        
        // Add to scene
        this.scene.add(object);
        
        // Store object data
        const objectData = {
            mesh: object,
            type: this.currentObjectType,
            color: this.currentColor,
            scale: this.currentScale,
            rotationSpeed: this.currentRotationSpeed,
            createdAt: Date.now()
        };
        
        this.placedObjects.push(objectData);
        
        // Update UI
        this.updateObjectCount();
        this.showToast(`${this.currentObjectType} placed!`);
        
        // Add click handler to remove object
        object.userData = { id: this.placedObjects.length - 1 };
    }
    
    onCanvasClick(event) {
        if (this.currentMode === 'ar' && this.isARSession) return;
        
        // Calculate mouse position in normalized device coordinates
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Calculate objects intersecting the picking ray
        const intersects = this.raycaster.intersectObjects(this.placedObjects.map(obj => obj.mesh));
        
        if (intersects.length > 0) {
            // Clicked on an object - remove it
            const object = intersects[0].object;
            const objectId = object.userData.id;
            
            this.removeObject(objectId);
        } else {
            // Clicked on empty space - place new object
            const distance = 5;
            const position = new THREE.Vector3(0, 0, -distance);
            position.applyQuaternion(this.camera.quaternion);
            position.add(this.camera.position);
            
            this.placeObjectAtPosition(position);
        }
    }
    
    onMouseMove(event) {
        // Update mouse position
        const rect = event.target.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }
    
    removeObject(objectId) {
        if (objectId >= 0 && objectId < this.placedObjects.length) {
            const objectData = this.placedObjects[objectId];
            this.scene.remove(objectData.mesh);
            this.placedObjects.splice(objectId, 1);
            
            // Update IDs for remaining objects
            this.placedObjects.forEach((obj, index) => {
                if (obj.mesh.userData) {
                    obj.mesh.userData.id = index;
                }
            });
            
            this.updateObjectCount();
            this.showToast('Object removed');
        }
    }
    
    resetScene() {
        // Remove all objects
        this.placedObjects.forEach(objectData => {
            this.scene.remove(objectData.mesh);
        });
        
        this.placedObjects = [];
        this.updateObjectCount();
        this.showToast('Scene cleared');
    }
    
    updateObjectCount() {
        document.getElementById('objectCount').textContent = this.placedObjects.length;
    }
    
    updateStatus(message) {
        const statusElement = document.getElementById('statusMessage');
        statusElement.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    }
    
    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    updateDeviceInfo() {
        const debugInfo = document.getElementById('debugInfo');
        const info = [
            `Browser: ${navigator.userAgent.split(' ').pop()}`,
            `Platform: ${navigator.platform}`,
            `Cores: ${navigator.hardwareConcurrency || 'Unknown'}`,
            `Memory: ${navigator.deviceMemory || 'Unknown'}GB`
        ];
        debugInfo.textContent = info.join(' | ');
    }
    
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    onWindowResize() {
        const canvas = document.getElementById('mainCanvas');
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    animate() {
        // Request next frame
        requestAnimationFrame(() => this.animate());
        
        // Calculate FPS
        this.frameCount++;
        const currentTime = performance.now();
        if (currentTime > this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;
            
            // Update FPS display
            document.getElementById('fpsCounter').textContent = this.fps;
        }
        
        // Update object animations
        const deltaTime = this.clock.getDelta();
        this.placedObjects.forEach(objectData => {
            if (objectData.mesh) {
                // Rotate object
                objectData.mesh.rotation.x += 0.01 * objectData.rotationSpeed;
                objectData.mesh.rotation.y += 0.01 * objectData.rotationSpeed;
                
                // Pulsating scale effect for orbit mode
                if (this.currentMode === 'orbit') {
                    const scale = 0.5 + 0.1 * Math.sin(Date.now() * 0.001);
                    objectData.mesh.scale.setScalar(scale * objectData.scale);
                }
            }
        });
        
        // Update controls
        if (this.controls && this.controls.enabled) {
            this.controls.update();
        }
        
        // Render scene
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize WebXR Polyfill if needed
    if (!('xr' in navigator)) {
        const polyfill = new WebXRPolyfill();
    }
    
    // Create and start the AR Studio
    window.arStudio = new ARStudio();
});

// Make sure WebXR polyfill is loaded
if (typeof WebXRPolyfill === 'function') {
    console.log('WebXR Polyfill loaded');
}