import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import VideoGrid from "@/components/VideoGrid";
import MeetingControls from "@/components/MeetingControls";
import ChatPanel from "@/components/ChatPanel";
import { toast } from "@/hooks/use-toast";
import type { Participant, ChatMessage } from "@/lib/meeting";
import { Wifi } from "lucide-react";

const MeetingRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const userName = (location.state as { userName?: string })?.userName || "Guest";

  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);

  // Get local media stream
  useEffect(() => {
    let stream: MediaStream | null = null;

    const getMedia = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        setParticipants([
          {
            id: "local",
            name: userName,
            stream,
            isLocal: true,
            isMuted: false,
            isCameraOff: false,
          },
        ]);
        toast({ title: "Connected", description: `You joined room ${roomId}` });
      } catch {
        // Camera/mic denied – still join with no stream
        setParticipants([
          {
            id: "local",
            name: userName,
            stream: null,
            isLocal: true,
            isMuted: true,
            isCameraOff: true,
          },
        ]);
        setIsMuted(true);
        setIsCameraOff(true);
        toast({
          title: "Camera unavailable",
          description: "You joined without camera/mic. Grant permissions to enable them.",
          variant: "destructive",
        });
      }
    };

    getMedia();

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach((t) => (t.enabled = isMuted));
    }
    setIsMuted((m) => !m);
    setParticipants((prev) =>
      prev.map((p) => (p.isLocal ? { ...p, isMuted: !isMuted } : p))
    );
  }, [isMuted, localStream]);

  // Toggle camera
  const toggleCamera = useCallback(() => {
    if (localStream) {
      localStream.getVideoTracks().forEach((t) => (t.enabled = isCameraOff));
    }
    setIsCameraOff((c) => !c);
    setParticipants((prev) =>
      prev.map((p) => (p.isLocal ? { ...p, isCameraOff: !isCameraOff } : p))
    );
  }, [isCameraOff, localStream]);

  // Leave meeting
  const handleLeave = useCallback(() => {
    localStream?.getTracks().forEach((t) => t.stop());
    navigate("/");
  }, [localStream, navigate]);

  // Send chat message
  const handleSendMessage = useCallback(
    (text: string) => {
      const msg: ChatMessage = {
        id: Date.now().toString(),
        sender: userName,
        text,
        timestamp: new Date(),
        isLocal: true,
      };
      setMessages((prev) => [...prev, msg]);
    },
    [userName]
  );

  return (
    <div className="h-screen bg-background gradient-bg flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-glass-border">
        <h1 className="font-display font-semibold text-foreground text-lg gradient-text">
          MeetFlow
        </h1>
        <div className="flex items-center gap-2 text-sm text-success">
          <Wifi className="w-4 h-4" />
          <span>Connected</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <VideoGrid participants={participants} />
        </div>
        {isChatOpen && (
          <ChatPanel messages={messages} onSendMessage={handleSendMessage} />
        )}
      </div>

      {/* Controls */}
      <MeetingControls
        isMuted={isMuted}
        isCameraOff={isCameraOff}
        isChatOpen={isChatOpen}
        participantCount={participants.length}
        roomId={roomId || ""}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onToggleChat={() => setIsChatOpen((o) => !o)}
        onLeave={handleLeave}
      />
    </div>
  );
};

export default MeetingRoom;
