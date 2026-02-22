import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Plus, Users, Loader2, LogIn } from 'lucide-react';

// --- Types ---
interface ChatMessage {
  id: string;
  roomId: string;
  username: string;
  content: string;
  timestamp: number;
}

interface RoomInfo {
  id: string;
  name: string;
  interests: string[];
  participantCount: number;
}

interface CurrentChatRoom extends RoomInfo {
  messages: ChatMessage[];
  participants: string[];
}

// --- Constants ---
const INTERESTS = [
  "Technology", "Business", "Marketing", "Design",
  "Finance", "Healthcare", "Education", "Engineering",
  "Research", "Sales", "HR", "Legal",
  "Consulting", "Real Estate", "Media", "Arts"
];

// --- Custom Hook: WebSocket Logic ---
const useChatConnection = (username: string | null, onMessageReceived: (data: any) => void) => {
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('closed');
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!username) return;

    setStatus('connecting');
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log('Connected');
      setStatus('open');
      
      // Heartbeat
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      pingIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }));
      }, 30000);

      // Initial fetch
      ws.send(JSON.stringify({ type: 'getRooms' }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessageReceived(data);
      } catch (error) {
        console.error("Parse error:", error);
      }
    };

    ws.onclose = () => {
      setStatus('closed');
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
      // Auto-reconnect
      if (!reconnectTimeoutRef.current) {
        reconnectTimeoutRef.current = setTimeout(connect, 5000);
      }
    };
  }, [username, onMessageReceived]);

  useEffect(() => {
    if (username) connect();
    return () => {
      if (socketRef.current) socketRef.current.close();
      if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
      if (pingIntervalRef.current) clearInterval(pingIntervalRef.current);
    };
  }, [username, connect]);

  const send = useCallback((data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, send };
};

// --- Sub-Components (Memoized for Performance) ---

// 1. Room List Sidebar
const RoomList = memo(({ rooms, currentRoomId, onJoin, onOpenCreate, status }: any) => (
  <Card className="h-full flex flex-col">
    <div className="p-3 sm:p-4 border-b flex justify-between items-center">
      <h2 className="text-base sm:text-lg font-semibold">Chat Rooms</h2>
      <Button size="sm" onClick={onOpenCreate} disabled={status !== 'open'} className="bg-blue-600 hover:bg-blue-700 h-8 w-8 p-0 sm:w-auto sm:px-3">
        <Plus className="h-4 w-4 sm:mr-1" /> <span className="hidden sm:inline">New</span>
      </Button>
    </div>
    <div className="flex-1 overflow-y-auto p-2 space-y-1">
      {rooms.length === 0 && status === 'open' && <p className="text-sm text-gray-500 text-center py-4">No rooms found.</p>}
      {status === 'connecting' && <div className="flex justify-center py-4"><Loader2 className="animate-spin text-gray-400" /></div>}
      {rooms.map((room: RoomInfo) => (
        <div
          key={room.id}
          onClick={() => onJoin(room.id)}
          className={`p-3 rounded-lg cursor-pointer transition-colors ${
            currentRoomId === room.id ? 'bg-blue-100 border-blue-300 border' : 'bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm truncate">{room.name}</h3>
            <Badge variant="outline" className="text-[10px] h-5">{room.participantCount}</Badge>
          </div>
        </div>
      ))}
    </div>
  </Card>
));
RoomList.displayName = 'RoomList';

// 2. Chat Input Area
const ChatInput = memo(({ onSend, disabled }: { onSend: (msg: string) => void, disabled: boolean }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div className="p-3 border-t bg-white">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type a message..." 
          disabled={disabled}
          autoComplete="off"
        />
        <Button type="submit" size="sm" disabled={!text.trim() || disabled} className="bg-blue-600">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
});
ChatInput.displayName = 'ChatInput';

// 3. Message List
const MessageList = memo(({ messages, currentUsername }: { messages: ChatMessage[], currentUsername: string }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map(msg => {
        const isMe = msg.username === currentUsername;
        return (
          <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2 rounded-lg shadow-sm ${
              isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
            }`}>
              <div className="text-xs opacity-75 mb-1 font-medium">{isMe ? 'You' : msg.username}</div>
              <div className="text-sm whitespace-pre-wrap break-words">{msg.content}</div>
              <div className="text-[10px] opacity-75 mt-1 text-right">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
});
MessageList.displayName = 'MessageList';

// --- Main Component ---
export default function Chat() {
  // State
  const [username, setUsername] = useState<string>(() => localStorage.getItem('username') || '');
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [currentRoom, setCurrentRoom] = useState<CurrentChatRoom | null>(null);
  
  // UI State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // Login Input State (Temporary)
  const [tempUsername, setTempUsername] = useState('');

  // Handle incoming WebSocket messages
  const handleMessage = useCallback((data: any) => {
    switch (data.type) {
      case 'rooms':
        setRooms(data.rooms.map((r: any) => ({ ...r, participantCount: r.participants || 0 })));
        break;
      case 'message':
        setCurrentRoom(prev => {
          if (prev?.id === data.message.roomId && !prev.messages.some(m => m.id === data.message.id)) {
            return { ...prev, messages: [...prev.messages, data.message].sort((a, b) => a.timestamp - b.timestamp) };
          }
          return prev;
        });
        break;
      case 'roomJoined':
        setCurrentRoom({
          ...data.room,
          participantCount: data.room.participants.length,
          messages: data.room.messages.sort((a: any, b: any) => a.timestamp - b.timestamp)
        });
        // Update list count as well
        setRooms(prev => prev.map(r => r.id === data.room.id ? { ...r, participantCount: data.room.participants.length } : r));
        break;
      case 'participantsUpdate':
        setCurrentRoom(prev => prev?.id === data.roomId ? { ...prev, participants: data.participants, participantCount: data.participants.length } : prev);
        setRooms(prev => prev.map(r => r.id === data.roomId ? { ...r, participantCount: data.participants.length } : r));
        break;
    }
  }, []);

  // Connect WebSocket
  const { status, send } = useChatConnection(username || null, handleMessage);

  // Actions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUsername.trim()) {
      const u = tempUsername.trim();
      localStorage.setItem('username', u);
      setUsername(u);
    }
  };

  const handleJoinRoom = useCallback((roomId: string) => {
    if (status === 'open') send({ type: 'joinRoom', roomId, username });
  }, [status, send, username]);

  const handleSendMessage = useCallback((content: string) => {
    if (currentRoom) send({ type: 'sendMessage', roomId: currentRoom.id, content });
  }, [currentRoom, send]);

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRoomName.trim() && selectedInterests.length > 0) {
      send({ type: 'createRoom', name: newRoomName.trim(), interests: selectedInterests });
      setIsCreateOpen(false);
      setNewRoomName('');
      setSelectedInterests([]);
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]);
  };

  // --- Render: Login Screen ---
  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md p-6">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-2"><Users className="h-10 w-10 text-blue-600" /></div>
            <h1 className="text-2xl font-bold">Welcome to IntelliCircle</h1>
            <p className="text-gray-500">Enter a username to join the chat</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              placeholder="Username" 
              value={tempUsername} 
              onChange={e => setTempUsername(e.target.value)} 
              autoFocus
            />
            <Button type="submit" className="w-full bg-blue-600" disabled={!tempUsername.trim()}>
              <LogIn className="mr-2 h-4 w-4" /> Join Chat
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // --- Render: Main Chat Interface ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3 shrink-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-600 font-bold text-lg">
            <Users /> <span>IntelliCircle</span>
          </div>
          <div className="flex items-center space-x-3">
             <span className="text-sm text-gray-600 hidden sm:block">User: <b>{username}</b></span>
             <Badge variant={status === 'open' ? 'default' : 'destructive'} className={status === 'open' ? 'bg-green-600' : ''}>
                {status === 'open' ? 'Connected' : 'Disconnected'}
             </Badge>
          </div>
        </div>
      </header>

      {/* Content Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-2 sm:p-4 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        
        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-1 h-full overflow-hidden">
          <RoomList 
            rooms={rooms} 
            currentRoomId={currentRoom?.id} 
            onJoin={handleJoinRoom} 
            onOpenCreate={() => setIsCreateOpen(true)}
            status={status}
          />
        </div>

        {/* Mobile View / Main Chat */}
        <div className="col-span-1 lg:col-span-2 h-full flex flex-col overflow-hidden">
           <Card className="h-full flex flex-col shadow-md overflow-hidden">
             {/* Chat Header */}
             <div className="p-3 border-b bg-white shrink-0">
                {currentRoom ? (
                  <div>
                    <h2 className="font-semibold">{currentRoom.name}</h2>
                    <p className="text-xs text-gray-500">{currentRoom.participantCount} active</p>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Select a room to chat</p>
                )}
             </div>

             {/* Messages */}
             {currentRoom ? (
               <MessageList messages={currentRoom.messages} currentUsername={username} />
             ) : (
               <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-2 opacity-20"/>
                    <p>Join a room to start messaging</p>
                  </div>
               </div>
             )}

             {/* Input */}
             {currentRoom && <ChatInput onSend={handleSendMessage} disabled={status !== 'open'} />}
           </Card>
        </div>

        {/* Details Sidebar */}
        <div className="hidden lg:block lg:col-span-1 h-full overflow-hidden">
           <Card className="h-full overflow-y-auto">
             <CardContent className="p-4">
               <h3 className="font-semibold mb-4">Room Details</h3>
               {currentRoom ? (
                 <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-uppercase text-gray-500 mb-2">Interests</h4>
                      <div className="flex flex-wrap gap-1">
                        {currentRoom.interests.map(i => <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-uppercase text-gray-500 mb-2">Active Users</h4>
                      <div className="space-y-2">
                        {currentRoom.participants.map(p => (
                          <div key={p} className="flex items-center gap-2 text-sm">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">{p[0].toUpperCase()}</div>
                            <span className="truncate">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 </div>
               ) : (
                 <p className="text-sm text-gray-500">No room selected.</p>
               )}
             </CardContent>
           </Card>
        </div>
      </main>

      {/* Create Room Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md bg-white">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-4">Create New Room</h2>
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Room Name</label>
                  <Input value={newRoomName} onChange={e => setNewRoomName(e.target.value)} maxLength={30} required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Interests</label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border p-2 rounded bg-gray-50">
                    {INTERESTS.map(interest => (
                      <label key={interest} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 p-1 rounded">
                        <input type="checkbox" checked={selectedInterests.includes(interest)} onChange={() => toggleInterest(interest)} className="rounded text-blue-600" />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" disabled={!newRoomName || selectedInterests.length === 0} className="flex-1 bg-blue-600">Create</Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}