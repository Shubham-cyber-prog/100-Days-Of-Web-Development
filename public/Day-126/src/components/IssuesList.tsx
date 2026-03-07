import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Severity = "low" | "medium" | "high" | "critical";

interface Issue {
  id: string;
  file: string;
  line: number;
  message: string;
  severity: Severity;
  type: string;
}

const severityStyles: Record<Severity, string> = {
  low: "bg-info/10 text-info border-info/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  high: "bg-destructive/10 text-destructive border-destructive/20",
  critical: "bg-critical/10 text-critical border-critical/20",
};

const severityDot: Record<Severity, string> = {
  low: "bg-info",
  medium: "bg-warning",
  high: "bg-destructive",
  critical: "bg-critical",
};

export function IssuesList({ issues }: { issues: Issue[] }) {
  return (
    <div className="space-y-2">
      {issues.map((issue, i) => (
        <motion.div
          key={issue.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:glow-border"
        >
          <div className={cn("mt-1 h-2 w-2 rounded-full flex-shrink-0", severityDot[issue.severity])} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-xs text-muted-foreground">{issue.file}:{issue.line}</span>
              <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", severityStyles[issue.severity])}>
                {issue.severity}
              </span>
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{issue.type}</span>
            </div>
            <p className="mt-1 text-sm text-card-foreground">{issue.message}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export type { Issue, Severity };
