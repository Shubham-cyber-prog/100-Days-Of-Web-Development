import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import type { Story } from '../lib/mockData';

interface StoryCircleProps {
  story: Story;
  onClick?: () => void;
}

export function StoryCircle({ story, onClick }: StoryCircleProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 flex-shrink-0 group"
    >
      <div className={`relative ${!story.isViewed ? 'p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500' : 'p-[2px] bg-border'} rounded-full`}>
        <div className="bg-background p-[3px] rounded-full">
          <Avatar className="size-16 border-2 border-background">
            <AvatarImage src={story.user.avatar} alt={story.user.name} />
            <AvatarFallback>{story.user.name[0]}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <span className="text-xs text-foreground max-w-[70px] truncate">
        {story.user.username}
      </span>
    </button>
  );
}
