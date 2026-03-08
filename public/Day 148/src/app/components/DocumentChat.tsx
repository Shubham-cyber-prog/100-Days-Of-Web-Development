import { Send, Bot, User, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface DocumentChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DocumentChat({ isOpen, onClose }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your AI assistant. Ask me anything about your document and I'll help you find the information you need.",
      timestamp: '10:30 AM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestedQuestions = [
    "What are the key findings?",
    "Summarize the financial data",
    "What are the main recommendations?",
    "Extract action items"
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: getBotResponse(text),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'key findings': 'The key findings from the Q4 Financial Report include: 1) Revenue increased 23% YoY to $45.2M, 2) EBITDA margin improved to 18.5%, 3) Cloud services grew 45% YoY, and 4) Asia-Pacific region showed strongest growth at 38%.',
      'financial data': 'The financial highlights are: Total Revenue: $45.2M (+23% YoY), Enterprise Software: $28.3M (+26%), Professional Services: $12.1M, Cloud Services: $4.8M (+45%), Operating Expenses: $36.9M (+18%), EBITDA Margin: 18.5%.',
      'recommendations': 'The main recommendations are: 1) Continue investment in cloud-based offerings due to 45% growth, 2) Expand operations in Asia-Pacific region, 3) Maintain focus on operational efficiency, and 4) Strategic R&D investments in emerging technologies.',
      'action items': 'Key action items identified: 1) Increase cloud infrastructure capacity, 2) Hire sales team for APAC expansion, 3) Implement cost optimization initiatives, 4) Launch new enterprise features by Q2 2026, 5) Review and optimize marketing spend allocation.'
    };

    const lowerQuestion = question.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response;
      }
    }

    return "Based on the Q4 Financial Report, the company demonstrated strong performance with significant revenue growth and improved operational efficiency. The document highlights strategic investments in cloud services and expansion in high-growth markets like Asia-Pacific. Would you like me to elaborate on any specific section?";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-screen w-[420px] bg-white border-l border-border shadow-2xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold">AI Document Chat</h2>
                  <p className="text-xs text-muted-foreground">Ask questions about your document</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  message.type === 'bot'
                    ? 'bg-gradient-to-br from-purple-100 to-blue-100'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200'
                }`}>
                  {message.type === 'bot' ? (
                    <Bot className="w-4 h-4 text-purple-600" />
                  ) : (
                    <User className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className={`flex-1 ${message.type === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`rounded-2xl px-4 py-3 max-w-[85%] ${
                    message.type === 'bot'
                      ? 'bg-gray-100 text-foreground'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'bot' ? 'text-muted-foreground' : 'text-purple-100'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100">
                  <Bot className="w-4 h-4 text-purple-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground mb-3">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(question)}
                    className="px-3 py-2 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 text-sm text-purple-700 hover:shadow-md transition-shadow"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-6 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Ask a question about the document..."
                className="flex-1 h-11 px-4 rounded-xl bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all"
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={!inputMessage.trim()}
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
