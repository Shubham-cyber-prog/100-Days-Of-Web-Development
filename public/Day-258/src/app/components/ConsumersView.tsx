import { useSimulation } from '../contexts/SimulationContext';
import { Download, Trash2 } from 'lucide-react';

export function ConsumersView() {
  const { consumers, queues, removeConsumer } = useSimulation();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Consumers</h1>
        <div className="text-sm text-slate-400">
          {consumers.length} consumer{consumers.length !== 1 ? 's' : ''} active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {consumers.map((consumer) => {
          const queue = queues.find(q => q.id === consumer.queueId);
          
          return (
            <div key={consumer.id} className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Download size={20} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{consumer.name}</h3>
                    <div className="text-xs text-slate-400">ID: {consumer.id}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeConsumer(consumer.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    consumer.status === 'processing' ? 'bg-yellow-500' :
                    consumer.status === 'active' ? 'bg-green-500' : 'bg-slate-600'
                  }`} />
                  <span className="text-sm text-slate-400 capitalize">{consumer.status}</span>
                </div>

                <div className="bg-slate-800 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Connected Queue</div>
                  <div className="text-sm font-medium">{queue?.name || 'Unknown'}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                  <div>
                    <div className="text-xs text-slate-400">Messages Consumed</div>
                    <div className="text-xl font-mono">{consumer.messagesConsumed}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Processing Time</div>
                    <div className="text-xl font-mono">{consumer.processingTime}ms</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {consumers.length === 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center">
          <Download size={48} className="mx-auto mb-4 text-slate-600" />
          <h3 className="text-lg font-semibold mb-2">No Consumers</h3>
          <p className="text-slate-400 mb-4">Add a consumer to start processing messages</p>
        </div>
      )}
    </div>
  );
}
