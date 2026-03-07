/**
 * Zenith Contributors Loader
 * Fetches contributors from the upstream repository with comprehensive error handling.
 */

const REPO_OWNER = 'Shubham-cyber-prog';
const REPO_NAME = '100-Days-Of-Web-Development-ECWoC26';

// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    delayMs: 1000,
    backoffMultiplier: 2
};

// Cache for contributor stats to avoid rate limiting
const statsCache = new Map();

/**
 * Fetches with exponential backoff retry mechanism
 */
async function fetchWithRetry(url, options = {}, retries = 0) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`);
        }
        
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
 * Fetches PR and issue counts for a contributor
 */
async function fetchContributorStats(username) {
    // Check cache first
    if (statsCache.has(username)) {
        return statsCache.get(username);
    }

    try {
        // Fetch PRs and Issues in parallel
        const [prs, issues] = await Promise.all([
            fetchWithRetry(
                `https://api.github.com/search/issues?q=type:pr+author:${username}+repo:${REPO_OWNER}/${REPO_NAME}`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            ),
            fetchWithRetry(
                `https://api.github.com/search/issues?q=type:issue+author:${username}+repo:${REPO_OWNER}/${REPO_NAME}`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            )
        ]);

        const stats = {
            prs: prs.total_count || 0,
            issues: issues.total_count || 0
        };

        // Cache the results
        statsCache.set(username, stats);
        return stats;
    } catch (error) {
        console.warn(`Failed to fetch stats for ${username}:`, error);
        return { prs: 0, issues: 0 };
    }
}

async function fetchContributors() {
    const grid = document.getElementById('contributorsGrid');

    try {
        // Show loading state
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);"><p>🚀 Loading crew manifest...</p></div>';

        // Fetch all contributors with pagination
        let allContributors = [];
        let page = 1;
        const perPage = 100; // GitHub's max
        let hasMorePages = true;

        while (hasMorePages) {
            const contributors = await fetchWithRetry(
                `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=${perPage}&page=${page}&anon=1`,
                { headers: { 'Accept': 'application/vnd.github.v3+json' } }
            );

            // Validate response data
            if (!Array.isArray(contributors)) {
                throw new Error('Invalid response: expected array of contributors');
            }

            // If we got no contributors, stop
            if (contributors.length === 0) {
                break;
            }

            // Add contributors to the list
            allContributors = allContributors.concat(contributors);

            // Check if there are more pages
            // Continue fetching as long as we get the max per_page amount
            // If we got less than per_page, we've reached the last page
            hasMorePages = contributors.length === perPage;
            page++;
            
            // Safety check to prevent infinite loops (50 pages * 100 = 5000 max contributors)
            if (page > 50) {
                console.warn('Reached maximum page limit (50), stopping pagination');
                break;
            }
        }

        // Validate we have contributors
        if (allContributors.length === 0) {
            throw new Error('Invalid response: no contributors found');
        }

        // Log total count for debugging (can be disabled in production if needed)
        if (typeof console !== 'undefined' && console.log) {
            console.log(`✅ Successfully loaded ${allContributors.length} contributors`);
        }

        // Sort by contributions (descending)
        allContributors.sort((a, b) => b.contributions - a.contributions);

        // Clear placeholder and show initial cards
        grid.innerHTML = '';

        // Render cards immediately with loading placeholders for stats
        allContributors.forEach((user, index) => {
            // Validate required fields
            if (!user.login || !user.avatar_url || !user.html_url) {
                console.warn('Skipping contributor with missing data:', user);
                return;
            }

            const card = document.createElement('div');
            card.className = 'card animate-enter';
            card.style.textAlign = 'center';
            card.style.animationDelay = `${index * 50}ms`;
            card.id = `contributor-${user.login}`;

            card.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img class="avatar" src="${user.avatar_url}" 
                         alt="${user.login}" 
                         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px; border: 2px solid var(--glass-border);"
                         onerror="this.src='https://api.github.com/identicons/${user.login}'">
                    ${index < 3 ? `<span style="position: absolute; bottom: 10px; right: -5px; background: var(--accent-core); color: black; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: bold;">#${index + 1}</span>` : ''}
                </div>
                
                <h4 style="margin-bottom: 8px;">${user.login}</h4>
                
                <div style="display: flex; justify-content: center; gap: 12px; margin: 12px 0; font-size: var(--text-xs);">
                    <div style="text-align: center;">
                        <div style="font-weight: bold; color: var(--accent-core);" id="prs-${user.login}">...</div>
                        <div style="color: var(--text-secondary);">PRs</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-weight: bold; color: var(--accent-core);" id="issues-${user.login}">...</div>
                        <div style="color: var(--text-secondary);">Issues</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-weight: bold; color: var(--accent-core);">${user.contributions}</div>
                        <div style="color: var(--text-secondary);">Commits</div>
                    </div>
                </div>
                
                <a href="${user.html_url}" target="_blank" class="btn btn-social" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 0.8rem;">
                    👤 View Profile
                </a>
            `;

            grid.appendChild(card);

            // Fetch stats asynchronously
            fetchContributorStats(user.login).then(stats => {
                const prsEl = document.getElementById(`prs-${user.login}`);
                const issuesEl = document.getElementById(`issues-${user.login}`);
                if (prsEl) prsEl.textContent = stats.prs;
                if (issuesEl) issuesEl.textContent = stats.issues;
            });
        });

    } catch (error) {
        console.error('Failed to load contributors:', error);
        
        const errorMsg = error.message.includes('Failed to fetch') 
            ? 'Network error. Please check your connection.'
            : error.message.includes('HTTP 403') 
            ? 'API rate limit exceeded. Please try again later.'
            : 'Unable to retrieve crew manifest. Please retry.';
        
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">
                <h3>⚠️ Transmission Interrupted</h3>
                <p>${errorMsg}</p>
                <button onclick="fetchContributors()" style="
                    margin-top: 16px;
                    padding: 8px 16px;
                    background: var(--accent-core);
                    color: black;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                ">Retry</button>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchContributors);

// Search functionality for contributors
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('contributorSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        const cards = document.querySelectorAll('#contributorsGrid .card');

        cards.forEach(card => {
            const username = card.querySelector('h4')?.textContent.toLowerCase() || '';
            const matches = username.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = '';
                card.classList.add('animate-enter');
            } else {
                card.style.display = 'none';
            }
        });
    });
});
