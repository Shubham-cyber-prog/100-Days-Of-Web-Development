import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Repository from './pages/Repository';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: ':owner/:repo', Component: Repository },
      { path: ':username', Component: Profile },
      { path: '*', Component: NotFound },
    ],
  },
]);
