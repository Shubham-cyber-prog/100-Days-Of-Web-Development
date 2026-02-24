import { Upload, Grid3x3, List, Search } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";

const mediaItems = [
  { id: 1, name: "hero-image.jpg", size: "2.4 MB", date: "2024-02-22" },
  { id: 2, name: "product-shot.png", size: "1.8 MB", date: "2024-02-21" },
  { id: 3, name: "logo-design.svg", size: "124 KB", date: "2024-02-20" },
  { id: 4, name: "banner.jpg", size: "3.1 MB", date: "2024-02-19" },
  { id: 5, name: "thumbnail.jpg", size: "890 KB", date: "2024-02-18" },
  { id: 6, name: "background.png", size: "1.2 MB", date: "2024-02-17" },
];

export function Media() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and files.</p>
        </div>
        <Button size="md">
          <Upload className="size-4" />
          Upload Media
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 w-full relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search media..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md">
            <Grid3x3 className="size-4" />
          </Button>
          <Button variant="ghost" size="md">
            <List className="size-4" />
          </Button>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaItems.map((item) => (
          <Card key={item.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
              <Upload className="size-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-foreground truncate mb-1">{item.name}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{item.size}</span>
              <span>{item.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
