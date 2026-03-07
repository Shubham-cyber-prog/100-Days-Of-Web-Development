import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { ReviewResults } from './pages/ReviewResults';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'upload', Component: Upload },
      { path: 'review/:id', Component: ReviewResults },
      { path: 'history', Component: History },
      { path: 'settings', Component: Settings },
    ],
  },
]);
