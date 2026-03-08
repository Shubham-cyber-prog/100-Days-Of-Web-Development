import { UserPlus, Search, MoreVertical, Mail, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";

const usersData = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", role: "Admin", status: "Active", lastSeen: "2 hours ago" },
  { id: 2, name: "Mike Johnson", email: "mike@example.com", role: "Editor", status: "Active", lastSeen: "5 hours ago" },
  { id: 3, name: "Alex Kim", email: "alex@example.com", role: "Author", status: "Active", lastSeen: "1 day ago" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "Contributor", status: "Inactive", lastSeen: "3 days ago" },
  { id: 5, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", lastSeen: "1 hour ago" },
];

export function Users() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions.</p>
        </div>
        <Button size="md">
          <UserPlus className="size-4" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users..."
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground text-sm">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="size-4" />
                    {user.role}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={user.status === "Active" ? "published" : "archived"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">{user.lastSeen}</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="sm">
                      <Mail className="size-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
