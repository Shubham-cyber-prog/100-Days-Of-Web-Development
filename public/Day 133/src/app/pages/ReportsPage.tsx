import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Download, TrendingUp, Calendar } from "lucide-react";

const salesData = [
  { month: "Jan", sales: 12400, orders: 145 },
  { month: "Feb", sales: 15200, orders: 178 },
  { month: "Mar", sales: 18900, orders: 210 },
  { month: "Apr", sales: 16500, orders: 192 },
  { month: "May", sales: 21300, orders: 245 },
  { month: "Jun", sales: 24800, orders: 289 },
  { month: "Jul", sales: 22100, orders: 256 },
  { month: "Aug", sales: 26400, orders: 301 },
  { month: "Sep", sales: 28900, orders: 334 },
  { month: "Oct", sales: 31200, orders: 367 },
  { month: "Nov", sales: 29500, orders: 342 },
  { month: "Dec", sales: 33800, orders: 398 },
];

const topProducts = [
  { name: "Laptop Pro 15", sales: 45200, units: 34 },
  { name: "Office Chair Deluxe", sales: 38600, units: 86 },
  { name: "Monitor 27 inch", sales: 35400, units: 59 },
  { name: "Mechanical Keyboard", sales: 28900, units: 194 },
  { name: "Wireless Mouse", sales: 24100, units: 305 },
];

const revenueByCategory = [
  { category: "Electronics", revenue: 145600 },
  { category: "Furniture", revenue: 98400 },
  { category: "Accessories", revenue: 67200 },
  { category: "Office Supplies", revenue: 45800 },
  { category: "Storage", revenue: 32100 },
];

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("year");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600 mt-1">
            Analyze your business performance
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="size-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Sales</p>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$281,400</p>
          <p className="text-sm text-green-600 mt-2">
            <span className="font-medium">↑ 24%</span> vs last period
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Total Orders</p>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">3,257</p>
          <p className="text-sm text-green-600 mt-2">
            <span className="font-medium">↑ 18%</span> vs last period
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
            <TrendingUp className="size-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$86.40</p>
          <p className="text-sm text-green-600 mt-2">
            <span className="font-medium">↑ 5%</span> vs last period
          </p>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
          <p className="text-sm text-gray-600 mt-1">
            Monthly sales and order volume over time
          </p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ fill: "#6366f1", r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#10b981"
              strokeWidth={3}
              dot={{ fill: "#10b981", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 bg-indigo-100 text-indigo-600 rounded-lg font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.units} units sold
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${product.sales.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Revenue by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByCategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <YAxis
                type="category"
                dataKey="category"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
                width={120}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
