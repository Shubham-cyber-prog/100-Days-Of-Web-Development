import { SnippetCard } from './SnippetCard';
import { EmptyState } from './EmptyState';

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

interface SnippetListProps {
  snippets: Snippet[];
  onSnippetClick: (snippet: Snippet) => void;
  onToggleFavorite: (id: string) => void;
  onNewSnippet: () => void;
  view: string;
}

export function SnippetList({
  snippets,
  onSnippetClick,
  onToggleFavorite,
  onNewSnippet,
  view,
}: SnippetListProps) {
  if (snippets.length === 0) {
    return <EmptyState view={view} onNewSnippet={onNewSnippet} />;
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onClick={() => onSnippetClick(snippet)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
