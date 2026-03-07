import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, Upload, GitBranch, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { activityData, chartData } from '../data/mockData';
import { Link } from 'react-router';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor your code quality and reviews
          </p>
        </div>
        <Link to="/upload">
          <Button className="gap-2 w-full sm:w-auto">
            <Upload className="h-4 w-4" />
            Upload Code
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <Card className="border-border bg-card hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Reviews
              </CardTitle>
              <Clock className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                +2 from yesterday
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-border bg-card hover:border-destructive/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Issues Found
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">12</div>
              <p className="text-xs text-muted-foreground mt-1">
                -5 from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-border bg-card hover:border-warning/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Security Alerts
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">2</div>
              <p className="text-xs text-muted-foreground mt-1">
                Critical priority
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="border-border bg-card hover:border-[#10b981]/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Code Quality
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#10b981]" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">85%</div>
              <p className="text-xs text-muted-foreground mt-1">
                +12% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quality Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Code Quality Trend</CardTitle>
              <CardDescription>Your code quality score over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2438" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#8891b2"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#8891b2"
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#12172a',
                      border: '1px solid #1e2438',
                      borderRadius: '8px',
                      color: '#e4e7f0'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    strokeWidth={2}
                    dot={{ fill: '#6366f1', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest code reviews and analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityData.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 pb-4 last:pb-0 border-b border-border last:border-0"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.file}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="outline" className="text-xs">
                        Score: {activity.score}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with code analysis</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Link to="/upload" className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="h-auto w-full flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5">
                  <Upload className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Upload Code</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Upload files for review
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Link>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="outline" className="h-auto w-full flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5">
                <GitBranch className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-semibold">Connect Repo</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Link GitHub/GitLab
                  </div>
                </div>
              </Button>
            </motion.div>

            <Link to="/review/1" className="block">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="outline" className="h-auto w-full flex-col gap-3 py-6 hover:border-primary hover:bg-primary/5">
                  <Play className="h-8 w-8 text-primary" />
                  <div>
                    <div className="font-semibold">Start Review</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Analyze recent code
                    </div>
                  </div>
                </Button>
              </motion.div>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}