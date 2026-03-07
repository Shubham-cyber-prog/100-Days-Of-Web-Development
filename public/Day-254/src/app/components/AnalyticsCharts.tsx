import { Card } from './ui/card';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Subscription } from '../types/subscription';

interface AnalyticsChartsProps {
  subscriptions: Subscription[];
}

export function AnalyticsCharts({ subscriptions }: AnalyticsChartsProps) {
  // Monthly spending data
  const monthlyData = [
    { month: 'Sep', amount: 142.50 },
    { month: 'Oct', amount: 138.20 },
    { month: 'Nov', amount: 145.80 },
    { month: 'Dec', amount: 152.40 },
    { month: 'Jan', amount: 149.90 },
    { month: 'Feb', amount: subscriptions.reduce((sum, sub) => 
      sum + (sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12), 0
    ) },
  ];

  // Category breakdown
  const categoryData = subscriptions.reduce((acc, sub) => {
    const cost = sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12;
    const existing = acc.find(item => item.name === sub.category);
    if (existing) {
      existing.value += cost;
    } else {
      acc.push({ name: sub.category, value: cost });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            />
            <Line 
              type="monotone" 
              dataKey="amount" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Spending by Category</h3>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
