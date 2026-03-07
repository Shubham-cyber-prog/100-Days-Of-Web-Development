import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/main-layout";
import { DashboardPage } from "./pages/dashboard";
import { ArticlesPage } from "./pages/articles";
import { EditorPage } from "./pages/editor";
import { CategoriesPage } from "./pages/categories";
import { TagsPage } from "./pages/tags";
import { AnalyticsPage } from "./pages/analytics";
import { TeamPage } from "./pages/team";
import { SettingsPage } from "./pages/settings";
import { StyleGuide } from "./pages/style-guide";
import { DocumentationPage } from "./pages/documentation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: "articles", Component: ArticlesPage },
      { path: "editor", Component: EditorPage },
      { path: "editor/:id", Component: EditorPage },
      { path: "categories", Component: CategoriesPage },
      { path: "tags", Component: TagsPage },
      { path: "analytics", Component: AnalyticsPage },
      { path: "team", Component: TeamPage },
      { path: "settings", Component: SettingsPage },
      { path: "style-guide", Component: StyleGuide },
      { path: "docs", Component: DocumentationPage },
    ],
  },
]);