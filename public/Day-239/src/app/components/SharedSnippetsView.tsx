import { Share2, Clock, User, Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SharedSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  author: string;
  sharedAt: Date;
  likes: number;
}

const mockSharedSnippets: SharedSnippet[] = [
  {
    id: 's1',
    title: 'Debounce Hook',
    language: 'TypeScript',
    code: `import { useEffect, useState } from 'react';\n\nexport function useDebounce<T>(value: T, delay: number): T {\n  const [debouncedValue, setDebouncedValue] = useState<T>(value);\n\n  useEffect(() => {\n    const handler = setTimeout(() => {\n      setDebouncedValue(value);\n    }, delay);\n\n    return () => {\n      clearTimeout(handler);\n    };\n  }, [value, delay]);\n\n  return debouncedValue;\n}`,
    author: 'Sarah Chen',
    sharedAt: new Date(2026, 1, 23),
    likes: 42,
  },
  {
    id: 's2',
    title: 'Quick Sort Algorithm',
    language: 'Python',
    code: `def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quicksort(left) + middle + quicksort(right)\n\n# Example usage\nnumbers = [3, 6, 8, 10, 1, 2, 1]\nprint(quicksort(numbers))`,
    author: 'Alex Kumar',
    sharedAt: new Date(2026, 1, 22),
    likes: 38,
  },
  {
    id: 's3',
    title: 'JWT Token Verification',
    language: 'JavaScript',
    code: `const jwt = require('jsonwebtoken');\n\nfunction verifyToken(req, res, next) {\n  const token = req.headers['authorization']?.split(' ')[1];\n  \n  if (!token) {\n    return res.status(403).json({ error: 'No token provided' });\n  }\n  \n  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {\n    if (err) {\n      return res.status(401).json({ error: 'Unauthorized' });\n    }\n    req.userId = decoded.id;\n    next();\n  });\n}`,
    author: 'Mike Rodriguez',
    sharedAt: new Date(2026, 1, 21),
    likes: 56,
  },
];

export function SharedSnippetsView() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-white text-2xl mb-2 flex items-center gap-2">
          <Share2 className="w-6 h-6" />
          Shared Snippets
        </h1>
        <p className="text-gray-400">Browse code snippets shared by the community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockSharedSnippets.map((snippet) => (
          <div
            key={snippet.id}
            className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-4 hover:border-[#3d3d3d] transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-white font-medium mb-2">{snippet.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {snippet.language}
                  </span>
                </div>
              </div>
            </div>

            {/* Code Preview */}
            <div className="bg-[#0d0d0d] rounded border border-[#2d2d2d] p-3 mb-3 overflow-hidden">
              <pre className="text-xs text-gray-400 font-mono overflow-hidden">
                <code>{snippet.code.split('\n').slice(0, 4).join('\n')}</code>
              </pre>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{snippet.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{snippet.likes}</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatDistanceToNow(snippet.sharedAt, { addSuffix: true })}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm mb-4">
          This is a demo view. Connect to enable real-time snippet sharing.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
          Enable Sharing
        </button>
      </div>
    </div>
  );
}
