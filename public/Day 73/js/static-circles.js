const staticCanvas = document.getElementById("staticCanvas");
const staticCtx = staticCanvas.getContext("2d");

function resizeStaticCanvas() {
  staticCanvas.width = staticCanvas.offsetWidth;
  staticCanvas.height = staticCanvas.offsetHeight;
}
resizeStaticCanvas();
window.addEventListener("resize", resizeStaticCanvas);

const staticCircles = Array.from({ length: 80 }, () => ({
  x: Math.random() * staticCanvas.width,
  y: Math.random() * staticCanvas.height,
  r: Math.random() * 6 + 3,
  color: `hsl(${Math.random() * 360},70%,60%)`
}));

staticCtx.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
staticCircles.forEach(c => {
  staticCtx.beginPath();
  staticCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
  staticCtx.fillStyle = c.color;
  staticCtx.fill();
});
