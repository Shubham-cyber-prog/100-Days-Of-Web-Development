import { useState, useEffect } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { LeftSidebar } from './components/LeftSidebar';
import { NetworkVisualization } from './components/NetworkVisualization';
import { PacketTable } from './components/PacketTable';
import { RightSidebar } from './components/RightSidebar';
import { BottomPanel } from './components/BottomPanel';
import { EmptyState } from './components/EmptyState';
import { CaptureStatus, Packet, Protocol } from './types/packet';
import { generateMockPacket } from './utils/mockData';

export default function App() {
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus>('idle');
  const [packets, setPackets] = useState<Packet[]>([]);
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterface, setSelectedInterface] = useState('wifi');
  
  // Traffic data for charts
  const [trafficData, setTrafficData] = useState<Array<{ time: string; bandwidth: number }>>([]);
  const [protocolData, setProtocolData] = useState<Array<{ name: Protocol; value: number }>>([
    { name: 'TCP', value: 0 },
    { name: 'UDP', value: 0 },
    { name: 'HTTP', value: 0 },
    { name: 'DNS', value: 0 },
    { name: 'ICMP', value: 0 },
  ]);

  // Generate packets when capturing
  useEffect(() => {
    if (captureStatus !== 'capturing') return;

    const interval = setInterval(() => {
      const newPacket = generateMockPacket();
      setPackets((prev) => [newPacket, ...prev].slice(0, 100)); // Keep last 100 packets

      // Update protocol stats
      setProtocolData((prev) => 
        prev.map((p) => 
          p.name === newPacket.protocol 
            ? { ...p, value: p.value + 1 }
            : p
        )
      );
    }, 500);

    return () => clearInterval(interval);
  }, [captureStatus]);

  // Generate traffic data
  useEffect(() => {
    if (captureStatus !== 'capturing') return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      const bandwidth = Math.floor(Math.random() * 500) + 100;

      setTrafficData((prev) => [...prev.slice(-19), { time: timeStr, bandwidth }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [captureStatus]);

  const handleStart = () => {
    setCaptureStatus('capturing');
    setPackets([]);
    setTrafficData([]);
    setProtocolData([
      { name: 'TCP', value: 0 },
      { name: 'UDP', value: 0 },
      { name: 'HTTP', value: 0 },
      { name: 'DNS', value: 0 },
      { name: 'ICMP', value: 0 },
    ]);
  };

  const handlePause = () => {
    setCaptureStatus('paused');
  };

  const handleStop = () => {
    setCaptureStatus('idle');
  };

  // Filter packets based on search term
  const filteredPackets = packets.filter((packet) => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      packet.sourceIp.toLowerCase().includes(term) ||
      packet.destinationIp.toLowerCase().includes(term) ||
      packet.protocol.toLowerCase().includes(term) ||
      packet.port.toString().includes(term)
    );
  });

  return (
    <div className="h-screen w-screen bg-slate-950 text-white flex flex-col overflow-hidden">
      <TopNavBar
        captureStatus={captureStatus}
        onStart={handleStart}
        onPause={handlePause}
        onStop={handleStop}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedInterface={selectedInterface}
        onInterfaceChange={setSelectedInterface}
      />

      <div className="flex-1 flex overflow-hidden">
        <LeftSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {captureStatus === 'idle' ? (
            <EmptyState onStart={handleStart} />
          ) : (
            <>
              <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 p-4 space-y-4 overflow-auto">
                  <NetworkVisualization isCapturing={captureStatus === 'capturing'} />
                  <PacketTable
                    packets={filteredPackets}
                    selectedPacket={selectedPacket}
                    onSelectPacket={setSelectedPacket}
                  />
                </div>

                <RightSidebar packet={selectedPacket} />
              </div>

              <BottomPanel trafficData={trafficData} protocolData={protocolData} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
