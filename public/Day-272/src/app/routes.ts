import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Simulator } from "./pages/Simulator";
import { FirewallRules } from "./pages/FirewallRules";
import { TrafficGenerator } from "./pages/TrafficGenerator";
import { Logs } from "./pages/Logs";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Simulator },
      { path: "rules", Component: FirewallRules },
      { path: "traffic", Component: TrafficGenerator },
      { path: "logs", Component: Logs },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
    ],
  },
]);
