/**
 * Main Application Controller
 */

import { SQLDatabase } from './core/database.js';
import { SQLEditor } from './ui/editor.js';
import { ResultsTable } from './ui/resultsTable.js';
import { CSVExporter } from './utils/csvExport.js';

class SQLPlayground {
    constructor() {
        this.db = new SQLDatabase();
        this.editor = new SQLEditor('sql-input', 'line-numbers');
        this.resultsTable = new ResultsTable('results-view');

        this.lastResults = null;

        this.init();
    }

    async init() {
        try {
            await this.db.init();
            this.showToast('Database initialised successfully');
            this.updateSchema();
            this.bindEvents();
        } catch (error) {
            this.showToast('Failed to initialise database: ' + error.message, 'error');
        }
    }

    bindEvents() {
        // Run Button
        document.getElementById('btn-run').onclick = () => this.runQuery();

        // Clear Button
        document.getElementById('btn-clear').onclick = () => this.editor.clear();

        // Export CSV
        document.getElementById('btn-export-csv').onclick = () => {
            if (!this.lastResults || !this.lastResults.columns) {
                this.showToast('No results to export. Run a query first.', 'error');
                return;
            }
            CSVExporter.export(this.lastResults.columns, this.lastResults.values);
        };

        // Reset DB
        document.getElementById('btn-reset-db').onclick = async () => {
            if (confirm('Reset database? All your changes will be lost.')) {
                await this.db.reset();
                this.updateSchema();
                this.showToast('Database reset to defaults');
                this.resultsTable.clear();
            }
        };

        // Resize behavior
        const resizer = document.getElementById('workspace-resizer');
        let isResizing = false;

        resizer.onmousedown = (e) => {
            isResizing = true;
            document.body.style.cursor = 'row-resize';
        };

        document.onmousemove = (e) => {
            if (!isResizing) return;
            const editorPane = document.querySelector('.editor-pane');
            const newHeight = e.clientY - editorPane.getBoundingClientRect().top;
            if (newHeight > 100 && newHeight < window.innerHeight - 200) {
                editorPane.style.flex = `0 0 ${newHeight}px`;
            }
        };

        document.onmouseup = () => {
            isResizing = false;
            document.body.style.cursor = 'default';
        };
    }

    runQuery() {
        const sql = this.editor.getValue().trim();
        if (!sql) return;

        const startTime = performance.now();
        const results = this.db.executeQuery(sql);
        const endTime = performance.now();

        this.lastResults = results;
        this.resultsTable.render(results);

        // Meta info
        const metaEl = document.getElementById('query-meta');
        if (results.success && results.columns) {
            const duration = (endTime - startTime).toFixed(2);
            metaEl.textContent = `${results.rowCount} rows returned in ${duration}ms`;

            // If query was DDL/DML, update schema
            if (sql.toLowerCase().match(/(create|drop|alter|insert|update|delete)/)) {
                this.updateSchema();
            }
        } else {
            metaEl.textContent = '';
        }
    }

    updateSchema() {
        const schema = this.db.getSchema();
        const explorer = document.getElementById('schema-explorer');
        explorer.innerHTML = '';

        if (schema.length === 0) {
            explorer.innerHTML = '<div class="text-muted" style="font-size:0.8rem">No tables found.</div>';
            return;
        }

        schema.forEach(table => {
            const tableNode = document.createElement('div');
            tableNode.className = 'table-node';

            const header = document.createElement('div');
            header.className = 'table-header';
            header.innerHTML = `<i class="fa-solid fa-table"></i> ${table.name}`;

            const columns = document.createElement('div');
            columns.className = 'table-columns';
            table.columns.forEach(col => {
                const colItem = document.createElement('div');
                colItem.className = 'col-item';
                colItem.innerHTML = `<span>${col.name}</span> <span class="col-type">${col.type}</span>`;
                columns.appendChild(colItem);
            });

            tableNode.appendChild(header);
            tableNode.appendChild(columns);
            explorer.appendChild(tableNode);

            header.onclick = () => {
                this.editor.setValue(`SELECT * FROM ${table.name};`);
                this.runQuery();
            };
        });
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Start
window.addEventListener('load', () => {
    new SQLPlayground();
});
