import { useState } from "react";
import { Link } from "react-router";
import {
  MoreVertical,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  Archive,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Checkbox } from "../components/ui/checkbox";

const articles = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    category: "Development",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    status: "published",
    views: 2453,
    lastUpdated: "Feb 23, 2026",
    tags: ["React", "JavaScript", "Tutorial"],
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    category: "Development",
    author: {
      name: "Michael Torres",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    status: "published",
    views: 1876,
    lastUpdated: "Feb 22, 2026",
    tags: ["TypeScript", "Patterns"],
  },
  {
    id: 3,
    title: "Database Optimization Techniques",
    category: "Backend",
    author: {
      name: "Emily Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    status: "published",
    views: 3241,
    lastUpdated: "Feb 21, 2026",
    tags: ["Database", "Performance"],
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    category: "Design",
    author: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
    status: "draft",
    views: 0,
    lastUpdated: "Feb 20, 2026",
    tags: ["Design", "UX"],
  },
  {
    id: 5,
    title: "API Security Best Practices",
    category: "Security",
    author: {
      name: "Lisa Martinez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    },
    status: "published",
    views: 2987,
    lastUpdated: "Feb 19, 2026",
    tags: ["Security", "API"],
  },
  {
    id: 6,
    title: "Introduction to GraphQL",
    category: "Development",
    author: {
      name: "James Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james",
    },
    status: "published",
    views: 1654,
    lastUpdated: "Feb 18, 2026",
    tags: ["GraphQL", "API"],
  },
  {
    id: 7,
    title: "Microservices Architecture Guide",
    category: "Backend",
    author: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    status: "review",
    views: 543,
    lastUpdated: "Feb 17, 2026",
    tags: ["Architecture", "Microservices"],
  },
  {
    id: 8,
    title: "CSS Grid Layout Masterclass",
    category: "Design",
    author: {
      name: "Emily Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
    status: "published",
    views: 2198,
    lastUpdated: "Feb 16, 2026",
    tags: ["CSS", "Layout"],
  },
];

const statusColors = {
  published: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  review: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
};

export function ArticlesPage() {
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleSelectAll = () => {
    if (selectedArticles.length === articles.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(articles.map((a) => a.id));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedArticles.includes(id)) {
      setSelectedArticles(selectedArticles.filter((i) => i !== id));
    } else {
      setSelectedArticles([...selectedArticles, id]);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Articles</h1>
          <p className="text-muted-foreground text-[14px]">
            Manage and organize your knowledge base articles
          </p>
        </div>
        <Link to="/editor">
          <Button className="gap-2">
            <Edit className="w-4 h-4" />
            Create Article
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedArticles.length > 0 && (
          <div className="mt-4 flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
            <span className="text-[14px] font-medium">
              {selectedArticles.length} selected
            </span>
            <div className="flex gap-1 ml-auto">
              <Button variant="ghost" size="sm" className="h-8">
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </Button>
              <Button variant="ghost" size="sm" className="h-8 text-destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-border">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedArticles.length === articles.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead className="min-w-[300px]">
                  <Button variant="ghost" size="sm" className="h-8 -ml-3">
                    Title
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                  </Button>
                </TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow
                  key={article.id}
                  className="border-border hover:bg-muted/50"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedArticles.includes(article.id)}
                      onCheckedChange={() => toggleSelect(article.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <Link
                        to={`/editor/${article.id}`}
                        className="font-medium text-[14px] hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                      <div className="flex gap-1 mt-1">
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-[11px] px-1.5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px]">{article.category}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={article.author.avatar} />
                        <AvatarFallback>
                          {article.author.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-[13px]">{article.author.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-[11px] ${
                        statusColors[article.status as keyof typeof statusColors]
                      }`}
                      variant="secondary"
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1 text-[13px]">
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[13px] text-muted-foreground">
                      {article.lastUpdated}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <div className="text-[13px] text-muted-foreground">
            Showing 1 to 8 of 124 articles
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}