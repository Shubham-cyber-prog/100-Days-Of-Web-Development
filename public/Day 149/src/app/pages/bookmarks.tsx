import React, { useState } from 'react';
import { Star, Search, FolderOpen, Calendar, User, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router';

interface Bookmark {
  id: string;
  articleId: string;
  articleTitle: string;
  category: string;
  bookmarkedAt: Date;
  addedBy: string;
  description: string;
  tags: string[];
}

export default function BookmarksPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const bookmarks: Bookmark[] = [
    {
      id: '1',
      articleId: 'art1',
      articleTitle: 'Advanced TypeScript Patterns',
      category: 'Development',
      bookmarkedAt: new Date('2026-03-07T10:00:00'),
      addedBy: 'You',
      description: 'Comprehensive guide on advanced TypeScript patterns and best practices',
      tags: ['typescript', 'patterns', 'advanced']
    },
    {
      id: '2',
      articleId: 'art2',
      articleTitle: 'React Best Practices',
      category: 'Development',
      bookmarkedAt: new Date('2026-03-06T15:30:00'),
      addedBy: 'You',
      description: 'Essential best practices for building React applications',
      tags: ['react', 'best-practices', 'frontend']
    },
    {
      id: '3',
      articleId: 'art3',
      articleTitle: 'API Documentation Guide',
      category: 'Documentation',
      bookmarkedAt: new Date('2026-03-05T09:20:00'),
      addedBy: 'You',
      description: 'How to write effective API documentation',
      tags: ['api', 'documentation', 'guide']
    },
    {
      id: '4',
      articleId: 'art4',
      articleTitle: 'Database Migration Steps',
      category: 'DevOps',
      bookmarkedAt: new Date('2026-03-04T14:15:00'),
      addedBy: 'You',
      description: 'Step-by-step guide for database migrations',
      tags: ['database', 'migration', 'devops']
    },
    {
      id: '5',
      articleId: 'art5',
      articleTitle: 'Security Best Practices',
      category: 'Security',
      bookmarkedAt: new Date('2026-03-03T11:45:00'),
      addedBy: 'You',
      description: 'Essential security practices for web applications',
      tags: ['security', 'best-practices', 'web']
    }
  ];

  const categories = ['all', ...Array.from(new Set(bookmarks.map(b => b.category)))];

  const filteredBookmarks = bookmarks.filter(bookmark => {
    const matchesSearch = bookmark.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bookmark.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bookmark.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRemoveBookmark = (id: string) => {
    // In a real app, this would remove the bookmark
    console.log('Remove bookmark:', id);
  };

  const handleOpenArticle = (articleId: string) => {
    navigate(`/editor/${articleId}`);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Star className="size-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Bookmarks
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {bookmarks.length} saved articles
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmarks Grid */}
      {filteredBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <Star className="size-5 text-yellow-600 dark:text-yellow-400 fill-current" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {bookmark.articleTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <FolderOpen className="size-4" />
                      <span>{bookmark.category}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveBookmark(bookmark.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {bookmark.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {bookmark.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="size-4" />
                  <span>Saved {formatDate(bookmark.bookmarkedAt)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleOpenArticle(bookmark.articleId)}
                  className="gap-2"
                >
                  Open
                  <ExternalLink className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
            <Star className="size-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No bookmarks found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery
              ? 'Try adjusting your search or filters'
              : 'Start bookmarking articles to see them here'}
          </p>
        </div>
      )}
    </div>
  );
}
