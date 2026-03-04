import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { MemoryOverview } from "./components/views/MemoryOverview";
import { ObjectsView } from "./components/views/ObjectsView";
import { ReferencesView } from "./components/views/ReferencesView";
import { GCLogsView } from "./components/views/GCLogsView";
import { AnalyticsView } from "./components/views/AnalyticsView";
import { SettingsView } from "./components/views/SettingsView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: MemoryOverview },
      { path: "objects", Component: ObjectsView },
      { path: "references", Component: ReferencesView },
      { path: "logs", Component: GCLogsView },
      { path: "analytics", Component: AnalyticsView },
      { path: "settings", Component: SettingsView },
    ],
  },
]);
