import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { SyncOverview } from "./components/pages/SyncOverview";
import { Devices } from "./components/pages/Devices";
import { Files } from "./components/pages/Files";
import { VersionHistory } from "./components/pages/VersionHistory";
import { Conflicts } from "./components/pages/Conflicts";
import { Logs } from "./components/pages/Logs";
import { Settings } from "./components/pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SyncOverview },
      { path: "devices", Component: Devices },
      { path: "files", Component: Files },
      { path: "version-history", Component: VersionHistory },
      { path: "conflicts", Component: Conflicts },
      { path: "logs", Component: Logs },
      { path: "settings", Component: Settings },
    ],
  },
]);
