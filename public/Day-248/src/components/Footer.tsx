import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Facebook, 
  Youtube, 
  Instagram,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    "RTI Information",
    "Public Grievances", 
    "Parliament Questions",
    "Annual Reports",
    "Budget Documents",
    "Tender Information"
  ];

  const services = [
    "Passport Services",
    "Visa Information", 
    "Consular Services",
    "Emergency Services",
    "Trade Enquiries",
    "Cultural Programs"
  ];

  const missions = [
    "Find Indian Mission",
    "Diplomatic List",
    "Protocol Division",
    "Bilateral Relations",
    "Multilateral Relations",
    "Regional Organizations"
  ];

  const policies = [
    "Privacy Policy",
    "Terms of Use", 
    "Accessibility",
    "Copyright Policy",
    "Hyperlinking Policy",
    "Disclaimer"
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Organization info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">MEA</span>
              </div>
              <div>
                <h3 className="font-bold">Ministry of External Affairs</h3>
                <p className="text-sm text-primary-foreground/80">Government of India</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6">
              The Ministry of External Affairs is responsible for India's foreign relations and diplomatic missions worldwide, promoting India's interests and values globally.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">South Block, Raisina Hill, New Delhi - 110011</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+91-11-2301-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">info@mea.gov.in</span>
              </div>
            </div>

            {/* Social media */}
            <div className="flex space-x-3 mt-6">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Youtube className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent"
                >
                  {link}
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <div className="space-y-2">
              {services.map((service, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          {/* Diplomatic Relations */}
          <div>
            <h4 className="font-semibold mb-4">Diplomatic Relations</h4>
            <div className="space-y-2">
              {missions.map((mission, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent"
                >
                  {mission}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Government links */}
        <div className="mb-8">
          <h4 className="font-semibold mb-4">Related Government Websites</h4>
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start text-left h-auto p-3 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <div>
                <div className="font-medium">India.gov.in</div>
                <div className="text-xs text-primary-foreground/60">National Portal</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start text-left h-auto p-3 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <div>
                <div className="font-medium">PMO India</div>
                <div className="text-xs text-primary-foreground/60">Prime Minister's Office</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start text-left h-auto p-3 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <div>
                <div className="font-medium">Digital India</div>
                <div className="text-xs text-primary-foreground/60">Digital Transformation</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
            <Button variant="outline" className="justify-start text-left h-auto p-3 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              <div>
                <div className="font-medium">MyGov</div>
                <div className="text-xs text-primary-foreground/60">Citizen Engagement</div>
              </div>
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/80">
            {policies.map((policy, index) => (
              <Button
                key={index}
                variant="ghost"
                className="h-auto p-0 text-primary-foreground/80 hover:text-primary-foreground hover:bg-transparent"
              >
                {policy}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1692985300056-a021e5a5386d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGZsYWclMjB0cmljb2xvcnxlbnwxfHx8fDE3NTY0NjM3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Indian Flag"
              className="w-8 h-6 object-cover rounded"
            />
            <div className="text-sm text-primary-foreground/80">
              <div>© 2025 Ministry of External Affairs</div>
              <div>Government of India. All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}