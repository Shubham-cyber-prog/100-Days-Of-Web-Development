/**
 * Viewport History and Bookmark Management
 */

class ViewportHistory {
    constructor() {
        this.history = [];
        this.currentIndex = -1;
        this.maxHistory = 50;
    }

    push(view) {
        // Remove forward history if we are in the middle
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }

        // Deep copy view
        const entry = JSON.parse(JSON.stringify(view));
        this.history.push(entry);

        if (this.history.length > this.maxHistory) {
            this.history.shift();
        } else {
            this.currentIndex++;
        }
    }

    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }

    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }

    clear() {
        this.history = [];
        this.currentIndex = -1;
    }
}

window.ViewportHistory = ViewportHistory;
