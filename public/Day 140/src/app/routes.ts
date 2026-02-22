import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import EmailGeneratorPage from "./pages/EmailGeneratorPage";
import CampaignsPage from "./pages/CampaignsPage";
import AudiencePage from "./pages/AudiencePage";
import TemplatesPage from "./pages/TemplatesPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "generate", Component: EmailGeneratorPage },
      { path: "campaigns", Component: CampaignsPage },
      { path: "audience", Component: AudiencePage },
      { path: "templates", Component: TemplatesPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
]);
