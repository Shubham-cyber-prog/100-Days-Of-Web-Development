export class ThemeManager {
    constructor() {
        this.THEME_KEY = 'theme';
        this.currentTheme = this.loadTheme();
        this.init();
    }

    loadTheme() {
        return localStorage.getItem(this.THEME_KEY) || 'dark';
    }

    saveTheme(theme) {
        localStorage.setItem(this.THEME_KEY, theme);
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
    }

    toggle() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
        this.saveTheme(newTheme);
    }

    setupToggle() {
        const toggleBtns = document.querySelectorAll('.theme-toggle');
        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => this.toggle());
        });
    }
}

const themeManager = new ThemeManager();
