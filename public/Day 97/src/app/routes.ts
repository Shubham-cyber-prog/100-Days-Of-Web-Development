import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/root-layout";
import { DashboardLayout } from "./layouts/dashboard-layout";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { SignUpPage } from "./pages/signup";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { DashboardPage } from "./pages/dashboard";
import { IssuesPage } from "./pages/issues";
import { IssueDetailPage } from "./pages/issue-detail";
import { FeedPage } from "./pages/feed";
import { EventsPage } from "./pages/events";
import { PollsPage } from "./pages/polls";
import { AdminPage } from "./pages/admin";
import { ProfilePage } from "./pages/profile";
import { NotFoundPage } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignUpPage },
      { path: "forgot-password", Component: ForgotPasswordPage },
      {
        path: "app",
        Component: DashboardLayout,
        children: [
          { index: true, Component: DashboardPage },
          { path: "issues", Component: IssuesPage },
          { path: "issues/:id", Component: IssueDetailPage },
          { path: "feed", Component: FeedPage },
          { path: "events", Component: EventsPage },
          { path: "polls", Component: PollsPage },
          { path: "admin", Component: AdminPage },
          { path: "profile", Component: ProfilePage },
        ],
      },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);