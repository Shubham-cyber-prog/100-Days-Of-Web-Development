import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/login";
import DashboardLayout from "./layouts/dashboard-layout";
import Dashboard from "./pages/dashboard";
import ModerationQueue from "./pages/moderation-queue";
import AIInsights from "./pages/ai-insights";
import Settings from "./pages/settings";
import EmptyStates from "./pages/empty-states";
import Components from "./pages/components";
import Guide from "./pages/guide";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "queue", Component: ModerationQueue },
      { path: "insights", Component: AIInsights },
      { path: "settings", Component: Settings },
      { path: "guide", Component: Guide },
      { path: "components", Component: Components },
      { path: "empty-states", Component: EmptyStates },
    ],
  },
  {
    path: "*",
    Component: () => {
      // Redirect to login for any undefined routes
      window.location.href = "/login";
      return null;
    },
  },
]);