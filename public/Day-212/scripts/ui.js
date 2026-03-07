/**
 * Fractal UI and Interaction
 */

class UIController {
    constructor(engine) {
        this.engine = engine;
        this.history = new ViewportHistory();
        this.isDragging = false;
        this.lastMouse = { x: 0, y: 0 };
        this.bookmarks = JSON.parse(localStorage.getItem('fractal_bookmarks') || '[]');

        // Initial history state
        this.history.push(this.engine.view);

        this.initEvents();
        this.updateHUD();
        this.renderBookmarks();
    }

    initEvents() {
        window.addEventListener('resize', () => this.engine.resize());

        this.engine.canvas.addEventListener('wheel', (e) => {
            const factor = e.deltaY > 0 ? 1.1 : 0.9;
            this.engine.zoom(e.clientX, e.clientY, factor);
            this.history.push(this.engine.view);
            this.updateHUD();
        });

        this.engine.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouse = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            const dx = e.clientX - this.lastMouse.x;
            const dy = e.clientY - this.lastMouse.y;
            this.engine.pan(dx, dy);
            this.lastMouse = { x: e.clientX, y: e.clientY };
            this.updateHUD();
        });

        // Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'z') {
                const view = this.history.undo();
                if (view) {
                    this.engine.view = JSON.parse(JSON.stringify(view));
                    this.engine.render();
                    this.updateHUD();
                }
            }
            if (e.ctrlKey && e.key === 'y') {
                const view = this.history.redo();
                if (view) {
                    this.engine.view = JSON.parse(JSON.stringify(view));
                    this.engine.render();
                    this.updateHUD();
                }
            }
        });


        window.addEventListener('mouseup', () => {
            if (this.isDragging) {
                this.history.push(this.engine.view);
            }
            this.isDragging = false;
        });

        // Control Panel
        document.getElementById('fractal-type').addEventListener('change', (e) => {
            this.engine.view.type = e.target.value;
            const juliaControls = document.getElementById('julia-controls');
            juliaControls.style.display = e.target.value === 'julia' ? 'block' : 'none';
            this.engine.render();
        });

        document.getElementById('julia-r').addEventListener('input', (e) => {
            this.engine.view.juliaC.r = parseFloat(e.target.value);
            this.engine.render();
        });

        document.getElementById('julia-i').addEventListener('input', (e) => {
            this.engine.view.juliaC.i = parseFloat(e.target.value);
            this.engine.render();
        });

        document.getElementById('palette-type').addEventListener('change', (e) => {
            this.engine.coloring.setPalette(e.target.value);
            this.engine.render();
        });

        document.getElementById('iterations').addEventListener('input', (e) => {
            this.engine.view.maxIter = parseInt(e.target.value);
            document.getElementById('iter-val').textContent = e.target.value;
        });

        document.getElementById('iterations').addEventListener('change', () => {
            this.engine.render();
        });

        document.getElementById('add-bookmark').addEventListener('click', () => {
            this.saveBookmark();
        });

        document.getElementById('export-img').addEventListener('click', () => {
            this.engine.exportTo4K();
        });
    }

    saveBookmark() {
        const name = prompt('Bookmark name:', `View ${this.bookmarks.length + 1}`);
        if (!name) return;

        const bookmark = {
            name,
            view: JSON.parse(JSON.stringify(this.engine.view))
        };
        this.bookmarks.push(bookmark);
        localStorage.setItem('fractal_bookmarks', JSON.stringify(this.bookmarks));
        this.renderBookmarks();
    }

    renderBookmarks() {
        const list = document.getElementById('bookmark-list');
        list.innerHTML = '';
        this.bookmarks.forEach((b, i) => {
            const el = document.createElement('div');
            el.className = 'bookmark-item';
            el.innerHTML = `
                <span>${b.name}</span>
                <button onclick="window.ui.loadBookmark(${i})">Go</button>
            `;
            list.appendChild(el);
        });
    }

    loadBookmark(index) {
        const b = this.bookmarks[index];
        this.engine.view = JSON.parse(JSON.stringify(b.view));
        this.engine.render();
        this.updateHUD();
    }

    updateHUD() {
        const zoom = 1 / (this.engine.view.maxR - this.engine.view.minR);
        document.getElementById('zoom-val').textContent = zoom.toExponential(2);
        document.getElementById('coord-val').textContent =
            `${((this.engine.view.minR + this.engine.view.maxR) / 2).toFixed(6)}, ${((this.engine.view.minI + this.engine.view.maxI) / 2).toFixed(6)}i`;
    }

    exportImage() {
        const link = document.createElement('a');
        link.download = 'fractal_export.png';
        link.href = this.engine.canvas.toDataURL('image/png');
        link.click();
    }
}

window.UIController = UIController;
