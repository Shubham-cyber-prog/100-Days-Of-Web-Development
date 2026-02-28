import { useSimulation } from '../contexts/SimulationContext';
import { Layers, Trash2 } from 'lucide-react';
import * as Progress from '@radix-ui/react-progress';

export function QueuesView() {
  const { queues, removeQueue } = useSimulation();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Queues</h1>
        <div className="text-sm text-slate-400">
          {queues.length} queue{queues.length !== 1 ? 's' : ''} configured
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {queues.map((queue) => (
          <div key={queue.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Layers size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold">{queue.name}</h3>
                  <div className="text-xs text-slate-400">ID: {queue.id}</div>
                </div>
              </div>
              <button
                onClick={() => removeQueue(queue.id)}
                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="space-y-3">
              <div className={`px-3 py-2 rounded-lg ${
                queue.status === 'overloaded' ? 'bg-red-500/20 text-red-400' :
                queue.status === 'normal' ? 'bg-green-500/20 text-green-400' :
                'bg-slate-800 text-slate-400'
              }`}>
                <div className="text-xs font-medium uppercase">Status: {queue.status}</div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Queue Depth</span>
                  <span className="font-mono">{queue.messagesInQueue} messages</span>
                </div>
                <Progress.Root className="relative overflow-hidden bg-slate-800 rounded-full w-full h-2">
                  <Progress.Indicator
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-transform duration-300"
                    style={{ transform: `translateX(-${100 - Math.min((queue.messagesInQueue / 20) * 100, 100)}%)` }}
                  />
                </Progress.Root>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                <div>
                  <div className="text-xs text-slate-400">Total Processed</div>
                  <div className="text-xl font-mono">{queue.messagesProcessed}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Processing Rate</div>
                  <div className="text-xl font-mono">{queue.processingRate}/s</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {queues.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
          <Layers size={48} className="mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-semibold mb-2">No Queues</h3>
          <p className="text-slate-400 mb-4">Create a queue to get started</p>
        </div>
      )}
    </div>
  );
}
