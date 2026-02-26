import * as Dialog from '@radix-ui/react-dialog';
import { X, Grid3x3, GitBranch, Target, Lightbulb, Calendar, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  preview: string;
}

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

const templates: Template[] = [
  {
    id: 'brainstorm',
    name: 'Brainstorming Session',
    description: 'Free-form idea generation with sticky notes',
    icon: Lightbulb,
    color: 'from-yellow-400 to-orange-500',
    preview: '📝 💡 🎯',
  },
  {
    id: 'mindmap',
    name: 'Mind Map',
    description: 'Hierarchical idea organization',
    icon: GitBranch,
    color: 'from-purple-400 to-pink-500',
    preview: '🧠 🔗 📊',
  },
  {
    id: 'kanban',
    name: 'Kanban Board',
    description: 'Organize tasks in columns',
    icon: Grid3x3,
    color: 'from-blue-400 to-cyan-500',
    preview: '📋 ➡️ ✅',
  },
  {
    id: 'swot',
    name: 'SWOT Analysis',
    description: 'Strengths, Weaknesses, Opportunities, Threats',
    icon: Target,
    color: 'from-green-400 to-emerald-500',
    preview: '💪 🎯 📈',
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'Plan projects chronologically',
    icon: Calendar,
    color: 'from-red-400 to-rose-500',
    preview: '📅 ⏰ 🗓️',
  },
  {
    id: 'workflow',
    name: 'Workflow Diagram',
    description: 'Map processes and flows',
    icon: Workflow,
    color: 'from-indigo-400 to-violet-500',
    preview: '🔄 ⚙️ 🎨',
  },
];

export function TemplatesModal({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-in fade-in z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden animate-in fade-in zoom-in-95 z-50">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Choose a Template
                </Dialog.Title>
                <p className="text-gray-600 mt-1">Start with a pre-built layout or create from scratch</p>
              </div>
              <Dialog.Close className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-6 h-6" />
              </Dialog.Close>
            </div>
          </div>
          <Dialog.Description className="sr-only">
            Choose from various templates to start your brainstorming session
          </Dialog.Description>

          <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Blank canvas option */}
              <motion.button
                onClick={() => {
                  onSelectTemplate('blank');
                  onClose();
                }}
                className="group relative p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-all text-left bg-gray-50 hover:bg-blue-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                    <Grid3x3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      Blank Canvas
                    </h3>
                    <p className="text-xs text-gray-500">Start from scratch</p>
                  </div>
                </div>
              </motion.button>

              {/* Template options */}
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  onClick={() => {
                    onSelectTemplate(template.id);
                    onClose();
                  }}
                  className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all text-left hover:shadow-lg bg-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <template.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                    </div>
                  </div>
                  <div className="text-2xl text-center py-4 bg-gray-50 rounded-lg border border-gray-100">
                    {template.preview}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}