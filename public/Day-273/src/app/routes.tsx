import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Friends from "./pages/Friends";
import Groups from "./pages/Groups";
import Expenses from "./pages/Expenses";
import Activity from "./pages/Activity";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "friends", Component: Friends },
      { path: "groups", Component: Groups },
      { path: "expenses", Component: Expenses },
      { path: "activity", Component: Activity },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
