import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardView } from "./components/DashboardView";
import { JobsView } from "./components/JobsView";
import { JobDetailView } from "./components/JobDetailView";
import { DataExplorerView } from "./components/DataExplorerView";
import { LogsView } from "./components/LogsView";
import { SchedulesView } from "./components/SchedulesView";
import { ApiAccessView } from "./components/ApiAccessView";
import { SettingsView } from "./components/SettingsView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardView },
      { path: "jobs", Component: JobsView },
      { path: "jobs/:jobId", Component: JobDetailView },
      { path: "data-explorer", Component: DataExplorerView },
      { path: "logs", Component: LogsView },
      { path: "schedules", Component: SchedulesView },
      { path: "api", Component: ApiAccessView },
      { path: "settings", Component: SettingsView },
    ],
  },
]);
