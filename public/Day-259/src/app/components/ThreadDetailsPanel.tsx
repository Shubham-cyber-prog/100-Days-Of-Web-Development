import { Thread } from "../types/thread";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ThreadDetailsPanelProps {
  thread: Thread | null;
  onClose: () => void;
}

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

export function ThreadDetailsPanel({ thread, onClose }: ThreadDetailsPanelProps) {
  if (!thread) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a thread to view details
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full ${threadColors[thread.id % threadColors.length]}`} />
          <h3 className="text-xl font-mono font-bold">Thread {thread.id}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-3 font-mono text-sm">
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Status</div>
          <div className="text-lg capitalize">{thread.status}</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Arrival Time</div>
          <div className="text-lg">{thread.arrivalTime}ms</div>
        </div>
        
        <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
          <div className="text-xs text-gray-500 mb-1">Burst Time</div>
          <div className="text-lg">{thread.burstTime}ms</div>
        </div>
        
        {thread.status !== "completed" && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Remaining Time</div>
            <div className="text-lg">{thread.remainingTime}ms</div>
          </div>
        )}
        
        {thread.priority !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Priority</div>
            <div className="text-lg">{thread.priority}</div>
          </div>
        )}
        
        {thread.waitingTime !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Waiting Time</div>
            <div className="text-lg text-blue-400">{thread.waitingTime}ms</div>
          </div>
        )}
        
        {thread.turnaroundTime !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Turnaround Time</div>
            <div className="text-lg text-green-400">{thread.turnaroundTime}ms</div>
          </div>
        )}
        
        {thread.startTime !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Start Time</div>
            <div className="text-lg">{thread.startTime}ms</div>
          </div>
        )}
        
        {thread.completionTime !== undefined && (
          <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="text-xs text-gray-500 mb-1">Completion Time</div>
            <div className="text-lg">{thread.completionTime}ms</div>
          </div>
        )}
      </div>
    </div>
  );
}
