/**
 * Huffman-Viz Engine
 * Implements Huffman Coding Algorithm and Binary Tree Rendering.
 */

const textInput = document.getElementById('text-input');
const binaryOutput = document.getElementById('binary-output');
const freqList = document.getElementById('freq-list');
const treeNodes = document.getElementById('tree-nodes');
const treeSvg = document.getElementById('tree-svg');

// Stats Elements
const statOrig = document.getElementById('stat-orig');
const statComp = document.getElementById('stat-comp');
const statRatio = document.getElementById('stat-ratio');

// --- Initialization ---
textInput.addEventListener('input', runAlgorithm);
window.addEventListener('resize', runAlgorithm);
runAlgorithm(); // Initial run

// --- Core Algorithm ---

function runAlgorithm() {
    const text = textInput.value;
    if (!text) {
        clearUI();
        return;
    }

    // 1. Frequency Map
    const freqs = {};
    for (let char of text) {
        freqs[char] = (freqs[char] || 0) + 1;
    }

    // 2. Build Tree (Priority Queue Logic)
    // Convert freqs to leaf nodes
    let queue = Object.keys(freqs).map(char => ({
        char: char,
        freq: freqs[char],
        left: null,
        right: null,
        id: Math.random().toString(36).substr(2, 9) // Unique ID for DOM
    }));

    // Simple Priority Queue implementation: Sort array
    while (queue.length > 1) {
        // Sort ascending by freq
        queue.sort((a, b) => a.freq - b.freq);

        // Take two smallest
        const left = queue.shift();
        const right = queue.shift();

        // Create parent
        const parent = {
            char: null, // Internal node
            freq: left.freq + right.freq,
            left: left,
            right: right,
            id: Math.random().toString(36).substr(2, 9)
        };

        queue.push(parent);
    }

    const root = queue[0];

    // 3. Generate Codes (Traversal)
    const codeMap = {};
    generateCodes(root, "", codeMap);

    // 4. Updates
    updateStats(text, codeMap);
    renderTable(freqs, codeMap);
    renderTree(root);
    renderBinary(text, codeMap);
}

function generateCodes(node, code, map) {
    if (!node) return;
    if (!node.left && !node.right) {
        map[node.char] = code;
        return;
    }
    generateCodes(node.left, code + "0", map);
    generateCodes(node.right, code + "1", map);
}

// --- UI Rendering ---

function updateStats(text, codeMap) {
    const originalBits = text.length * 8; // ASCII assumption
    let compressedBits = 0;
    for (let char of text) {
        compressedBits += codeMap[char].length;
    }

    statOrig.innerText = originalBits;
    statComp.innerText = compressedBits;
    
    const savings = originalBits > 0 ? ((1 - (compressedBits / originalBits)) * 100).toFixed(1) : 0;
    statRatio.innerText = `${savings}%`;
}

function renderTable(freqs, codeMap) {
    freqList.innerHTML = '';
    // Sort by frequency desc
    const sortedChars = Object.keys(freqs).sort((a, b) => freqs[b] - freqs[a]);

    sortedChars.forEach(char => {
        const item = document.createElement('div');
        item.className = 'freq-item';
        // Handle whitespace chars for display
        let displayChar = char;
        if (char === ' ') displayChar = '␣';
        
        item.innerHTML = `
            <div><span class="char-badge">${displayChar}</span></div>
            <div>${freqs[char]}</div>
            <div style="font-family:monospace; color:var(--accent)">${codeMap[char]}</div>
        `;
        freqList.appendChild(item);
    });
}

function renderBinary(text, codeMap) {
    let html = '';
    for (let char of text) {
        html += `<span class="bit-chunk" title="${char}">${codeMap[char]}</span>`;
    }
    binaryOutput.innerHTML = html;
}

function renderTree(root) {
    treeNodes.innerHTML = '';
    treeSvg.innerHTML = ''; // Clear lines

    if (!root) return;

    // Recursive layout calculation
    // Start at center of container width
    const startX = 600; // Center of our scrollable area
    const startY = 50;
    const horizontalGap = 30; // Base gap
    
    // We need to calculate width requirements for subtrees to prevent overlap
    // Simple approach: Fixed depth-based spacing
    
    const drawNode = (node, x, y, level) => {
        // Create HTML Node
        const el = document.createElement('div');
        el.className = `node ${node.char ? 'leaf' : 'internal'}`;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.innerText = node.char ? (node.char === ' ' ? '␣' : node.char) : node.freq;
        
        // Tooltip logic could go here
        
        treeNodes.appendChild(el);

        const spread = 200 / (level * 0.8); // Decrease spread as we go down

        if (node.left) {
            const childX = x - spread;
            const childY = y + 80;
            drawConnection(x, y, childX, childY, "0");
            drawNode(node.left, childX, childY, level + 1);
        }

        if (node.right) {
            const childX = x + spread;
            const childY = y + 80;
            drawConnection(x, y, childX, childY, "1");
            drawNode(node.right, childX, childY, level + 1);
        }
    };

    drawNode(root, startX, startY, 1);
}

function drawConnection(x1, y1, x2, y2, label) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1 + 20); // Bottom of node
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2 - 20); // Top of node
    line.setAttribute("stroke", "#30363d");
    line.setAttribute("stroke-width", "2");
    treeSvg.appendChild(line);

    // Label (0 or 1)
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    
    const text = document.createElement("div");
    text.className = "edge-label";
    text.style.left = `${midX}px`;
    text.style.top = `${midY}px`;
    text.innerText = label;
    treeNodes.appendChild(text);
}

function clearUI() {
    statOrig.innerText = '0';
    statComp.innerText = '0';
    statRatio.innerText = '0%';
    freqList.innerHTML = '';
    treeNodes.innerHTML = '';
    treeSvg.innerHTML = '';
    binaryOutput.innerHTML = '';
}