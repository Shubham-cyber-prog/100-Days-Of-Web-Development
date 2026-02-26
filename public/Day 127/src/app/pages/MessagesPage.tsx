import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Search, Send, Smile, Paperclip, MoreVertical, Phone, Video, Image as ImageIcon } from 'lucide-react';
import { mockMessages, mockChatMessages, currentUser } from '../lib/mockData';
import type { Message } from '../lib/mockData';

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Message | null>(mockMessages[0]);
  const [messageInput, setMessageInput] = useState('');
  const [isTyping] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex gap-6">
      {/* Chat List */}
      <Card className="w-80 flex-shrink-0 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <h2 className="text-xl font-bold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockMessages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedChat(message)}
                className={`w-full p-3 rounded-lg flex items-center gap-3 hover:bg-accent transition-colors ${
                  selectedChat?.id === message.id ? 'bg-accent' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="size-12">
                    <AvatarImage src={message.user.avatar} alt={message.user.name} />
                    <AvatarFallback>{message.user.name[0]}</AvatarFallback>
                  </Avatar>
                  {message.isOnline && (
                    <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-card rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">{message.time}</span>
                  </div>
                  <p className={`text-sm truncate ${!message.isRead ? 'font-medium' : 'text-muted-foreground'}`}>
                    {message.lastMessage}
                  </p>
                </div>
                {!message.isRead && (
                  <Badge className="size-2 p-0 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      {selectedChat ? (
        <Card className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="size-10">
                  <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                  <AvatarFallback>{selectedChat.user.name[0]}</AvatarFallback>
                </Avatar>
                {selectedChat.isOnline && (
                  <div className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{selectedChat.user.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedChat.isOnline ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="size-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="size-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="size-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockChatMessages.map((msg) => {
                const isOwn = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div
                        className={`rounded-2xl px-4 py-2 ${
                          isOwn
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-accent text-foreground rounded-bl-sm'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                        {msg.reactions && (
                          <div className="flex gap-1">
                            {msg.reactions.map((reaction, i) => (
                              <span key={i} className="text-xs">{reaction}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="size-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-sm">{selectedChat.user.name} is typing...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="size-5" />
              </Button>
              <Button type="button" variant="ghost" size="icon">
                <ImageIcon className="size-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon">
                <Smile className="size-5" />
              </Button>
              <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="size-5" />
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center size-16 rounded-full bg-primary/10 mb-4">
              <Send className="size-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Your Messages</h3>
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        </Card>
      )}
    </div>
  );
}
