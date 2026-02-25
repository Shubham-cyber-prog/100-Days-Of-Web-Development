import { useState } from "react";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  FileText,
  Eye,
  FolderOpen,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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

const categories = [
  {
    id: 1,
    name: "Development",
    description: "Programming tutorials, guides, and best practices",
    color: "#4f46e5",
    articleCount: 45,
    icon: "💻",
  },
  {
    id: 2,
    name: "Backend",
    description: "Server-side development, databases, and APIs",
    color: "#10b981",
    articleCount: 32,
    icon: "⚙️",
  },
  {
    id: 3,
    name: "Design",
    description: "UI/UX design principles and resources",
    color: "#ec4899",
    articleCount: 28,
    icon: "🎨",
  },
  {
    id: 4,
    name: "Security",
    description: "Security best practices and vulnerability guides",
    color: "#ef4444",
    articleCount: 19,
    icon: "🔒",
  },
  {
    id: 5,
    name: "DevOps",
    description: "Deployment, CI/CD, and infrastructure",
    color: "#f59e0b",
    articleCount: 24,
    icon: "🚀",
  },
  {
    id: 6,
    name: "Mobile",
    description: "iOS and Android app development",
    color: "#8b5cf6",
    articleCount: 15,
    icon: "📱",
  },
  {
    id: 7,
    name: "Testing",
    description: "Quality assurance and testing strategies",
    color: "#06b6d4",
    articleCount: 12,
    icon: "✅",
  },
  {
    id: 8,
    name: "Documentation",
    description: "Writing effective technical documentation",
    color: "#84cc16",
    articleCount: 18,
    icon: "📝",
  },
];

export function CategoriesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryColor, setCategoryColor] = useState("#4f46e5");
  const [categoryIcon, setCategoryIcon] = useState("📁");

  const handleCreateCategory = () => {
    // Handle category creation
    setIsDialogOpen(false);
    setCategoryName("");
    setCategoryDescription("");
    setCategoryColor("#4f46e5");
    setCategoryIcon("📁");
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Categories</h1>
          <p className="text-muted-foreground text-[14px]">
            Organize your articles into categories
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to organize your articles
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Development"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of this category..."
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="h-24"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    placeholder="📁"
                    value={categoryIcon}
                    onChange={(e) => setCategoryIcon(e.target.value)}
                    className="text-[24px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={categoryColor}
                      onChange={(e) => setCategoryColor(e.target.value)}
                      className="h-10 w-20"
                    />
                    <Input
                      type="text"
                      value={categoryColor}
                      onChange={(e) => setCategoryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateCategory}>Create Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FolderOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Total Categories
              </p>
              <h3 className="text-[24px] font-semibold">{categories.length}</h3>
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
                Total Articles
              </p>
              <h3 className="text-[24px] font-semibold">
                {categories.reduce((sum, cat) => sum + cat.articleCount, 0)}
              </h3>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Eye className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">Avg Articles</p>
              <h3 className="text-[24px] font-semibold">
                {Math.round(
                  categories.reduce((sum, cat) => sum + cat.articleCount, 0) /
                    categories.length
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-card border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/20 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-[24px]"
                style={{ backgroundColor: `${category.color}15` }}
              >
                {category.icon}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="w-4 h-4 mr-2" />
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
            <h3 className="font-semibold text-[16px] mb-2">{category.name}</h3>
            <p className="text-[13px] text-muted-foreground mb-4 line-clamp-2">
              {category.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span>{category.articleCount} articles</span>
              </div>
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (when no categories) */}
      {categories.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-[18px] font-semibold mb-2">No categories yet</h3>
          <p className="text-[14px] text-muted-foreground mb-6">
            Create your first category to start organizing articles
          </p>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>
      )}
    </div>
  );
}