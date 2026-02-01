import { firestoreService } from '../firestore.js';

// Global variables
let currentUser = null;
let currentFilter = 'all';
let lastVisible = null;
let isLoading = false;

// Initialize the page
document.addEventListener('DOMContentLoaded', async () => {
    await initializeAuth();
    setupEventListeners();
    loadSubmissions();
});

// Authentication check
async function initializeAuth() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        // Redirect to home if not authenticated
        window.location.href = '../index.html';
        return;
    }
    currentUser = user;

    // Update user avatar
    const userAvatar = document.querySelector('.user-avatar img');
    if (userAvatar && user.photoURL) {
        userAvatar.src = user.photoURL;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Submit project button
    document.getElementById('submitProjectBtn').addEventListener('click', openSubmissionModal);

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            closeSubmissionModal();
            closeReviewModal();
        });
    });

    // Click outside modal to close
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // Submission form
    document.getElementById('submissionForm').addEventListener('submit', handleProjectSubmission);

    // Search functionality
    document.getElementById('submissionSearch').addEventListener('input', debounce(handleSearch, 300));

    // Filter tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            setActiveFilter(filter);
        });
    });

    // Load more button
    document.getElementById('loadMoreBtn').addEventListener('click', loadMoreSubmissions);

    // Review form
    document.getElementById('reviewForm').addEventListener('submit', handleReviewSubmission);

    // Tech stack input
    document.getElementById('techInput').addEventListener('keydown', handleTechInput);
}

// Modal functions
function openSubmissionModal() {
    document.getElementById('submissionModal').style.display = 'block';
    document.getElementById('projectTitle').focus();
}

function closeSubmissionModal() {
    document.getElementById('submissionModal').style.display = 'none';
    document.getElementById('submissionForm').reset();
    document.getElementById('techTags').innerHTML = '';
}

function openReviewModal(submissionId, projectTitle, projectAuthor) {
    document.getElementById('reviewModal').style.display = 'block';
    document.getElementById('reviewProjectInfo').innerHTML = `
        <h3>${projectTitle}</h3>
        <p>by ${projectAuthor}</p>
    `;
    document.getElementById('reviewForm').dataset.submissionId = submissionId;
}

function closeReviewModal() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewForm').reset();
}

// Project submission handling
async function handleProjectSubmission(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const techTags = Array.from(document.querySelectorAll('#techTags .tech-tag'))
        .map(tag => tag.textContent.replace('×', '').trim());

    const projectData = {
        title: formData.get('projectTitle'),
        description: formData.get('projectDescription'),
        projectLink: formData.get('projectLink'),
        repoLink: formData.get('projectRepo') || '',
        techStack: techTags,
        imageUrl: formData.get('projectImage') || ''
    };

    try {
        await firestoreService.submitProject(currentUser.uid, projectData);
        closeSubmissionModal();
        showNotification('Project submitted successfully!', 'success');
        loadSubmissions(); // Refresh the list
    } catch (error) {
        console.error('Error submitting project:', error);
        showNotification('Error submitting project. Please try again.', 'error');
    }
}

// Tech stack input handling
function handleTechInput(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const input = e.target;
        const value = input.value.trim();

        if (value && !isTechTagExists(value)) {
            addTechTag(value);
            input.value = '';
        }
    }
}

function addTechTag(tech) {
    const techTags = document.getElementById('techTags');
    const tag = document.createElement('span');
    tag.className = 'tech-tag';
    tag.innerHTML = `${tech} <span class="remove-tag">&times;</span>`;

    tag.querySelector('.remove-tag').addEventListener('click', () => {
        tag.remove();
    });

    techTags.appendChild(tag);
}

function isTechTagExists(tech) {
    const tags = document.querySelectorAll('#techTags .tech-tag');
    return Array.from(tags).some(tag => tag.textContent.replace('×', '').trim().toLowerCase() === tech.toLowerCase());
}

// Load submissions
async function loadSubmissions() {
    if (isLoading) return;
    isLoading = true;

    try {
        const submissions = await firestoreService.getSubmissions(20, currentFilter === 'featured');
        displaySubmissions(submissions);
    } catch (error) {
        console.error('Error loading submissions:', error);
        showNotification('Error loading submissions.', 'error');
    } finally {
        isLoading = false;
    }
}

async function loadMoreSubmissions() {
    if (isLoading) return;
    isLoading = true;

    try {
        // This would need pagination implementation
        // For now, just reload with more items
        const submissions = await firestoreService.getSubmissions(40, currentFilter === 'featured');
        displaySubmissions(submissions);
        document.getElementById('loadMoreBtn').style.display = 'none';
    } catch (error) {
        console.error('Error loading more submissions:', error);
    } finally {
        isLoading = false;
    }
}

// Display submissions
function displaySubmissions(submissions) {
    const grid = document.getElementById('submissionsGrid');
    grid.innerHTML = '';

    if (submissions.length === 0) {
        grid.innerHTML = '<div class="no-submissions">No submissions found.</div>';
        return;
    }

    submissions.forEach(submission => {
        const card = createSubmissionCard(submission);
        grid.appendChild(card);
    });

    // Show load more button if there are more than 20 items
    document.getElementById('loadMoreBtn').style.display = submissions.length >= 20 ? 'block' : 'none';
}

function createSubmissionCard(submission) {
    const card = document.createElement('div');
    card.className = 'submission-card';
    card.dataset.id = submission.id;

    const techTags = submission.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('');

    card.innerHTML = `
        <div class="card-header">
            <div class="author-info">
                <img src="${submission.author.avatar || '/default-avatar.png'}" alt="${submission.author.username}" class="author-avatar">
                <div>
                    <h3 class="author-name">${submission.author.username}</h3>
                    <span class="submission-date">${formatDate(submission.createdAt)}</span>
                </div>
            </div>
            ${submission.featured ? '<span class="featured-badge">Featured</span>' : ''}
        </div>

        <div class="card-content">
            <h2 class="submission-title">${submission.title}</h2>
            <p class="submission-description">${submission.description}</p>

            ${submission.imageUrl ? `<img src="${submission.imageUrl}" alt="${submission.title}" class="submission-image">` : ''}

            <div class="tech-stack">
                ${techTags}
            </div>
        </div>

        <div class="card-footer">
            <div class="rating-section">
                <div class="stars">
                    ${generateStars(submission.averageRating)}
                </div>
                <span class="rating-text">${submission.averageRating.toFixed(1)} (${submission.totalRatings} ratings)</span>
            </div>

            <div class="action-buttons">
                <button class="btn btn-outline review-btn" data-id="${submission.id}">
                    <i class="fas fa-star"></i> Rate & Review
                </button>
                <a href="${submission.projectLink}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> View Project
                </a>
                ${submission.repoLink ? `<a href="${submission.repoLink}" target="_blank" class="btn btn-secondary">
                    <i class="fab fa-github"></i> Code
                </a>` : ''}
            </div>

            <div class="review-count">
                <i class="fas fa-comment"></i> ${submission.reviewCount} reviews
            </div>
        </div>
    `;

    // Add event listeners
    card.querySelector('.review-btn').addEventListener('click', () => {
        openReviewModal(submission.id, submission.title, submission.author.username);
    });

    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let stars = '';

    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    // Half star
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Search functionality
async function handleSearch(e) {
    const query = e.target.value.trim();
    if (query.length < 2) {
        loadSubmissions();
        return;
    }

    try {
        const submissions = await firestoreService.searchSubmissions(query);
        displaySubmissions(submissions);
    } catch (error) {
        console.error('Error searching submissions:', error);
    }
}

// Filter functionality
function setActiveFilter(filter) {
    currentFilter = filter;

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    loadSubmissions();
}

// Review submission handling
async function handleReviewSubmission(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const submissionId = e.target.dataset.submissionId;
    const rating = formData.get('rating');
    const reviewText = formData.get('reviewText');

    if (!rating) {
        showNotification('Please select a rating.', 'error');
        return;
    }

    try {
        // Submit rating
        await firestoreService.rateProject(submissionId, currentUser.uid, parseInt(rating));

        // Submit review if text is provided
        if (reviewText.trim()) {
            await firestoreService.addReview(submissionId, currentUser.uid, {
                content: reviewText.trim()
            });
        }

        closeReviewModal();
        showNotification('Review submitted successfully!', 'success');
        loadSubmissions(); // Refresh to show updated ratings
    } catch (error) {
        console.error('Error submitting review:', error);
        showNotification('Error submitting review. Please try again.', 'error');
    }
}

// Utility functions
function formatDate(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    // Simple notification - you can enhance this
    alert(message);
}

// Navigation functions (assuming these are defined elsewhere)
function toggleMobileMenu() {
    // Implement mobile menu toggle
}

function toggleTheme() {
    // Implement theme toggle
}

function toggleUserMenu() {
    // Implement user menu toggle
}

function handleLogout() {
    localStorage.removeItem('user');
    window.location.href = '../index.html';
}
