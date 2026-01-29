const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const statusText = document.getElementById("status");
const imageUpload = document.getElementById("imageUpload");

const grayscaleBtn = document.getElementById("grayscaleBtn");
const edgeBtn = document.getElementById("edgeBtn");
const cartoonBtn = document.getElementById("cartoonBtn");
const removeBgBtn = document.getElementById("removeBgBtn");
const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");

let originalImageData = null;
let bodyPixNet = null;

/* =========================
   INIT AI
========================= */
async function initAI() {
  await tf.ready();
  statusText.textContent = `AI Ready (TensorFlow.js v${tf.version.tfjs})`;

  bodyPixNet = await bodyPix.load({
    architecture: "MobileNetV1",
    outputStride: 16,
    multiplier: 0.75,
    quantBytes: 2
  });
}
initAI();

/* =========================
   IMAGE UPLOAD
========================= */
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    const max = 500;
    let w = img.width;
    let h = img.height;

    const scale = Math.min(max / w, max / h, 1);
    w = Math.floor(w * scale);
    h = Math.floor(h * scale);

    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);

    originalImageData = ctx.getImageData(0, 0, w, h);

    grayscaleBtn.disabled =
    edgeBtn.disabled =
    cartoonBtn.disabled =
    removeBgBtn.disabled =
    resetBtn.disabled =
    downloadBtn.disabled = false;
  };
});

/* =========================
   RESET
========================= */
resetBtn.onclick = () => {
  if (originalImageData) {
    ctx.putImageData(originalImageData, 0, 0);
  }
};

/* =========================
   AI GRAYSCALE (FIXED)
========================= */
grayscaleBtn.onclick = async () => {
  const t = tf.browser.fromPixels(canvas);        // int32 [0–255]
  const g = t.mean(2).expandDims(2).tile([1,1,3]);

  // 🔥 normalize to [0–1]
  const normalized = g.div(255);

  await tf.browser.toPixels(normalized, canvas);

  t.dispose();
  g.dispose();
  normalized.dispose();
};



/* =========================
   AI EDGE DETECTION (FIXED)
========================= */
edgeBtn.onclick = async () => {
  const t = tf.browser.fromPixels(canvas)
    .mean(2)
    .expandDims(2)
    .expandDims(0);

  const kernel = tf.tensor4d(
    [-2,-2,-2,
     -2,16,-2,
     -2,-2,-2],
    [3,3,1,1]
  );

  const edges = tf.conv2d(t, kernel, 1, "same")
    .abs()
    .clipByValue(0,255)
    .squeeze()
    .expandDims(2)
    .tile([1,1,3]);

  // 🔥 normalize
  const normalized = edges.div(255);

  await tf.browser.toPixels(normalized, canvas);

  t.dispose();
  kernel.dispose();
  edges.dispose();
  normalized.dispose();
};

/* =========================
   AI CARTOON (FIXED)
========================= */
cartoonBtn.onclick = async () => {
  const img = tf.browser.fromPixels(canvas).toFloat();

  const cartoon = img
    .div(32)
    .round()
    .mul(32)
    .clipByValue(0,255);

  // 🔥 normalize
  const normalized = cartoon.div(255);

  await tf.browser.toPixels(normalized, canvas);

  img.dispose();
  cartoon.dispose();
  normalized.dispose();
};



/* =========================
   REMOVE BACKGROUND
========================= */
removeBgBtn.onclick = async () => {
  const seg = await bodyPixNet.segmentPerson(canvas, {
    internalResolution: "high",
    segmentationThreshold: 0.5
  });

  const hasPerson = seg.data.some(v => v === 1);
  if (!hasPerson) {
    alert("No person detected in this image.");
    return;
  }

  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const d = imgData.data;

  for (let i = 0; i < d.length; i += 4) {
    if (seg.data[i / 4] === 0) d[i + 3] = 0;
  }

  ctx.putImageData(imgData, 0, 0);
};

/* =========================
   DOWNLOAD
========================= */
downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.download = "ai-edited-image.png";
  a.href = canvas.toDataURL("image/png");
  a.click();
};

