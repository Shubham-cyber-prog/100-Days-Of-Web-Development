import { Packet } from '../types/packet';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface RightSidebarProps {
  packet: Packet | null;
}

export function RightSidebar({ packet }: RightSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    ethernet: true,
    ip: true,
    transport: false,
    application: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!packet) {
    return (
      <div className="w-80 border-l border-slate-800 bg-slate-950/30 backdrop-blur-sm p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-slate-500 text-sm">No packet selected</div>
          <p className="text-slate-600 text-xs mt-2">Select a packet from the table to view details</p>
        </div>
      </div>
    );
  }

  const renderSection = (title: string, key: keyof typeof packet.data, data?: Record<string, string>) => {
    if (!data) return null;

    const isExpanded = expandedSections[key];

    return (
      <div className="border-b border-slate-800 last:border-b-0">
        <button
          onClick={() => toggleSection(key)}
          className="w-full flex items-center justify-between p-3 hover:bg-slate-800/30 transition-colors"
        >
          <span className="text-sm font-semibold text-white">{title}</span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>
        
        {isExpanded && (
          <div className="px-3 pb-3 space-y-2">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-slate-400">{key}:</span>
                <span className="text-slate-300 font-mono">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-80 border-l border-slate-800 bg-slate-950/30 backdrop-blur-sm flex flex-col overflow-hidden">
      <div className="border-b border-slate-800 p-4">
        <h3 className="text-sm font-semibold text-white">Packet Details</h3>
        <p className="text-xs text-slate-400 mt-1">ID: {packet.id}</p>
      </div>

      <div className="flex-1 overflow-auto">
        {/* Overview */}
        <div className="p-4 border-b border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Timestamp:</span>
            <span className="text-slate-300 font-mono">{packet.timestamp}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Protocol:</span>
            <span className="text-cyan-400 font-semibold">{packet.protocol}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Size:</span>
            <span className="text-slate-300">{packet.size} bytes</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Status:</span>
            <span className={`font-semibold ${
              packet.status === 'success' ? 'text-green-400' :
              packet.status === 'warning' ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {packet.status.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Protocol Layers */}
        <div>
          {renderSection('Ethernet Layer', 'ethernet', packet.data?.ethernet)}
          {renderSection('IP Layer', 'ip', packet.data?.ip)}
          {renderSection('Transport Layer', 'transport', packet.data?.transport)}
          {renderSection('Application Layer', 'application', packet.data?.application)}
        </div>

        {/* Raw Data */}
        {packet.data?.raw && (
          <div className="p-4 border-t border-slate-800">
            <div className="text-xs font-semibold text-white mb-2">Raw Data (Hex)</div>
            <div className="bg-slate-950 rounded-md p-3 font-mono text-xs text-green-400 overflow-x-auto">
              {packet.data.raw}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
