import { TrendingUp, Clock, FileText, Zap, Calendar, BarChart3, PieChart, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AdvancedAnalytics() {
  const monthlyData = [
    { month: 'Jan', documents: 12, timeSaved: 8 },
    { month: 'Feb', documents: 19, timeSaved: 14 },
    { month: 'Mar', documents: 15, timeSaved: 11 },
    { month: 'Apr', documents: 23, timeSaved: 16 },
    { month: 'May', documents: 28, timeSaved: 20 },
    { month: 'Jun', documents: 25, timeSaved: 18 },
  ];

  const documentTypeData = [
    { name: 'Business Reports', value: 35, color: '#8b5cf6' },
    { name: 'Academic Papers', value: 25, color: '#3b82f6' },
    { name: 'Legal Documents', value: 20, color: '#6366f1' },
    { name: 'Technical Docs', value: 15, color: '#a855f7' },
    { name: 'Other', value: 5, color: '#c084fc' },
  ];

  const weeklyActivity = [
    { day: 'Mon', summaries: 4 },
    { day: 'Tue', summaries: 6 },
    { day: 'Wed', summaries: 5 },
    { day: 'Thu', summaries: 8 },
    { day: 'Fri', summaries: 7 },
    { day: 'Sat', summaries: 2 },
    { day: 'Sun', summaries: 1 },
  ];

  const performanceMetrics = [
    { metric: 'Avg Compression Rate', value: '93%', trend: '+2.3%', icon: TrendingUp, color: 'text-green-600' },
    { metric: 'Avg Processing Time', value: '2.4s', trend: '-0.8s', icon: Zap, color: 'text-blue-600' },
    { metric: 'Total Pages Processed', value: '5,847', trend: '+1,234', icon: FileText, color: 'text-purple-600' },
    { metric: 'Peak Usage Day', value: 'Thursday', trend: '8 docs', icon: Calendar, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Advanced Analytics</h1>
        <p className="text-muted-foreground">Detailed insights into your document summarization usage</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.metric}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <Icon className={`w-5 h-5 ${item.color}`} />
                <span className="px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                  {item.trend}
                </span>
              </div>
              <p className="text-3xl font-semibold mb-1">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.metric}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold mb-1">Usage Trend</h3>
              <p className="text-sm text-muted-foreground">Documents processed over time</p>
            </div>
            <BarChart3 className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorDocuments" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="documents" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorDocuments)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Document Types Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold mb-1">Document Types</h3>
              <p className="text-sm text-muted-foreground">Distribution by category</p>
            </div>
            <PieChart className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={documentTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
              >
                {documentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
            </RePieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {documentTypeData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2 bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold mb-1">Weekly Activity</h3>
              <p className="text-sm text-muted-foreground">This week's usage pattern</p>
            </div>
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px'
                }}
              />
              <Bar dataKey="summaries" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Time Saved Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 border border-border shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold mb-1">Time Saved</h3>
              <p className="text-sm text-muted-foreground">This month</p>
            </div>
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div className="space-y-4">
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-4" style={{
                background: 'linear-gradient(135deg, var(--gradient-from) 0%, var(--gradient-to) 100%)'
              }}>
                <span className="text-3xl font-semibold text-white">52</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Hours Saved</p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50">
                <span className="text-sm">Avg per document</span>
                <span className="font-semibold text-purple-600">~24 min</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50">
                <span className="text-sm">This week</span>
                <span className="font-semibold text-blue-600">12 hrs</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-50">
                <span className="text-sm">Best streak</span>
                <span className="font-semibold text-green-600">7 days</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">📊 Monthly Insights</h3>
            <ul className="space-y-2 text-purple-100">
              <li>• You've processed <strong className="text-white">23 documents</strong> this month, a 15% increase from last month</li>
              <li>• Your most productive day is <strong className="text-white">Thursday</strong> with an average of 8 summaries</li>
              <li>• You're saving <strong className="text-white">~24 minutes</strong> per document on average</li>
              <li>• <strong className="text-white">Business Reports</strong> are your most frequently summarized document type</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
