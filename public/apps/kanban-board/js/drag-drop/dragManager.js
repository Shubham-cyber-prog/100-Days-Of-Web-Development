/**
 * Drag and Drop Manager
 * Handles complex drag interactions and drop logic
 */

import { store } from '../state/store.js';

export class DragManager {
    constructor() {
        this.boardContainer = document.getElementById('boardContainer');
        this.init();
    }

    init() {
        // Event delegation for drop zones (task lists)
        this.boardContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        this.boardContainer.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.boardContainer.addEventListener('drop', this.handleDrop.bind(this));
    }

    handleDragOver(e) {
        e.preventDefault(); // Necessary to allow dropping

        const taskList = e.target.closest('.task-list');
        if (!taskList) return;

        // Visual feedback
        taskList.classList.add('drag-over');
        e.dataTransfer.dropEffect = 'move';
    }

    handleDragLeave(e) {
        const taskList = e.target.closest('.task-list');
        if (taskList) {
            taskList.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();

        const taskList = e.target.closest('.task-list');
        if (!taskList) return;

        // Cleanup visual feedback
        document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));

        const taskId = e.dataTransfer.getData('text/plain');
        const sourceColumnId = e.dataTransfer.getData('source-column');
        const targetColumnId = taskList.dataset.columnId;

        if (taskId && targetColumnId) {
            // Only update if the column changed (for now, simply moving between cols)
            // Reordering within the same column requires calculating index, 
            // which adds complexity. The requirement specifically asked for moving between columns.
            if (sourceColumnId !== targetColumnId) {
                store.moveTask(taskId, targetColumnId);
                this.showToast('Task moved successfully');
            }
        }
    }

    showToast(msg) {
        // Simple manual toast trigger if not using a centralized toast manager yet
        const container = document.getElementById('toastContainer');
        if (container) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = msg;
            container.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }
    }
}
