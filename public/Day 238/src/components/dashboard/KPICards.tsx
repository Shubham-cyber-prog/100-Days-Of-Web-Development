import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { KPI } from "@/lib/dashboard-data";

function formatValue(kpi: KPI): string {
  if (kpi.format === "currency") {
    if (kpi.value >= 1_000_000) return `${kpi.prefix || ""}${(kpi.value / 1_000_000).toFixed(1)}M`;
    if (kpi.value >= 1_000) return `${kpi.prefix || ""}${(kpi.value / 1_000).toFixed(0)}K`;
    return `${kpi.prefix || ""}${kpi.value}`;
  }
  if (kpi.format === "percent") return `${kpi.value}${kpi.suffix || ""}`;
  if (kpi.value >= 1_000_000) return `${(kpi.value / 1_000_000).toFixed(1)}M`;
  if (kpi.value >= 1_000) return `${(kpi.value / 1_000).toFixed(0)}K`;
  return `${kpi.value}`;
}

export function KPICards({ kpis }: { kpis: KPI[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => (
        <div
          key={kpi.label}
          className="glass-card kpi-gradient rounded-xl p-5 animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1">
            {kpi.label}
          </p>
          <p className="text-3xl font-bold font-mono text-foreground animate-count-up">
            {formatValue(kpi)}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {kpi.change > 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-success" />
            ) : kpi.change < 0 ? (
              <TrendingDown className="w-3.5 h-3.5 text-destructive" />
            ) : (
              <Minus className="w-3.5 h-3.5 text-muted-foreground" />
            )}
            <span
              className={`text-xs font-semibold ${
                kpi.change > 0 ? "text-success" : kpi.change < 0 ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {kpi.change > 0 ? "+" : ""}{kpi.change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        </div>
      ))}
    </div>
  );
}
