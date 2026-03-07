/**
 * Room Chat Component
 * Real-time chat with markdown support and code snippet sharing
 */

class RoomChat {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            currentUserId: options.currentUserId,
            onSendMessage: options.onSendMessage || (() => {}),
            maxMessages: options.maxMessages || 100,
            ...options
        };
        
        this.messages = [];
        this.isScrolledToBottom = true;
        
        this.init();
    }
    
    /**
     * Initialize the chat component
     */
    init() {
        if (!this.container) {
            console.error('RoomChat: Container not found');
            return;
        }
        
        // Track scroll position
        this.container.addEventListener('scroll', () => {
            const { scrollTop, scrollHeight, clientHeight } = this.container;
            this.isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 50;
        });
        
        this.render();
    }
    
    /**
     * Update messages
     * @param {Array} messages - Array of message objects
     */
    updateMessages(messages) {
        this.messages = messages;
        this.render();
        
        if (this.isScrolledToBottom) {
            this.scrollToBottom();
        }
    }
    
    /**
     * Render chat messages
     */
    render() {
        if (this.messages.length === 0) {
            this.container.innerHTML = `
                <div class="chat-empty">
                    <span class="empty-icon">💬</span>
                    <p>No messages yet</p>
                    <p class="text-secondary">Start the conversation!</p>
                </div>
            `;
            return;
        }
        
        let html = '';
        let lastUserId = null;
        let lastDate = null;
        
        this.messages.forEach((message, index) => {
            const isOwnMessage = message.userId === this.options.currentUserId;
            const isSameUser = message.userId === lastUserId;
            const messageDate = this.getMessageDate(message.timestamp);
            const showDateSeparator = messageDate !== lastDate;
            
            // Date separator
            if (showDateSeparator) {
                html += `
                    <div class="chat-date-separator">
                        <span>${messageDate}</span>
                    </div>
                `;
                lastDate = messageDate;
            }
            
            // Message
            html += this.renderMessage(message, isOwnMessage, !isSameUser);
            lastUserId = message.userId;
        });
        
        this.container.innerHTML = html;
        
        // Apply syntax highlighting to code blocks
        this.highlightCodeBlocks();
    }
    
    /**
     * Render single message
     */
    renderMessage(message, isOwn, showHeader) {
        const time = this.formatTime(message.timestamp);
        const content = this.formatContent(message.content, message.type);
        
        return `
            <div class="chat-message ${isOwn ? 'own' : ''} ${message.type === 'code' ? 'code-message' : ''}">
                ${showHeader ? `
                    <div class="message-header">
                        <span class="message-author" style="color: ${this.getUserColor(message.userId)}">${this.escapeHtml(message.userName)}</span>
                        <span class="message-time">${time}</span>
                    </div>
                ` : ''}
                <div class="message-content">${content}</div>
            </div>
        `;
    }
    
    /**
     * Format message content with markdown support
     */
    formatContent(content, type) {
        if (type === 'system') {
            return `<em>${this.escapeHtml(content)}</em>`;
        }
        
        // Process markdown-like formatting
        let formatted = this.escapeHtml(content);
        
        // Code blocks ```code```
        formatted = formatted.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre class="code-block" data-language="${lang || 'plaintext'}"><code>${code.trim()}</code></pre>`;
        });
        
        // Inline code `code`
        formatted = formatted.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
        
        // Bold **text**
        formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        // Italic *text*
        formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        
        // Links [text](url)
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
        
        // Line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    }
    
    /**
     * Highlight code blocks
     */
    highlightCodeBlocks() {
        const codeBlocks = this.container.querySelectorAll('.code-block code');
        codeBlocks.forEach(block => {
            // Simple syntax highlighting
            const language = block.parentElement.dataset.language;
            if (language && language !== 'plaintext') {
                block.innerHTML = this.simpleHighlight(block.textContent, language);
            }
        });
    }
    
    /**
     * Simple syntax highlighting
     */
    simpleHighlight(code, language) {
        const patterns = {
            javascript: [
                { pattern: /(\/\/.*$)/gm, class: 'comment' },
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, class: 'string' },
                { pattern: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new)\b/g, class: 'keyword' },
                { pattern: /\b(true|false|null|undefined|NaN|Infinity)\b/g, class: 'literal' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' }
            ],
            html: [
                { pattern: /(&lt;!--[\s\S]*?--&gt;)/g, class: 'comment' },
                { pattern: /(&lt;\/?[\w-]+)/g, class: 'tag' },
                { pattern: /([\w-]+)=/g, class: 'attribute' },
                { pattern: /(&quot;[^&]*&quot;|'[^']*')/g, class: 'string' }
            ],
            css: [
                { pattern: /(\/\*[\s\S]*?\*\/)/g, class: 'comment' },
                { pattern: /([.#][\w-]+)/g, class: 'selector' },
                { pattern: /([\w-]+):/g, class: 'property' },
                { pattern: /:\s*([^;{]+)/g, class: 'value' }
            ],
            python: [
                { pattern: /(#.*$)/gm, class: 'comment' },
                { pattern: /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/g, class: 'string' },
                { pattern: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|raise|with|lambda|True|False|None)\b/g, class: 'keyword' },
                { pattern: /\b(\d+\.?\d*)\b/g, class: 'number' }
            ]
        };
        
        let highlighted = this.escapeHtml(code);
        const rules = patterns[language] || [];
        
        rules.forEach(rule => {
            highlighted = highlighted.replace(rule.pattern, `<span class="hl-${rule.class}">$1</span>`);
        });
        
        return highlighted;
    }
    
    /**
     * Get consistent color for user
     */
    getUserColor(userId) {
        const colors = [
            '#f97316', '#84cc16', '#06b6d4', '#8b5cf6', 
            '#ec4899', '#14b8a6', '#f59e0b', '#6366f1'
        ];
        
        let hash = 0;
        for (let i = 0; i < userId.length; i++) {
            hash = ((hash << 5) - hash) + userId.charCodeAt(i);
            hash = hash & hash;
        }
        
        return colors[Math.abs(hash) % colors.length];
    }
    
    /**
     * Format timestamp to time string
     */
    formatTime(timestamp) {
        if (!timestamp) return '';
        
        const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    /**
     * Get date string for separator
     */
    getMessageDate(timestamp) {
        if (!timestamp) return '';
        
        const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
        }
    }
    
    /**
     * Scroll to bottom of chat
     */
    scrollToBottom() {
        this.container.scrollTop = this.container.scrollHeight;
    }
    
    /**
     * Escape HTML characters
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Add a message locally (optimistic update)
     */
    addMessage(message) {
        this.messages.push(message);
        this.render();
        this.scrollToBottom();
    }
    
    /**
     * Clear all messages
     */
    clear() {
        this.messages = [];
        this.render();
    }
    
    /**
     * Destroy component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export { RoomChat };
export default RoomChat;
