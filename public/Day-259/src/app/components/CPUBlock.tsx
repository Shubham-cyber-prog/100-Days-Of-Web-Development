import { Cpu } from "lucide-react";
import { Thread } from "../types/thread";

interface CPUBlockProps {
  thread: Thread | null;
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

export function CPUBlock({ thread }: CPUBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-green-500 rounded-lg bg-green-500/10 min-h-[200px]">
      <Cpu className="w-12 h-12 mb-4 text-green-500" />
      <div className="text-sm uppercase tracking-wider mb-4 text-green-500">CPU</div>
      
      {thread ? (
        <div className="text-center">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-4 h-4 rounded-full ${threadColors[thread.id % threadColors.length]}`} />
            <span className="font-mono text-xl font-bold">Thread {thread.id}</span>
          </div>
          <div className="font-mono text-sm text-gray-400">
            Executing: {thread.burstTime - thread.remainingTime}ms / {thread.burstTime}ms
          </div>
          <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
            <div
              className={`h-full rounded-full ${threadColors[thread.id % threadColors.length]}`}
              style={{
                width: `${((thread.burstTime - thread.remainingTime) / thread.burstTime) * 100}%`,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="text-gray-500 font-mono">Idle</div>
      )}
    </div>
  );
}
