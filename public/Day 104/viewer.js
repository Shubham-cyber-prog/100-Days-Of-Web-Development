import * as THREE from "three";
import { OrbitControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js";
import { EXRLoader } from "https://unpkg.com/three@0.160.0/examples/jsm/loaders/EXRLoader.js";


const canvas = document.getElementById("three-canvas");
const container = document.querySelector(".viewer-container");
const loaderEl = document.getElementById("loader");

let currentModel = null;
let materials = [];

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  60,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// HDR ENVIRONMENT
new EXRLoader().load("./assets/studio.exr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
});


// Lights
scene.add(new THREE.AmbientLight(0xffffff, 0.3));
const dir = new THREE.DirectionalLight(0xffffff, 1);
dir.position.set(5, 5, 5);
scene.add(dir);

// GLTF Loader
const gltfLoader = new GLTFLoader();

function loadModel(url) {
  loaderEl.style.display = "grid";

  gltfLoader.load(url, (gltf) => {
    if (currentModel) scene.remove(currentModel);

    currentModel = gltf.scene;

    // Center & scale
    const box = new THREE.Box3().setFromObject(currentModel);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();

    currentModel.position.sub(center);
    currentModel.scale.setScalar(2 / size);

    // Collect materials
    materials = [];
    currentModel.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        materials.push(obj.material);
      }
    });

    scene.add(currentModel);
    loaderEl.style.display = "none";
  });
}

// Default model
loadModel("./models/sample.glb");

// Drag & Drop
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.name.endsWith(".glb")) {
    loadModel(URL.createObjectURL(file));
  }
});

// Screenshot
document.getElementById("screenshotBtn").onclick = () => {
  const link = document.createElement("a");
  link.download = "screenshot.png";
  link.href = renderer.domElement.toDataURL("image/png");
  link.click();
};

// Material Inspector
document.getElementById("colorPicker").oninput = (e) => {
  materials.forEach(m => m.color?.set(e.target.value));
};

document.getElementById("metalness").oninput = (e) => {
  materials.forEach(m => m.metalness = +e.target.value);
};

document.getElementById("roughness").oninput = (e) => {
  materials.forEach(m => m.roughness = +e.target.value);
};

document.getElementById("resetCameraBtn").onclick = () => {
  camera.position.set(0, 1, 3);
  controls.target.set(0, 0, 0);
  controls.update();
};

let autoRotate = false;
document.getElementById("autoRotateBtn").onclick = () => {
  autoRotate = !autoRotate;
  controls.autoRotate = autoRotate;
  controls.autoRotateSpeed = 1.2;
};


// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
