import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, User, Phone, Info, Menu, X, Heart } from 'lucide-react';
import { useState } from 'react';
import { getFavorites } from '@/data/properties';

const navLinks = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/listings', label: 'Listings', icon: Building2 },
  { to: '/seller', label: 'Seller Dashboard', icon: User },
  { to: '/about', label: 'About', icon: Info },
  { to: '/contact', label: 'Contact', icon: Phone },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const favCount = getFavorites().length;

  return (
    <div className="min-h-screen flex flex-col font-body">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-foreground tracking-tight">
              Luxe<span className="text-accent">Estate</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/listings?favorites=true"
              className="ml-2 relative p-2 rounded-lg text-muted-foreground hover:text-accent transition-colors"
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-bold">
                  {favCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background animate-fade-in">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-display text-xl font-bold">LuxeEstate</span>
              </div>
              <p className="text-sm opacity-70 leading-relaxed">
                Your trusted partner in finding the perfect property. Premium real estate services since 2010.
              </p>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-70">
                {navLinks.map(l => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:opacity-100 transition-opacity">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Property Types</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>Houses</li>
                <li>Apartments</li>
                <li>Villas</li>
                <li>Penthouses</li>
                <li>Townhouses</li>
              </ul>
            </div>
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>info@luxeestate.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Real Estate Blvd</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-primary-foreground/10 text-sm opacity-50 text-center">
            © 2026 LuxeEstate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
