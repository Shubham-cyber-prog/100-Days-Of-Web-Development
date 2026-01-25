/* ===============================
   🌸 GLOBAL ELEMENTS
================================ */
const toolArea = document.getElementById("toolArea");
const result = document.getElementById("result");

/* ===============================
   ☰ SIDEBAR TOGGLE
================================ */
function toggleMenu() {
    document.getElementById("sideMenu").classList.toggle("show");
}

/* ===============================
   🌸 LOAD TOOL
================================ */
function loadTool(tool) {
    result.textContent = "";
    result.className = "";
    toggleMenu();

    if (tool === "palindrome") {
        toolArea.innerHTML = `
            <input id="palInput" placeholder="Enter text">
            <button onclick="checkPalindrome()">Check</button>
        `;
        title.textContent = "Palindrome Checker";
    }

    if (tool === "anagram") {
        toolArea.innerHTML = `
            <input id="a1" placeholder="First word">
            <input id="a2" placeholder="Second word">
            <button onclick="checkAnagram()">Check</button>
        `;
        title.textContent = "Anagram Checker";
    }

    if (tool === "reverse") {
        toolArea.innerHTML = `
            <input id="rev" placeholder="Enter text">
            <button onclick="reverseText()">Reverse</button>
        `;
        title.textContent = "Reverse Text";
    }

    if (tool === "counter") {
        toolArea.innerHTML = `
            <input id="count" placeholder="Enter text">
            <button onclick="countText()">Count</button>
        `;
        title.textContent = "Word Counter";
    }

    if (tool === "age") {
        toolArea.innerHTML = `
            <input type="date" id="dob">
            <button onclick="calculateAge()">Calculate Age</button>
        `;
        title.textContent = "Age Calculator";
    }

    if (tool === "bmi") {
        toolArea.innerHTML = `
            <input id="weight" placeholder="Weight (kg)">
            <input id="height" placeholder="Height (cm)">
            <button onclick="calculateBMI()">Calculate BMI</button>
        `;
        title.textContent = "BMI Calculator";
    }

    if (tool === "binary") {
        toolArea.innerHTML = `
            <input id="binary" placeholder="Binary number">
            <button onclick="convertBinary()">Convert</button>
        `;
        title.textContent = "Binary → Decimal";
    }
}

/* ===============================
   🌸 TOOL FUNCTIONS
================================ */

function checkPalindrome() {
    let t = palInput.value.replace(/[^a-z0-9]/gi, "").toLowerCase();
    let r = t.split("").reverse().join("");

    if (!t) return showError("Enter some text!");

    if (t === r) {
        result.textContent = "Palindrome 🎉💖";
        result.className = "success";
        launchConfetti();
    } else {
        showError("Not a palindrome ❌");
    }
}

function checkAnagram() {
    if (!a1.value || !a2.value) return showError("Enter both words!");

    let f = s =>
        s.replace(/[^a-z0-9]/gi, "").toLowerCase().split("").sort().join("");

    if (f(a1.value) === f(a2.value)) {
        result.textContent = "Anagram 💕";
        result.className = "success";
        launchConfetti();
    } else {
        showError("Not an anagram ❌");
    }
}

function reverseText() {
    if (!rev.value) return showError("Enter text!");
    result.textContent = rev.value.split("").reverse().join("");
    result.className = "success";
}

function countText() {
    let t = count.value.trim();
    if (!t) return showError("Enter text!");

    result.textContent = `Words: ${t.split(/\s+/).length} | Characters: ${t.length}`;
    result.className = "success";
}

function calculateAge() {
    if (!dob.value) return showError("Select date!");

    let birth = new Date(dob.value);
    let diff = Date.now() - birth.getTime();
    let age = new Date(diff).getUTCFullYear() - 1970;

    result.textContent = `Your Age: ${age} years 🎂`;
    result.className = "success";
}

function calculateBMI() {
    if (!weight.value || !height.value) return showError("Enter height & weight!");

    let h = height.value / 100;
    let bmi = (weight.value / (h * h)).toFixed(1);

    result.textContent = `BMI: ${bmi}`;
    result.className = "success";
}

function convertBinary() {
    if (!binary.value) return showError("Enter binary number!");
    result.textContent = `Decimal: ${parseInt(binary.value, 2)}`;
    result.className = "success";
}

/* ===============================
   ❌ ERROR DISPLAY
================================ */
function showError(msg) {
    result.textContent = msg;
    result.className = "error";
}

/* ===============================
   🎉 CONFETTI ANIMATION
================================ */
function launchConfetti() {
    const container = document.getElementById("confetti-container");
    const pastelColors = [
        "#ffafcc", "#bdb2ff", "#a2d2ff",
        "#caffbf", "#ffd6a5", "#ffc8dd"
    ];

    for (let i = 0; i < 120; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.backgroundColor =
            pastelColors[Math.floor(Math.random() * pastelColors.length)];
        c.style.setProperty("--x", `${(Math.random() - 0.5) * 200}px`);
        c.style.animationDuration = Math.random() * 2 + 2 + "s";

        container.appendChild(c);
        setTimeout(() => c.remove(), 4500);
    }
} 