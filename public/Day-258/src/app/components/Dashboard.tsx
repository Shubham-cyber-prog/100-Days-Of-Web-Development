import { SimulationFlow } from './SimulationFlow';
import { QueueStatusPanel } from './QueueStatusPanel';
import { MessageDetailsPanel } from './MessageDetailsPanel';
import { LogsPanel } from './LogsPanel';
import { useSimulation } from '../contexts/SimulationContext';

export function Dashboard() {
  const { queues, selectedMessage } = useSimulation();

  if (queues.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-800 rounded-full mx-auto mb-6 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-cyan-500 rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No Queues Configured</h2>
          <p className="text-slate-400 mb-6">
            Create a queue to get started with the simulator
          </p>
          <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
            Create Your First Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <div className={`flex-1 ${selectedMessage ? 'mr-80' : ''}`}>
          <SimulationFlow />
          <QueueStatusPanel />
        </div>
        {selectedMessage && (
          <div className="fixed right-6 top-24 w-80">
            <MessageDetailsPanel />
          </div>
        )}
      </div>
      <LogsPanel />
    </div>
  );
}
