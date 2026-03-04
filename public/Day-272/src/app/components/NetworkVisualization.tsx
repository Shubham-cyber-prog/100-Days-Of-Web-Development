import { motion } from "motion/react";
import { useSimulation } from "../context/SimulationContext";
import { Packet } from "../types";
import { Globe, Shield, Server } from "lucide-react";

export function NetworkVisualization() {
  const { packets, setSelectedPacket } = useSimulation();

  const getPacketColor = (packet: Packet) => {
    switch (packet.status) {
      case "allowed":
        return "bg-green-500";
      case "blocked":
        return "bg-red-500";
      case "pending":
        return "bg-yellow-500";
    }
  };

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-8">
      <div className="relative h-64">
        {/* Network Nodes */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500 flex items-center justify-center">
            <Globe className="w-10 h-10 text-blue-400" />
          </div>
          <span className="text-xs text-slate-400 font-mono">Internet</span>
          <span className="text-xs text-slate-500">External Network</span>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-24 h-24 rounded-lg bg-red-500/10 border-2 border-red-500 flex items-center justify-center">
            <Shield className="w-12 h-12 text-red-400" />
          </div>
          <span className="text-xs text-slate-400 font-mono">Firewall</span>
          <span className="text-xs text-slate-500">Security Gateway</span>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
            <Server className="w-10 h-10 text-green-400" />
          </div>
          <span className="text-xs text-slate-400 font-mono">Servers</span>
          <span className="text-xs text-slate-500">Internal Network</span>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line
            x1="10%"
            y1="50%"
            x2="45%"
            y2="50%"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1="55%"
            y1="50%"
            x2="90%"
            y2="50%"
            stroke="#334155"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Animated Packets */}
        {packets.map((packet) => {
          const leftPosition = `${10 + (packet.position * 0.8)}%`;
          
          return (
            <motion.div
              key={packet.id}
              initial={{ left: "10%", top: "50%", opacity: 0, scale: 0 }}
              animate={{ 
                left: leftPosition,
                top: "50%",
                opacity: packet.position > 95 ? 0 : 1,
                scale: packet.position > 95 ? 0 : 1
              }}
              className="absolute -translate-y-1/2 cursor-pointer"
              onClick={() => setSelectedPacket(packet)}
            >
              <div className={`w-3 h-3 rounded-full ${getPacketColor(packet)} shadow-lg`} />
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-slate-950 px-2 py-1 rounded text-xs font-mono opacity-0 hover:opacity-100 transition-opacity pointer-events-none border border-slate-700">
                {packet.sourceIP}:{packet.port}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-400">Allowed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-slate-400">Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-slate-400">Pending Inspection</span>
        </div>
      </div>
    </div>
  );
}
