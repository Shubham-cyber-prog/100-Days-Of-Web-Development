import { createBrowserRouter, Navigate } from "react-router";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { LoginPage } from "./components/pages/LoginPage";
import { MainDashboard } from "./components/pages/MainDashboard";
import { MarketTrendsPage } from "./components/pages/MarketTrendsPage";
import { CompetitorAnalysisPage } from "./components/pages/CompetitorAnalysisPage";
import { CustomerInsightsPage } from "./components/pages/CustomerInsightsPage";
import { ReportGeneratorPage } from "./components/pages/ReportGeneratorPage";
import { DataSourcesPage } from "./components/pages/DataSourcesPage";
import { FeaturesShowcasePage } from "./components/pages/FeaturesShowcasePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <MainDashboard /> },
      { path: "trends", element: <MarketTrendsPage /> },
      { path: "competitors", element: <CompetitorAnalysisPage /> },
      { path: "insights", element: <CustomerInsightsPage /> },
      { path: "reports", element: <ReportGeneratorPage /> },
      { path: "sources", element: <DataSourcesPage /> },
      { path: "features", element: <FeaturesShowcasePage /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);