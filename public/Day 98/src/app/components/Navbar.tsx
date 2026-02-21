import { Bell, User } from 'lucide-react';
import { Badge } from './ui/badge';

export function Navbar() {
  return (
    <header className="bg-white border-b border-border px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-secondary">Welcome back, Student!</h2>
          <p className="text-sm text-muted-foreground">Saturday, February 21, 2026</p>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-muted rounded-xl transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <Badge className="absolute -top-1 -right-1 bg-accent hover:bg-accent px-1.5 py-0 h-5 min-w-5 flex items-center justify-center">
              3
            </Badge>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
