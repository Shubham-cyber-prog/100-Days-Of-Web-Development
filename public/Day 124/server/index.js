const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'AI Chat API Server',
        status: 'running',
        endpoints: {
            chat: '/api/chat',
            models: '/api/models',
            health: '/health'
        },
        note: 'Using updated Groq models - llama-3.1-8b-instant is the default'
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        models: ['llama-3.1-8b-instant', 'llama-3.1-70b-versatile', 'mixtral-8x7b-32768', 'gemma2-9b-it']
    });
});

// Get available models - UPDATED with current Groq models
app.get('/api/models', (req, res) => {
    const models = [
        { 
            id: 'llama-3.1-8b-instant', 
            name: 'Llama 3.1 8B Instant', 
            maxTokens: 8192,
            description: 'Fast and efficient for general tasks'
        },
        { 
            id: 'llama-3.1-70b-versatile', 
            name: 'Llama 3.1 70B Versatile', 
            maxTokens: 8192,
            description: 'High quality responses for complex tasks'
        },
        { 
            id: 'mixtral-8x7b-32768', 
            name: 'Mixtral 8x7B', 
            maxTokens: 32768,
            description: 'Excellent for long contexts'
        },
        { 
            id: 'gemma2-9b-it', 
            name: 'Gemma 2 9B', 
            maxTokens: 8192,
            description: 'Google\'s efficient model'
        }
    ];
    res.json({ 
        success: true, 
        models,
        defaultModel: 'llama-3.1-8b-instant'
    });
});

// Chat endpoint - FIXED with proper message validation
app.post('/api/chat', async (req, res) => {
    try {
        const { message, model = 'llama-3.1-8b-instant', history = [] } = req.body;
        
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({ 
                success: false,
                error: 'Valid message is required' 
            });
        }

        // Validate and prepare messages for Groq API
        const messages = [];
        
        // Add system message first
        messages.push({
            role: 'system',
            content: 'You are a helpful AI assistant. Provide accurate, concise, and helpful responses.'
        });
        
        // Add history (ensure proper role validation)
        history.slice(-8).forEach(msg => {
            if (msg && msg.role && msg.content && 
                (msg.role === 'user' || msg.role === 'assistant') &&
                typeof msg.content === 'string' &&
                msg.content.trim().length > 0) {
                
                messages.push({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content.trim()
                });
            }
        });
        
        // Add current user message
        messages.push({
            role: 'user',
            content: message.trim()
        });

        console.log('Sending request to Groq API with model:', model);
        console.log('Message count:', messages.length);

        // Make request to Groq API
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: model,
                messages: messages,
                temperature: 0.7,
                max_tokens: 1024,
                top_p: 0.9,
                stream: false
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
                },
                timeout: 30000 // 30 second timeout
            }
        );

        console.log('Groq API response received');
        
        const aiResponse = response.data.choices[0].message.content;
        
        res.json({
            success: true,
            response: aiResponse,
            model: model,
            tokens: response.data.usage?.total_tokens || 0,
            messageCount: messages.length
        });

    } catch (error) {
        console.error('Groq API Error Details:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        
        let errorMessage = 'Failed to get AI response';
        let details = error.message;
        let suggestion = 'Please check your server configuration and API key';
        
        if (error.response?.data?.error) {
            const groqError = error.response.data.error;
            errorMessage = groqError.message || errorMessage;
            details = groqError.type || details;
            
            if (groqError.message?.includes('model_decommissioned')) {
                suggestion = 'The model has been deprecated. Please use llama-3.1-8b-instant or llama-3.1-70b-versatile instead.';
            } else if (groqError.message?.includes('invalid value')) {
                suggestion = 'Invalid message format. Please check the conversation history.';
            } else if (error.response.status === 401) {
                suggestion = 'Invalid API key. Please check your GROQ_API_KEY in .env file.';
            } else if (error.response.status === 429) {
                suggestion = 'Rate limit exceeded. Please wait a moment and try again.';
            }
        } else if (error.code === 'ECONNABORTED') {
            errorMessage = 'Request timeout';
            suggestion = 'The request took too long. Please try again with a shorter message.';
        }
        
        res.status(error.response?.status || 500).json({
            success: false,
            error: errorMessage,
            details: details,
            suggestion: suggestion,
            model: req.body?.model || 'llama-3.1-8b-instant'
        });
    }
});

// Test endpoint to verify API key
app.get('/api/test', async (req, res) => {
    try {
        const response = await axios.get('https://api.groq.com/openai/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            }
        });
        
        const models = response.data.data.map(m => m.id);
        res.json({
            success: true,
            message: 'API key is valid',
            availableModels: models.filter(m => m.includes('llama') || m.includes('mixtral') || m.includes('gemma'))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Invalid API key or network error',
            details: error.message
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        success: false,
        error: 'Endpoint not found',
        availableEndpoints: ['/', '/health', '/api/chat', '/api/models', '/api/test']
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({ 
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔒 API Key loaded: ${process.env.GROQ_API_KEY ? 'Yes' : 'No (please add to .env)'}`);
    console.log(`📝 Default model: llama-3.1-8b-instant`);
    console.log(`📋 Available endpoints:`);
    console.log(`   GET  /health - Health check`);
    console.log(`   GET  /api/models - List available models`);
    console.log(`   POST /api/chat - Chat endpoint`);
    console.log(`   GET  /api/test - Test API key`);
});