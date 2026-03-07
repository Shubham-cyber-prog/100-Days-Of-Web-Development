import { PlusCircle, Lightbulb } from 'lucide-react';

interface EmptyStateProps {
  onCreateBoard: () => void;
}

export function EmptyState({ onCreateBoard }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="text-center max-w-md px-6">
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl">
            <Lightbulb className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to Brainstorm</h1>
        <p className="text-gray-600 mb-8">
          Start collaborating with your team on ideas, concepts, and projects. Create your first board to get
          started.
        </p>
        <button
          onClick={onCreateBoard}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl font-medium"
        >
          <PlusCircle className="w-5 h-5" />
          Create your first board
        </button>
        <div className="mt-12 grid grid-cols-3 gap-6 text-left">
          <div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="font-medium text-sm text-gray-900 mb-1">Sticky Notes</h3>
            <p className="text-xs text-gray-500">Capture ideas quickly</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="font-medium text-sm text-gray-900 mb-1">Mind Maps</h3>
            <p className="text-xs text-gray-500">Connect your thoughts</p>
          </div>
          <div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-medium text-sm text-gray-900 mb-1">Collaborate</h3>
            <p className="text-xs text-gray-500">Work together in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
}
