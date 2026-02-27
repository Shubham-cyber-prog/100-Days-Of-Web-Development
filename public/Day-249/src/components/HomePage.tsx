import { ArrowRight, Star, Shield, Headphones, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { CarCard } from './CarCard';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  cars: Car[];
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  onNavigate: (page: string) => void;
  wishlist: string[];
  cart: string[];
}

export function HomePage({ 
  cars, 
  onViewDetails, 
  onToggleWishlist, 
  onAddToCart, 
  onNavigate,
  wishlist,
  cart 
}: HomePageProps) {
  const featuredCars = cars.filter(car => car.isFeatured);
  const latestCars = cars.filter(car => car.isLatest);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury car showroom"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Drive Your Dreams
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Discover the finest collection of luxury and performance vehicles
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onNavigate('cars')}>
              Browse Cars
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose AutoLux?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide premium automotive experiences with unmatched service and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">Only the finest vehicles from trusted brands</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Warranty Protection</h3>
                <p className="text-muted-foreground">Comprehensive coverage for peace of mind</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Headphones className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Support</h3>
                <p className="text-muted-foreground">24/7 customer service from car specialists</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Award Winning</h3>
                <p className="text-muted-foreground">Recognized for excellence in automotive retail</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Cars</h2>
              <p className="text-muted-foreground">Hand-picked premium vehicles</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('cars')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                isInWishlist={wishlist.includes(car.id)}
                isInCart={cart.includes(car.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Models Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest Models</h2>
              <p className="text-muted-foreground">The newest additions to our showroom</p>
            </div>
            <Button variant="outline" onClick={() => onNavigate('cars')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={onViewDetails}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                isInWishlist={wishlist.includes(car.id)}
                isInCart={cart.includes(car.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}