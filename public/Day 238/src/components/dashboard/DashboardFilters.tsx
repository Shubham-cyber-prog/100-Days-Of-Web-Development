import { Calendar, Filter, SlidersHorizontal } from "lucide-react";
import { ALL_CATEGORIES, ALL_REGIONS } from "@/lib/dashboard-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FiltersProps {
  dateRange: string;
  category: string;
  region: string;
  metric: "revenue" | "users" | "conversions";
  onDateRangeChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onRegionChange: (v: string) => void;
  onMetricChange: (v: "revenue" | "users" | "conversions") => void;
}

export function DashboardFilters({
  dateRange, category, region, metric,
  onDateRangeChange, onCategoryChange, onRegionChange, onMetricChange,
}: FiltersProps) {
  return (
    <div className="glass-card rounded-xl p-4 animate-slide-in">
      <div className="flex items-center gap-2 mb-3">
        <SlidersHorizontal className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Filters</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[160px] h-9 text-xs">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
            <SelectItem value="2y">Last 2 Years</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>

        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[150px] h-9 text-xs">
            <Filter className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {ALL_CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={region} onValueChange={onRegionChange}>
          <SelectTrigger className="w-[160px] h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {ALL_REGIONS.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={metric} onValueChange={(v) => onMetricChange(v as "revenue" | "users" | "conversions")}>
          <SelectTrigger className="w-[150px] h-9 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="revenue">Revenue</SelectItem>
            <SelectItem value="users">Users</SelectItem>
            <SelectItem value="conversions">Conversions</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
