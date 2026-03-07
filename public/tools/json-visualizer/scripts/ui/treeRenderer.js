/**
 * Recursive JSON Tree Renderer
 */

export class TreeRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.searchMatches = [];
    }

    render(data) {
        this.container.innerHTML = '';
        if (!data) return;

        const fragment = document.createDocumentFragment();
        const rootNode = document.createElement('div');
        rootNode.className = 'tree-root';

        // Helper to determine if we should collapse initially (e.g. depth > 2)
        const shouldCollapse = (depth) => depth > 2;

        this._buildNode(data, rootNode, 'root', 0);
        fragment.appendChild(rootNode);
        this.container.appendChild(fragment);
    }

    _buildNode(value, parentEl, keyName, depth) {
        const nodeEl = document.createElement('div');
        nodeEl.className = 'tree-node';

        const contentEl = document.createElement('div');
        contentEl.className = 'node-content';

        // Caret for expand/collapse
        const isObject = typeof value === 'object' && value !== null;
        const isEmpty = isObject && Object.keys(value).length === 0;

        let caret = null;
        if (isObject && !isEmpty) {
            caret = document.createElement('span');
            caret.className = 'caret caret-down'; // Expanded by default
            caret.innerHTML = '▶'; // Simple arrow, rotated by CSS
            contentEl.appendChild(caret);
        } else {
            const emptyCaret = document.createElement('span');
            emptyCaret.className = 'caret caret-empty';
            contentEl.appendChild(emptyCaret);
        }

        // Key Name (if not root/array item implicitly)
        if (keyName && keyName !== 'root') {
            const keyEl = document.createElement('span');
            keyEl.className = 'key';
            keyEl.textContent = `"${keyName}"`;
            keyEl.dataset.key = keyName; // For search
            contentEl.appendChild(keyEl);

            const sep = document.createElement('span');
            sep.className = 'separator';
            sep.textContent = ':';
            contentEl.appendChild(sep);
        }

        // Value Rendering
        if (isObject) {
            const typeLabel = Array.isArray(value) ? `Array[${value.length}]` : 'Object';
            const valEl = document.createElement('span');
            valEl.className = Array.isArray(value) ? 'value-array' : 'value-object';
            valEl.textContent = isEmpty ? (Array.isArray(value) ? '[]' : '{}') : (Array.isArray(value) ? '[' : '{');

            // Meta info
            if (!isEmpty) {
                const meta = document.createElement('span');
                meta.className = 'meta-info';
                meta.textContent = typeLabel;
                valEl.appendChild(meta);
            }

            contentEl.appendChild(valEl);
            nodeEl.appendChild(contentEl);

            // Container for children
            if (!isEmpty) {
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'nested active';

                // Event Listener for Caret
                caret.onclick = (e) => {
                    e.stopPropagation();
                    childrenContainer.classList.toggle('active');
                    caret.classList.toggle('caret-down');
                };

                // content click also toggles
                contentEl.onclick = (e) => {
                    // Avoid triggering if clicked on inner elements that might have their own handlers later
                    childrenContainer.classList.toggle('active');
                    caret.classList.toggle('caret-down');
                };

                // Recursive render
                // Handle Arrays vs Objects
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        this._buildNode(item, childrenContainer, index, depth + 1);
                    });
                } else {
                    Object.keys(value).forEach(key => {
                        this._buildNode(value[key], childrenContainer, key, depth + 1);
                    });
                }

                // Closing brace/bracket
                const closingNode = document.createElement('div');
                closingNode.className = 'tree-node';
                closingNode.style.marginLeft = '22px'; // Align with content
                closingNode.textContent = Array.isArray(value) ? ']' : '}';
                childrenContainer.appendChild(closingNode);

                nodeEl.appendChild(childrenContainer);
            }

        } else {
            // Primitive Value
            const valEl = document.createElement('span');
            valEl.className = `value-${value === null ? 'null' : typeof value}`;
            valEl.textContent = JSON.stringify(value);
            contentEl.appendChild(valEl);
            nodeEl.appendChild(contentEl);
        }

        parentEl.appendChild(nodeEl);
    }

    expandAll() {
        const nested = this.container.querySelectorAll('.nested');
        nested.forEach(el => el.classList.add('active'));
        const carets = this.container.querySelectorAll('.caret');
        carets.forEach(el => el.classList.add('caret-down'));
    }

    collapseAll() {
        const nested = this.container.querySelectorAll('.nested');
        nested.forEach(el => el.classList.remove('active'));
        const carets = this.container.querySelectorAll('.caret');
        carets.forEach(el => el.classList.remove('caret-down'));
    }

    search(query) {
        // Reset previous highlights
        this.container.querySelectorAll('.highlight-key').forEach(el => el.classList.remove('highlight-key'));

        if (!query) return;

        const keys = this.container.querySelectorAll('.key');
        let matched = false;

        keys.forEach(keyEl => {
            if (keyEl.dataset.key.toLowerCase().includes(query.toLowerCase())) {
                keyEl.classList.add('highlight-key');
                // Ensure parents are expanded
                let parent = keyEl.closest('.nested');
                while (parent) {
                    parent.classList.add('active');
                    // Find preceding sibling with caret to rotate it
                    // Complex DOM traversal simplified here: just expanding nested container is visual enough
                    parent = parent.parentElement.closest('.nested');
                }
                matched = true;
            }
        });
    }
}
