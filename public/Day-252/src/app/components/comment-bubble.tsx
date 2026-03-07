import { UserAvatar } from './user-avatar';
import { formatDistanceToNow } from 'date-fns';

export interface Comment {
  id: string;
  user: { name: string; color: string };
  text: string;
  timestamp: Date;
}

interface CommentBubbleProps {
  comment: Comment;
}

export function CommentBubble({ comment }: CommentBubbleProps) {
  return (
    <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <UserAvatar name={comment.user.name} color={comment.user.color} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-medium text-sm text-gray-900">{comment.user.name}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(comment.timestamp, { addSuffix: true })}
          </span>
        </div>
        <p className="text-sm text-gray-700 break-words">{comment.text}</p>
      </div>
    </div>
  );
}

interface CommentsListProps {
  comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <CommentBubble key={comment.id} comment={comment} />
      ))}
      {comments.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-8">No comments yet</p>
      )}
    </div>
  );
}
