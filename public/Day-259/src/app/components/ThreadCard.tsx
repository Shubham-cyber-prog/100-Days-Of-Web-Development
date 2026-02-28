import { Clock, Zap, AlertCircle } from "lucide-react";
import { Thread } from "../types/thread";

interface ThreadCardProps {
  thread: Thread;
  onClick?: () => void;
  isSelected?: boolean;
}

const statusColors = {
  ready: "bg-blue-500/20 border-blue-500",
  running: "bg-green-500/20 border-green-500",
  waiting: "bg-yellow-500/20 border-yellow-500",
  completed: "bg-gray-500/20 border-gray-500",
};

const threadColors = [
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-lime-500",
  "bg-rose-500",
  "bg-indigo-500",
  "bg-teal-500",
];

export function ThreadCard({ thread, onClick, isSelected }: ThreadCardProps) {
  const colorIndex = thread.id % threadColors.length;
  
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
        statusColors[thread.status]
      } ${isSelected ? "ring-2 ring-white" : ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${threadColors[colorIndex]}`} />
          <span className="font-mono font-semibold">T{thread.id}</span>
        </div>
        <span className="text-xs uppercase px-2 py-1 rounded bg-black/30">
          {thread.status}
        </span>
      </div>
      
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" />
          <span className="font-mono">Burst: {thread.burstTime}ms</span>
        </div>
        
        {thread.status !== "completed" && (
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3" />
            <span className="font-mono">Remaining: {thread.remainingTime}ms</span>
          </div>
        )}
        
        {thread.priority !== undefined && (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3 h-3" />
            <span className="font-mono">Priority: {thread.priority}</span>
          </div>
        )}
      </div>
    </div>
  );
}
