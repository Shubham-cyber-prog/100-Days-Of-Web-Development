/**
 * Zenith Contributors Loader
 * Fetches contributors from the upstream repository.
 */

const REPO_OWNER = 'Shubham-cyber-prog';
const REPO_NAME = '100-Days-Of-Web-Development-ECWoC26';

async function fetchContributors() {
    const grid = document.getElementById('contributorsGrid');

    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);

        if (!response.ok) throw new Error('Failed to fetch crew manifest');

        const contributors = await response.json();

        // Clear placeholder
        grid.innerHTML = '';

        // Sort already happens by API (descending contributions), but safety check
        contributors.sort((a, b) => b.contributions - a.contributions);

        contributors.forEach((user, index) => {
            const card = document.createElement('div');
            card.className = 'card animate-enter';
            card.style.textAlign = 'center';
            card.style.animationDelay = `${index * 50}ms`; // Stagger effect

            card.innerHTML = `
                <div style="position: relative; display: inline-block;">
                    <img src="${user.avatar_url}" 
                         alt="${user.login}" 
                         style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 16px; border: 2px solid var(--glass-border);">
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
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">
                <h3>Transmission Interrupted</h3>
                <p>Unable to retrieve crew manifest. Please retry later.</p>
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', fetchContributors);
