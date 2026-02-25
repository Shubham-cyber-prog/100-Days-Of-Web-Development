import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onNavigate: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    'Home',
    'Book Train',
    'PNR Status',
    'Tourism',
    'Meals',
    'Help'
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={onNavigate}>
              <div className="w-12 h-12 rounded-full bg-[#0058A3] flex items-center justify-center">
                <span className="text-white font-bold text-lg">IR</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-[#0058A3]">IRCTC</h1>
                <p className="text-xs text-gray-600">Indian Railway</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  className="text-gray-700 hover:text-[#0058A3] transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#0058A3] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Dark mode toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="hidden sm:flex"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {/* Login/Signup - Desktop */}
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="ghost" className="text-[#0058A3]">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
                <Button className="bg-[#0058A3] hover:bg-[#004080] text-white">
                  Sign Up
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Mobile Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-[300px] sm:w-[400px] bg-white shadow-xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#0058A3] flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">IR</span>
                  </div>
                  <span className="font-bold text-[#0058A3]">IRCTC</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={toggleMobileMenu}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item}
                    className="text-left p-3 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-[#0058A3]"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </button>
                ))}
                
                {/* Dark Mode Toggle - Mobile */}
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center text-left p-3 hover:bg-gray-100 rounded-md transition-colors text-gray-700 hover:text-[#0058A3]"
                >
                  {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>

                {/* Auth Buttons */}
                <div className="pt-4 border-t space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full text-[#0058A3] justify-start"
                    onClick={toggleMobileMenu}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    className="w-full bg-[#0058A3] hover:bg-[#004080] text-white"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}