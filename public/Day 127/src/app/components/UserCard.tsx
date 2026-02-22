import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import type { User } from '../lib/mockData';

interface UserCardProps {
  user: User;
  showFollowButton?: boolean;
}

export function UserCard({ user, showFollowButton = true }: UserCardProps) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing || false);

  return (
    <div className="flex items-center justify-between p-3 hover:bg-accent/50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground truncate">{user.name}</span>
            {user.isVerified && (
              <Badge variant="secondary" className="h-4 px-1 text-xs bg-primary/10 text-primary border-0">
                ✓
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground truncate">@{user.username}</p>
        </div>
      </div>
      {showFollowButton && (
        <Button
          variant={isFollowing ? 'outline' : 'default'}
          size="sm"
          onClick={() => setIsFollowing(!isFollowing)}
          className={isFollowing ? '' : 'bg-primary hover:bg-primary/90'}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      )}
    </div>
  );
}
