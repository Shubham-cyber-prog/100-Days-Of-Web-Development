import { Card } from "../components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { monthlySpending, categoryBreakdown } from "../data/mockData";

export default function Reports() {
  const totalSpending = monthlySpending.reduce((sum, item) => sum + item.amount, 0);
  const avgMonthlySpending = totalSpending / monthlySpending.length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-gray-600">Visualize your spending patterns and trends</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Total Spending (7 months)</p>
          <p className="text-3xl font-bold text-gray-900">${totalSpending.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Average Monthly Spending</p>
          <p className="text-3xl font-bold text-emerald-600">${avgMonthlySpending.toFixed(2)}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-gray-600 mb-2">Most Expensive Month</p>
          <p className="text-3xl font-bold text-blue-600">
            ${Math.max(...monthlySpending.map(m => m.amount)).toFixed(2)}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Spending Trend */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spending']}
              />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Category Details */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={categoryBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
              {categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
