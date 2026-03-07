import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Code, Sparkles, Copy, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  codeBlock?: string;
}

const exampleQuestions = [
  "Explain the security vulnerability in line 42",
  "How can I optimize this function's performance?",
  "What are the best practices for error handling here?",
  "Suggest refactoring options for this code",
];

const mockResponses = [
  "The security vulnerability on line 42 is related to SQL injection. You're directly concatenating user input into a SQL query. I recommend using parameterized queries or an ORM to prevent this. Here's a safer approach:\n\n```typescript\nconst result = await db.query(\n  'SELECT * FROM users WHERE id = $1',\n  [userId]\n);\n```",
  "Great question! To optimize this function's performance, consider implementing memoization for expensive calculations. The current implementation recalculates values on every render, which is inefficient. You could use `useMemo` or cache results based on input parameters.",
  "For robust error handling, I recommend implementing a try-catch block with specific error types. Also consider:\n1. Logging errors for debugging\n2. Providing user-friendly error messages\n3. Implementing retry logic for transient failures\n4. Using error boundaries for React components",
  "This code would benefit from several refactoring improvements:\n1. Extract the business logic into a separate service\n2. Break down the large function into smaller, testable units\n3. Use dependency injection for better testability\n4. Apply the Single Responsibility Principle\n\nWould you like me to show an example of any of these?",
];

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI code review assistant. Ask me anything about your code, best practices, or how to fix specific issues. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInput(question);
    textareaRef.current?.focus();
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message: Message) => {
    const parts = message.content.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3);
        const lines = code.split('\n');
        const language = lines[0].trim();
        const codeContent = lines.slice(1).join('\n');

        return (
          <div key={index} className="my-3 relative group">
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#0f1423] border border-border rounded-t-lg">
              <Badge variant="outline" className="text-xs">
                {language || 'code'}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopy(codeContent, `${message.id}-${index}`)}
              >
                {copiedId === `${message.id}-${index}` ? (
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </Button>
            </div>
            <pre className="p-3 bg-[#0f1423] border border-t-0 border-border rounded-b-lg overflow-x-auto">
              <code className="text-xs font-mono text-muted-foreground">
                {codeContent}
              </code>
            </pre>
          </div>
        );
      }
      
      return (
        <p key={index} className="whitespace-pre-wrap">
          {part}
        </p>
      );
    });
  };

  return (
    <div className="p-4 md:p-6 h-[calc(100vh-4rem)] flex flex-col max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Ask questions about your code and get instant answers
            </p>
          </div>
        </div>
      </div>

      {/* Example Questions */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {exampleQuestions.map((question, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleQuestionClick(question)}
                className="p-3 text-left text-sm rounded-lg border border-border bg-card hover:bg-muted/50 hover:border-primary transition-colors"
              >
                <Code className="h-4 w-4 text-primary mb-1" />
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Messages */}
      <Card className="flex-1 flex flex-col border-border bg-card overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    message.role === 'assistant'
                      ? 'bg-primary/10'
                      : 'bg-muted'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <Bot className="h-4 w-4 text-primary" />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                <div
                  className={`flex-1 space-y-2 ${
                    message.role === 'user' ? 'flex flex-col items-end' : ''
                  }`}
                >
                  <div
                    className={`inline-block rounded-lg p-3 text-sm ${
                      message.role === 'assistant'
                        ? 'bg-muted/50 border border-border'
                        : 'bg-primary text-primary-foreground'
                    } ${message.role === 'user' ? 'max-w-[80%]' : 'w-full'}`}
                  >
                    {message.role === 'assistant' ? (
                      renderMessage(message)
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground px-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-muted/50 border border-border p-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                  className="h-2 w-2 rounded-full bg-primary"
                />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </CardContent>

        {/* Input */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your code..."
              className="min-h-[60px] max-h-[200px] resize-none bg-background"
              rows={2}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="h-[60px] px-4"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  );
}
