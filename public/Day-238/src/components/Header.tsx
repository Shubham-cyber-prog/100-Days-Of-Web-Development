import { Search, ShoppingCart, Gift, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Gifts' },
  { id: 'birthday', name: 'Birthday' },
  { id: 'anniversary', name: 'Anniversary' },
  { id: 'holiday', name: 'Holiday' },
  { id: 'personalized', name: 'Personalized' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'home', name: 'Home & Decor' },
];

export function Header({ cartItemCount, onCartClick, searchQuery, onSearchChange, selectedCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Gift className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-medium">GiftHub</h1>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex items-center relative flex-1 max-w-md mx-8">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for gifts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for gifts..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "ghost"}
                        onClick={() => onCategoryChange(category.id)}
                        className="justify-start"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories - hidden on mobile */}
        <nav className="hidden md:block border-t py-3">
          <div className="flex gap-6">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </nav>

        {/* Mobile search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for gifts..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </header>
  );
}