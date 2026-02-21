import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Assignments } from './pages/Assignments';
import { Events } from './pages/Events';
import { Profile } from './pages/Profile';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Login,
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: 'dashboard',
        Component: Dashboard,
      },
      {
        path: 'attendance',
        Component: Attendance,
      },
      {
        path: 'assignments',
        Component: Assignments,
      },
      {
        path: 'events',
        Component: Events,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
]);
