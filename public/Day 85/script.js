// Auction Data
let auctions = [
    {
        id: 1,
        title: "Vintage Rolex Watch",
        description: "Beautiful vintage Rolex Submariner from 1965. Excellent condition with original box.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        currentBid: 12500,
        startingBid: 10000,
        bids: [
            { bidder: "John D.", amount: 12500, time: "2 hours ago" },
            { bidder: "Sarah M.", amount: 12000, time: "3 hours ago" },
            { bidder: "Mike R.", amount: 11500, time: "5 hours ago" }
        ],
        endTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        category: "jewelry",
        featured: true
    },
    {
        id: 2,
        title: "Modern Art Painting",
        description: "Abstract painting by contemporary artist. Signed and framed.",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        currentBid: 3500,
        startingBid: 2000,
        bids: [
            { bidder: "Art Lover", amount: 3500, time: "1 hour ago" },
            { bidder: "Collector", amount: 3200, time: "2 hours ago" }
        ],
        endTime: new Date(Date.now() + 12 * 60 * 60 * 1000),
        category: "art",
        featured: false
    },
    {
        id: 3,
        title: "Limited Edition Sneakers",
        description: "Brand new limited edition designer sneakers. Size 10. Never worn.",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
        currentBid: 850,
        startingBid: 500,
        bids: [
            { bidder: "Sneakerhead", amount: 850, time: "30 minutes ago" }
        ],
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        category: "fashion",
        featured: false
    },
    {
        id: 4,
        title: "Vintage Camera Collection",
        description: "Collection of 5 vintage cameras from the 1970s. All in working condition.",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        currentBid: 2200,
        startingBid: 1500,
        bids: [],
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        category: "art",
        featured: false
    },
    {
        id: 5,
        title: "Gaming Laptop",
        description: "High-end gaming laptop with RTX 4080. Like new condition with warranty.",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        currentBid: 1800,
        startingBid: 1500,
        bids: [
            { bidder: "Gamer123", amount: 1800, time: "2 hours ago" }
        ],
        endTime: new Date(Date.now() + 18 * 60 * 60 * 1000),
        category: "electronics",
        featured: false
    },
    {
        id: 6,
        title: "Antique Jewelry Box",
        description: "Hand-carved wooden jewelry box from 19th century. Excellent condition.",
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        currentBid: 450,
        startingBid: 300,
        bids: [],
        endTime: new Date(Date.now() + 36 * 60 * 60 * 1000),
        category: "art",
        featured: false
    }
];

let watchlist = [];
let currentUser = null;

// DOM Elements
const auctionsContainer = document.getElementById('auctions-container');
const featuredAuction = document.getElementById('featured-auction');
const auctionModal = document.getElementById('auction-modal');
const authModal = document.getElementById('auth-modal');
const watchlistCount = document.getElementById('watchlist-count');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const closeAuthBtn = document.getElementById('close-auth');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    renderAuctions();
    renderFeaturedAuction();
    setupEventListeners();
    updateWatchlistCount();
});

// Render all auction items
function renderAuctions() {
    auctionsContainer.innerHTML = '';
    
    let filteredAuctions = [...auctions];
    
    // Filter by category
    const category = categoryFilter.value;
    if (category !== 'all') {
        filteredAuctions = filteredAuctions.filter(auction => auction.category === category);
    }
    
    // Sort auctions
    const sortOption = sortBy.value;
    switch(sortOption) {
        case 'ending-soon':
            filteredAuctions.sort((a, b) => a.endTime - b.endTime);
            break;
        case 'newest':
            filteredAuctions.sort((a, b) => b.id - a.id);
            break;
        case 'highest-bid':
            filteredAuctions.sort((a, b) => b.currentBid - a.currentBid);
            break;
        case 'lowest-bid':
            filteredAuctions.sort((a, b) => a.currentBid - b.currentBid);
            break;
    }
    
    // Render each auction
    filteredAuctions.forEach(auction => {
        if (!auction.featured) {
            const auctionElement = createAuctionElement(auction);
            auctionsContainer.appendChild(auctionElement);
        }
    });
}

// Create auction item element
function createAuctionElement(auction) {
    const div = document.createElement('div');
    div.className = 'auction-item';
    div.dataset.id = auction.id;
    
    const timeLeft = getTimeRemaining(auction.endTime);
    
    div.innerHTML = `
        <img src="${auction.image}" alt="${auction.title}" class="auction-img">
        <div class="auction-info">
            <h3>${auction.title}</h3>
            <p class="auction-description">${auction.description.substring(0, 80)}...</p>
            <div class="auction-meta">
                <div>
                    <div class="current-bid">$${auction.currentBid.toLocaleString()}</div>
                    <small>Current Bid</small>
                </div>
                <div class="time-left">${timeLeft}</div>
            </div>
            <div class="auction-actions">
                <button class="btn-primary view-details" data-id="${auction.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <button class="btn-outline add-watchlist" data-id="${auction.id}">
                    <i class="fas fa-heart"></i> Watchlist
                </button>
            </div>
        </div>
    `;
    
    return div;
}

// Render featured auction
function renderFeaturedAuction() {
    const featured = auctions.find(auction => auction.featured);
    if (!featured) return;
    
    const timeLeft = getTimeRemaining(featured.endTime);
    
    featuredAuction.innerHTML = `
        <div class="featured-auction">
            <img src="${featured.image}" alt="${featured.title}" class="featured-img">
            <div class="featured-details">
                <h3>${featured.title}</h3>
                <p class="featured-description">${featured.description}</p>
                
                <div class="auction-meta">
                    <div>
                        <div class="current-bid">$${featured.currentBid.toLocaleString()}</div>
                        <small>Current Bid</small>
                    </div>
                    <div class="time-left">${timeLeft}</div>
                </div>
                
                <div class="bid-history">
                    <h4>Bid History</h4>
                    <div class="bid-list" id="featured-bid-list">
                        ${featured.bids.map(bid => `
                            <div class="bid-entry">
                                <span>${bid.bidder} bid $${bid.amount.toLocaleString()}</span>
                                <small>${bid.time}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div class="bid-section">
                <div class="bid-info">
                    <div class="current-bid">$${featured.currentBid.toLocaleString()}</div>
                    <small>Enter your bid (Minimum: $${featured.currentBid + 100})</small>
                </div>
                <div class="bid-input">
                    <input type="number" id="featured-bid-amount" min="${featured.currentBid + 100}" value="${featured.currentBid + 100}">
                    <button class="btn-bid" data-id="${featured.id}" id="place-featured-bid">
                        <i class="fas fa-gavel"></i> Place Bid
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Get time remaining until auction ends
function getTimeRemaining(endTime) {
    const now = new Date();
    const timeDiff = endTime - now;
    
    if (timeDiff <= 0) return "Auction Ended";
    
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
}

// Update countdown timers
function updateTimers() {
    document.querySelectorAll('.time-left').forEach(element => {
        const auctionId = parseInt(element.closest('.auction-item').dataset.id);
        const auction = auctions.find(a => a.id === auctionId);
        if (auction) {
            element.textContent = getTimeRemaining(auction.endTime);
        }
    });
    
    // Update featured auction timer
    const featuredTimer = document.querySelector('.featured-auction .time-left');
    if (featuredTimer) {
        const featuredAuction = auctions.find(a => a.featured);
        if (featuredAuction) {
            featuredTimer.textContent = getTimeRemaining(featuredAuction.endTime);
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Filter and sort listeners
    categoryFilter.addEventListener('change', renderAuctions);
    sortBy.addEventListener('change', renderAuctions);
    
    // Modal close buttons
    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            auctionModal.style.display = 'none';
            authModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === auctionModal) {
            auctionModal.style.display = 'none';
        }
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });
    
    // Auth buttons
    loginBtn.addEventListener('click', () => {
        showAuthModal('login');
    });
    
    registerBtn.addEventListener('click', () => {
        showAuthModal('register');
    });
    
    closeAuthBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });
    
    // Auth tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            showAuthModal(tab);
        });
    });
    
    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
    
    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });
    
    // Update timers every minute
    setInterval(updateTimers, 60000);
    
    // Delegate events for dynamically created elements
    document.addEventListener('click', (e) => {
        // View details button
        if (e.target.closest('.view-details')) {
            const auctionId = parseInt(e.target.closest('.view-details').dataset.id);
            showAuctionDetails(auctionId);
        }
        
        // Add to watchlist button
        if (e.target.closest('.add-watchlist')) {
            const auctionId = parseInt(e.target.closest('.add-watchlist').dataset.id);
            toggleWatchlist(auctionId);
        }
        
        // Place bid on featured auction
        if (e.target.closest('#place-featured-bid')) {
            const auctionId = parseInt(e.target.closest('#place-featured-bid').dataset.id);
            placeBid(auctionId, true);
        }
        
        // Place bid in modal
        if (e.target.closest('#place-bid-modal')) {
            const auctionId = parseInt(e.target.closest('#place-bid-modal').dataset.id);
            placeBid(auctionId, false);
        }
    });
}

// Show auction details in modal
function showAuctionDetails(auctionId) {
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) return;
    
    const timeLeft = getTimeRemaining(auction.endTime);
    
    document.getElementById('modal-body').innerHTML = `
        <div class="auction-details-modal">
            <img src="${auction.image}" alt="${auction.title}" style="width:100%; max-height:400px; object-fit:cover; border-radius:10px;">
            <h2 style="margin:1rem 0;">${auction.title}</h2>
            <p style="margin-bottom:1.5rem; color:#555;">${auction.description}</p>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
                <div>
                    <div style="font-size:2rem; color:#e74c3c; font-weight:bold;">$${auction.currentBid.toLocaleString()}</div>
                    <small>Current Bid</small>
                </div>
                <div style="background-color:#f1f2f6; padding:0.5rem 1rem; border-radius:20px; font-weight:600;">
                    ${timeLeft} remaining
                </div>
            </div>
            
            <div style="margin-bottom:2rem;">
                <h3>Bid History</h3>
                <div class="bid-list" style="max-height:200px; overflow-y:auto;">
                    ${auction.bids.length > 0 ? 
                        auction.bids.map(bid => `
                            <div class="bid-entry">
                                <span>${bid.bidder} bid $${bid.amount.toLocaleString()}</span>
                                <small>${bid.time}</small>
                            </div>
                        `).join('') :
                        '<p style="color:#7f8c8d; text-align:center;">No bids yet. Be the first to bid!</p>'
                    }
                </div>
            </div>
            
            <div style="display:flex; gap:1rem; align-items:center;">
                <input type="number" id="modal-bid-amount" min="${auction.currentBid + 100}" value="${auction.currentBid + 100}" style="flex:1; padding:0.8rem; border:2px solid #ddd; border-radius:5px;">
                <button class="btn-bid" data-id="${auction.id}" id="place-bid-modal">
                    <i class="fas fa-gavel"></i> Place Bid
                </button>
            </div>
        </div>
    `;
    
    auctionModal.style.display = 'flex';
}

// Toggle item in watchlist
function toggleWatchlist(auctionId) {
    const index = watchlist.indexOf(auctionId);
    if (index === -1) {
        watchlist.push(auctionId);
        showNotification('Added to watchlist!');
    } else {
        watchlist.splice(index, 1);
        showNotification('Removed from watchlist');
    }
    
    updateWatchlistCount();
    updateWatchlistButtons();
}

// Update watchlist count display
function updateWatchlistCount() {
    watchlistCount.textContent = watchlist.length;
}

// Update watchlist button states
function updateWatchlistButtons() {
    document.querySelectorAll('.add-watchlist').forEach(btn => {
        const auctionId = parseInt(btn.dataset.id);
        if (watchlist.includes(auctionId)) {
            btn.innerHTML = '<i class="fas fa-heart" style="color:#e74c3c;"></i> In Watchlist';
            btn.style.color = '#e74c3c';
        } else {
            btn.innerHTML = '<i class="fas fa-heart"></i> Watchlist';
            btn.style.color = '';
        }
    });
}

// Place a bid
function placeBid(auctionId, isFeatured = false) {
    if (!currentUser) {
        showNotification('Please login to place a bid', 'error');
        showAuthModal('login');
        return;
    }
    
    const auction = auctions.find(a => a.id === auctionId);
    if (!auction) return;
    
    const bidAmountInput = isFeatured ? 
        document.getElementById('featured-bid-amount') : 
        document.getElementById('modal-bid-amount');
    
    const bidAmount = parseInt(bidAmountInput.value);
    
    if (bidAmount <= auction.currentBid) {
        showNotification(`Bid must be higher than current bid of $${auction.currentBid}`, 'error');
        return;
    }
    
    // Add bid to auction
    auction.bids.unshift({
        bidder: currentUser.name || 'You',
        amount: bidAmount,
        time: 'Just now'
    });
    
    auction.currentBid = bidAmount;
    
    showNotification(`Bid placed successfully for $${bidAmount}!`);
    
    // Update displays
    renderAuctions();
    if (auction.featured) {
        renderFeaturedAuction();
    }
    
    // Close modal if not featured
    if (!isFeatured) {
        auctionModal.style.display = 'none';
    }
}

// Show authentication modal
function showAuthModal(tab) {
    authModal.style.display = 'flex';
    
    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tab);
    });
    
    // Show correct form
    document.getElementById('login-form').classList.toggle('hidden', tab !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', tab !== 'register');
}

// Handle login
function handleLogin() {
    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;
    
    // Simple validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login
    currentUser = {
        name: 'Demo User',
        email: email
    };
    
    showNotification('Login successful!');
    authModal.style.display = 'none';
    
    // Update UI for logged in user
    loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name.split(' ')[0];
    registerBtn.style.display = 'none';
}

// Handle registration
function handleRegister() {
    const name = document.querySelector('#registerForm input[type="text"]').value;
    const email = document.querySelector('#registerForm input[type="email"]').value;
    const password = document.querySelectorAll('#registerForm input[type="password"]')[0].value;
    const confirmPassword = document.querySelectorAll('#registerForm input[type="password"]')[1].value;
    
    // Validation
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate registration
    currentUser = {
        name: name,
        email: email
    };
    
    showNotification('Registration successful! Welcome to BidMaster!');
    authModal.style.display = 'none';
    
    // Update UI for logged in user
    loginBtn.innerHTML = '<i class="fas fa-user"></i> ' + currentUser.name.split(' ')[0];
    registerBtn.style.display = 'none';
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add some sample bids periodically (for demo purposes)
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every 30 seconds
        const availableAuctions = auctions.filter(a => a.endTime > new Date());
        if (availableAuctions.length > 0) {
            const auction = availableAuctions[Math.floor(Math.random() * availableAuctions.length)];
            const increase = Math.floor(Math.random() * 100) + 50;
            
            auction.bids.unshift({
                bidder: ['Bidder123', 'CollectorX', 'AuctionFan', 'DealHunter'][Math.floor(Math.random() * 4)],
                amount: auction.currentBid + increase,
                time: 'Recently'
            });
            
            auction.currentBid += increase;
            
            // Update displays if needed
            if (document.querySelector('.modal').style.display === 'flex') {
                const modalAuctionId = parseInt(document.querySelector('#modal-bid-amount')?.closest('.btn-bid')?.dataset.id);
                if (modalAuctionId === auction.id) {
                    showAuctionDetails(auction.id);
                }
            }
            
            renderAuctions();
            if (auction.featured) {
                renderFeaturedAuction();
            }
        }
    }
}, 30000);

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});