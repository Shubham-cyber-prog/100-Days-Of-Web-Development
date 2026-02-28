import { useState } from 'react';
import { ArrowLeft, Heart, Share2, Car as CarIcon, Fuel, Gauge, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Car } from '../data/cars';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  car: Car;
  onGoBack: () => void;
  onToggleWishlist: (carId: string) => void;
  onAddToCart: (carId: string) => void;
  isInWishlist: boolean;
  isInCart: boolean;
}

export function ProductDetailPage({ 
  car, 
  onGoBack, 
  onToggleWishlist, 
  onAddToCart, 
  isInWishlist,
  isInCart 
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Mock additional images - in a real app, these would come from the car data
  const images = [
    car.image,
    'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={onGoBack} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Cars
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden rounded-lg">
            <ImageWithFallback
              src={images[selectedImage]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-[4/3] overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`${car.brand} ${car.model} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-3xl font-bold">{car.brand} {car.model}</h1>
                <p className="text-muted-foreground text-lg">{car.year} Model</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleWishlist(car.id)}
                >
                  <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              {car.isFeatured && <Badge variant="destructive">Featured</Badge>}
              {car.isLatest && <Badge variant="secondary">New</Badge>}
              <Badge variant="outline" className="capitalize">{car.category}</Badge>
            </div>

            <div className="text-3xl font-bold text-primary mb-6">
              ${car.price.toLocaleString()}
            </div>
          </div>

          {/* Key Specs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CarIcon className="h-5 w-5" />
                Key Specifications
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold">{car.mileage.toLocaleString()} miles</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold capitalize">{car.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold capitalize">{car.fuelType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CarIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Category</p>
                  <p className="font-semibold capitalize">{car.category}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{car.description}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {car.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              className="flex-1" 
              size="lg"
              onClick={() => onAddToCart(car.id)}
              disabled={isInCart}
            >
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <Button variant="outline" size="lg">
              Schedule Test Drive
            </Button>
          </div>

          {/* Contact Info */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Speak with one of our automotive specialists
              </p>
              <p className="font-semibold text-primary">(555) 123-4567</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}