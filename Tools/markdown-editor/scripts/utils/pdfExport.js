/**
 * PDF Export Utility
 * Triggers browser print dialog for PDF generation
 */

export class PDFExporter {
    constructor() {
        this.init();
    }

    init() {
        const printBtn = document.getElementById('btn-print');
        if (printBtn) {
            printBtn.addEventListener('click', () => this.print());
        }
    }

    /**
     * Trigger print dialog
     * User can save as PDF using browser's print-to-PDF functionality
     */
    print() {
        // Check if there's content to print
        const preview = document.getElementById('preview-content');

        if (!preview || !preview.textContent.trim()) {
            alert('No content to print. Please write something first.');
            return;
        }

        // Trigger browser print dialog
        window.print();
    }

    /**
     * Generate filename suggestion based on first heading or date
     */
    getSuggestedFilename() {
        const preview = document.getElementById('preview-content');
        const firstHeading = preview.querySelector('h1, h2, h3');

        if (firstHeading) {
            const title = firstHeading.textContent
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
                .substring(0, 50);
            return `${title}.pdf`;
        }

        const date = new Date().toISOString().split('T')[0];
        return `markdown-${date}.pdf`;
    }
}

/**
 * HTML Export Utility
 */
export class HTMLExporter {
    constructor() {
        this.init();
    }

    init() {
        const exportBtn = document.getElementById('btn-export-html');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.export());
        }
    }

    export() {
        const preview = document.getElementById('preview-content');

        if (!preview || !preview.textContent.trim()) {
            alert('No content to export.');
            return;
        }

        // Create standalone HTML document
        const html = this.generateStandaloneHTML(preview.innerHTML);

        // Trigger download
        this.downloadFile(html, this.getSuggestedFilename(), 'text/html');
    }

    generateStandaloneHTML(content) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Export</title>
    <style>
        body {
            max-width: 800px;
            margin: 2rem auto;
            padding: 0 1rem;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        h1, h2 { border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 1em; border-radius: 6px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; padding-left: 1em; color: #666; }
        img { max-width: 100%; }
    </style>
</head>
<body>
${content}
</body>
</html>`;
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    }

    getSuggestedFilename() {
        const preview = document.getElementById('preview-content');
        const firstHeading = preview.querySelector('h1, h2, h3');

        if (firstHeading) {
            const title = firstHeading.textContent
                .replace(/[^a-z0-9]/gi, '-')
                .toLowerCase()
                .substring(0, 50);
            return `${title}.html`;
        }

        const date = new Date().toISOString().split('T')[0];
        return `markdown-${date}.html`;
    }
}
