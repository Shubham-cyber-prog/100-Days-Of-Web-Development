export default class HUDManager {
    static updateInventory(items) {
        const list = document.getElementById('item-list');
        if (!list) return;

        if (items.length === 0) {
            list.innerHTML = '<li class="empty">NO_ITEMS_FOUND</li>';
            return;
        }

        list.innerHTML = items.map(item => `<li class="inventory-item">${item}</li>`).join('');
    }

    static showAlert(message) {
        const terminalOutput = document.getElementById('terminal-output');
        const alertLine = document.createElement('div');
        alertLine.className = 'line system alert';
        alertLine.textContent = `[!] ALERT: ${message}`;
        terminalOutput.appendChild(alertLine);
    }
}
