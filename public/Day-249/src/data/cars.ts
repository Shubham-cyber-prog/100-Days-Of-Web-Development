export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  image: string;
  category: 'sedan' | 'suv' | 'sports' | 'luxury' | 'electric';
  mileage: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  description: string;
  features: string[];
  isFeatured: boolean;
  isLatest: boolean;
}

export const cars: Car[] = [
  {
    id: '1',
    brand: 'BMW',
    model: 'M4 Competition',
    year: 2024,
    price: 89950,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    category: 'sports',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'gasoline',
    description: 'The BMW M4 Competition delivers pure driving excitement with its twin-turbo inline-6 engine and track-focused engineering.',
    features: ['Twin-Turbo Engine', 'Carbon Fiber Roof', 'M Sport Suspension', 'Premium Sound System'],
    isFeatured: true,
    isLatest: true
  },
  {
    id: '2',
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    year: 2024,
    price: 112350,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
    category: 'luxury',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'gasoline',
    description: 'The pinnacle of luxury and innovation, the S-Class sets the standard for executive sedans worldwide.',
    features: ['Massage Seats', 'Air Suspension', 'Night Vision', 'Burmester Sound'],
    isFeatured: true,
    isLatest: true
  },
  {
    id: '3',
    brand: 'Tesla',
    model: 'Model S Plaid',
    year: 2024,
    price: 94990,
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    category: 'electric',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'electric',
    description: 'The fastest production sedan ever made, with tri-motor all-wheel drive and over 1000 horsepower.',
    features: ['Tri-Motor AWD', '1020hp', 'Autopilot', '17" Touchscreen'],
    isFeatured: true,
    isLatest: false
  },
  {
    id: '4',
    brand: 'Porsche',
    model: '911 Turbo S',
    year: 2024,
    price: 223500,
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    category: 'sports',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'gasoline',
    description: 'The ultimate 911, combining everyday usability with track-day performance.',
    features: ['Twin-Turbo Flat-6', 'AWD', 'Active Suspension', 'Sport Chrono Package'],
    isFeatured: false,
    isLatest: true
  },
  {
    id: '5',
    brand: 'Range Rover',
    model: 'Sport SVR',
    year: 2023,
    price: 124500,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=800&q=80',
    category: 'suv',
    mileage: 5000,
    transmission: 'automatic',
    fuelType: 'gasoline',
    description: 'The most powerful Range Rover Sport ever, with supercharged V8 performance and luxury comfort.',
    features: ['Supercharged V8', 'Terrain Response', 'Meridian Audio', 'Air Suspension'],
    isFeatured: false,
    isLatest: false
  },
  {
    id: '6',
    brand: 'Audi',
    model: 'RS6 Avant',
    year: 2024,
    price: 116500,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
    category: 'sports',
    mileage: 0,
    transmission: 'automatic',
    fuelType: 'gasoline',
    description: 'The perfect blend of wagon practicality and supercar performance with quattro all-wheel drive.',
    features: ['Twin-Turbo V8', 'Quattro AWD', 'Sport Differential', 'Virtual Cockpit'],
    isFeatured: false,
    isLatest: true
  }
];