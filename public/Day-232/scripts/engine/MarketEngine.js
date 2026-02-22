import { Assets } from '../data/assets.js';
import Notifications from '../utils/Notifications.js';

export default class MarketEngine {
    constructor(chart, portfolio) {
        this.assets = [...Assets];
        this.chart = chart;
        this.portfolio = portfolio;
        this.history = {};

        this.initializeHistory();
        this.populateAssetSelector();
    }

    initializeHistory() {
        this.assets.forEach(asset => {
            this.history[asset.symbol] = [asset.price];
        });
    }

    populateAssetSelector() {
        const selector = document.getElementById('asset-selector');
        this.assets.forEach(asset => {
            const opt = document.createElement('option');
            opt.value = asset.symbol;
            opt.textContent = `${asset.symbol} - ${asset.name}`;
            selector.appendChild(opt);
        });
    }

    start() {
        // Market update loop every 2 seconds
        setInterval(() => this.updatePrices(), 2000);
    }

    updatePrices() {
        this.assets.forEach(asset => {
            // Random Walk Model: NewPrice = OldPrice * (1 + (volatility * randomShift))
            const direction = Math.random() > 0.5 ? 1 : -1;
            const shift = (Math.random() * asset.volatility) * direction;
            asset.price = Math.max(0.1, asset.price * (1 + shift));

            this.history[asset.symbol].push(asset.price);
            if (this.history[asset.symbol].length > 30) {
                this.history[asset.symbol].shift();
            }
        });

        this.chart.update(this.history);
        this.portfolio.refreshQuotes(this.assets);
    }

    executeTrade(symbol, qty, type) {
        const asset = this.assets.find(a => a.symbol === symbol);
        if (!asset) return;

        if (type === 'BUY') {
            const success = this.portfolio.buy(asset, qty);
            if (success) {
                Notifications.show(`ORDER_FILLED: Purchased ${qty} shares of ${symbol}`);
            } else {
                Notifications.show(`ORDER_FAILED: Insufficient liquidity for ${symbol}`);
            }
        } else {
            const success = this.portfolio.sell(asset, qty);
            if (success) {
                Notifications.show(`ORDER_FILLED: Liquidated ${qty} shares of ${symbol}`);
            } else {
                Notifications.show(`ORDER_FAILED: No active position in ${symbol}`);
            }
        }
    }
}
