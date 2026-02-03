/**
 * State Management (Pub/Sub Pattern)
 * Central store for the Kanban board data
 */

import { Storage } from '../utils/storage.js';

class Store {
    constructor() {
        this.subscribers = [];
        this.state = this.getInitialState();
    }

    /**
     * Initialize state from storage or defaults
     */
    getInitialState() {
        const saved = Storage.load();
        if (saved) return saved;

        return {
            columns: [
                { id: 'col-1', title: 'To Do' },
                { id: 'col-2', title: 'In Progress' },
                { id: 'col-3', title: 'Done' }
            ],
            tasks: [
                { id: 'task-1', title: 'Welcome to KanbanFlow', desc: 'Try dragging this card around!', columnId: 'col-1', color: '#3b82f6', createdAt: Date.now() }
            ]
        };
    }

    /**
     * Subscribe to state changes
     * @param {Function} callback 
     */
    subscribe(callback) {
        this.subscribers.push(callback);
    }

    /**
     * Notify all subscribers
     * @param {string} event - Event type
     * @param {Object} payload - Data payload
     */
    notify(event, payload) {
        this.subscribers.forEach(callback => callback(this.state, event, payload));
        Storage.save(this.state);
    }

    // --- Actions ---

    addColumn(title) {
        const newColumn = {
            id: `col-${Date.now()}`,
            title
        };
        this.state.columns.push(newColumn);
        this.notify('COLUMN_ADDED', newColumn);
    }

    removeColumn(columnId) {
        this.state.columns = this.state.columns.filter(col => col.id !== columnId);
        // Also remove tasks in this column
        this.state.tasks = this.state.tasks.filter(task => task.columnId !== columnId);
        this.notify('COLUMN_REMOVED', columnId);
    }

    addTask(title, columnId, color = '#3b82f6') {
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            desc: '',
            columnId,
            color,
            createdAt: Date.now()
        };
        this.state.tasks.push(newTask);
        this.notify('TASK_ADDED', newTask);
    }

    updateTask(taskId, updates) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            this.notify('TASK_UPDATED', task);
        }
    }

    moveTask(taskId, targetColumnId) {
        const task = this.state.tasks.find(t => t.id === taskId);
        if (task && task.columnId !== targetColumnId) {
            task.columnId = targetColumnId;
            this.notify('TASK_MOVED', task);
        }
    }

    deleteTask(taskId) {
        this.state.tasks = this.state.tasks.filter(t => t.id !== taskId);
        this.notify('TASK_DELETED', taskId);
    }

    resetBoard() {
        Storage.clear();
        this.state = this.getInitialState();
        // Since getInitialState might default if clear worked, we simply reload defaults logic
        // But better to just reset to hardcoded defaults here to be sure
        this.state = {
            columns: [
                { id: 'col-1', title: 'To Do' },
                { id: 'col-2', title: 'In Progress' },
                { id: 'col-3', title: 'Done' }
            ],
            tasks: []
        };
        this.notify('BOARD_RESET', null);
    }

    getState() {
        return this.state;
    }
}

export const store = new Store();
