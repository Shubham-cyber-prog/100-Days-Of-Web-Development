import { GitCommit } from 'lucide-react';
import { Commit } from '../data/mockData';

interface CommitTimelineProps {
  commits: Commit[];
}

export default function CommitTimeline({ commits }: CommitTimelineProps) {
  return (
    <div className="border rounded-lg divide-y">
      {commits.map((commit) => (
        <div key={commit.id} className="p-4 hover:bg-gray-50">
          <div className="flex items-start gap-3">
            <GitCommit className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{commit.message}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                <span>{commit.author}</span>
                <span>committed on {new Date(commit.date).toLocaleDateString()}</span>
              </div>
            </div>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded font-mono">
              {commit.hash}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}
