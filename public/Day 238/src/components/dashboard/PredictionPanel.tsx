import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Brain, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import type { PredictionResult } from "@/lib/dashboard-data";

export function PredictionPanel({ predictions }: { predictions: PredictionResult[] }) {
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center gap-2 mb-2">
        <Brain className="w-5 h-5 text-accent" />
        <h2 className="text-lg font-bold text-foreground">Predictive Analytics</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {predictions.map((pred) => (
          <div key={pred.metric} className="glass-card prediction-gradient rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {pred.metric}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{pred.model}</p>
              </div>
              {pred.trend === "up" ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-destructive" />
              )}
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold font-mono text-foreground">
                {pred.metric === "Revenue"
                  ? `$${(pred.predictedValue / 1000).toFixed(0)}K`
                  : pred.metric === "Conversion Rate"
                  ? `${pred.predictedValue}%`
                  : pred.predictedValue.toLocaleString()}
              </span>
              <span className="text-xs text-muted-foreground">predicted</span>
            </div>

            {/* Mini forecast chart */}
            <div className="h-[100px] mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pred.forecastData}>
                  <defs>
                    <linearGradient id={`pred-${pred.metric}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stroke="none"
                    fill="hsl(262, 83%, 58%)"
                    fillOpacity={0.08}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(262, 83%, 58%)"
                    strokeWidth={2}
                    fill={`url(#pred-${pred.metric})`}
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stroke="none"
                    fill="hsl(262, 83%, 58%)"
                    fillOpacity={0.04}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Model metrics */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Target className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-xs font-mono font-semibold text-foreground">{pred.confidence}%</p>
                <p className="text-[10px] text-muted-foreground">Confidence</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <BarChart3 className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-xs font-mono font-semibold text-foreground">{pred.r2.toFixed(3)}</p>
                <p className="text-[10px] text-muted-foreground">R² Score</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingDown className="w-3 h-3 text-muted-foreground" />
                </div>
                <p className="text-xs font-mono font-semibold text-foreground">
                  {pred.rmse > 1000 ? `${(pred.rmse / 1000).toFixed(1)}K` : pred.rmse.toFixed(2)}
                </p>
                <p className="text-[10px] text-muted-foreground">RMSE</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
