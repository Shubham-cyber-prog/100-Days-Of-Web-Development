import { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Menu, X } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="px-4 md:px-12 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="text-[#E50914] text-2xl md:text-3xl" style={{ fontWeight: 700 }}>
            NETFLIX
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-white/90 hover:text-white transition-colors text-sm"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-black/80 border border-white px-3 py-1">
                <Search className="size-5 text-white" />
                <input 
                  type="text"
                  placeholder="Titles, people, genres"
                  className="ml-2 bg-transparent text-white text-sm outline-none w-48"
                  autoFocus
                  onBlur={() => setSearchOpen(false)}
                />
              </div>
            ) : (
              <button 
                onClick={() => setSearchOpen(true)}
                className="text-white hover:text-white/70 transition-colors"
              >
                <Search className="size-5" />
              </button>
            )}
          </div>

          {/* Notifications */}
          <button className="hidden md:block text-white hover:text-white/70 transition-colors">
            <Bell className="size-5" />
          </button>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center text-white text-sm">
              M
            </div>
            <ChevronDown className="size-4 text-white group-hover:rotate-180 transition-transform" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-white/10">
          <div className="px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a 
                key={link}
                href="#" 
                className="text-white text-lg py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded bg-[#E50914] flex items-center justify-center text-white">
                M
              </div>
              <span className="text-white">My Profile</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
