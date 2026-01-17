const cursor = document.querySelector('.cursor');

let lastX = 0;
let lastY = 0;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';

  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;

  if (dx !== 0 || dy !== 0) {
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    cursor.style.transform =
      `translate(-50%, -50%) rotate(${angle}deg)`;
  }

  lastX = e.clientX;
  lastY = e.clientY;
});
