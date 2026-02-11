import { byId, $, $$, create } from "../shared/utils.js";

const qrCanvas = byId("qrCanvas");
const qrBox = byId("qrBox");
const downloadBtn = byId("downloadBtn");
let currentTab = "text";

/* Tabs */
function switchTab(tab) {
  currentTab = tab;
  $$(".tab").forEach(btn => btn.classList.remove("active"));
  $$(".tab-content").forEach(c => c.classList.remove("active"));

  $(`[onclick="switchTab('${tab}')"]`).classList.add("active");
  byId(tab).classList.add("active");
}

/* QR */
function generateQR() {
  let data = "";

  if (currentTab === "text") {
    data = byId("textInput").value.trim();
  }

  if (currentTab === "wifi") {
    const ssid = byId("ssid").value;
    const pass = byId("wifiPass").value;
    data = `WIFI:T:WPA;S:${ssid};P:${pass};;`;
  }

  if (currentTab === "contact") {
    const name = byId("name").value;
    const phone = byId("phone").value;
    const email = byId("email").value;
    data = `BEGIN:VCARD\nFN:${name}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  }

  if (!data) {
    alert("Please fill the fields");
    return;
  }

  QRCode.toCanvas(qrCanvas, data, { width: 180, margin: 2 });
  qrBox.style.display = "block";
  downloadBtn.style.display = "block";
}

/* Download */
function downloadQR() {
  const link = create("a");
  link.download = "qr-code.png";
  link.href = qrCanvas.toDataURL();
  link.click();
}

/* 🌿 Background Switch */
function setBackground(type) {
  if (type === "rain") {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501999635878-71cb5379c2d8')";
  }
  if (type === "mountain") {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')";
  }
  if (type === "nature") {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e')";
  }
}

/* 📸 Camera */
function openCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const video = byId("video");
      video.srcObject = stream;

      setTimeout(() => capturePhoto(video), 3000);
    });
}

function capturePhoto(video) {
  const canvas = byId("photo");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext("2d").drawImage(video, 0, 0);
}

// Expose functions to window for inline HTML event handlers
window.switchTab = switchTab;
window.generateQR = generateQR;
window.downloadQR = downloadQR;
window.setBackground = setBackground;
window.openCamera = openCamera;
