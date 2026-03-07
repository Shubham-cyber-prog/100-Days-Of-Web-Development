import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CodeLine {
  number: number;
  content: string;
  comment?: {
    message: string;
    severity: "low" | "medium" | "high" | "critical";
  };
}

const severityAccent: Record<string, string> = {
  low: "border-l-info bg-info/5",
  medium: "border-l-warning bg-warning/5",
  high: "border-l-destructive bg-destructive/5",
  critical: "border-l-critical bg-critical/5",
};

const severityText: Record<string, string> = {
  low: "text-info",
  medium: "text-warning",
  high: "text-destructive",
  critical: "text-critical",
};

export function CodeViewer({ lines, fileName }: { lines: CodeLine[]; fileName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="overflow-hidden rounded-xl border border-border bg-card"
    >
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/60" />
          <div className="h-3 w-3 rounded-full bg-warning/60" />
          <div className="h-3 w-3 rounded-full bg-success/60" />
        </div>
        <span className="ml-2 font-mono text-xs text-muted-foreground">{fileName}</span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[600px]">
          {lines.map((line) => (
            <div key={line.number}>
              <div
                className={cn(
                  "flex border-l-2 border-l-transparent font-mono text-sm",
                  line.comment && severityAccent[line.comment.severity]
                )}
              >
                <span className="w-12 flex-shrink-0 select-none px-3 py-1 text-right text-xs text-muted-foreground/50">
                  {line.number}
                </span>
                <pre className="flex-1 px-4 py-1">
                  <code className="text-card-foreground">{line.content}</code>
                </pre>
              </div>
              {line.comment && (
                <div className={cn("ml-12 border-l-2 px-4 py-2", severityAccent[line.comment.severity])}>
                  <p className={cn("text-xs font-medium", severityText[line.comment.severity])}>
                    💡 {line.comment.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
