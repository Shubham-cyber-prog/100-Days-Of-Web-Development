/**
 * CSV Export Utility
 */

export class CSVExporter {
    static export(columns, values, filename = 'query_results.csv') {
        if (!columns || !values || values.length === 0) {
            return false;
        }

        // CSV Header
        let csvContent = columns.map(c => this.escape(c)).join(',') + '\n';

        // CSV Rows
        values.forEach(row => {
            csvContent += row.map(v => this.escape(v)).join(',') + '\n';
        });

        // Trigger download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return true;
    }

    static escape(val) {
        if (val === null || val === undefined) return '';

        let str = String(val);
        // If content has quotes or commas, wrap in quotes and escape existing quotes
        if (str.includes('"') || str.includes(',') || str.includes('\n')) {
            str = '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    }
}
