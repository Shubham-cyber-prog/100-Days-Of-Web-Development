import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import DashboardLayout from "./pages/dashboard/layout";
import DashboardHome from "./pages/dashboard/home";
import ChatPage from "./pages/dashboard/chat";
import TasksPage from "./pages/dashboard/tasks";
import IntegrationsPage from "./pages/dashboard/integrations";
import AnalyticsPage from "./pages/dashboard/analytics";
import SettingsPage from "./pages/dashboard/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "chat", Component: ChatPage },
      { path: "tasks", Component: TasksPage },
      { path: "integrations", Component: IntegrationsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
