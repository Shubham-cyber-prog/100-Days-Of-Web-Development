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
  ExternalLink,
  AlertTriangle,
  Phone
} from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";

export function QuickServices() {
  const { t } = useLanguage();
  
  const services = [
    {
      icon: CreditCard,
      title: t('services.passport.title'),
      description: t('services.passport.desc'),
      link: "#",
      highlight: true
    },
    {
      icon: FileText,
      title: t('services.visa.title'),
      description: t('services.visa.desc'),
      link: "#"
    },
    {
      icon: AlertTriangle,
      title: t('services.travel.title'),
      description: t('services.travel.desc'),
      link: "travel-advisories",
      route: true
    },
    {
      icon: Globe,
      title: t('services.embassy.title'),
      description: t('services.embassy.desc'),
      link: "embassy-locator",
      route: true
    },
    {
      icon: Phone,
      title: t('services.emergency.title'),
      description: t('services.emergency.desc'),
      link: "#"
    },
    {
      icon: Users,
      title: t('services.oci.title'),
      description: t('services.oci.desc'),
      link: "#"
    }
  ];

  const quickLinks = [
    t('services.link1'),
    t('services.link2'),
    t('services.link3'),
    t('services.link4'),
    t('services.link5'),
    t('services.link6')
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('services.title')}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
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
                    onClick={() => {
                      if (service.route && typeof window !== 'undefined') {
                        (window as any).setCurrentPage?.(service.link);
                      }
                    }}
                  >
                    {t('services.access')}
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
              <span>{t('services.quicklinks')}</span>
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