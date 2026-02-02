/**
 * Achievements Page Logic
 */

import { achievementService } from '../core/achievementService.js';

document.addEventListener('DOMContentLoaded', () => {
    renderAchievements();
});

function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    const achievements = achievementService.getAllAchievements();
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    // Update stats
    document.getElementById('statUnlocked').textContent = unlockedCount;
    document.getElementById('statPoints').textContent = unlockedCount * 150; // Each badge = 150 rep
    document.getElementById('statTotal').textContent = Math.round((unlockedCount / achievements.length) * 100) + '%';

    grid.innerHTML = '';

    achievements.forEach((achievement, index) => {
        const card = document.createElement('div');
        card.className = `achievement-card ${achievement.unlocked ? 'unlocked' : ''}`;
        card.style.transitionDelay = `${index * 50}ms`;

        card.innerHTML = `
            <div class="unlock-badge">Unlocked</div>
            <div class="achievement-icon">${achievement.icon}</div>
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-desc">${achievement.description}</p>
            <button class="share-btn" onclick="window.shareAchievement('${achievement.title}')">
                <i class="fas fa-share-alt"></i> Share
            </button>
        `;

        grid.appendChild(card);
    });
}

// Global share helper
window.shareAchievement = (title) => {
    const text = `I just earned the "${title}" badge in the 100 Days of Web Development challenge! 🚀 Join me at zenith.dev #100DaysOfWebDev #ECWoC26`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
};
