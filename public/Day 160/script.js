/* Icebreaker Pilot - Day 160
   Top-down canvas ship navigation with ice tiles and hull damage.
*/

(function(){
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  let W = canvas.width = canvas.clientWidth = window.innerWidth - 300; // initial, will resize
  let H = canvas.height = canvas.clientHeight = window.innerHeight - 110;

  // Constants
  const TILE = 32; // ice tile size
  const MAP_TILES_X = Math.floor(W / TILE) + 6;
  const MAP_TILES_Y = Math.floor(H / TILE) + 6;

  // Game state
  const state = {
    ship: null,
    tiles: [],
    waypoints: [],
    autopilot: false,
    keys: {},
    lastTime: performance.now()
  };

  // HUD elements
  const hudSpeed = document.getElementById('hudSpeed');
  const hudHull = document.getElementById('hudHull');
  const hudWaypoints = document.getElementById('hudWaypoints');

  // Utility
  function randRange(a,b){ return a + Math.random()*(b-a); }
  function clamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

  // Tile types: 0 = water, 1 = thin ice, 2 = thick ice
  function createRandomMap() {
    state.tiles = [];
    for (let y=0;y<MAP_TILES_Y;y++){
      const row = [];
      for (let x=0;x<MAP_TILES_X;x++){
        // edges bias thicker ice
        const distToCenter = Math.hypot(x-MAP_TILES_X/2, y-MAP_TILES_Y/2)/Math.hypot(MAP_TILES_X/2, MAP_TILES_Y/2);
        const p = Math.random();
        let type = 0;
        if (p > 0.7 - 0.3*distToCenter) type = (Math.random()>0.7?2:1);
        row.push({t:type, hp: type===0?0: (type===1?20:50), vx: randRange(-0.1,0.1), vy: randRange(-0.1,0.1)});
      }
      state.tiles.push(row);
    }
  }

  // Ship
  function createShip(){
    const ship = {
      x: 0, z:0, // world coords in pixels
      angle: 0, speed:0, maxSpeed:4, accel:0.08, turnSpeed:0.04,
      width:24, length:42,
      hull:100,
      sinkThreshold: 0
    };
    // Start ship at center tile
    ship.x = (MAP_TILES_X/2)*TILE;
    ship.z = (MAP_TILES_Y/2+3)*TILE;
    state.ship = ship;
  }

  // Rendering
  function worldToScreen(wx,wz){
    // center camera on ship
    const cx = W/2; const cz = H/2;
    const ox = wx - state.ship.x + cx;
    const oz = wz - state.ship.z + cz;
    return {x:ox,y:oz};
  }

  function draw(){
    ctx.clearRect(0,0,W,H);

    // Draw tiles
    for (let y=0;y<MAP_TILES_Y;y++){
      for (let x=0;x<MAP_TILES_X;x++){
        const tile = state.tiles[y][x];
        const wx = x*TILE; const wz = y*TILE;
        const s = worldToScreen(wx,wz);
        if (tile.t===0){
          // water
          ctx.fillStyle = '#072a3a';
          ctx.fillRect(s.x, s.y, TILE, TILE);
        } else if (tile.t===1){
          ctx.fillStyle = `rgba(200,230,255,${0.35 + tile.hp/40})`;
          ctx.fillRect(s.x, s.y, TILE, TILE);
          ctx.strokeStyle = 'rgba(180,210,255,0.2)'; ctx.strokeRect(s.x,s.y,TILE,TILE);
        } else {
          ctx.fillStyle = `rgba(220,240,255,${0.5 + tile.hp/80})`;
          ctx.fillRect(s.x, s.y, TILE, TILE);
          ctx.strokeStyle = 'rgba(240,250,255,0.3)'; ctx.strokeRect(s.x,s.y,TILE,TILE);
        }
      }
    }

    // Draw waypoints
    ctx.fillStyle = 'rgba(255,200,0,0.9)';
    state.waypoints.forEach((wp,i)=>{
      const s = worldToScreen(wp.x, wp.z);
      ctx.beginPath(); ctx.arc(s.x, s.y, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.font='12px monospace'; ctx.fillText((i+1), s.x-4, s.y+4);
      ctx.fillStyle = 'rgba(255,200,0,0.9)';
    });

    // Draw ship
    const ship = state.ship;
    const shipScreen = worldToScreen(ship.x, ship.z);
    ctx.save();
    ctx.translate(shipScreen.x, shipScreen.y);
    ctx.rotate(ship.angle);

    // shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath(); ctx.ellipse(0, 10, ship.length*0.5, ship.width*0.5, 0, 0, Math.PI*2); ctx.fill();

    // hull
    ctx.fillStyle = '#d3d3d3';
    ctx.beginPath(); ctx.moveTo(-ship.width/2, ship.length/2); ctx.lineTo(0,-ship.length/2); ctx.lineTo(ship.width/2, ship.length/2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#444'; ctx.beginPath(); ctx.rect(-8,8,16,8); ctx.fill();

    ctx.restore();

    // HUD overlay text
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(8,H-64,200,56);
    ctx.fillStyle = '#cfefff'; ctx.font='14px monospace'; ctx.fillText(`Hull: ${Math.round(ship.hull)}%`, 16, H-40);
    ctx.fillText(`Speed: ${ship.speed.toFixed(2)}`, 16, H-22);
  }

  // Update world
  function update(dt){
    const ship = state.ship;

    // Controls
    if (state.keys['ArrowUp'] || state.keys['w']) ship.speed += ship.accel * dt*60;
    if (state.keys['ArrowDown'] || state.keys['s']) ship.speed -= ship.accel * dt*60;
    if (state.keys['ArrowLeft'] || state.keys['a']) ship.angle -= ship.turnSpeed * (1 + ship.speed/6) * dt*60;
    if (state.keys['ArrowRight'] || state.keys['d']) ship.angle += ship.turnSpeed * (1 + ship.speed/6) * dt*60;

    ship.speed = clamp(ship.speed, -1.5, ship.maxSpeed);

    // Autopilot: steer toward current waypoint
    if (state.autopilot && state.waypoints.length>0){
      const wp = state.waypoints[0];
      const dx = wp.x - ship.x; const dz = wp.z - ship.z;
      const desired = Math.atan2(dx, -dz); // world->canvas orientation
      let diff = (desired - ship.angle + Math.PI) % (Math.PI*2) - Math.PI;
      ship.angle += clamp(diff, -0.03, 0.03) * dt*60;
      ship.speed = clamp(ship.speed + 0.02*dt*60, 0, ship.maxSpeed);
    }

    // Move ship
    ship.x += Math.sin(ship.angle) * ship.speed * dt*60;
    ship.z += Math.cos(ship.angle) * ship.speed * dt*60;

    // Keep ship within world bounds
    ship.x = clamp(ship.x, TILE, (MAP_TILES_X-1)*TILE);
    ship.z = clamp(ship.z, TILE, (MAP_TILES_Y-1)*TILE);

    // Tile interactions: collision/ice breaking
    const tileX = Math.floor(ship.x / TILE);
    const tileY = Math.floor(ship.z / TILE);
    if (tileX>=0 && tileX<MAP_TILES_X && tileY>=0 && tileY<MAP_TILES_Y){
      const tile = state.tiles[tileY][tileX];
      if (tile.t>0){
        // break ice when moving over it
        const impact = Math.abs(ship.speed) * 2 + 1;
        tile.hp -= impact * dt*60;
        // hull damage if very fast and thick ice
        if (tile.hp > 0 && Math.abs(ship.speed) > 2.0) {
          ship.hull -= (Math.abs(ship.speed)-2) * 0.15 * dt*60;
        }
        if (tile.hp <= 0){ tile.t = 0; tile.hp = 0; }
      }
    }

    // Move tiles slightly to simulate drifting ice
    for (let y=0;y<MAP_TILES_Y;y++){
      for (let x=0;x<MAP_TILES_X;x++){
        const t = state.tiles[y][x];
        // slight drift
        // tiles don't move positions but we can approximate drift by reducing hp slightly or wobble effect later
        if (t.t>0){ t.hp = clamp(t.hp + Math.sin(performance.now()*0.001 + x*y)*0.01*dt, 0, 9999); }
      }
    }

    // Waypoint reached?
    if (state.waypoints.length>0){
      const wp = state.waypoints[0];
      const dx = wp.x - ship.x; const dz = wp.z - ship.z;
      const dist = Math.hypot(dx,dz);
      if (dist < 18){ state.waypoints.shift(); }
    }

    // Check hull for loss
    if (ship.hull <= 0){ ship.hull = 0; showTemporary('Hull breached! Game over.', 3000); reset(3000); }

    // UI update
    hudSpeed.textContent = ship.speed.toFixed(2);
    hudHull.textContent = `${Math.max(0,Math.round(ship.hull))}%`;
    hudWaypoints.textContent = state.waypoints.length;
  }

  // Input handlers
  window.addEventListener('keydown', (e)=>{
    state.keys[e.key] = true;
    if (e.key === ' ') { state.autopilot = !state.autopilot; showTemporary(`Autopilot ${state.autopilot?'ON':'OFF'}`, 900); }
    if (e.key === 'r' || e.key === 'R') { reset(); }
  });
  window.addEventListener('keyup', (e)=>{ state.keys[e.key] = false; });

  canvas.addEventListener('click', (e)=>{
    const rect = canvas.getBoundingClientRect();
    const sx = e.clientX - rect.left; const sy = e.clientY - rect.top;
    // convert to world coords
    const wx = state.ship.x - W/2 + sx;
    const wz = state.ship.z - H/2 + sy;
    state.waypoints.push({x:wx, z:wz});
  });

  document.getElementById('resetBtn').addEventListener('click', ()=>reset());
  document.getElementById('randomBtn').addEventListener('click', ()=>createRandomMap());

  // Messages
  let msgTimeout = null;
  function showTemporary(txt, duration=1500){
    let el = document.querySelector('.overlayMsg');
    if (!el){ el = document.createElement('div'); el.className='overlayMsg'; document.body.appendChild(el); }
    el.textContent = txt;
    if (msgTimeout) clearTimeout(msgTimeout);
    msgTimeout = setTimeout(()=>{ if (el && el.parentNode) el.parentNode.removeChild(el); msgTimeout = null; }, duration);
  }

  // Reset and start
  function reset(delay=0){
    if (delay>0){ setTimeout(()=>{ createRandomMap(); createShip(); }, delay); showTemporary('Resetting...', delay); return; }
    createRandomMap(); createShip(); state.waypoints = []; state.autopilot = false; showTemporary('Scene reset', 800);
  }

  // Resize handling
  function onResize(){
    W = canvas.width = window.innerWidth - 300; H = canvas.height = window.innerHeight - 110;
  }
  window.addEventListener('resize', onResize);

  // Main loop
  function loop(now){
    const dt = Math.min(0.05, (now - state.lastTime)/1000);
    state.lastTime = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  // Start
  reset();
  requestAnimationFrame(loop);
})();
