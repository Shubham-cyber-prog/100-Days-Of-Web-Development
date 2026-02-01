/**
 * Zenith Project Grader Service
 * Orchestrates the automated grading of projects using Web Workers and DOM inspection.
 */

import { Notify } from './Notify.js';

class GraderService {
    constructor() {
        this.worker = null;
        this.isGrading = false;
    }

    /**
     * Grades a specific project day.
     * @param {number} day - The project day number.
     * @returns {Promise<object>} - The mission report.
     */
    async gradeProject(day) {
        if (this.isGrading) return;
        this.isGrading = true;

        try {
            const dayStr = day < 10 ? `0${day}` : day;
            const baseUrl = `/public/Day ${dayStr}/`;

            // 1. Fetch source files
            const sourceCode = await this.fetchProjectFiles(baseUrl);

            // 2. Run Static Analysis via Web Worker
            const staticResults = await this.runStaticAnalysis(sourceCode);

            // 3. Run Runtime Analysis via Iframe
            const runtimeResults = await this.runRuntimeAnalysis(baseUrl);

            // 4. Combine and finalize report
            const finalReport = this.compileReport(day, staticResults, runtimeResults);

            this.isGrading = false;
            return finalReport;

        } catch (error) {
            console.error('Grading Error:', error);
            Notify.error('Mission Analysis Failed: ' + error.message);
            this.isGrading = false;
            throw error;
        }
    }

    async fetchProjectFiles(baseUrl) {
        const files = { html: '', css: '', js: '' };

        try {
            const htmlRes = await fetch(baseUrl + 'index.html');
            if (htmlRes.ok) files.html = await htmlRes.text();

            // Try to find CSS/JS by common naming or parsing HTML
            // For now, assume index.css and index.js or similar
            // A more robust way would be to parse the HTML for <link> and <script> tags
            const cssRes = await fetch(baseUrl + 'style.css').catch(() => null);
            if (cssRes && cssRes.ok) files.css = await cssRes.text();

            const jsRes = await fetch(baseUrl + 'script.js').catch(() => null);
            if (jsRes && jsRes.ok) files.js = await jsRes.text();

        } catch (e) {
            console.warn('Some project files could not be fetched:', e);
        }

        return files;
    }

    runStaticAnalysis(sourceCode) {
        return new Promise((resolve, reject) => {
            if (!this.worker) {
                this.worker = new Worker('/website/scripts/workers/analysis.worker.js');
            }

            this.worker.onmessage = (e) => resolve(e.data);
            this.worker.onerror = (e) => reject(new Error('Worker analysis failed'));

            this.worker.postMessage(sourceCode);
        });
    }

    async runRuntimeAnalysis(baseUrl) {
        return new Promise((resolve) => {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.sandbox = 'allow-scripts allow-same-origin';
            iframe.src = baseUrl + 'index.html';

            document.body.appendChild(iframe);

            iframe.onload = () => {
                const results = {
                    a11y: [],
                    dom: [],
                    performance: {
                        loadTime: 0
                    }
                };

                const doc = iframe.contentDocument || iframe.contentWindow.document;

                // Check contrast ratios (basic)
                const elements = doc.querySelectorAll('*');
                elements.forEach(el => {
                    const style = window.getComputedStyle(el);
                    // Just a placeholder for complex logic
                    // In a real version, we'd check contrast using el.color and el.backgroundColor
                });

                // Check for ARIA labels on interactive elements
                const buttons = doc.querySelectorAll('button, a, input');
                buttons.forEach(btn => {
                    if (!btn.getAttribute('aria-label') && !btn.innerText && !btn.value) {
                        results.a11y.push({
                            type: 'warning',
                            message: 'Interactive element missing accessible name.',
                            tag: btn.tagName.toLowerCase()
                        });
                    }
                });

                // Check DOM depth
                const depth = this.getDomDepth(doc.body);
                if (depth > 20) {
                    results.dom.push({
                        type: 'warning',
                        message: `DOM depth is ${depth}. Consider flattening your structure.`,
                        impact: 5
                    });
                }

                document.body.removeChild(iframe);
                resolve(results);
            };

            // Timeout after 5s
            setTimeout(() => {
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                    resolve({ a11y: [], dom: [], error: 'Runtime analysis timed out' });
                }
            }, 5000);
        });
    }

    getDomDepth(el) {
        let maxDepth = 0;
        if (el.children.length === 0) return 1;
        for (let child of el.children) {
            maxDepth = Math.max(maxDepth, this.getDomDepth(child));
        }
        return maxDepth + 1;
    }

    compileReport(day, staticData, runtimeData) {
        const issues = [
            ...staticData.semantics,
            ...staticData.accessibility,
            ...staticData.performance,
            ...staticData.bestPractices,
            ...runtimeData.a11y,
            ...runtimeData.dom
        ];

        return {
            day,
            timestamp: new Date().toISOString(),
            score: staticData.score,
            status: staticData.score >= 70 ? 'PASSED' : 'RETRY',
            issues: issues,
            summary: {
                semantics: staticData.semantics.length,
                performance: staticData.performance.length,
                accessibility: staticData.accessibility.length + runtimeData.a11y.length
            }
        };
    }
}

export default new GraderService();
