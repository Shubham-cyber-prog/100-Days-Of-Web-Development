// Application State
const state = {
    serverUrl: localStorage.getItem('serverUrl') || 'http://localhost:3000',
    model: localStorage.getItem('model') || 'llama-3.1-8b-instant',
    currentConversationId: null,
    conversations: JSON.parse(localStorage.getItem('conversations')) || [],
    isDarkTheme: true,
    isTyping: false,
    serverConnected: false,
    connectionTested: false
};

// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const serverUrlInput = document.getElementById('serverUrl');
const modelSelect = document.getElementById('apiModel');
const saveConfigBtn = document.getElementById('saveConfig');
const testConnectionBtn = document.getElementById('testConnection');
const conversationsList = document.getElementById('conversationsList');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');
const newChatBtn = document.getElementById('newChat');
const clearChatBtn = document.getElementById('clearChat');
const exportChatBtn = document.getElementById('exportChat');
const saveChatBtn = document.getElementById('saveChat');
const suggestTopicBtn = document.getElementById('suggestTopic');
const fixGrammarBtn = document.getElementById('fixGrammar');
const explainCodeBtn = document.getElementById('explainCode');
const summarizeBtn = document.getElementById('summarize');
const translateBtn = document.getElementById('translate');
const refreshConversationsBtn = document.getElementById('refreshConversations');
const clearInputBtn = document.getElementById('clearInput');
const voiceInputBtn = document.getElementById('voiceInput');
const serverStatus = document.getElementById('serverStatus');
const statusText = document.getElementById('statusText');
const modelText = document.getElementById('modelText');
const lastSync = document.getElementById('lastSync');
const totalConversations = document.getElementById('totalConversations');
const totalMessages = document.getElementById('totalMessages');
const chatTitle = document.getElementById('chatTitle');
const chatSubtitle = document.getElementById('chatSubtitle');
const currentModel = document.getElementById('currentModel');
const messageCount = document.getElementById('messageCount');
const charCount = document.getElementById('charCount');

// Initialize the application
async function initApp() {
    // Load saved settings
    serverUrlInput.value = state.serverUrl;
    modelSelect.value = state.model;
    updateModelDisplay();
    
    // Load conversations and update stats
    renderConversations();
    updateConversationStats();
    
    // Load the last active conversation or create a new one
    if (state.conversations.length > 0) {
        const lastConversation = state.conversations[state.conversations.length - 1];
        loadConversation(lastConversation.id);
    } else {
        createNewConversation();
    }
    
    // Set up event listeners
    setupEventListeners();
    createParticles();
    // Apply saved theme
    if (localStorage.getItem('theme') === 'light') {
        toggleTheme();
    }
    
    // Connect to server
    await connectToServer();
    
    // Load models from server
    await loadModels();
    
    // Initialize character counter
    updateCharCount();
}

// Connect to server
async function connectToServer() {
    updateServerStatus('connecting', 'Connecting to server...');
    
    try {
        // Test server connection with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${state.serverUrl}/health`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
            state.serverConnected = true;
            state.connectionTested = true;
            updateServerStatus('connected', 'Connected to server');
            updateLastSync();
            showNotification('Successfully connected to server!', 'success');
        } else {
            throw new Error(`Server responded with status: ${response.status}`);
        }
    } catch (error) {
        console.error('Failed to connect to server:', error);
        state.serverConnected = false;
        
        if (error.name === 'AbortError') {
            updateServerStatus('disconnected', 'Connection timeout');
            showNotification('Server connection timeout. Please check if server is running.', 'warning');
        } else {
            updateServerStatus('disconnected', 'Server not available');
            showNotification('Cannot connect to server. Make sure it\'s running on ' + state.serverUrl, 'danger');
        }
    }
}

// Load models from server
async function loadModels() {
    try {
        const response = await fetch(`${state.serverUrl}/api/models`);
        const data = await response.json();
        
        if (data.success && data.models && data.models.length > 0) {
            // Clear existing options
            modelSelect.innerHTML = '';
            
            // Add new options from server
            data.models.forEach(model => {
                const option = document.createElement('option');
                option.value = model.id;
                option.textContent = model.name + (model.description ? ` - ${model.description}` : '');
                if (model.id === state.model) {
                    option.selected = true;
                }
                modelSelect.appendChild(option);
            });
            
            // If default model is specified, use it
            if (data.defaultModel && !state.model) {
                state.model = data.defaultModel;
                modelSelect.value = data.defaultModel;
            }
            
            updateModelDisplay();
        } else {
            loadDefaultModels();
        }
    } catch (error) {
        console.error('Failed to load models:', error);
        loadDefaultModels();
    }
}

// Load default models (fallback)
function loadDefaultModels() {
    modelSelect.innerHTML = '';
    
    const defaultModels = [
        { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant' },
        { id: 'llama-3.1-70b-versatile', name: 'Llama 3.1 70B Versatile' },
        { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
        { id: 'gemma2-9b-it', name: 'Gemma 2 9B' }
    ];
    
    defaultModels.forEach(model => {
        const option = document.createElement('option');
        option.value = model.id;
        option.textContent = model.name;
        if (model.id === state.model) {
            option.selected = true;
        }
        modelSelect.appendChild(option);
    });
    
    updateModelDisplay();
}

// Test server connection
async function testConnection() {
    updateServerStatus('connecting', 'Testing connection...');
    
    try {
        const response = await fetch(`${state.serverUrl}/api/test`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            updateServerStatus('connected', 'API Key Valid! Available: ' + (data.availableModels?.length || 0) + ' models');
            showNotification('Connection successful! API key is valid.', 'success');
            
            // Refresh models list
            await loadModels();
        } else {
            throw new Error(data.error || 'Connection test failed');
        }
    } catch (error) {
        console.error('Connection test failed:', error);
        updateServerStatus('disconnected', 'Connection failed');
        showNotification('Connection test failed: ' + error.message, 'danger');
    }
}

// Update server status display
function updateServerStatus(status, message = '') {
    serverStatus.className = 'server-status ' + status;
    
    const icon = serverStatus.querySelector('i');
    const text = serverStatus.querySelector('span');
    
    if (message) {
        text.textContent = message;
    }
    
    if (statusText) {
        statusText.textContent = message || 
            (status === 'connected' ? 'Connected' : 
             status === 'connecting' ? 'Connecting...' : 'Disconnected');
        statusText.style.color = 
            status === 'connected' ? 'var(--success)' :
            status === 'connecting' ? 'var(--warning)' : 'var(--danger)';
    }
}

// Update model display
function updateModelDisplay() {
    if (modelText) {
        modelText.textContent = state.model;
    }
    if (currentModel) {
        currentModel.textContent = `Model: ${state.model}`;
    }
}

// Update last sync time
function updateLastSync() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    if (lastSync) {
        lastSync.textContent = timeString;
    }
}

// Update conversation statistics
function updateConversationStats() {
    const totalConvs = state.conversations.length;
    const totalMsgs = state.conversations.reduce((sum, conv) => sum + conv.messages.length, 0);
    
    if (totalConversations) {
        totalConversations.textContent = totalConvs;
    }
    if (totalMessages) {
        totalMessages.textContent = totalMsgs;
    }
}

// Update character count
function updateCharCount() {
    const count = chatInput.value.length;
    if (charCount) {
        charCount.textContent = count;
        charCount.style.color = count > 1800 ? 'var(--danger)' : 
                               count > 1500 ? 'var(--warning)' : 
                               count > 1000 ? 'var(--warning)' : '#94a3b8';
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Save configuration
    saveConfigBtn.addEventListener('click', saveConfig);
    
    // Test connection
    testConnectionBtn.addEventListener('click', testConnection);
    
    // Model selection change
    modelSelect.addEventListener('change', () => {
        state.model = modelSelect.value;
        updateModelDisplay();
        localStorage.setItem('model', state.model);
    });
    
    // Send message on button click
    sendBtn.addEventListener('click', sendMessage);
    
    // Send message on Enter (but allow Shift+Enter for new line)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Character count update
    chatInput.addEventListener('input', () => {
        updateCharCount();
        autoResizeTextarea();
    });
    
    // Clear input
    clearInputBtn.addEventListener('click', () => {
        chatInput.value = '';
        updateCharCount();
        autoResizeTextarea();
    });
    
    // Voice input (placeholder for future implementation)
    voiceInputBtn.addEventListener('click', () => {
        showNotification('Voice input feature coming soon!', 'info');
    });
    
    // New chat button
    newChatBtn.addEventListener('click', createNewConversation);
    
    // Clear chat button
    clearChatBtn.addEventListener('click', clearCurrentConversation);
    
    // Export chat button
    exportChatBtn.addEventListener('click', exportCurrentConversation);
    
    // Save chat button
    saveChatBtn.addEventListener('click', () => {
        saveConversations();
        showNotification('Conversation saved locally!', 'success');
    });
    
    // Refresh conversations
    refreshConversationsBtn.addEventListener('click', () => {
        renderConversations();
        showNotification('Conversation list refreshed!', 'info');
    });
    
    // Quick action buttons
    suggestTopicBtn.addEventListener('click', () => quickAction('suggestTopic'));
    fixGrammarBtn.addEventListener('click', () => quickAction('fixGrammar'));
    explainCodeBtn.addEventListener('click', () => quickAction('explainCode'));
    summarizeBtn.addEventListener('click', () => quickAction('summarize'));
    translateBtn.addEventListener('click', () => quickAction('translate'));
    
    // Auto-resize textarea
    chatInput.addEventListener('input', autoResizeTextarea);
    
    // Input mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const mode = this.dataset.mode;
            if (mode === 'code') {
                chatInput.placeholder = 'Type your code here... Use Shift+Enter for new line';
            } else {
                chatInput.placeholder = 'Type your message here... Press Enter to send, Shift+Enter for new line';
            }
        });
    });
}

// Toggle between dark and light themes
function toggleTheme() {
    state.isDarkTheme = !state.isDarkTheme;
    document.body.classList.toggle('light-theme');
    
    if (state.isDarkTheme) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
        localStorage.setItem('theme', 'light');
    }
}

// Save configuration
async function saveConfig() {
    const newServerUrl = serverUrlInput.value.trim();
    const newModel = modelSelect.value;
    
    // Validate URL
    if (!newServerUrl) {
        showNotification('Please enter a server URL', 'warning');
        return;
    }
    
    // Update state
    state.serverUrl = newServerUrl;
    state.model = newModel;
    
    // Save to localStorage
    localStorage.setItem('serverUrl', newServerUrl);
    localStorage.setItem('model', newModel);
    
    // Update displays
    updateModelDisplay();
    
    // Reconnect to server
    await connectToServer();
    
    // Load models from new server
    await loadModels();
    
    // Show confirmation
    showNotification('Configuration saved successfully!', 'success');
}

// Create a new conversation
function createNewConversation() {
    const conversationId = 'conv_' + Date.now();
    const conversation = {
        id: conversationId,
        title: 'New Conversation',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    state.conversations.push(conversation);
    state.currentConversationId = conversationId;
    
    saveConversations();
    renderConversations();
    clearChatMessages();
    updateConversationStats();
    updateChatTitle();
    
    // Add welcome message
    if (!state.serverConnected) {
        addMessage('ai', `Hello! I'm your AI assistant. Currently, I'm not connected to the server. Please make sure the backend server is running at ${state.serverUrl} and click "Save & Connect" in the sidebar.`, false, true);
    } else {
        addMessage('ai', 'Hello! I\'m your AI assistant powered by Groq\'s ultra-fast AI models. I\'m here to help you with questions, brainstorming, coding, writing, and much more. How can I assist you today?', false, true);
    }
    
    // Update conversation title after first user message
    setTimeout(() => {
        const conversation = state.conversations.find(c => c.id === conversationId);
        if (conversation && conversation.messages.length === 0) {
            conversation.title = 'New Conversation';
            saveConversations();
            renderConversations();
        }
    }, 1000);
}

// Load a conversation by ID
function loadConversation(conversationId) {
    const conversation = state.conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    state.currentConversationId = conversationId;
    clearChatMessages();
    
    // Mark as active in the list
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.id === conversationId) {
            item.classList.add('active');
        }
    });
    
    // Render messages
    conversation.messages.forEach(msg => {
        // Handle both 'ai' and 'assistant' roles in stored messages
        const displayRole = msg.role === 'assistant' ? 'ai' : msg.role;
        addMessage(displayRole, msg.content, false, false, msg.timestamp);
    });
    
    // If no messages, add welcome
    if (conversation.messages.length === 0) {
        if (!state.serverConnected) {
            addMessage('ai', `Hello! I'm your AI assistant. Currently, I'm not connected to the server. Please make sure the backend server is running at ${state.serverUrl} and click "Save & Connect" in the sidebar.`, false, true);
        } else {
            addMessage('ai', 'Hello! I\'m your AI assistant. How can I help you today?', false, true);
        }
    }
    
    // Update chat info
    updateChatTitle();
    updateMessageCount();
    
    // Scroll to bottom
    scrollToBottom();
}

// Clear current conversation
function clearCurrentConversation() {
    if (!state.currentConversationId) return;
    
    if (!confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
        return;
    }
    
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (!conversation) return;
    
    conversation.messages = [];
    conversation.updatedAt = new Date().toISOString();
    saveConversations();
    clearChatMessages();
    
    // Add new welcome message
    if (!state.serverConnected) {
        addMessage('ai', `Conversation cleared. I'm your AI assistant. Currently, I'm not connected to the server. Please make sure the backend server is running at ${state.serverUrl} and click "Save & Connect" in the sidebar.`, false, true);
    } else {
        addMessage('ai', 'Conversation cleared. How can I help you today?', false, true);
    }
    
    updateMessageCount();
    showNotification('Conversation cleared', 'info');
}

// Update chat title
function updateChatTitle() {
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (!conversation) return;
    
    if (chatTitle) {
        chatTitle.textContent = conversation.title || 'AI Chat Assistant';
    }
    
    if (chatSubtitle) {
        const msgCount = conversation.messages.length;
        const lastUpdate = new Date(conversation.updatedAt).toLocaleDateString();
        chatSubtitle.textContent = `${msgCount} messages • Last updated: ${lastUpdate}`;
    }
}

// Update message count
function updateMessageCount() {
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (conversation && messageCount) {
        messageCount.textContent = `Messages: ${conversation.messages.length}`;
    }
}

// Send a message
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) {
        showNotification('Please enter a message', 'warning');
        return;
    }
    
    if (message.length > 2000) {
        showNotification('Message too long (max 2000 characters)', 'warning');
        return;
    }
    
    // Clear input
    chatInput.value = '';
    updateCharCount();
    autoResizeTextarea();
    
    // Add user message to UI
    addMessage('user', message);
    
    // Get current conversation
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (!conversation) return;
    
    // Update conversation title if it's the first message
    if (conversation.messages.length === 0) {
        conversation.title = message.length > 30 ? message.substring(0, 30) + '...' : message;
        updateChatTitle();
        saveConversations();
        renderConversations();
    }
    
    // Save user message to conversation (role as 'user')
    saveMessageToConversation('user', message);
    updateMessageCount();
    
    // Check server connection
    if (!state.serverConnected) {
        showNotification('Cannot connect to server. Please check your connection.', 'warning');
        
        // Simulate AI response after delay
        setTimeout(() => {
            const mockResponse = "I'd be happy to help with that! However, I'm currently unable to connect to the AI server. Please make sure the server is running and you're connected to it. Click 'Save & Connect' in the sidebar after starting the server.";
            addMessage('ai', mockResponse);
            saveMessageToConversation('assistant', mockResponse); // Store as 'assistant' for API compatibility
            updateMessageCount();
        }, 1000);
        return;
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Get conversation history for context
        // Map stored 'ai' role to 'assistant' for Groq API
        const history = conversation.messages.slice(-8).map(msg => ({
            role: msg.role === 'ai' ? 'assistant' : msg.role,
            content: msg.content
        }));
        
        console.log('Sending request with model:', state.model);
        console.log('History length:', history.length);
        
        // Call server API
        const response = await fetch(`${state.serverUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                model: state.model,
                history: history
            })
        });
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        if (response.ok && data.success) {
            // Add AI response to UI (display as 'ai')
            addMessage('ai', data.response);
            // Save to conversation (store as 'assistant' for API compatibility)
            saveMessageToConversation('assistant', data.response);
            updateMessageCount();
            
            // Update last sync
            updateLastSync();
            
            // Show token usage if available
            if (data.tokens) {
                console.log(`Tokens used: ${data.tokens}`);
            }
        } else {
            // Handle API errors
            let errorMsg = data.error || 'Failed to get response';
            let suggestion = data.suggestion || 'Please try again';
            
            // Special handling for deprecated models
            if (errorMsg.includes('model_decommissioned') || errorMsg.includes('deprecated')) {
                errorMsg = 'The selected model has been deprecated.';
                suggestion = 'Please switch to a newer model like llama-3.1-8b-instant.';
                
                // Auto-switch to default model
                state.model = 'llama-3.1-8b-instant';
                modelSelect.value = state.model;
                updateModelDisplay();
                localStorage.setItem('model', state.model);
                
                showNotification('Auto-switched to llama-3.1-8b-instant. Please try your message again.', 'warning');
            }
            
            throw new Error(`${errorMsg} - ${suggestion}`);
        }
    } catch (error) {
        // Remove typing indicator
        removeTypingIndicator();
        
        // Show error message
        console.error('Server Error:', error);
        
        let errorMessage = `Sorry, I encountered an error: ${error.message || 'Unknown error'}. `;
        
        if (error.message.includes('model_decommissioned') || error.message.includes('deprecated')) {
            errorMessage = "The selected AI model has been deprecated. I've automatically switched to llama-3.1-8b-instant. Please try your message again.";
        } else if (error.message.includes('invalid value')) {
            errorMessage = "There was an issue with the message format. I'll reset the conversation.";
            createNewConversation();
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = 'Please check your server connection and URL.';
        } else {
            errorMessage = 'Please try again or check your server configuration.';
        }
        
        addMessage('ai', errorMessage);
        saveMessageToConversation('assistant', errorMessage);
        updateMessageCount();
        
        showNotification('Error: ' + error.message, 'danger');
    }
}

// Quick action buttons
function quickAction(action) {
    let prompt = '';
    let placeholder = '';
    
    switch(action) {
        case 'suggestTopic':
            prompt = "Suggest 5 interesting conversation topics we could discuss about technology, science, or creativity.";
            placeholder = "I'll suggest some interesting topics for our conversation...";
            break;
        case 'fixGrammar':
            const selectedText = window.getSelection().toString();
            if (selectedText) {
                prompt = `Please fix the grammar and improve this text: "${selectedText}"`;
                placeholder = "I'll fix the grammar in your selected text...";
            } else {
                prompt = "I'd like you to help me fix grammar in some text. Please provide the text you'd like me to correct.";
                placeholder = "Please provide the text you'd like me to correct...";
            }
            break;
        case 'explainCode':
            prompt = "Can you explain how this JavaScript code works: `function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }`";
            placeholder = "I'll explain how the Fibonacci function works...";
            break;
        case 'summarize':
            prompt = "Can you summarize the key benefits of using AI-powered chatbots in customer service? Provide a concise summary.";
            placeholder = "I'll summarize the benefits of AI chatbots in customer service...";
            break;
        case 'translate':
            prompt = "Translate 'Hello, how are you today?' to Spanish, French, and German.";
            placeholder = "I'll translate your text to multiple languages...";
            break;
    }
    
    if (prompt) {
        chatInput.value = prompt;
        updateCharCount();
        autoResizeTextarea();
        chatInput.focus();
        
        // If we have a direct prompt, send it immediately
        if (action !== 'fixGrammar' || window.getSelection().toString()) {
            setTimeout(() => {
                sendMessage();
            }, 100);
        }
    }
}

// Add a message to the UI
function addMessage(role, content, isTemp = false, isWelcome = false, timestamp = null) {
    // Remove welcome message if it exists and this is not a welcome message
    if (!isWelcome) {
        const welcomeMsg = document.querySelector('.welcome-message');
        if (welcomeMsg) {
            welcomeMsg.remove();
        }
    }
    
    // If it's a welcome message, don't add duplicate message bubbles
    if (isWelcome && document.querySelector('.message.ai')) {
        return;
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    if (isTemp) {
        messageDiv.id = 'tempMessage';
    }
    
    const time = timestamp ? new Date(timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
                         : new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Format message content with line breaks and basic markdown
    const formattedContent = formatMessage(content);
    
    messageDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <p>${formattedContent}</p>
            <div class="message-time">${time}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Format message with line breaks and basic markdown
function formatMessage(text) {
    if (!text) return '';
    
    // Replace newlines with <br>
    let formatted = text.replace(/\n/g, '<br>');
    
    // Simple markdown-like formatting
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/`(.*?)`/g, '<code>$1</code>');
    
    // Convert code blocks (triple backticks)
    formatted = formatted.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        return `<div class="code-block"><pre><code>${code.trim()}</code></pre></div>`;
    });
    
    return formatted;
}

// Show typing indicator
function showTypingIndicator() {
    if (state.isTyping) return;
    
    state.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 1-5px
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Random color with opacity
        const colors = [
            'rgba(99, 102, 241, 0.1)',
            'rgba(139, 92, 246, 0.1)',
            'rgba(16, 185, 129, 0.1)',
            'rgba(59, 130, 246, 0.1)'
        ];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}
// Remove typing indicator
function removeTypingIndicator() {
    state.isTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Save message to current conversation
function saveMessageToConversation(role, content) {
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (!conversation) return;
    
    conversation.messages.push({
        role: role, // 'user' or 'assistant'
        content: content,
        timestamp: new Date().toISOString()
    });
    
    conversation.updatedAt = new Date().toISOString();
    saveConversations();
    renderConversations();
    updateConversationStats();
}

// Save conversations to localStorage
function saveConversations() {
    try {
        // Keep only last 50 conversations to prevent storage issues
        if (state.conversations.length > 50) {
            state.conversations = state.conversations.slice(-50);
        }
        
        localStorage.setItem('conversations', JSON.stringify(state.conversations));
    } catch (error) {
        console.error('Failed to save conversations:', error);
        showNotification('Failed to save conversation. Local storage might be full.', 'danger');
    }
}

// Render conversations list
function renderConversations() {
    conversationsList.innerHTML = '';
    
    if (state.conversations.length === 0) {
        conversationsList.innerHTML = `
            <div class="conversation-item empty-state">
                <div class="conversation-title">No conversations yet</div>
                <div class="conversation-preview">Start a new chat to begin!</div>
            </div>
        `;
        return;
    }
    
    // Sort by updated date (newest first)
    const sortedConversations = [...state.conversations].sort((a, b) => 
        new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    
    sortedConversations.forEach(conversation => {
        const conversationItem = document.createElement('div');
        conversationItem.className = `conversation-item ${conversation.id === state.currentConversationId ? 'active' : ''}`;
        conversationItem.dataset.id = conversation.id;
        
        const date = new Date(conversation.updatedAt);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        // Get preview from last message
        let preview = 'No messages yet';
        if (conversation.messages.length > 0) {
            const lastMsg = conversation.messages[conversation.messages.length - 1];
            preview = lastMsg.content.length > 50 ? lastMsg.content.substring(0, 50) + '...' : lastMsg.content;
        }
        
        conversationItem.innerHTML = `
            <div class="conversation-title">${conversation.title}</div>
            <div class="conversation-preview">${preview}</div>
            <div class="conversation-date">${formattedDate} • ${conversation.messages.length} messages</div>
        `;
        
        conversationItem.addEventListener('click', () => {
            loadConversation(conversation.id);
        });
        
        conversationsList.appendChild(conversationItem);
    });
}

// Clear chat messages UI
function clearChatMessages() {
    chatMessages.innerHTML = '';
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Auto-resize textarea
function autoResizeTextarea() {
    chatInput.style.height = 'auto';
    chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
}

// Show notification
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: 'fas fa-check-circle',
        warning: 'fas fa-exclamation-triangle',
        danger: 'fas fa-times-circle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="${icons[type] || icons.info}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Export current conversation
function exportCurrentConversation() {
    const conversation = state.conversations.find(c => c.id === state.currentConversationId);
    if (!conversation || conversation.messages.length === 0) {
        showNotification('No conversation to export', 'warning');
        return;
    }
    
    // Format conversation for export
    let exportText = `AI Chat Conversation Export\n`;
    exportText += `Title: ${conversation.title}\n`;
    exportText += `Date: ${new Date().toLocaleString()}\n`;
    exportText += `Model: ${state.model}\n`;
    exportText += `Server: ${state.serverUrl}\n`;
    exportText += '='.repeat(50) + '\n\n';
    
    conversation.messages.forEach((msg, index) => {
        const role = msg.role === 'user' ? 'You' : 'AI Assistant';
        const time = new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        exportText += `${index + 1}. ${role} (${time}):\n`;
        exportText += `${msg.content}\n\n`;
    });
    
    // Create download link
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-chat-${conversation.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Conversation exported successfully!', 'success');
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Add utility function for code formatting
function formatCode(code, language) {
    return `<pre><code class="language-${language}">${code}</code></pre>`;
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + N for new chat
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        createNewConversation();
    }
    
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveConversations();
        showNotification('All conversations saved!', 'success');
    }
    
    // Escape to clear input
    if (e.key === 'Escape' && document.activeElement === chatInput) {
        chatInput.value = '';
        updateCharCount();
        autoResizeTextarea();
    }
});

// Add service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('ServiceWorker registration failed: ', error);
        });
    });
}