import { Code2, Search, Star, FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  view: string;
  onNewSnippet: () => void;
}

export function EmptyState({ view, onNewSnippet }: EmptyStateProps) {
  const configs = {
    all: {
      icon: Code2,
      title: 'No snippets yet',
      description: 'Create your first code snippet to get started',
      showButton: true,
    },
    favorites: {
      icon: Star,
      title: 'No favorite snippets',
      description: 'Star snippets to quickly access them here',
      showButton: false,
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search or filter criteria',
      showButton: false,
    },
    collections: {
      icon: FolderOpen,
      title: 'No collections yet',
      description: 'Organize your snippets by creating collections',
      showButton: false,
    },
  };

  const config = configs[view as keyof typeof configs] || configs.all;
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-center">
      <div className="w-20 h-20 bg-[#2d2d2d] rounded-full flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 text-gray-500" />
      </div>
      <h3 className="text-white text-xl mb-2">{config.title}</h3>
      <p className="text-gray-400 mb-6 max-w-md">{config.description}</p>
      {config.showButton && (
        <button
          onClick={onNewSnippet}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg transition-colors"
        >
          Create Your First Snippet
        </button>
      )}
    </div>
  );
}
