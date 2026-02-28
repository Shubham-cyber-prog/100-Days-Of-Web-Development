import { useState } from "react";
import { Plus, MapPin, Upload, Filter, Search, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { toast } from "sonner";

const issues = [
  {
    id: 1,
    title: "Broken streetlight on Oak Avenue",
    description: "The streetlight near house #45 has been out for 3 days, making the area unsafe at night.",
    category: "Infrastructure",
    priority: "High",
    status: "In Progress",
    location: "Oak Avenue, Block 3",
    reporter: { name: "John Doe", avatar: "JD" },
    reportedAt: "2 hours ago",
    assignedTo: "Public Works Dept.",
    comments: 5,
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=400",
  },
  {
    id: 2,
    title: "Pothole near community center",
    description: "Large pothole forming near the entrance, could damage vehicles.",
    category: "Infrastructure",
    priority: "Medium",
    status: "Open",
    location: "Main Street",
    reporter: { name: "Sarah Miller", avatar: "SM" },
    reportedAt: "5 hours ago",
    comments: 3,
    image: "https://images.unsplash.com/photo-1625890044806-b4b0b2a3d9fc?w=400",
  },
  {
    id: 3,
    title: "Graffiti on park bench",
    description: "Offensive graffiti needs to be cleaned from the main park benches.",
    category: "Environment",
    priority: "Low",
    status: "Assigned",
    location: "Central Park",
    reporter: { name: "Mike Chen", avatar: "MC" },
    reportedAt: "1 day ago",
    assignedTo: "Parks Department",
    comments: 2,
  },
  {
    id: 4,
    title: "Excessive noise from construction site",
    description: "Construction starting before 7 AM on weekends, violating noise ordinance.",
    category: "Safety",
    priority: "High",
    status: "Open",
    location: "Elm Street Construction",
    reporter: { name: "Emily Rodriguez", avatar: "ER" },
    reportedAt: "2 days ago",
    comments: 8,
  },
  {
    id: 5,
    title: "Abandoned vehicle on street",
    description: "Car has been parked for 2+ weeks without moving, possibly abandoned.",
    category: "Safety",
    priority: "Medium",
    status: "In Progress",
    location: "Birch Lane",
    reporter: { name: "David Kim", avatar: "DK" },
    reportedAt: "3 days ago",
    assignedTo: "Police Department",
    comments: 4,
  },
];

const categories = ["Infrastructure", "Safety", "Environment", "Other"];
const priorities = ["High", "Medium", "Low"];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-error text-error-foreground";
    case "Medium": return "bg-warning text-warning-foreground";
    case "Low": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Open": return "bg-info text-info-foreground";
    case "In Progress": return "bg-warning text-warning-foreground";
    case "Assigned": return "bg-secondary text-secondary-foreground";
    case "Resolved": return "bg-success text-success-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export function IssuesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Issue reported successfully!");
    setIsDialogOpen(false);
  };

  const filteredIssues = selectedTab === "all" 
    ? issues 
    : issues.filter(issue => issue.status === selectedTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Issues</h1>
          <p className="text-muted-foreground">Report and track community issues</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="size-4" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Report an Issue</DialogTitle>
              <DialogDescription>
                Help improve our community by reporting problems or concerns
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitIssue} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  className="bg-input-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  className="bg-input-background resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select required>
                    <SelectTrigger id="category" className="bg-input-background">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select required>
                    <SelectTrigger id="priority" className="bg-input-background">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority} value={priority.toLowerCase()}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter location or address"
                    className="bg-input-background flex-1"
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-input-background">
                  <Upload className="size-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Submit Issue</Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Issues</CardTitle>
              <CardDescription>Browse and manage community issues</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search issues..."
                  className="pl-9 bg-input-background w-full sm:w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Open">Open</TabsTrigger>
              <TabsTrigger value="In Progress">In Progress</TabsTrigger>
              <TabsTrigger value="Assigned">Assigned</TabsTrigger>
              <TabsTrigger value="Resolved">Resolved</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedTab} className="space-y-4">
              {filteredIssues.map((issue) => (
                <Card key={issue.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      {issue.image && (
                        <img
                          src={issue.image}
                          alt={issue.title}
                          className="w-full md:w-32 h-32 rounded-lg object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-semibold">{issue.title}</h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="shrink-0">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Mark as Resolved</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-muted-foreground mb-4">{issue.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getStatusColor(issue.status)} variant="secondary">
                            {issue.status}
                          </Badge>
                          <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                            {issue.priority}
                          </Badge>
                          <Badge variant="outline">{issue.category}</Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Avatar className="size-6">
                              <AvatarImage src="" alt={issue.reporter.name} />
                              <AvatarFallback className="text-xs">{issue.reporter.avatar}</AvatarFallback>
                            </Avatar>
                            <span>{issue.reporter.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            {issue.location}
                          </div>
                          <span>{issue.reportedAt}</span>
                          <span>{issue.comments} comments</span>
                          {issue.assignedTo && (
                            <Badge variant="secondary" className="bg-secondary/20">
                              Assigned: {issue.assignedTo}
                            </Badge>
                          )}
                        </div>
                      </div>
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
