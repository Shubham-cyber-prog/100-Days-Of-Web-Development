/**
 * RegEx-Viz Engine
 * Handles real-time regex compilation and text highlighting.
 */

// DOM Elements
const patternInput = document.getElementById('regex-pattern');
const flagsInput = document.getElementById('regex-flags');
const testString = document.getElementById('test-string');
const highlights = document.getElementById('highlights');
const matchCount = document.getElementById('match-count');
const errorMsg = document.getElementById('error-msg');
const flagCheckboxes = document.querySelectorAll('.flag-toggles input');
const tokenBtns = document.querySelectorAll('.token-btn');

// State
let syncScrollPending = false;

// --- Initialization ---
function init() {
    setupEventListeners();
    updateViz(); // Initial run
}

function setupEventListeners() {
    // 1. Input Listeners
    patternInput.addEventListener('input', updateViz);
    flagsInput.addEventListener('input', updateViz);
    testString.addEventListener('input', () => {
        updateViz();
        syncScroll();
    });

    // 2. Scroll Sync (Backdrop follows Textarea)
    testString.addEventListener('scroll', syncScroll);

    // 3. Checkbox Sync (Checkbox -> Text Input)
    flagCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            let currentFlags = flagsInput.value;
            const flagChar = cb.value;

            // Global flag is forced in UI for simplicity, but let's handle others
            if (cb.checked) {
                if (!currentFlags.includes(flagChar)) currentFlags += flagChar;
            } else {
                currentFlags = currentFlags.replace(flagChar, '');
            }
            flagsInput.value = currentFlags;
            updateViz();
        });
    });

    // 4. Cheat Sheet Buttons
    tokenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const token = btn.dataset.insert;
            insertAtCursor(patternInput, token);
            updateViz();
        });
    });
}

// --- Core Logic ---

function updateViz() {
    const text = testString.value;
    let pattern = patternInput.value;
    let flags = flagsInput.value;

    // Default to empty match if pattern is empty
    if (!pattern) {
        highlights.innerHTML = escapeHtml(text);
        matchCount.innerText = "0 matches found";
        errorMsg.classList.add('hidden');
        return;
    }

    try {
        // Enforce global flag for visualization purposes (to highlight all)
        if (!flags.includes('g')) flags += 'g';

        const regex = new RegExp(pattern, flags);
        errorMsg.classList.add('hidden');
        patternInput.style.borderColor = 'transparent';

        // Highlighting Logic
        // We replace matches with <mark> tags
        // Note: We must escape HTML first to prevent XSS, but regex runs on raw text
        
        let matchCountNum = 0;
        
        // Strategy: Use string replacement with a callback
        // We need to be careful with HTML escaping.
        // Simplest safe way: Tokenize the string into Matches and Non-Matches.
        
        let lastIndex = 0;
        let html = "";
        let match;

        // Reset lastIndex because we might be reusing a regex object (though we recreated it)
        regex.lastIndex = 0;

        // Loop through matches
        // We limit iterations to prevent browser crash on bad regex (like infinite loops)
        let safeLoop = 0;
        
        // We use execute loop for precise control
        while ((match = regex.exec(text)) !== null && safeLoop < 5000) {
            // Append non-matched text (escaped)
            html += escapeHtml(text.slice(lastIndex, match.index));
            
            // Append matched text (wrapped)
            const matchedText = match[0];
            if (matchedText === "") {
                // Handle zero-width assertions (advance index to avoid infinite loop)
                regex.lastIndex++; 
            } else {
                html += `<mark>${escapeHtml(matchedText)}</mark>`;
                matchCountNum++;
            }
            
            lastIndex = regex.lastIndex;
            safeLoop++;
        }

        // Append remaining text
        html += escapeHtml(text.slice(lastIndex));

        // Browser quirk: If text ends with newline, add a space so scroll works
        if (text.endsWith('\n')) html += ' ';

        highlights.innerHTML = html;
        matchCount.innerText = `${matchCountNum} matches found`;

    } catch (e) {
        // Invalid Regex
        errorMsg.innerText = "Invalid Regex";
        errorMsg.classList.remove('hidden');
        patternInput.style.borderColor = '#ff4757';
        highlights.innerHTML = escapeHtml(text); // Clear highlights
        matchCount.innerText = "-";
    }
}

// --- Helpers ---

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function syncScroll() {
    highlights.scrollTop = testString.scrollTop;
    highlights.scrollLeft = testString.scrollLeft;
}

function insertAtCursor(input, text) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const val = input.value;
    input.value = val.substring(0, start) + text + val.substring(end);
    input.selectionStart = input.selectionEnd = start + text.length;
    input.focus();
}

// Start
init();