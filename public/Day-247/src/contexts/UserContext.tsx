import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Booking, Passenger } from '../utils/mockData';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface SavedPassenger extends Passenger {
  id: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  savedPassengers: SavedPassenger[];
  addSavedPassenger: (passenger: Passenger) => void;
  removeSavedPassenger: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedPassengers, setSavedPassengers] = useState<SavedPassenger[]>([]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    if (email && password.length >= 6) {
      const mockUser: User = {
        id: '1',
        name: email.split('@')[0],
        email,
        phone: '9876543210',
      };
      setUser(mockUser);
      
      // Load mock bookings for demo
      const mockBookings: Booking[] = [
        {
          pnr: '1234567890',
          train: {
            number: '12301',
            name: 'Rajdhani Express',
            from: 'NDLS',
            to: 'HWH',
            departure: '16:55',
            arrival: '10:05',
            duration: '17h 10m',
            daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            classes: { AC1: { available: 45, price: 3500 } },
          },
          passengers: [
            { name: 'John Doe', age: 35, gender: 'Male', berth: 'Lower' },
            { name: 'Jane Doe', age: 32, gender: 'Female', berth: 'Upper' },
          ],
          status: 'CNF',
          bookingDate: '2026-02-15',
          journeyDate: '2026-03-15',
          totalAmount: 7350,
          class: 'AC1',
        },
      ];
      setBookings(mockBookings);
      
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, phone: string): Promise<boolean> => {
    // Mock signup
    if (name && email && password.length >= 6 && phone.length === 10) {
      const newUser: User = { id: Date.now().toString(), name, email, phone };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setBookings([]);
    setSavedPassengers([]);
  };

  const addBooking = (booking: Booking) => {
    setBookings([booking, ...bookings]);
  };

  const addSavedPassenger = (passenger: Passenger) => {
    const savedPassenger: SavedPassenger = {
      ...passenger,
      id: Date.now().toString(),
    };
    setSavedPassengers([...savedPassengers, savedPassenger]);
  };

  const removeSavedPassenger = (id: string) => {
    setSavedPassengers(savedPassengers.filter((p) => p.id !== id));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        signup,
        logout,
        bookings,
        addBooking,
        savedPassengers,
        addSavedPassenger,
        removeSavedPassenger,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
