import { Card } from '../components/ui/card';
import { TrendingUp } from 'lucide-react';
import { trendingHashtags } from '../lib/mockData';

export function TrendingSidebar() {
  return (
    <Card className="p-4 space-y-4 sticky top-20">
      <div className="flex items-center gap-2">
        <TrendingUp className="size-5 text-primary" />
        <h3 className="font-semibold">Trending Now</h3>
      </div>
      <div className="space-y-3">
        {trendingHashtags.map((item, index) => (
          <button
            key={index}
            className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors"
          >
            <p className="font-medium text-foreground">{item.tag}</p>
            <p className="text-sm text-muted-foreground">
              {item.posts.toLocaleString()} posts
            </p>
          </button>
        ))}
      </div>
    </Card>
  );
}
