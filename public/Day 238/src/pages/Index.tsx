import { useState, useMemo, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICards } from "@/components/dashboard/KPICards";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { PredictionPanel } from "@/components/dashboard/PredictionPanel";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import {
  generateHistoricalData,
  aggregateByMonth,
  aggregateByCategory,
  computeKPIs,
  generatePredictions,
  exportToCSV,
} from "@/lib/dashboard-data";

const Index = () => {
  const [dateRange, setDateRange] = useState("1y");
  const [category, setCategory] = useState("all");
  const [region, setRegion] = useState("all");
  const [metric, setMetric] = useState<"revenue" | "users" | "conversions">("revenue");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    const interval = setInterval(() => setLastUpdated(new Date().toLocaleTimeString()), 60000);
    return () => clearInterval(interval);
  }, []);

  const dateRangeMap: Record<string, number> = { "6m": 6, "1y": 12, "2y": 24, all: 48 };

  const rawData = useMemo(() => {
    const months = dateRangeMap[dateRange] || 12;
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - months);
    return generateHistoricalData(
      start, end,
      category === "all" ? undefined : category,
      region === "all" ? undefined : region
    );
  }, [dateRange, category, region]);

  const monthlyData = useMemo(() => aggregateByMonth(rawData), [rawData]);
  const categoryData = useMemo(() => aggregateByCategory(rawData), [rawData]);
  const kpis = useMemo(() => computeKPIs(rawData), [rawData]);
  const predictions = useMemo(() => generatePredictions(monthlyData), [monthlyData]);

  const handleExport = () => {
    exportToCSV(
      monthlyData.map((d) => ({ ...d })),
      `dashboard-export-${new Date().toISOString().split("T")[0]}`
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <DashboardHeader onExport={handleExport} lastUpdated={lastUpdated} />
        <DashboardFilters
          dateRange={dateRange}
          category={category}
          region={region}
          metric={metric}
          onDateRangeChange={setDateRange}
          onCategoryChange={setCategory}
          onRegionChange={setRegion}
          onMetricChange={setMetric}
        />
        <KPICards kpis={kpis} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TrendChart data={monthlyData} metric={metric} />
          <CategoryChart data={categoryData} />
        </div>
        <PredictionPanel predictions={predictions} />
      </div>
    </div>
  );
};

export default Index;
