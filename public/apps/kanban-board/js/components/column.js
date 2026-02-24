/**
 * Column Component
 * Renders the Kanban columns
 */

import { CardComponent } from './card.js';
import { store } from '../state/store.js';

export class ColumnComponent {
    /**
     * Create a column DOM element
     * @param {Object} column - Column data
     * @param {Array} tasks - Tasks belonging to this column
     * @returns {HTMLElement} The column element
     */
    static create(column, tasks = []) {
        const colDiv = document.createElement('div');
        colDiv.className = 'column';
        colDiv.dataset.id = column.id;

        // Header
        const header = document.createElement('div');
        header.className = 'column-header';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'column-title';
        titleDiv.innerHTML = `
            ${column.title}
            <span class="task-count">${tasks.length}</span>
        `;

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'column-actions';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        deleteBtn.title = 'Remove Column';
        deleteBtn.onclick = () => {
            if (confirm('Delete this column and all its tasks?')) {
                store.removeColumn(column.id);
            }
        };

        // Don't allow deleting the last column
        if (store.getState().columns.length > 1) {
            actionsDiv.appendChild(deleteBtn);
        }

        header.appendChild(titleDiv);
        header.appendChild(actionsDiv);

        // Task List (Drop Zone)
        const taskList = document.createElement('div');
        taskList.className = 'task-list';
        taskList.dataset.columnId = column.id;

        // Render tasks
        tasks.sort((a, b) => b.createdAt - a.createdAt).forEach(task => {
            taskList.appendChild(CardComponent.create(task));
        });

        // Add Task Button
        const addWrapper = document.createElement('div');
        addWrapper.className = 'add-task-wrapper';

        const addBtn = document.createElement('button');
        addBtn.className = 'btn-add-task';
        addBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Task';
        addBtn.onclick = () => {
            const title = prompt('Task Title:');
            if (title && title.trim()) {
                store.addTask(title.trim(), column.id);
            }
        };

        addWrapper.appendChild(addBtn);

        colDiv.appendChild(header);
        colDiv.appendChild(taskList);
        colDiv.appendChild(addWrapper);

        return colDiv;
    }
}
