import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { IssuesList, type Issue } from "@/components/IssuesList";
import { QualityScore } from "@/components/QualityScore";
import { motion } from "framer-motion";
import { Bug, ShieldAlert, TrendingUp, FileCode2, Clock } from "lucide-react";

const mockIssues: Issue[] = [
  { id: "1", file: "auth/login.ts", line: 42, message: "SQL injection vulnerability: user input not sanitized before query", severity: "critical", type: "security" },
  { id: "2", file: "utils/parser.js", line: 87, message: "Potential null reference - 'data' could be undefined", severity: "high", type: "bug" },
  { id: "3", file: "api/users.py", line: 15, message: "Function exceeds 50 lines - consider breaking into smaller functions", severity: "medium", type: "code smell" },
  { id: "4", file: "components/Card.tsx", line: 8, message: "Unused import: 'useEffect' is imported but never used", severity: "low", type: "cleanup" },
  { id: "5", file: "services/db.java", line: 120, message: "Connection pool not properly closed in error path", severity: "high", type: "bug" },
];

const recentReviews = [
  { name: "frontend-auth", files: 12, issues: 8, score: 72, time: "2h ago" },
  { name: "api-endpoints", files: 6, issues: 3, score: 89, time: "5h ago" },
  { name: "data-pipeline", files: 24, issues: 15, score: 61, time: "1d ago" },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Overview of your code analysis</p>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total Issues" value={142} change="+12 this week" changeType="negative" icon={Bug} delay={0} />
          <StatCard label="Critical" value={8} change="-3 from last scan" changeType="positive" icon={ShieldAlert} delay={0.1} />
          <StatCard label="Files Analyzed" value="1,284" change="+86 this week" changeType="positive" icon={FileCode2} delay={0.2} />
          <StatCard label="Avg. Score" value="78/100" change="+5 improvement" changeType="positive" icon={TrendingUp} delay={0.3} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Issues */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Issues</h2>
            <IssuesList issues={mockIssues} />
          </div>

          {/* Score + Recent Reviews */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl border border-border bg-card p-6 flex flex-col items-center"
            >
              <QualityScore score={78} />
              <p className="mt-3 text-xs text-muted-foreground text-center">Based on 1,284 files analyzed across 23 projects</p>
            </motion.div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Recent Reviews</h3>
              {recentReviews.map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:glow-border cursor-pointer"
                >
                  <FileCode2 className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.files} files · {review.issues} issues</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-semibold text-foreground">{review.score}</span>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">{review.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
