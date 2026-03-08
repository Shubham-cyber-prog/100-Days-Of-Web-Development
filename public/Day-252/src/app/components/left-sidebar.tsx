import { Plus, Folder, Search } from 'lucide-react';
import { FloatingToolbar } from './floating-toolbar';
import { useState } from 'react';

interface Board {
  id: string;
  name: string;
  lastModified: string;
}

interface LeftSidebarProps {
  boards: Board[];
  currentBoardId: string | null;
  onSelectBoard: (id: string) => void;
  onCreateBoard: () => void;
  onAddElement: (type: string) => void;
  onDelete?: () => void;
  selectedElementId?: string | null;
}

export function LeftSidebar({
  boards,
  currentBoardId,
  onSelectBoard,
  onCreateBoard,
  onAddElement,
  onDelete,
  selectedElementId,
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-gradient-to-b from-gray-50 to-white border-r border-gray-200 flex flex-col shadow-sm">
      {/* Tools section */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3 tracking-wider">Tools</h3>
        <FloatingToolbar onAddElement={onAddElement} onDelete={onDelete} selectedElementId={selectedElementId} />
      </div>

      {/* Boards section */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Boards</h3>
          <button
            onClick={onCreateBoard}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="Create new board"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search boards..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>

        <div className="space-y-1">
          {filteredBoards.map((board) => (
            <button
              key={board.id}
              onClick={() => onSelectBoard(board.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-left ${
                currentBoardId === board.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Folder className="w-4 h-4 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{board.name}</p>
                <p className="text-xs text-gray-500">{board.lastModified}</p>
              </div>
            </button>
          ))}
          {filteredBoards.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No boards found</p>
          )}
        </div>
      </div>
    </div>
  );
}