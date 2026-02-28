import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { QueuesView } from "./components/QueuesView";
import { ProducersView } from "./components/ProducersView";
import { ConsumersView } from "./components/ConsumersView";
import { MessageLogsView } from "./components/MessageLogsView";
import { AnalyticsView } from "./components/AnalyticsView";
import { SettingsView } from "./components/SettingsView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "queues", Component: QueuesView },
      { path: "producers", Component: ProducersView },
      { path: "consumers", Component: ConsumersView },
      { path: "logs", Component: MessageLogsView },
      { path: "analytics", Component: AnalyticsView },
      { path: "settings", Component: SettingsView },
    ],
  },
]);
