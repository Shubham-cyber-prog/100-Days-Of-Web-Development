        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const jsonInput = document.getElementById('jsonInput');
            const viewerContent = document.getElementById('viewerContent');
            const errorPanel = document.getElementById('errorPanel');
            const errorMessage = document.getElementById('errorMessage');
            const statusIndicator = document.getElementById('statusIndicator');
            const statusText = document.getElementById('statusText');
            
            // Buttons
            const formatBtn = document.getElementById('formatBtn');
            const minifyBtn = document.getElementById('minifyBtn');
            const copyBtn = document.getElementById('copyBtn');
            const saveBtn = document.getElementById('saveBtn');
            const clearBtn = document.getElementById('clearBtn');
            const loadExampleBtn = document.getElementById('loadExampleBtn');
            const expandAllBtn = document.getElementById('expandAllBtn');
            const collapseAllBtn = document.getElementById('collapseAllBtn');
            
            // Mode buttons
            const modeButtons = document.querySelectorAll('.mode-btn');
            
            // Options
            const indentSize = document.getElementById('indentSize');
            const quoteStyle = document.getElementById('quoteStyle');
            const sortKeys = document.getElementById('sortKeys');
            
            // Stats elements
            const statSize = document.getElementById('statSize');
            const statLines = document.getElementById('statLines');
            const statKeys = document.getElementById('statKeys');
            const statDepth = document.getElementById('statDepth');
            
            // State
            let currentJson = null;
            let currentMode = 'tree';
            let isExpanded = false;
            
            // Sample JSON examples
            const examples = [
                {
                    name: 'User Profile',
                    json: {
                        "user": {
                            "id": 12345,
                            "name": "Alice Johnson",
                            "email": "alice@example.com",
                            "age": 28,
                            "isVerified": true,
                            "roles": ["admin", "user"],
                            "preferences": {
                                "theme": "dark",
                                "language": "en",
                                "notifications": true
                            },
                            "address": {
                                "street": "123 Main St",
                                "city": "San Francisco",
                                "country": "USA",
                                "zipcode": "94107"
                            }
                        },
                        "metadata": {
                            "created": "2024-01-15T10:30:00Z",
                            "updated": "2024-01-20T14:45:00Z",
                            "version": "1.2.0"
                        }
                    }
                },
                {
                    name: 'Product Catalog',
                    json: {
                        "products": [
                            {
                                "id": 101,
                                "name": "Wireless Headphones",
                                "brand": "AudioTech",
                                "price": 149.99,
                                "inStock": true,
                                "features": ["Bluetooth 5.0", "Noise Cancelling", "20h Battery"],
                                "colors": ["black", "white", "blue"],
                                "rating": 4.5,
                                "reviews": 128
                            },
                            {
                                "id": 102,
                                "name": "Smart Watch",
                                "brand": "TechWear",
                                "price": 299.99,
                                "inStock": true,
                                "features": ["Heart Rate Monitor", "GPS", "Water Resistant"],
                                "colors": ["black", "silver"],
                                "rating": 4.7,
                                "reviews": 89
                            },
                            {
                                "id": 103,
                                "name": "Laptop Stand",
                                "brand": "ErgoDesk",
                                "price": 59.99,
                                "inStock": false,
                                "features": ["Adjustable Height", "Aluminum Build", "Portable"],
                                "colors": ["gray"],
                                "rating": 4.3,
                                "reviews": 45
                            }
                        ],
                        "total": 3,
                        "categories": ["Electronics", "Wearables", "Accessories"]
                    }
                },
                {
                    name: 'API Response',
                    json: {
                        "success": true,
                        "status": 200,
                        "message": "Data retrieved successfully",
                        "data": {
                            "page": 1,
                            "perPage": 10,
                            "total": 150,
                            "totalPages": 15,
                            "items": [
                                {
                                    "id": 1,
                                    "title": "Introduction to JSON",
                                    "author": "John Smith",
                                    "tags": ["json", "tutorial", "web"],
                                    "published": true,
                                    "views": 1245
                                },
                                {
                                    "id": 2,
                                    "title": "JavaScript Best Practices",
                                    "author": "Jane Doe",
                                    "tags": ["javascript", "programming", "tips"],
                                    "published": true,
                                    "views": 2876
                                }
                            ]
                        },
                        "timestamp": "2024-01-20T15:30:45Z",
                        "version": "2.1.0"
                    }
                }
            ];
            
            // Initialize
            function init() {
                setupEventListeners();
                formatJson();
            }
            
            // Setup event listeners
            function setupEventListeners() {
                // Format button
                formatBtn.addEventListener('click', formatJson);
                
                // Minify button
                minifyBtn.addEventListener('click', minifyJson);
                
                // Copy button
                copyBtn.addEventListener('click', copyJson);
                
                // Save button
                saveBtn.addEventListener('click', saveJson);
                
                // Clear button
                clearBtn.addEventListener('click', clearJson);
                
                // Load example button
                loadExampleBtn.addEventListener('click', loadExample);
                
                // Expand/Collapse buttons
                expandAllBtn.addEventListener('click', () => toggleAllNodes(true));
                collapseAllBtn.addEventListener('click', () => toggleAllNodes(false));
                
                // Mode buttons
                modeButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        modeButtons.forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        currentMode = btn.dataset.mode;
                        displayJson();
                    });
                });
                
                // Input events
                jsonInput.addEventListener('input', debounce(validateJson, 300));
                jsonInput.addEventListener('keydown', handleTabKey);
                
                // Option changes
                indentSize.addEventListener('change', formatJson);
                quoteStyle.addEventListener('change', formatJson);
                sortKeys.addEventListener('change', formatJson);
            }
            
            // Format and validate JSON
            function formatJson() {
                try {
                    const input = jsonInput.value.trim();
                    
                    if (!input) {
                        showPlaceholder();
                        updateStatus('ready', 'Ready');
                        return;
                    }
                    
                    // Parse JSON
                    currentJson = JSON.parse(input);
                    
                    // Format options
                    const indent = parseInt(indentSize.value);
                    const quotes = quoteStyle.value;
                    const sort = sortKeys.value === 'true';
                    
                    // Create formatted JSON
                    let formatted;
                    if (sort) {
                        formatted = JSON.stringify(currentJson, replacer, indent);
                    } else {
                        formatted = JSON.stringify(currentJson, null, indent);
                    }
                    
                    // Apply quote style
                    if (quotes === 'single') {
                        formatted = formatted.replace(/"/g, "'");
                    }
                    
                    // Update input with formatted version
                    jsonInput.value = formatted;
                    
                    // Display formatted JSON
                    displayJson();
                    
                    // Update stats
                    updateStats();
                    
                    // Update status
                    updateStatus('valid', 'Valid JSON');
                    
                    // Hide error panel
                    errorPanel.classList.remove('show');
                    
                } catch (error) {
                    handleJsonError(error);
                }
            }
            
            // Minify JSON
            function minifyJson() {
                try {
                    const input = jsonInput.value.trim();
                    
                    if (!input) {
                        updateStatus('ready', 'Ready');
                        return;
                    }
                    
                    // Parse and minify
                    const parsed = JSON.parse(input);
                    const minified = JSON.stringify(parsed);
                    
                    // Update input
                    jsonInput.value = minified;
                    
                    // Update display
                    displayJson();
                    
                    // Update stats
                    updateStats();
                    
                    updateStatus('valid', 'Minified JSON');
                    
                } catch (error) {
                    handleJsonError(error);
                }
            }
            
            // Copy JSON to clipboard
            async function copyJson() {
                try {
                    const json = jsonInput.value.trim();
                    
                    if (!json) {
                        updateStatus('error', 'No JSON to copy');
                        return;
                    }
                    
                    await navigator.clipboard.writeText(json);
                    updateStatus('valid', 'Copied to clipboard');
                    
                    // Visual feedback
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                    }, 2000);
                    
                } catch (error) {
                    updateStatus('error', 'Failed to copy');
                }
            }
            
            // Save JSON as file
            function saveJson() {
                try {
                    const json = jsonInput.value.trim();
                    
                    if (!json) {
                        updateStatus('error', 'No JSON to save');
                        return;
                    }
                    
                    // Create blob and download link
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    
                    a.href = url;
                    a.download = `json-formatted-${Date.now()}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                    
                    updateStatus('valid', 'File saved');
                    
                } catch (error) {
                    updateStatus('error', 'Failed to save');
                }
            }
            
            // Clear JSON input
            function clearJson() {
                jsonInput.value = '';
                showPlaceholder();
                updateStats();
                updateStatus('ready', 'Ready');
                errorPanel.classList.remove('show');
            }
            
            // Load random example
            function loadExample() {
                const example = examples[Math.floor(Math.random() * examples.length)];
                jsonInput.value = JSON.stringify(example.json, null, 2);
                formatJson();
                updateStatus('valid', `Loaded: ${example.name}`);
            }
            
            // Validate JSON (debounced)
            function validateJson() {
                try {
                    const input = jsonInput.value.trim();
                    
                    if (!input) {
                        updateStatus('ready', 'Ready');
                        return;
                    }
                    
                    JSON.parse(input);
                    updateStatus('valid', 'Valid JSON');
                    errorPanel.classList.remove('show');
                    
                } catch (error) {
                    updateStatus('invalid', 'Invalid JSON');
                }
            }
            
            // Handle JSON parsing errors
            function handleJsonError(error) {
                updateStatus('invalid', 'Invalid JSON');
                
                // Parse error message
                let message = error.message;
                const match = message.match(/at position (\d+)/);
                
                if (match) {
                    const position = parseInt(match[1]);
                    const lines = jsonInput.value.substr(0, position).split('\n');
                    const line = lines.length;
                    const column = lines[lines.length - 1].length + 1;
                    
                    message = `Line ${line}, Column ${column}: ${message}`;
                }
                
                // Show error panel
                errorMessage.textContent = message;
                errorPanel.classList.add('show');
                
                // Show raw JSON in viewer
                viewerContent.innerHTML = `<pre>${escapeHtml(jsonInput.value)}</pre>`;
            }
            
            // Display JSON based on current mode
            function displayJson() {
                if (!currentJson) {
                    showPlaceholder();
                    return;
                }
                
                switch (currentMode) {
                    case 'tree':
                        displayTreeView();
                        break;
                    case 'formatted':
                        displayFormattedView();
                        break;
                    case 'raw':
                        displayRawView();
                        break;
                }
            }
            
            // Display JSON as interactive tree
            function displayTreeView() {
                viewerContent.innerHTML = '';
                const tree = createTreeElement(currentJson, 'root');
                viewerContent.appendChild(tree);
                isExpanded = false;
            }
            
            // Create tree element recursively
            function createTreeElement(data, key, depth = 0) {
                const element = document.createElement('div');
                element.className = 'tree-node';
                
                // Calculate padding based on depth
                element.style.paddingLeft = `${depth * 20}px`;
                
                if (data === null) {
                    element.innerHTML = `<span class="tree-key">"${key}"</span><span class="tree-colon">:</span> <span class="tree-value null">null</span>`;
                    return element;
                }
                
                const type = typeof data;
                const isArray = Array.isArray(data);
                const isObject = type === 'object' && !isArray;
                
                if (!isObject && !isArray) {
                    // Primitive value
                    let valueClass = type;
                    if (type === 'string') valueClass = 'string';
                    
                    const displayKey = key === 'root' ? '' : `"${key}"`;
                    const colon = key === 'root' ? '' : '<span class="tree-colon">:</span> ';
                    
                    let displayValue = JSON.stringify(data);
                    if (type === 'string') {
                        displayValue = `"${data}"`;
                    }
                    
                    element.innerHTML = `${displayKey ? `<span class="tree-key">${displayKey}</span>` : ''}${colon}<span class="tree-value ${valueClass}">${displayValue}</span>`;
                    
                } else {
                    // Object or array
                    const isEmpty = isArray ? data.length === 0 : Object.keys(data).length === 0;
                    const bracketOpen = isArray ? '[' : '{';
                    const bracketClose = isArray ? ']' : '}';
                    
                    const displayKey = key === 'root' ? '' : `"${key}"`;
                    const colon = key === 'root' ? '' : '<span class="tree-colon">:</span> ';
                    
                    element.innerHTML = `
                        ${displayKey ? `<span class="tree-key">${displayKey}</span>` : ''}${colon}
                        <span class="tree-toggle">${isEmpty ? '' : '+'}</span>
                        <span>${bracketOpen}</span>
                        <div class="tree-children" style="display: ${isEmpty || !isExpanded ? 'none' : 'block'}">
                            ${isEmpty ? '<span style="color: #95a5a6; font-style: italic;">empty</span>' : ''}
                        </div>
                        <span>${bracketClose}</span>
                    `;
                    
                    if (!isEmpty) {
                        const toggle = element.querySelector('.tree-toggle');
                        const childrenContainer = element.querySelector('.tree-children');
                        
                        toggle.addEventListener('click', function() {
                            const isHidden = childrenContainer.style.display === 'none';
                            childrenContainer.style.display = isHidden ? 'block' : 'none';
                            toggle.textContent = isHidden ? '−' : '+';
                        });
                        
                        // Add children
                        if (isArray) {
                            data.forEach((item, index) => {
                                const child = createTreeElement(item, index, depth + 1);
                                childrenContainer.appendChild(child);
                            });
                        } else {
                            Object.entries(data).forEach(([childKey, childValue]) => {
                                const child = createTreeElement(childValue, childKey, depth + 1);
                                childrenContainer.appendChild(child);
                            });
                        }
                    }
                }
                
                return element;
            }
            
            // Display formatted JSON with syntax highlighting
            function displayFormattedView() {
                const formatted = JSON.stringify(currentJson, null, 2);
                const highlighted = syntaxHighlight(formatted);
                viewerContent.innerHTML = `<pre class="syntax-highlighted">${highlighted}</pre>`;
            }
            
            // Display raw JSON
            function displayRawView() {
                const raw = JSON.stringify(currentJson);
                viewerContent.innerHTML = `<pre>${escapeHtml(raw)}</pre>`;
            }
            
            // Show placeholder message
            function showPlaceholder() {
                viewerContent.innerHTML = `
                    <div class="placeholder-text" style="text-align: center; padding: 50px; color: #718096;">
                        <i class="fas fa-code-branch" style="font-size: 48px; margin-bottom: 20px;"></i>
                        <h3>No JSON to Display</h3>
                        <p>Enter JSON in the input area and click "Format & Validate" to see the result</p>
                    </div>
                `;
            }
            
            // Toggle all tree nodes
            function toggleAllNodes(expand) {
                isExpanded = expand;
                
                if (currentMode === 'tree' && currentJson) {
                    displayTreeView();
                    if (expand) {
                        // Expand all nodes
                        const toggles = viewerContent.querySelectorAll('.tree-toggle');
                        toggles.forEach(toggle => {
                            const children = toggle.parentElement.querySelector('.tree-children');
                            if (children) {
                                children.style.display = 'block';
                                toggle.textContent = '−';
                            }
                        });
                    }
                }
            }
            
            // Update statistics
            function updateStats() {
                if (!currentJson) {
                    statSize.textContent = '0';
                    statLines.textContent = '0';
                    statKeys.textContent = '0';
                    statDepth.textContent = '0';
                    return;
                }
                
                const jsonString = JSON.stringify(currentJson);
                
                // Size
                statSize.textContent = jsonString.length;
                
                // Lines (in formatted version)
                const formatted = JSON.stringify(currentJson, null, 2);
                statLines.textContent = formatted.split('\n').length;
                
                // Count keys
                const keyCount = countKeys(currentJson);
                statKeys.textContent = keyCount;
                
                // Calculate depth
                const depth = calculateDepth(currentJson);
                statDepth.textContent = depth;
            }
            
            // Count all keys in JSON
            function countKeys(obj) {
                if (!obj || typeof obj !== 'object') return 0;
                
                let count = 0;
                
                if (Array.isArray(obj)) {
                    obj.forEach(item => {
                        count += countKeys(item);
                    });
                } else {
                    count += Object.keys(obj).length;
                    Object.values(obj).forEach(value => {
                        count += countKeys(value);
                    });
                }
                
                return count;
            }
            
            // Calculate maximum depth of JSON
            function calculateDepth(obj, currentDepth = 0) {
                if (!obj || typeof obj !== 'object') return currentDepth;
                
                if (Array.isArray(obj)) {
                    if (obj.length === 0) return currentDepth + 1;
                    return Math.max(...obj.map(item => calculateDepth(item, currentDepth + 1)));
                } else {
                    if (Object.keys(obj).length === 0) return currentDepth + 1;
                    return Math.max(...Object.values(obj).map(value => calculateDepth(value, currentDepth + 1)));
                }
            }
            
            // Update status indicator
            function updateStatus(type, message) {
                statusIndicator.className = 'status-indicator';
                statusText.textContent = message;
                
                switch (type) {
                    case 'valid':
                        statusIndicator.classList.add('valid');
                        break;
                    case 'invalid':
                        statusIndicator.classList.add('invalid');
                        break;
                    case 'ready':
                        // Default state
                        break;
                }
            }
            
            // Helper functions
            function replacer(key, value) {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    return Object.keys(value).sort().reduce((sorted, key) => {
                        sorted[key] = value[key];
                        return sorted;
                    }, {});
                }
                return value;
            }
            
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
            
            function escapeHtml(text) {
                const div = document.createElement('div');
                div.textContent = text;
                return div.innerHTML;
            }
            
            function handleTabKey(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = this.selectionStart;
                    const end = this.selectionEnd;
                    
                    // Insert tab
                    this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                    
                    // Move cursor
                    this.selectionStart = this.selectionEnd = start + 2;
                }
            }
            
            // Syntax highlighting for JSON
            function syntaxHighlight(json) {
                json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
                    let cls = 'syntax-number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'syntax-key';
                        } else {
                            cls = 'syntax-string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'syntax-boolean';
                    } else if (/null/.test(match)) {
                        cls = 'syntax-null';
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                });
            }
            
            // Initialize the application
            init();
        });