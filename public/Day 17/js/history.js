const HISTORY_KEY = "unit_converter_history";
const historyList = document.getElementById("historyList");

function getHistory() {
    return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
}

function addToHistory(text) {
    let history = getHistory();
    history.unshift(text);
    history = history.slice(0, 5);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    getHistory().forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

renderHistory();
