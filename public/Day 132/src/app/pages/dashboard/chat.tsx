import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Mic, Paperclip, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Summarize my tasks for today",
    "Schedule a meeting tomorrow",
    "What's the weather like?",
    "Help me draft an email",
  ];

  const conversationHistory = [
    { title: "Project Planning Discussion", time: "2 hours ago" },
    { title: "Marketing Strategy", time: "Yesterday" },
    { title: "Code Review Questions", time: "2 days ago" },
    { title: "Team Meeting Notes", time: "3 days ago" },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand your request. Let me help you with that. This is a demo response showing how the AI assistant would interact with you in a real conversation.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Conversation History Sidebar */}
      <div className="hidden lg:block">
        <Card className="h-full backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Conversation History</h3>
            <div className="space-y-2">
              {conversationHistory.map((conv, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-2xl hover:bg-white/60 transition-all"
                >
                  <p className="text-sm font-medium truncate">{conv.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{conv.time}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="lg:col-span-3 flex flex-col">
        <Card className="flex-1 backdrop-blur-xl bg-white/80 border-white/40 rounded-3xl flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b border-white/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">AI Assistant</h2>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-6" ref={scrollRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <Avatar className="w-9 h-9 flex-shrink-0">
                      <AvatarFallback
                        className={
                          message.role === "assistant"
                            ? "bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white"
                            : "bg-gray-200"
                        }
                      >
                        {message.role === "assistant" ? (
                          <Bot className="w-5 h-5" />
                        ) : (
                          <User className="w-5 h-5" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] ${message.role === "user" ? "items-end" : "items-start"} flex flex-col`}
                    >
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white"
                            : "bg-white/60 backdrop-blur-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 px-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <Avatar className="w-9 h-9">
                    <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] text-white">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested Prompts */}
              {messages.length === 1 && (
                <div className="pt-4">
                  <p className="text-sm text-gray-500 mb-3 text-center">Try asking:</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestedPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setInput(prompt)}
                        className="px-4 py-2 rounded-full bg-white/60 hover:bg-white/80 text-sm transition-all border border-white/40"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 border-t border-white/40">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-2xl flex-shrink-0"
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="rounded-2xl pr-12 bg-white/50 border-2 focus:border-[#4f46e5] transition-all"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-xl"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
              <Button
                onClick={handleSend}
                disabled={!input.trim()}
                className="rounded-2xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:opacity-90 flex-shrink-0 shadow-lg shadow-indigo-500/30"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
