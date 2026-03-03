import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart, Legend,
} from "recharts";

interface TrendChartProps {
  data: { date: string; revenue: number; users: number; conversions: number }[];
  metric: "revenue" | "users" | "conversions";
}

const metricConfig = {
  revenue: { color: "hsl(217, 91%, 60%)", label: "Revenue", formatter: (v: number) => `$${(v / 1000).toFixed(0)}K` },
  users: { color: "hsl(160, 84%, 39%)", label: "Active Users", formatter: (v: number) => v.toLocaleString() },
  conversions: { color: "hsl(262, 83%, 58%)", label: "Conversions", formatter: (v: number) => v.toLocaleString() },
};

export function TrendChart({ data, metric }: TrendChartProps) {
  const config = metricConfig[metric];

  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h3 className="text-sm font-semibold text-foreground mb-4">
        {config.label} — Historical Trend
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id={`grad-${metric}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={config.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={config.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={config.formatter}
              axisLine={{ stroke: "hsl(var(--border))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: 12,
                color: "hsl(var(--foreground))",
              }}
              formatter={(value: number) => [config.formatter(value), config.label]}
            />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={config.color}
              strokeWidth={2}
              fill={`url(#grad-${metric})`}
              dot={false}
              activeDot={{ r: 4, fill: config.color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
