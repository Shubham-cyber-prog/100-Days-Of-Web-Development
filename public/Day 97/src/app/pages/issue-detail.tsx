import { Link, useParams } from "react-router";
import { ArrowLeft, MapPin, MoreHorizontal, CheckCircle2, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Comments } from "../components/comments";
import { Separator } from "../components/ui/separator";

const mockIssue = {
  id: "1",
  title: "Broken streetlight on Oak Avenue",
  description:
    "The streetlight near house #45 has been out for 3 days, making the area unsafe at night. This is a significant safety concern for residents walking in the evening. The light appears to be completely non-functional and may need electrical repairs or bulb replacement.",
  category: "Infrastructure",
  priority: "High",
  status: "In Progress",
  location: "Oak Avenue, Block 3",
  reporter: {
    name: "John Doe",
    avatar: "",
    initials: "JD",
    email: "john@community.hub",
  },
  reportedAt: "March 7, 2026 at 2:30 PM",
  updatedAt: "March 7, 2026 at 4:15 PM",
  assignedTo: "Public Works Dept.",
  assignedUser: {
    name: "Sarah Miller",
    avatar: "",
    initials: "SM",
  },
  image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800",
  timeline: [
    {
      id: "1",
      type: "created",
      message: "Issue reported",
      user: "John Doe",
      timestamp: "March 7, 2026 at 2:30 PM",
    },
    {
      id: "2",
      type: "assigned",
      message: "Assigned to Public Works Dept.",
      user: "Admin",
      timestamp: "March 7, 2026 at 3:00 PM",
    },
    {
      id: "3",
      type: "status_change",
      message: "Status changed to In Progress",
      user: "Sarah Miller",
      timestamp: "March 7, 2026 at 4:15 PM",
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open":
      return "bg-info text-info-foreground";
    case "In Progress":
      return "bg-warning text-warning-foreground";
    case "Assigned":
      return "bg-secondary text-secondary-foreground";
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

export function IssueDetailPage() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/app/issues">
            <ArrowLeft className="size-5" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Link to="/app/issues" className="hover:text-foreground">
              Issues
            </Link>
            <span>/</span>
            <span>#{id}</span>
          </div>
          <h1 className="text-2xl font-semibold">{mockIssue.title}</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit Issue</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Reassign</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={getStatusColor(mockIssue.status)} variant="secondary">
                  {mockIssue.status}
                </Badge>
                <Badge className={getPriorityColor(mockIssue.priority)} variant="secondary">
                  {mockIssue.priority} Priority
                </Badge>
                <Badge variant="outline">{mockIssue.category}</Badge>
              </div>

              {mockIssue.image && (
                <img
                  src={mockIssue.image}
                  alt={mockIssue.title}
                  className="w-full rounded-lg"
                />
              )}

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{mockIssue.description}</p>
              </div>

              <Separator />

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                <span>{mockIssue.location}</span>
              </div>
            </CardContent>
          </Card>

          <Comments />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-3">Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Reported by</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarImage src={mockIssue.reporter.avatar} alt={mockIssue.reporter.name} />
                        <AvatarFallback className="text-xs">
                          {mockIssue.reporter.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{mockIssue.reporter.name}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Assigned to</p>
                    {mockIssue.assignedUser ? (
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                          <AvatarImage
                            src={mockIssue.assignedUser.avatar}
                            alt={mockIssue.assignedUser.name}
                          />
                          <AvatarFallback className="text-xs">
                            {mockIssue.assignedUser.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{mockIssue.assignedUser.name}</p>
                          <p className="text-xs text-muted-foreground">{mockIssue.assignedTo}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="font-medium">{mockIssue.assignedTo}</p>
                    )}
                  </div>

                  <Separator />

                  <div>
                    <p className="text-muted-foreground mb-1">Reported</p>
                    <p className="font-medium">{mockIssue.reportedAt}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-1">Last updated</p>
                    <p className="font-medium">{mockIssue.updatedAt}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Timeline</h3>
              <div className="space-y-4">
                {mockIssue.timeline.map((event, index) => (
                  <div key={event.id} className="flex gap-3">
                    <div className="relative">
                      <div
                        className={`size-8 rounded-full flex items-center justify-center ${
                          event.type === "created"
                            ? "bg-primary/10 text-primary"
                            : event.type === "status_change"
                            ? "bg-success/10 text-success"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {event.type === "status_change" ? (
                          <CheckCircle2 className="size-4" />
                        ) : (
                          <Clock className="size-4" />
                        )}
                      </div>
                      {index < mockIssue.timeline.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-px h-6 bg-border" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium">{event.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {event.user} • {event.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
