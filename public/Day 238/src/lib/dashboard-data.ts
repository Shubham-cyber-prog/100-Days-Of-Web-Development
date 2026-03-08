// Sample dataset and data generation utilities for the Data Science Dashboard

export interface DataPoint {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  churnRate: number;
  category: string;
  region: string;
}

export interface KPI {
  label: string;
  value: number;
  change: number;
  prefix?: string;
  suffix?: string;
  format?: "currency" | "number" | "percent";
}

export interface PredictionResult {
  model: string;
  metric: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  rmse: number;
  r2: number;
  trend: "up" | "down" | "stable";
  forecastData: { date: string; value: number; lower: number; upper: number }[];
}

export interface CategoryData {
  category: string;
  revenue: number;
  users: number;
  growth: number;
}

const categories = ["SaaS", "E-Commerce", "Fintech", "HealthTech", "EdTech"];
const regions = ["North America", "Europe", "Asia Pacific", "Latin America"];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function generateHistoricalData(
  startDate: Date,
  endDate: Date,
  categoryFilter?: string,
  regionFilter?: string
): DataPoint[] {
  const data: DataPoint[] = [];
  const current = new Date(startDate);
  let seed = 42;

  while (current <= endDate) {
    for (const cat of categories) {
      for (const reg of regions) {
        if (categoryFilter && cat !== categoryFilter) continue;
        if (regionFilter && reg !== regionFilter) continue;

        seed++;
        const monthProgress = (current.getMonth() + current.getFullYear() * 12) / 12;
        const trend = 1 + monthProgress * 0.02;
        const seasonality = 1 + 0.15 * Math.sin((current.getMonth() / 12) * Math.PI * 2);
        const noise = 0.85 + seededRandom(seed) * 0.3;

        const baseRevenue =
          cat === "SaaS" ? 120000 :
          cat === "E-Commerce" ? 95000 :
          cat === "Fintech" ? 150000 :
          cat === "HealthTech" ? 80000 : 60000;

        const regionMult =
          reg === "North America" ? 1.3 :
          reg === "Europe" ? 1.1 :
          reg === "Asia Pacific" ? 0.9 : 0.7;

        data.push({
          date: current.toISOString().split("T")[0],
          revenue: Math.round(baseRevenue * trend * seasonality * noise * regionMult),
          users: Math.round(5000 * trend * noise * regionMult),
          conversions: Math.round(400 * trend * seasonality * noise * regionMult),
          churnRate: parseFloat((3 + seededRandom(seed + 1000) * 4).toFixed(1)),
          category: cat,
          region: reg,
        });
      }
    }
    current.setMonth(current.getMonth() + 1);
  }
  return data;
}

export function aggregateByMonth(data: DataPoint[]): {
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  churnRate: number;
}[] {
  const map = new Map<string, { revenue: number; users: number; conversions: number; churnRates: number[]; count: number }>();

  for (const d of data) {
    const key = d.date.slice(0, 7);
    const existing = map.get(key) || { revenue: 0, users: 0, conversions: 0, churnRates: [], count: 0 };
    existing.revenue += d.revenue;
    existing.users += d.users;
    existing.conversions += d.conversions;
    existing.churnRates.push(d.churnRate);
    existing.count++;
    map.set(key, existing);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, v]) => ({
      date,
      revenue: v.revenue,
      users: v.users,
      conversions: v.conversions,
      churnRate: parseFloat((v.churnRates.reduce((a, b) => a + b, 0) / v.churnRates.length).toFixed(1)),
    }));
}

export function aggregateByCategory(data: DataPoint[]): CategoryData[] {
  const map = new Map<string, { revenue: number; users: number; prevRevenue: number }>();

  for (const d of data) {
    const existing = map.get(d.category) || { revenue: 0, users: 0, prevRevenue: 0 };
    existing.revenue += d.revenue;
    existing.users += d.users;
    map.set(d.category, existing);
  }

  return Array.from(map.entries()).map(([category, v]) => ({
    category,
    revenue: v.revenue,
    users: v.users,
    growth: parseFloat((5 + Math.random() * 20).toFixed(1)),
  }));
}

export function computeKPIs(data: DataPoint[]): KPI[] {
  const totalRevenue = data.reduce((s, d) => s + d.revenue, 0);
  const totalUsers = data.reduce((s, d) => s + d.users, 0);
  const totalConversions = data.reduce((s, d) => s + d.conversions, 0);
  const avgChurn = data.reduce((s, d) => s + d.churnRate, 0) / (data.length || 1);

  return [
    { label: "Total Revenue", value: totalRevenue, change: 12.4, prefix: "$", format: "currency" },
    { label: "Active Users", value: totalUsers, change: 8.2, format: "number" },
    { label: "Conversions", value: totalConversions, change: 15.7, format: "number" },
    { label: "Avg Churn Rate", value: parseFloat(avgChurn.toFixed(1)), change: -2.1, suffix: "%", format: "percent" },
  ];
}

// Simulated ML predictions
export function generatePredictions(historicalAgg: ReturnType<typeof aggregateByMonth>): PredictionResult[] {
  const lastRevenue = historicalAgg[historicalAgg.length - 1]?.revenue || 0;
  const lastUsers = historicalAgg[historicalAgg.length - 1]?.users || 0;
  const lastDate = historicalAgg[historicalAgg.length - 1]?.date || "2024-12";

  const forecastMonths = 6;

  function generateForecast(baseValue: number, growthRate: number, volatility: number) {
    const forecast = [];
    let val = baseValue;
    for (let i = 1; i <= forecastMonths; i++) {
      const [y, m] = lastDate.split("-").map(Number);
      const newDate = new Date(y, m - 1 + i, 1);
      const dateStr = newDate.toISOString().split("T")[0].slice(0, 7);
      val = val * (1 + growthRate) * (0.95 + Math.random() * 0.1);
      const margin = val * volatility;
      forecast.push({
        date: dateStr,
        value: Math.round(val),
        lower: Math.round(val - margin),
        upper: Math.round(val + margin),
      });
    }
    return forecast;
  }

  return [
    {
      model: "Random Forest Regression",
      metric: "Revenue",
      currentValue: lastRevenue,
      predictedValue: Math.round(lastRevenue * 1.08),
      confidence: 87.3,
      rmse: 12450,
      r2: 0.924,
      trend: "up",
      forecastData: generateForecast(lastRevenue, 0.025, 0.12),
    },
    {
      model: "ARIMA Time Series",
      metric: "Active Users",
      currentValue: lastUsers,
      predictedValue: Math.round(lastUsers * 1.05),
      confidence: 82.1,
      rmse: 890,
      r2: 0.891,
      trend: "up",
      forecastData: generateForecast(lastUsers, 0.018, 0.15),
    },
    {
      model: "Linear Regression",
      metric: "Conversion Rate",
      currentValue: 7.8,
      predictedValue: 8.4,
      confidence: 79.5,
      rmse: 0.42,
      r2: 0.856,
      trend: "up",
      forecastData: generateForecast(7.8, 0.012, 0.08),
    },
  ];
}

export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]);
  const csv = [
    headers.join(","),
    ...data.map((row) => headers.map((h) => JSON.stringify(row[h] ?? "")).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export const ALL_CATEGORIES = categories;
export const ALL_REGIONS = regions;
