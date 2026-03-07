import { Link } from 'react-router';
import { Search, Bell, Plus, GitBranch } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { currentUser } from '../data/mockData';
import { useState } from 'react';
import CreateRepositoryModal from './CreateRepositoryModal';
import { useNavigate } from 'react-router';

export default function Navbar() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="flex items-center gap-4 px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mr-4">
            <GitBranch className="w-8 h-8" />
            <span className="font-semibold text-lg">GitHub Clone</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search repositories, users, files..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm hover:text-gray-600">
              Dashboard
            </Link>
            <Link to="/" className="text-sm hover:text-gray-600">
              Repositories
            </Link>
            <Link to="/" className="text-sm hover:text-gray-600">
              Explore
            </Link>
          </nav>

          <div className="flex-1" />

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>

            {/* Create Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Plus className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setIsCreateModalOpen(true)}>
                  New repository
                </DropdownMenuItem>
                <DropdownMenuItem>New issue</DropdownMenuItem>
                <DropdownMenuItem>New project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate(`/${currentUser.username}`)}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>Your repositories</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <CreateRepositoryModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </>
  );
}