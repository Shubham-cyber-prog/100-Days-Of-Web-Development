import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, TrendingUp, Users, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const mockResponses: Record<string, string> = {
  "market trends": "Based on the latest data, I'm seeing strong growth in the SaaS sector (+23% YoY) and increasing adoption of AI-powered tools. The top trending keywords are: automation, personalization, and data analytics. Would you like me to generate a detailed trends report?",
  "competitor": "Your main competitors show varied positioning: TechCorp leads in market share (34%), while InnovateCo has the fastest growth rate (+45% QoQ). Their pricing strategies differ significantly - TechCorp focuses on enterprise while InnovateCo targets SMBs. Should I create a competitive matrix?",
  "customer": "Customer sentiment analysis reveals 78% positive feedback, with main pain points around onboarding (mentioned 234 times) and integration capabilities (189 mentions). Top requested features include: API access, custom dashboards, and mobile apps.",
  "export": "You can export any report using the Export button in the top-right corner. Available formats are PDF (with full charts), CSV (raw data), and PNG (visualizations). Would you like me to guide you through the export process?",
  "data": "Currently tracking 47 data sources including social media (Twitter, LinkedIn), news feeds (TechCrunch, Reuters), and market databases (Statista, Gartner). Last sync: 15 minutes ago. Need to add more sources?",
};

const quickSuggestions = [
  { icon: TrendingUp, text: "What are the latest market trends?", query: "market trends" },
  { icon: Users, text: "Show competitor analysis", query: "competitor" },
  { icon: AlertCircle, text: "Customer sentiment summary", query: "customer" },
  { icon: Sparkles, text: "Generate insights report", query: "insights report" },
];

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hi! I'm your AI Market Research Assistant. I can help you analyze trends, understand competitors, explore customer insights, and generate reports. What would you like to know?",
      timestamp: new Date(),
      suggestions: ["What are the latest market trends?", "Show competitor analysis", "Customer sentiment summary"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (message?: string) => {
    const messageText = message || input.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerMessage = messageText.toLowerCase();
      let response = "I understand you're asking about " + messageText + ". Let me analyze the latest data for you. This is a simulated response - in production, this would connect to your actual AI backend for real insights.";

      // Check for keyword matches
      for (const [key, value] of Object.entries(mockResponses)) {
        if (lowerMessage.includes(key)) {
          response = value;
          break;
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
        suggestions: ["Tell me more", "Generate a report", "Show visualizations"],
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 relative group"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-2xl">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Assistant</h3>
                  <p className="text-xs text-white/80">Always ready to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl rounded-tr-sm"
                          : "bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm"
                      } p-3 shadow-sm`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.suggestions && message.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-200">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSend(suggestion)}
                              className="text-xs h-7 bg-white hover:bg-gray-50"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 shadow-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}

                {messages.length === 1 && (
                  <div className="space-y-2 mt-4">
                    <p className="text-xs text-gray-500 font-medium mb-2">Quick actions:</p>
                    {quickSuggestions.map((suggestion, idx) => {
                      const Icon = suggestion.icon;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSend(suggestion.text)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group"
                        >
                          <div className="p-2 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg group-hover:from-blue-100 group-hover:to-teal-100">
                            <Icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">{suggestion.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                <Sparkles className="h-3 w-3 inline mr-1" />
                Powered by AI · Results may vary
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
