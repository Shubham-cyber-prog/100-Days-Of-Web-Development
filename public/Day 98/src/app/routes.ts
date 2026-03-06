import { createBrowserRouter } from 'react-router';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Attendance } from './pages/Attendance';
import { Assignments } from './pages/Assignments';
import { Events } from './pages/Events';
import { Profile } from './pages/Profile';
import { Notifications } from './pages/Notifications';
import { Grades } from './pages/Grades';
import { Timetable } from './pages/Timetable';
import { Library } from './pages/Library';
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
        path: 'timetable',
        Component: Timetable,
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
        path: 'grades',
        Component: Grades,
      },
      {
        path: 'events',
        Component: Events,
      },
      {
        path: 'library',
        Component: Library,
      },
      {
        path: 'notifications',
        Component: Notifications,
      },
      {
        path: 'profile',
        Component: Profile,
      },
    ],
  },
]);