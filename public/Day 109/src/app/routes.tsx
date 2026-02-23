import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/MainLayout";
import { Dashboard } from "./components/pages/Dashboard";
import { Content } from "./components/pages/Content";
import { Media } from "./components/pages/Media";
import { Users } from "./components/pages/Users";
import { Analytics } from "./components/pages/Analytics";
import { Settings } from "./components/pages/Settings";
import { Editor } from "./components/pages/Editor";
import { DesignSystem } from "./components/pages/DesignSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "content", Component: Content },
      { path: "media", Component: Media },
      { path: "users", Component: Users },
      { path: "analytics", Component: Analytics },
      { path: "settings", Component: Settings },
      { path: "editor/:id?", Component: Editor },
      { path: "design-system", Component: DesignSystem },
    ],
  },
]);
