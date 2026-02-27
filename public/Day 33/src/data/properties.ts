import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';
import type { Property } from '@/types/property';

export const defaultProperties: Property[] = [
  {
    id: '1',
    title: 'Oceanfront Modern Villa',
    price: 2450000,
    location: '142 Coastal Drive, Malibu',
    city: 'Malibu',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    description: 'Stunning oceanfront villa with panoramic Pacific views. This architectural masterpiece features floor-to-ceiling windows, an infinity pool, and a private beach access path. The open-concept living area seamlessly blends indoor and outdoor spaces.',
    features: ['Pool', 'Ocean View', 'Smart Home', 'Wine Cellar', 'Home Theater', 'Gym'],
    images: [property1, property1, property1],
    isFeatured: true,
    isNew: true,
    lat: 34.0259,
    lng: -118.7798,
    yearBuilt: 2022,
    parking: 3,
  },
  {
    id: '2',
    title: 'Historic Brownstone Residence',
    price: 1850000,
    location: '78 Beacon Hill, Boston',
    city: 'Boston',
    type: 'townhouse',
    bedrooms: 4,
    bathrooms: 3,
    area: 3100,
    description: 'Beautifully restored brownstone in the heart of Beacon Hill. Original architectural details blend with modern amenities. Features a private garden, chef\'s kitchen, and a rooftop terrace with city views.',
    features: ['Garden', 'Rooftop Terrace', 'Fireplace', 'Wine Storage', 'Central AC'],
    images: [property2, property2, property2],
    isFeatured: true,
    lat: 42.3588,
    lng: -71.0707,
    yearBuilt: 1890,
    parking: 1,
  },
  {
    id: '3',
    title: 'Downtown Luxury Condo',
    price: 890000,
    location: '500 Lake Shore Dr, Chicago',
    city: 'Chicago',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1450,
    description: 'Sleek modern condo in a premier downtown high-rise. Floor-to-ceiling windows offer breathtaking lake and skyline views. Building amenities include a rooftop pool, fitness center, and 24/7 concierge.',
    features: ['Lake View', 'Concierge', 'Rooftop Pool', 'Fitness Center', 'Parking'],
    images: [property3, property3, property3],
    isFeatured: true,
    isNew: true,
    lat: 41.8902,
    lng: -87.6154,
    yearBuilt: 2020,
    parking: 1,
  },
  {
    id: '4',
    title: 'Charming Suburban Cottage',
    price: 425000,
    location: '23 Maple Street, Hartford',
    city: 'Hartford',
    type: 'cottage',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    description: 'Delightful cottage on a tree-lined street with a beautifully landscaped yard. Updated kitchen, hardwood floors, and a sunlit reading nook. The perfect blend of charm and comfort in a family-friendly neighborhood.',
    features: ['Garden', 'Hardwood Floors', 'Updated Kitchen', 'Patio', 'Garage'],
    images: [property4, property4, property4],
    lat: 41.7658,
    lng: -72.6734,
    yearBuilt: 1955,
    parking: 2,
  },
  {
    id: '5',
    title: 'Manhattan Sky Penthouse',
    price: 5900000,
    location: '432 Park Avenue, New York',
    city: 'New York',
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 5,
    area: 5800,
    description: 'Ultra-luxury penthouse with 360-degree views of Manhattan. Double-height ceilings, private elevator, Gaggenau appliances, and a wraparound terrace. The pinnacle of New York City living.',
    features: ['City View', 'Private Elevator', 'Terrace', 'Smart Home', 'Spa Bath', 'Wine Room'],
    images: [property5, property5, property5],
    isFeatured: true,
    lat: 40.7614,
    lng: -73.9718,
    yearBuilt: 2023,
    parking: 2,
  },
  {
    id: '6',
    title: 'Mediterranean Estate',
    price: 1250000,
    location: '89 Olive Grove Rd, Santa Barbara',
    city: 'Santa Barbara',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 3400,
    description: 'Elegant Mediterranean-style home surrounded by olive trees and gardens. Terracotta tile, arched doorways, and a courtyard fountain create an authentic old-world atmosphere with all modern comforts.',
    features: ['Courtyard', 'Gardens', 'Pool', 'Fireplace', 'Wine Cellar', 'Guest House'],
    images: [property6, property6, property6],
    isNew: true,
    lat: 34.4208,
    lng: -119.6982,
    yearBuilt: 2005,
    parking: 3,
  },
];

// localStorage helpers
const FAVORITES_KEY = 'realestate_favorites';
const CUSTOM_PROPERTIES_KEY = 'realestate_custom_properties';

export function getFavorites(): string[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function toggleFavorite(id: string): string[] {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx > -1) favs.splice(idx, 1);
  else favs.push(id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return favs;
}

export function getCustomProperties(): Property[] {
  const stored = localStorage.getItem(CUSTOM_PROPERTIES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCustomProperty(property: Property): void {
  const props = getCustomProperties();
  props.push(property);
  localStorage.setItem(CUSTOM_PROPERTIES_KEY, JSON.stringify(props));
}

export function deleteCustomProperty(id: string): void {
  const props = getCustomProperties().filter(p => p.id !== id);
  localStorage.setItem(CUSTOM_PROPERTIES_KEY, JSON.stringify(props));
}

export function updateCustomProperty(updated: Property): void {
  const props = getCustomProperties().map(p => p.id === updated.id ? updated : p);
  localStorage.setItem(CUSTOM_PROPERTIES_KEY, JSON.stringify(props));
}

export function getAllProperties(): Property[] {
  return [...defaultProperties, ...getCustomProperties()];
}
