import { createBrowserRouter } from "react-router";
import { Builder } from "./components/Builder";
import { SavedPatterns } from "./components/SavedPatterns";
import { ExamplesLibrary } from "./components/ExamplesLibrary";
import { Cheatsheet } from "./components/Cheatsheet";
import { Settings } from "./components/Settings";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Builder },
      { path: "saved", Component: SavedPatterns },
      { path: "examples", Component: ExamplesLibrary },
      { path: "cheatsheet", Component: Cheatsheet },
      { path: "settings", Component: Settings },
    ],
  },
]);
