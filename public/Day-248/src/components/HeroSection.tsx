import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronRight, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "./LanguageSwitcher";

export function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <section className="bg-gradient-to-r from-blue-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Hero content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                {t('hero.announcement')}
              </Badge>
              <h2 className="text-4xl font-bold text-primary leading-tight">
                {t('hero.welcome')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('hero.description')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                {t('nav.consular')}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                {t('news.viewall')}
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">190+</div>
                <div className="text-sm text-muted-foreground">{t('stats.missions')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">32M+</div>
                <div className="text-sm text-muted-foreground">{t('stats.diaspora')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">{t('stats.countries')}</div>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1647326520048-21dc3f07a9f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGdvdmVybm1lbnQlMjBidWlsZGluZyUyMHBhcmxpYW1lbnR8ZW58MXx8fHwxNzU2NDYzNzk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Indian Parliament Building"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            
            {/* Floating announcement card */}
            <Card className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{t('hero.announcement1')}</h4>
                    <p className="text-sm text-muted-foreground">{t('hero.announcement2')}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Jan 15-20, 2025
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Singapore, Thailand
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}