import { createBrowserRouter } from "react-router";
import Root from "./Root";
import ArchitectureOverview from "./pages/ArchitectureOverview";
import Services from "./pages/Services";
import Analytics from "./pages/Analytics";
import Logs from "./pages/Logs";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: ArchitectureOverview },
      { path: "services", Component: Services },
      { path: "analytics", Component: Analytics },
      { path: "logs", Component: Logs },
    ],
  },
]);
