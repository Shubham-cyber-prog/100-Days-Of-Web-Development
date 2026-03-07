import * as Dialog from '@radix-ui/react-dialog';
import { X, Command } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { category: 'General', items: [
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['Cmd', 'Z'], description: 'Undo' },
    { keys: ['Cmd', 'Shift', 'Z'], description: 'Redo' },
    { keys: ['Cmd', 'S'], description: 'Save board' },
  ]},
  { category: 'Elements', items: [
    { keys: ['N'], description: 'New sticky note' },
    { keys: ['T'], description: 'New text box' },
    { keys: ['M'], description: 'New mind map node' },
    { keys: ['Delete'], description: 'Delete selected element' },
    { keys: ['Escape'], description: 'Deselect element' },
  ]},
  { category: 'Canvas', items: [
    { keys: ['+'], description: 'Zoom in' },
    { keys: ['-'], description: 'Zoom out' },
    { keys: ['0'], description: 'Reset zoom' },
    { keys: ['Space', 'Drag'], description: 'Pan canvas' },
  ]},
];

export function KeyboardShortcuts({ isOpen, onClose }: KeyboardShortcutsProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-in fade-in z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 z-50">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Command className="w-6 h-6 text-white" />
                </div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Keyboard Shortcuts
                </Dialog.Title>
              </div>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">
            View and learn keyboard shortcuts for the brainstorming tool
          </Dialog.Description>

          <div className="p-6 overflow-y-auto max-h-[calc(85vh-120px)]">
            <div className="space-y-8">
              {shortcuts.map((category) => (
                <div key={category.category}>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                    {category.category}
                  </h3>
                  <div className="space-y-2">
                    {category.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg">
                        <span className="text-gray-700">{item.description}</span>
                        <div className="flex items-center gap-1">
                          {item.keys.map((key, keyIndex) => (
                            <span key={keyIndex} className="flex items-center gap-1">
                              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-medium text-gray-700 min-w-[2rem] text-center">
                                {key}
                              </kbd>
                              {keyIndex < item.keys.length - 1 && (
                                <span className="text-gray-400">+</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}