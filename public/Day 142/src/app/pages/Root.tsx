import { Outlet } from 'react-router';
import { Toaster } from '../components/ui/sonner';

export function Root() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}
