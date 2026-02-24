const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);

camera.position.set(0, 40, 120);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

/* LIGHT */
const light = new THREE.PointLight(0xffffff, 2);
scene.add(light);

/* SUN */
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 64, 64),
  new THREE.MeshBasicMaterial({ color: 0xffaa00 })
);
scene.add(sun);

/* STAR FIELD */
function createStars() {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  for (let i = 0; i < 3000; i++) {
    vertices.push(
      THREE.MathUtils.randFloatSpread(600),
      THREE.MathUtils.randFloatSpread(600),
      THREE.MathUtils.randFloatSpread(600)
    );
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  const material = new THREE.PointsMaterial({ color: 0xffffff });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);
}
createStars();

/* PLANETS */
const planetData = [
  { name: "Mercury", size: 2, distance: 18, speed: 0.04, color: 0xaaaaaa, info: "Closest to the Sun." },
  { name: "Venus", size: 3, distance: 25, speed: 0.03, color: 0xffcc88, info: "Hottest planet." },
  { name: "Earth", size: 3.2, distance: 35, speed: 0.02, color: 0x3399ff, info: "Our home planet." },
  { name: "Mars", size: 2.5, distance: 45, speed: 0.018, color: 0xff5533, info: "The red planet." },
  { name: "Jupiter", size: 6, distance: 60, speed: 0.01, color: 0xffaa66, info: "Largest planet." },
  { name: "Saturn", size: 5.5, distance: 80, speed: 0.009, color: 0xffddaa, info: "Has beautiful rings." },
  { name: "Uranus", size: 4.5, distance: 100, speed: 0.007, color: 0x66ffff, info: "Ice giant." },
  { name: "Neptune", size: 4.5, distance: 120, speed: 0.005, color: 0x3366ff, info: "Farthest planet." }
];

const planets = [];

planetData.forEach(data => {

  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(data.size, 32, 32),
    new THREE.MeshStandardMaterial({ color: data.color })
  );

  scene.add(mesh);

  planets.push({
    ...data,
    mesh: mesh,
    angle: Math.random() * Math.PI * 2
  });

});

/* BUTTONS */
const btnContainer = document.getElementById("planetButtons");

planets.forEach(planet => {
  const btn = document.createElement("button");
  btn.innerText = planet.name;

  btn.onclick = () => openCard(planet);

  btnContainer.appendChild(btn);
});

/* CARD FUNCTIONS */
function openCard(planet) {
  document.getElementById("cardTitle").innerText = planet.name;
  document.getElementById("cardInfo").innerText = planet.info;
  document.getElementById("card").classList.add("show");
}

function closeCard() {
  document.getElementById("card").classList.remove("show");
}

/* ANIMATION */
function animate() {
  requestAnimationFrame(animate);

  planets.forEach(p => {
    p.angle += p.speed;
    p.mesh.position.x = p.distance * Math.cos(p.angle);
    p.mesh.position.z = p.distance * Math.sin(p.angle);
  });

  controls.update();
  renderer.render(scene, camera);
}

animate();

/* RESPONSIVE */
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});