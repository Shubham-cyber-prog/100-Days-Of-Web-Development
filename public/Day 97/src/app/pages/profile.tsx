import { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Calendar,
  Settings,
  FileText,
  MessageSquare,
  Heart,
  Award,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Separator } from "../components/ui/separator";

const userProfile = {
  name: "John Doe",
  email: "john@community.hub",
  location: "Downtown District, Block 5",
  joinDate: "January 15, 2024",
  avatar: "",
  initials: "JD",
  bio: "Community advocate passionate about making our neighborhood a better place for everyone.",
  stats: {
    issuesReported: 12,
    postsCreated: 8,
    commentsPosted: 34,
    eventsAttended: 5,
  },
  badges: [
    { id: "1", name: "Early Adopter", icon: "🏆", description: "Joined in first month" },
    { id: "2", name: "Active Reporter", icon: "📝", description: "Reported 10+ issues" },
    { id: "3", name: "Community Helper", icon: "🤝", description: "50+ helpful comments" },
  ],
};

const recentActivity = [
  {
    id: "1",
    type: "issue",
    title: "Reported: Broken streetlight on Oak Avenue",
    description: "Infrastructure issue in Block 3",
    time: "2 hours ago",
    status: "In Progress",
  },
  {
    id: "2",
    type: "comment",
    title: "Commented on: Community Cleanup Drive",
    description: "Great initiative! I'll be there.",
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "post",
    title: "Posted: Tips for Winter Preparedness",
    description: "Shared helpful tips for the community",
    time: "1 day ago",
    likes: 12,
  },
  {
    id: "4",
    type: "event",
    title: "Registered for: Town Hall Meeting",
    description: "March 15, 2026 at 6:00 PM",
    time: "2 days ago",
  },
];

const myIssues = [
  {
    id: "1",
    title: "Broken streetlight on Oak Avenue",
    status: "In Progress",
    priority: "High",
    reportedAt: "2 hours ago",
    comments: 5,
  },
  {
    id: "2",
    title: "Graffiti on park bench",
    status: "Resolved",
    priority: "Low",
    reportedAt: "1 week ago",
    comments: 3,
  },
  {
    id: "3",
    title: "Sidewalk crack near school",
    status: "Open",
    priority: "Medium",
    reportedAt: "2 weeks ago",
    comments: 2,
  },
];

const myPosts = [
  {
    id: "1",
    title: "Tips for Winter Preparedness",
    excerpt: "Here are some helpful tips to prepare for the winter season...",
    likes: 12,
    comments: 4,
    createdAt: "1 day ago",
  },
  {
    id: "2",
    title: "Great turnout at last week's meeting",
    excerpt: "Thank you everyone who attended! Here's a summary...",
    likes: 18,
    comments: 7,
    createdAt: "1 week ago",
  },
];

const activityIcons = {
  issue: FileText,
  comment: MessageSquare,
  post: MessageSquare,
  event: Calendar,
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-info text-info-foreground";
    case "In Progress":
      return "bg-warning text-warning-foreground";
    case "Resolved":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-error text-error-foreground";
    case "Medium":
      return "bg-warning text-warning-foreground";
    case "Low":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Profile</h1>
          <p className="text-muted-foreground">Manage your account and view your activity</p>
        </div>
        <Button className="gap-2">
          <Settings className="size-4" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="size-24 shrink-0">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="text-2xl">{userProfile.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{userProfile.name}</h2>
                <p className="text-muted-foreground">{userProfile.bio}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  {userProfile.email}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  {userProfile.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  Joined {userProfile.joinDate}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Issues Reported</p>
                <p className="text-2xl font-semibold mt-1">{userProfile.stats.issuesReported}</p>
              </div>
              <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="size-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Posts Created</p>
                <p className="text-2xl font-semibold mt-1">{userProfile.stats.postsCreated}</p>
              </div>
              <div className="size-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Comments Posted</p>
                <p className="text-2xl font-semibold mt-1">{userProfile.stats.commentsPosted}</p>
              </div>
              <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MessageSquare className="size-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Events Attended</p>
                <p className="text-2xl font-semibold mt-1">{userProfile.stats.eventsAttended}</p>
              </div>
              <div className="size-12 rounded-full bg-info/10 flex items-center justify-center">
                <Calendar className="size-6 text-info" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="size-5" />
            Badges & Achievements
          </CardTitle>
          <CardDescription>Recognition for your community contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProfile.badges.map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
              >
                <div className="text-3xl">{badge.icon}</div>
                <div>
                  <p className="font-medium">{badge.name}</p>
                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
          <CardDescription>Your recent contributions and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="issues">My Issues</TabsTrigger>
              <TabsTrigger value="posts">My Posts</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4 mt-6">
              {recentActivity.map((activity, index) => {
                const Icon = activityIcons[activity.type as keyof typeof activityIcons];
                return (
                  <div key={activity.id}>
                    {index > 0 && <Separator className="mb-4" />}
                    <div className="flex gap-4">
                      <div className="size-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                        <Icon className="size-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                          {activity.status && (
                            <Badge
                              className={getStatusColor(activity.status)}
                              variant="secondary"
                            >
                              {activity.status}
                            </Badge>
                          )}
                          {activity.likes && (
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Heart className="size-3" />
                              {activity.likes}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="issues" className="space-y-3 mt-6">
              {myIssues.map((issue) => (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-2">{issue.title}</h4>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getStatusColor(issue.status)} variant="secondary">
                            {issue.status}
                          </Badge>
                          <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                            {issue.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{issue.reportedAt}</span>
                          <span>{issue.comments} comments</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="posts" className="space-y-3 mt-6">
              {myPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium mb-2">{post.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.createdAt}</span>
                          <span className="flex items-center gap-1">
                            <Heart className="size-3" />
                            {post.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="size-3" />
                            {post.comments}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
