/**
 * Favorites Manager
 * Displays projects saved by the user
 */

import { projectModal } from '../components/ProjectModal.js';

document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();

    // Listen for storage changes (in case modal removes fav)
    window.addEventListener('storage', (e) => {
        if (e.key === 'zenith_favorites') {
            renderFavorites();
        }
    });

    // Re-render when modal closes (internal state might have changed)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const overlay = document.querySelector('.project-modal-overlay');
                if (overlay && !overlay.classList.contains('active')) {
                    renderFavorites();
                }
            }
        });
    });

    // Wait for modal to be initialized then observe
    setTimeout(() => {
        const overlay = document.querySelector('.project-modal-overlay');
        if (overlay) {
            observer.observe(overlay, { attributes: true });
        }
    }, 1000);
});

function renderFavorites() {
    const grid = document.getElementById('favoritesGrid');
    const emptyState = document.getElementById('emptyState');
    const favorites = JSON.parse(localStorage.getItem('zenith_favorites') || '[]');

    if (favorites.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    emptyState.style.display = 'none';
    grid.innerHTML = '';

    favorites.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card animate-enter';
        card.style.animationDelay = `${index * 50}ms`;

        const techTags = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        card.innerHTML = `
            <div class="card-top">
                <span class="text-flame" style="font-size: 0.75rem; font-weight: bold;">
                    ${project.difficulty} • DAY ${project.day}
                </span>
                <button class="favorite-btn active" style="background:none; border:none; color:#f59e0b; cursor:pointer;" onclick="event.stopPropagation(); window.removeFavorite(${project.day})">
                    <i class="fas fa-star"></i>
                </button>
            </div>
            <h3 style="font-size: 1.1rem; color: white; margin-bottom: 0.5rem;">${project.title}</h3>
            <div class="tech-stack">${techTags}</div>
        `;

        card.addEventListener('click', () => {
            projectModal.show({
                ...project,
                time: project.day <= 30 ? '1-2 hours' : project.day <= 60 ? '3-5 hours' : '8+ hours'
            });
        });

        grid.appendChild(card);
    });
}

// Global helper for simple removal from card icon
window.removeFavorite = (day) => {
    const favorites = JSON.parse(localStorage.getItem('zenith_favorites') || '[]');
    const newFavs = favorites.filter(f => f.day !== day);
    localStorage.setItem('zenith_favorites', JSON.stringify(newFavs));
    renderFavorites();
    if (window.Notify) window.Notify.info('Removed from favorites');
};
