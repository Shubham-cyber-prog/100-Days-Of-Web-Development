import { Plus, Calendar, Users, MoreVertical, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { toast } from "sonner";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Building a modern online shopping experience",
    status: "in-progress",
    progress: 65,
    deadline: "Mar 15, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    ],
    color: "blue",
  },
  {
    id: 2,
    title: "Mobile App Development",
    description: "Cross-platform mobile application",
    status: "in-progress",
    progress: 42,
    deadline: "Apr 20, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    ],
    color: "purple",
  },
  {
    id: 3,
    title: "Dashboard Redesign",
    description: "Modernizing the admin interface",
    status: "completed",
    progress: 100,
    deadline: "Feb 10, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    ],
    color: "green",
  },
  {
    id: 4,
    title: "API Integration",
    description: "Third-party service integration",
    status: "in-progress",
    progress: 28,
    deadline: "May 5, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    ],
    color: "orange",
  },
  {
    id: 5,
    title: "Marketing Website",
    description: "New company landing page",
    status: "planning",
    progress: 15,
    deadline: "Jun 1, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    ],
    color: "pink",
  },
  {
    id: 6,
    title: "Database Migration",
    description: "Moving to cloud infrastructure",
    status: "in-progress",
    progress: 80,
    deadline: "Mar 25, 2026",
    team: [
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
      "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    ],
    color: "indigo",
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    "in-progress": {
      label: "In Progress",
      className: "bg-blue-100 text-blue-700 border-blue-200",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-700 border-green-200",
    },
    planning: {
      label: "Planning",
      className: "bg-purple-100 text-purple-700 border-purple-200",
    },
  };
  return statusConfig[status] || statusConfig.planning;
};

const getColorClasses = (color: string) => {
  const colors: Record<string, { border: string; gradient: string }> = {
    blue: { border: "border-blue-200", gradient: "from-blue-50 to-blue-100" },
    purple: { border: "border-purple-200", gradient: "from-purple-50 to-purple-100" },
    green: { border: "border-green-200", gradient: "from-green-50 to-green-100" },
    orange: { border: "border-orange-200", gradient: "from-orange-50 to-orange-100" },
    pink: { border: "border-pink-200", gradient: "from-pink-50 to-pink-100" },
    indigo: { border: "border-indigo-200", gradient: "from-indigo-50 to-indigo-100" },
  };
  return colors[color] || colors.blue;
};

export default function Projects() {
  const handleOpenProject = (projectId: number) => {
    toast.success(`Opening project ${projectId}`);
  };

  const handleEditProject = (projectId: number) => {
    toast.info(`Editing project ${projectId}`);
  };

  const handleDeleteProject = (projectId: number) => {
    toast.success(`Project ${projectId} deleted`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-600 mt-1">Manage and track your team's projects</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const statusBadge = getStatusBadge(project.status);
          const colorClasses = getColorClasses(project.color);

          return (
            <Card key={project.id} className={`border-slate-200 hover:shadow-lg transition-shadow`}>
              <CardHeader className="pb-3">
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${colorClasses.gradient} mb-4`} />
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleOpenProject(project.id)}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditProject(project.id)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className={statusBadge.className}>
                      {statusBadge.label}
                    </Badge>
                    <span className="text-sm font-medium text-slate-700">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>{project.deadline}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {project.team.slice(0, 3).map((avatar, index) => (
                        <Avatar key={index} className="w-8 h-8 border-2 border-white">
                          <AvatarImage src={avatar} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      ))}
                      {project.team.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-600">
                            +{project.team.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => handleOpenProject(project.id)}
                >
                  Open Project
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
