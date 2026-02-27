document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;

    const originalPlaceholder = searchInput.placeholder;
    searchInput.placeholder = 'Search by title, tech, or day number...';

    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase();

        searchTimeout = setTimeout(() => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach(card => {
                const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
                const techTags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
                const dayLabel = card.querySelector('.text-flame')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.project-description')?.textContent.toLowerCase() || '';

                const matches = title.includes(query) ||
                               techTags.includes(query) ||
                               dayLabel.includes(query) ||
                               description.includes(query);

                card.style.display = matches ? '' : 'none';
            });
        }, 300);
    });
});
