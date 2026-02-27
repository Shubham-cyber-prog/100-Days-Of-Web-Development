import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  CreditCard, 
  FileText, 
  Users, 
  Globe, 
  Building, 
  GraduationCap,
  ChevronRight,
  ExternalLink
} from "lucide-react";

export function QuickServices() {
  const services = [
    {
      icon: CreditCard,
      title: "Passport Services",
      description: "Apply for new passport, renewal, and related services",
      link: "#",
      highlight: true
    },
    {
      icon: FileText,
      title: "Visa Services",
      description: "Visa information and application procedures",
      link: "#"
    },
    {
      icon: Users,
      title: "Indian Diaspora",
      description: "Services for overseas Indian community",
      link: "#"
    },
    {
      icon: Globe,
      title: "Diplomatic Missions",
      description: "Find Indian embassies and consulates worldwide",
      link: "#"
    },
    {
      icon: Building,
      title: "Trade & Commerce",
      description: "Trade promotion and commercial services",
      link: "#"
    },
    {
      icon: GraduationCap,
      title: "Cultural Exchange",
      description: "Educational and cultural programs",
      link: "#"
    }
  ];

  const quickLinks = [
    "Emergency Travel Document",
    "Consular Fees",
    "Attestation Services",
    "Registration Services",
    "Grievance Portal",
    "Download Forms"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Services & Quick Links</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access essential consular and diplomatic services with ease
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  service.highlight ? 'border-primary shadow-md' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    service.highlight 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-secondary-foreground'
                  }`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button 
                    variant={service.highlight ? "default" : "outline"} 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Access Service
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Links Section */}
        <Card className="bg-secondary/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <span>Quick Links</span>
              <ExternalLink className="ml-2 h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-3 text-left hover:bg-white hover:shadow-sm"
                >
                  <ChevronRight className="mr-2 h-4 w-4 text-muted-foreground" />
                  {link}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}