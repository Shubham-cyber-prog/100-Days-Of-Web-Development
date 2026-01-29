/**
 * Stegano-Vault Core Engine
 * Implements LSB (Least Significant Bit) Steganography.
 * * Concept:
 * We convert the secret text into binary (e.g., 'A' -> 01000001).
 * We take the image pixel data (RGBA).
 * We modify the last bit of the R, G, and B channels to match our text bits.
 * Since the change is only +/- 1 value (e.g., 255 vs 254), it's invisible to the human eye.
 */

// --- DOM Elements ---
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const imgPreview = document.getElementById('image-preview');
const resInfo = document.getElementById('res-info');
const capInfo = document.getElementById('capacity-info');
const canvas = document.getElementById('process-canvas');
const ctx = canvas.getContext('2d');
const logEl = document.getElementById('status-log');

// Controls
const secretInput = document.getElementById('secret-text');
const charUsed = document.getElementById('char-used');
const charMax = document.getElementById('char-max');
const btnEncode = document.getElementById('btn-encode');
const btnDecode = document.getElementById('btn-decode');
const outputBox = document.getElementById('decoded-output');

// State
let currentMode = 'encode'; // 'encode' or 'decode'
let imageLoaded = false;
let maxChars = 0;

// --- Initialization ---
function init() {
    setupModeSwitch();
    setupDragDrop();
    setupEncodingUI();
}

// --- Mode Switcher ---
function setupModeSwitch() {
    document.getElementById('mode-encode').addEventListener('click', () => setMode('encode'));
    document.getElementById('mode-decode').addEventListener('click', () => setMode('decode'));
}

function setMode(mode) {
    currentMode = mode;
    document.getElementById('mode-encode').classList.toggle('active', mode === 'encode');
    document.getElementById('mode-decode').classList.toggle('active', mode === 'decode');
    
    document.getElementById('controls-encode').classList.toggle('hidden', mode !== 'encode');
    document.getElementById('controls-decode').classList.toggle('hidden', mode !== 'decode');
    
    log(`Switched to ${mode.toUpperCase()} mode.`);
}

// --- Image Handling ---
function setupDragDrop() {
    dropZone.addEventListener('click', () => fileInput.click());
    
    fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--accent)';
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        dropZone.style.borderColor = 'var(--border)';
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--border)';
        handleFile(e.dataTransfer.files[0]);
    });
}

function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        log('Error: Please upload a valid image file.', true);
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Setup Canvas
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            // UI Updates
            imgPreview.src = e.target.result;
            dropZone.classList.add('hidden');
            previewContainer.classList.remove('hidden');
            imageLoaded = true;
            
            // Calculate Capacity (3 bits per pixel: R, G, B)
            // We need 8 bits per char + some overhead for null terminator
            const totalPixels = img.width * img.height;
            maxChars = Math.floor((totalPixels * 3) / 8) - 100; // Safety buffer
            
            resInfo.innerText = `${img.width} x ${img.height} px`;
            capInfo.innerText = `Capacity: ~${maxChars.toLocaleString()} chars`;
            charMax.innerText = maxChars;
            
            checkReadyState();
            log('Image loaded successfully.');
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// --- Encoding Logic ---
function setupEncodingUI() {
    secretInput.addEventListener('input', (e) => {
        const len = e.target.value.length;
        charUsed.innerText = len;
        if (len > maxChars) charUsed.style.color = 'var(--error)';
        else charUsed.style.color = 'inherit';
        checkReadyState();
    });

    btnEncode.addEventListener('click', encodeMessage);
    btnDecode.addEventListener('click', decodeMessage);
}

function checkReadyState() {
    if (currentMode === 'encode') {
        const hasText = secretInput.value.length > 0;
        const fits = secretInput.value.length <= maxChars;
        btnEncode.disabled = !(imageLoaded && hasText && fits);
    } else {
        btnDecode.disabled = !imageLoaded;
    }
}

function encodeMessage() {
    log('Encoding started...');
    const text = secretInput.value;
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    // Convert text to binary string
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        let bin = text.charCodeAt(i).toString(2);
        binary += "00000000".substr(bin.length) + bin; // Pad to 8 bits
    }
    // Add NULL terminator (00000000) to signal end of message
    binary += '00000000';

    if (binary.length > data.length * 0.75) {
        log('Error: Message too long for this image!', true);
        return;
    }

    // Embed bits into pixel data
    let dataIndex = 0;
    for (let i = 0; i < binary.length; i++) {
        // Skip Alpha channel (every 4th byte: R, G, B, [A], R, G...)
        if ((dataIndex + 1) % 4 === 0) dataIndex++;

        const bit = parseInt(binary[i]);
        const byte = data[dataIndex];
        
        // Clear LSB and set new bit
        // Example: 255 (11111111) & 254 (11111110) -> 11111110 | 1 -> 11111111
        // Example: 255 (11111111) & 254 (11111110) -> 11111110 | 0 -> 11111110
        data[dataIndex] = (byte & 0xFE) | bit;
        
        dataIndex++;
    }

    // Update Canvas
    ctx.putImageData(imgData, 0, 0);
    
    // Download
    const link = document.createElement('a');
    link.download = 'stegano_image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    log('Success! Encoded image downloaded.');
}

// --- Decoding Logic ---
function decodeMessage() {
    log('Decoding image...');
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let binary = '';
    let charCode = 0;
    let bitCount = 0;
    let result = '';

    for (let i = 0; i < data.length; i++) {
        // Skip Alpha
        if ((i + 1) % 4 === 0) continue;

        const byte = data[i];
        const bit = byte & 1; // Get LSB

        // Reconstruct byte
        charCode = (charCode << 1) | bit;
        bitCount++;

        if (bitCount === 8) {
            if (charCode === 0) break; // Null terminator found
            result += String.fromCharCode(charCode);
            
            // Limit just in case of random noise
            if (result.length > 50000) {
                result += '... [Truncated]';
                break;
            }

            charCode = 0;
            bitCount = 0;
        }
    }

    // Filter output to avoid garbage data (simple printable check)
    // Real steganography often includes a magic header to verify it's a valid message.
    // For this simple demo, we just show what we found.
    
    outputBox.innerText = result;
    if (result.length === 0) {
        log('No hidden message found (or file was compressed).', true);
        outputBox.innerText = "<No data found>";
    } else {
        log('Message extracted successfully.');
    }
}

function log(msg, isError = false) {
    const span = document.createElement('div');
    span.innerText = `> ${msg}`;
    span.className = 'log-item';
    if (isError) span.style.color = 'var(--error)';
    
    logEl.innerHTML = ''; // Clear old (or append if you prefer history)
    logEl.appendChild(span);
}

// Start
init();