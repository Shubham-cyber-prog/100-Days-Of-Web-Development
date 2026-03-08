/**
 * CodeViewer.js
 * Utility to fetch and display project source code
 */

export const CodeViewer = {
    /**
     * Fetch file content from the project directory
     * @param {string} projectPath Path to the project
     * @param {string} fileName Name of the file (index.html, style.css, script.js)
     * @returns {Promise<string>} File content
     */
    async fetchFile(projectPath, fileName) {
        try {
            // Adjust project path to be relative to root
            // If projectPath is like '../../public/Day 01/index.html'
            // We want 'public/Day 01/fileName'

            let baseUrl = projectPath.replace('/index.html', '');
            // Simple normalization
            if (baseUrl.startsWith('../../')) {
                baseUrl = baseUrl.substring(6);
            }

            const fileUrl = `/${baseUrl}/${fileName}`;
            console.log(`fetching code from: ${fileUrl}`);

            const response = await fetch(fileUrl);
            if (!response.ok) throw new Error(`Could not load ${fileName}`);

            return await response.text();
        } catch (error) {
            console.error(`Error loading code file: ${fileName}`, error);
            return `// Error loading ${fileName}: Code file not found or inaccessible locally.`;
        }
    },

    /**
     * Primitive syntax highlighting (fallback if no library)
     */
    highlight(code, lang) {
        if (!code) return '';

        // Escape HTML
        let escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        // Basic highlighting for demonstration
        if (lang === 'html') {
            escaped = escaped.replace(/(&lt;!--.*?--&gt;)/sg, '<span style="color: #6a9955">$1</span>');
            escaped = escaped.replace(/(&lt;\/?[a-z1-6]+)/gi, '<span style="color: #569cd6">$1</span>');
            escaped = escaped.replace(/([a-z-]+)=&quot;/gi, '<span style="color: #9cdcfe">$1</span><span style="color: #d4d4d4">=</span>&quot;');
        } else if (lang === 'css') {
            escaped = escaped.replace(/(\/\*.*?\*\/)/sg, '<span style="color: #6a9955">$1</span>');
            escaped = escaped.replace(/([a-z-]+):/gi, '<span style="color: #9cdcfe">$1</span>:');
            escaped = escaped.replace(/(#[a-z0-9]+)/gi, '<span style="color: #ce9178">$1</span>');
        } else {
            // JS
            escaped = escaped.replace(/(\/\/.*)/g, '<span style="color: #6a9955">$1</span>');
            escaped = escaped.replace(/\b(const|let|var|function|return|if|else|for|while|async|await|import|export|class|new|this)\b/g, '<span style="color: #c586c0">$1</span>');
            escaped = escaped.replace(/\b(true|false|null|undefined)\b/g, '<span style="color: #569cd6">$1</span>');
            escaped = escaped.replace(/(&quot;.*?&quot;)/g, '<span style="color: #ce9178">$1</span>');
        }

        return escaped;
    }
};
