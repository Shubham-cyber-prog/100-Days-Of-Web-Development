import { Code2, TrendingUp, Clock, Star } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  tags: string[];
  favorite: boolean;
  updatedAt: Date;
  description?: string;
}

interface DashboardProps {
  snippets: Snippet[];
  onSnippetClick: (snippet: Snippet) => void;
}

export function Dashboard({ snippets, onSnippetClick }: DashboardProps) {
  // Calculate language statistics
  const languageStats = snippets.reduce((acc, snippet) => {
    acc[snippet.language] = (acc[snippet.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(languageStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Get recent snippets
  const recentSnippets = [...snippets]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 5);

  const stats = [
    {
      label: 'Total Snippets',
      value: snippets.length,
      icon: Code2,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Favorites',
      value: snippets.filter((s) => s.favorite).length,
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Languages',
      value: Object.keys(languageStats).length,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'This Week',
      value: snippets.filter(
        (s) => new Date().getTime() - s.updatedAt.getTime() < 7 * 24 * 60 * 60 * 1000
      ).length,
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-semibold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Language Chart */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <h3 className="text-white text-lg mb-4">Most Used Languages</h3>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e1e1e',
                    border: '1px solid #2d2d2d',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No data yet
            </div>
          )}
        </div>

        {/* Recent Snippets */}
        <div className="bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg p-6">
          <h3 className="text-white text-lg mb-4">Recently Updated</h3>
          {recentSnippets.length > 0 ? (
            <div className="space-y-3">
              {recentSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  onClick={() => onSnippetClick(snippet)}
                  className="bg-[#0d0d0d] border border-[#2d2d2d] rounded-lg p-3 hover:border-[#3d3d3d] transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-white text-sm font-medium">{snippet.title}</h4>
                    {snippet.favorite && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-0.5 bg-[#2d2d2d] rounded">
                      {snippet.language}
                    </span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>{formatDistanceToNow(snippet.updatedAt, { addSuffix: true })}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-gray-500">
              No snippets yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
