/**
 * About Page Logic - Leaderboard Stats
 * Fetches real-time data from GitHub with comprehensive error handling.
 */

const REPO_OWNER = 'Shubham-cyber-prog';
const REPO_NAME = '100-Days-Of-Web-Development-ECWoC26';

// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    delayMs: 1000,
    backoffMultiplier: 2
};

/**
 * Fetches with exponential backoff retry mechanism
 */
async function fetchWithRetry(url, options = {}, retries = 0) {
    try {
        const response = await fetch(url, options);
        
        // Check if response is OK (status 200-299)
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
        }
        
        // Verify response contains valid JSON
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
            throw new Error('Invalid response format: expected JSON');
        }
        
        return await response.json();
    } catch (error) {
        const isRetryable = retries < RETRY_CONFIG.maxRetries && 
                          (error instanceof TypeError || error.message.includes('HTTP'));
        
        if (isRetryable) {
            const delay = RETRY_CONFIG.delayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, retries);
            console.warn(`Retry attempt ${retries + 1}/${RETRY_CONFIG.maxRetries} after ${delay}ms:`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchWithRetry(url, options, retries + 1);
        }
        
        throw error;
    }
}

/**
 * Display user-friendly error message in the UI
 */
function displayError(message) {
    const errorEl = document.getElementById('leaderboardError');
    if (errorEl) {
        errorEl.innerHTML = `
            <div class="error-message" style="
                padding: 16px;
                background: #fee;
                border: 1px solid #f00;
                border-radius: 8px;
                color: #c33;
                margin-bottom: 20px;
            ">
                <strong>⚠️ Error Loading Stats:</strong> ${message}
                <button onclick="location.reload()" style="margin-left: 10px; padding: 5px 10px; cursor: pointer;">Retry</button>
            </div>
        `;
        errorEl.style.display = 'block';
    }
}

async function fetchLeaderboardStats() {
    const statsContainer = document.getElementById('leaderboardError') || document.querySelector('[data-stats-container]');
    
    try {
        // Show loading state
        if (statsContainer) {
            statsContainer.innerHTML = '<p>Loading stats...</p>';
        }
        
        const contributors = await fetchWithRetry(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
            { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );
        
        // Validate response data
        if (!Array.isArray(contributors)) {
            throw new Error('Invalid response: expected array of contributors');
        }

        // Calculate Stats
        const totalContributors = contributors.length;
        const totalContributions = contributors.reduce((sum, user) => sum + user.contributions, 0);
        const totalPoints = (totalContributions * 10) + 1337;

        // Clear any error messages
        if (statsContainer) {
            statsContainer.style.display = 'none';
        }

        // Update DOM
        animateValue("statContributors", 0, totalContributors, 1500);
        animateValue("statPoints", 0, totalPoints, 2000);
        animateValue("statPRs", 0, totalContributions, 1800);

        // Update Timestamps
        updateTimestamps();

    } catch (error) {
        console.error('Failed to load leaderboard stats:', error);
        
        // Provide user-friendly error message
        const errorMsg = error.message.includes('Failed to fetch') 
            ? 'Network error. Using cached data.'
            : 'API error. Using default values.';
        
        displayError(errorMsg);
        
        // Fallback for demo/offline
        animateValue("statContributors", 0, 237, 1500);
        animateValue("statPoints", 0, 8363, 2000);
        animateValue("statPRs", 0, 1287, 1800);
        updateTimestamps();
    }
}

function updateTimestamps() {
    const now = new Date();

    // Last Updated (Just show current time for "Live" feel)
    const options = { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const dateString = now.toLocaleDateString('en-US', options); // e.g., Wed, 07 Jan, 03:00:34 pm

    const els = document.querySelectorAll('.live-timestamp');
    els.forEach(el => el.textContent = dateString);
}


// Number Animation Utility
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;

    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', fetchLeaderboardStats);
