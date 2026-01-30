import { firestoreService } from '../firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

// Global variables
let currentUser = null;
let currentCategory = 'all';
let currentSearchTerm = '';

// Initialize forum
document.addEventListener('DOMContentLoaded', function() {
    initializeAuth();
    setupEventListeners();
    loadPosts();
});

// Authentication
function initializeAuth() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        updateUIForAuth(user);
    });
}

function updateUIForAuth(user) {
    const createPostBtn = document.getElementById('createPostBtn');
    if (user) {
        createPostBtn.style.display = 'block';
    } else {
        createPostBtn.style.display = 'none';
    }
}

// Event listeners
function setupEventListeners() {
    // Create post button
    document.getElementById('createPostBtn').addEventListener('click', openCreatePostModal);

    // Search
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setActiveCategory(category);
            loadPosts();
        });
    });

    // Create post form
    document.getElementById('createPostForm').addEventListener('submit', handleCreatePost);
}

// Category management
function setActiveCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === category);
    });
}

// Load posts
async function loadPosts() {
    try {
        showLoading(true);
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';

        let posts;
        if (currentSearchTerm) {
            posts = await firestoreService.searchPosts(currentSearchTerm, currentCategory === 'all' ? null : currentCategory);
        } else {
            posts = await firestoreService.getPosts(currentCategory === 'all' ? null : currentCategory);
        }

        if (posts.length === 0) {
            postsContainer.innerHTML = '<div class="no-posts">No posts found. Be the first to start a discussion!</div>';
        } else {
            posts.forEach(post => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            });
        }
    } catch (error) {
        console.error('Error loading posts:', error);
        showError('Failed to load posts. Please try again.');
    } finally {
        showLoading(false);
    }
}

// Create post element
function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post-card';
    postDiv.innerHTML = `
        <div class="post-header">
            <div class="post-author">
                <img src="${post.author.avatar || '/website/assets/images/pilot_avatar.png'}" alt="${post.author.username}" class="author-avatar">
                <div class="author-info">
                    <span class="author-name">${post.author.username}</span>
                    <span class="post-time">${formatTime(post.createdAt)}</span>
                </div>
            </div>
            <div class="post-category">${getCategoryName(post.category)}</div>
        </div>
        <div class="post-content">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-text">${post.content}</p>
        </div>
        <div class="post-actions">
            <button class="action-btn upvote-btn ${post.upvotedBy && currentUser && post.upvotedBy.includes(currentUser.uid) ? 'upvoted' : ''}" data-post-id="${post.id}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
                <span class="upvote-count">${post.upvotes}</span>
            </button>
            <button class="action-btn comment-btn" data-post-id="${post.id}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span class="comment-count">${post.commentCount}</span>
            </button>
            ${currentUser && post.authorId === currentUser.uid ? `<button class="action-btn delete-btn" data-post-id="${post.id}">Delete</button>` : ''}
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display: none;">
            <!-- Comments will be loaded here -->
        </div>
    `;

    // Add event listeners
    const upvoteBtn = postDiv.querySelector('.upvote-btn');
    const commentBtn = postDiv.querySelector('.comment-btn');
    const deleteBtn = postDiv.querySelector('.delete-btn');

    upvoteBtn.addEventListener('click', () => handleUpvote(post.id));
    commentBtn.addEventListener('click', () => toggleComments(post.id));

    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => handleDeletePost(post.id));
    }

    return postDiv;
}

// Handle upvote
async function handleUpvote(postId) {
    if (!currentUser) {
        showError('Please log in to upvote posts.');
        return;
    }

    try {
        const result = await firestoreService.upvotePost(postId, currentUser.uid);
        // Update UI
        const upvoteBtn = document.querySelector(`.upvote-btn[data-post-id="${postId}"]`);
        const countSpan = upvoteBtn.querySelector('.upvote-count');
        countSpan.textContent = result.upvotes;
        upvoteBtn.classList.toggle('upvoted', result.upvoted);
    } catch (error) {
        console.error('Error upvoting post:', error);
        showError('Failed to upvote post.');
    }
}

// Toggle comments
async function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    if (commentsSection.style.display === 'none') {
        await loadComments(postId);
        commentsSection.style.display = 'block';
    } else {
        commentsSection.style.display = 'none';
    }
}

// Load comments
async function loadComments(postId) {
    try {
        const comments = await firestoreService.getComments(postId);
        const commentsSection = document.getElementById(`comments-${postId}`);
        commentsSection.innerHTML = '';

        if (comments.length === 0) {
            commentsSection.innerHTML = '<div class="no-comments">No comments yet. Be the first to reply!</div>';
        } else {
            comments.forEach(comment => {
                const commentElement = createCommentElement(comment, postId);
                commentsSection.appendChild(commentElement);
            });
        }

        // Add comment form
        const commentForm = createCommentForm(postId);
        commentsSection.appendChild(commentForm);
    } catch (error) {
        console.error('Error loading comments:', error);
        showError('Failed to load comments.');
    }
}

// Create comment element
function createCommentElement(comment, postId) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
        <div class="comment-author">
            <img src="${comment.author.avatar || '/website/assets/images/pilot_avatar.png'}" alt="${comment.author.username}" class="comment-avatar">
            <div class="comment-info">
                <span class="comment-author-name">${comment.author.username}</span>
                <span class="comment-time">${formatTime(comment.createdAt)}</span>
            </div>
        </div>
        <div class="comment-content">
            <p>${comment.content}</p>
        </div>
        <div class="comment-actions">
            <button class="comment-upvote-btn ${comment.upvotedBy && currentUser && comment.upvotedBy.includes(currentUser.uid) ? 'upvoted' : ''}" data-comment-id="${comment.id}" data-post-id="${postId}">
                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
                <span class="upvote-count">${comment.upvotes}</span>
            </button>
        </div>
    `;

    // Add upvote listener
    const upvoteBtn = commentDiv.querySelector('.comment-upvote-btn');
    upvoteBtn.addEventListener('click', () => handleCommentUpvote(postId, comment.id));

    return commentDiv;
}

// Create comment form
function createCommentForm(postId) {
    const formDiv = document.createElement('div');
    formDiv.className = 'comment-form';
    formDiv.innerHTML = `
        <div class="comment-input-group">
            <textarea placeholder="Write a comment..." maxlength="1000" rows="3"></textarea>
            <button class="btn btn-primary comment-submit-btn" data-post-id="${postId}">Comment</button>
        </div>
    `;

    const submitBtn = formDiv.querySelector('.comment-submit-btn');
    const textarea = formDiv.querySelector('textarea');

    submitBtn.addEventListener('click', () => handleAddComment(postId, textarea.value.trim()));

    return formDiv;
}

// Handle add comment
async function handleAddComment(postId, content) {
    if (!currentUser) {
        showError('Please log in to comment.');
        return;
    }

    if (!content) {
        showError('Comment cannot be empty.');
        return;
    }

    try {
        await firestoreService.addComment(postId, currentUser.uid, { content });
        await loadComments(postId); // Reload comments
        showSuccess('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment:', error);
        showError('Failed to add comment.');
    }
}

// Handle comment upvote
async function handleCommentUpvote(postId, commentId) {
    // Note: This would require additional Firestore methods for comment upvotes
    // For now, we'll skip this feature
    showError('Comment upvoting not implemented yet.');
}

// Handle delete post
async function handleDeletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        await firestoreService.deletePost(postId, currentUser.uid);
        loadPosts(); // Reload posts
        showSuccess('Post deleted successfully!');
    } catch (error) {
        console.error('Error deleting post:', error);
        showError('Failed to delete post.');
    }
}

// Search
function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    currentSearchTerm = searchInput.value.trim();
    loadPosts();
}

// Create post modal
function openCreatePostModal() {
    if (!currentUser) {
        showError('Please log in to create posts.');
        return;
    }
    document.getElementById('createPostModal').style.display = 'block';
}

function closeCreatePostModal() {
    document.getElementById('createPostModal').style.display = 'none';
    document.getElementById('createPostForm').reset();
}

// Handle create post
async function handleCreatePost(e) {
    e.preventDefault();

    const title = document.getElementById('postTitle').value.trim();
    const category = document.getElementById('postCategory').value;
    const content = document.getElementById('postContent').value.trim();

    if (!title || !content) {
        showError('Title and content are required.');
        return;
    }

    try {
        await firestoreService.createPost(currentUser.uid, { title, category, content });
        closeCreatePostModal();
        loadPosts(); // Reload posts
        showSuccess('Post created successfully!');
    } catch (error) {
        console.error('Error creating post:', error);
        showError('Failed to create post.');
    }
}

// Utility functions
function getCategoryName(category) {
    const names = {
        general: 'General Discussion',
        help: 'Project Help',
        progress: 'Progress Sharing'
    };
    return names[category] || category;
}

function formatTime(timestamp) {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return date.toLocaleDateString();
}

function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'block' : 'none';
}

function showError(message) {
    // Simple alert for now, could be improved with toast notifications
    alert('Error: ' + message);
}

function showSuccess(message) {
    alert('Success: ' + message);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('createPostModal');
    if (event.target === modal) {
        closeCreatePostModal();
    }
};
