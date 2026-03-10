import React, { useState } from 'react';
import { Clock, RotateCcw, User, X } from 'lucide-react';
import { Button } from './ui/button';

interface Version {
  id: string;
  timestamp: Date;
  author: string;
  authorAvatar: string;
  changes: string;
  content: string;
}

interface VersionHistoryProps {
  articleId: string;
  onClose: () => void;
  onRestore: (versionId: string) => void;
}

export function VersionHistory({ articleId, onClose, onRestore }: VersionHistoryProps) {
  const [selectedVersion, setSelectedVersion] = useState<string | null>(null);

  // Mock version history data
  const versions: Version[] = [
    {
      id: 'v5',
      timestamp: new Date('2026-03-07T10:30:00'),
      author: 'Sarah Johnson',
      authorAvatar: 'SJ',
      changes: 'Updated introduction and added new examples',
      content: 'Latest version content...'
    },
    {
      id: 'v4',
      timestamp: new Date('2026-03-06T15:20:00'),
      author: 'Mike Chen',
      authorAvatar: 'MC',
      changes: 'Fixed typos and formatting issues',
      content: 'Previous version content...'
    },
    {
      id: 'v3',
      timestamp: new Date('2026-03-05T09:15:00'),
      author: 'Sarah Johnson',
      authorAvatar: 'SJ',
      changes: 'Added troubleshooting section',
      content: 'Older version content...'
    },
    {
      id: 'v2',
      timestamp: new Date('2026-03-04T14:45:00'),
      author: 'John Smith',
      authorAvatar: 'JS',
      changes: 'Restructured content hierarchy',
      content: 'Earlier version content...'
    },
    {
      id: 'v1',
      timestamp: new Date('2026-03-01T11:00:00'),
      author: 'Sarah Johnson',
      authorAvatar: 'SJ',
      changes: 'Initial version created',
      content: 'First version content...'
    }
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Clock className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Version History
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {versions.length} versions available
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Version List */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4 space-y-2">
              {versions.map((version, index) => (
                <div
                  key={version.id}
                  onClick={() => setSelectedVersion(version.id)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedVersion === version.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-medium">
                      {version.authorAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {version.author}
                        </p>
                        {index === 0 && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {formatDate(version.timestamp)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                        {version.changes}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Version Preview */}
          <div className="flex-1 overflow-y-auto">
            {selectedVersion ? (
              <div className="p-6">
                {versions.find(v => v.id === selectedVersion) && (
                  <>
                    <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {versions.find(v => v.id === selectedVersion)?.changes}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <User className="size-4" />
                            <span>{versions.find(v => v.id === selectedVersion)?.author}</span>
                            <span>•</span>
                            <Clock className="size-4" />
                            <span>
                              {formatDate(versions.find(v => v.id === selectedVersion)?.timestamp!)}
                            </span>
                          </div>
                        </div>
                        {selectedVersion !== 'v5' && (
                          <Button
                            onClick={() => onRestore(selectedVersion)}
                            variant="outline"
                            className="gap-2"
                          >
                            <RotateCcw className="size-4" />
                            Restore This Version
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                      <p className="text-gray-600 dark:text-gray-300">
                        {versions.find(v => v.id === selectedVersion)?.content}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mt-4">
                        This is a preview of the article content at this version. 
                        The actual content would be displayed here with full formatting.
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                <div className="text-center">
                  <Clock className="size-12 mx-auto mb-3 opacity-50" />
                  <p>Select a version to preview</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
