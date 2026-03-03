import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import VirtualMachines from "./components/VirtualMachines";
import ResourceAllocation from "./components/ResourceAllocation";
import Storage from "./components/Storage";
import Network from "./components/Network";
import Logs from "./components/Logs";
import Settings from "./components/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "virtual-machines", Component: VirtualMachines },
      { path: "resource-allocation", Component: ResourceAllocation },
      { path: "storage", Component: Storage },
      { path: "network", Component: Network },
      { path: "logs", Component: Logs },
      { path: "settings", Component: Settings },
    ],
  },
]);
