import { RouterProvider } from 'react-router';
import { router } from './routes';
import { TurfProvider } from './context/TurfContext';

export default function App() {
  return (
    <TurfProvider>
      <RouterProvider router={router} />
    </TurfProvider>
  );
}