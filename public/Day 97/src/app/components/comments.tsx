import { useState } from "react";
import { Send, Heart, Reply, MoreHorizontal, Trash2, Flag } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

interface CommentsProps {
  comments: Comment[];
  onAddComment?: (content: string, parentId?: string) => void;
  onDeleteComment?: (id: string) => void;
  onLikeComment?: (id: string) => void;
}

const mockComments: Comment[] = [
  {
    id: "1",
    author: {
      name: "Sarah Miller",
      avatar: "",
      initials: "SM",
    },
    content:
      "Thanks for reporting this! I've noticed this issue as well. It's been really dark on that street.",
    timestamp: "2 hours ago",
    likes: 5,
    liked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "John Doe",
          avatar: "",
          initials: "JD",
        },
        content: "Same here! Hope it gets fixed soon.",
        timestamp: "1 hour ago",
        likes: 2,
        liked: true,
      },
    ],
  },
  {
    id: "2",
    author: {
      name: "Mike Chen",
      avatar: "",
      initials: "MC",
    },
    content: "Has anyone contacted the city about this yet?",
    timestamp: "3 hours ago",
    likes: 3,
    liked: false,
  },
  {
    id: "3",
    author: {
      name: "Emily Rodriguez",
      avatar: "",
      initials: "ER",
    },
    content:
      "I called Public Works yesterday and they said they would send someone out to inspect it this week.",
    timestamp: "4 hours ago",
    likes: 8,
    liked: true,
  },
];

function CommentItem({
  comment,
  onReply,
  onDelete,
  onLike,
  isReply = false,
}: {
  comment: Comment;
  onReply?: (id: string) => void;
  onDelete?: (id: string) => void;
  onLike?: (id: string) => void;
  isReply?: boolean;
}) {
  return (
    <div className={`flex gap-3 ${isReply ? "ml-12" : ""}`}>
      <Avatar className="size-9 shrink-0">
        <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
        <AvatarFallback className="text-xs">{comment.author.initials}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm">{comment.author.name}</span>
          <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
        </div>
        <p className="text-sm mb-2">{comment.content}</p>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`h-8 gap-1 ${comment.liked ? "text-accent" : ""}`}
            onClick={() => onLike?.(comment.id)}
          >
            <Heart className={`size-3 ${comment.liked ? "fill-current" : ""}`} />
            <span className="text-xs">{comment.likes}</span>
          </Button>
          {!isReply && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1"
              onClick={() => onReply?.(comment.id)}
            >
              <Reply className="size-3" />
              <span className="text-xs">Reply</span>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete?.(comment.id)}>
                <Trash2 className="size-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Flag className="size-4 mr-2" />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReply={onReply}
                onDelete={onDelete}
                onLike={onLike}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Comments({
  comments = mockComments,
  onAddComment,
  onDeleteComment,
  onLikeComment,
}: CommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment?.(newComment, replyingTo || undefined);
      setNewComment("");
      setReplyingTo(null);
      toast.success("Comment added successfully!");
    }
  };

  const handleReply = (id: string) => {
    setReplyingTo(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Comments ({comments.length})</h3>
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              placeholder={
                replyingTo
                  ? "Write a reply..."
                  : "Share your thoughts or additional information..."
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[80px] resize-none bg-input-background"
            />
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                {replyingTo && (
                  <span>
                    Replying to comment{" "}
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-xs"
                      onClick={() => setReplyingTo(null)}
                    >
                      Cancel
                    </Button>
                  </span>
                )}
              </div>
              <Button type="submit" size="sm" className="gap-2">
                <Send className="size-4" />
                Post Comment
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={onDeleteComment}
            onLike={onLikeComment}
          />
        ))}
      </div>
    </div>
  );
}
