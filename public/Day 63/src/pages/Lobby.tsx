import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Plus, ArrowRight, Copy, Users, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateRoomId } from "@/lib/meeting";
import { toast } from "@/hooks/use-toast";

const Lobby = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    if (!userName.trim()) {
      toast({ title: "Enter your name", description: "Please enter a display name to continue.", variant: "destructive" });
      return;
    }
    const newRoomId = generateRoomId();
    navigate(`/room/${newRoomId}`, { state: { userName: userName.trim() } });
  };

  const handleJoinRoom = () => {
    if (!userName.trim()) {
      toast({ title: "Enter your name", description: "Please enter a display name to continue.", variant: "destructive" });
      return;
    }
    if (!roomId.trim()) {
      toast({ title: "Enter Room ID", description: "Please enter a Room ID to join.", variant: "destructive" });
      return;
    }
    navigate(`/room/${roomId.trim()}`, { state: { userName: userName.trim() } });
  };

  return (
    <div className="min-h-screen bg-background gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto animate-slide-up">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-primary/10 glow-primary">
              <Video className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-5xl font-bold font-display gradient-text">MeetFlow</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Crystal-clear video meetings. No downloads, no hassle.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Create Room Card */}
          <div className="glass p-8 space-y-6 hover:border-primary/30 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-display font-semibold text-foreground">Create a Room</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Start a new meeting and invite others with a unique Room ID.
            </p>
            <Input
              placeholder="Your display name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-secondary/50 border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <Button
              onClick={handleCreateRoom}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-primary transition-all duration-300"
              size="lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Room
            </Button>
          </div>

          {/* Join Room Card */}
          <div className="glass p-8 space-y-6 hover:border-accent/30 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-display font-semibold text-foreground">Join a Room</h2>
            </div>
            <p className="text-muted-foreground text-sm">
              Enter a Room ID to join an existing meeting.
            </p>
            <Input
              placeholder="Your display name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-secondary/50 border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
            />
            <Input
              placeholder="Room ID (e.g. abc-1234-xyz)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="bg-secondary/50 border-glass-border text-foreground placeholder:text-muted-foreground focus:ring-accent"
            />
            <Button
              onClick={handleJoinRoom}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-semibold glow-accent transition-all duration-300"
              size="lg"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Join Room
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { icon: Shield, label: "Encrypted", desc: "End-to-end secure" },
            { icon: Zap, label: "Low Latency", desc: "Peer-to-peer WebRTC" },
            { icon: Users, label: "Multi-party", desc: "Group meetings" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="text-center space-y-2">
              <Icon className="w-6 h-6 text-primary mx-auto" />
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
