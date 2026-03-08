import { createBrowserRouter } from "react-router";
import { Home } from "./pages/home";
import { PlayerView } from "./pages/player-view";
import { Library } from "./pages/library";
import { PlaylistDetail } from "./pages/playlist-detail";
import { Layout } from "./components/layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "player", Component: PlayerView },
      { path: "library", Component: Library },
      { path: "playlist/:id", Component: PlaylistDetail },
    ],
  },
]);
