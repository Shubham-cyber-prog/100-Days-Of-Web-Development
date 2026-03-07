import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { WebsiteAnalyzer } from "./pages/WebsiteAnalyzer";
import { ContentOptimizer } from "./pages/ContentOptimizer";
import { KeywordTracker } from "./pages/KeywordTracker";
import { TechnicalAudit } from "./pages/TechnicalAudit";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { CompetitorAnalysis } from "./pages/CompetitorAnalysis";
import { BacklinkChecker } from "./pages/BacklinkChecker";
import { SiteSpeedMonitor } from "./pages/SiteSpeedMonitor";
import { AIContentGenerator } from "./pages/AIContentGenerator";
import { BulkURLAnalyzer } from "./pages/BulkURLAnalyzer";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "dashboard", Component: Dashboard },
      { path: "analyzer", Component: WebsiteAnalyzer },
      { path: "content-optimizer", Component: ContentOptimizer },
      { path: "keyword-tracker", Component: KeywordTracker },
      { path: "technical-audit", Component: TechnicalAudit },
      { path: "competitor-analysis", Component: CompetitorAnalysis },
      { path: "backlink-checker", Component: BacklinkChecker },
      { path: "site-speed", Component: SiteSpeedMonitor },
      { path: "ai-content-generator", Component: AIContentGenerator },
      { path: "bulk-analyzer", Component: BulkURLAnalyzer },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);