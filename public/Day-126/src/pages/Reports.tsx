import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { QualityScore } from "@/components/QualityScore";
import { motion } from "framer-motion";
import { FileText, Bug, ShieldAlert, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const historyData = [
  { date: "Feb 24", score: 78, issues: 12 },
  { date: "Feb 20", score: 73, issues: 18 },
  { date: "Feb 16", score: 69, issues: 22 },
  { date: "Feb 12", score: 65, issues: 28 },
  { date: "Feb 8", score: 58, issues: 35 },
];

const ReportsPage = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="mt-1 text-sm text-muted-foreground">Analysis history and downloadable reports</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export PDF
          </Button>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Reports Generated" value={23} icon={FileText} delay={0} />
          <StatCard label="Issues Resolved" value={89} change="62% fix rate" changeType="positive" icon={Bug} delay={0.1} />
          <StatCard label="Vulnerabilities" value={3} change="-5 this month" changeType="positive" icon={ShieldAlert} delay={0.2} />
          <StatCard label="Trend" value="+15%" change="Score improvement" changeType="positive" icon={TrendingUp} delay={0.3} />
        </div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6"
        >
          <h3 className="text-lg font-semibold text-card-foreground mb-6">Score History</h3>
          <div className="flex items-end justify-between gap-4 h-48">
            {historyData.map((item, i) => (
              <motion.div
                key={item.date}
                initial={{ height: 0 }}
                animate={{ height: `${item.score}%` }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold text-card-foreground">{item.score}</span>
                <div
                  className="w-full rounded-t-lg gradient-primary"
                  style={{ height: `${item.score}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{item.date}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quality over time */}
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { score: 78, label: "Current" },
            { score: 65, label: "Last Month" },
            { score: 52, label: "3 Months Ago" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6 flex flex-col items-center"
            >
              <QualityScore score={item.score} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
