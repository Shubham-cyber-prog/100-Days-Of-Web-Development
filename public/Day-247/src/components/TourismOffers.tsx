import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Star, MapPin, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useRef } from 'react';

export function TourismOffers() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const offers = [
    {
      title: 'Kashmir Package',
      subtitle: 'Heaven on Earth',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹15,999',
      originalPrice: '₹19,999',
      duration: '7 Days 6 Nights',
      rating: 4.8,
      badge: 'Summer Special'
    },
    {
      title: 'Goa Beach Holiday',
      subtitle: 'Tropical Paradise',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹12,499',
      originalPrice: '₹16,999',
      duration: '5 Days 4 Nights',
      rating: 4.6,
      badge: 'Best Seller'
    },
    {
      title: 'Rajasthan Royal',
      subtitle: 'Land of Kings',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹18,999',
      originalPrice: '₹24,999',
      duration: '8 Days 7 Nights',
      rating: 4.9,
      badge: 'Premium'
    },
    {
      title: 'Kerala Backwaters',
      subtitle: 'God\'s Own Country',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹14,999',
      originalPrice: '₹19,999',
      duration: '6 Days 5 Nights',
      rating: 4.7,
      badge: 'Trending'
    },
    {
      title: 'Himachal Adventure',
      subtitle: 'Mountain Calling',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹11,999',
      originalPrice: '₹15,999',
      duration: '5 Days 4 Nights',
      rating: 4.5,
      badge: 'Adventure'
    }
  ];

  const specialTrains = [
    {
      title: 'Palace on Wheels',
      subtitle: 'Luxury Train Experience',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹3,50,000',
      duration: '8 Days Journey',
      route: 'Delhi - Rajasthan Circuit'
    },
    {
      title: 'Maharajas Express',
      subtitle: 'Royal Indian Experience',
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹4,50,000',
      duration: '7 Days Journey',
      route: 'Mumbai - Delhi Circuit'
    },
    {
      title: 'Deccan Odyssey',
      subtitle: 'Maharashtra Pride',
      image: 'https://images.unsplash.com/photo-1572238496115-1c37999736a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      price: '₹2,75,000',
      duration: '8 Days Journey',
      route: 'Mumbai - Goa Circuit'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Tourism Packages */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Tourism Packages</h2>
              <p className="text-gray-600">Discover incredible destinations with our curated packages</p>
            </div>
            <div className="hidden md:flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('left')}
                className="rounded-full p-2"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scroll('right')}
                className="rounded-full p-2"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
          >
            {offers.map((offer, index) => (
              <Card key={index} className="flex-shrink-0 w-80 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="relative">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#fd7e14] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {offer.badge}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 rounded-full px-2 py-1 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                    <span className="text-sm font-medium">{offer.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-1">{offer.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{offer.subtitle}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{offer.duration}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-[#0058A3]">{offer.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{offer.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-[#0058A3] hover:bg-[#004080]">
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Trains */}
        <div>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Luxury Special Trains</h2>
            <p className="text-gray-600">Experience India in royal comfort</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specialTrains.map((train, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="relative">
                  <ImageWithFallback
                    src={train.image}
                    alt={train.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{train.title}</h3>
                    <p className="text-sm opacity-90">{train.subtitle}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{train.route}</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{train.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#0058A3]">{train.price}</span>
                    <Button size="sm" variant="outline" className="border-[#0058A3] text-[#0058A3] hover:bg-[#0058A3] hover:text-white">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}