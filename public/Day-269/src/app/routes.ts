import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Attendance from './pages/Attendance';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import MarkAttendance from './pages/MarkAttendance';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'students', Component: Students },
      { path: 'classes', Component: Classes },
      { path: 'attendance', Component: Attendance },
      { path: 'reports', Component: Reports },
      { path: 'analytics', Component: Analytics },
      { path: 'settings', Component: Settings },
      { path: 'mark-attendance', Component: MarkAttendance },
    ],
  },
]);
