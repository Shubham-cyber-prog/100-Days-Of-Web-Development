export default class WindowManager {
    constructor() {
        this.tabs = document.querySelectorAll('.nav-item');
        this.setupListeners();
    }

    setupListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const target = tab.dataset.tab;
                document.getElementById('tab-title').textContent = target.toUpperCase() + '_WORKSPACE';

                // Logic to swap sections can be added here
            });
        });
    }
}
