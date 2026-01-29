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

async function fetchContributors() {
    const grid = document.getElementById('contributorsGrid');

    try {
        // Show loading state
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);"><p>Loading crew manifest...</p></div>';

        const contributors = await fetchWithRetry(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`,
            { headers: { 'Accept': 'application/vnd.github.v3+json' } }
        );

        // Validate response data
        if (!Array.isArray(contributors) || contributors.length === 0) {
            throw new Error('Invalid response: no contributors found');
        }

        // Clear placeholder
        grid.innerHTML = '';

        // Sort by contributions (descending)
        contributors.sort((a, b) => b.contributions - a.contributions);

        contributors.forEach((user, index) => {
            // Validate required fields
            if (!user.login || !user.avatar_url || !user.html_url) {
                console.warn('Skipping contributor with missing data:', user);
                return;
            }

            const card = document.createElement('div');
            card.className = 'card animate-enter';
            card.style.textAlign = 'center';
            card.style.animationDelay = `${index * 50}ms`;

            card.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img class="avatar" src="${user.avatar_url}" 
                         alt="${user.login}" 
                         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px; border: 2px solid var(--glass-border);"
                         onerror="this.src='https://api.github.com/identicons/${user.login}'">
                    ${index < 3 ? `<span style="position: absolute; bottom: 10px; right: -5px; background: var(--accent-core); color: black; font-size: 10px; padding: 2px 6px; border-radius: 10px; font-weight: bold;">#${index + 1}</span>` : ''}
                </div>
                
                <h4 style="margin-bottom: 4px;">${user.login}</h4>
                <p class="text-flame" style="font-size: var(--text-sm); font-weight: bold;">
                    ${user.contributions} Contributions
                </p>
                <a href="${user.html_url}" target="_blank" class="btn btn-social" style="margin-top: 12px; width: 100%; justify-content: center; font-size: 0.8rem;">
                    View Profile
                </a>
            `;

            grid.appendChild(card);
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
