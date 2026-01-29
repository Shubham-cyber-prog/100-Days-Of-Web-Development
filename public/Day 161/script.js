/* Drone Swarm Commander - Day 161
   RTS-lite 3D control with mouse selection and keyboard commands.
*/

(function(){
  const canvas = document.getElementById('scene');
  const unitListEl = document.getElementById('unitList');
  const hudSelected = document.getElementById('hudSelected');
  const hudEnemies = document.getElementById('hudEnemies');
  const hudMode = document.getElementById('hudMode');

  // Basic Three.js scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x081a2b);
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 60, 80);
  camera.lookAt(0,0,0);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth - 320, window.innerHeight - 110);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = true; controls.enableRotate = true; controls.enableZoom = true; controls.target.set(0,0,0);

  // Lights
  const hemi = new THREE.HemisphereLight(0xffffee, 0x080820, 0.6);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8); dir.position.set(30,40,20); scene.add(dir);

  // Ground
  const groundGeo = new THREE.PlaneGeometry(400,400,20,20);
  const groundMat = new THREE.MeshLambertMaterial({color:0x12324a});
  const ground = new THREE.Mesh(groundGeo, groundMat); ground.rotation.x = -Math.PI/2; ground.receiveShadow = true; ground.userData.ground = true;
  scene.add(ground);

  // Grid helper
  const grid = new THREE.GridHelper(400,40,0x2a4a6a,0x122236); grid.position.y = 0.01; scene.add(grid);

  // Entities
  const drones = [];
  const enemies = [];

  // Selection
  let selectedUnits = [];
  let selectionBox = null; // DOM element
  let isDragging = false; let dragStart = null;

  // Raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // State
  let commandMode = 'move'; // 'move' or 'attack'
  function setMode(m){ commandMode = m; hudMode.textContent = m; }

  // Helpers
  function spawnDrone(x,y,z){
    const g = new THREE.ConeGeometry(1.2,2.6,6); const m = new THREE.MeshLambertMaterial({color:0x66d2ff});
    const mesh = new THREE.Mesh(g,m); mesh.position.set(x,y,z); mesh.rotation.x = Math.PI; mesh.castShadow = true;
    mesh.userData.type = 'drone'; mesh.userData.id = drones.length+1; mesh.userData.unit = {health:100, target:null, state:'idle', selected:false};
    scene.add(mesh); drones.push(mesh);
  }
  function spawnEnemy(x,y,z){
    const g = new THREE.BoxGeometry(3,3,3); const m = new THREE.MeshLambertMaterial({color:0xff6a6a});
    const mesh = new THREE.Mesh(g,m); mesh.position.set(x,y,z); mesh.castShadow = true; mesh.userData.type='enemy'; mesh.userData.id = enemies.length+1; mesh.userData.unit = {health:200};
    scene.add(mesh); enemies.push(mesh); updateHUD(); return mesh;
  }

  // Spawn initial drones
  for (let i=0;i<14;i++){ const x = (Math.random()-0.5)*40; const z = (Math.random()-0.5)*40; spawnDrone(x,1.5,z); }

  // Spawn a couple enemies
  spawnEnemy(40,1.5, -20); spawnEnemy(-35,1.5,30);

  // Selection UI
  function createSelectionBox(){ selectionBox = document.createElement('div'); selectionBox.className='selectionBox'; document.body.appendChild(selectionBox); }
  function removeSelectionBox(){ if (selectionBox && selectionBox.parentNode) selectionBox.parentNode.removeChild(selectionBox); selectionBox = null; }

  // Screen projection helper
  function worldToScreen(pos){ const p = pos.clone(); p.project(camera); const x = (p.x * 0.5 + 0.5) * (window.innerWidth - 320); const y = (-p.y * 0.5 + 0.5) * (window.innerHeight - 110); return {x,y}; }

  // Selection logic: box select by projecting drone positions to screen
  function boxSelect(rect){ selectedUnits = []; drones.forEach(d=>{
    const s = worldToScreen(d.position);
    if (s.x >= rect.left && s.x <= rect.right && s.y >= rect.top && s.y <= rect.bottom){ d.userData.unit.selected = true; selectedUnits.push(d); }
    else d.userData.unit.selected = false;
  }); updateSelectionUI(); }

  function singleSelect(object){ selectedUnits = []; if (object && object.userData && object.userData.type==='drone'){ object.userData.unit.selected = true; selectedUnits.push(object); } drones.forEach(d=>{ if (!selectedUnits.includes(d)) d.userData.unit.selected=false; }); updateSelectionUI(); }

  function updateSelectionUI(){ hudSelected.textContent = selectedUnits.length; unitListEl.innerHTML = selectedUnits.length===0?'<div class="unit-item">None</div>':selectedUnits.map(d=>`<div class="unit-item">Drone ${d.userData.id} - H:${Math.round(d.userData.unit.health)}</div>`).join(''); }

  // Commands
  function moveSelectedTo(point){ if (selectedUnits.length===0) return; // create formation offsets
    const center = {x: point.x, z: point.z}; const count = selectedUnits.length;
    // simple line formation
    const spacing = 3; const start = -(count-1)/2 * spacing;
    selectedUnits.forEach((d,i)=>{ const tx = center.x + start + i*spacing; const tz = center.z; d.userData.unit.target = new THREE.Vector3(tx,1.5,tz); d.userData.unit.state='moving'; }); }

  function circleFormation(point){ if (selectedUnits.length===0) return; const center = {x:point.x,z:point.z}; const r = Math.max(6, selectedUnits.length*1.2); selectedUnits.forEach((d,i)=>{ const a = (i/selectedUnits.length)*Math.PI*2; const tx = center.x + Math.cos(a)*r; const tz = center.z + Math.sin(a)*r; d.userData.unit.target = new THREE.Vector3(tx,1.5,tz); d.userData.unit.state='moving'; }); }

  function holdSelected(){ selectedUnits.forEach(d=>{ d.userData.unit.target = null; d.userData.unit.state='hold'; }); }

  function attackSelectedTarget(target){ if (selectedUnits.length===0 || !target) return; selectedUnits.forEach(d=>{ d.userData.unit.target = target.position.clone(); d.userData.unit.state='attacking'; d.userData.unit.attackTarget = target; }); }

  // Priority target (lowest health within range)
  function findPriorityTarget(){ if (enemies.length===0) return null; let best = null; let bestScore = Infinity; enemies.forEach(e=>{ if (!e.userData.unit) return; const score = e.userData.unit.health; if (score < bestScore){ bestScore = score; best = e; } }); return best; }

  // Mouse events
  let mouseDown = false;
  renderer.domElement.addEventListener('mousedown', (ev)=>{
    if (ev.button === 0){ // left
      mouseDown = true; dragStart = {x:ev.clientX, y:ev.clientY}; createSelectionBox(); }
  });
  window.addEventListener('mousemove', (ev)=>{ if (!mouseDown || !selectionBox) return; isDragging = true; const x = Math.min(dragStart.x, ev.clientX); const y = Math.min(dragStart.y, ev.clientY); const w = Math.abs(ev.clientX - dragStart.x); const h = Math.abs(ev.clientY - dragStart.y); selectionBox.style.left = x+'px'; selectionBox.style.top = y+'px'; selectionBox.style.width = w+'px'; selectionBox.style.height = h+'px'; });
  window.addEventListener('mouseup', (ev)=>{ if (ev.button === 0){ mouseDown = false; if (!isDragging){ // click select
      const rect = renderer.domElement.getBoundingClientRect(); mouse.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1; mouse.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1; raycaster.setFromCamera(mouse, camera); const hits = raycaster.intersectObjects(drones); if (hits.length>0) singleSelect(hits[0].object); else singleSelect(null);
    } else { // box select
      const rectEl = selectionBox.getBoundingClientRect(); const left = rectEl.left; const top = rectEl.top; const right = rectEl.left + rectEl.width; const bottom = rectEl.top + rectEl.height; boxSelect({left: left, top: top, right: right, bottom: bottom}); }
    isDragging=false; dragStart=null; removeSelectionBox(); }
  });

  // Right click for move/attack
  renderer.domElement.addEventListener('contextmenu', (ev)=>{ ev.preventDefault(); const rect = renderer.domElement.getBoundingClientRect(); const sx = ev.clientX - rect.left; const sy = ev.clientY - rect.top; // convert to world coords on ground
    mouse.x = ((sx) / rect.width) * 2 - 1; mouse.y = -((sy) / rect.height) * 2 + 1; raycaster.setFromCamera(mouse, camera); const hits = raycaster.intersectObject(ground); if (hits.length>0){ const point = hits[0].point; if (commandMode === 'move'){ // move
        moveSelectedTo(point); }
      else if (commandMode === 'attack'){ // if clicked on enemy, prioritize that
        const enemyHits = raycaster.intersectObjects(enemies);
        if (enemyHits.length>0){ attackSelectedTarget(enemyHits[0].object); } else { // find nearest enemy and attack
          const target = findPriorityTarget(); if (target) attackSelectedTarget(target); }
      }
    } });

  // UI buttons
  document.getElementById('formLine').addEventListener('click', ()=>{ // convert selection into line at average position
    if (selectedUnits.length===0) return; const avg = {x:0,z:0}; selectedUnits.forEach(d=>{ avg.x += d.position.x; avg.z += d.position.z; }); avg.x /= selectedUnits.length; avg.z /= selectedUnits.length; moveSelectedTo({x:avg.x,z:avg.z});
  });
  document.getElementById('formCircle').addEventListener('click', ()=>{ if (selectedUnits.length===0) return; const avg = {x:0,z:0}; selectedUnits.forEach(d=>{ avg.x += d.position.x; avg.z += d.position.z; }); avg.x /= selectedUnits.length; avg.z /= selectedUnits.length; circleFormation({x:avg.x,z:avg.z}); });
  document.getElementById('holdBtn').addEventListener('click', ()=>{ holdSelected(); });
  document.getElementById('attackBtn').addEventListener('click', ()=>{ setMode('attack'); const target = findPriorityTarget(); if (target) attackSelectedTarget(target); });
  document.getElementById('spawnEnemy').addEventListener('click', ()=>{ const x = (Math.random()-0.5)*200; const z = (Math.random()-0.5)*200; spawnEnemy(x,1.5,z); });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e)=>{
    if (e.key === 'm' || e.key === 'M') setMode('move');
    if (e.key === 'a' || e.key === 'A') { setMode('attack'); const t = findPriorityTarget(); if (t) attackSelectedTarget(t); }
    if (e.key === 'f' || e.key === 'F') { // toggle between formation presets
      circleFormation({x: stateCenterX(), z: stateCenterZ()}); }
  });

  function stateCenterX(){ if (selectedUnits.length===0) return 0; return selectedUnits.reduce((s,d)=>s+d.position.x,0)/selectedUnits.length; }
  function stateCenterZ(){ if (selectedUnits.length===0) return 0; return selectedUnits.reduce((s,d)=>s+d.position.z,0)/selectedUnits.length; }

  // Update loop: simple movement & attacks
  function update(dt){ // drones movement
    drones.forEach(d=>{
      const u = d.userData.unit;
      // highlight selection
      d.material.color.set(u.selected?0x00ffdd:0x66d2ff);
      if (u.state === 'moving' && u.target){ const dir = new THREE.Vector3().subVectors(u.target, d.position); const dist = dir.length(); if (dist > 0.3){ dir.normalize(); d.position.add(dir.multiplyScalar(10*dt)); } else { u.state='idle'; u.target=null; } }
      if (u.state === 'attacking' && u.attackTarget){ // move toward target
        const target = u.attackTarget; const dir = new THREE.Vector3().subVectors(target.position, d.position); const dist = dir.length(); if (dist > 3.0){ dir.normalize(); d.position.add(dir.multiplyScalar(12*dt)); } else { // deal damage
            if (target.userData.unit){ target.userData.unit.health -= 20 * dt; if (target.userData.unit.health <= 0){ // destroy
                scene.remove(target); const idx = enemies.indexOf(target); if (idx>-1) enemies.splice(idx,1); u.state='idle'; u.attackTarget=null; updateHUD(); }
            }
        }
      }
    });

    // enemies: simple wandering
    enemies.forEach(e=>{ e.position.x += (Math.random()-0.5)*4*dt; e.position.z += (Math.random()-0.5)*4*dt; });
    updateHUD();
  }

  function updateHUD(){ hudSelected.textContent = selectedUnits.length; hudEnemies.textContent = enemies.length; hudMode.textContent = commandMode; }

  // Animation
  let last = performance.now(); function animate(now){ const dt = Math.min(0.05,(now-last)/1000); last = now; update(dt); renderer.render(scene,camera); requestAnimationFrame(animate); }
  requestAnimationFrame(animate);

  // Resize
  window.addEventListener('resize', ()=>{ renderer.setSize(window.innerWidth - 320, window.innerHeight - 110); camera.aspect = (window.innerWidth - 320)/(window.innerHeight - 110); camera.updateProjectionMatrix(); });

  // Initial UI update
  updateSelectionUI(); updateHUD();
})();