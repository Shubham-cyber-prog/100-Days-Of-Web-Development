import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Bookmark, MoreVertical, Trash2, FolderPlus, Folder, Grid3x3, List, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import PostCard from '../components/PostCard';
import { posts } from '../lib/mockData';

// Mock saved posts data
const savedPosts = posts.slice(0, 8);

const collections = [
  { id: 1, name: 'Design Inspiration', count: 23, color: 'bg-blue-500' },
  { id: 2, name: 'Travel', count: 15, color: 'bg-green-500' },
  { id: 3, name: 'Tech News', count: 31, color: 'bg-purple-500' },
  { id: 4, name: 'Recipes', count: 12, color: 'bg-orange-500' },
];

export default function SavedPostsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [newCollectionOpen, setNewCollectionOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState('');

  const handleCreateCollection = () => {
    // Handle collection creation
    setNewCollectionOpen(false);
    setNewCollectionName('');
  };

  return (
    <div className="max-w-4xl mx-auto pb-20 md:pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Bookmark className="size-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-2xl">Saved Posts</h1>
            <p className="text-sm text-muted-foreground">{savedPosts.length} items saved</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-accent rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === 'list' ? 'bg-background' : ''}
              onClick={() => setViewMode('list')}
            >
              <List className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={viewMode === 'grid' ? 'bg-background' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid3x3 className="size-4" />
            </Button>
          </div>

          {/* Create Collection Button */}
          <Dialog open={newCollectionOpen} onOpenChange={setNewCollectionOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 gap-2">
                <Plus className="size-4" />
                New Collection
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Collection</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Collection Name</label>
                  <Input
                    placeholder="Enter collection name..."
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setNewCollectionOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleCreateCollection}
                  >
                    Create
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="all">All Saved</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        {/* All Saved Posts */}
        <TabsContent value="all" className="mt-6">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {savedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="relative group">
                    <PostCard post={post} />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon" className="shadow-md">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FolderPlus className="size-4 mr-2" />
                            Add to Collection
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="size-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {savedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group cursor-pointer"
                >
                  <Card className="overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
                      <Avatar className="size-16">
                        <AvatarImage src={post.user.avatar} alt={post.user.name} />
                        <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <Button
                        variant="secondary"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="size-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Collections Tab */}
        <TabsContent value="collections" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="cursor-pointer overflow-hidden group">
                  <div className={`h-32 ${collection.color} bg-gradient-to-br from-opacity-80 to-opacity-60 relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Folder className="size-16 text-white/80" />
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="icon">
                            <MoreVertical className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="size-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{collection.name}</h3>
                    <p className="text-sm text-muted-foreground">{collection.count} items</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {savedPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="size-20 rounded-full bg-accent mx-auto mb-4 flex items-center justify-center">
            <Bookmark className="size-10 text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-xl mb-2">No saved posts yet</h3>
          <p className="text-muted-foreground mb-6">
            Start saving posts you'd like to revisit later
          </p>
        </motion.div>
      )}
    </div>
  );
}
