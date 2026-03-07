import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Video, 
  File, 
  Upload, 
  Download, 
  Eye,
  Search,
  Filter,
  BookOpen,
  FileImage,
  FolderOpen,
  Plus
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'image' | 'presentation';
  course: string;
  category: string;
  uploadDate: string;
  fileSize: string;
  uploadedBy: string;
  downloads: number;
  tags: string[];
}

const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Cardiology Fundamentals Lecture Notes',
    description: 'Comprehensive lecture notes covering basic cardiology principles',
    type: 'document',
    course: 'Advanced Cardiology',
    category: 'Lecture Notes',
    uploadDate: '2024-02-15',
    fileSize: '2.5 MB',
    uploadedBy: 'Dr. Ahmed Khan',
    downloads: 45,
    tags: ['cardiology', 'fundamentals', 'lecture']
  },
  {
    id: '2',
    title: 'Emergency Response Protocol Video',
    description: 'Step-by-step emergency response procedures demonstration',
    type: 'video',
    course: 'Emergency Medicine',
    category: 'Training Videos',
    uploadDate: '2024-02-18',
    fileSize: '125 MB',
    uploadedBy: 'Dr. Sarah Ali',
    downloads: 78,
    tags: ['emergency', 'protocol', 'video']
  },
  {
    id: '3',
    title: 'Pediatric Care Guidelines',
    description: 'Updated guidelines for pediatric patient care',
    type: 'document',
    course: 'Pediatric Care',
    category: 'Guidelines',
    uploadDate: '2024-02-20',
    fileSize: '1.8 MB',
    uploadedBy: 'Dr. Fatima Malik',
    downloads: 32,
    tags: ['pediatrics', 'guidelines', 'care']
  },
  {
    id: '4',
    title: 'MRI Scan Interpretation',
    description: 'Presentation on MRI scan reading and interpretation',
    type: 'presentation',
    course: 'Diagnostic Imaging',
    category: 'Presentations',
    uploadDate: '2024-02-22',
    fileSize: '8.4 MB',
    uploadedBy: 'Dr. Hassan Raza',
    downloads: 56,
    tags: ['imaging', 'MRI', 'diagnostics']
  },
  {
    id: '5',
    title: 'Patient Communication Skills',
    description: 'Video guide on effective patient communication techniques',
    type: 'video',
    course: 'Patient Care',
    category: 'Training Videos',
    uploadDate: '2024-02-25',
    fileSize: '95 MB',
    uploadedBy: 'Dr. Imran Siddiqui',
    downloads: 67,
    tags: ['communication', 'patient-care', 'skills']
  },
  {
    id: '6',
    title: 'Surgical Procedures Atlas',
    description: 'Illustrated guide to common surgical procedures',
    type: 'image',
    course: 'Basic Surgery',
    category: 'Reference Materials',
    uploadDate: '2024-02-28',
    fileSize: '15.2 MB',
    uploadedBy: 'Dr. Ahmed Khan',
    downloads: 41,
    tags: ['surgery', 'procedures', 'atlas']
  },
];

export function ResourceLibraryModule() {
  const [resources, setResources] = useState<Resource[]>(sampleResources);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'document',
    course: '',
    category: '',
    tags: ''
  });

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    const matchesCourse = courseFilter === 'all' || resource.course === courseFilter;
    return matchesSearch && matchesType && matchesCourse;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5 text-blue-600" />;
      case 'video': return <Video className="h-5 w-5 text-red-600" />;
      case 'image': return <FileImage className="h-5 w-5 text-green-600" />;
      case 'presentation': return <BookOpen className="h-5 w-5 text-purple-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-blue-100 text-blue-800';
      case 'video': return 'bg-red-100 text-red-800';
      case 'image': return 'bg-green-100 text-green-800';
      case 'presentation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpload = () => {
    const resource: Resource = {
      id: String(resources.length + 1),
      title: newResource.title,
      description: newResource.description,
      type: newResource.type as any,
      course: newResource.course,
      category: newResource.category,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '2.3 MB',
      uploadedBy: 'Current User',
      downloads: 0,
      tags: newResource.tags.split(',').map(tag => tag.trim())
    };
    
    setResources([resource, ...resources]);
    setUploadDialogOpen(false);
    setNewResource({
      title: '',
      description: '',
      type: 'document',
      course: '',
      category: '',
      tags: ''
    });
  };

  const handleDownload = (resource: Resource) => {
    console.log('Downloading:', resource.title);
    // In real implementation, this would download the file
  };

  const calculateStats = () => {
    return {
      total: resources.length,
      documents: resources.filter(r => r.type === 'document').length,
      videos: resources.filter(r => r.type === 'video').length,
      presentations: resources.filter(r => r.type === 'presentation').length,
      images: resources.filter(r => r.type === 'image').length,
      totalDownloads: resources.reduce((sum, r) => sum + r.downloads, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-900">Resource Library</h1>
          <p className="text-sm text-gray-600 mt-1">Centralized repository for training materials and resources</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700" onClick={() => setUploadDialogOpen(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Resource
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Resources</p>
                <p className="text-2xl text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-2xl text-gray-900">{stats.documents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl text-gray-900">{stats.videos}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Video className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Presentations</p>
                <p className="text-2xl text-gray-900">{stats.presentations}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Images</p>
                <p className="text-2xl text-gray-900">{stats.images}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileImage className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Downloads</p>
                <p className="text-2xl text-gray-900">{stats.totalDownloads}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="presentation">Presentations</SelectItem>
                <SelectItem value="image">Images</SelectItem>
              </SelectContent>
            </Select>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="Advanced Cardiology">Advanced Cardiology</SelectItem>
                <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                <SelectItem value="Pediatric Care">Pediatric Care</SelectItem>
                <SelectItem value="Diagnostic Imaging">Diagnostic Imaging</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{resource.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Course</span>
                  <span className="text-gray-900">{resource.course}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Category</span>
                  <Badge variant="secondary" className="text-xs">{resource.category}</Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">File Size</span>
                  <span className="text-gray-900">{resource.fileSize}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Downloads</span>
                  <span className="text-gray-900">{resource.downloads}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Uploaded</span>
                  <span className="text-gray-900">{new Date(resource.uploadDate).toLocaleDateString()}</span>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center flex-wrap gap-1">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleDownload(resource)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center pt-2">
                  Uploaded by {resource.uploadedBy}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FolderOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg text-gray-900 mb-2">No resources found</h3>
            <p className="text-sm text-gray-600">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload New Resource</DialogTitle>
            <DialogDescription>
              Add a new training resource to the library
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={newResource.title}
                onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                placeholder="Enter resource title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                placeholder="Enter resource description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Resource Type *</Label>
                <Select value={newResource.type} onValueChange={(value) => setNewResource({ ...newResource, type: value })}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Select value={newResource.course} onValueChange={(value) => setNewResource({ ...newResource, course: value })}>
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Advanced Cardiology">Advanced Cardiology</SelectItem>
                    <SelectItem value="Emergency Medicine">Emergency Medicine</SelectItem>
                    <SelectItem value="Pediatric Care">Pediatric Care</SelectItem>
                    <SelectItem value="Diagnostic Imaging">Diagnostic Imaging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={newResource.category}
                onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                placeholder="e.g., Lecture Notes, Guidelines, Training Videos"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={newResource.tags}
                onChange={(e) => setNewResource({ ...newResource, tags: e.target.value })}
                placeholder="e.g., cardiology, fundamentals, lecture"
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
              <Button variant="outline" size="sm">
                Choose File
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-teal-600 hover:bg-teal-700"
              onClick={handleUpload}
              disabled={!newResource.title || !newResource.description || !newResource.course}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
