import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { motion } from 'motion/react';
import type { Post } from '../lib/mockData';

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

export function PostCard({ post, onLike, onComment, onShare, onSave }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  return (
    <Card className="overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground">{post.author.name}</span>
              {post.author.isVerified && (
                <Badge variant="secondary" className="h-4 px-1 text-xs bg-primary/10 text-primary border-0">
                  ✓
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">@{post.author.username} · {post.createdAt}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal className="size-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative w-full">
          <img
            src={post.image}
            alt="Post content"
            className="w-full object-cover max-h-[500px]"
          />
        </div>
      )}

      {/* Poll */}
      {post.poll && (
        <div className="px-4 pb-3 space-y-2">
          <p className="font-medium">{post.poll.question}</p>
          {post.poll.options.map((option) => {
            const totalVotes = post.poll!.options.reduce((sum, opt) => sum + opt.votes, 0);
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <button
                key={option.id}
                className="w-full rounded-lg border border-border p-3 text-left hover:bg-accent transition-colors relative overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  className="absolute inset-0 bg-primary/10"
                />
                <div className="relative flex justify-between items-center">
                  <span>{option.text}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(percentage)}%</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-2 ${isLiked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <motion.div whileTap={{ scale: 0.8 }}>
              <Heart className={`size-5 ${isLiked ? 'fill-current' : ''}`} />
            </motion.div>
            <span>{likes.toLocaleString()}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={onComment}>
            <MessageCircle className="size-5" />
            <span>{post.comments}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2" onClick={onShare}>
            <Share2 className="size-5" />
            <span>{post.shares}</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={isSaved ? 'text-primary' : ''}
          onClick={handleSave}
        >
          <Bookmark className={`size-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </Card>
  );
}
