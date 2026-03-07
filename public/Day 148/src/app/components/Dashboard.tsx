import { FileText, Clock, TrendingUp, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Documents Processed', value: '124', icon: FileText, color: 'from-purple-500 to-purple-600' },
    { label: 'Hours Saved', value: '42', icon: Clock, color: 'from-blue-500 to-blue-600' },
    { label: 'Avg. Compression', value: '78%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'This Month', value: '23', icon: Zap, color: 'from-orange-500 to-orange-600' },
  ];

  const recentSummaries = [
    {
      id: 1,
      title: 'Q4 Financial Report 2025',
      date: '2 hours ago',
      length: '45 pages → 2 pages',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Product Requirements Document',
      date: '5 hours ago',
      length: '32 pages → 3 pages',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Market Research Analysis',
      date: 'Yesterday',
      length: '67 pages → 4 pages',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Legal Contract Review',
      date: '2 days ago',
      length: '89 pages → 5 pages',
      status: 'completed'
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Welcome back, John! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your documents today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-3xl font-semibold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-semibold mb-2">Ready to summarize a new document?</h2>
          <p className="text-purple-100 mb-6">Upload your PDF, DOCX, or TXT file and get an AI-powered summary in seconds.</p>
          <button
            onClick={() => onNavigate('upload')}
            className="px-6 py-3 bg-white text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-colors flex items-center gap-2"
          >
            Upload Document
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Recent Summaries */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Summaries</h2>
          <button
            onClick={() => onNavigate('history')}
            className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid gap-4">
          {recentSummaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1 group-hover:text-purple-600 transition-colors">
                      {summary.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{summary.date}</span>
                      <span>•</span>
                      <span>{summary.length}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                    Completed
                  </span>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
