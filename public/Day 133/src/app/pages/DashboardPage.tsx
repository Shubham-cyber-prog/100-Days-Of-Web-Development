import { StatsCard } from "../components/StatsCard";
import {
  Package,
  AlertTriangle,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Badge } from "../components/ui/badge";

const stockData = [
  { name: "Electronics", stock: 450 },
  { name: "Furniture", stock: 320 },
  { name: "Clothing", stock: 280 },
  { name: "Food", stock: 520 },
  { name: "Books", stock: 180 },
  { name: "Toys", stock: 240 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#6366f1" },
  { name: "Furniture", value: 25, color: "#8b5cf6" },
  { name: "Clothing", value: 20, color: "#ec4899" },
  { name: "Food", value: 15, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#10b981" },
];

const recentActivity = [
  {
    id: "ORD-1023",
    product: "Laptop Pro 15",
    customer: "Sarah Johnson",
    status: "Completed",
    amount: "$1,299",
    time: "2 mins ago",
  },
  {
    id: "ORD-1022",
    product: "Office Chair Deluxe",
    customer: "Mike Chen",
    status: "Processing",
    amount: "$449",
    time: "15 mins ago",
  },
  {
    id: "ORD-1021",
    product: "Wireless Mouse",
    customer: "Emma Davis",
    status: "Completed",
    amount: "$79",
    time: "1 hour ago",
  },
  {
    id: "ORD-1020",
    product: "USB-C Cable Pack",
    customer: "John Smith",
    status: "Shipped",
    amount: "$29",
    time: "2 hours ago",
  },
  {
    id: "ORD-1019",
    product: "Monitor 27 inch",
    customer: "Lisa Anderson",
    status: "Completed",
    amount: "$599",
    time: "3 hours ago",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value="1,247"
          icon={Package}
          trend={{ value: "12%", isPositive: true }}
          iconColor="text-indigo-600"
          iconBgColor="bg-indigo-100"
        />
        <StatsCard
          title="Low Stock Items"
          value="23"
          icon={AlertTriangle}
          trend={{ value: "8%", isPositive: false }}
          iconColor="text-amber-600"
          iconBgColor="bg-amber-100"
        />
        <StatsCard
          title="Orders Today"
          value="54"
          icon={ShoppingCart}
          trend={{ value: "23%", isPositive: true }}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Revenue"
          value="$12,426"
          icon={DollarSign}
          trend={{ value: "18%", isPositive: true }}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock Levels Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stock Levels by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                stroke="#9ca3af"
              />
              <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="stock" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution Pie Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {activity.product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {activity.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        activity.status === "Completed"
                          ? "default"
                          : activity.status === "Processing"
                          ? "secondary"
                          : "outline"
                      }
                      className={
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : activity.status === "Processing"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
