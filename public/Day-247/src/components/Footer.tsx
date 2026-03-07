import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle,
  Send
} from 'lucide-react';

export function Footer() {
  const footerLinks = {
    'Quick Links': [
      'Book Train Tickets',
      'PNR Status',
      'Train Schedule',
      'Seat Availability',
      'Cancel Ticket',
      'E-Catering'
    ],
    'Tourism': [
      'Tour Packages',
      'Special Trains',
      'Hill Stations',
      'Beach Destinations',
      'Heritage Sites',
      'Adventure Tours'
    ],
    'Information': [
      'Fare Calculator',
      'Refund Rules',
      'Booking Guidelines',
      'Payment Options',
      'Mobile App',
      'Travel Insurance'
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'Live Chat',
      'Email Support',
      'Feedback',
      'Report Issue'
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', name: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Instagram, href: '#', name: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', name: 'YouTube', color: 'hover:text-red-600' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl font-semibold mb-3">Stay Updated with IRCTC</h3>
            <p className="text-gray-400 mb-6">
              Get the latest offers, travel deals, and important updates directly in your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button className="bg-[#0058A3] hover:bg-[#004080] px-6">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#0058A3] flex items-center justify-center">
                <span className="text-white font-bold text-lg">IR</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">IRCTC</h3>
                <p className="text-sm text-gray-400">Indian Railway Catering and Tourism Corporation</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              India's largest e-commerce website for railway reservations. Book your train tickets 
              with confidence and travel across the beautiful landscapes of India.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Helpline: 139 / 0755-6661122</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">support@irctc.co.in</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  11th Floor, Statesman House,<br />
                  Connaught Place, New Delhi - 110001
                </span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media & Legal */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-400">Follow us:</p>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: IconComponent, href, name, color }) => (
                  <a
                    key={name}
                    href={href}
                    className={`text-gray-400 ${color} transition-colors duration-200`}
                    aria-label={name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 Indian Railway Catering and Tourism Corporation Ltd. All rights reserved.
            </p>
            
            {/* Chatbot Access */}
            <Button 
              variant="outline" 
              size="sm" 
              className="border-gray-700 text-gray-400 hover:text-white hover:border-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat Support
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}