import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ClusterOverview } from "./pages/ClusterOverview";
import { Nodes } from "./pages/Nodes";
import { Pods } from "./pages/Pods";
import { Deployments } from "./pages/Deployments";
import { Services } from "./pages/Services";
import { Ingress } from "./pages/Ingress";
import { Namespaces } from "./pages/Namespaces";
import { Logs } from "./pages/Logs";
import { Settings } from "./pages/Settings";
import { NodeDetail } from "./pages/NodeDetail";
import { PodDetail } from "./pages/PodDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: ClusterOverview },
      { path: "nodes", Component: Nodes },
      { path: "nodes/:nodeId", Component: NodeDetail },
      { path: "pods", Component: Pods },
      { path: "pods/:podId", Component: PodDetail },
      { path: "deployments", Component: Deployments },
      { path: "services", Component: Services },
      { path: "ingress", Component: Ingress },
      { path: "namespaces", Component: Namespaces },
      { path: "logs", Component: Logs },
      { path: "settings", Component: Settings },
    ],
  },
]);
