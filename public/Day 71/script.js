

const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      
      if (entry.target.id === 'skills') {
        animateSkillBars();
      }
      
      
      if (document.querySelector('.mobile-nav-overlay.active')) {
        animateMobileNavLinks();
      }
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));


const toggle = document.getElementById('themeToggle');
const body = document.body;


const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.classList.add('light-mode');
  toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  const isLight = body.classList.contains('light-mode');
  toggle.textContent = isLight ? '☀️' : '🌙';
  
  
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
});


const scrollProgress = document.querySelector('.scroll-progress .scroll-bar');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = `${scrolled}%`;
});


const navLinks = document.querySelectorAll('.nav-link');
const navUnderline = document.querySelector('.nav-underline');
const navLinkContainer = document.querySelector('.nav-links-container');

navLinks.forEach(link => {
  link.addEventListener('mouseenter', function() {
    const linkRect = this.getBoundingClientRect();
    const containerRect = navLinkContainer.getBoundingClientRect();
    
    navUnderline.style.left = `${linkRect.left - navRect.left}px`;
    navUnderline.style.width = `${linkRect.width}px`;
    navUnderline.style.opacity = '1';
  });
  
  link.addEventListener('mouseleave', function() {
    if (!navLinkContainer.matches('.hover')) {
    navUnderline.style.opacity = '0';
  }
  });
});


let activeLink = null;

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  
  
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
      if (activeLink !== link) {
        activeLink = link;
        
        const linkRect = link.getBoundingClientRect();
        const contntainerRect = navLinkContainer.getBoundingClientRect();
        
        navUnderline.style.left = `${linkRect.left - navRect.left}px`;
        navUnderline.style.width = `${linkRect.width}px`;
        navUnderline.style.opacity = '1';
      }
    }
  });
}

navLinkContainer.addEventListener('mouseleave', () => {
    navUnderline.style.opacity = '0';
});

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('resize', updateActiveLink);


const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
const mobileNavClose = document.querySelector('.mobile-nav-close');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileNavOverlay.classList.add('active');
  setTimeout(() => {
    animateMobileNavLinks();
  }, 100);
});

mobileNavClose.addEventListener('click', () => {
  mobileNavOverlay.classList.remove('active');
  resetMobileNavLinks();
});

mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNavOverlay.classList.remove('active');
    resetMobileNavLinks();
  });
});

function animateMobileNavLinks() {
  const links = document.querySelectorAll('.mobile-nav-links li');
  links.forEach((link, index) => {
    link.style.opacity = '1';
    link.style.transform = 'translateY(0)';
    link.style.transition = `opacity 0.5s ${index * 0.1}s, transform 0.5s ${index * 0.1}s`;
  });
}

function resetMobileNavLinks() {
  const links = document.querySelectorAll('.mobile-nav-links li');
  links.forEach(link => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
  });
}


function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = `${progress}%`;
  });
}


const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;


window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});


function animateGlow() {
  
  glowX += (mouseX - glowX) * 0.1;
  glowY += (mouseY - glowY) * 0.1;
  
  glow.style.left = `${glowX}px`;
  glow.style.top = `${glowY}px`;
  
  requestAnimationFrame(animateGlow);
}


animateGlow();


if ('ontouchstart' in window) {
  glow.style.display = 'none';
}


const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  
  const formData = new FormData(this);
  const name = formData.get('name') || 'User';
  
  
  const submitBtn = this.querySelector('.btn');
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  submitBtn.style.background = '#10b981';
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    this.reset();
  }, 3000);
});


document.addEventListener('DOMContentLoaded', function() {
  
  updateActiveLink();
  
  
  const heroTitle = document.querySelector('.hero h1');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroBtn = document.querySelector('.hero .btn');
  
  setTimeout(() => {
    heroTitle.style.animation = 'fadeInUp 1s ease forwards';
  }, 300);
  
  setTimeout(() => {
    heroSubtitle.style.animation = 'fadeInUp 1s ease forwards 0.3s';
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.animationFillMode = 'forwards';
  }, 600);
  
  setTimeout(() => {
    heroBtn.style.animation = 'fadeInUp 1s ease forwards 0.6s';
    heroBtn.style.opacity = '0';
    heroBtn.style.animationFillMode = 'forwards';
  }, 900);
});

// DOM Elements
const walletAddress = document.getElementById('walletAddress');
const totalBalance = document.getElementById('totalBalance');
const availableBalance = document.getElementById('availableBalance');
const stakedBalance = document.getElementById('stakedBalance');
const balanceChange = document.getElementById('balanceChange');
const currencySelector = document.getElementById('currencySelector');
const assetsList = document.getElementById('assetsList');
const transactionsList = document.getElementById('transactionsList');

// Buttons
const sendBtn = document.getElementById('sendBtn');
const receiveBtn = document.getElementById('receiveBtn');
const swapBtn = document.getElementById('swapBtn');
const stakeBtn = document.getElementById('stakeBtn');
const addAssetBtn = document.getElementById('addAssetBtn');
const viewAllBtn = document.getElementById('viewAllBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Modals
const sendModal = document.getElementById('sendModal');
const receiveModal = document.getElementById('receiveModal');
const closeSendModal = document.getElementById('closeSendModal');
const closeReceiveModal = document.getElementById('closeReceiveModal');

// Form elements
const sendForm = document.getElementById('sendForm');
const recipientAddress = document.getElementById('recipientAddress');
const sendAmount = document.getElementById('sendAmount');
const sendAsset = document.getElementById('sendAsset');
const copyAddressBtn = document.getElementById('copyAddressBtn');
const fullWalletAddress = document.getElementById('fullWalletAddress');

// Notification
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');

// Sample Data
const sampleAssets = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.0543, value: 1452.34, change: 2.1, icon: 'fab fa-bitcoin', color: '#F7931A' },
    { symbol: 'ETH', name: 'Ethereum', balance: 1.23, value: 2234.56, change: 1.8, icon: 'fab fa-ethereum', color: '#627EEA' },
    { symbol: 'USDT', name: 'Tether', balance: 5000, value: 5000, change: 0.1, icon: 'fas fa-coins', color: '#26A17B' },
    { symbol: 'SOL', name: 'Solana', balance: 12.5, value: 567.89, change: 5.2, icon: 'fas fa-sun', color: '#00FFA3' },
    { symbol: 'ADA', name: 'Cardano', balance: 850, value: 425.50, change: -0.5, icon: 'fas fa-chart-bar', color: '#0033AD' }
];

const sampleTransactions = [
    { id: 1, type: 'Sent', date: '2023-10-15', amount: -0.005, asset: 'BTC', address: '0x8a3f...c2e9', status: 'completed' },
    { id: 2, type: 'Received', date: '2023-10-14', amount: 2.5, asset: 'ETH', address: '0x4b2d...f7a1', status: 'completed' },
    { id: 3, type: 'Swapped', date: '2023-10-13', amount: 100, asset: 'USDT', toAsset: 'SOL', status: 'completed' },
    { id: 4, type: 'Received', date: '2023-10-12', amount: 500, asset: 'USDT', address: '0x9c7a...e3b8', status: 'completed' },
    { id: 5, type: 'Sent', date: '2023-10-11', amount: -10, asset: 'SOL', address: '0x2f5b...d9c4', status: 'pending' }
];

// Initialize the application
function initApp() {
    // Load assets
    renderAssets();
    
    // Load transactions
    renderTransactions();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update balances based on assets
    updateTotalBalance();
    
    // Show welcome notification
    showNotification('Welcome to SecureCrypto Wallet!', 'success');
}

// Render assets list
function renderAssets() {
    assetsList.innerHTML = '';
    
    sampleAssets.forEach(asset => {
        const assetItem = document.createElement('div');
        assetItem.className = 'asset-item';
        
        const changeClass = asset.change >= 0 ? 'positive' : 'negative';
        const changeSign = asset.change >= 0 ? '+' : '';
        
        assetItem.innerHTML = `
            <div class="asset-icon" style="background: ${asset.color}20; color: ${asset.color}">
                <i class="${asset.icon}"></i>
            </div>
            <div class="asset-info">
                <div class="asset-name">
                    <span class="asset-symbol">${asset.symbol}</span>
                    <span class="asset-fullname">${asset.name}</span>
                </div>
                <div class="asset-change ${changeClass}">${changeSign}${asset.change}%</div>
            </div>
            <div class="asset-balance">
                <div class="amount">${asset.balance} ${asset.symbol}</div>
                <div class="value">$${(asset.value).toLocaleString()}</div>
            </div>
        `;
        
        assetsList.appendChild(assetItem);
    });
}

// Render transactions list
function renderTransactions() {
    transactionsList.innerHTML = '';
    
    sampleTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        // Determine icon and color based on transaction type
        let iconClass, iconBg, amountClass;
        if (transaction.type === 'Sent') {
            iconClass = 'sent';
            iconBg = 'sent';
            amountClass = 'sent';
        } else if (transaction.type === 'Received') {
            iconClass = 'received';
            iconBg = 'received';
            amountClass = 'received';
        } else {
            iconClass = 'swapped';
            iconBg = 'swapped';
            amountClass = 'received'; // Swapped is generally positive
        }
        
        // Format date
        const dateObj = new Date(transaction.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        // Format amount with sign
        const amountSign = transaction.amount > 0 ? '+' : '';
        const amountDisplay = `${amountSign}${transaction.amount} ${transaction.asset}`;
        
        transactionItem.innerHTML = `
            <div class="transaction-icon ${iconBg}">
                <i class="fas ${transaction.type === 'Sent' ? 'fa-paper-plane' : transaction.type === 'Received' ? 'fa-download' : 'fa-exchange-alt'}"></i>
            </div>
            <div class="transaction-details">
                <div class="transaction-type">${transaction.type} ${transaction.type === 'Swapped' ? transaction.asset + ' to ' + transaction.toAsset : ''}</div>
                <div class="transaction-date">${formattedDate} ${transaction.status === 'pending' ? '• Pending' : ''}</div>
                ${transaction.type !== 'Swapped' ? `<div class="transaction-address">${transaction.address}</div>` : ''}
            </div>
            <div class="transaction-amount ${amountClass}">${amountDisplay}</div>
        `;
        
        transactionsList.appendChild(transactionItem);
    });
}

// Update total balance based on assets
function updateTotalBalance() {
    let total = 0;
    let available = 0;
    let staked = 0;
    
    sampleAssets.forEach(asset => {
        total += asset.value;
    });
    
    // For demo purposes, set available as 90% of total and staked as 10%
    available = total * 0.9;
    staked = total * 0.1;
    
    totalBalance.textContent = `$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    availableBalance.textContent = `$${available.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    stakedBalance.textContent = `$${staked.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Show notification
function showNotification(message, type = 'info') {
    notificationText.textContent = message;
    
    // Set color based on type
    if (type === 'success') {
        notification.style.background = 'rgba(74, 222, 128, 0.9)';
        notification.style.color = '#0c0c0c';
    } else if (type === 'error') {
        notification.style.background = 'rgba(248, 113, 113, 0.9)';
        notification.style.color = '#0c0c0c';
    } else {
        notification.style.background = 'rgba(76, 201, 240, 0.9)';
        notification.style.color = '#0c0c0c';
    }
    
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Setup event listeners
function setupEventListeners() {
    // Send button
    sendBtn.addEventListener('click', () => {
        sendModal.classList.add('active');
    });
    
    // Receive button
    receiveBtn.addEventListener('click', () => {
        receiveModal.classList.add('active');
    });
    
    // Swap button
    swapBtn.addEventListener('click', () => {
        showNotification('Swap functionality coming soon!', 'info');
    });
    
    // Stake button
    stakeBtn.addEventListener('click', () => {
        showNotification('Staking functionality coming soon!', 'info');
    });
    
    // Add asset button
    addAssetBtn.addEventListener('click', () => {
        showNotification('Add asset functionality coming soon!', 'info');
    });
    
    // View all transactions button
    viewAllBtn.addEventListener('click', () => {
        showNotification('View all transactions functionality coming soon!', 'info');
    });
    
    // Logout button
    logoutBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            showNotification('Logged out successfully!', 'success');
            // In a real app, you would redirect to login page
        }
    });
    
    // Close modals
    closeSendModal.addEventListener('click', () => {
        sendModal.classList.remove('active');
    });
    
    closeReceiveModal.addEventListener('click', () => {
        receiveModal.classList.remove('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === sendModal) {
            sendModal.classList.remove('active');
        }
        if (e.target === receiveModal) {
            receiveModal.classList.remove('active');
        }
    });
    
    // Copy wallet address
    copyAddressBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(fullWalletAddress.textContent)
            .then(() => {
                showNotification('Wallet address copied to clipboard!', 'success');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                showNotification('Failed to copy address', 'error');
            });
    });
    
    // Handle send form submission
    sendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const amount = parseFloat(sendAmount.value);
        const asset = sendAsset.value;
        const address = recipientAddress.value.trim();
        
        // Basic validation
        if (!address || address.length < 10) {
            showNotification('Please enter a valid recipient address', 'error');
            return;
        }
        
        if (!amount || amount <= 0) {
            showNotification('Please enter a valid amount', 'error');
            return;
        }
        
        // Check if user has enough balance (simplified check)
        const assetData = sampleAssets.find(a => a.symbol === asset);
        if (!assetData || amount > assetData.balance) {
            showNotification(`Insufficient ${asset} balance`, 'error');
            return;
        }
        
        // In a real app, you would send the transaction to a backend here
        showNotification(`Sending ${amount} ${asset} to ${address.substring(0, 10)}...`, 'success');
        
        // Reset form and close modal
        sendForm.reset();
        sendModal.classList.remove('active');
        
        // Show success message after a delay
        setTimeout(() => {
            showNotification(`Transaction sent successfully!`, 'success');
        }, 1500);
    });
    
    // Currency selector change
    currencySelector.addEventListener('change', (e) => {
        const currency = e.target.value;
        let rate = 1;
        
        // Simulate exchange rates
        if (currency === 'EUR') rate = 0.85;
        if (currency === 'GBP') rate = 0.73;
        if (currency === 'JPY') rate = 110;
        
        // Update displayed balances with new currency
        const currentTotal = parseFloat(totalBalance.textContent.replace(/[^0-9.-]+/g, ""));
        const newTotal = currentTotal * rate;
        
        totalBalance.textContent = `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '¥'}${newTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        
        showNotification(`Currency changed to ${currency}`, 'info');
    });
    
    // Fee option selection
    const feeOptions = document.querySelectorAll('.fee-option input');
    feeOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Remove active class from all options
            document.querySelectorAll('.fee-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to selected option's parent
            this.parentElement.classList.add('active');
        });
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
