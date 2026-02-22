(function(){
  const $ = sel => document.querySelector(sel);
  const daysIn = $('#days');
  const hoursIn = $('#hours');
  const minsIn = $('#minutes');
  const secsIn = $('#seconds');
  const startBtn = $('#start');
  const pauseBtn = $('#pause');
  const resetBtn = $('#reset');
  const display = $('#display');
  const message = $('#message');

  let totalSeconds = 0;
  let remaining = 0;
  let timerId = null;
  let running = false;

  function toTwo(n){return String(n).padStart(2,'0')}
  function format(sec){
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400)/3600);
    const m = Math.floor((sec % 3600)/60);
    const s = sec % 60;
    return `${toTwo(d)}:${toTwo(h)}:${toTwo(m)}:${toTwo(s)}`;
  }

  function readInputs(){
    const d = Math.max(0, parseInt(daysIn.value || 0));
    const h = Math.max(0, Math.min(23, parseInt(hoursIn.value || 0)));
    const m = Math.max(0, Math.min(59, parseInt(minsIn.value || 0)));
    const s = Math.max(0, Math.min(59, parseInt(secsIn.value || 0)));
    return {d,h,m,s};
  }

  function inputsToSeconds(){
    const {d,h,m,s} = readInputs();
    return d*86400 + h*3600 + m*60 + s;
  }

  function updateDisplay(){
    display.textContent = format(remaining);
  }

  function tick(){
    if (remaining <= 0){
      stopTimer();
      message.textContent = 'Time is up!';
      playAlert();
      return;
    }
    remaining -= 1;
    updateDisplay();
  }

  function startTimer(){
    if (running) return;
    totalSeconds = inputsToSeconds();
    if (totalSeconds <= 0){
      message.textContent = 'Enter a time greater than zero.';
      return;
    }
    if (remaining <= 0) remaining = totalSeconds;
    timerId = setInterval(tick, 1000);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    message.textContent = '';
  }

  function pauseTimer(){
    if (!running) return;
    clearInterval(timerId);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    message.textContent = 'Paused';
  }

  function stopTimer(){
    clearInterval(timerId);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function resetTimer(){
    stopTimer();
    totalSeconds = inputsToSeconds();
    remaining = totalSeconds;
    updateDisplay();
    message.textContent = '';
  }

  function playAlert(){
    try{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.05;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      setTimeout(()=>{ o.stop(); ctx.close(); }, 800);
    }catch(e){
      // ignore audio errors
    }
  }

  // init
  remaining = inputsToSeconds();
  updateDisplay();

  startBtn.addEventListener('click', startTimer);
  pauseBtn.addEventListener('click', pauseTimer);
  resetBtn.addEventListener('click', resetTimer);

})();
