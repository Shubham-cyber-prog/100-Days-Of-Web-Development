import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { CarCard } from './CarCard';
import { Car } from '../data/cars';

interface WishlistPageProps {
  cars: Car[];
  wishlist: string[];
  cart: string[];
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  onNavigate: (page: string) => void;
}

export function WishlistPage({ 
  cars, 
  wishlist, 
  cart,
  onViewDetails, 
  onToggleWishlist, 
  onAddToCart,
  onNavigate 
}: WishlistPageProps) {
  const wishlistCars = cars.filter(car => wishlist.includes(car.id));

  const addAllToCart = () => {
    wishlistCars.forEach(car => {
      if (!cart.includes(car.id)) {
        onAddToCart(car.id);
      }
    });
  };

  if (wishlistCars.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Save cars you love to your wishlist and keep track of your favorites.
          </p>
          <Button onClick={() => onNavigate('cars')}>
            Browse Cars
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlistCars.length} {wishlistCars.length === 1 ? 'car' : 'cars'} saved
          </p>
        </div>
        
        {wishlistCars.length > 0 && (
          <div className="flex gap-3">
            <Button variant="outline" onClick={addAllToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add All to Cart
            </Button>
            <Button onClick={() => onNavigate('cars')}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onViewDetails={onViewDetails}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
            isInWishlist={true}
            isInCart={cart.includes(car.id)}
          />
        ))}
      </div>
    </div>
  );
}