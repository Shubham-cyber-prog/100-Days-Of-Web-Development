import { Car, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">AutoLux</span>
            </div>
            <p className="text-primary-foreground/80 mb-4 max-w-md">
              Your premier destination for luxury and performance vehicles. We offer the finest selection 
              of cars from the world's most prestigious brands.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-primary-foreground/80" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-primary-foreground/80" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-primary-foreground/80" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-primary-foreground/80" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Our Cars</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Financing</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Trade-In</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Service</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>123 Luxury Auto Boulevard</li>
              <li>Beverly Hills, CA 90210</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@autolux.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/80">
          <p>&copy; 2024 AutoLux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}