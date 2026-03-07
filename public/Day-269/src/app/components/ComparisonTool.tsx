import { useState } from 'react';
import { GitCompare, TrendingUp, TrendingDown, Minus, X } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ComparisonToolProps {
  onClose: () => void;
}

export function ComparisonTool({ onClose }: ComparisonToolProps) {
  const [comparisonType, setComparisonType] = useState<'time' | 'class'>('time');

  // Mock comparison data
  const timeComparisonData = [
    { week: 'Week 1', period1: 92, period2: 88 },
    { week: 'Week 2', period1: 89, period2: 91 },
    { week: 'Week 3', period1: 91, period2: 87 },
    { week: 'Week 4', period1: 88, period2: 90 },
  ];

  const classComparisonData = [
    { day: 'Mon', classA: 95, classB: 88, classC: 90 },
    { day: 'Tue', classA: 92, classB: 85, classC: 93 },
    { day: 'Wed', classA: 90, classB: 90, classC: 88 },
    { day: 'Thu', classA: 93, classB: 87, classC: 91 },
    { day: 'Fri', classA: 91, classB: 89, classC: 89 },
  ];

  const comparisonMetrics = [
    {
      label: 'Period 1 (Jan)',
      value: 90,
      change: 2,
      color: 'blue',
    },
    {
      label: 'Period 2 (Feb)',
      value: 89,
      change: -1,
      color: 'green',
    },
  ];

  const classMetrics = [
    { label: 'Grade 10-A', value: 92, change: 3, color: 'blue' },
    { label: 'Grade 10-B', value: 88, change: 1, color: 'green' },
    { label: 'Grade 11-A', value: 90, change: -1, color: 'purple' },
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-slate-600" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GitCompare className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-semibold">Attendance Comparison Tool</h2>
                <p className="text-indigo-50">Compare attendance across periods and classes</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Comparison Type Selector */}
          <div className="flex gap-2 mb-6 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setComparisonType('time')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                comparisonType === 'time'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Time Period Comparison
            </button>
            <button
              onClick={() => setComparisonType('class')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                comparisonType === 'class'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Class-wise Comparison
            </button>
          </div>

          {/* Time Period Comparison */}
          {comparisonType === 'time' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Period 1
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>January 2026</option>
                    <option>December 2025</option>
                    <option>November 2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Period 2
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>February 2026</option>
                    <option>January 2026</option>
                    <option>December 2025</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {comparisonMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200"
                  >
                    <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
                    <div className="flex items-end gap-3">
                      <p className="text-4xl font-bold text-slate-900">{metric.value}%</p>
                      <div className="flex items-center gap-1 mb-2">
                        {getTrendIcon(metric.change)}
                        <span
                          className={`text-sm font-medium ${
                            metric.change > 0
                              ? 'text-green-600'
                              : metric.change < 0
                              ? 'text-red-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Trend Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={timeComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#64748b" />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="period1"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="January 2026"
                      dot={{ fill: '#3b82f6', r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="period2"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="February 2026"
                      dot={{ fill: '#10b981', r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Key Insights</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• January had 1% higher average attendance than February</li>
                  <li>• Week 1 showed the strongest performance in January</li>
                  <li>• Week 2 of February showed improvement over January</li>
                  <li>• Overall trend remains stable between both periods</li>
                </ul>
              </div>
            </div>
          )}

          {/* Class-wise Comparison */}
          {comparisonType === 'class' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Classes to Compare
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Grade 10-A', 'Grade 10-B', 'Grade 11-A'].map((cls) => (
                    <label
                      key={cls}
                      className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                    >
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-medium text-slate-700">{cls}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {classMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200"
                  >
                    <p className="text-sm text-slate-600 mb-2">{metric.label}</p>
                    <div className="flex items-end gap-3">
                      <p className="text-3xl font-bold text-slate-900">{metric.value}%</p>
                      <div className="flex items-center gap-1 mb-1">
                        {getTrendIcon(metric.change)}
                        <span
                          className={`text-sm font-medium ${
                            metric.change > 0
                              ? 'text-green-600'
                              : metric.change < 0
                              ? 'text-red-600'
                              : 'text-slate-600'
                          }`}
                        >
                          {Math.abs(metric.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Class Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={classComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#64748b" />
                    <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="classA" fill="#3b82f6" name="Grade 10-A" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="classB" fill="#10b981" name="Grade 10-B" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="classC" fill="#8b5cf6" name="Grade 11-A" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Key Insights</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Grade 10-A maintains highest average attendance at 92%</li>
                  <li>• Grade 10-B shows consistent improvement this week</li>
                  <li>• Wednesday had the lowest attendance across all classes</li>
                  <li>• Grade 11-A shows stable performance throughout the week</li>
                </ul>
              </div>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-md"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
