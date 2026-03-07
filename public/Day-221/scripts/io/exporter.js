/**
 * Route Exporter
 * CSV/JSON route report generator
 */

export class RouteExporter {
    constructor(editor) {
        this.editor = editor;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('btn-export-json')?.addEventListener('click', () => this.exportJSON());
        document.getElementById('btn-export-csv')?.addEventListener('click', () => this.exportCSV());
        document.getElementById('btn-export-image')?.addEventListener('click', () => this.exportImage());
    }

    /**
     * Export route as JSON
     */
    exportJSON() {
        const data = {
            metadata: {
                exportDate: new Date().toISOString(),
                algorithm: document.getElementById('current-algo').textContent,
                totalDistance: document.getElementById('total-distance').textContent,
                nodeCount: this.editor.nodes.length
            },
            nodes: this.editor.nodes.map(node => ({
                id: node.id,
                label: node.label,
                x: node.x,
                y: node.y
            })),
            route: this.editor.currentPath || [],
            metrics: {
                computationTime: document.getElementById('metric-time').textContent,
                distance: document.getElementById('metric-distance').textContent,
                iterations: document.getElementById('metric-iterations').textContent,
                improvement: document.getElementById('metric-improvement').textContent
            }
        };

        const json = JSON.stringify(data, null, 2);
        this.downloadFile(json, 'route-export.json', 'application/json');
    }

    /**
     * Export route as CSV
     */
    exportCSV() {
        if (!this.editor.currentPath || this.editor.currentPath.length === 0) {
            alert('No route to export. Run an algorithm first.');
            return;
        }

        let csv = 'Step,Node ID,Node Label,X,Y,Distance from Previous\n';

        let totalDistance = 0;

        this.editor.currentPath.forEach((nodeId, index) => {
            const node = this.editor.nodes.find(n => n.id === nodeId);
            if (!node) return;

            let distanceFromPrev = 0;
            if (index > 0) {
                const prevNodeId = this.editor.currentPath[index - 1];
                const prevNode = this.editor.nodes.find(n => n.id === prevNodeId);
                if (prevNode) {
                    const dx = node.x - prevNode.x;
                    const dy = node.y - prevNode.y;
                    distanceFromPrev = Math.sqrt(dx * dx + dy * dy);
                    totalDistance += distanceFromPrev;
                }
            }

            csv += `${index + 1},${node.id},"${node.label}",${node.x.toFixed(2)},${node.y.toFixed(2)},${distanceFromPrev.toFixed(2)}\n`;
        });

        csv += `\nTotal Distance,${totalDistance.toFixed(2)} km\n`;
        csv += `Algorithm,${document.getElementById('current-algo').textContent}\n`;
        csv += `Computation Time,${document.getElementById('metric-time').textContent}\n`;

        this.downloadFile(csv, 'route-export.csv', 'text/csv');
    }

    /**
     * Export map as image
     */
    exportImage() {
        const canvas = this.editor.canvas;

        // Convert canvas to blob
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'route-map.png';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    /**
     * Helper: Download file
     */
    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }

    /**
     * Generate detailed report
     */
    generateReport() {
        if (!this.editor.currentPath || this.editor.currentPath.length === 0) {
            return 'No route available';
        }

        let report = '=== ROUTE OPTIMIZATION REPORT ===\n\n';
        report += `Generated: ${new Date().toLocaleString()}\n`;
        report += `Algorithm: ${document.getElementById('current-algo').textContent}\n`;
        report += `Total Nodes: ${this.editor.nodes.length}\n`;
        report += `Total Distance: ${document.getElementById('total-distance').textContent}\n`;
        report += `Computation Time: ${document.getElementById('metric-time').textContent}\n\n`;

        report += '=== ROUTE SEQUENCE ===\n';
        this.editor.currentPath.forEach((nodeId, index) => {
            const node = this.editor.nodes.find(n => n.id === nodeId);
            if (node) {
                report += `${index + 1}. ${node.label} (${node.x.toFixed(0)}, ${node.y.toFixed(0)})\n`;
            }
        });

        return report;
    }
}
