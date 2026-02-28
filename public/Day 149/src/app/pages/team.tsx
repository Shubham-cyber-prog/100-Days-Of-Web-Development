import {
  Plus,
  MoreVertical,
  Mail,
  Shield,
  Crown,
  User as UserIcon,
  Search,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const team = [
  {
    id: 1,
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "admin",
    articles: 28,
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: 2,
    name: "Michael Torres",
    email: "michael@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    role: "editor",
    articles: 32,
    lastActive: "5 hours ago",
    status: "active",
  },
  {
    id: 3,
    name: "Emily Johnson",
    email: "emily@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    role: "editor",
    articles: 45,
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    role: "contributor",
    articles: 18,
    lastActive: "2 days ago",
    status: "active",
  },
  {
    id: 5,
    name: "Lisa Martinez",
    email: "lisa@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    role: "contributor",
    articles: 24,
    lastActive: "3 days ago",
    status: "active",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    role: "contributor",
    articles: 15,
    lastActive: "5 days ago",
    status: "inactive",
  },
];

const roleColors = {
  admin: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  editor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  contributor: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
};

const roleIcons = {
  admin: Crown,
  editor: Shield,
  contributor: UserIcon,
};

export function TeamPage() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Team</h1>
          <p className="text-muted-foreground text-[14px]">
            Manage your team members and their permissions
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Total Members</p>
              <h3 className="text-[24px] font-semibold">{team.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Admins</p>
              <h3 className="text-[24px] font-semibold">
                {team.filter((m) => m.role === "admin").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Editors</p>
              <h3 className="text-[24px] font-semibold">
                {team.filter((m) => m.role === "editor").length}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Contributors</p>
              <h3 className="text-[24px] font-semibold">
                {team.filter((m) => m.role === "contributor").length}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search team members..."
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Team Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="min-w-[250px]">Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((member) => {
              const RoleIcon = roleIcons[member.role as keyof typeof roleIcons];
              return (
                <TableRow key={member.id} className="border-border hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[14px]">{member.name}</p>
                        <p className="text-[12px] text-muted-foreground flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[11px] gap-1 ${
                        roleColors[member.role as keyof typeof roleColors]
                      }`}
                      variant="secondary"
                    >
                      <RoleIcon className="w-3 h-3" />
                      {member.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] font-medium">
                      {member.articles}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-muted-foreground">
                      {member.lastActive}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        member.status === "active" ? "default" : "secondary"
                      }
                      className="text-[11px]"
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Remove Member
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}