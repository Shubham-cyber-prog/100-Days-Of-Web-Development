import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useSimulation } from '../contexts/SimulationContext';

interface AddResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'queue' | 'producer' | 'consumer';
}

export function AddResourceModal({ isOpen, onClose, type }: AddResourceModalProps) {
  const { addQueue, addProducer, addConsumer, queues } = useSimulation();
  const [name, setName] = useState('');
  const [queueId, setQueueId] = useState('');
  const [rate, setRate] = useState('1');
  const [processingTime, setProcessingTime] = useState('2000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === 'queue') {
      addQueue({ name });
    } else if (type === 'producer') {
      addProducer({ name, queueId, rate: parseFloat(rate) });
    } else if (type === 'consumer') {
      addConsumer({ name, queueId, processingTime: parseInt(processingTime) });
    }

    setName('');
    setQueueId('');
    setRate('1');
    setProcessingTime('2000');
    onClose();
  };

  const getTitle = () => {
    switch (type) {
      case 'queue':
        return 'Create New Queue';
      case 'producer':
        return 'Add Producer';
      case 'consumer':
        return 'Add Consumer';
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 border border-slate-800 rounded-lg p-6 w-full max-w-md z-50">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-semibold">{getTitle()}</Dialog.Title>
            <Dialog.Close className="p-1 hover:bg-slate-800 rounded">
              <X size={20} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder={`Enter ${type} name`}
              />
            </div>

            {(type === 'producer' || type === 'consumer') && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Queue
                </label>
                <select
                  value={queueId}
                  onChange={(e) => setQueueId(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="">Select a queue</option>
                  {queues.map((queue) => (
                    <option key={queue.id} value={queue.id}>
                      {queue.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {type === 'producer' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Message Rate (messages/second)
                </label>
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  required
                  min="0.1"
                  max="5"
                  step="0.1"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            )}

            {type === 'consumer' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Processing Time (milliseconds)
                </label>
                <input
                  type="number"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                  required
                  min="500"
                  max="10000"
                  step="100"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
              >
                Create
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
