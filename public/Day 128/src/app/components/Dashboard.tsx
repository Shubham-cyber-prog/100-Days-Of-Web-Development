import {
  BarChart3,
  Target,
  Zap,
  TrendingUp,
  Activity,
  Cpu,
} from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const stats = [
    {
      label: 'Total Scans',
      value: '1,247',
      change: '+12.5%',
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-500/10 to-blue-500/10',
    },
    {
      label: 'Accuracy Rate',
      value: '98.7%',
      change: '+2.3%',
      icon: Target,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/10 to-pink-500/10',
    },
    {
      label: 'Avg Speed',
      value: '1.2s',
      change: '-0.3s',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-500/10 to-orange-500/10',
    },
    {
      label: 'Objects Detected',
      value: '3,492',
      change: '+234',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/10 to-emerald-500/10',
    },
  ];

  const recentActivity = [
    { time: '2 min ago', action: 'Detected 3 objects in image_001.jpg', confidence: 95 },
    { time: '5 min ago', action: 'Camera detection started', confidence: 0 },
    { time: '12 min ago', action: 'Detected 5 objects in uploaded image', confidence: 92 },
    { time: '23 min ago', action: 'Model updated to v2.1.0', confidence: 0 },
    { time: '1 hour ago', action: 'Detected 2 objects in camera feed', confidence: 88 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to AI Vision
          </h1>
          <p className="text-gray-300 text-lg">
            Advanced image recognition powered by TensorFlow.js
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-xl group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Cpu className="w-6 h-6 text-cyan-400" />
            System Status
          </h2>

          <div className="space-y-4">
            {[
              { label: 'Model Status', value: 'Active', status: 'success' },
              { label: 'API Connection', value: 'Connected', status: 'success' },
              { label: 'Processing Queue', value: '3 items', status: 'warning' },
              { label: 'Storage Used', value: '45.2 MB', status: 'info' },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/10 rounded-xl"
              >
                <span className="text-gray-300">{item.label}</span>
                <span
                  className={`font-medium ${
                    item.status === 'success'
                      ? 'text-green-400'
                      : item.status === 'warning'
                      ? 'text-yellow-400'
                      : 'text-cyan-400'
                  }`}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Activity className="w-6 h-6 text-cyan-400" />
            Recent Activity
          </h2>

          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 border border-purple-500/10 rounded-xl hover:border-cyan-500/30 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-gray-300 text-sm">{activity.action}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-gray-500 text-xs">{activity.time}</span>
                    {activity.confidence > 0 && (
                      <span className="text-cyan-400 text-xs font-medium">
                        {activity.confidence}% confidence
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
