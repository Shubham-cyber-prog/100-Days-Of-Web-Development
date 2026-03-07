import { TrendingUp, Activity, Target, Zap } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { motion } from 'motion/react';

interface PerformanceData {
  date: string;
  detections: number;
  accuracy: number;
  avgTime: number;
}

export function PerformanceAnalytics() {
  // Mock performance data over time
  const performanceData: PerformanceData[] = [
    { date: 'Mon', detections: 45, accuracy: 94, avgTime: 1.2 },
    { date: 'Tue', detections: 62, accuracy: 96, avgTime: 1.1 },
    { date: 'Wed', detections: 53, accuracy: 95, avgTime: 1.3 },
    { date: 'Thu', detections: 78, accuracy: 97, avgTime: 1.0 },
    { date: 'Fri', detections: 91, accuracy: 98, avgTime: 0.9 },
    { date: 'Sat', detections: 67, accuracy: 96, avgTime: 1.1 },
    { date: 'Sun', detections: 54, accuracy: 95, avgTime: 1.2 },
  ];

  const categoryData = [
    { name: 'Person', count: 234, color: '#06b6d4' },
    { name: 'Vehicle', count: 189, color: '#a855f7' },
    { name: 'Animal', count: 156, color: '#ec4899' },
    { name: 'Object', count: 312, color: '#10b981' },
    { name: 'Food', count: 98, color: '#f59e0b' },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-xl border border-purple-500/20 rounded-lg p-3">
          <p className="text-white font-semibold mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {entry.name === 'Accuracy' ? '%' : entry.name === 'Avg Time' ? 's' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Activity className="w-6 h-6 text-cyan-400" />
          </div>
          Performance Analytics
        </h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: 'Total This Week',
              value: '490',
              change: '+12.5%',
              icon: TrendingUp,
              color: 'cyan',
            },
            {
              label: 'Avg Accuracy',
              value: '96.2%',
              change: '+2.3%',
              icon: Target,
              color: 'purple',
            },
            {
              label: 'Avg Speed',
              value: '1.1s',
              change: '-0.2s',
              icon: Zap,
              color: 'pink',
            },
            {
              label: 'Peak Day',
              value: 'Friday',
              change: '91 scans',
              icon: Activity,
              color: 'green',
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-br from-${stat.color}-500/10 to-${stat.color}-500/5 border border-${stat.color}-500/20 rounded-xl p-4`}
              >
                <Icon className={`w-5 h-5 text-${stat.color}-400 mb-2`} />
                <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-green-400 text-xs font-medium">{stat.change}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Detection Trends Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Detection Trends (7 Days)
          </h3>
          <div className="bg-black/40 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorDetections" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="detections"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#colorDetections)"
                  name="Detections"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Accuracy & Speed Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" />
            Accuracy & Processing Time
          </h3>
          <div className="bg-black/40 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis yAxisId="left" stroke="#a855f7" fontSize={12} />
                <YAxis yAxisId="right" orientation="right" stroke="#ec4899" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7', r: 4 }}
                  name="Accuracy"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgTime"
                  stroke="#ec4899"
                  strokeWidth={2}
                  dot={{ fill: '#ec4899', r: 4 }}
                  name="Avg Time"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Detection by Category
          </h3>
          <div className="bg-black/40 rounded-xl p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} name="Detections">
                  {categoryData.map((entry, index) => (
                    <motion.rect
                      key={index}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      fill={entry.color}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-4">📊 Key Insights</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 mt-2" />
            <p className="text-gray-300">
              <span className="text-green-400 font-semibold">Peak performance</span> on
              Friday with 91 detections and 98% accuracy
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2" />
            <p className="text-gray-300">
              <span className="text-cyan-400 font-semibold">Processing speed</span>{' '}
              improved by 25% over the past week
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-purple-400 mt-2" />
            <p className="text-gray-300">
              <span className="text-purple-400 font-semibold">Most detected:</span>{' '}
              Objects category with 312 detections
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
