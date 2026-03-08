import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Save, Eye, Upload, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";

export function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(id ? "Getting Started with React 19" : "");
  const [content, setContent] = useState("");
  const [seoOpen, setSeoOpen] = useState(false);

  const handlePublish = () => {
    // Handle publish logic
    alert("Content published!");
    navigate("/content");
  };

  return (
    <div className="max-w-[1000px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground mb-2">{id ? "Edit Post" : "New Post"}</h1>
          <p className="text-muted-foreground">Create and publish your content.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="md">
            <Eye className="size-4" />
            Preview
          </Button>
          <Button variant="secondary" size="md">
            <Save className="size-4" />
            Save Draft
          </Button>
          <Button size="md" onClick={handlePublish}>
            Publish
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="space-y-6">
        {/* Title Input */}
        <div>
          <Input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl h-14 border-0 bg-transparent px-0 focus:ring-0"
          />
        </div>

        {/* Rich Text Editor Area */}
        <Card className="min-h-[400px]">
          <textarea
            placeholder="Write your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full min-h-[400px] p-6 bg-transparent border-0 resize-none focus:outline-none text-foreground"
          />
        </Card>

        {/* Media Upload Panel */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-foreground">Featured Image</h3>
            <Button variant="secondary" size="sm">
              <Upload className="size-4" />
              Upload Image
            </Button>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
            <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground text-sm">
              Drag and drop an image or click to browse
            </p>
          </div>
        </Card>

        {/* SEO Settings Accordion */}
        <Card>
          <button
            onClick={() => setSeoOpen(!seoOpen)}
            className="w-full flex items-center justify-between"
          >
            <h3 className="text-foreground">SEO Settings</h3>
            {seoOpen ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </button>

          {seoOpen && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm text-foreground mb-2">Meta Title</label>
                <Input type="text" placeholder="Enter meta title..." />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Meta Description</label>
                <textarea
                  placeholder="Enter meta description..."
                  className="w-full h-20 px-3 py-2 rounded-lg border border-border bg-input-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-2">Keywords</label>
                <Input type="text" placeholder="keyword1, keyword2, keyword3..." />
              </div>
            </div>
          )}
        </Card>

        {/* Post Settings */}
        <Card>
          <h3 className="text-foreground mb-4">Post Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-foreground mb-2">Category</label>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Select a category</option>
                <option>Technology</option>
                <option>Design</option>
                <option>Development</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Tags</label>
              <Input type="text" placeholder="Add tags separated by commas..." />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Published Date</label>
              <Input type="date" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
