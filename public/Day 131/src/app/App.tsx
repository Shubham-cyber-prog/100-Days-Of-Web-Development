import { RouterProvider } from 'react-router';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { router } from './routes';

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}