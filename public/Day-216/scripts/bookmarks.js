/**
 * Universe Bookmark and State Persistence
 */

class BookmarkManager {
    constructor() {
        this.bookmarks = JSON.parse(localStorage.getItem('nebula_bookmarks') || '[]');
    }

    save(name, x, y, zoom) {
        const b = { name, x, y, zoom, id: Date.now() };
        this.bookmarks.push(b);
        localStorage.setItem('nebula_bookmarks', JSON.stringify(this.bookmarks));
        this.renderList();
    }

    delete(id) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== id);
        localStorage.setItem('nebula_bookmarks', JSON.stringify(this.bookmarks));
        this.renderList();
    }

    renderList() {
        const container = document.getElementById('bookmark-list');
        if (!container) return;

        container.innerHTML = '';
        this.bookmarks.forEach(b => {
            const el = document.createElement('div');
            el.className = 'bookmark-item';
            el.innerHTML = `
                <span>${b.name}</span>
                <div class="actions">
                    <button onclick="window.app.goto(${b.x}, ${b.y}, ${b.zoom})">GO</button>
                    <button onclick="window.app.bookmarks.delete(${b.id})">×</button>
                </div>
            `;
            container.appendChild(el);
        });
    }
}

window.BookmarkManager = BookmarkManager;
