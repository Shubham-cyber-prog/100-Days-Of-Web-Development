import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Users, UserPlus, Edit, Trash2, Shield, Settings } from 'lucide-react';

const userData = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com', role: 'Administrator', status: 'Active', lastLogin: '2 hours ago' },
  { id: 2, name: 'Dr. Michael Chen', email: 'michael.chen@hospital.com', role: 'Editor', status: 'Active', lastLogin: '1 day ago' },
  { id: 3, name: 'Nurse Lisa Williams', email: 'lisa.williams@hospital.com', role: 'Viewer', status: 'Active', lastLogin: '3 hours ago' },
  { id: 4, name: 'Dr. Robert Davis', email: 'robert.davis@hospital.com', role: 'Editor', status: 'Inactive', lastLogin: '1 week ago' },
  { id: 5, name: 'Admin John Smith', email: 'john.smith@hospital.com', role: 'Administrator', status: 'Active', lastLogin: '5 minutes ago' },
];

const rolePermissions = {
  Administrator: {
    dataEditing: true,
    excelUpload: true,
    viewing: true,
    userManagement: true,
    systemSettings: true,
  },
  Editor: {
    dataEditing: true,
    excelUpload: true,
    viewing: true,
    userManagement: false,
    systemSettings: false,
  },
  Viewer: {
    dataEditing: false,
    excelUpload: false,
    viewing: true,
    userManagement: false,
    systemSettings: false,
  },
};

export function UserPermissionsModule() {
  const [selectedRole, setSelectedRole] = useState('Administrator');
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Viewer',
  });

  const handleCreateUser = () => {
    // Mock user creation
    console.log('Creating user:', newUser);
    setIsCreateUserOpen(false);
    setNewUser({ name: '', email: '', password: '', role: 'Viewer' });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-red-100 text-red-800';
      case 'Editor':
        return 'bg-blue-100 text-blue-800';
      case 'Viewer':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">User & Permissions Management</h2>
          <p className="text-gray-600">Manage user accounts, roles, and system permissions</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
            <Users className="h-4 w-4 mr-1" />
            {userData.length} Total Users
          </Badge>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl text-gray-900">{userData.length}</p>
                <p className="text-sm text-green-600">+2 this month</p>
              </div>
              <Users className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl text-gray-900">{userData.filter(u => u.status === 'Active').length}</p>
                <p className="text-sm text-blue-600">Currently online</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Administrators</p>
                <p className="text-2xl text-gray-900">{userData.filter(u => u.role === 'Administrator').length}</p>
                <p className="text-sm text-red-600">Full access</p>
              </div>
              <Settings className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Recent Logins</p>
                <p className="text-2xl text-gray-900">12</p>
                <p className="text-sm text-gray-600">Last 24 hours</p>
              </div>
              <UserPlus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                      Add a new user to the hospital management system. Please fill in all required information.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Assign Role</Label>
                      <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Administrator">Administrator</SelectItem>
                          <SelectItem value="Editor">Editor</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex space-x-2 pt-4">
                      <Button onClick={handleCreateUser} className="bg-teal-600 hover:bg-teal-700">
                        Create User
                      </Button>
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {userData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell className="text-gray-600">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Permission Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Select Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Administrator">Administrator</SelectItem>
                    <SelectItem value="Editor">Editor</SelectItem>
                    <SelectItem value="Viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-editing">Data Editing</Label>
                  <Switch 
                    id="data-editing" 
                    checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.dataEditing}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="excel-upload">Excel Upload</Label>
                  <Switch 
                    id="excel-upload" 
                    checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.excelUpload}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="viewing">Data Viewing</Label>
                  <Switch 
                    id="viewing" 
                    checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.viewing}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="user-management">User Management</Label>
                  <Switch 
                    id="user-management" 
                    checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.userManagement}
                    disabled
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="system-settings">System Settings</Label>
                  <Switch 
                    id="system-settings" 
                    checked={rolePermissions[selectedRole as keyof typeof rolePermissions]?.systemSettings}
                    disabled
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}