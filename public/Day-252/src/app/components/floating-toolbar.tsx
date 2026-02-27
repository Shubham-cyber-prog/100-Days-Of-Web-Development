import { StickyNote, Type, Circle, ArrowRight, Pencil, Image, Trash2 } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

interface FloatingToolbarProps {
  onAddElement: (type: string) => void;
  onDelete?: () => void;
  selectedElementId?: string | null;
}

export function FloatingToolbar({ onAddElement, onDelete, selectedElementId }: FloatingToolbarProps) {
  const tools = [
    { id: 'sticky', icon: StickyNote, label: 'Sticky Note', color: 'text-yellow-600', shortcut: 'N' },
    { id: 'text', icon: Type, label: 'Text Box', color: 'text-gray-600', shortcut: 'T' },
    { id: 'circle', icon: Circle, label: 'Mind Map Node', color: 'text-blue-600', shortcut: 'M' },
    { id: 'arrow', icon: ArrowRight, label: 'Connector', color: 'text-purple-600', shortcut: 'C' },
    { id: 'draw', icon: Pencil, label: 'Draw', color: 'text-green-600', shortcut: 'D' },
    { id: 'image', icon: Image, label: 'Image', color: 'text-pink-600', shortcut: 'I' },
  ];

  return (
    <Tooltip.Provider>
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
        <div className="flex flex-col gap-1">
          {tools.map((tool) => (
            <Tooltip.Root key={tool.id}>
              <Tooltip.Trigger asChild>
                <button
                  onClick={() => onAddElement(tool.id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all text-left group"
                >
                  <tool.icon className={`w-5 h-5 ${tool.color} group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-gray-700">{tool.label}</span>
                  <span className="ml-auto text-xs text-gray-400 font-mono">{tool.shortcut}</span>
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content 
                  className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-xl" 
                  side="right"
                  sideOffset={10}
                >
                  {tool.label} ({tool.shortcut})
                  <Tooltip.Arrow className="fill-gray-900" />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          ))}
          {selectedElementId && onDelete && (
            <>
              <div className="h-px bg-gray-200 my-1" />
              <button
                onClick={onDelete}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-red-50 transition-colors text-left"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-600">Delete</span>
                <span className="ml-auto text-xs text-gray-400 font-mono">Del</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Tooltip.Provider>
  );
}