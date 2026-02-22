/**
 * Task Card Component
 * Renders individual task cards
 */

export class CardComponent {
    /**
     * Create a task card DOM element
     * @param {Object} task - Task data object
     * @returns {HTMLElement} The card element
     */
    static create(task) {
        const div = document.createElement('div');
        div.className = 'task-card';
        div.draggable = true;
        div.dataset.id = task.id;
        div.dataset.columnId = task.columnId;

        // Label Color
        const label = document.createElement('div');
        label.className = 'task-label';
        label.style.backgroundColor = task.color || '#3b82f6';

        // Title
        const title = document.createElement('div');
        title.className = 'task-title';
        title.textContent = task.title;

        // Description (optional)
        const desc = document.createElement('div');
        desc.className = 'task-desc';
        desc.textContent = task.desc || '';

        // Metadata (Date)
        const meta = document.createElement('div');
        meta.className = 'task-meta';
        const date = new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        meta.textContent = date;

        div.appendChild(label);
        div.appendChild(title);
        if (task.desc) div.appendChild(desc);
        div.appendChild(meta);

        // Click event to open edit modal
        div.addEventListener('click', (e) => {
            // Emit custom event for main app to handle
            const event = new CustomEvent('edit-task', {
                detail: task,
                bubbles: true
            });
            div.dispatchEvent(event);
        });

        // Initialize drag events
        div.addEventListener('dragstart', (e) => {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', task.id);
            e.dataTransfer.setData('source-column', task.columnId);

            // Add dragging class for styling
            setTimeout(() => div.classList.add('dragging'), 0);
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });

        return div;
    }
}
