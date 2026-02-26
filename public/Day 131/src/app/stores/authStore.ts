import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, accessToken: string) => void;
  clearAuth: () => void;
}

// Default demo user for direct access without login
const defaultUser: User = {
  id: 'demo-user-123',
  email: 'demo@crm.com',
  name: 'Demo User',
  role: 'admin',
  createdAt: new Date().toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: defaultUser,
      accessToken: 'demo-token',
      isAuthenticated: true,
      setAuth: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: defaultUser, accessToken: 'demo-token', isAuthenticated: true }),
    }),
    {
      name: 'crm-auth-storage',
    }
  )
);