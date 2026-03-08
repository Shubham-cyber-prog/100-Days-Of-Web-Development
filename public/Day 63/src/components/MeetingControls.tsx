import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Copy,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface MeetingControlsProps {
  isMuted: boolean;
  isCameraOff: boolean;
  isChatOpen: boolean;
  participantCount: number;
  roomId: string;
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onToggleChat: () => void;
  onLeave: () => void;
}

const MeetingControls = ({
  isMuted,
  isCameraOff,
  isChatOpen,
  participantCount,
  roomId,
  onToggleMute,
  onToggleCamera,
  onToggleChat,
  onLeave,
}: MeetingControlsProps) => {
  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    toast({ title: "Copied!", description: "Room ID copied to clipboard." });
  };

  return (
    <div className="glass-strong px-6 py-4 flex items-center justify-between">
      {/* Left: Room info */}
      <div className="flex items-center gap-3">
        <button
          onClick={copyRoomId}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline font-mono">{roomId}</span>
        </button>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span className="text-sm">{participantCount}</span>
        </div>
      </div>

      {/* Center: Main controls */}
      <div className="flex items-center gap-3">
        <Button
          onClick={onToggleMute}
          size="icon"
          variant={isMuted ? "destructive" : "secondary"}
          className="rounded-full w-12 h-12 transition-all duration-200"
        >
          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </Button>

        <Button
          onClick={onToggleCamera}
          size="icon"
          variant={isCameraOff ? "destructive" : "secondary"}
          className="rounded-full w-12 h-12 transition-all duration-200"
        >
          {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
        </Button>

        <Button
          onClick={onLeave}
          size="icon"
          variant="destructive"
          className="rounded-full w-12 h-12 transition-all duration-200"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
      </div>

      {/* Right: Chat toggle */}
      <div>
        <Button
          onClick={onToggleChat}
          size="icon"
          variant={isChatOpen ? "default" : "secondary"}
          className="rounded-full w-10 h-10 transition-all duration-200"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default MeetingControls;
