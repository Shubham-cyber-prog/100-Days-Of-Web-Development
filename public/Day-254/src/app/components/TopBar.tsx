import { Search, Bell, Settings } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search subscriptions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 ml-6">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5 text-gray-600" />
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <div className="font-medium text-gray-900">John Doe</div>
              <div className="text-gray-500">john@example.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
