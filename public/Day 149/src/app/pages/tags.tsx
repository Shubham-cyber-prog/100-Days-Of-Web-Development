import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Tag,
  FileText,
  Search,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Label } from "../components/ui/label";

const tags = [
  { id: 1, name: "React", articleCount: 28, color: "#61dafb" },
  { id: 2, name: "JavaScript", articleCount: 45, color: "#f7df1e" },
  { id: 3, name: "TypeScript", articleCount: 32, color: "#3178c6" },
  { id: 4, name: "Tutorial", articleCount: 56, color: "#10b981" },
  { id: 5, name: "Guide", articleCount: 41, color: "#8b5cf6" },
  { id: 6, name: "Best Practices", articleCount: 34, color: "#f59e0b" },
  { id: 7, name: "Security", articleCount: 19, color: "#ef4444" },
  { id: 8, name: "Performance", articleCount: 25, color: "#ec4899" },
  { id: 9, name: "API", articleCount: 22, color: "#06b6d4" },
  { id: 10, name: "Database", articleCount: 18, color: "#84cc16" },
  { id: 11, name: "CSS", articleCount: 27, color: "#264de4" },
  { id: 12, name: "Node.js", articleCount: 20, color: "#68a063" },
  { id: 13, name: "Testing", articleCount: 15, color: "#c21325" },
  { id: 14, name: "DevOps", articleCount: 12, color: "#ff6b35" },
  { id: 15, name: "Design", articleCount: 24, color: "#ff006e" },
];

export function TagsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("#4f46e5");

  const handleCreateTag = () => {
    setIsDialogOpen(false);
    setTagName("");
    setTagColor("#4f46e5");
  };

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Tags</h1>
          <p className="text-muted-foreground text-[14px]">
            Manage tags to help categorize and find articles
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Tag
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Create New Tag</DialogTitle>
              <DialogDescription>
                Add a new tag to organize your articles
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="tagName">Tag Name</Label>
                <Input
                  id="tagName"
                  placeholder="e.g., React"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagColor">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="tagColor"
                    type="color"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="h-10 w-20"
                  />
                  <Input
                    type="text"
                    value={tagColor}
                    onChange={(e) => setTagColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTag}>Create Tag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Tag className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Total Tags</p>
              <h3 className="text-[24px] font-semibold">{tags.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <FileText className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Tagged Articles
              </p>
              <h3 className="text-[24px] font-semibold">
                {tags.reduce((sum, tag) => sum + tag.articleCount, 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Tag className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Avg Tags per Article
              </p>
              <h3 className="text-[24px] font-semibold">3.2</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border"
          />
        </div>
      </div>

      {/* Tags Cloud */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-wrap gap-3">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="group relative"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all bg-card">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <span className="text-[14px] font-medium">{tag.name}</span>
                <Badge variant="secondary" className="text-[11px] px-1.5 py-0">
                  {tag.articleCount}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity -mr-2"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <FileText className="w-4 h-4 mr-2" />
                      View Articles
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border">
          <h3 className="text-[18px] font-semibold">Most Used Tags</h3>
        </div>
        <div className="divide-y divide-border">
          {filteredTags
            .sort((a, b) => b.articleCount - a.articleCount)
            .slice(0, 10)
            .map((tag, index) => (
              <div
                key={tag.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[14px] font-medium text-muted-foreground w-6">
                    {index + 1}
                  </span>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  <span className="text-[14px] font-medium">{tag.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[13px] text-muted-foreground">
                    {tag.articleCount} articles
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}