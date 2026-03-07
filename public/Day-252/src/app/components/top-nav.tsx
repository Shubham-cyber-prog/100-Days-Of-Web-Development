import { useState } from 'react';
import { AvatarStack } from './user-avatar';
import { Share2, Download, Settings, Lightbulb, Keyboard } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface TopNavProps {
  boardName: string;
  onBoardNameChange: (name: string) => void;
  users: Array<{ name: string; color: string; isOnline?: boolean }>;
  onShare: () => void;
  onExport: () => void;
  onShowShortcuts?: () => void;
}

export function TopNav({ boardName, onBoardNameChange, users, onShare, onExport, onShowShortcuts }: TopNavProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  return (
    <Tooltip.Provider>
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Brainstorm</span>
          </div>
          <div className="h-6 w-px bg-gray-300" />
          {isEditingTitle ? (
            <input
              type="text"
              value={boardName}
              onChange={(e) => onBoardNameChange(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              className="px-2 py-1 border border-gray-300 rounded font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="px-2 py-1 font-medium text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {boardName}
            </button>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <AvatarStack users={users} max={5} />
          <div className="flex items-center gap-2">
            <button
              onClick={onShare}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg text-sm font-medium"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  onClick={onExport}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl" sideOffset={5}>
                  Export board
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button 
                  onClick={onShowShortcuts}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Keyboard className="w-5 h-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl" sideOffset={5}>
                  Keyboard shortcuts (?)
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl" sideOffset={5}>
                  Settings
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
}