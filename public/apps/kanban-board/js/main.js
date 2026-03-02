/**
 * Main Application Entry Point
 * Bootstraps the Kanban Board
 */

import { store } from './state/store.js';
import { DragManager } from './drag-drop/dragManager.js';
import { ColumnComponent } from './components/column.js';

class App {
    constructor() {
        this.boardContainer = document.getElementById('boardContainer');
        this.searchInput = document.getElementById('searchInput');
        this.currentSearch = '';

        // Modal elements
        this.modal = document.getElementById('taskModal');
        this.currentEditingTask = null;

        this.init();
    }

    init() {
        // Initialize Drag Manager
        new DragManager();

        // Subscribe to store updates
        store.subscribe(this.handleStateChange.bind(this));

        // Initial Render
        this.render();

        // Bind global events
        this.bindEvents();
    }

    bindEvents() {
        // Add Column Button
        document.getElementById('addColumnBtn').addEventListener('click', () => {
            const title = prompt('Column Title:');
            if (title && title.trim()) {
                store.addColumn(title.trim());
            }
        });

        // Reset Board
        document.getElementById('resetBoardBtn').addEventListener('click', () => {
            if (confirm('Are you sure you want to reset the board? All data will be lost.')) {
                store.resetBoard();
            }
        });

        // Search
        this.searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.render();
        });

        // Modal: Edit Task Event (Delegated from Card Component)
        document.addEventListener('edit-task', (e) => {
            this.openModal(e.detail);
        });

        // Modal: Close
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModal());
        });

        // Modal: Save
        document.getElementById('saveTaskBtn').addEventListener('click', () => {
            this.saveTaskChanges();
        });

        // Modal: Delete
        document.getElementById('deleteTaskBtn').addEventListener('click', () => {
            if (this.currentEditingTask && confirm('Delete this task?')) {
                store.deleteTask(this.currentEditingTask.id);
                this.closeModal();
            }
        });

        // Color Picker in Modal
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(opt => {
            opt.addEventListener('click', (e) => {
                colorOptions.forEach(o => o.classList.remove('selected'));
                e.target.classList.add('selected');
            });
        });
    }

    handleStateChange(state, event, payload) {
        // Optimally we'd do DOM diffing, but for this scale, full re-render is acceptable and safer
        // console.log('State changed:', event, payload);
        this.render();

        // Show toast for certain events
        if (['TASK_ADDED', 'COLUMN_ADDED', 'TASK_DELETED'].includes(event)) {
            // You could add specific messages here
        }
    }

    render() {
        const state = store.getState();
        this.boardContainer.innerHTML = '';

        state.columns.forEach(column => {
            // Filter tasks for this column based on ID and Search
            const colTasks = state.tasks.filter(task => {
                const matchesColumn = task.columnId === column.id;
                const matchesSearch = !this.currentSearch ||
                    task.title.toLowerCase().includes(this.currentSearch) ||
                    (task.desc && task.desc.toLowerCase().includes(this.currentSearch));
                return matchesColumn && matchesSearch;
            });

            const colEl = ColumnComponent.create(column, colTasks);
            this.boardContainer.appendChild(colEl);
        });
    }

    openModal(task) {
        this.currentEditingTask = task;
        const modalTitle = document.getElementById('modalTitle');
        const titleInput = document.getElementById('taskTitle');
        const descInput = document.getElementById('taskDesc');
        const colorOptions = document.querySelectorAll('.color-option');

        modalTitle.textContent = 'Edit Task';
        titleInput.value = task.title;
        descInput.value = task.desc || '';

        // set color selection
        colorOptions.forEach(opt => {
            opt.classList.remove('selected');
            if (opt.dataset.color === task.color) {
                opt.classList.add('selected');
            }
        });

        this.modal.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.currentEditingTask = null;
    }

    saveTaskChanges() {
        if (!this.currentEditingTask) return;

        const title = document.getElementById('taskTitle').value;
        const desc = document.getElementById('taskDesc').value;
        const selectedColorBtn = document.querySelector('.color-option.selected');
        const color = selectedColorBtn ? selectedColorBtn.dataset.color : '#3b82f6';

        if (!title.trim()) {
            alert('Title is required');
            return;
        }

        store.updateTask(this.currentEditingTask.id, {
            title: title.trim(),
            desc: desc.trim(),
            color
        });

        this.closeModal();
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
