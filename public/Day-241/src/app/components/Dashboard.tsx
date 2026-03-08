import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  FileText, 
  Search, 
  Grid3x3, 
  List, 
  Plus,
  Home,
  Clock,
  Star,
  Users,
  Trash2,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DocumentCard } from './DocumentCard';

const mockDocuments = [
  {
    id: '1',
    title: 'Project Proposal 2024',
    lastEdited: 'Edited 2 hours ago',
    owner: { name: 'John Doe', initials: 'JD', avatar: '' },
    isStarred: true,
  },
  {
    id: '2',
    title: 'Marketing Strategy Q1',
    lastEdited: 'Edited yesterday',
    owner: { name: 'Jane Smith', initials: 'JS', avatar: '' },
    isStarred: false,
  },
  {
    id: '3',
    title: 'Meeting Notes - Feb 24',
    lastEdited: 'Edited 3 days ago',
    owner: { name: 'John Doe', initials: 'JD', avatar: '' },
    isStarred: true,
  },
  {
    id: '4',
    title: 'Annual Report Draft',
    lastEdited: 'Edited last week',
    owner: { name: 'Mike Johnson', initials: 'MJ', avatar: '' },
    isStarred: false,
  },
  {
    id: '5',
    title: 'Product Roadmap',
    lastEdited: 'Edited 2 weeks ago',
    owner: { name: 'Sarah Williams', initials: 'SW', avatar: '' },
    isStarred: false,
  },
  {
    id: '6',
    title: 'Design System Documentation',
    lastEdited: 'Edited last month',
    owner: { name: 'John Doe', initials: 'JD', avatar: '' },
    isStarred: false,
  },
];

const sidebarItems = [
  { icon: Home, label: 'Home', active: true },
  { icon: Clock, label: 'Recent', active: false },
  { icon: Star, label: 'Starred', active: false },
  { icon: Users, label: 'Shared with me', active: false },
  { icon: Trash2, label: 'Trash', active: false },
];

export function Dashboard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewDocument = () => {
    navigate('/document/new');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center gap-4 px-4 h-16">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-xl hidden sm:block">Docs Clone</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-gray-200 h-11"
              />
            </div>
          </div>

          {/* User Avatar */}
          <Avatar className="w-10 h-10">
            <AvatarImage src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-30
          transition-transform duration-300 lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <nav className="p-4 space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.label}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                  ${item.active 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold mb-1">Recent Documents</h1>
              <p className="text-gray-600">Access your documents and create new ones</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg p-1 bg-white">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                onClick={handleNewDocument}
                className="bg-blue-600 hover:bg-blue-700 gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Document</span>
              </Button>
            </div>
          </div>

          {/* Documents Grid/List */}
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
              : 'space-y-2'
          }>
            {mockDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                {...doc}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State (shown when no documents) */}
          {mockDocuments.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
              <p className="text-gray-600 mb-6">Create your first document to get started</p>
              <Button onClick={handleNewDocument} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Document
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
