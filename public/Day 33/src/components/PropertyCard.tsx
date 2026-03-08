import { Heart, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Property } from '@/types/property';
import { getFavorites, toggleFavorite } from '@/data/properties';
import { useState } from 'react';

interface Props {
  property: Property;
  onFavoriteChange?: () => void;
}

export default function PropertyCard({ property, onFavoriteChange }: Props) {
  const [isFav, setIsFav] = useState(getFavorites().includes(property.id));

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(property.id);
    setIsFav(!isFav);
    onFavoriteChange?.();
  };

  return (
    <Link
      to={`/property/${property.id}`}
      className="group block rounded-xl overflow-hidden bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleFav}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-background"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${isFav ? 'fill-accent text-accent' : 'text-foreground'}`}
          />
        </button>
        {property.isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
            New
          </span>
        )}
        {property.isFeatured && !property.isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight group-hover:text-accent transition-colors">
            {property.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.location}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" /> {property.area.toLocaleString()} sqft
          </span>
        </div>
        <div className="pt-3 border-t border-border">
          <span className="font-display text-xl font-bold text-accent">
            ${property.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
