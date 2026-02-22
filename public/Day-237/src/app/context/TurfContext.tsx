import { createContext, useContext, useState, ReactNode } from "react";

export interface Turf {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  sports: string[];
  covered: boolean;
  amenities: string[];
  description?: string;
  maxPlayers?: number;
  qrCode?: string;
  // For Player Dashboard
  distance?: number;
  rating?: number;
  reviews?: number;
  open24x7?: boolean;
  hasOffer?: boolean;
  isOpen?: boolean;
  lat?: number;
  lng?: number;
  // For Owner Dashboard
  totalBookings?: number;
  status?: string;
}

interface TurfContextType {
  turfs: Turf[];
  addTurf: (turf: Omit<Turf, "id">) => void;
  updateTurf: (id: number, turf: Partial<Turf>) => void;
  deleteTurf: (id: number) => void;
}

const TurfContext = createContext<TurfContextType | undefined>(undefined);

const initialTurfs: Turf[] = [
  {
    id: 1,
    name: "Green Valley Sports Arena",
    location: "Koramangala, Bangalore",
    distance: 2.3,
    image: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
    price: 1500,
    sports: ["Cricket", "Football"],
    rating: 4.8,
    reviews: 124,
    covered: true,
    open24x7: false,
    hasOffer: true,
    amenities: ["Parking", "Washroom", "Cafeteria"],
    isOpen: true,
    lat: 12.9352,
    lng: 77.6245,
    totalBookings: 45,
    status: "Active",
  },
  {
    id: 2,
    name: "Champions Cricket Ground",
    location: "Indiranagar, Bangalore",
    distance: 3.5,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800",
    price: 2000,
    sports: ["Cricket"],
    rating: 4.6,
    reviews: 89,
    covered: false,
    open24x7: true,
    hasOffer: false,
    amenities: ["Parking", "Washroom"],
    isOpen: true,
    lat: 12.9716,
    lng: 77.6412,
    totalBookings: 32,
    status: "Active",
  },
  {
    id: 3,
    name: "Elite Football Turf",
    location: "HSR Layout, Bangalore",
    distance: 1.8,
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    price: 1200,
    sports: ["Football", "Pickleball"],
    rating: 4.9,
    reviews: 203,
    covered: true,
    open24x7: true,
    hasOffer: true,
    amenities: ["Parking", "Washroom", "Cafeteria", "Changing Room"],
    isOpen: true,
    lat: 12.9121,
    lng: 77.6446,
    totalBookings: 58,
    status: "Active",
  },
  {
    id: 4,
    name: "Victory Multi-Sport Complex",
    location: "Whitefield, Bangalore",
    distance: 5.2,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    price: 1800,
    sports: ["Cricket", "Football", "Badminton"],
    rating: 4.7,
    reviews: 156,
    covered: false,
    open24x7: false,
    hasOffer: false,
    amenities: ["Parking", "Washroom", "Cafeteria"],
    isOpen: true,
    lat: 12.9698,
    lng: 77.7499,
    totalBookings: 0,
    status: "Active",
  },
  {
    id: 5,
    name: "Sunrise Sports Hub",
    location: "Marathahalli, Bangalore",
    distance: 4.1,
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800",
    price: 1600,
    sports: ["Football", "Cricket"],
    rating: 4.5,
    reviews: 92,
    covered: true,
    open24x7: false,
    hasOffer: true,
    amenities: ["Parking", "Washroom"],
    isOpen: false,
    lat: 12.9591,
    lng: 77.6974,
    totalBookings: 0,
    status: "Active",
  },
  {
    id: 6,
    name: "Thunder Pickleball Arena",
    location: "Jayanagar, Bangalore",
    distance: 3.0,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800",
    price: 1000,
    sports: ["Pickleball", "Badminton"],
    rating: 4.8,
    reviews: 78,
    covered: true,
    open24x7: true,
    hasOffer: false,
    amenities: ["Parking", "Washroom", "Changing Room"],
    isOpen: true,
    lat: 12.925,
    lng: 77.5838,
    totalBookings: 0,
    status: "Active",
  },
];

export function TurfProvider({ children }: { children: ReactNode }) {
  const [turfs, setTurfs] = useState<Turf[]>(initialTurfs);

  const addTurf = (newTurf: Omit<Turf, "id">) => {
    const id = Math.max(...turfs.map((t) => t.id), 0) + 1;
    const turfWithDefaults: Turf = {
      ...newTurf,
      id,
      // Set defaults for player dashboard
      distance: 0,
      rating: 0,
      reviews: 0,
      open24x7: false,
      hasOffer: false,
      isOpen: true,
      lat: 12.9716, // Default Bangalore coordinates
      lng: 77.5946,
      // Set defaults for owner dashboard
      totalBookings: 0,
      status: "Active",
    };
    setTurfs((prev) => [...prev, turfWithDefaults]);
  };

  const updateTurf = (id: number, updatedTurf: Partial<Turf>) => {
    setTurfs((prev) =>
      prev.map((turf) => (turf.id === id ? { ...turf, ...updatedTurf } : turf))
    );
  };

  const deleteTurf = (id: number) => {
    setTurfs((prev) => prev.filter((turf) => turf.id !== id));
  };

  return (
    <TurfContext.Provider value={{ turfs, addTurf, updateTurf, deleteTurf }}>
      {children}
    </TurfContext.Provider>
  );
}

export function useTurfs() {
  const context = useContext(TurfContext);
  if (context === undefined) {
    throw new Error("useTurfs must be used within a TurfProvider");
  }
  return context;
}
