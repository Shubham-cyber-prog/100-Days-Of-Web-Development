import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { PostCard } from '../components/PostCard';
import { 
  FolderPlus, 
  Search, 
  MoreVertical, 
  Lock, 
  Globe, 
  Grid3x3,
  List,
  Bookmark
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { mockPosts } from '../lib/mockData';

interface Collection {
  id: string;
  name: string;
  description: string;
  postCount: number;
  isPrivate: boolean;
  coverImage?: string;
  createdAt: string;
  posts: typeof mockPosts;
}

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  // Mock collections data
  const [collections, setCollections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Design Inspiration',
      description: 'Beautiful UI/UX designs and creative ideas',
      postCount: 24,
      isPrivate: false,
      createdAt: '2026-02-15',
      posts: mockPosts.slice(0, 4),
    },
    {
      id: '2',
      name: 'Travel Goals',
      description: 'Places I want to visit someday',
      postCount: 18,
      isPrivate: true,
      createdAt: '2026-01-20',
      posts: mockPosts.slice(1, 5),
    },
    {
      id: '3',
      name: 'Recipes to Try',
      description: 'Delicious food and cooking tutorials',
      postCount: 31,
      isPrivate: false,
      createdAt: '2025-12-10',
      posts: mockPosts.slice(2, 6),
    },
    {
      id: '4',
      name: 'Tech & Innovation',
      description: 'Latest tech trends and innovations',
      postCount: 15,
      isPrivate: false,
      createdAt: '2025-11-05',
      posts: mockPosts.slice(0, 3),
    },
  ]);

  const handleCreateCollection = () => {
    if (!newCollectionName.trim()) return;
    
    const newCollection: Collection = {
      id: Date.now().toString(),
      name: newCollectionName,
      description: newCollectionDesc,
      postCount: 0,
      isPrivate,
      createdAt: new Date().toISOString().split('T')[0],
      posts: [],
    };

    setCollections([newCollection, ...collections]);
    setNewCollectionName('');
    setNewCollectionDesc('');
    setIsPrivate(false);
  };

  const handleDeleteCollection = (id: string) => {
    setCollections(collections.filter(c => c.id !== id));
    if (selectedCollection?.id === id) {
      setSelectedCollection(null);
    }
  };

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedCollection) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedCollection(null)}
              className="mb-2 -ml-2"
            >
              ← Back to Collections
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {selectedCollection.name}
              {selectedCollection.isPrivate && <Lock className="size-5 text-muted-foreground" />}
            </h1>
            <p className="text-muted-foreground mt-1">{selectedCollection.description}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span>{selectedCollection.postCount} posts</span>
              <span>Created {selectedCollection.createdAt}</span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Collection</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-6">
          {selectedCollection.posts.length > 0 ? (
            selectedCollection.posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Card className="p-12 text-center">
              <Bookmark className="size-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">
                Start adding posts to this collection from your feed
              </p>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Collections</h1>
          <p className="text-muted-foreground mt-1">Organize your saved posts into collections</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FolderPlus className="size-4 mr-2" />
              New Collection
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Collection</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Collection Name</label>
                <Input
                  placeholder="e.g., Design Inspiration"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description (optional)</label>
                <Input
                  placeholder="What's this collection about?"
                  value={newCollectionDesc}
                  onChange={(e) => setNewCollectionDesc(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant={isPrivate ? 'outline' : 'default'}
                    size="sm"
                    onClick={() => setIsPrivate(false)}
                  >
                    <Globe className="size-4 mr-1" />
                    Public
                  </Button>
                  <Button
                    type="button"
                    variant={isPrivate ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setIsPrivate(true)}
                  >
                    <Lock className="size-4 mr-1" />
                    Private
                  </Button>
                </div>
              </div>
              <Button onClick={handleCreateCollection} className="w-full">
                Create Collection
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="size-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Collections ({collections.length})</TabsTrigger>
          <TabsTrigger value="public">Public ({collections.filter(c => !c.isPrivate).length})</TabsTrigger>
          <TabsTrigger value="private">Private ({collections.filter(c => c.isPrivate).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                    <Bookmark className="size-12 text-indigo-600" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        {collection.name}
                        {collection.isPrivate && <Lock className="size-3 text-muted-foreground" />}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="size-8">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCollection(collection.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {collection.description}
                    </p>
                    <Badge variant="secondary">{collection.postCount} posts</Badge>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCollections.map((collection) => (
                <Card
                  key={collection.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <div className="flex items-center gap-4">
                    <div className="size-20 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Bookmark className="size-8 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold flex items-center gap-2 mb-1">
                        {collection.name}
                        {collection.isPrivate && <Lock className="size-3 text-muted-foreground" />}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {collection.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{collection.postCount} posts</span>
                        <span>Created {collection.createdAt}</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="outline" size="icon">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCollection(collection.id);
                          }}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="public" className="mt-6">
          {/* Same grid/list view for public collections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.filter(c => !c.isPrivate).map((collection) => (
              <Card
                key={collection.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCollection(collection)}
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                  <Bookmark className="size-12 text-indigo-600" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <Badge variant="secondary">{collection.postCount} posts</Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="private" className="mt-6">
          {/* Same grid/list view for private collections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.filter(c => c.isPrivate).map((collection) => (
              <Card
                key={collection.id}
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCollection(collection)}
              >
                <div className="aspect-video bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                  <Bookmark className="size-12 text-indigo-600" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold flex items-center gap-2 mb-2">
                    {collection.name}
                    <Lock className="size-3 text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {collection.description}
                  </p>
                  <Badge variant="secondary">{collection.postCount} posts</Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
