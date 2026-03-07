import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Building2, MapPin, Phone, Mail, Users, Edit, Eye, UserX, Plus } from 'lucide-react';

const branchesData = [
  {
    id: 1,
    name: 'Downtown Medical Center',
    location: 'Lahore, Punjab',
    phone: '+92-42-111-2233',
    email: 'downtown@hospital.com',
    activeTrainees: 45,
    coursesOffered: 8,
    trainersAssigned: 12,
    adminAssigned: 'Dr. Ahmed Khan',
    capacity: 50,
    status: 'Active'
  },
  {
    id: 2,
    name: 'City General Hospital',
    location: 'Karachi, Sindh',
    phone: '+92-21-111-4455',
    email: 'citygeneral@hospital.com',
    activeTrainees: 38,
    coursesOffered: 6,
    trainersAssigned: 9,
    adminAssigned: 'Dr. Fatima Ali',
    capacity: 40,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Capital Health Center',
    location: 'Islamabad, ICT',
    phone: '+92-51-111-6677',
    email: 'capital@hospital.com',
    activeTrainees: 32,
    coursesOffered: 7,
    trainersAssigned: 8,
    adminAssigned: 'Dr. Hassan Raza',
    capacity: 35,
    status: 'Active'
  },
  {
    id: 4,
    name: 'Regional Medical Complex',
    location: 'Faisalabad, Punjab',
    phone: '+92-41-111-8899',
    email: 'regional@hospital.com',
    activeTrainees: 28,
    coursesOffered: 5,
    trainersAssigned: 7,
    adminAssigned: 'Dr. Ayesha Malik',
    capacity: 30,
    status: 'Pending Setup'
  }
];

const servicesOptions = [
  'Emergency Medicine',
  'Cardiology',
  'Pediatrics',
  'Surgery',
  'Radiology',
  'Laboratory',
  'ICU',
  'Neurology',
  'Orthopedics',
  'Psychiatry'
];

export function HospitalBranchesModule() {
  const [isAddBranchOpen, setIsAddBranchOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    adminAssigned: '',
    servicesAvailable: [] as string[],
    capacity: ''
  });

  const handleAddBranch = () => {
    console.log('Adding branch:', newBranch);
    setIsAddBranchOpen(false);
    setNewBranch({
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      adminAssigned: '',
      servicesAvailable: [],
      capacity: ''
    });
  };

  const handleViewDetails = (branch: any) => {
    setSelectedBranch(branch);
    setIsViewDetailsOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Pending Setup':
        return <Badge className="bg-orange-100 text-orange-800">Pending Setup</Badge>;
      case 'Inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">Hospital Branches</h2>
          <p className="text-gray-600">Manage multiple hospital locations under the consultancy network</p>
        </div>
        <Dialog open={isAddBranchOpen} onOpenChange={setIsAddBranchOpen}>
          <DialogTrigger asChild>
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Hospital Branch</DialogTitle>
              <DialogDescription>
                Register a new hospital branch to expand your training network.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Branch Name</Label>
                <Input
                  id="name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                  placeholder="Enter branch name"
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={newBranch.city}
                  onChange={(e) => setNewBranch({ ...newBranch, city: e.target.value })}
                  placeholder="Enter city"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newBranch.address}
                  onChange={(e) => setNewBranch({ ...newBranch, address: e.target.value })}
                  placeholder="Enter full address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newBranch.phone}
                  onChange={(e) => setNewBranch({ ...newBranch, phone: e.target.value })}
                  placeholder="+92-XX-XXXXXXX"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newBranch.email}
                  onChange={(e) => setNewBranch({ ...newBranch, email: e.target.value })}
                  placeholder="branch@hospital.com"
                />
              </div>
              <div>
                <Label htmlFor="admin">Admin Assigned</Label>
                <Select value={newBranch.adminAssigned} onValueChange={(value) => setNewBranch({ ...newBranch, adminAssigned: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select admin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-ahmed">Dr. Ahmed Khan</SelectItem>
                    <SelectItem value="dr-fatima">Dr. Fatima Ali</SelectItem>
                    <SelectItem value="dr-hassan">Dr. Hassan Raza</SelectItem>
                    <SelectItem value="dr-ayesha">Dr. Ayesha Malik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="capacity">Branch Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newBranch.capacity}
                  onChange={(e) => setNewBranch({ ...newBranch, capacity: e.target.value })}
                  placeholder="Max trainees"
                />
              </div>
            </div>
            <div className="flex space-x-2 pt-4">
              <Button onClick={handleAddBranch} className="bg-teal-600 hover:bg-teal-700">
                Add Branch
              </Button>
              <Button variant="outline" onClick={() => setIsAddBranchOpen(false)}>
                Cancel
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branch Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Branches</p>
                <p className="text-2xl text-gray-900">{branchesData.length}</p>
                <p className="text-sm text-green-600">Across 3 cities</p>
              </div>
              <Building2 className="h-8 w-8 text-teal-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Trainees</p>
                <p className="text-2xl text-gray-900">{branchesData.reduce((sum, branch) => sum + branch.activeTrainees, 0)}</p>
                <p className="text-sm text-blue-600">Active enrollment</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Capacity</p>
                <p className="text-2xl text-gray-900">{Math.round(branchesData.reduce((sum, branch) => sum + branch.capacity, 0) / branchesData.length)}</p>
                <p className="text-sm text-orange-600">Per branch</p>
              </div>
              <MapPin className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Branches</p>
                <p className="text-2xl text-gray-900">{branchesData.filter(branch => branch.status === 'Active').length}</p>
                <p className="text-sm text-green-600">Operational</p>
              </div>
              <Building2 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch List */}
      <Card>
        <CardHeader>
          <CardTitle>Branch Network</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Trainees</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Trainers</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {branchesData.map((branch) => (
                <TableRow key={branch.id}>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{branch.name}</p>
                      <p className="text-sm text-gray-500">Admin: {branch.adminAssigned}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{branch.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{branch.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{branch.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <p className="text-gray-900">{branch.activeTrainees}</p>
                      <p className="text-xs text-gray-500">of {branch.capacity}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{branch.coursesOffered}</TableCell>
                  <TableCell className="text-center">{branch.trainersAssigned}</TableCell>
                  <TableCell>{getStatusBadge(branch.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewDetails(branch)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <UserX className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Branch Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBranch?.name} - Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about this hospital branch.
            </DialogDescription>
          </DialogHeader>
          {selectedBranch && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Location</Label>
                  <p className="text-gray-900">{selectedBranch.location}</p>
                </div>
                <div>
                  <Label>Admin Assigned</Label>
                  <p className="text-gray-900">{selectedBranch.adminAssigned}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p className="text-gray-900">{selectedBranch.phone}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p className="text-gray-900">{selectedBranch.email}</p>
                </div>
                <div>
                  <Label>Capacity</Label>
                  <p className="text-gray-900">{selectedBranch.activeTrainees} / {selectedBranch.capacity} trainees</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <div className="mt-1">{getStatusBadge(selectedBranch.status)}</div>
                </div>
              </div>
              <div>
                <Label>Performance Metrics</Label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-900">{selectedBranch.coursesOffered}</p>
                    <p className="text-sm text-gray-600">Courses Offered</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-900">{selectedBranch.trainersAssigned}</p>
                    <p className="text-sm text-gray-600">Trainers</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-900">{Math.round((selectedBranch.activeTrainees / selectedBranch.capacity) * 100)}%</p>
                    <p className="text-sm text-gray-600">Utilization</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}