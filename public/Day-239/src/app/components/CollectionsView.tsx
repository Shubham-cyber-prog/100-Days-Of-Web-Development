import { FolderOpen, Tag } from 'lucide-react';

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

interface CollectionsViewProps {
  snippets: Snippet[];
  onTagClick: (tag: string) => void;
}

const tagColors = [
  'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'bg-green-500/20 text-green-400 border-green-500/30',
  'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
];

export function CollectionsView({ snippets, onTagClick }: CollectionsViewProps) {
  // Collect all tags with counts
  const tagStats = snippets.reduce((acc, snippet) => {
    snippet.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const tags = Object.entries(tagStats).sort((a, b) => b[1] - a[1]);

  // Group by language
  const languageGroups = snippets.reduce((acc, snippet) => {
    if (!acc[snippet.language]) {
      acc[snippet.language] = [];
    }
    acc[snippet.language].push(snippet);
    return acc;
  }, {} as Record<string, Snippet[]>);

  return (
    <div className="p-6 space-y-8">
      {/* Tags Section */}
      <div>
        <h2 className="text-white text-2xl mb-4 flex items-center gap-2">
          <Tag className="w-6 h-6" />
          Tags
        </h2>
        <div className="flex flex-wrap gap-3">
          {tags.length > 0 ? (
            tags.map(([tag, count], index) => (
              <button
                key={tag}
                onClick={() => onTagClick(tag)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all hover:scale-105 ${
                  tagColors[index % tagColors.length]
                }`}
              >
                <Tag className="w-3 h-3 inline mr-2" />
                {tag}
                <span className="ml-2 opacity-75">({count})</span>
              </button>
            ))
          ) : (
            <p className="text-gray-400">No tags yet</p>
          )}
        </div>
      </div>

      {/* Collections by Language */}
      <div>
        <h2 className="text-white text-2xl mb-4 flex items-center gap-2">
          <FolderOpen className="w-6 h-6" />
          Collections by Language
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(languageGroups).map(([language, languageSnippets]) => (
            <div
              key={language}
              className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6 hover:border-[#3d3d3d] transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{language}</h3>
                  <p className="text-sm text-gray-400">
                    {languageSnippets.length} snippet{languageSnippets.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {languageSnippets.slice(0, 3).map((snippet) => (
                  <div
                    key={snippet.id}
                    className="text-sm text-gray-400 truncate hover:text-white transition-colors cursor-pointer"
                  >
                    • {snippet.title}
                  </div>
                ))}
                {languageSnippets.length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{languageSnippets.length - 3} more
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
