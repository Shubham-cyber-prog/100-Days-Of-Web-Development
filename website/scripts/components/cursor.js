(function initSkyblueTrail() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    function isTouchDevice() {
        return ('ontouchstart' in window) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    if (isTouchDevice()) return;

    const existing = document.getElementById('skyblue-cursor-container');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'skyblue-cursor-container';
    container.style.cssText = `
        position: fixed; top:0; left:0;
        width: 100%; height: 100%;
        pointer-events: none; z-index: 9999;
        opacity: 0; transition: opacity 0.5s ease;
    `;
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = `
        .cursor-dot {
            position: absolute; width: 10px; height: 10px;
            background: linear-gradient(135deg, #87CEFA, #00BFFF);
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 15px rgba(135,206,250,0.6);
            z-index: 10000;
            transition: transform 0.2s ease;
        }
        .cursor-ring {
            position: absolute; width: 40px; height: 40px;
            border: 2px solid rgba(135,206,250,0.3);
            border-radius: 50%;
            pointer-events: none; z-index: 9999;
            transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
        }
        .trail-segment {
            position: absolute; width: 20px; height: 20px;
            background: linear-gradient(135deg, #87CEFA, #00BFFF);
            border-radius: 50%; pointer-events: none;
            filter: blur(3px); opacity: 0.8; transform-origin: center;
            z-index: 9998;
        }
        .particle {
            position: absolute; width: 4px; height: 4px;
            background: linear-gradient(135deg, #87CEFA, #00BFFF);
            border-radius: 50%; pointer-events: none; opacity: 0;
            z-index: 9997;
        }
        .sparkle {
            position: absolute; width: 3px; height: 3px;
            background: #E0FFFF; border-radius: 50%;
            pointer-events: none; opacity: 0; filter: blur(1px); z-index: 9996;
        }
        .cursor-interactive .cursor-dot { transform: scale(1.5); background: linear-gradient(135deg,#ADD8E6,#00BFFF);}
        .cursor-interactive .cursor-ring { width:60px;height:60px; border-color: rgba(135,206,250,0.5);}
        .cursor-clicking .cursor-dot { transform: scale(0.8);}
        .cursor-clicking .cursor-ring { width:50px;height:50px;border-color: rgba(135,206,250,0.8); border-width: 3px;}
    `;
    document.head.appendChild(style);

    const SEGMENTS = 15, MAX_PARTICLES = 50, MAX_SPARKLES = 20;
    const segments = [], particles = [], sparkles = [];
    let mouse = {x:-100,y:-100,vx:0,vy:0,prevX:-100,prevY:-100,lastTime:0};
    let isActive = false, lastParticleTime=0, lastSparkleTime=0;

    const cursorDot = document.createElement('div'); cursorDot.className='cursor-dot';
    const cursorRing = document.createElement('div'); cursorRing.className='cursor-ring';
    container.appendChild(cursorDot); container.appendChild(cursorRing);

    for (let i=0;i<SEGMENTS;i++){
        const seg=document.createElement('div'); seg.className='trail-segment';
        seg.style.transform='translate(-50%, -50%)';
        container.appendChild(seg);
        segments.push({element:seg, x:-100, y:-100, size:20-(i*0.8), drag:0.1+(i*0.03)});
    }
    for (let i=0;i<MAX_PARTICLES;i++){
        const p=document.createElement('div'); p.className='particle'; p.style.transform='translate(-50%, -50%)';
        container.appendChild(p); particles.push({element:p,x:0,y:0,vx:0,vy:0,life:0,maxLife:0});
    }
    for (let i=0;i<MAX_SPARKLES;i++){
        const s=document.createElement('div'); s.className='sparkle'; s.style.transform='translate(-50%, -50%)';
        container.appendChild(s); sparkles.push({element:s,x:0,y:0,life:0,maxLife:0});
    }

    document.addEventListener('mousemove', e=>{
        const now = Date.now();
        mouse.prevX=mouse.x; mouse.prevY=mouse.y; mouse.x=e.clientX; mouse.y=e.clientY;
        if(mouse.lastTime){ const dt=now-mouse.lastTime; if(dt>0){mouse.vx=(mouse.x-mouse.prevX)/dt*16; mouse.vy=(mouse.y-mouse.prevY)/dt*16;} }
        mouse.lastTime=now;
        if(!isActive){isActive=true; container.style.opacity='1';}
    });

    const interactiveSelectors='a, button, input, textarea, select, .card, .project-card, [role="button"], .clickable, .interactive';
    document.body.addEventListener('mouseover', e=>{if(e.target.closest(interactiveSelectors)) container.classList.add('cursor-interactive');});
    document.body.addEventListener('mouseout', e=>{const r=e.relatedTarget; if(!r||!r.closest(interactiveSelectors)) container.classList.remove('cursor-interactive');});

    document.addEventListener('mousedown', ()=>{container.classList.add('cursor-clicking'); createRipple(mouse.x,mouse.y);});
    document.addEventListener('mouseup', ()=>{container.classList.remove('cursor-clicking');});

    function createRipple(x,y){
        const ripple=document.createElement('div');
        ripple.style.cssText=`position:absolute; left:${x}px; top:${y}px; width:20px; height:20px; border:2px solid rgba(135,206,250,0.8); border-radius:50%; transform:translate(-50%, -50%); pointer-events:none; z-index:9995; animation:ripple 0.6s forwards;`;
        const rippleStyle=document.createElement('style'); rippleStyle.textContent='@keyframes ripple{0%{transform:translate(-50%,-50%) scale(0.5);opacity:1;}100%{transform:translate(-50%,-50%) scale(4);opacity:0;}}';
        document.head.appendChild(rippleStyle); container.appendChild(ripple);
        setTimeout(()=>{ripple.remove(); rippleStyle.remove();},600);
    }

    function createParticle(x,y){
        const now=Date.now(); if(now-lastParticleTime<16) return; lastParticleTime=now;
        for(const p of particles){if(p.life<=0){p.x=x;p.y=y;p.vx=(Math.random()-0.5)*4;p.vy=(Math.random()-0.5)*4;p.life=p.maxLife=20+Math.random()*30;p.element.style.opacity='0.8'; break;}}
    }
    function createSparkle(x,y){
        const now=Date.now(); if(now-lastSparkleTime<50) return; lastSparkleTime=now;
        for(const s of sparkles){if(s.life<=0){s.x=x+(Math.random()-0.5)*20; s.y=y+(Math.random()-0.5)*20; s.life=s.maxLife=10+Math.random()*20; s.element.style.opacity='1'; break;}}
    }

    let lastFrame=0;
    function animate(time){
        const dt=time-lastFrame; lastFrame=time;
        if(!isActive){requestAnimationFrame(animate); return;}
        cursorDot.style.transform=`translate3d(${mouse.x}px,${mouse.y}px,0) translate(-50%,-50%)`;

        let ringX=parseFloat(cursorRing.dataset.x||mouse.x), ringY=parseFloat(cursorRing.dataset.y||mouse.y);
        const newX=ringX+(mouse.x-ringX)*0.15, newY=ringY+(mouse.y-ringY)*0.15;
        cursorRing.dataset.x=newX; cursorRing.dataset.y=newY;
        cursorRing.style.transform=`translate3d(${newX}px,${newY}px,0) translate(-50%,-50%)`;

        let prevX=mouse.x, prevY=mouse.y;
        segments.forEach((seg,i)=>{
            seg.x+=(prevX-seg.x)*seg.drag; seg.y+=(prevY-seg.y)*seg.drag;
            const dx=prevX-seg.x, dy=prevY-seg.y, angle=Math.atan2(dy,dx)*(180/Math.PI);
            const velocity=Math.sqrt(mouse.vx*mouse.vx+mouse.vy*mouse.vy);
            const stretch=Math.min(velocity*0.02,0.3), squeeze=1-stretch*0.5;
            seg.element.style.transform=`translate3d(${seg.x}px,${seg.y}px,0) translate(-50%,-50%) rotate(${angle}deg) scale(${1+stretch},${squeeze})`;
            seg.element.style.opacity=(0.8-(i/segments.length)*0.6).toString();
            prevX=seg.x; prevY=seg.y;
            if(i%3===0 && Math.random()>0.7) createParticle(seg.x,seg.y);
            if(velocity>2 && i%2===0 && Math.random()>0.8) createSparkle(seg.x,seg.y);
        });

        particles.forEach(p=>{if(p.life>0){p.life--;p.x+=p.vx;p.y+=p.vy;p.vx*=0.95;p.vy*=0.95;p.element.style.transform=`translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%)`; p.element.style.opacity=(p.life/p.maxLife*0.8).toString();}});
        sparkles.forEach(s=>{if(s.life>0){s.life--; s.element.style.transform=`translate3d(${s.x}px,${s.y}px,0) translate(-50%,-50%)`; s.element.style.opacity=(s.life/s.maxLife).toString();}});

        requestAnimationFrame(animate);
    }
    document.addEventListener('mouseleave',()=>{container.style.opacity='0'; isActive=false;});
    document.addEventListener('mouseenter',()=>{container.style.opacity='1'; isActive=true;});
    requestAnimationFrame(animate);
})();