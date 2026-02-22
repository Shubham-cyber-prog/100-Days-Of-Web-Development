const categorySelect = document.getElementById("category");
const inputValue = document.getElementById("inputValue");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");
const result = document.getElementById("result");
const swapBtn = document.getElementById("swapBtn");
const themeToggle = document.getElementById("themeToggle");

function formatUnit(u) {
    return u.charAt(0).toUpperCase() + u.slice(1);
}

function updateUnits() {
    const units = Object.keys(UNIT_DATA[categorySelect.value].units);
    fromUnit.innerHTML = toUnit.innerHTML = "";
    units.forEach(u => {
        fromUnit.innerHTML += `<option value="${u}">${formatUnit(u)}</option>`;
        toUnit.innerHTML += `<option value="${u}">${formatUnit(u)}</option>`;
    });
    convert();
}

async function convert() {
    const value = parseFloat(inputValue.value);
    if (isNaN(value)) return result.textContent = "";

    const from = fromUnit.value;
    const to = toUnit.value;

    const output = await convertValue(value, categorySelect.value, from, to);
    result.textContent = `${value} ${formatUnit(from)} → ${output} ${formatUnit(to)}`;

    if (from !== to) addToHistory(result.textContent);
}

swapBtn.onclick = () => {
    [fromUnit.value, toUnit.value] = [toUnit.value, fromUnit.value];
    convert();
};

categorySelect.onchange = updateUnits;
inputValue.oninput = convert;
fromUnit.onchange = convert;
toUnit.onchange = convert;

document.getElementById("clearHistory").onclick = () => {
    localStorage.removeItem("unit_converter_history");
    renderHistory();
};

themeToggle.onclick = () => {
    document.body.classList.toggle("light");
    localStorage.setItem("theme",
        document.body.classList.contains("light") ? "light" : "dark");
};

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
}

updateUnits();
