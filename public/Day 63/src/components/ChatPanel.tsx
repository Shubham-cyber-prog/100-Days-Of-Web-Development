import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { ChatMessage } from "@/lib/meeting";

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isTyping?: boolean;
}

const ChatPanel = ({ messages, onSendMessage, isTyping }: ChatPanelProps) => {
  const [text, setText] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text.trim());
    setText("");
  };

  return (
    <div className="w-80 glass-strong flex flex-col h-full animate-fade-in">
      <div className="p-4 border-b border-glass-border">
        <h3 className="font-display font-semibold text-foreground">Chat</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.isLocal ? "items-end" : "items-start"}`}
          >
            <span className="text-xs text-muted-foreground mb-1">{msg.sender}</span>
            <div
              className={`px-3 py-2 rounded-xl text-sm max-w-[85%] ${
                msg.isLocal
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-xs text-muted-foreground italic animate-pulse-glow">
            Someone is typing…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t border-glass-border flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message…"
          className="bg-secondary/50 border-glass-border text-foreground placeholder:text-muted-foreground text-sm"
        />
        <Button onClick={handleSend} size="icon" className="bg-primary text-primary-foreground shrink-0">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatPanel;
