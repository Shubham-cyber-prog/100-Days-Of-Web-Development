import { FileText, MoreVertical, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useNavigate } from 'react-router';

interface DocumentCardProps {
  id: string;
  title: string;
  lastEdited: string;
  owner: {
    name: string;
    avatar?: string;
    initials: string;
  };
  isStarred?: boolean;
  viewMode: 'grid' | 'list';
}

export function DocumentCard({ id, title, lastEdited, owner, isStarred, viewMode }: DocumentCardProps) {
  const navigate = useNavigate();

  const handleOpenDocument = () => {
    navigate(`/document/${id}`);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleOpenDocument}
        className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer group transition-colors"
      >
        <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">{title}</h3>
          <p className="text-sm text-gray-500 truncate">{lastEdited}</p>
        </div>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={owner.avatar} />
          <AvatarFallback className="text-xs">{owner.initials}</AvatarFallback>
        </Avatar>
        {isStarred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="opacity-0 group-hover:opacity-100"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Open</DropdownMenuItem>
            <DropdownMenuItem>Share</DropdownMenuItem>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Star</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div 
      onClick={handleOpenDocument}
      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    >
      <div className="aspect-[4/3] bg-white border-b border-gray-200 flex items-center justify-center relative">
        <FileText className="w-16 h-16 text-blue-600 opacity-20" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 bg-white shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Open</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Star</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {isStarred && (
          <div className="absolute top-2 left-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium truncate mb-1">{title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Avatar className="w-5 h-5">
            <AvatarImage src={owner.avatar} />
            <AvatarFallback className="text-xs">{owner.initials}</AvatarFallback>
          </Avatar>
          <span className="truncate">{lastEdited}</span>
        </div>
      </div>
    </div>
  );
}