/**
 * Leaderboard Page Logic
 * Fetches and displays top users from Firestore with real-time updates
 */

// Import progress service
let progressService = null;

// Demo data for when Firestore is not available
const demoLeaderboardData = [
    { id: '1', displayName: 'Alex Johnson', email: 'alex@example.com', totalCompleted: 87, completedDays: Array.from({length: 87}, (_, i) => i + 1) },
    { id: '2', displayName: 'Sarah Chen', email: 'sarah@example.com', totalCompleted: 82, completedDays: Array.from({length: 82}, (_, i) => i + 1) },
    { id: '3', displayName: 'Mike Rodriguez', email: 'mike@example.com', totalCompleted: 76, completedDays: Array.from({length: 76}, (_, i) => i + 1) },
    { id: '4', displayName: 'Emily Davis', email: 'emily@example.com', totalCompleted: 71, completedDays: Array.from({length: 71}, (_, i) => i + 1) },
    { id: '5', displayName: 'James Wilson', email: 'james@example.com', totalCompleted: 65, completedDays: Array.from({length: 65}, (_, i) => i + 1) },
    { id: '6', displayName: 'Lisa Anderson', email: 'lisa@example.com', totalCompleted: 58, completedDays: Array.from({length: 58}, (_, i) => i + 1) },
    { id: '7', displayName: 'David Brown', email: 'david@example.com', totalCompleted: 52, completedDays: Array.from({length: 52}, (_, i) => i + 1) },
    { id: '8', displayName: 'Emma Taylor', email: 'emma@example.com', totalCompleted: 45, completedDays: Array.from({length: 45}, (_, i) => i + 1) },
    { id: '9', displayName: 'Chris Martinez', email: 'chris@example.com', totalCompleted: 38, completedDays: Array.from({length: 38}, (_, i) => i + 1) },
    { id: '10', displayName: 'Sophie Lee', email: 'sophie@example.com', totalCompleted: 31, completedDays: Array.from({length: 31}, (_, i) => i + 1) },
];

// Current user data
let currentUserId = null;
let leaderboardData = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Try to load progress service
    try {
        const module = await import('../core/progressService.js');
        progressService = module.progressService;
    } catch (error) {
        console.warn('Progress service not available, using demo data:', error);
    }

    // Get current user info
    currentUserId = localStorage.getItem('user_id') || null;
    
    // Initialize leaderboard
    await initializeLeaderboard();
    
    // Setup search functionality
    setupSearch();
});

/**
 * Initialize the leaderboard with data
 */
async function initializeLeaderboard() {
    showLoading(true);
    
    try {
        // Try to fetch from Firestore
        if (progressService) {
            leaderboardData = await progressService.getTopUsers(50);
        }
        
        // If no data from Firestore, use demo data
        if (!leaderboardData || leaderboardData.length === 0) {
            leaderboardData = getDemoDataWithCurrentUser();
        }
        
        // Render everything
        renderStats();
        renderPodium();
        renderLeaderboardRows();
        renderUserRank();
        
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        // Fall back to demo data
        leaderboardData = getDemoDataWithCurrentUser();
        renderStats();
        renderPodium();
        renderLeaderboardRows();
        renderUserRank();
    } finally {
        showLoading(false);
    }
}

/**
 * Get demo data with current user included
 */
function getDemoDataWithCurrentUser() {
    const data = [...demoLeaderboardData];
    
    // Add current user's progress from localStorage
    const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
    const userName = localStorage.getItem('user_name') || 'You';
    const userEmail = localStorage.getItem('user_email') || 'user@example.com';
    
    if (completedDays.length > 0) {
        data.push({
            id: 'current-user',
            displayName: userName,
            email: userEmail,
            totalCompleted: completedDays.length,
            completedDays: completedDays
        });
        
        // Sort by totalCompleted
        data.sort((a, b) => b.totalCompleted - a.totalCompleted);
    }
    
    return data;
}

/**
 * Show/hide loading state
 */
function showLoading(show) {
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    
    if (loadingState) loadingState.style.display = show ? 'flex' : 'none';
    if (emptyState) emptyState.style.display = 'none';
}

/**
 * Render statistics
 */
function renderStats() {
    const totalParticipants = document.getElementById('totalParticipants');
    const avgCompletion = document.getElementById('avgCompletion');
    const topScore = document.getElementById('topScore');
    
    if (leaderboardData.length === 0) {
        if (totalParticipants) totalParticipants.textContent = '0';
        if (avgCompletion) avgCompletion.textContent = '0%';
        if (topScore) topScore.textContent = '0';
        return;
    }
    
    const total = leaderboardData.length;
    const avgComplete = Math.round(
        leaderboardData.reduce((sum, user) => sum + (user.totalCompleted || 0), 0) / total
    );
    const maxScore = Math.max(...leaderboardData.map(u => u.totalCompleted || 0));
    
    if (totalParticipants) totalParticipants.textContent = total.toLocaleString();
    if (avgCompletion) avgCompletion.textContent = `${avgComplete}%`;
    if (topScore) topScore.textContent = maxScore.toString();
}

/**
 * Render the top 3 podium
 */
function renderPodium() {
    const podiumSection = document.getElementById('podiumSection');
    if (!podiumSection) return;
    
    const top3 = leaderboardData.slice(0, 3);
    
    if (top3.length === 0) {
        podiumSection.innerHTML = '<p style="color: var(--text-secondary);">No participants yet!</p>';
        return;
    }
    
    const positions = ['second', 'first', 'third'];
    const emojis = ['🥈', '🥇', '🥉'];
    
    podiumSection.innerHTML = top3.map((user, index) => {
        const position = positions[index] || '';
        const initial = getInitials(user.displayName || user.email);
        const percentage = Math.round((user.totalCompleted / 100) * 100);
        
        return `
            <div class="podium-card ${position}">
                <div class="podium-rank">${emojis[index]}</div>
                <div class="podium-avatar" style="background: ${getAvatarColor(index)}">${initial}</div>
                <div class="podium-name">${escapeHtml(user.displayName || 'Anonymous')}</div>
                <div class="podium-score"><span>${user.totalCompleted}</span> / 100 days</div>
            </div>
        `;
    }).join('');
}

/**
 * Render leaderboard table rows
 */
function renderLeaderboardRows(filterTerm = '') {
    const container = document.getElementById('leaderboardRows');
    const emptyState = document.getElementById('emptyState');
    
    if (!container) return;
    
    // Filter data if search term provided
    let filteredData = leaderboardData;
    if (filterTerm) {
        const term = filterTerm.toLowerCase();
        filteredData = leaderboardData.filter(user => 
            (user.displayName && user.displayName.toLowerCase().includes(term)) ||
            (user.email && user.email.toLowerCase().includes(term))
        );
    }
    
    if (filteredData.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    // Skip top 3 if not filtering (they're shown in podium)
    const startIndex = filterTerm ? 0 : 3;
    const displayData = filteredData.slice(startIndex);
    
    container.innerHTML = displayData.map((user, idx) => {
        const rank = filterTerm ? idx + 1 : idx + 4; // Adjust rank based on context
        const initial = getInitials(user.displayName || user.email);
        const percentage = Math.round((user.totalCompleted / 100) * 100);
        const isCurrentUser = user.id === 'current-user' || user.id === currentUserId;
        
        return `
            <div class="leaderboard-row ${isCurrentUser ? 'current-user' : ''}">
                <div class="rank-cell">#${rank}</div>
                <div class="user-cell">
                    <div class="user-avatar-sm" style="background: ${getAvatarColor(rank)}">${initial}</div>
                    <div class="user-info">
                        <span class="user-name">${escapeHtml(user.displayName || 'Anonymous')}</span>
                        <span class="user-email">${maskEmail(user.email)}</span>
                    </div>
                </div>
                <div class="progress-cell">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="progress-text">${percentage}%</span>
                </div>
                <div class="score-cell">${user.totalCompleted}</div>
            </div>
        `;
    }).join('');
}

/**
 * Render current user's rank
 */
function renderUserRank() {
    const card = document.getElementById('yourRankCard');
    const rankEl = document.getElementById('yourRank');
    const progressEl = document.getElementById('yourProgress');
    const progressBar = document.getElementById('yourProgressBar');
    const progressText = document.getElementById('yourProgressText');
    
    // Get current user's data
    const completedDays = JSON.parse(localStorage.getItem('completedDays') || '[]');
    
    if (completedDays.length === 0) {
        if (card) card.style.display = 'none';
        return;
    }
    
    // Find user's rank
    const userRank = leaderboardData.findIndex(u => 
        u.id === 'current-user' || u.id === currentUserId
    ) + 1;
    
    const percentage = Math.round((completedDays.length / 100) * 100);
    
    if (card) card.style.display = 'flex';
    if (rankEl) rankEl.textContent = userRank > 0 ? `#${userRank}` : '--';
    if (progressEl) {
        const remaining = 100 - completedDays.length;
        progressEl.textContent = remaining > 0 
            ? `${remaining} more projects to go! Keep it up! 🚀`
            : 'Congratulations! You completed the challenge! 🎉';
    }
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${percentage}%`;
}

/**
 * Setup search functionality
 */
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const term = e.target.value.trim();
            renderLeaderboardRows(term);
            
            // Hide/show podium based on search
            const podiumSection = document.getElementById('podiumSection');
            if (podiumSection) {
                podiumSection.style.display = term ? 'none' : 'flex';
            }
        }, 300);
    });
}

/**
 * Get initials from name or email
 */
function getInitials(str) {
    if (!str) return '?';
    const parts = str.split(/[@\s]+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.substring(0, 2).toUpperCase();
}

/**
 * Get avatar background color based on rank
 */
function getAvatarColor(index) {
    const colors = [
        '#FFD700', // Gold
        '#C0C0C0', // Silver  
        '#CD7F32', // Bronze
        '#EA580C', // Orange
        '#DC2626', // Red
        '#7C3AED', // Purple
        '#2563EB', // Blue
        '#059669', // Green
        '#D97706', // Amber
        '#EC4899', // Pink
    ];
    return colors[index % colors.length];
}

/**
 * Mask email for privacy
 */
function maskEmail(email) {
    if (!email) return '';
    const [name, domain] = email.split('@');
    if (!domain) return email;
    const maskedName = name.length > 2 
        ? name[0] + '***' + name[name.length - 1]
        : name[0] + '***';
    return `${maskedName}@${domain}`;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Export for potential use
export { initializeLeaderboard, renderLeaderboardRows };
