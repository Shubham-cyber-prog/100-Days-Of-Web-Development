import { X, Play, Square, RotateCw, Terminal, Cpu, MemoryStick } from "lucide-react";
import { useVMContext } from "../context/VMContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Mock performance data
const generatePerformanceData = (value: number) => {
  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      time: `${i}m`,
      value: Math.max(0, Math.min(100, value + (Math.random() - 0.5) * 20)),
    });
  }
  return data;
};

export default function VMDetailsPanel() {
  const { selectedVM, setSelectedVM, startVM, stopVM, updateVMResources } = useVMContext();
  const [cpuAllocation, setCpuAllocation] = useState(selectedVM?.cpuAllocation || 25);
  const [memoryAllocation, setMemoryAllocation] = useState(selectedVM?.memoryAllocation || 8);

  if (!selectedVM) return null;

  const cpuData = generatePerformanceData(selectedVM.cpuUsage);
  const memoryData = generatePerformanceData(selectedVM.memoryUsage);

  const handleSaveResources = () => {
    if (selectedVM) {
      updateVMResources(selectedVM.id, cpuAllocation, memoryAllocation);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-500 bg-green-500/10";
      case "stopped":
        return "text-red-500 bg-red-500/10";
      case "paused":
        return "text-yellow-500 bg-yellow-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  return (
    <div className="h-full overflow-y-auto bg-card">
      <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
        <h3 className="text-lg text-foreground">VM Details</h3>
        <button
          onClick={() => setSelectedVM(null)}
          className="p-2 hover:bg-accent rounded-md transition-colors"
        >
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* VM Info */}
        <div>
          <h4 className="text-base text-foreground mb-1">{selectedVM.name}</h4>
          <p className="text-sm text-muted-foreground mb-2">{selectedVM.os}</p>
          <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(selectedVM.status)}`}>
            {selectedVM.status}
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button className="w-full flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-md transition-colors">
            <Terminal className="w-4 h-4" />
            Open Console
          </button>
          {selectedVM.status === "running" ? (
            <>
              <button
                onClick={() => stopVM(selectedVM.id)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              >
                <Square className="w-4 h-4" />
                Stop
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md transition-colors">
                <RotateCw className="w-4 h-4" />
                Restart
              </button>
            </>
          ) : (
            <button
              onClick={() => startVM(selectedVM.id)}
              className="w-full flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Play className="w-4 h-4" />
              Start
            </button>
          )}
        </div>

        {/* Resource Allocation */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm text-foreground mb-4">Resource Allocation</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                CPU: {cpuAllocation}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={cpuAllocation}
                onChange={(e) => setCpuAllocation(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-xs text-muted-foreground mb-2">
                Memory: {memoryAllocation} GB
              </label>
              <input
                type="range"
                min="2"
                max="64"
                step="2"
                value={memoryAllocation}
                onChange={(e) => setMemoryAllocation(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              onClick={handleSaveResources}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
            >
              Apply Changes
            </button>
          </div>
        </div>

        {/* Performance Graphs */}
        {selectedVM.status === "running" && (
          <div className="border-t border-border pt-4">
            <h4 className="text-sm text-foreground mb-4">Live Performance</h4>

            <div className="space-y-6">
              {/* CPU Usage */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span className="text-xs text-muted-foreground">CPU Usage: {selectedVM.cpuUsage}%</span>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={cpuData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#888" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "4px",
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Memory Usage */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MemoryStick className="w-4 h-4 text-purple-500" />
                  <span className="text-xs text-muted-foreground">
                    Memory Usage: {selectedVM.memoryUsage}%
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={memoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#888" }} />
                    <YAxis tick={{ fontSize: 10, fill: "#888" }} domain={[0, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1a1a1a",
                        border: "1px solid #333",
                        borderRadius: "4px",
                      }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#a855f7" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* VM Stats */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm text-foreground mb-3">Statistics</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Uptime:</span>
              <span className="text-foreground">{selectedVM.uptime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Storage:</span>
              <span className="text-foreground">{selectedVM.storageUsage.toFixed(1)} GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CPU Allocation:</span>
              <span className="text-foreground">{selectedVM.cpuAllocation}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Memory Allocation:</span>
              <span className="text-foreground">{selectedVM.memoryAllocation} GB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
