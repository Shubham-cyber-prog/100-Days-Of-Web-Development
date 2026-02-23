import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { StatusBadge } from "../components/status-badge";
import { AlertBanner } from "../components/alert-banner";
import { ConfidenceScore } from "../components/confidence-score";
import { LoadingSpinner } from "../components/loading-spinner";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Progress } from "../components/ui/progress";
import { Switch } from "../components/ui/switch";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Separator } from "../components/ui/separator";

export default function Components() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Components Library</h1>
        <p className="text-muted-foreground">
          Reusable components for the content moderation dashboard
        </p>
      </div>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button disabled>Disabled</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button className="gap-2">
              <Shield className="w-4 h-4" />
              With Icon
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <StatusBadge status="pending" />
            <StatusBadge status="approved" />
            <StatusBadge status="rejected" />
            <StatusBadge status="escalated" />
            <StatusBadge status="flagged" />
            <StatusBadge status="safe" />
            <StatusBadge status="review" />
          </div>
          
          <Separator className="my-6" />
          
          <h4 className="mb-3">Regular Badges</h4>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge className="bg-green-100 text-green-700">Custom</Badge>
            <Badge className="bg-purple-100 text-purple-700">Custom 2</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Alert Banners */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Banners</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <AlertBanner
            variant="success"
            icon={CheckCircle}
            title="Success"
            description="Your settings have been saved successfully."
          />
          <AlertBanner
            variant="warning"
            icon={AlertTriangle}
            title="Warning"
            description="High volume of pending reviews detected. Consider adding more moderators."
          />
          <AlertBanner
            variant="error"
            icon={XCircle}
            title="Error"
            description="Failed to process content. Please try again."
          />
          <AlertBanner
            variant="info"
            icon={Info}
            title="Information"
            description="System maintenance scheduled for tonight at 2 AM EST."
            action={
              <Button size="sm" variant="outline">
                Learn More
              </Button>
            }
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confidence Score */}
        <Card>
          <CardHeader>
            <CardTitle>Confidence Score Meters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ConfidenceScore score={94} label="High Confidence" />
            <ConfidenceScore score={78} label="Medium Confidence" />
            <ConfidenceScore score={52} label="Low Confidence" />
            <ConfidenceScore score={28} label="Very Low" showBadge={false} />
          </CardContent>
        </Card>

        {/* Loading States */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <LoadingSpinner size="sm" text="Processing..." />
            <LoadingSpinner size="md" text="Analyzing content..." />
            <LoadingSpinner size="lg" />
          </CardContent>
        </Card>
      </div>

      {/* Form Elements */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm mb-2 block">Default Input</label>
                <Input placeholder="Enter text..." />
              </div>
              <div>
                <label className="text-sm mb-2 block">Disabled Input</label>
                <Input placeholder="Disabled" disabled />
              </div>
              <div>
                <label className="text-sm mb-2 block">With Icon</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Enable notifications</span>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-approve safe content</span>
                <Switch defaultChecked />
              </div>
              <div>
                <label className="text-sm mb-2 block">Progress Bar</label>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Cards */}
      <Card>
        <CardHeader>
          <CardTitle>User Display Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "John Doe", role: "Admin", status: "online" },
              { name: "Sarah Miller", role: "Moderator", status: "away" },
              { name: "Alex Chen", role: "Viewer", status: "offline" },
            ].map((user) => (
              <div
                key={user.name}
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.role}
                  </div>
                </div>
                <Badge variant="outline">{user.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stat Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Stat Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "Total Flagged",
                value: "1,247",
                trend: "+12.5%",
                icon: AlertTriangle,
                color: "text-orange-500",
                bgColor: "bg-orange-50",
              },
              {
                label: "Accuracy Rate",
                value: "94.2%",
                trend: "+2.1%",
                icon: CheckCircle,
                color: "text-green-500",
                bgColor: "bg-green-50",
              },
              {
                label: "Avg Response",
                value: "2.3 min",
                trend: "-15%",
                icon: TrendingUp,
                color: "text-blue-500",
                bgColor: "bg-blue-50",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-lg border border-border"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </div>
                    <div className="text-2xl">{stat.value}</div>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">{stat.trend}</span>
                  <span className="text-muted-foreground">vs last week</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
