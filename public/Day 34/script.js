// Sample Hotel Data
const hotels = [
    {
        id: 1,
        name: "Grand Plaza Hotel",
        location: "New York, USA",
        rating: 5,
        price: 250,
        image: "hotel1",
        amenities: ["wifi", "pool", "spa", "gym", "parking", "restaurant"],
        description: "Luxury hotel in the heart of Manhattan with stunning city views",
        rooms: [
            { id: 101, type: "Standard Room", capacity: 2, price: 250, features: ["King bed", "City view", "Mini bar"] },
            { id: 102, type: "Deluxe Suite", capacity: 4, price: 450, features: ["Two bedrooms", "Living area", "Kitchenette"] },
            { id: 103, type: "Penthouse", capacity: 6, price: 800, features: ["Three bedrooms", "Private terrace", "Butler service"] }
        ]
    },
    {
        id: 2,
        name: "Seaside Resort",
        location: "Miami, USA",
        rating: 4,
        price: 180,
        image: "hotel2",
        amenities: ["wifi", "pool", "beach", "restaurant"],
        description: "Beachfront paradise with tropical gardens and ocean views",
        rooms: [
            { id: 201, type: "Garden View", capacity: 2, price: 180, features: ["Queen bed", "Garden view", "Balcony"] },
            { id: 202, type: "Ocean View", capacity: 2, price: 220, features: ["King bed", "Ocean view", "Balcony"] },
            { id: 203, type: "Beach Suite", capacity: 4, price: 350, features: ["Two bedrooms", "Beach access", "Kitchen"] }
        ]
    },
    {
        id: 3,
        name: "Mountain Lodge",
        location: "Aspen, USA",
        rating: 4,
        price: 200,
        image: "hotel3",
        amenities: ["wifi", "spa", "gym", "restaurant", "parking"],
        description: "Cozy mountain retreat with ski-in/ski-out access",
        rooms: [
            { id: 301, type: "Alpine Room", capacity: 2, price: 200, features: ["Queen bed", "Mountain view", "Fireplace"] },
            { id: 302, type: "Family Suite", capacity: 4, price: 320, features: ["Two bedrooms", "Kitchen", "Fireplace"] },
            { id: 303, type: "Luxury Cabin", capacity: 6, price: 500, features: ["Three bedrooms", "Hot tub", "Full kitchen"] }
        ]
    },
    {
        id: 4,
        name: "City Center Inn",
        location: "Chicago, USA",
        rating: 3,
        price: 120,
        image: "hotel4",
        amenities: ["wifi", "gym", "parking"],
        description: "Modern hotel in downtown Chicago near major attractions",
        rooms: [
            { id: 401, type: "Standard Room", capacity: 2, price: 120, features: ["Double bed", "City view"] },
            { id: 402, type: "Business Room", capacity: 2, price: 150, features: ["King bed", "Work desk", "Coffee maker"] },
            { id: 403, type: "Executive Suite", capacity: 3, price: 220, features: ["Separate living area", "Work desk", "Mini kitchen"] }
        ]
    },
    {
        id: 5,
        name: "Tropical Paradise",
        location: "Honolulu, USA",
        rating: 5,
        price: 350,
        image: "hotel5",
        amenities: ["wifi", "pool", "spa", "beach", "restaurant", "gym"],
        description: "Luxury beachfront resort with world-class amenities",
        rooms: [
            { id: 501, type: "Garden Bungalow", capacity: 2, price: 350, features: ["King bed", "Private patio", "Outdoor shower"] },
            { id: 502, type: "Beach Villa", capacity: 4, price: 550, features: ["Two bedrooms", "Private pool", "Ocean view"] },
            { id: 503, type: "Presidential Suite", capacity: 6, price: 1200, features: ["Three bedrooms", "Private pool", "Butler service"] }
        ]
    },
    {
        id: 6,
        name: "Historic Grand Hotel",
        location: "Boston, USA",
        rating: 4,
        price: 280,
        image: "hotel6",
        amenities: ["wifi", "restaurant", "bar", "parking"],
        description: "Elegant historic hotel with classic charm and modern amenities",
        rooms: [
            { id: 601, type: "Classic Room", capacity: 2, price: 280, features: ["Queen bed", "Historic view", "Antique furniture"] },
            { id: 602, type: "Grand Suite", capacity: 3, price: 420, features: ["King bed", "Separate living area", "City view"] },
            { id: 603, type: "Presidential Suite", capacity: 4, price: 650, features: ["Two bedrooms", "Dining area", "Panoramic view"] }
        ]
    }
];

// Global Variables
let bookingCart = [];
let currentFilters = {
    price: 500,
    ratings: [],
    amenities: []
};
let currentSort = 'recommended';
let userBookings = [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadBookingsFromStorage();
    displayFeaturedHotels();
    setDefaultDates();
    updateCartUI();
});

// Set default dates (today and tomorrow)
function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    document.getElementById('checkinDate').valueAsDate = today;
    document.getElementById('checkoutDate').valueAsDate = tomorrow;
}

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Display Featured Hotels
function displayFeaturedHotels() {
    const featuredGrid = document.getElementById('featuredHotels');
    const featuredHotels = hotels.slice(0, 3);
    
    featuredGrid.innerHTML = featuredHotels.map(hotel => `
        <div class="hotel-card" onclick="showHotelDetails(${hotel.id})">
            <img src="https://picsum.photos/seed/${hotel.image}/400/300" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                </div>
                <div class="hotel-rating">
                    <span class="stars">${generateStars(hotel.rating)}</span>
                    <span>${hotel.rating}.0</span>
                </div>
                <div class="hotel-price">
                    <span class="price">$${hotel.price}</span>
                    <span>per night</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Search Hotels
function searchHotels() {
    const destination = document.getElementById('destinationInput').value.toLowerCase();
    const checkin = document.getElementById('checkinDate').value;
    const checkout = document.getElementById('checkoutDate').value;
    const guests = document.getElementById('guestCount').value;
    
    if (!checkin || !checkout) {
        showToast('Please select check-in and check-out dates');
        return;
    }
    
    if (new Date(checkin) >= new Date(checkout)) {
        showToast('Check-out date must be after check-in date');
        return;
    }
    
    // Filter hotels based on search criteria
    let filteredHotels = hotels;
    
    if (destination) {
        filteredHotels = filteredHotels.filter(hotel => 
            hotel.name.toLowerCase().includes(destination) ||
            hotel.location.toLowerCase().includes(destination)
        );
    }
    
    // Show hotels section with results
    showSection('hotels');
    displayHotels(filteredHotels);
    showToast(`Found ${filteredHotels.length} hotels`);
}

// Display Hotels
function displayHotels(hotelsToShow = hotels) {
    const hotelsGrid = document.getElementById('hotelsGrid');
    
    if (hotelsToShow.length === 0) {
        hotelsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1/-1;">
                <i class="fas fa-search"></i>
                <h3>No hotels found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
        return;
    }
    
    hotelsGrid.innerHTML = hotelsToShow.map(hotel => `
        <div class="hotel-card" onclick="showHotelDetails(${hotel.id})">
            <img src="https://picsum.photos/seed/${hotel.image}/400/300" alt="${hotel.name}" class="hotel-image">
            <div class="hotel-info">
                <h3 class="hotel-name">${hotel.name}</h3>
                <div class="hotel-location">
                    <i class="fas fa-map-marker-alt"></i> ${hotel.location}
                </div>
                <div class="hotel-rating">
                    <span class="stars">${generateStars(hotel.rating)}</span>
                    <span>${hotel.rating}.0</span>
                </div>
                <div class="hotel-price">
                    <span class="price">$${hotel.price}</span>
                    <span>per night</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Show Hotel Details
function showHotelDetails(hotelId) {
    const hotel = hotels.find(h => h.id === hotelId);
    if (!hotel) return;
    
    const modal = document.getElementById('hotelModal');
    const content = document.getElementById('hotelDetailsContent');
    
    content.innerHTML = `
        <div class="hotel-details-header">
            <img src="https://picsum.photos/seed/${hotel.image}/900/300" alt="${hotel.name}" class="hotel-details-image">
        </div>
        <div class="hotel-details-info">
            <h2 class="hotel-details-title">${hotel.name}</h2>
            <div class="hotel-location">
                <i class="fas fa-map-marker-alt"></i> ${hotel.location}
            </div>
            <div class="hotel-rating">
                <span class="stars">${generateStars(hotel.rating)}</span>
                <span>${hotel.rating}.0 (${Math.floor(Math.random() * 500) + 100} reviews)</span>
            </div>
            <p>${hotel.description}</p>
            
            <div class="hotel-amenities">
                <h3>Amenities</h3>
                ${hotel.amenities.map(amenity => `
                    <span class="amenity-tag">
                        ${getAmenityIcon(amenity)} ${amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                    </span>
                `).join('')}
            </div>
            
            <div class="rooms-section">
                <h3>Available Rooms</h3>
                <div class="rooms-grid">
                    ${hotel.rooms.map(room => `
                        <div class="room-card">
                            <div class="room-info">
                                <h4>${room.type}</h4>
                                <div class="room-features">
                                    <i class="fas fa-users"></i> Up to ${room.capacity} guests
                                    ${room.features.map(feature => `<br>• ${feature}`).join('')}
                                </div>
                            </div>
                            <div class="room-price">
                                <div class="price">$${room.price}</div>
                                <div>per night</div>
                                <button class="btn btn-primary" onclick="addToBookingCart(${hotel.id}, ${room.id})">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Get amenity icon
function getAmenityIcon(amenity) {
    const icons = {
        wifi: '<i class="fas fa-wifi"></i>',
        pool: '<i class="fas fa-swimming-pool"></i>',
        spa: '<i class="fas fa-spa"></i>',
        gym: '<i class="fas fa-dumbbell"></i>',
        parking: '<i class="fas fa-parking"></i>',
        restaurant: '<i class="fas fa-utensils"></i>',
        beach: '<i class="fas fa-umbrella-beach"></i>',
        bar: '<i class="fas fa-cocktail"></i>'
    };
    return icons[amenity] || '<i class="fas fa-check"></i>';
}

// Close Hotel Modal
function closeHotelModal() {
    document.getElementById('hotelModal').style.display = 'none';
}

// Add to Booking Cart
function addToBookingCart(hotelId, roomId) {
    const hotel = hotels.find(h => h.id === hotelId);
    const room = hotel.rooms.find(r => r.id === roomId);
    
    const checkin = document.getElementById('checkinDate').value;
    const checkout = document.getElementById('checkoutDate').value;
    const guests = document.getElementById('guestCount').value;
    
    if (!checkin || !checkout) {
        showToast('Please select check-in and check-out dates');
        return;
    }
    
    const nights = Math.ceil((new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24));
    const totalPrice = room.price * nights;
    
    const bookingItem = {
        id: Date.now(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        roomId: room.id,
        roomType: room.type,
        checkin,
        checkout,
        guests,
        nights,
        pricePerNight: room.price,
        totalPrice
    };
    
    bookingCart.push(bookingItem);
    updateCartUI();
    closeHotelModal();
    showToast(`${room.type} added to booking`);
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const subtotal = document.getElementById('subtotal');
    const taxes = document.getElementById('taxes');
    const total = document.getElementById('total');
    
    cartCount.textContent = bookingCart.length;
    
    if (bookingCart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <p>Your booking cart is empty</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = bookingCart.map(item => `
            <div class="cart-item">
                <h4>${item.hotelName}</h4>
                <div class="cart-item-details">
                    <div>${item.roomType}</div>
                    <div>${item.checkin} to ${item.checkout} (${item.nights} nights)</div>
                    <div>${item.guests} guests</div>
                </div>
                <div class="cart-item-price">
                    $${item.totalPrice}
                </div>
                <button class="btn btn-outline" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }
    
    const subtotalAmount = bookingCart.reduce((sum, item) => sum + item.totalPrice, 0);
    const taxesAmount = subtotalAmount * 0.1;
    const totalAmount = subtotalAmount + taxesAmount;
    
    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    taxes.textContent = `$${taxesAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(itemId) {
    bookingCart = bookingCart.filter(item => item.id !== itemId);
    updateCartUI();
    showToast('Item removed from booking');
}

// Toggle Booking Cart
function toggleBookingCart() {
    const cart = document.getElementById('bookingCart');
    cart.classList.toggle('open');
}

// Toggle Filters
function toggleFilters() {
    const filters = document.getElementById('filtersSidebar');
    const grid = document.getElementById('hotelsGrid');
    
    filters.classList.toggle('hidden');
    grid.classList.toggle('filters-closed');
}

// Update Price Filter
function updatePriceFilter() {
    const value = document.getElementById('priceRange').value;
    document.getElementById('priceValue').textContent = `$${value}`;
    currentFilters.price = parseInt(value);
    applyFilters();
}

// Apply Filters
function applyFilters() {
    // Get selected ratings
    const ratingCheckboxes = document.querySelectorAll('.rating-filters input:checked');
    currentFilters.ratings = Array.from(ratingCheckboxes).map(cb => parseInt(cb.value));
    
    // Get selected amenities
    const amenityCheckboxes = document.querySelectorAll('.amenity-filters input:checked');
    currentFilters.amenities = Array.from(amenityCheckboxes).map(cb => cb.value);
    
    // Apply filters
    let filtered = hotels.filter(hotel => {
        // Price filter
        if (hotel.price > currentFilters.price) return false;
        
        // Rating filter
        if (currentFilters.ratings.length > 0 && !currentFilters.ratings.includes(hotel.rating)) return false;
        
        // Amenities filter
        if (currentFilters.amenities.length > 0) {
            const hasAllAmenities = currentFilters.amenities.every(amenity => 
                hotel.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
        }
        
        return true;
    });
    
    displayHotels(filtered);
}

// Clear Filters
function clearFilters() {
    document.getElementById('priceRange').value = 500;
    document.getElementById('priceValue').textContent = '$500';
    document.querySelectorAll('.rating-filters input').forEach(cb => cb.checked = false);
    document.querySelectorAll('.amenity-filters input').forEach(cb => cb.checked = false);
    
    currentFilters = {
        price: 500,
        ratings: [],
        amenities: []
    };
    
    displayHotels();
}

// Sort Hotels
function sortHotels() {
    const sortValue = document.getElementById('sortSelect').value;
    let sorted = [...hotels];
    
    switch(sortValue) {
        case 'price-low':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Recommended - keep original order
            break;
    }
    
    displayHotels(sorted);
}

// Proceed to Checkout
function proceedToCheckout() {
    if (bookingCart.length === 0) {
        showToast('Your booking cart is empty');
        return;
    }
    
    document.getElementById('checkoutModal').style.display = 'block';
    toggleBookingCart();
}

// Close Checkout Modal
function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

// Complete Booking
function completeBooking(event) {
    event.preventDefault();
    
    const booking = {
        id: 'BK' + Date.now(),
        items: [...bookingCart],
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        total: bookingCart.reduce((sum, item) => sum + item.totalPrice, 0) * 1.1
    };
    
    userBookings.push(booking);
    saveBookingsToStorage();
    
    // Clear cart
    bookingCart = [];
    updateCartUI();
    closeCheckoutModal();
    
    // Show success message
    showToast(`Booking confirmed! Reference: ${booking.id}`);
    
    // Show bookings section
    showSection('bookings');
    displayBookings();
}

// Display Bookings
function displayBookings() {
    const bookingsList = document.getElementById('bookingsList');
    
    if (userBookings.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-alt"></i>
                <h3>No bookings yet</h3>
                <p>Start by searching and booking your perfect stay</p>
            </div>
        `;
        return;
    }
    
    bookingsList.innerHTML = userBookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h3>Booking Reference: ${booking.id}</h3>
                <div class="booking-details">
                    ${booking.items.map(item => `
                        <div>${item.hotelName} - ${item.roomType}</div>
                        <div>${item.checkin} to ${item.checkout}</div>
                    `).join('')}
                </div>
                <div>Total: $${booking.total.toFixed(2)}</div>
            </div>
            <div>
                <span class="booking-status status-${booking.status}">${booking.status}</span>
                <button class="btn btn-outline" onclick="cancelBooking('${booking.id}')">
                    Cancel
                </button>
            </div>
        </div>
    `).join('');
}

// Cancel Booking
function cancelBooking(bookingId) {
    if (confirm('Are you sure you want to cancel this booking?')) {
        const booking = userBookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'cancelled';
            saveBookingsToStorage();
            displayBookings();
            showToast('Booking cancelled');
        }
    }
}

// Local Storage Functions
function saveBookingsToStorage() {
    localStorage.setItem('hotelBookings', JSON.stringify(userBookings));
}

function loadBookingsFromStorage() {
    const saved = localStorage.getItem('hotelBookings');
    if (saved) {
        userBookings = JSON.parse(saved);
    }
}

// Login Modal
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function handleLogin(event) {
    event.preventDefault();
    showToast('Login functionality would be implemented here');
    closeLoginModal();
}

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    const modals = ['hotelModal', 'checkoutModal', 'loginModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}