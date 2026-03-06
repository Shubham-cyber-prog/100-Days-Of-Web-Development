import { Search, Menu, Globe, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "./LanguageSwitcher";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  
  const mainNavItems = [
    { key: 'nav.home', label: t('nav.home'), route: 'home' },
    { key: 'nav.about', label: t('nav.about'), route: 'about' },
    { key: 'nav.foreign', label: t('nav.foreign'), route: 'foreign-relations' },
    { key: 'nav.consular', label: t('nav.consular'), route: 'consular-services' },
    { key: 'nav.diaspora', label: t('nav.diaspora'), route: 'home' },
    { key: 'nav.media', label: t('nav.media'), route: 'news' },
    { key: 'nav.tenders', label: t('nav.tenders'), route: 'home' },
    { key: 'nav.career', label: t('nav.career'), route: 'home' }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+91-11-2301-9999</span>
              </span>
              <span className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>info@mea.gov.in</span>
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              >
                <Globe className="h-4 w-4 mr-1" />
                {t('header.hindi')}
              </Button>
              <span className="text-sm">A+ | A | A-</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and title */}
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">MEA</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">{t('header.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('header.subtitle')}</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder={t('header.search')}
                className="w-64 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col space-y-4 mt-8">
                {mainNavItems.map((item) => (
                  <Button 
                    key={item.key} 
                    variant="ghost" 
                    className="justify-start"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        (window as any).setCurrentPage?.(item.route);
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-secondary border-t hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-1">
            {mainNavItems.map((item) => {
              return (
                <Button
                  key={item.key}
                  variant="ghost"
                  className="text-secondary-foreground hover:bg-secondary-foreground/10 px-4 py-3 rounded-none cursor-pointer"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      (window as any).setCurrentPage?.(item.route);
                    }
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}