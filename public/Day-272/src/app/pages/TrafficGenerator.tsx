import { useState } from "react";
import { Zap, Play } from "lucide-react";
import { useSimulation } from "../context/SimulationContext";

export function TrafficGenerator() {
  const { stepSimulation } = useSimulation();
  const [config, setConfig] = useState({
    sourceIP: "192.168.1.100",
    destinationIP: "10.0.0.5",
    port: "80",
    protocol: "HTTP" as const,
    count: 1,
  });

  const handleGenerate = () => {
    for (let i = 0; i < config.count; i++) {
      setTimeout(() => stepSimulation(), i * 100);
    }
  };

  const presets = [
    { name: "HTTP Traffic", sourceIP: "192.168.1.100", destinationIP: "10.0.0.5", port: "80", protocol: "HTTP" as const },
    { name: "HTTPS Traffic", sourceIP: "192.168.1.100", destinationIP: "10.0.0.5", port: "443", protocol: "HTTPS" as const },
    { name: "SSH Attempt", sourceIP: "203.0.113.50", destinationIP: "10.0.0.5", port: "22", protocol: "TCP" as const },
    { name: "ICMP Ping", sourceIP: "172.16.0.1", destinationIP: "10.0.0.10", port: "0", protocol: "ICMP" as const },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h1 className="text-2xl font-semibold text-slate-200">Traffic Generator</h1>
        </div>
        <p className="text-sm text-slate-400">
          Generate custom network traffic to test firewall rules and observe packet behavior.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Custom Traffic Generator */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Custom Traffic</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-2">Source IP Address</label>
              <input
                type="text"
                value={config.sourceIP}
                onChange={(e) => setConfig({ ...config, sourceIP: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-slate-200"
                placeholder="192.168.1.100"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2">Destination IP Address</label>
              <input
                type="text"
                value={config.destinationIP}
                onChange={(e) => setConfig({ ...config, destinationIP: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-slate-200"
                placeholder="10.0.0.5"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2">Port</label>
              <input
                type="text"
                value={config.port}
                onChange={(e) => setConfig({ ...config, port: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm font-mono text-slate-200"
                placeholder="80"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2">Protocol</label>
              <select
                value={config.protocol}
                onChange={(e) => setConfig({ ...config, protocol: e.target.value as any })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
              >
                <option value="TCP">TCP</option>
                <option value="UDP">UDP</option>
                <option value="ICMP">ICMP</option>
                <option value="HTTP">HTTP</option>
                <option value="HTTPS">HTTPS</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-2">Number of Packets</label>
              <input
                type="number"
                min="1"
                max="50"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-sm text-slate-200"
              />
            </div>

            <button
              onClick={handleGenerate}
              className="w-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-lg px-4 py-3 font-medium hover:bg-yellow-500/20 transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" /> Generate Traffic
            </button>
          </div>
        </div>

        {/* Preset Traffic Patterns */}
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-6">
          <h2 className="font-semibold text-slate-200 mb-4">Preset Traffic Patterns</h2>
          
          <div className="space-y-3">
            {presets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setConfig({ ...config, ...preset })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-left hover:border-slate-700 transition-colors"
              >
                <h3 className="text-sm font-medium text-slate-200 mb-2">{preset.name}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
                  <div>
                    <span className="text-slate-500">Source:</span> {preset.sourceIP}
                  </div>
                  <div>
                    <span className="text-slate-500">Dest:</span> {preset.destinationIP}
                  </div>
                  <div>
                    <span className="text-slate-500">Port:</span> {preset.port}
                  </div>
                  <div>
                    <span className="text-slate-500">Protocol:</span> {preset.protocol}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-xs text-blue-400">
              <strong>Tip:</strong> Click on a preset to load its configuration, then click "Generate Traffic" to send the packets.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-slate-900 rounded-lg border border-slate-800 p-6">
        <h2 className="font-semibold text-slate-200 mb-4">Traffic Generation Notes</h2>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>• Generated packets will be processed by the firewall rules in priority order</li>
          <li>• Watch the network visualization to see packets flow through the firewall</li>
          <li>• Check the logs panel to see detailed information about how each packet was processed</li>
          <li>• Use the packet inspection panel to examine individual packet details</li>
          <li>• Multiple packets will be sent with a small delay between each one</li>
        </ul>
      </div>
    </div>
  );
}
