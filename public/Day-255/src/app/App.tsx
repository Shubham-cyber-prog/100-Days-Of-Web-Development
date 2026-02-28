import { useState, useEffect, useCallback } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { LeftSidebar } from './components/LeftSidebar';
import { NetworkDiagram } from './components/NetworkDiagram';
import { ServerStatusPanel } from './components/ServerStatusPanel';
import { RightSidebar } from './components/RightSidebar';
import { BottomSection } from './components/BottomSection';
import { AddServerModal } from './components/AddServerModal';
import { ServerData } from './components/ServerCard';

interface TrafficItem {
  id: string;
  serverId: string;
  startTime: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  clientId: string;
  serverId: string;
  serverName: string;
  responseTime: number;
}

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState('round-robin');
  const [servers, setServers] = useState<ServerData[]>([
    { id: '1', name: 'Server 1', load: 45, connections: 12, responseTime: 23, status: 'healthy' },
    { id: '2', name: 'Server 2', load: 62, connections: 18, responseTime: 31, status: 'healthy' },
    { id: '3', name: 'Server 3', load: 38, connections: 9, responseTime: 19, status: 'healthy' },
  ]);
  const [activeTraffic, setActiveTraffic] = useState<TrafficItem[]>([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [requestsPerServer, setRequestsPerServer] = useState<Record<string, number>>({});
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [requestsPerSecond, setRequestsPerSecond] = useState<Array<{ time: string; requests: number }>>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [roundRobinIndex, setRoundRobinIndex] = useState(0);

  // Select server based on algorithm
  const selectServer = useCallback(() => {
    const availableServers = servers.filter(s => s.status !== 'offline');
    if (availableServers.length === 0) return null;

    let selectedServer: ServerData | null = null;

    switch (algorithm) {
      case 'round-robin':
        selectedServer = availableServers[roundRobinIndex % availableServers.length];
        setRoundRobinIndex(prev => prev + 1);
        break;
      case 'least-connections':
        selectedServer = availableServers.reduce((prev, curr) =>
          curr.connections < prev.connections ? curr : prev
        );
        break;
      case 'ip-hash':
        // Simulate IP hash by using a pseudo-random but consistent selection
        const hash = Math.floor(Math.random() * availableServers.length);
        selectedServer = availableServers[hash];
        break;
      case 'random':
        selectedServer = availableServers[Math.floor(Math.random() * availableServers.length)];
        break;
    }

    return selectedServer;
  }, [algorithm, servers, roundRobinIndex]);

  // Simulate traffic
  useEffect(() => {
    if (!isRunning || servers.length === 0) return;

    const interval = setInterval(() => {
      const server = selectServer();
      if (!server) return;

      const trafficId = `traffic-${Date.now()}-${Math.random()}`;
      const clientId = `Client-${Math.floor(Math.random() * 4) + 1}`;

      // Add to active traffic
      setActiveTraffic(prev => [...prev, { id: trafficId, serverId: server.id, startTime: Date.now() }]);

      // Update server load and connections
      setServers(prev => prev.map(s => {
        if (s.id === server.id) {
          const newConnections = s.connections + 1;
          const newLoad = Math.min(95, s.load + Math.floor(Math.random() * 5));
          return {
            ...s,
            connections: newConnections,
            load: newLoad,
            status: newLoad > 80 ? 'overloaded' : 'healthy',
          };
        }
        return s;
      }));

      // Update requests per server
      setRequestsPerServer(prev => ({
        ...prev,
        [server.id]: (prev[server.id] || 0) + 1,
      }));

      // Add to logs
      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      setLogs(prev => [
        ...prev.slice(-49),
        {
          id: trafficId,
          timestamp,
          clientId,
          serverId: server.id,
          serverName: server.name,
          responseTime: server.responseTime,
        },
      ]);

      setTotalRequests(prev => prev + 1);

      // Remove from active traffic after delay
      setTimeout(() => {
        setActiveTraffic(prev => prev.filter(t => t.id !== trafficId));
        setServers(prev => prev.map(s => {
          if (s.id === server.id) {
            const newConnections = Math.max(0, s.connections - 1);
            const newLoad = Math.max(0, s.load - Math.floor(Math.random() * 3));
            return {
              ...s,
              connections: newConnections,
              load: newLoad,
              status: newLoad > 80 ? 'overloaded' : 'healthy',
            };
          }
          return s;
        }));
      }, 1500);
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, servers.length, selectServer]);

  // Update requests per second chart
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

      setRequestsPerSecond(prev => {
        const newData = [...prev, { time: timeStr, requests: Math.floor(Math.random() * 20) + 10 }];
        return newData.slice(-20);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleAddServer = (name: string) => {
    const newServer: ServerData = {
      id: Date.now().toString(),
      name,
      load: Math.floor(Math.random() * 30),
      connections: 0,
      responseTime: Math.floor(Math.random() * 30) + 15,
      status: 'healthy',
    };
    setServers(prev => [...prev, newServer]);
  };

  const handleRemoveServer = (id: string) => {
    setServers(prev => prev.filter(s => s.id !== id));
    setRequestsPerServer(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalRequests(0);
    setRequestsPerServer({});
    setLogs([]);
    setRequestsPerSecond([]);
    setActiveTraffic([]);
    setRoundRobinIndex(0);
    setServers(prev => prev.map(s => ({
      ...s,
      load: Math.floor(Math.random() * 30),
      connections: 0,
      status: 'healthy',
    })));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950">
      <TopNavBar
        isRunning={isRunning}
        algorithm={algorithm}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        onReset={handleReset}
        onAlgorithmChange={setAlgorithm}
      />

      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar onAddServer={() => setShowAddModal(true)} />

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {servers.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-4xl">🖥️</div>
                  </div>
                  <h2 className="text-xl text-white mb-2">No Servers Configured</h2>
                  <p className="text-gray-500 mb-6">Add servers to start simulating load balancing</p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Add Your First Server
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="h-96">
                  <NetworkDiagram
                    servers={servers}
                    activeTraffic={activeTraffic}
                    isRunning={isRunning}
                  />
                </div>

                <div>
                  <h2 className="text-white text-lg mb-4">Server Status</h2>
                  <ServerStatusPanel servers={servers} onRemoveServer={handleRemoveServer} />
                </div>

                <BottomSection requestsPerSecond={requestsPerSecond} logs={logs} />
              </>
            )}
          </div>

          <RightSidebar
            algorithm={algorithm}
            totalRequests={totalRequests}
            requestsPerServer={requestsPerServer}
            servers={servers}
          />
        </div>
      </div>

      <AddServerModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddServer}
      />
    </div>
  );
}

export default App;
