const canvas = document.getElementById("solarCanvas");
const ctx = canvas.getContext("2d");

const infoBox = document.getElementById("planet-info");
const infoName = document.getElementById("planet-name");
const infoDetails = document.getElementById("planet-details");
const infoEmoji = document.getElementById("planet-emoji");
const infoDistance = document.getElementById("planet-distance");
const infoPeriod = document.getElementById("planet-period");
const infoDiameter = document.getElementById("planet-diameter");

const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const toggleOrbitsBtn = document.getElementById("toggle-orbits");
const toggleLabelsBtn = document.getElementById("toggle-labels");
const closeInfoBtn = document.getElementById("close-info");

let speedMultiplier = 1;
let showOrbits = true;
let showLabels = false;
let hoveredPlanet = null;
let pinnedPlanet = null;

// Stars background
const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: Math.random() * 1.5,
    opacity: Math.random() * 0.5 + 0.3,
    twinkleSpeed: Math.random() * 0.02 + 0.01
  });
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // Update star positions on resize
  stars.forEach(star => {
    star.x = Math.random() * window.innerWidth;
    star.y = Math.random() * window.innerHeight;
  });
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const center = () => ({
  x: canvas.width / 2,
  y: canvas.height / 2,
});

const planets = [
  {
    name: "Mercury",
    radius: 6,
    orbit: 80,
    speed: 0.04,
    color: "#8B7D7B",
    glowColor: "rgba(139, 125, 123, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "☿️",
    description: "The smallest and innermost planet in the Solar System.",
    distance: "57.9 million km",
    period: "88 days",
    diameter: "4,879 km"
  },
  {
    name: "Venus",
    radius: 8,
    orbit: 110,
    speed: 0.03,
    color: "#FFC649",
    glowColor: "rgba(255, 198, 73, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♀️",
    description: "The hottest planet with a thick toxic atmosphere.",
    distance: "108.2 million km",
    period: "225 days",
    diameter: "12,104 km"
  },
  {
    name: "Earth",
    radius: 9,
    orbit: 150,
    speed: 0.02,
    color: "#4A90E2",
    glowColor: "rgba(74, 144, 226, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "🌍",
    description: "Our home planet, the only known world with life.",
    distance: "149.6 million km",
    period: "365.25 days",
    diameter: "12,742 km"
  },
  {
    name: "Mars",
    radius: 7,
    orbit: 190,
    speed: 0.018,
    color: "#E27B58",
    glowColor: "rgba(226, 123, 88, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♂️",
    description: "The Red Planet, a cold desert world with polar ice caps.",
    distance: "227.9 million km",
    period: "687 days",
    diameter: "6,779 km"
  },
  {
    name: "Jupiter",
    radius: 16,
    orbit: 260,
    speed: 0.01,
    color: "#C88B3A",
    glowColor: "rgba(200, 139, 58, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♃",
    description: "The largest planet, a massive gas giant with a Great Red Spot.",
    distance: "778.5 million km",
    period: "11.9 years",
    diameter: "139,820 km"
  },
  {
    name: "Saturn",
    radius: 14,
    orbit: 320,
    speed: 0.008,
    color: "#FAD5A5",
    glowColor: "rgba(250, 213, 165, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♄",
    description: "Famous for its spectacular ring system made of ice and rock.",
    distance: "1.43 billion km",
    period: "29.5 years",
    diameter: "116,460 km",
    hasRings: true
  },
  {
    name: "Uranus",
    radius: 11,
    orbit: 370,
    speed: 0.006,
    color: "#4FD0E7",
    glowColor: "rgba(79, 208, 231, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♅",
    description: "An ice giant that rotates on its side.",
    distance: "2.87 billion km",
    period: "84 years",
    diameter: "50,724 km"
  },
  {
    name: "Neptune",
    radius: 11,
    orbit: 420,
    speed: 0.005,
    color: "#4169E1",
    glowColor: "rgba(65, 105, 225, 0.6)",
    angle: Math.random() * Math.PI * 2,
    emoji: "♆",
    description: "The windiest planet with supersonic winds.",
    distance: "4.5 billion km",
    period: "165 years",
    diameter: "49,244 km"
  },
];

// Event listeners
speedSlider.addEventListener("input", (e) => {
  speedMultiplier = parseFloat(e.target.value);
  speedValue.textContent = `${speedMultiplier.toFixed(1)}x`;
});

toggleOrbitsBtn.addEventListener("click", () => {
  showOrbits = !showOrbits;
  toggleOrbitsBtn.textContent = showOrbits ? "Hide Orbits" : "Show Orbits";
});

toggleLabelsBtn.addEventListener("click", () => {
  showLabels = !showLabels;
  toggleLabelsBtn.textContent = showLabels ? "Hide Labels" : "Show Labels";
});

closeInfoBtn.addEventListener("click", () => {
  pinnedPlanet = null;
  infoBox.classList.add("hidden");
});

function drawStars() {
  stars.forEach(star => {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Twinkle effect
    star.opacity += star.twinkleSpeed;
    if (star.opacity > 1 || star.opacity < 0.3) {
      star.twinkleSpeed *= -1;
    }
  });
}

function drawSun() {
  const { x, y } = center();
  
  // Outer glow
  const outerGlow = ctx.createRadialGradient(x, y, 20, x, y, 60);
  outerGlow.addColorStop(0, "rgba(255, 200, 0, 0.3)");
  outerGlow.addColorStop(1, "rgba(255, 100, 0, 0)");
  ctx.beginPath();
  ctx.fillStyle = outerGlow;
  ctx.arc(x, y, 60, 0, Math.PI * 2);
  ctx.fill();
  
  // Middle glow
  const middleGlow = ctx.createRadialGradient(x, y, 10, x, y, 40);
  middleGlow.addColorStop(0, "#FFF4E0");
  middleGlow.addColorStop(0.5, "#FFD700");
  middleGlow.addColorStop(1, "#FF8C00");
  ctx.beginPath();
  ctx.fillStyle = middleGlow;
  ctx.arc(x, y, 35, 0, Math.PI * 2);
  ctx.fill();
  
  // Core
  const coreGradient = ctx.createRadialGradient(x, y, 0, x, y, 25);
  coreGradient.addColorStop(0, "#FFFACD");
  coreGradient.addColorStop(1, "#FFD700");
  ctx.beginPath();
  ctx.fillStyle = coreGradient;
  ctx.arc(x, y, 25, 0, Math.PI * 2);
  ctx.fill();
}

function drawOrbits() {
  if (!showOrbits) return;
  
  const { x, y } = center();
  ctx.strokeStyle = "rgba(148, 163, 184, 0.15)";
  ctx.lineWidth = 1;
  planets.forEach(p => {
    ctx.beginPath();
    ctx.arc(x, y, p.orbit, 0, Math.PI * 2);
    ctx.stroke();
  });
}

function drawPlanets() {
  const { x, y } = center();
  planets.forEach(p => {
    const px = x + p.orbit * Math.cos(p.angle);
    const py = y + p.orbit * Math.sin(p.angle);

    p.screenX = px;
    p.screenY = py;

    // Glow effect
    if (hoveredPlanet === p) {
      const hoverGlow = ctx.createRadialGradient(px, py, p.radius, px, py, p.radius * 3);
      hoverGlow.addColorStop(0, p.glowColor);
      hoverGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.beginPath();
      ctx.fillStyle = hoverGlow;
      ctx.arc(px, py, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Subtle glow
    const glow = ctx.createRadialGradient(px, py, p.radius * 0.5, px, py, p.radius * 1.8);
    glow.addColorStop(0, p.color);
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.beginPath();
    ctx.fillStyle = glow;
    ctx.arc(px, py, p.radius * 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Planet body with gradient
    const planetGradient = ctx.createRadialGradient(
      px - p.radius * 0.3,
      py - p.radius * 0.3,
      p.radius * 0.1,
      px,
      py,
      p.radius
    );
    planetGradient.addColorStop(0, lightenColor(p.color, 30));
    planetGradient.addColorStop(1, p.color);
    
    ctx.beginPath();
    ctx.fillStyle = planetGradient;
    ctx.arc(px, py, p.radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Saturn's rings
    if (p.hasRings) {
      ctx.strokeStyle = "rgba(250, 213, 165, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(px, py, p.radius * 2, p.radius * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.strokeStyle = "rgba(250, 213, 165, 0.4)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(px, py, p.radius * 2.4, p.radius * 0.6, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    // Labels
    if (showLabels) {
      ctx.fillStyle = "#fff";
      ctx.font = "12px 'Segoe UI'";
      ctx.textAlign = "center";
      ctx.fillText(p.name, px, py + p.radius + 15);
    }

    p.angle += p.speed * speedMultiplier;
  });
}

function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1);
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  drawStars();
  drawSun();
  drawOrbits();
  drawPlanets();
  requestAnimationFrame(animate);
}
animate();

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

canvas.addEventListener("mousemove", (e) => {
  let found = false;
  hoveredPlanet = null;
  
  // Only show hover effect if no planet is pinned
  if (!pinnedPlanet) {
    planets.forEach(p => {
      if (distance(e.clientX, e.clientY, p.screenX, p.screenY) < p.radius + 10) {
        hoveredPlanet = p;
        canvas.style.cursor = "pointer";
        found = true;
      }
    });
    
    if (!found) {
      canvas.style.cursor = "default";
    }
  } else {
    // Check if hovering over a planet when one is pinned
    planets.forEach(p => {
      if (distance(e.clientX, e.clientY, p.screenX, p.screenY) < p.radius + 10) {
        hoveredPlanet = p;
        canvas.style.cursor = "pointer";
        found = true;
      }
    });
    
    if (!found) {
      canvas.style.cursor = "default";
    }
  }
});

canvas.addEventListener("click", (e) => {
  let clickedPlanet = null;
  
  planets.forEach(p => {
    if (distance(e.clientX, e.clientY, p.screenX, p.screenY) < p.radius + 10) {
      clickedPlanet = p;
    }
  });
  
  if (clickedPlanet) {
    // Pin the planet and show its info
    pinnedPlanet = clickedPlanet;
    infoName.textContent = clickedPlanet.name;
    infoEmoji.textContent = clickedPlanet.emoji;
    infoDetails.textContent = clickedPlanet.description;
    infoDistance.textContent = clickedPlanet.distance;
    infoPeriod.textContent = clickedPlanet.period;
    infoDiameter.textContent = clickedPlanet.diameter;
    infoBox.classList.remove("hidden");
  } else {
    // Clicked on empty space, close the info card
    pinnedPlanet = null;
    infoBox.classList.add("hidden");
  }
});

// Add CSS for notification animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
  }
`;
document.head.appendChild(style);
