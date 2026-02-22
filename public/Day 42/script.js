// Initial Data
const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 135.20 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 330.00 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 240.80 },
    { symbol: 'AMZN', name: 'Amazon.com', price: 145.30 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 460.10 },
    { symbol: 'BTC', name: 'Bitcoin USD', price: 42050.00 },
    { symbol: 'ETH', name: 'Ethereum USD', price: 2250.00 }
];

const grid = document.getElementById('stock-grid');
const searchInput = document.getElementById('search-input');

// Render Function (Supports Filtering)
function renderGrid(filterText = '') {
    grid.innerHTML = '';
    
    stocks.forEach(stock => {
        // Filter Logic
        if (!stock.symbol.toLowerCase().includes(filterText.toLowerCase()) && 
            !stock.name.toLowerCase().includes(filterText.toLowerCase())) {
            return;
        }

        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${stock.symbol}`;
        
        const formattedPrice = stock.price.toFixed(2);

        card.innerHTML = `
            <div class="card-header">
                <span class="symbol">${stock.symbol}</span>
                <i class="fa-solid fa-chart-simple" style="color: #8b949e;"></i>
            </div>
            <div class="name">${stock.name}</div>
            <div class="price-container">
                <span class="price" id="price-${stock.symbol}">$${formattedPrice}</span>
                <span class="change" id="change-${stock.symbol}">0.00%</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search Event Listener
searchInput.addEventListener('input', (e) => {
    renderGrid(e.target.value);
});

// Update Simulation
function updateMarket() {
    stocks.forEach(stock => {
        // Volatility Logic
        const volatility = stock.price > 1000 ? 5.5 : 0.8;
        const changeAmount = (Math.random() - 0.5) * volatility;
        const oldPrice = stock.price;
        stock.price += changeAmount;
        
        // Prevent negative prices
        if(stock.price < 0) stock.price = 0.01;

        const percentChange = ((stock.price - oldPrice) / oldPrice) * 100;

        // Only update DOM if element exists (it might be hidden by search)
        const priceEl = document.getElementById(`price-${stock.symbol}`);
        const changeEl = document.getElementById(`change-${stock.symbol}`);
        const card = document.getElementById(`card-${stock.symbol}`);

        if (priceEl && changeEl && card) {
            priceEl.innerText = `$${stock.price.toFixed(2)}`;
            changeEl.innerText = `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`;

            // Color Logic
            if (changeAmount >= 0) {
                priceEl.className = 'price text-green';
                changeEl.className = 'change bg-green';
                card.classList.remove('border-red');
                card.classList.add('border-green');
                card.classList.remove('flash-down');
                card.classList.add('flash-up');
                setTimeout(() => card.classList.remove('flash-up'), 500);
            } else {
                priceEl.className = 'price text-red';
                changeEl.className = 'change bg-red';
                card.classList.remove('border-green');
                card.classList.add('border-red');
                card.classList.remove('flash-up');
                card.classList.add('flash-down');
                setTimeout(() => card.classList.remove('flash-down'), 500);
            }
        }
    });
}

// Start System
renderGrid();
setInterval(updateMarket, 1500);