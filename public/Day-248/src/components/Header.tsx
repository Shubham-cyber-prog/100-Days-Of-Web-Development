import { Search, Menu, Globe, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Header() {
  const mainNavItems = [
    "Home",
    "About MEA",
    "Foreign Relations",
    "Consular Services", 
    "Indian Diaspora",
    "Media Center",
    "Tenders",
    "Career"
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
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Globe className="h-4 w-4 mr-1" />
                हिंदी
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
              <h1 className="text-xl font-bold text-primary">Ministry of External Affairs</h1>
              <p className="text-sm text-muted-foreground">Government of India</p>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Input
                placeholder="Search..."
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
                  <Button key={item} variant="ghost" className="justify-start">
                    {item}
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
              const getPageRoute = (navItem: string) => {
                switch (navItem) {
                  case 'About MEA':
                    return 'about';
                  case 'Foreign Relations':
                    return 'foreign-relations';
                  case 'Consular Services':
                    return 'consular-services';
                  case 'Media Center':
                    return 'news';
                  default:
                    return 'home';
                }
              };

              return (
                <Button
                  key={item}
                  variant="ghost"
                  className="text-secondary-foreground hover:bg-secondary-foreground/10 px-4 py-3 rounded-none cursor-pointer"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      (window as any).setCurrentPage?.(getPageRoute(item));
                    }
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}