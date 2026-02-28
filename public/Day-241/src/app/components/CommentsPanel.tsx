import { useState } from 'react';
import { X, Send, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface Comment {
  id: string;
  author: {
    name: string;
    initials: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
  replies?: Comment[];
}

interface CommentsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: { name: 'Jane Smith', initials: 'JS' },
    content: 'Can we revise this section to be more concise?',
    timestamp: '2 hours ago',
    replies: [
      {
        id: '1-1',
        author: { name: 'John Doe', initials: 'JD' },
        content: 'Good point! I\'ll update it shortly.',
        timestamp: '1 hour ago',
      },
    ],
  },
  {
    id: '2',
    author: { name: 'Mike Johnson', initials: 'MJ' },
    content: 'Great work on the introduction! Very clear and engaging.',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    author: { name: 'Sarah Williams', initials: 'SW' },
    content: 'Should we add more data to support this claim?',
    timestamp: '2 days ago',
    replies: [],
  },
];

export function CommentsPanel({ isOpen, onClose }: CommentsPanelProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: { name: 'John Doe', initials: 'JD' },
        content: newComment,
        timestamp: 'Just now',
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleAddReply = (commentId: string) => {
    if (replyText.trim()) {
      const reply: Comment = {
        id: `${commentId}-${Date.now()}`,
        author: { name: 'John Doe', initials: 'JD' },
        content: replyText,
        timestamp: 'Just now',
      };

      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), reply],
          };
        }
        return comment;
      }));
      
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleResolve = (commentId: string) => {
    setComments(comments.filter(c => c.id !== commentId));
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold">Comments</h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* New Comment Input */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="resize-none min-h-[80px]"
        />
        <div className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="w-3 h-3 mr-2" />
            Comment
          </Button>
        </div>
      </div>

      {/* Comments List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="space-y-3">
                {/* Main Comment */}
                <div className="group">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{comment.author.name}</span>
                            <span className="text-xs text-gray-500">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                            >
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleResolve(comment.id)}>
                              Resolve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setReplyingTo(comment.id)}
                        className="h-7 px-2 mt-1 text-xs"
                      >
                        Reply
                      </Button>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-11 mt-3 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <Avatar className="w-7 h-7 flex-shrink-0">
                            <AvatarImage src={reply.author.avatar} />
                            <AvatarFallback className="text-xs">{reply.author.initials}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{reply.author.name}</span>
                              <span className="text-xs text-gray-500">{reply.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  {replyingTo === comment.id && (
                    <div className="ml-11 mt-3 space-y-2">
                      <Textarea
                        placeholder="Write a reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="resize-none min-h-[60px] text-sm"
                        autoFocus
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText('');
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Divider */}
                {comments[comments.length - 1].id !== comment.id && (
                  <div className="border-b border-gray-100" />
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
