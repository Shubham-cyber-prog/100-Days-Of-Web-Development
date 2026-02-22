import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Calendar, FileCode, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockReviews } from '../data/mockData';
import { Link } from 'react-router';

export function History() {
  const [searchQuery, setSearchQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20';
    if (score >= 75) return 'text-info bg-info/10 border-info/20';
    if (score >= 60) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-destructive bg-destructive/10 border-destructive/20';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Review History</h1>
        <p className="text-muted-foreground mt-1">
          Browse and manage past code reviews
        </p>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search files or reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Languages" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Go">Go</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-3">
        {mockReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/review/${review.id}`}>
              <Card className="border-border bg-card hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* File Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <FileCode className="h-6 w-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {review.fileName}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {review.language}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(review.timestamp)}
                            </span>
                          </div>
                        </div>

                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Quality Score</div>
                          <Badge className={`text-sm font-semibold ${getScoreColor(review.qualityScore)}`}>
                            {review.qualityScore}/100
                          </Badge>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Issues Found</div>
                          <div className="text-sm font-semibold">
                            {review.issuesFound}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Security Alerts</div>
                          <div className="text-sm font-semibold">
                            {review.securityAlerts > 0 ? (
                              <span className="text-destructive">{review.securityAlerts}</span>
                            ) : (
                              <span className="text-[#10b981]">0</span>
                            )}
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Status</div>
                          <Badge 
                            variant={review.status === 'completed' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {review.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no results) */}
      {mockReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="border-border bg-card">
            <CardContent className="py-12 text-center">
              <FileCode className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews found</h3>
              <p className="text-muted-foreground mb-6">
                Start by uploading code for analysis
              </p>
              <Link to="/upload">
                <Button>Upload Code</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}