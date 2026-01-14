/**
 * About Page Logic - Leaderboard Stats
 * Fetches real-time data from GitHub.
 */

const REPO_OWNER = 'Shubham-cyber-prog';
const REPO_NAME = '100-Days-Of-Web-Development-ECWoC26';

async function fetchLeaderboardStats() {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`);
        if (!response.ok) throw new Error('API Error');

        const contributors = await response.json();

        // Calculate Stats
        const totalContributors = contributors.length;
        const totalContributions = contributors.reduce((sum, user) => sum + user.contributions, 0);
        // "Total Points" simulation: contributions * 10 + random offset for "gaming" feel
        const totalPoints = (totalContributions * 10) + 1337;

        // Update DOM
        animateValue("statContributors", 0, totalContributors, 1500);
        animateValue("statPoints", 0, totalPoints, 2000);
        animateValue("statPRs", 0, totalContributions, 1800); // Using contributions as PR proxy

        // Update Timestamps
        updateTimestamps();

    } catch (error) {
        // Fallback for demo/offline
        document.getElementById("statContributors").textContent = "237";
        document.getElementById("statPoints").textContent = "8,363";
        document.getElementById("statPRs").textContent = "1,287";
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
