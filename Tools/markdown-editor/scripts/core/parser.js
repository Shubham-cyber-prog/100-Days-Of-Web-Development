/**
 * Custom Markdown Parser
 * Converts Markdown to HTML using regex replacements
 * No external libraries - pure vanilla JS implementation
 */

export class MarkdownParser {
    constructor() {
        // Store original text for reference
        this.originalText = '';
    }

    /**
     * Main parse method
     * @param {string} markdown - Raw markdown text
     * @returns {string} - HTML output
     */
    parse(markdown) {
        if (!markdown) return '';

        this.originalText = markdown;
        let html = markdown;

        // Process in specific order to avoid conflicts

        // 1. Code blocks (must be done first to protect code content)
        html = this.parseCodeBlocks(html);

        // 2. Headers
        html = this.parseHeaders(html);

        // 3. Horizontal rules
        html = this.parseHorizontalRules(html);

        // 4. Blockquotes
        html = this.parseBlockquotes(html);

        // 5. Lists (ordered and unordered)
        html = this.parseLists(html);

        // 6. Inline elements (bold, italic, strikethrough)
        html = this.parseInline(html);

        // 7. Links and images
        html = this.parseLinks(html);
        html = this.parseImages(html);

        // 8. Inline code
        html = this.parseInlineCode(html);

        // 9. Line breaks and paragraphs
        html = this.parseParagraphs(html);

        return html;
    }

    /**
     * Parse code blocks (```)
     */
    parseCodeBlocks(text) {
        // Match code blocks with optional language
        return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
            const escapedCode = this.escapeHtml(code.trim());
            return `<pre><code class="language-${lang || 'plaintext'}">${escapedCode}</code></pre>`;
        });
    }

    /**
     * Parse inline code (`)
     */
    parseInlineCode(text) {
        // Avoid matching within code blocks
        return text.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    }

    /**
     * Parse headers (#)
     */
    parseHeaders(text) {
        // H1-H6
        return text.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, content) => {
            const level = hashes.length;
            return `<h${level}>${content.trim()}</h${level}>`;
        });
    }

    /**
     * Parse horizontal rules (---, ***, ___)
     */
    parseHorizontalRules(text) {
        return text.replace(/^(\*{3,}|-{3,}|_{3,})$/gm, '<hr>');
    }

    /**
     * Parse blockquotes (>)
     */
    parseBlockquotes(text) {
        // Handle multi-line quotes
        return text.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');
    }

    /**
     * Parse lists (ordered and unordered)
     */
    parseLists(text) {
        // Unordered lists
        text = text.replace(/^[\*\-\+]\s+(.+)$/gm, '<li>$1</li>');

        // Wrap consecutive <li> in <ul>
        text = text.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
            return `<ul>\n${match}</ul>\n`;
        });

        // Ordered lists
        text = text.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

        // This is simplified - in reality we'd need better detection
        // For now, assume numbered lists are separate from bullet lists

        return text;
    }

    /**
     * Parse inline formatting (bold, italic, strikethrough)
     */
    parseInline(text) {
        // Bold (**text** or __text__)
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');

        // Italic (*text* or _text_) - must be after bold
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        text = text.replace(/_(.+?)_/g, '<em>$1</em>');

        // Strikethrough (~~text~~)
        text = text.replace(/~~(.+?)~~/g, '<del>$1</del>');

        return text;
    }

    /**
     * Parse links [text](url)
     */
    parseLinks(text) {
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    }

    /**
     * Parse images ![alt](url)
     */
    parseImages(text) {
        return text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');
    }

    /**
     * Parse paragraphs (double line break = new paragraph)
     */
    parseParagraphs(text) {
        const lines = text.split('\n');
        let inParagraph = false;
        let result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip if line is already wrapped in HTML tag
            if (line.startsWith('<') || line === '') {
                if (inParagraph) {
                    result.push('</p>');
                    inParagraph = false;
                }
                result.push(lines[i]);
            } else {
                if (!inParagraph) {
                    result.push('<p>');
                    inParagraph = true;
                }
                result.push(line);
            }
        }

        if (inParagraph) {
            result.push('</p>');
        }

        return result.join('\n');
    }

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    /**
     * Calculate statistics
     */
    getStats(markdown) {
        const words = markdown.trim().split(/\s+/).filter(w => w.length > 0).length;
        const chars = markdown.length;
        const lines = markdown.split('\n').length;

        return { words, chars, lines };
    }
}
