import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { PostCard } from '../components/PostCard';
import { UserCard } from '../components/UserCard';
import { 
  List, 
  Plus, 
  Search, 
  Users, 
  MoreVertical,
  Lock,
  Globe,
  Grid3x3,
  ListIcon,
  UserPlus,
  Settings
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { mockPosts, mockUsers } from '../lib/mockData';

interface UserList {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  isPrivate: boolean;
  createdAt: string;
  coverColor: string;
  members: typeof mockUsers;
}

export default function ListsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedList, setSelectedList] = useState<UserList | null>(null);
  const [newListName, setNewListName] = useState('');
  const [newListDesc, setNewListDesc] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  // Mock lists data
  const [lists, setLists] = useState<UserList[]>([
    {
      id: '1',
      name: 'Tech Influencers',
      description: 'Developers and tech leaders I follow for insights',
      memberCount: 24,
      isPrivate: false,
      createdAt: '2026-02-15',
      coverColor: 'from-blue-500 to-indigo-500',
      members: mockUsers.slice(0, 4),
    },
    {
      id: '2',
      name: 'Design Inspiration',
      description: 'Talented designers and creative minds',
      memberCount: 18,
      isPrivate: false,
      createdAt: '2026-01-20',
      coverColor: 'from-purple-500 to-pink-500',
      members: mockUsers.slice(1, 5),
    },
    {
      id: '3',
      name: 'Close Friends',
      description: 'My personal circle',
      memberCount: 12,
      isPrivate: true,
      createdAt: '2025-12-10',
      coverColor: 'from-green-500 to-teal-500',
      members: mockUsers.slice(2, 6),
    },
    {
      id: '4',
      name: 'Content Creators',
      description: 'Amazing creators making quality content',
      memberCount: 31,
      isPrivate: false,
      createdAt: '2025-11-05',
      coverColor: 'from-orange-500 to-red-500',
      members: mockUsers.slice(0, 5),
    },
    {
      id: '5',
      name: 'Entrepreneurs',
      description: 'Startup founders and business leaders',
      memberCount: 15,
      isPrivate: false,
      createdAt: '2025-10-18',
      coverColor: 'from-cyan-500 to-blue-500',
      members: mockUsers.slice(1, 4),
    },
  ]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const colors = [
      'from-blue-500 to-indigo-500',
      'from-purple-500 to-pink-500',
      'from-green-500 to-teal-500',
      'from-orange-500 to-red-500',
      'from-cyan-500 to-blue-500',
    ];

    const newList: UserList = {
      id: Date.now().toString(),
      name: newListName,
      description: newListDesc,
      memberCount: 0,
      isPrivate,
      createdAt: new Date().toISOString().split('T')[0],
      coverColor: colors[Math.floor(Math.random() * colors.length)],
      members: [],
    };

    setLists([newList, ...lists]);
    setNewListName('');
    setNewListDesc('');
    setIsPrivate(false);
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(l => l.id !== id));
    if (selectedList?.id === id) {
      setSelectedList(null);
    }
  };

  const filteredLists = lists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    list.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedList) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => setSelectedList(null)}
            className="mb-4 -ml-2"
          >
            ← Back to Lists
          </Button>

          <Card className="overflow-hidden mb-6">
            <div className={`h-32 bg-gradient-to-r ${selectedList.coverColor}`} />
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{selectedList.name}</h1>
                    {selectedList.isPrivate && <Lock className="size-5 text-muted-foreground" />}
                  </div>
                  <p className="text-muted-foreground mb-3">{selectedList.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="size-4" />
                      {selectedList.memberCount} members
                    </span>
                    <span>Created {selectedList.createdAt}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Settings className="size-4 mr-2" />
                      Edit List
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserPlus className="size-4 mr-2" />
                      Add Members
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete List</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button>
                <UserPlus className="size-4 mr-2" />
                Add Members
              </Button>
            </div>
          </Card>

          <Tabs defaultValue="feed">
            <TabsList>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="members">Members ({selectedList.memberCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="feed" className="mt-6 space-y-6">
              {mockPosts.slice(0, 3).map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>

            <TabsContent value="members" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedList.members.length > 0 ? (
                  selectedList.members.map(user => (
                    <UserCard key={user.username} user={user} />
                  ))
                ) : (
                  <Card className="p-12 text-center col-span-2">
                    <Users className="size-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No members yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start adding people to this list
                    </p>
                    <Button>Add Members</Button>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Lists</h1>
          <p className="text-muted-foreground">Organize people into curated lists</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Create List
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New List</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">List Name</label>
                <Input
                  placeholder="e.g., Tech Influencers"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Description (optional)</label>
                <Textarea
                  placeholder="What's this list about?"
                  value={newListDesc}
                  onChange={(e) => setNewListDesc(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                    {isPrivate ? <Lock className="size-5 text-indigo-600" /> : <Globe className="size-5 text-indigo-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{isPrivate ? 'Private' : 'Public'}</p>
                    <p className="text-sm text-muted-foreground">
                      {isPrivate ? 'Only you can see this list' : 'Anyone can view this list'}
                    </p>
                  </div>
                </div>
                <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
              </div>
              <Button onClick={handleCreateList} className="w-full">
                Create List
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
              placeholder="Search lists..."
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
              <ListIcon className="size-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="my-lists">
        <TabsList>
          <TabsTrigger value="my-lists">My Lists ({lists.length})</TabsTrigger>
          <TabsTrigger value="subscribed">Subscribed (3)</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-lists" className="mt-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLists.map((list) => (
                <Card
                  key={list.id}
                  className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedList(list)}
                >
                  <div className={`h-24 bg-gradient-to-r ${list.coverColor}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        {list.name}
                        {list.isPrivate && <Lock className="size-3 text-muted-foreground" />}
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
                              handleDeleteList(list.id);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {list.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {list.members.slice(0, 3).map((member, idx) => (
                          <Avatar key={idx} className="size-8 border-2 border-background">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                        {list.memberCount > 3 && (
                          <div className="size-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                            +{list.memberCount - 3}
                          </div>
                        )}
                      </div>
                      <Badge variant="secondary">{list.memberCount} members</Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLists.map((list) => (
                <Card
                  key={list.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedList(list)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`size-16 rounded-lg bg-gradient-to-r ${list.coverColor} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold flex items-center gap-2 mb-1">
                        {list.name}
                        {list.isPrivate && <Lock className="size-3 text-muted-foreground" />}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                        {list.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          {list.members.slice(0, 4).map((member, idx) => (
                            <Avatar key={idx} className="size-6 border-2 border-background">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {list.memberCount} members
                        </span>
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
                            handleDeleteList(list.id);
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

        <TabsContent value="subscribed" className="mt-6">
          <Card className="p-12 text-center">
            <List className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No subscribed lists</h3>
            <p className="text-muted-foreground">
              Lists you subscribe to will appear here
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="discover" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Top Tech Leaders',
                description: 'Curated list of technology industry leaders',
                members: 156,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                name: 'Creative Designers',
                description: 'Best designers sharing their work',
                members: 89,
                color: 'from-purple-500 to-pink-500',
              },
              {
                name: 'Startup Founders',
                description: 'Entrepreneurs building amazing companies',
                members: 124,
                color: 'from-orange-500 to-red-500',
              },
            ].map((list, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-24 bg-gradient-to-r ${list.color}`} />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{list.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{list.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{list.members} members</span>
                    <Button size="sm">Subscribe</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
