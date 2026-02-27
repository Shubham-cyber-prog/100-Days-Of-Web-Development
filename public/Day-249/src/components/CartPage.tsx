import { Minus, Plus, ShoppingCart, Trash2, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartPageProps {
  cars: Car[];
  cart: string[];
  onViewDetails: (carId: string) => void;
  onRemoveFromCart: (carId: string) => void;
  onNavigate: (page: string) => void;
}

export function CartPage({ 
  cars, 
  cart, 
  onViewDetails, 
  onRemoveFromCart,
  onNavigate 
}: CartPageProps) {
  const cartCars = cars.filter(car => cart.includes(car.id));
  const totalPrice = cartCars.reduce((sum, car) => sum + car.price, 0);
  const salesTax = totalPrice * 0.08; // 8% sales tax
  const finalTotal = totalPrice + salesTax;

  if (cartCars.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Add some amazing cars to your cart and start your journey to luxury.
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
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartCars.map((car) => (
            <Card key={car.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-full sm:w-48 aspect-[4/3] overflow-hidden rounded-lg">
                    <ImageWithFallback
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
                        <p className="text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} miles</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveFromCart(car.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-muted-foreground capitalize">{car.category}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground capitalize">{car.fuelType}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Quantity:</span>
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 text-sm">1</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          ${car.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewDetails(car.id)}
                      >
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Schedule Test Drive
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartCars.length} {cartCars.length === 1 ? 'car' : 'cars'})</span>
                <span>${totalPrice.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Sales Tax (8%)</span>
                <span>${salesTax.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${finalTotal.toLocaleString()}</span>
              </div>

              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full" onClick={() => onNavigate('cars')}>
                Continue Shopping
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                Secure checkout with 256-bit SSL encryption
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-base">Financing Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                Get pre-approved for financing with rates as low as 2.9% APR
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Check Financing Options
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}