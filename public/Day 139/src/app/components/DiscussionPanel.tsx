import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { MessageSquare, ThumbsUp } from 'lucide-react';

interface Discussion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
}

interface DiscussionPanelProps {
  discussions: Discussion[];
}

export function DiscussionPanel({ discussions }: DiscussionPanelProps) {
  return (
    <Card>
      <CardHeader>
        <h3>Recent Discussions</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm">{discussion.author}</p>
                  <p className="text-xs text-gray-500">{discussion.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-3">{discussion.content}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{discussion.likes}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span>{discussion.replies} replies</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
