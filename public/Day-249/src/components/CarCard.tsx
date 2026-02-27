import { Heart, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CarCardProps {
  car: Car;
  onViewDetails: (carId: string) => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  isInWishlist: boolean;
  isInCart: boolean;
}

export function CarCard({ 
  car, 
  onViewDetails, 
  onToggleWishlist, 
  onAddToCart, 
  isInWishlist,
  isInCart 
}: CarCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <ImageWithFallback
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {car.isFeatured && (
            <Badge variant="destructive">Featured</Badge>
          )}
          {car.isLatest && (
            <Badge variant="secondary">New</Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => onToggleWishlist(car.id)}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => onViewDetails(car.id)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg">{car.brand} {car.model}</h3>
          <p className="text-muted-foreground">{car.year} • {car.mileage.toLocaleString()} miles</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary">
            ${car.price.toLocaleString()}
          </span>
          <Badge variant="outline" className="capitalize">
            {car.category}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails(car.id)}
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onAddToCart(car.id)}
            disabled={isInCart}
          >
            {isInCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}