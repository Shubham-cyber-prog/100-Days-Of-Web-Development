import { Star, Clock, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  favorite: boolean;
  updatedAt: Date;
  description?: string;
}

interface SnippetCardProps {
  snippet: Snippet;
  onClick: () => void;
  onToggleFavorite: (id: string) => void;
}

const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  TypeScript: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Python: 'bg-green-500/20 text-green-400 border-green-500/30',
  Java: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'C++': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Go: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  Rust: 'bg-red-500/20 text-red-400 border-red-500/30',
  Ruby: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  PHP: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  Swift: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  Kotlin: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  CSS: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

export function SnippetCard({ snippet, onClick, onToggleFavorite }: SnippetCardProps) {
  const codePreview = snippet.code.split('\n').slice(0, 3).join('\n');
  const languageColor = languageColors[snippet.language] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';

  return (
    <div
      onClick={onClick}
      className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-4 hover:border-[#3d3d3d] transition-all cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-white font-medium mb-2">{snippet.title}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-xs px-2 py-1 rounded border ${languageColor}`}>
              {snippet.language}
            </span>
            {snippet.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded bg-[#2d2d2d] text-gray-400 border border-[#3d3d3d]"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(snippet.id);
          }}
          className="text-gray-500 hover:text-yellow-400 transition-colors"
        >
          <Star
            className={`w-5 h-5 ${snippet.favorite ? 'fill-yellow-400 text-yellow-400' : ''}`}
          />
        </button>
      </div>

      {/* Code Preview */}
      <div className="bg-[#0d0d0d] rounded border border-[#2d2d2d] p-3 mb-3 overflow-hidden">
        <pre className="text-xs text-gray-400 font-mono overflow-hidden">
          <code>{codePreview}</code>
        </pre>
      </div>

      {/* Footer */}
      <div className="flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        Updated {formatDistanceToNow(snippet.updatedAt, { addSuffix: true })}
      </div>
    </div>
  );
}