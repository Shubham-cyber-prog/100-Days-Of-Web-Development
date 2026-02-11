const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Pune'];
const RESTAURANTS = [
    {
        id: 1,
        name: 'Neon Burger',
        rating: 4.8,
        time: '30 mins',
        price: '$$',
        type: 'Burger',
        city: 'Mumbai',
        img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500',
        menu: [
            {
                id: 101,
                name: 'Cyber Cheese Burger',
                price: 12,
                desc: 'Glowing cheese sauce',
                img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
            },
            {
                id: 102,
                name: 'Matrix Fries',
                price: 5,
                desc: 'Loaded spicy fries',
                img: 'https://images.unsplash.com/photo-1541592103048-4e2c0199d254?w=200',
            },
        ],
    },
    {
        id: 2,
        name: 'Pizza Verse',
        rating: 4.5,
        time: '45 mins',
        price: '$$$',
        type: 'Pizza',
        city: 'Mumbai',
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
        menu: [
            {
                id: 201,
                name: 'Galaxy Pepperoni',
                price: 18,
                desc: 'Double pepperoni',
                img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200',
            },
        ],
    },
    {
        id: 3,
        name: 'Sushi Sync',
        rating: 4.9,
        time: '25 mins',
        price: '$$$$',
        type: 'Asian',
        city: 'Bangalore',
        img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500',
        menu: [
            {
                id: 301,
                name: 'Quantum Roll',
                price: 22,
                desc: 'Salmon & Avocado',
                img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200',
            },
        ],
    },
];

const state = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    user: JSON.parse(localStorage.getItem('user')) || null,
    location: localStorage.getItem('location') || 'Mumbai',
};

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    const page = document.body.dataset.page;

    if (page === 'home' || page === 'restaurants') loadRestaurants();
    if (page === 'menu') loadMenu();
    if (page === 'cart') loadCartPage();
    if (page === 'login') initLogin();
});

function initNavbar() {
    const locSelect = document.getElementById('location-select');
    if (locSelect) {
        locSelect.innerHTML = LOCATIONS.map(
            (city) =>
                `<option value="${city}" ${
                    state.location === city ? 'selected' : ''
                }>${city}</option>`
        ).join('');
        locSelect.addEventListener('change', (e) => {
            state.location = e.target.value;
            localStorage.setItem('location', state.location);
            window.location.reload();
        });
    }

    updateCartCount();

    const userBtn = document.getElementById('user-btn');
    if (state.user) {
        userBtn.innerHTML = `Hi, ${state.user.name.split(' ')[0]}`;
        userBtn.href = '#';
        userBtn.onclick = logout;
    }
}

function loadRestaurants() {
    const container = document.getElementById('restaurant-list');
    if (!container) return;

    const filtered = RESTAURANTS.filter((r) => r.city === state.location);

    if (filtered.length === 0) {
        container.innerHTML = `<p class="text-muted">No restaurants found in ${state.location}</p>`;
        return;
    }

    container.innerHTML = filtered
        .map(
            (r) => `
        <div class="card">
            <div class="badge">${r.time}</div>
            <img src="${r.img}" class="card-img" alt="${r.name}">
            <div class="card-body">
                <div class="flex" style="justify-content:space-between">
                    <h3>${r.name}</h3>
                    <span style="background:green; padding:2px 5px; border-radius:4px; font-size:0.8rem">★ ${r.rating}</span>
                </div>
                <p class="text-muted">${r.type} • ${r.price}</p>
                <a href="menu.html?id=${r.id}" class="btn btn-glass" style="display:block; text-align:center; margin-top:10px">View Menu</a>
            </div>
        </div>
    `
        )
        .join('');
}

function loadMenu() {
    const params = new URLSearchParams(window.location.search);
    const restId = parseInt(params.get('id'));
    const restaurant = RESTAURANTS.find((r) => r.id === restId);

    if (!restaurant) {
        window.location.href = 'restaurants.html';
        return;
    }

    document.getElementById('rest-name').innerText = restaurant.name;
    document.getElementById(
        'rest-meta'
    ).innerText = `${restaurant.type} • ${restaurant.city}`;

    const container = document.getElementById('menu-list');
    container.innerHTML = restaurant.menu
        .map(
            (item) => `
        <div class="card">
            <img src="${item.img}" class="card-img" style="height:150px">
            <div class="card-body">
                <h4>${item.name}</h4>
                <p class="text-muted" style="font-size:0.9rem">${item.desc}</p>
                <div class="flex" style="justify-content:space-between; margin-top:10px">
                    <span class="text-gradient" style="font-weight:bold">$${item.price}</span>
                    <button class="btn btn-primary" onclick="addToCart(${item.id}, '${item.name}', ${item.price})">Add +</button>
                </div>
            </div>
        </div>
    `
        )
        .join('');
}

function addToCart(id, name, price) {
    const existing = state.cart.find((i) => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        state.cart.push({ id, name, price, qty: 1 });
    }
    saveCart();
    updateCartCount();

    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = 'Added!';
    setTimeout(() => (btn.innerText = originalText), 1000);
}

function removeFromCart(id) {
    state.cart = state.cart.filter((i) => i.id !== id);
    saveCart();
    loadCartPage();
    updateCartCount();
}

function changeQty(id, change) {
    const item = state.cart.find((i) => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) removeFromCart(id);
        else {
            saveCart();
            loadCartPage();
            updateCartCount();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(state.cart));
}

function updateCartCount() {
    const count = state.cart.reduce((acc, item) => acc + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

function loadCartPage() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (state.cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px"><h2>Cart is Empty</h2><a href="restaurants.html" class="btn btn-primary" style="margin-top:20px; display:inline-block">Browse Food</a></div>`;
        totalEl.innerText = '$0';
        return;
    }

    let total = 0;
    container.innerHTML = state.cart
        .map((item) => {
            total += item.price * item.qty;
            return `
            <div class="flex cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p class="text-muted">$${item.price} x ${item.qty}</p>
                </div>
                <div class="flex" style="gap:10px">
                    <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        })
        .join('');

    totalEl.innerText = `$${total}`;
}

function initLogin() {
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        state.user = { name: 'User', email: email };
        localStorage.setItem('user', JSON.stringify(state.user));
        window.location.href = 'index.html';
    });
}

function logout() {
    localStorage.removeItem('user');
    window.location.reload();
}
