export default class PortfolioManager {
    constructor() {
        this.balance = 10000.00;
        this.holdings = {}; // symbol: quantity
        this.updateDisplay();
    }

    buy(asset, qty) {
        const cost = asset.price * qty;
        if (this.balance >= cost) {
            this.balance -= cost;
            this.holdings[asset.symbol] = (this.holdings[asset.symbol] || 0) + qty;
            this.updateDisplay();
            return true;
        }
        return false;
    }

    sell(asset, qty) {
        const available = this.holdings[asset.symbol] || 0;
        if (available >= qty) {
            const gain = asset.price * qty;
            this.balance += gain;
            this.holdings[asset.symbol] -= qty;
            if (this.holdings[asset.symbol] === 0) delete this.holdings[asset.symbol];
            this.updateDisplay();
            return true;
        }
        return false;
    }

    updateDisplay() {
        document.getElementById('total-balance').textContent = `$${this.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    refreshQuotes(assets) {
        const list = document.getElementById('quotes-list');
        if (!list) return;

        list.innerHTML = assets.map(asset => {
            const history = asset.price; // simplified for quote list
            return `
                <div class="quote-item">
                    <span class="symbol">${asset.symbol}</span>
                    <span class="price">$${asset.price.toFixed(2)}</span>
                    <span class="qty">${this.holdings[asset.symbol] || 0} HELD</span>
                </div>
            `;
        }).join('');
    }
}
