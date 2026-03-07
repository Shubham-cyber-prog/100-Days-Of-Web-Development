import { createBrowserRouter } from "react-router";
import { SplashIntro } from "./pages/SplashIntro";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { TurfDetail } from "./pages/TurfDetail";
import { Profile } from "./pages/Profile";
import { TurfOwnerDashboard } from "./pages/TurfOwnerDashboard";
import { OwnerLogin } from "./pages/OwnerLogin";
import { OwnerSignup } from "./pages/OwnerSignup";
import { ErrorBoundary } from "./components/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SplashIntro />,
    ErrorBoundary,
  },
  {
    path: "/home",
    element: <Home />,
    ErrorBoundary,
  },
  {
    path: "/animation",
    element: <SplashIntro />,
    ErrorBoundary,
  },
  {
    path: "/login",
    element: <Login />,
    ErrorBoundary,
  },
  {
    path: "/signup",
    element: <Signup />,
    ErrorBoundary,
  },
  {
    path: "/turf/:id",
    element: <TurfDetail />,
    ErrorBoundary,
  },
  {
    path: "/profile",
    element: <Profile />,
    ErrorBoundary,
  },
  {
    path: "/player",
    element: <Home />,
    ErrorBoundary,
  },
  {
    path: "/owner",
    element: <OwnerLogin />,
    ErrorBoundary,
  },
  {
    path: "/owner/login",
    element: <OwnerLogin />,
    ErrorBoundary,
  },
  {
    path: "/owner/signup",
    element: <OwnerSignup />,
    ErrorBoundary,
  },
  {
    path: "/owner/dashboard",
    element: <TurfOwnerDashboard />,
    ErrorBoundary,
  },
  {
    path: "*",
    element: <Home />,
    ErrorBoundary,
  },
]);