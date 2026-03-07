import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Protocol } from '../types/packet';
import { getProtocolColor } from '../utils/mockData';

interface BottomPanelProps {
  trafficData: Array<{ time: string; bandwidth: number }>;
  protocolData: Array<{ name: Protocol; value: number }>;
}

export function BottomPanel({ trafficData, protocolData }: BottomPanelProps) {
  const COLORS = {
    TCP: getProtocolColor('TCP'),
    UDP: getProtocolColor('UDP'),
    HTTP: getProtocolColor('HTTP'),
    DNS: getProtocolColor('DNS'),
    ICMP: getProtocolColor('ICMP'),
  };

  return (
    <div className="h-64 border-t border-slate-800 bg-slate-950/30 backdrop-blur-sm p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* Traffic Chart */}
        <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Bandwidth Usage Over Time</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis 
                dataKey="time" 
                stroke="#94a3b8" 
                style={{ fontSize: '11px' }}
              />
              <YAxis 
                stroke="#94a3b8" 
                style={{ fontSize: '11px' }}
                label={{ value: 'KB/s', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8', fontSize: '11px' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                labelStyle={{ color: '#e2e8f0' }}
              />
              <Line
                type="monotone"
                dataKey="bandwidth"
                stroke="#06b6d4"
                strokeWidth={2}
                dot={false}
                style={{ filter: 'drop-shadow(0 0 4px rgba(6, 182, 212, 0.5))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Protocol Breakdown */}
        <div className="bg-slate-900/30 rounded-lg border border-slate-800 p-4">
          <h3 className="text-sm font-semibold text-white mb-3">Protocol Distribution</h3>
          <div className="flex items-center justify-between h-[85%]">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={protocolData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {protocolData.map((entry) => (
                    <Cell 
                      key={`cell-${entry.name}`} 
                      fill={COLORS[entry.name]}
                      style={{ filter: `drop-shadow(0 0 4px ${COLORS[entry.name]})` }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2 flex-1 pl-4">
              {protocolData.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[entry.name],
                        boxShadow: `0 0 8px ${COLORS[entry.name]}`,
                      }}
                    />
                    <span className="text-xs text-slate-300">{entry.name}</span>
                  </div>
                  <span className="text-xs text-slate-400">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
