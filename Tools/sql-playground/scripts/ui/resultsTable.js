/**
 * Results Table UI Component
 */

export class ResultsTable {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    render(results) {
        this.clear();

        if (!results.success) {
            this.renderError(results.error);
            return;
        }

        if (results.message) {
            this.renderMessage(results.message);
            return;
        }

        const table = document.createElement('table');
        table.className = 'results-table';

        // Header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        results.columns.forEach(col => {
            const th = document.createElement('th');
            th.innerHTML = `${col} <i class="fa-solid fa-sort"></i>`;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Body
        const tbody = document.createElement('tbody');
        results.values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(val => {
                const td = document.createElement('td');
                if (val === null) {
                    td.innerHTML = '<span class="type-null">NULL</span>';
                } else {
                    td.textContent = val;
                    if (typeof val === 'number') td.classList.add('type-number');
                }
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);

        const wrapper = document.createElement('div');
        wrapper.className = 'results-table-container';
        wrapper.appendChild(table);
        this.container.appendChild(wrapper);
    }

    renderError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'query-error';
        errorDiv.innerHTML = `
            <div class="error-title">
                <i class="fa-solid fa-circle-exclamation"></i> SQL Error
            </div>
            <div class="error-message">${error}</div>
        `;
        this.container.appendChild(errorDiv);
    }

    renderMessage(message) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'placeholder-content';
        msgDiv.innerHTML = `
            <i class="fa-solid fa-circle-check" style="color:var(--success); opacity:1"></i>
            <p>${message}</p>
        `;
        this.container.appendChild(msgDiv);
    }

    clear() {
        this.container.innerHTML = '';
    }
}
