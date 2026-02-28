import { GanttBlock } from "../types/thread";

interface GanttChartProps {
  blocks: GanttBlock[];
  currentTime: number;
  maxTime?: number;
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

export function GanttChart({ blocks, currentTime, maxTime = 100 }: GanttChartProps) {
  const displayMaxTime = Math.max(maxTime, currentTime + 10);
  const timeMarkers = Array.from({ length: Math.ceil(displayMaxTime / 10) + 1 }, (_, i) => i * 10);

  return (
    <div className="space-y-4">
      <h3 className="text-sm uppercase tracking-wider text-gray-400">Gantt Chart Timeline</h3>
      
      <div className="relative">
        {/* Time markers */}
        <div className="flex justify-between mb-2 text-xs font-mono text-gray-500">
          {timeMarkers.map((time) => (
            <div key={time} className="flex-1 text-center">
              {time}
            </div>
          ))}
        </div>
        
        {/* Timeline */}
        <div className="relative h-16 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          {blocks.map((block, index) => {
            const left = (block.startTime / displayMaxTime) * 100;
            const width = ((block.endTime - block.startTime) / displayMaxTime) * 100;
            
            return (
              <div
                key={index}
                className={`absolute h-full ${threadColors[block.threadId % threadColors.length]} border-r border-black/50 flex items-center justify-center`}
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                }}
              >
                <span className="font-mono text-sm font-bold text-white drop-shadow-lg">
                  T{block.threadId}
                </span>
              </div>
            );
          })}
          
          {/* Current time indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10"
            style={{ left: `${(currentTime / displayMaxTime) * 100}%` }}
          >
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-500 rounded-full" />
          </div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute top-8 bottom-0 left-0 right-0 flex justify-between pointer-events-none">
          {timeMarkers.map((time) => (
            <div key={time} className="w-px bg-gray-700/50" />
          ))}
        </div>
      </div>
    </div>
  );
}
