const heroCanvas = document.getElementById("heroCanvas");
const heroCtx = heroCanvas.getContext("2d");

function resizeHeroCanvas() {
  heroCanvas.width = window.innerWidth;
  heroCanvas.height = window.innerHeight;
}
resizeHeroCanvas();
window.addEventListener("resize", resizeHeroCanvas);

const heroCircles = Array.from({ length: 120 }, () => ({
  x: Math.random() * heroCanvas.width,
  y: Math.random() * heroCanvas.height,
  r: Math.random() * 6 + 3,
  dx: (Math.random() - 0.5) * 0.4,
  dy: (Math.random() - 0.5) * 0.4,
  color: `hsl(${Math.random() * 360},70%,60%)`
}));

function animateHero() {
  heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);

  heroCircles.forEach(c => {
    c.x += c.dx;
    c.y += c.dy;

    if (c.x > heroCanvas.width) c.x = 0;
    if (c.x < 0) c.x = heroCanvas.width;
    if (c.y > heroCanvas.height) c.y = 0;
    if (c.y < 0) c.y = heroCanvas.height;

    heroCtx.beginPath();
    heroCtx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    heroCtx.fillStyle = c.color;
    heroCtx.fill();
  });

  requestAnimationFrame(animateHero);
}

animateHero();
