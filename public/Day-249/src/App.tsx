import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { WishlistPage } from './components/WishlistPage';
import { CartPage } from './components/CartPage';
import { cars } from './data/cars';

type PageType = 'home' | 'cars' | 'wishlist' | 'cart' | 'product' | 'about' | 'contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
    setSelectedCarId(null);
  };

  const handleViewDetails = (carId: string) => {
    setSelectedCarId(carId);
    setCurrentPage('product');
  };

  const handleToggleWishlist = (carId: string) => {
    setWishlist(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleAddToCart = (carId: string) => {
    if (!cart.includes(carId)) {
      setCart(prev => [...prev, carId]);
    }
  };

  const handleRemoveFromCart = (carId: string) => {
    setCart(prev => prev.filter(id => id !== carId));
  };

  const handleGoBack = () => {
    setCurrentPage('home');
    setSelectedCarId(null);
  };

  const selectedCar = selectedCarId ? cars.find(car => car.id === selectedCarId) : null;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
      case 'cars':
        return (
          <HomePage
            cars={cars}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            cart={cart}
          />
        );
      
      case 'product':
        if (!selectedCar) {
          return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
              <h1 className="text-2xl font-bold">Car not found</h1>
              <button onClick={handleGoBack} className="text-primary hover:underline mt-4">
                Go back to home
              </button>
            </div>
          );
        }
        return (
          <ProductDetailPage
            car={selectedCar}
            onGoBack={handleGoBack}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            isInWishlist={wishlist.includes(selectedCar.id)}
            isInCart={cart.includes(selectedCar.id)}
          />
        );
      
      case 'wishlist':
        return (
          <WishlistPage
            cars={cars}
            wishlist={wishlist}
            cart={cart}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'cart':
        return (
          <CartPage
            cars={cars}
            cart={cart}
            onViewDetails={handleViewDetails}
            onRemoveFromCart={handleRemoveFromCart}
            onNavigate={handleNavigate}
          />
        );
      
      case 'about':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">About AutoLux</h1>
              <p className="text-lg text-muted-foreground mb-8">
                AutoLux has been the premier destination for luxury and performance vehicles for over 25 years. 
                We pride ourselves on offering only the finest selection of cars from the world's most prestigious brands.
              </p>
              <p className="text-muted-foreground">
                Our commitment to excellence extends beyond our inventory to our customer service, 
                ensuring every client receives the personalized attention they deserve when making such an important investment.
              </p>
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-semibold mb-2">Visit Our Showroom</h3>
                  <p className="text-muted-foreground mb-4">
                    123 Luxury Auto Boulevard<br />
                    Beverly Hills, CA 90210
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get In Touch</h3>
                  <p className="text-muted-foreground">
                    Phone: (555) 123-4567<br />
                    Email: info@autolux.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <HomePage
            cars={cars}
            onViewDetails={handleViewDetails}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
            wishlist={wishlist}
            cart={cart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onNavigate={handleNavigate}
        cartCount={cart.length}
        wishlistCount={wishlist.length}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}