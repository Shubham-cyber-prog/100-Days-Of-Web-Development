import MarketEngine from './engine/MarketEngine.js';
import PortfolioManager from './engine/PortfolioManager.js';
import ChartManager from './ui/ChartManager.js';
import WindowManager from './ui/WindowManager.js';
import Notifications from './utils/Notifications.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('CYBER_MARKET_BOOT: Initializing financial systems...');

    // 1. Initialize core managers
    const chart = new ChartManager();
    const portfolio = new PortfolioManager();
    const ui = new WindowManager();
    const engine = new MarketEngine(chart, portfolio);

    // 2. Setup Event Listeners for Trading
    document.getElementById('btn-buy').addEventListener('click', () => {
        const symbol = document.getElementById('asset-selector').value;
        const qty = parseInt(document.getElementById('trade-qty').value);
        engine.executeTrade(symbol, qty, 'BUY');
    });

    document.getElementById('btn-sell').addEventListener('click', () => {
        const symbol = document.getElementById('asset-selector').value;
        const qty = parseInt(document.getElementById('trade-qty').value);
        engine.executeTrade(symbol, qty, 'SELL');
    });

    // 3. Start Market Loop
    engine.start();
    Notifications.show("SYSTEM_ONLINE // Market link established.");
});
