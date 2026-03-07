import { Outlet, Link, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';
import { Home, Search, Bell, MessageCircle, User, Settings, LogOut, Plus, Image as ImageIcon, Smile, BarChart3, Calendar } from 'lucide-react';
import { currentUser } from '../lib/mockData';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function MainLayout() {
  const location = useLocation();
  const [unreadNotifications] = useState(2);
  const [unreadMessages] = useState(3);
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Explore', path: '/explore' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadNotifications },
    { icon: MessageCircle, label: 'Messages', path: '/messages', badge: unreadMessages },
    { icon: User, label: 'Profile', path: `/profile/${currentUser.username}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary" />
            <span className="font-bold text-xl hidden sm:inline">SocialHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`gap-2 relative ${isActive ? 'bg-primary hover:bg-primary/90' : ''}`}
                  >
                    <item.icon className="size-5" />
                    <span className="hidden lg:inline">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge className="absolute -top-1 -right-1 size-5 p-0 flex items-center justify-center text-xs bg-destructive">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Create Post Button */}
            <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 gap-2">
                  <Plus className="size-5" />
                  <span className="hidden sm:inline">Create</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                      <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentUser.name}</p>
                      <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
                    </div>
                  </div>
                  <Textarea
                    placeholder="What's on your mind?"
                    rows={6}
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <ImageIcon className="size-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Smile className="size-5" />
                      </Button>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setCreatePostOpen(false)}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <Avatar className="size-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="size-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{currentUser.name}</p>
                    <p className="text-sm text-muted-foreground truncate">@{currentUser.username}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={`/profile/${currentUser.username}`} className="cursor-pointer">
                    <User className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login" className="cursor-pointer text-destructive">
                    <LogOut className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="relative">
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative ${isActive ? 'text-primary' : ''}`}
                  >
                    <item.icon className="size-6" />
                    {item.badge && item.badge > 0 && (
                      <Badge className="absolute -top-1 -right-1 size-4 p-0 flex items-center justify-center text-[10px] bg-destructive">
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button (Mobile) */}
      <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
        <DialogTrigger asChild>
          <Button
            className="md:hidden fixed bottom-20 right-4 size-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-40"
            size="icon"
          >
            <Plus className="size-6" />
          </Button>
        </DialogTrigger>
      </Dialog>
    </div>
  );
}