import { X, Info } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export function PacketInspectionPanel() {
  const { selectedPacket, setSelectedPacket, rules } = useSimulation();

  if (!selectedPacket) {
    return (
      <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-200">Packet Inspection</h3>
        </div>
        <div className="text-center text-slate-500 py-12">
          <p className="text-sm">Click on a packet to inspect its details</p>
        </div>
      </div>
    );
  }

  const matchedRule = rules.find((r) => r.id === selectedPacket.matchedRule);

  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-200">Packet Inspection</h3>
        </div>
        <button
          onClick={() => setSelectedPacket(null)}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Packet ID</label>
          <p className="font-mono text-sm text-slate-300 mt-1">{selectedPacket.id}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Source IP</label>
          <p className="font-mono text-sm text-slate-300 mt-1">{selectedPacket.sourceIP}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Destination IP</label>
          <p className="font-mono text-sm text-slate-300 mt-1">{selectedPacket.destinationIP}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Port</label>
          <p className="font-mono text-sm text-slate-300 mt-1">{selectedPacket.port}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Protocol</label>
          <p className="text-sm text-blue-400 mt-1">{selectedPacket.protocol}</p>
        </div>

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Status</label>
          <div className="mt-1">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                selectedPacket.status === "allowed"
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : selectedPacket.status === "blocked"
                  ? "bg-red-500/10 text-red-400 border border-red-500/20"
                  : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              }`}
            >
              {selectedPacket.status.toUpperCase()}
            </span>
          </div>
        </div>

        {matchedRule ? (
          <div className="pt-4 border-t border-slate-800">
            <label className="text-xs text-slate-500 uppercase tracking-wide">Matched Rule</label>
            <div className="mt-2 bg-slate-950 border border-slate-800 rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Rule ID</span>
                <span className="text-xs font-mono text-slate-300">{matchedRule.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Priority</span>
                <span className="text-xs font-mono text-slate-300">{matchedRule.priority}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">Action</span>
                <span
                  className={`text-xs font-medium ${
                    matchedRule.action === "allow" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {matchedRule.action.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-4 border-t border-slate-800">
            <label className="text-xs text-slate-500 uppercase tracking-wide">Matched Rule</label>
            <p className="text-sm text-slate-400 mt-2">No matching rule (default deny)</p>
          </div>
        )}

        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wide">Timestamp</label>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {new Date(selectedPacket.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
}
