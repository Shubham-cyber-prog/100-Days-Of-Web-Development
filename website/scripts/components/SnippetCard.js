/**
 * Snippet Card Component
 * Display component for code snippets with syntax highlighting
 */

class SnippetCard {
    /**
     * Render a snippet card (static method for grid rendering)
     * @param {Object} snippet - Snippet data
     * @returns {string} HTML string
     */
    static render(snippet) {
        const codePreview = SnippetCard.truncateCode(snippet.code, 8);
        const categoryIcon = SnippetCard.getCategoryIcon(snippet.category);
        const languageClass = `language-${snippet.language}`;
        const date = SnippetCard.formatDate(snippet.updatedAt);
        
        return `
            <div class="snippet-card" data-id="${snippet.id}">
                <div class="snippet-card-header">
                    <div class="snippet-meta">
                        <span class="snippet-category" title="${snippet.category}">${categoryIcon}</span>
                        <span class="snippet-language">${snippet.language}</span>
                    </div>
                    <div class="snippet-actions">
                        <button class="btn-icon btn-favorite ${snippet.isFavorite ? 'active' : ''}" title="Favorite">
                            ${snippet.isFavorite ? '⭐' : '☆'}
                        </button>
                        <button class="btn-icon btn-copy" title="Copy to clipboard">📋</button>
                    </div>
                </div>
                
                <h3 class="snippet-title">${SnippetCard.escapeHtml(snippet.title)}</h3>
                
                ${snippet.description ? `
                    <p class="snippet-description">${SnippetCard.escapeHtml(snippet.description)}</p>
                ` : ''}
                
                <div class="snippet-code-preview ${languageClass}">
                    <pre><code>${SnippetCard.highlightCode(codePreview, snippet.language)}</code></pre>
                </div>
                
                <div class="snippet-footer">
                    <div class="snippet-tags">
                        ${snippet.tags.slice(0, 3).map(tag => `
                            <span class="tag">${SnippetCard.escapeHtml(tag)}</span>
                        `).join('')}
                    </div>
                    <div class="snippet-info">
                        ${snippet.usageCount ? `<span class="usage-count">📋 ${snippet.usageCount}</span>` : ''}
                        <span class="snippet-date">${date}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Render expanded snippet view
     * @param {Object} snippet - Snippet data
     * @returns {string} HTML string
     */
    static renderExpanded(snippet) {
        return `
            <div class="snippet-expanded">
                <div class="snippet-expanded-header">
                    <div class="snippet-meta">
                        <span class="snippet-category">${SnippetCard.getCategoryIcon(snippet.category)} ${snippet.category}</span>
                        <span class="snippet-language">${snippet.language}</span>
                    </div>
                    <h2 class="snippet-title">${SnippetCard.escapeHtml(snippet.title)}</h2>
                    ${snippet.description ? `<p class="snippet-description">${SnippetCard.escapeHtml(snippet.description)}</p>` : ''}
                </div>
                
                <div class="snippet-code-full">
                    <div class="code-header">
                        <span class="code-language">${snippet.language}</span>
                        <button class="btn-copy-full" data-snippet-id="${snippet.id}">
                            📋 Copy
                        </button>
                    </div>
                    <div class="code-wrapper">
                        <div class="line-numbers">
                            ${SnippetCard.generateLineNumbers(snippet.code)}
                        </div>
                        <pre><code class="language-${snippet.language}">${SnippetCard.highlightCode(snippet.code, snippet.language)}</code></pre>
                    </div>
                </div>
                
                <div class="snippet-expanded-footer">
                    <div class="snippet-tags">
                        ${snippet.tags.map(tag => `<span class="tag">${SnippetCard.escapeHtml(tag)}</span>`).join('')}
                    </div>
                    <div class="snippet-stats">
                        <span>Created: ${SnippetCard.formatDate(snippet.createdAt)}</span>
                        <span>Used: ${snippet.usageCount || 0} times</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Simple syntax highlighting
     * @param {string} code - Code to highlight
     * @param {string} language - Programming language
     * @returns {string} Highlighted HTML
     */
    static highlightCode(code, language) {
        let html = SnippetCard.escapeHtml(code);
        
        const rules = {
            javascript: [
                { pattern: /(\/\/.*$)/gm, class: 'comment' },
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, class: 'string' },
                { pattern: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|super|extends|static|get|set|typeof|instanceof|in|of)\b/g, class: 'keyword' },
                { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, class: 'literal' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' },
                { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, class: 'class' },
                { pattern: /(\w+)(?=\()/g, class: 'function' }
            ],
            typescript: [
                { pattern: /(\/\/.*$)/gm, class: 'comment' },
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, class: 'string' },
                { pattern: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|super|extends|static|get|set|typeof|instanceof|in|of|interface|type|enum|implements|private|public|protected|readonly)\b/g, class: 'keyword' },
                { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, class: 'literal' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' },
                { pattern: /: (\w+)/g, class: 'type' }
            ],
            html: [
                { pattern: /(&lt;!--[\s\S]*?--&gt;)/g, class: 'comment' },
                { pattern: /(&lt;\/?)([\w-]+)/g, class: 'tag' },
                { pattern: /([\w-]+)(?==)/g, class: 'attribute' },
                { pattern: /=(&quot;[^&]*&quot;|'[^']*')/g, class: 'string' }
            ],
            css: [
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /([.#][\w-]+)(?=\s*\{)/g, class: 'selector' },
                { pattern: /([\w-]+)(?=\s*:)/g, class: 'property' },
                { pattern: /:\s*([^;{]+)/g, class: 'value' },
                { pattern: /(@[\w-]+)/g, class: 'keyword' }
            ],
            scss: [
                { pattern: /(\/\/.*$)/gm, class: 'comment' },
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /(\$[\w-]+)/g, class: 'variable' },
                { pattern: /(@[\w-]+)/g, class: 'keyword' },
                { pattern: /([.#&][\w-]+)/g, class: 'selector' }
            ],
            python: [
                { pattern: /(#.*$)/gm, class: 'comment' },
                { pattern: /('''[\s\S]*?'''|"""[\s\S]*?""")/g, class: 'string' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, class: 'string' },
                { pattern: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|raise|with|lambda|yield|global|nonlocal|pass|break|continue|and|or|not|is|in|True|False|None)\b/g, class: 'keyword' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' },
                { pattern: /\b([A-Z][a-zA-Z0-9]*)\b/g, class: 'class' }
            ],
            json: [
                { pattern: /("(?:[^"\\]|\\.)*")(?=\s*:)/g, class: 'property' },
                { pattern: /:\s*("(?:[^"\\]|\\.)*")/g, class: 'string' },
                { pattern: /:\s*(\d+\.?\d*)/g, class: 'number' },
                { pattern: /:\s*(true|false|null)/g, class: 'literal' }
            ],
            bash: [
                { pattern: /(#.*$)/gm, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, class: 'string' },
                { pattern: /(\$[\w]+|\$\{[\w]+\})/g, class: 'variable' },
                { pattern: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|export|source|alias)\b/g, class: 'keyword' }
            ],
            sql: [
                { pattern: /(--.*$)/gm, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*')/g, class: 'string' },
                { pattern: /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|AND|OR|NOT|IN|IS|NULL|AS|ORDER|BY|GROUP|HAVING|LIMIT|OFFSET|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|INDEX|VIEW|DROP|ALTER|ADD|PRIMARY|KEY|FOREIGN|REFERENCES|UNIQUE|DEFAULT|AUTO_INCREMENT|INT|VARCHAR|TEXT|BOOLEAN|DATE|DATETIME|TIMESTAMP)\b/gi, class: 'keyword' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' }
            ]
        };
        
        const languageRules = rules[language] || rules.javascript;
        
        languageRules.forEach(rule => {
            html = html.replace(rule.pattern, `<span class="hl-${rule.class}">$1</span>`);
        });
        
        return html;
    }
    
    /**
     * Generate line numbers
     * @param {string} code - Code string
     * @returns {string} HTML string with line numbers
     */
    static generateLineNumbers(code) {
        const lines = code.split('\n').length;
        return Array.from({ length: lines }, (_, i) => `<span>${i + 1}</span>`).join('');
    }
    
    /**
     * Truncate code for preview
     * @param {string} code - Full code
     * @param {number} maxLines - Max lines to show
     * @returns {string} Truncated code
     */
    static truncateCode(code, maxLines = 8) {
        const lines = code.split('\n');
        if (lines.length <= maxLines) {
            return code;
        }
        return lines.slice(0, maxLines).join('\n') + '\n// ...';
    }
    
    /**
     * Get category icon
     * @param {string} category - Category ID
     * @returns {string} Emoji icon
     */
    static getCategoryIcon(category) {
        const icons = {
            'css-tricks': '🎨',
            'js-utilities': '⚡',
            'html-patterns': '📄',
            'api-examples': '🔌',
            'algorithms': '🧮',
            'regex': '🔍',
            'responsive': '📱',
            'animations': '✨',
            'debugging': '🐛',
            'other': '📁'
        };
        return icons[category] || '📁';
    }
    
    /**
     * Format date
     * @param {number} timestamp - Unix timestamp
     * @returns {string} Formatted date
     */
    static formatDate(timestamp) {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        
        return date.toLocaleDateString();
    }
    
    /**
     * Escape HTML
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    static escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

export { SnippetCard };
export default SnippetCard;
