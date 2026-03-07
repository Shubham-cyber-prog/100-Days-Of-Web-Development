import { FileText, Download, TrendingUp, Users, DollarSign, Clock, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

const monthlyData = [
  { month: "Jan", revenue: 45000, users: 1200, projects: 45 },
  { month: "Feb", revenue: 52000, users: 1450, projects: 52 },
  { month: "Mar", revenue: 48000, users: 1380, projects: 48 },
  { month: "Apr", revenue: 61000, users: 1650, projects: 61 },
  { month: "May", revenue: 55000, users: 1520, projects: 55 },
  { month: "Jun", revenue: 67000, users: 1890, projects: 67 },
];

const categoryData = [
  { name: "Design", value: 35, color: "#3b82f6" },
  { name: "Development", value: 40, color: "#8b5cf6" },
  { name: "Marketing", value: 15, color: "#10b981" },
  { name: "Support", value: 10, color: "#f59e0b" },
];

const reportTypes = [
  {
    id: "revenue",
    name: "Revenue Report",
    description: "Monthly revenue and financial overview",
    icon: DollarSign,
    lastGenerated: "Today, 9:30 AM",
    status: "ready",
  },
  {
    id: "users",
    name: "User Analytics",
    description: "User growth and engagement metrics",
    icon: Users,
    lastGenerated: "Yesterday, 3:15 PM",
    status: "ready",
  },
  {
    id: "projects",
    name: "Project Summary",
    description: "Active projects and completion rates",
    icon: FileText,
    lastGenerated: "2 days ago",
    status: "ready",
  },
  {
    id: "time",
    name: "Time Tracking",
    description: "Team hours and productivity analysis",
    icon: Clock,
    lastGenerated: "3 days ago",
    status: "generating",
  },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Reports & Analytics</h1>
          <p className="text-slate-600 mt-1">
            Generate and view detailed business reports
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <Badge className="bg-green-50 text-green-700">+12.5%</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900">$328K</p>
          <p className="text-sm text-slate-600">Total Revenue</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <Badge className="bg-green-50 text-green-700">+8.3%</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900">9,090</p>
          <p className="text-sm text-slate-600">Total Users</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <Badge className="bg-green-50 text-green-700">+15.2%</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900">328</p>
          <p className="text-sm text-slate-600">Projects</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <Badge className="bg-green-50 text-green-700">+5.7%</Badge>
          </div>
          <p className="text-2xl font-bold text-slate-900">1,248h</p>
          <p className="text-sm text-slate-600">Total Hours</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Revenue Trend</h3>
              <p className="text-sm text-slate-600">Monthly revenue over time</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* User Growth Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">User Growth</h3>
              <p className="text-sm text-slate-600">Monthly user acquisition</p>
            </div>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Project Distribution */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Project Distribution</h3>
              <p className="text-sm text-slate-600">By category</p>
            </div>
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
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
        </Card>

        {/* Projects by Month */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold text-slate-900">Projects Completed</h3>
              <p className="text-sm text-slate-600">Monthly completion rate</p>
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="projects" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Available Reports */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Available Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTypes.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{report.name}</h3>
                      <p className="text-sm text-slate-600">{report.description}</p>
                    </div>
                  </div>
                  <Badge variant={report.status === "ready" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-500">Last: {report.lastGenerated}</p>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
