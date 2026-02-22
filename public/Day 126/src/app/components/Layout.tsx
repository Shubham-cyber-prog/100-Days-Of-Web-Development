import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Code2, LayoutDashboard, History, Settings, Search, User, Upload, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useIsMobile } from './ui/use-mobile';

export function Layout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upload', label: 'Upload Code', icon: Upload },
    { path: '/history', label: 'History', icon: History },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Code2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold leading-none">CodeReview AI</h1>
                <p className="text-xs text-muted-foreground">Intelligent Analysis</p>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center px-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search files, issues, or reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border/50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Moon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar">
            <nav className="flex flex-col gap-2 p-4">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-3 ${
                          isActive 
                            ? 'bg-primary text-primary-foreground' 
                            : 'text-sidebar-foreground hover:bg-sidebar-accent'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {item.label}
                      </Button>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* AI Status Indicator */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                  <span className="text-sm text-primary">AI Model Active</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  GPT-4 Powered Analysis
                </p>
              </div>
            </div>
          </aside>
        )}

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobile && isMobileMenuOpen && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-sidebar"
            >
              <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant={isActive ? 'default' : 'ghost'}
                          className={`w-full justify-start gap-3 ${
                            isActive 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-sidebar-foreground hover:bg-sidebar-accent'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                        </Button>
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>

              {/* AI Status Indicator */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                    <span className="text-sm text-primary">AI Model Active</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    GPT-4 Powered Analysis
                  </p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Overlay for mobile menu */}
        {isMobile && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-16 z-30 bg-background/80 backdrop-blur-sm"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}