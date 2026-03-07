import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  const footerLinks = [
    ['Audio Description', 'Help Center', 'Gift Cards', 'Media Center'],
    ['Investor Relations', 'Jobs', 'Terms of Use', 'Privacy'],
    ['Legal Notices', 'Cookie Preferences', 'Corporate Information', 'Contact Us']
  ];

  return (
    <footer className="bg-[#000000] text-gray-400 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Social Icons */}
        <div className="flex gap-6 mb-8">
          <a href="#" className="hover:text-white transition-colors">
            <Facebook className="size-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Instagram className="size-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Twitter className="size-6" />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <Youtube className="size-6" />
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {footerLinks.flat().map((link) => (
            <a 
              key={link}
              href="#" 
              className="text-sm hover:underline"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Service Code Button */}
        <button className="border border-gray-400 px-4 py-2 text-sm hover:text-white hover:border-white transition-colors mb-6">
          Service Code
        </button>

        {/* Copyright */}
        <p className="text-xs">
          © 1997-2026 Netflix, Inc.
        </p>
      </div>
    </footer>
  );
}
