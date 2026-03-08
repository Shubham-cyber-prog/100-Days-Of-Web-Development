import { useState } from "react";
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Card } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

const conversations = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Thanks for the update! Let me review...",
    timestamp: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "The new feature looks great!",
    timestamp: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "Can we schedule a meeting?",
    timestamp: "3h ago",
    unread: 1,
    online: false,
  },
  {
    id: 4,
    name: "James Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    lastMessage: "I've sent the documents",
    timestamp: "1d ago",
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    lastMessage: "Perfect, thank you!",
    timestamp: "2d ago",
    unread: 0,
    online: true,
  },
];

const messages = [
  {
    id: 1,
    sender: "Sarah Johnson",
    content: "Hi! How's the project coming along?",
    timestamp: "10:30 AM",
    isSent: false,
  },
  {
    id: 2,
    sender: "You",
    content: "Going well! We're about 65% complete.",
    timestamp: "10:32 AM",
    isSent: true,
  },
  {
    id: 3,
    sender: "Sarah Johnson",
    content: "That's great to hear! Any blockers?",
    timestamp: "10:33 AM",
    isSent: false,
  },
  {
    id: 4,
    sender: "You",
    content: "Nothing major. The API integration is almost done, and we're moving to the UI polish phase.",
    timestamp: "10:35 AM",
    isSent: true,
  },
  {
    id: 5,
    sender: "Sarah Johnson",
    content: "Thanks for the update! Let me review the latest designs and I'll get back to you.",
    timestamp: "10:36 AM",
    isSent: false,
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle sending message
      setMessageInput("");
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-600 mt-1">Stay connected with your team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-240px)]">
        {/* Conversations List */}
        <Card className="border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-10"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`w-full p-3 rounded-xl hover:bg-slate-50 transition-colors flex items-start gap-3 ${
                    selectedConversation.id === conversation.id ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conversation.avatar} />
                      <AvatarFallback>
                        {conversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-slate-900 truncate">
                        {conversation.name}
                      </p>
                      <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-slate-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <Badge className="ml-2 bg-blue-600 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 border-slate-200 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.avatar} />
                  <AvatarFallback>
                    {selectedConversation.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-900">{selectedConversation.name}</p>
                <p className="text-sm text-slate-500">
                  {selectedConversation.online ? "Active now" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Block User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[70%] ${message.isSent ? "order-2" : "order-1"}`}>
                    {!message.isSent && (
                      <p className="text-xs text-slate-500 mb-1">{message.sender}</p>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isSent
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-900"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-end gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Paperclip className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="pr-10"
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    setIsTyping(e.target.value.length > 0);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                >
                  <Smile className="w-5 h-5" />
                </Button>
              </div>
              <Button
                size="icon"
                className="bg-blue-600 hover:bg-blue-700 shrink-0"
                onClick={handleSendMessage}
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
