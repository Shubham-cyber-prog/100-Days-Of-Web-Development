import { Activity, Download, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onExport: () => void;
  lastUpdated: string;
}

export function DashboardHeader({ onExport, lastUpdated }: HeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analytics Dashboard
          </h1>
          <div className="flex items-center gap-2 mt-0.5">
            <Activity className="w-3 h-3 text-success animate-pulse-soft" />
            <span className="text-xs text-muted-foreground">
              Live · Updated {lastUpdated}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onExport}
        className="text-xs gap-1.5"
      >
        <Download className="w-3.5 h-3.5" />
        Export CSV
      </Button>
    </div>
  );
}
