import { UserPlus, Mail, Shield, Crown, MoreVertical, Search, Filter } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Input } from "../../components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member" | "guest";
  avatar: string;
  initials: string;
  status: "active" | "invited" | "inactive";
  joinedDate: string;
  lastActive: string;
  projects: number;
}

const roleColors = {
  owner: "bg-purple-100 text-purple-700 border-purple-200",
  admin: "bg-blue-100 text-blue-700 border-blue-200",
  member: "bg-green-100 text-green-700 border-green-200",
  guest: "bg-slate-100 text-slate-700 border-slate-200",
};

const roleIcons = {
  owner: Crown,
  admin: Shield,
  member: UserPlus,
  guest: UserPlus,
};

export default function Team() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@company.com",
      role: "owner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      initials: "SJ",
      status: "active",
      joinedDate: "Jan 2023",
      lastActive: "Online now",
      projects: 12,
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael@company.com",
      role: "admin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      initials: "MC",
      status: "active",
      joinedDate: "Feb 2023",
      lastActive: "2 minutes ago",
      projects: 8,
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@company.com",
      role: "member",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
      initials: "ED",
      status: "active",
      joinedDate: "Mar 2023",
      lastActive: "1 hour ago",
      projects: 6,
    },
    {
      id: "4",
      name: "Alex Thompson",
      email: "alex@company.com",
      role: "member",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      initials: "AT",
      status: "active",
      joinedDate: "Apr 2023",
      lastActive: "3 hours ago",
      projects: 5,
    },
    {
      id: "5",
      name: "Jessica Williams",
      email: "jessica@company.com",
      role: "member",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      initials: "JW",
      status: "active",
      joinedDate: "May 2023",
      lastActive: "Yesterday",
      projects: 4,
    },
    {
      id: "6",
      name: "David Martinez",
      email: "david@external.com",
      role: "guest",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      initials: "DM",
      status: "invited",
      joinedDate: "Invited Jun 2024",
      lastActive: "Never",
      projects: 1,
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const stats = [
    { label: "Total Members", value: teamMembers.length, change: "+2 this month" },
    { label: "Active Now", value: teamMembers.filter(m => m.lastActive.includes("now") || m.lastActive.includes("minute")).length, change: "Online" },
    { label: "Pending Invites", value: teamMembers.filter(m => m.status === "invited").length, change: "Awaiting response" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Team Management</h1>
          <p className="text-slate-600 mt-1">
            Manage your team members, roles, and permissions
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Team Member</DialogTitle>
              <DialogDescription>
                Send an invitation to join your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="member@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="member">
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="member">Member</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.change}</p>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="search"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="owner">Owner</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="member">Member</SelectItem>
              <SelectItem value="guest">Guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => {
          const RoleIcon = roleIcons[member.role];
          const roleColor = roleColors[member.role];

          return (
            <Card key={member.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-900">{member.name}</h3>
                    <p className="text-sm text-slate-500">{member.email}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Change Role</DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Badge className={roleColor} variant="outline">
                  <RoleIcon className="w-3 h-3 mr-1" />
                  {member.role}
                </Badge>
                <Badge variant={member.status === "active" ? "default" : "secondary"}>
                  {member.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Joined</p>
                  <p className="text-sm font-medium text-slate-900">{member.joinedDate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Last Active</p>
                  <p className="text-sm font-medium text-slate-900">{member.lastActive}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Projects</p>
                  <p className="text-sm font-medium text-slate-900">{member.projects}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredMembers.length === 0 && (
        <Card className="p-12 text-center">
          <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">No members found</h3>
          <p className="text-slate-600">Try adjusting your search or filters</p>
        </Card>
      )}
    </div>
  );
}
