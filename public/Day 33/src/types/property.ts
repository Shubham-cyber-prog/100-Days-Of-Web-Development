export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  type: 'house' | 'apartment' | 'villa' | 'townhouse' | 'penthouse' | 'cottage';
  bedrooms: number;
  bathrooms: number;
  area: number; // sq ft
  description: string;
  features: string[];
  images: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  lat?: number;
  lng?: number;
  yearBuilt?: number;
  parking?: number;
}

export interface PropertyFilters {
  location: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
}
