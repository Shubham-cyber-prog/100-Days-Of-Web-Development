import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SimulationProvider } from './contexts/SimulationContext';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    // Apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SimulationProvider>
      <RouterProvider router={router} />
    </SimulationProvider>
  );
}