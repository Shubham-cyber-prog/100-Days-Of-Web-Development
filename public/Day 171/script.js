/**
 * Identicon-Gen Engine
 * Generates 5x5 symmetrical avatars from string hashes.
 */

const canvas = document.getElementById('identicon-canvas');
const ctx = canvas.getContext('2d');
const input = document.getElementById('username-input');
const btnRandom = document.getElementById('btn-random');
const btnDownload = document.getElementById('btn-download');
const hashDisplay = document.getElementById('hash-val');
const colorPreview = document.getElementById('color-preview');
const hexDisplay = document.getElementById('color-hex');

// --- Initialization ---
function init() {
    input.addEventListener('input', generateIdenticon);
    btnRandom.addEventListener('click', randomize);
    btnDownload.addEventListener('click', downloadImage);
    
    // Initial generation
    generateIdenticon();
}

function randomize() {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let res = "";
    for(let i=0; i<8; i++) res += chars[Math.floor(Math.random() * chars.length)];
    input.value = res;
    generateIdenticon();
}

// --- Core Logic ---

function generateIdenticon() {
    const text = input.value.trim() || "placeholder";
    
    // 1. Hash the string (Simple DJB2 variant)
    // We need a decent distribution to determine colors and grid
    const hash = simpleHash(text);
    
    // 2. Derive Color from Hash
    // Use the hash to pick a Hue (0-360)
    // Keep Saturation and Lightness high for nice aesthetics
    const hue = Math.abs(hash % 360);
    const color = `hsl(${hue}, 70%, 60%)`;
    const bgColor = "#f0f6fc"; // Light gray/white background

    // Update UI
    hashDisplay.innerText = `Hash: ${Math.abs(hash).toString(16)}`;
    colorPreview.style.backgroundColor = color;
    hexDisplay.innerText = hslToHex(hue, 70, 60);

    // 3. Generate Grid (5x5)
    // We only need to generate the left 3 columns (15 cells).
    // The right 2 columns are mirrors of the first 2.
    // We'll use the bits of the hash to decide on/off.
    
    const cells = [];
    
    // We need 15 bits. Let's re-hash or just iterate over the string differently 
    // to get enough entropy for the grid if the single hash isn't enough.
    // A robust way for this demo:
    // Use the hash and simple bit shifts.
    
    let tempHash = hash;
    
    for (let i = 0; i < 15; i++) {
        // Check last bit
        const isOn = (tempHash & 1) === 1;
        cells.push(isOn);
        
        // Shift hash (Rotate to keep it changing)
        tempHash = (tempHash >> 1) ^ (isOn ? 0xDEADBEEF : 0);
    }

    drawIdenticon(cells, color, bgColor);
}

function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

// --- Rendering ---

function drawIdenticon(cells, fgColor, bgColor) {
    // Clear
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gridSize = 5;
    const cellSize = canvas.width / (gridSize + 1); // +1 for padding margin
    const padding = cellSize / 2;

    ctx.fillStyle = fgColor;

    // Draw 5x5 Grid
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            // Determine index in our 15-bit array
            // If col < 3, use index. If col >= 3, mirror.
            // 0 1 2 | 3 4
            // 0 1 2 | 1 0  <-- Mirror index
            
            const mirrorCol = c < 3 ? c : 4 - c;
            const index = r * 3 + mirrorCol; // 0..14

            if (cells[index]) {
                ctx.fillRect(
                    padding + c * cellSize, 
                    padding + r * cellSize, 
                    cellSize + 1, // +1 overlaps slightly to prevent gaps
                    cellSize + 1
                );
            }
        }
    }
}

function downloadImage() {
    const link = document.createElement('a');
    link.download = `identicon_${input.value}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// --- Helper: HSL to Hex for display ---
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// Start
init();

