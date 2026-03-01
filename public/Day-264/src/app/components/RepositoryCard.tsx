import { Link } from 'react-router';
import { Star, GitFork, Lock } from 'lucide-react';
import { Repository } from '../data/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface RepositoryCardProps {
  repo: Repository;
}

export default function RepositoryCard({ repo }: RepositoryCardProps) {
  const languageColors: Record<string, string> = {
    TypeScript: 'bg-blue-500',
    JavaScript: 'bg-yellow-400',
    Python: 'bg-blue-600',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-500',
    Java: 'bg-red-500',
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/${repo.owner}/${repo.name}`}
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {repo.name}
            </Link>
            {repo.isPrivate && (
              <Badge variant="outline" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">{repo.description}</p>

          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-3 h-3 rounded-full ${
                    languageColors[repo.language] || 'bg-gray-400'
                  }`}
                />
                {repo.language}
              </div>
            )}
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              {repo.stars}
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              {repo.forks}
            </div>
            <span>Updated {new Date(repo.lastUpdated).toLocaleDateString()}</span>
          </div>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repo.topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <Button variant="outline" size="sm" className="ml-4">
          <Star className="w-4 h-4 mr-1" />
          Star
        </Button>
      </div>
    </div>
  );
}
