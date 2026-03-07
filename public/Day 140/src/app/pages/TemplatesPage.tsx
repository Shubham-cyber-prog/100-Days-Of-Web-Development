import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Search, Eye, Copy, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";

interface Template {
  id: number;
  name: string;
  category: string;
  description: string;
  preview: string;
  rating: number;
  uses: number;
}

const templates: Template[] = [
  {
    id: 1,
    name: "Product Launch",
    category: "Promotion",
    description: "Perfect for announcing new products with eye-catching design",
    preview: "Introducing our latest innovation! Get ready to experience...",
    rating: 4.8,
    uses: 1234,
  },
  {
    id: 2,
    name: "Welcome Series",
    category: "Welcome",
    description: "Warm welcome email for new subscribers",
    preview: "Welcome aboard! We're thrilled to have you join our community...",
    rating: 4.9,
    uses: 2341,
  },
  {
    id: 3,
    name: "Flash Sale",
    category: "Promotion",
    description: "Create urgency with limited-time offers",
    preview: "⚡ 24 Hour Flash Sale! Don't miss out on these incredible deals...",
    rating: 4.7,
    uses: 1876,
  },
  {
    id: 4,
    name: "Newsletter Template",
    category: "Newsletter",
    description: "Clean and professional newsletter design",
    preview: "This month's highlights: Industry news, tips, and updates...",
    rating: 4.6,
    uses: 3421,
  },
  {
    id: 5,
    name: "Event Invitation",
    category: "Event",
    description: "Elegant invitation for webinars and events",
    preview: "You're invited! Join us for an exclusive event on...",
    rating: 4.8,
    uses: 987,
  },
  {
    id: 6,
    name: "Feedback Request",
    category: "Feedback",
    description: "Friendly template to gather customer feedback",
    preview: "We'd love to hear from you! Your opinion matters to us...",
    rating: 4.5,
    uses: 1543,
  },
  {
    id: 7,
    name: "Abandoned Cart",
    category: "Promotion",
    description: "Recover lost sales with gentle reminders",
    preview: "You left something behind! Complete your purchase and save...",
    rating: 4.9,
    uses: 2156,
  },
  {
    id: 8,
    name: "Monthly Digest",
    category: "Newsletter",
    description: "Summarize monthly updates and highlights",
    preview: "Your monthly roundup: Top stories, products, and more...",
    rating: 4.7,
    uses: 1654,
  },
];

const categories = ["All", "Promotion", "Welcome", "Newsletter", "Event", "Feedback"];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Templates Library</h1>
        <p className="text-muted-foreground mt-1">
          Choose from professionally designed email templates
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border"
          />
        </div>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary">{template.category}</Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{template.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              <div className="h-32 rounded-lg bg-gradient-to-br from-muted to-muted/50 p-4 border">
                <p className="text-sm text-foreground/80 line-clamp-4">
                  {template.preview}
                </p>
              </div>

              {/* Template Info */}
              <div>
                <h3 className="font-semibold text-lg mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
                <div className="text-xs text-muted-foreground mt-2">
                  Used {template.uses.toLocaleString()} times
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => setPreviewTemplate(template)}
                >
                  <Eye className="w-3 h-3" />
                  Preview
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gap-1"
                  onClick={() => navigate("/generate")}
                >
                  <Copy className="w-3 h-3" />
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2">No templates found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{previewTemplate?.name}</DialogTitle>
            <DialogDescription>{previewTemplate?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="rounded-lg border p-6 bg-background min-h-[300px]">
              <div className="space-y-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Subject: {previewTemplate?.name} - Special Offer Inside!
                </div>
                <div className="border-t pt-4">
                  <p className="whitespace-pre-line">{previewTemplate?.preview}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    [Rest of email content would appear here...]
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPreviewTemplate(null)}
              >
                Close
              </Button>
              <Button
                className="flex-1 gap-2"
                onClick={() => {
                  setPreviewTemplate(null);
                  navigate("/generate");
                }}
              >
                <Copy className="w-4 h-4" />
                Use This Template
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
