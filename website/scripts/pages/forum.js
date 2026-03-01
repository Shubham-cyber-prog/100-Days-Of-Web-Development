import { db } from '../firebase-config.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    arrayUnion,
    arrayRemove,
    increment
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
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
    const createPostBtn = document.getElementById('createPostBtn');
    if (createPostBtn) {
        createPostBtn.addEventListener('click', openCreatePostModal);
    }

    // Search
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
    }

    // Categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            setActiveCategory(category);
            loadPosts();
        });
    });

    // Create post form
    const createPostForm = document.getElementById('createPostForm');
    if (createPostForm) {
        createPostForm.addEventListener('submit', handleCreatePost);
    }

    // Cancel post button
    const cancelPostBtn = document.getElementById('cancelPostBtn');
    if (cancelPostBtn) {
        cancelPostBtn.addEventListener('click', closeCreatePostModal);
    }

    // Close modal button
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCreatePostModal);
    }
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
        if (!postsContainer) return;
        
        postsContainer.innerHTML = '';

        let postsQuery;
        if (currentCategory === 'all') {
            postsQuery = query(
                collection(db, 'forum_posts'),
                orderBy('createdAt', 'desc')
            );
        } else {
            postsQuery = query(
                collection(db, 'forum_posts'),
                where('category', '==', currentCategory),
                orderBy('createdAt', 'desc')
            );
        }

        const querySnapshot = await getDocs(postsQuery);
        const posts = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            posts.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt
            });
        });

        // Filter by search term if provided
        let filteredPosts = posts;
        if (currentSearchTerm) {
            const searchTerm = currentSearchTerm.toLowerCase();
            filteredPosts = posts.filter(post =>
                post.title.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm)
            );
        }

        if (filteredPosts.length === 0) {
            postsContainer.innerHTML = '<div class="no-posts" style="text-align: center; padding: 40px; color: #64748b;">No posts found. Be the first to start a discussion!</div>';
        } else {
            filteredPosts.forEach(post => {
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
    postDiv.style.marginBottom = '20px';
    postDiv.style.padding = '20px';
    postDiv.style.background = 'white';
    postDiv.style.borderRadius = '12px';
    postDiv.style.border = '1px solid #e5e7eb';
    postDiv.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
    
    const isUpvoted = post.upvotedBy && currentUser && post.upvotedBy.includes(currentUser.uid);
    const canDelete = currentUser && post.authorId === currentUser.uid;

    postDiv.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${post.authorAvatar || '/website/assets/images/pilot_avatar.png'}" alt="${post.authorName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />
                <div>
                    <div style="font-weight: 600; color: #111827;">${post.authorName || 'Anonymous'}</div>
                    <div style="font-size: 0.85rem; color: #6b7280;">${formatTime(post.createdAt)}</div>
                </div>
            </div>
            <div style="background: #f3f4f6; padding: 4px 12px; border-radius: 12px; font-size: 0.85rem; color: #6b7280; font-weight: 500;">${getCategoryName(post.category)}</div>
        </div>
        <div style="margin-bottom: 15px;">
            <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px; color: #111827;">${escapeHtml(post.title)}</h3>
            <p style="color: #374151; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(post.content)}</p>
        </div>
        <div style="display: flex; gap: 12px; align-items: center;">
            <button class="action-btn upvote-btn ${isUpvoted ? 'upvoted' : ''}" data-post-id="${post.id}" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s; ${isUpvoted ? 'border-color: #22d3ee; background: rgba(34, 211, 238, 0.1);' : ''}">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
                <span style="font-weight: 600;">${post.upvotes || 0}</span>
            </button>
            <button class="action-btn comment-btn" data-post-id="${post.id}" style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 6px; background: white; cursor: pointer; transition: all 0.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span>${post.commentCount || 0}</span>
            </button>
            ${canDelete ? `<button class="action-btn delete-btn" data-post-id="${post.id}" style="padding: 6px 12px; border: 1px solid #ef4444; border-radius: 6px; background: white; color: #ef4444; cursor: pointer; transition: all 0.2s;">Delete</button>` : ''}
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display: none; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
            <!-- Comments will be loaded here -->
        </div>
    `;

    // Add event listeners
    const upvoteBtn = postDiv.querySelector('.upvote-btn');
    const commentBtn = postDiv.querySelector('.comment-btn');
    const deleteBtn = postDiv.querySelector('.delete-btn');

    if (upvoteBtn) {
        upvoteBtn.addEventListener('click', () => handleUpvote(post.id));
    }
    if (commentBtn) {
        commentBtn.addEventListener('click', () => toggleComments(post.id));
    }
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
        const postRef = doc(db, 'forum_posts', postId);
        const postDoc = await getDoc(postRef);
        
        if (!postDoc.exists()) {
            showError('Post not found.');
            return;
        }

        const postData = postDoc.data();
        const upvotedBy = postData.upvotedBy || [];
        const isUpvoted = upvotedBy.includes(currentUser.uid);

        if (isUpvoted) {
            await updateDoc(postRef, {
                upvotedBy: arrayRemove(currentUser.uid),
                upvotes: increment(-1)
            });
        } else {
            await updateDoc(postRef, {
                upvotedBy: arrayUnion(currentUser.uid),
                upvotes: increment(1)
            });
        }

        loadPosts(); // Reload to update UI
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
        const commentsQuery = query(
            collection(db, 'forum_posts', postId, 'comments'),
            orderBy('createdAt', 'asc')
        );
        
        const querySnapshot = await getDocs(commentsQuery);
        const comments = [];
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            comments.push({
                id: doc.id,
                ...data,
                createdAt: data.createdAt
            });
        });

        const commentsSection = document.getElementById(`comments-${postId}`);
        commentsSection.innerHTML = '';

        if (comments.length === 0) {
            commentsSection.innerHTML = '<div style="color: #6b7280; font-size: 0.9rem; padding: 10px;">No comments yet. Be the first to reply!</div>';
        } else {
            comments.forEach(comment => {
                const commentElement = createCommentElement(comment);
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
function createCommentElement(comment) {
    const commentDiv = document.createElement('div');
    commentDiv.style.padding = '12px';
    commentDiv.style.marginBottom = '10px';
    commentDiv.style.background = '#f9fafb';
    commentDiv.style.borderRadius = '8px';
    commentDiv.style.border = '1px solid #e5e7eb';
    
    commentDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <img src="${comment.authorAvatar || '/website/assets/images/pilot_avatar.png'}" alt="${comment.authorName}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />
            <div>
                <div style="font-weight: 600; color: #111827; font-size: 0.9rem;">${escapeHtml(comment.authorName || 'Anonymous')}</div>
                <div style="font-size: 0.8rem; color: #6b7280;">${formatTime(comment.createdAt)}</div>
            </div>
        </div>
        <div style="color: #374151; font-size: 0.9rem; line-height: 1.5; white-space: pre-wrap;">${escapeHtml(comment.content)}</div>
    `;

    return commentDiv;
}

// Create comment form
function createCommentForm(postId) {
    const formDiv = document.createElement('div');
    formDiv.style.marginTop = '15px';
    formDiv.innerHTML = `
        <textarea id="comment-input-${postId}" placeholder="Write a comment..." rows="2" style="width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 8px; resize: vertical; font-family: inherit; font-size: 0.9rem;"></textarea>
        <button class="comment-submit-btn" data-post-id="${postId}" style="margin-top: 8px; padding: 8px 16px; background: linear-gradient(135deg, #22d3ee, #a78bfa); color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s;">Comment</button>
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
        const commentsRef = collection(db, 'forum_posts', postId, 'comments');
        await addDoc(commentsRef, {
            authorId: currentUser.uid,
            authorName: currentUser.displayName || currentUser.email.split('@')[0],
            authorAvatar: currentUser.photoURL || '',
            content: content,
            createdAt: serverTimestamp(),
            upvotes: 0,
            upvotedBy: []
        });

        // Update comment count
        await updateDoc(doc(db, 'forum_posts', postId), {
            commentCount: increment(1)
        });

        await loadComments(postId); // Reload comments
        showSuccess('Comment added successfully!');
    } catch (error) {
        console.error('Error adding comment:', error);
        showError('Failed to add comment.');
    }
}

// Handle delete post
async function handleDeletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
        await deleteDoc(doc(db, 'forum_posts', postId));
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
    if (searchInput) {
        currentSearchTerm = searchInput.value.trim();
        loadPosts();
    }
}

// Create post modal
function openCreatePostModal() {
    if (!currentUser) {
        showError('Please log in to create posts.');
        return;
    }
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeCreatePostModal() {
    const modal = document.getElementById('createPostModal');
    if (modal) {
        modal.style.display = 'none';
    }
    const form = document.getElementById('createPostForm');
    if (form) {
        form.reset();
    }
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
        await addDoc(collection(db, 'forum_posts'), {
            authorId: currentUser.uid,
            authorName: currentUser.displayName || currentUser.email.split('@')[0],
            authorAvatar: currentUser.photoURL || '',
            title: title,
            category: category,
            content: content,
            createdAt: serverTimestamp(),
            upvotes: 0,
            upvotedBy: [],
            commentCount: 0
        });

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
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = show ? 'block' : 'none';
    }
}

function showError(message) {
    alert('Error: ' + message);
}

function showSuccess(message) {
    alert('Success: ' + message);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('createPostModal');
    if (modal && event.target === modal) {
        closeCreatePostModal();
    }
};
