import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Archive, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { Checkbox } from "../ui/Checkbox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/Table";

const contentData = [
  { id: 1, title: "Getting Started with React 19", author: "Sarah Chen", status: "published", lastEdited: "2024-02-20" },
  { id: 2, title: "10 Tips for Better UX Design", author: "Mike Johnson", status: "draft", lastEdited: "2024-02-21" },
  { id: 3, title: "Introduction to TypeScript", author: "Alex Kim", status: "published", lastEdited: "2024-02-19" },
  { id: 4, title: "Building Scalable APIs", author: "Emma Wilson", status: "draft", lastEdited: "2024-02-18" },
  { id: 5, title: "CSS Grid vs Flexbox", author: "Sarah Chen", status: "published", lastEdited: "2024-02-22" },
  { id: 6, title: "Modern JavaScript Features", author: "Mike Johnson", status: "archived", lastEdited: "2024-02-15" },
  { id: 7, title: "Responsive Web Design Principles", author: "Alex Kim", status: "published", lastEdited: "2024-02-17" },
  { id: 8, title: "State Management in React", author: "Emma Wilson", status: "draft", lastEdited: "2024-02-21" },
];

export function Content() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const filteredContent = contentData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map(item => item.id));
    }
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleBulkPublish = () => {
    toast.success(`Published ${selectedItems.length} items`);
    setSelectedItems([]);
  };

  const handleBulkArchive = () => {
    toast.success(`Archived ${selectedItems.length} items`);
    setSelectedItems([]);
  };

  const handleBulkDelete = () => {
    toast.error(`Deleted ${selectedItems.length} items`);
    setSelectedItems([]);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Content Manager</h1>
          <p className="text-muted-foreground">Manage all your content in one place.</p>
        </div>
        <Link to="/editor">
          <Button size="md">
            <Plus className="size-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Bulk Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-5 text-primary" />
            <span className="text-foreground">{selectedItems.length} items selected</span>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleBulkPublish}>
              <CheckCircle className="size-4" />
              Publish
            </Button>
            <Button variant="secondary" size="sm" onClick={handleBulkArchive}>
              <Archive className="size-4" />
              Archive
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="size-4" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title or author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-4 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          <Button variant="secondary" size="md">
            <Filter className="size-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedItems.length === filteredContent.length && filteredContent.length > 0}
                  onChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Edited</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContent.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="text-foreground">{item.title}</div>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">{item.author}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={item.status as "published" | "draft" | "archived"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-muted-foreground">{item.lastEdited}</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/editor/${item.id}`}>
                      <Button variant="ghost" size="sm">
                        <Edit className="size-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => toast.error("Item deleted")}>
                      <Trash2 className="size-4 text-destructive" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing {filteredContent.length} of {contentData.length} posts</div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" disabled>Previous</Button>
          <Button variant="secondary" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
}