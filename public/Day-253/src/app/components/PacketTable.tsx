import { Packet, Protocol } from '../types/packet';
import { getProtocolColor } from '../utils/mockData';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface PacketTableProps {
  packets: Packet[];
  selectedPacket: Packet | null;
  onSelectPacket: (packet: Packet) => void;
}

export function PacketTable({ packets, selectedPacket, onSelectPacket }: PacketTableProps) {
  const getStatusIcon = (status: Packet['status']) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getProtocolBadgeColor = (protocol: Protocol) => {
    switch (protocol) {
      case 'TCP': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'UDP': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'HTTP': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'DNS': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ICMP': return 'bg-red-500/20 text-red-400 border-red-500/30';
    }
  };

  return (
    <div className="bg-slate-900/30 rounded-lg border border-slate-800 h-[400px] flex flex-col">
      <div className="border-b border-slate-800 p-4">
        <h3 className="text-sm font-semibold text-white">Packet Stream</h3>
        <p className="text-xs text-slate-400 mt-1">{packets.length} packets captured</p>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs">
          <thead className="bg-slate-950/50 sticky top-0 z-10">
            <tr className="border-b border-slate-800">
              <th className="text-left p-2 text-slate-400 font-medium">Time</th>
              <th className="text-left p-2 text-slate-400 font-medium">Source IP</th>
              <th className="text-left p-2 text-slate-400 font-medium">Destination IP</th>
              <th className="text-left p-2 text-slate-400 font-medium">Protocol</th>
              <th className="text-left p-2 text-slate-400 font-medium">Port</th>
              <th className="text-left p-2 text-slate-400 font-medium">Size</th>
              <th className="text-left p-2 text-slate-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {packets.map((packet) => (
              <tr
                key={packet.id}
                onClick={() => onSelectPacket(packet)}
                className={`border-b border-slate-800/50 cursor-pointer transition-colors ${
                  selectedPacket?.id === packet.id
                    ? 'bg-cyan-500/10 border-l-2 border-l-cyan-500'
                    : 'hover:bg-slate-800/30'
                }`}
              >
                <td className="p-2 font-mono text-slate-300">{packet.timestamp}</td>
                <td className="p-2 font-mono text-slate-300">{packet.sourceIp}</td>
                <td className="p-2 font-mono text-slate-300">{packet.destinationIp}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-md border text-xs font-medium ${getProtocolBadgeColor(packet.protocol)}`}>
                    {packet.protocol}
                  </span>
                </td>
                <td className="p-2 font-mono text-slate-300">{packet.port}</td>
                <td className="p-2 text-slate-300">{packet.size} B</td>
                <td className="p-2">{getStatusIcon(packet.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
