import { Server, Plus } from 'lucide-react';

interface EmptyStateProps {
  onCreateVM: () => void;
}

export function EmptyState({ onCreateVM }: EmptyStateProps) {
  return (
    <div className="h-full flex items-center justify-center bg-[#1a1a1a]">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-[#2d2d2d] rounded-full flex items-center justify-center">
            <Server className="w-10 h-10 text-gray-500" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">No Virtual Machines Yet</h2>
        <p className="text-gray-400 mb-6">
          Create your first virtual machine to get started. Choose from popular operating systems or upload your own ISO.
        </p>
        <button
          onClick={onCreateVM}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors mx-auto"
        >
          <Plus className="w-5 h-5" />
          Create Your First VM
        </button>
        
        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <div className="bg-[#2d2d2d] rounded-lg p-4">
            <div className="text-3xl mb-2">🐧</div>
            <div className="text-gray-400">Linux</div>
          </div>
          <div className="bg-[#2d2d2d] rounded-lg p-4">
            <div className="text-3xl mb-2">🪟</div>
            <div className="text-gray-400">Windows</div>
          </div>
          <div className="bg-[#2d2d2d] rounded-lg p-4">
            <div className="text-3xl mb-2">📀</div>
            <div className="text-gray-400">Custom ISO</div>
          </div>
        </div>
      </div>
    </div>
  );
}
