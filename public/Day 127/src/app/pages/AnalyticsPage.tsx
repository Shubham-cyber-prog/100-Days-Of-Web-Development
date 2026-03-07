import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Heart, Eye, MessageCircle, Share2 } from 'lucide-react';

export default function AnalyticsPage() {
  // Mock analytics data
  const engagementData = [
    { name: 'Mon', likes: 245, comments: 67, shares: 34 },
    { name: 'Tue', likes: 312, comments: 89, shares: 45 },
    { name: 'Wed', likes: 189, comments: 54, shares: 28 },
    { name: 'Thu', likes: 421, comments: 102, shares: 67 },
    { name: 'Fri', likes: 378, comments: 95, shares: 56 },
    { name: 'Sat', likes: 492, comments: 124, shares: 78 },
    { name: 'Sun', likes: 356, comments: 87, shares: 49 },
  ];

  const followerGrowth = [
    { name: 'Week 1', followers: 2100 },
    { name: 'Week 2', followers: 2234 },
    { name: 'Week 3', followers: 2389 },
    { name: 'Week 4', followers: 2543 },
  ];

  const contentTypeData = [
    { name: 'Images', value: 45 },
    { name: 'Text', value: 30 },
    { name: 'Videos', value: 15 },
    { name: 'Polls', value: 10 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];

  const stats = [
    { icon: Eye, label: 'Total Views', value: '12.4K', change: '+12.5%', color: 'text-blue-500' },
    { icon: Heart, label: 'Total Likes', value: '3.2K', change: '+8.2%', color: 'text-red-500' },
    { icon: MessageCircle, label: 'Total Comments', value: '892', change: '+15.3%', color: 'text-green-500' },
    { icon: Users, label: 'New Followers', value: '154', change: '+6.7%', color: 'text-purple-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="size-6 text-primary" />
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <stat.icon className={`size-8 ${stat.color}`} />
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="engagement" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Weekly Engagement Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="likes" fill="#6366f1" />
                <Bar dataKey="comments" fill="#8b5cf6" />
                <Bar dataKey="shares" fill="#ec4899" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#6366f1]" />
                <span className="text-sm">Likes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#8b5cf6]" />
                <span className="text-sm">Comments</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#ec4899]" />
                <span className="text-sm">Shares</span>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Follower Growth Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={followerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="followers" stroke="#6366f1" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Content Type Distribution</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={contentTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Performing Posts */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Performing Posts</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors">
              <img
                src={`https://images.unsplash.com/photo-150000000${index}000?w=120&h=120&fit=crop`}
                alt="Post"
                className="size-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-medium line-clamp-2">
                  Amazing sunset shoot from last week! The golden hour never disappoints.
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4" /> {1234 + index * 100}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4" /> {56 + index * 10}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="size-4" /> {23 + index * 5}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{89 + index * 5}%</p>
                <p className="text-sm text-muted-foreground">Engagement</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
