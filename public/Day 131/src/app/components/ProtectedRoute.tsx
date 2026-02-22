import { Navigate, Outlet } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/api';
import { Layout } from './Layout';

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      // If no token or not authenticated, skip validation and redirect
      if (!accessToken || !isAuthenticated) {
        setIsValidating(false);
        clearAuth();
        return;
      }

      // Only validate if we have a token
      try {
        const user = await authService.getCurrentUser(accessToken);
        setAuth(user, accessToken);
      } catch (error) {
        // Only log if it's not a 401 (which is expected for invalid tokens)
        if (error instanceof Error && !error.message.includes('401')) {
          console.error('Session validation error:', error);
        }
        clearAuth();
      } finally {
        setIsValidating(false);
      }
    };

    validateSession();
  }, []);

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}