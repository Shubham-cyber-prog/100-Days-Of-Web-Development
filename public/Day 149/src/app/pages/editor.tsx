import { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  List,
  ListOrdered,
  Image,
  Code,
  Quote,
  Heading1,
  Heading2,
  Eye,
  Save,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const toolbarButtons = [
  { icon: Heading1, label: "Heading 1" },
  { icon: Heading2, label: "Heading 2" },
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: LinkIcon, label: "Link" },
  { icon: List, label: "Bullet List" },
  { icon: ListOrdered, label: "Numbered List" },
  { icon: Quote, label: "Quote" },
  { icon: Code, label: "Code Block" },
  { icon: Image, label: "Insert Image" },
];

const availableTags = [
  "React",
  "JavaScript",
  "TypeScript",
  "Tutorial",
  "Guide",
  "Best Practices",
  "Security",
  "Performance",
  "API",
  "Database",
];

export function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[28px] font-semibold mb-2">Create Article</h1>
          <p className="text-muted-foreground text-[14px]">
            Write and publish content to your knowledge base
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <X className="w-4 h-4" />
            Cancel
          </Button>
          <Button variant="outline" className="gap-2">
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
          <Button className="gap-2">
            <Eye className="w-4 h-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title Input */}
          <div className="bg-card border border-border rounded-xl p-6">
            <Input
              type="text"
              placeholder="Article Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-[32px] font-semibold border-0 px-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Editor Toolbar and Content */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Tabs defaultValue="edit" className="w-full">
              <div className="border-b border-border">
                <div className="flex items-center justify-between px-4">
                  <TabsList className="h-12 bg-transparent">
                    <TabsTrigger value="edit" className="text-[13px]">
                      Edit
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="text-[13px]">
                      Preview
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>

              <TabsContent value="edit" className="mt-0">
                {/* Toolbar */}
                <div className="flex items-center gap-1 px-4 py-3 border-b border-border bg-muted/30 flex-wrap">
                  {toolbarButtons.map((button, index) => {
                    const Icon = button.icon;
                    return (
                      <Button
                        key={index}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title={button.label}
                      >
                        <Icon className="w-4 h-4" />
                      </Button>
                    );
                  })}
                </div>

                {/* Content Area */}
                <Textarea
                  placeholder="Start writing your article..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[500px] border-0 resize-none focus-visible:ring-0 text-[15px] leading-relaxed p-6"
                />
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <div className="p-6 min-h-[500px]">
                  {content ? (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                        {content}
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-[400px]">
                      <div className="text-center">
                        <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground text-[14px]">
                          Nothing to preview yet
                        </p>
                        <p className="text-muted-foreground text-[13px] mt-1">
                          Start writing to see a preview
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar - Metadata */}
        <div className="space-y-4">
          {/* Category */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold mb-3">Category</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="devops">DevOps</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tags */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold mb-3">Tags</h3>
            <div className="space-y-3">
              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pl-2 pr-1 py-1 text-[12px] gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:bg-muted-foreground/20 rounded p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {/* Available Tags */}
              <div>
                <p className="text-[12px] text-muted-foreground mb-2">
                  Available tags:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags
                    .filter((tag) => !selectedTags.includes(tag))
                    .map((tag) => (
                      <button
                        key={tag}
                        onClick={() => addTag(tag)}
                        className="text-[11px] px-2 py-1 rounded-md bg-muted hover:bg-muted-foreground/20 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold mb-3">Status</h3>
            <Select defaultValue="draft">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">In Review</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* SEO */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold mb-3">SEO</h3>
            <div className="space-y-3">
              <div>
                <label className="text-[12px] text-muted-foreground mb-1.5 block">
                  Meta Description
                </label>
                <Textarea
                  placeholder="Brief description for search engines..."
                  className="h-20 text-[13px]"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  0 / 160 characters
                </p>
              </div>
              <div>
                <label className="text-[12px] text-muted-foreground mb-1.5 block">
                  URL Slug
                </label>
                <Input
                  placeholder="article-url-slug"
                  className="text-[13px]"
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-[14px] font-semibold mb-3">Featured Image</h3>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-[13px] text-muted-foreground">
                Click to upload
              </p>
              <p className="text-[11px] text-muted-foreground mt-1">
                PNG, JPG up to 5MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}