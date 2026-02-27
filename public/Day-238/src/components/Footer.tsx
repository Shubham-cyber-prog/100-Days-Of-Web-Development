import { Gift, Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <span className="text-lg font-medium">GiftHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for thoughtful gifts that create lasting memories.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                About Us
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Gift Guide
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Custom Orders
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Track Order
              </Button>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-medium">Customer Service</h3>
            <div className="space-y-2 text-sm">
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Shipping Info
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Returns & Exchanges
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                Size Guide
              </Button>
              <Button variant="link" className="p-0 h-auto text-muted-foreground">
                FAQ
              </Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-medium">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get exclusive offers and gift ideas delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="text-sm" />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>123 Gift Street, Present City</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>(555) 123-GIFT</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              <span>hello@gifthub.com</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
            <span>for gift lovers</span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          © 2025 GiftHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}