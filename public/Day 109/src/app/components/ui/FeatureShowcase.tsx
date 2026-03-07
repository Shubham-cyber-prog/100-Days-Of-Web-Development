import { CheckCircle2, Command, Bell, Eye, Moon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";

const features = [
  {
    icon: Bell,
    title: "Toast Notifications",
    description: "Real-time feedback system using Sonner for success, error, and info messages throughout the app.",
    usage: "Used in Editor, Content Manager, and all interactive actions"
  },
  {
    icon: CheckCircle2,
    title: "Bulk Actions & Multi-Select",
    description: "Select multiple content items with checkboxes and perform bulk operations like publish, archive, or delete.",
    usage: "Available in Content Manager page with visual selection indicators"
  },
  {
    icon: Eye,
    title: "Content Preview Modal",
    description: "Preview your content before publishing with a clean modal interface that shows how it will appear.",
    usage: "Accessible from the Editor page via Preview button"
  },
  {
    icon: Command,
    title: "Keyboard Shortcuts (Command Palette)",
    description: "Quick navigation to any page using Ctrl+K (Cmd+K on Mac) with fuzzy search functionality.",
    usage: "Press Ctrl/Cmd+K from anywhere to open the command palette"
  },
  {
    icon: Moon,
    title: "Persistent Dark/Light Mode",
    description: "Theme preference automatically saved to localStorage and restored on page reload.",
    usage: "Toggle via theme button in top navigation bar"
  }
];

export function FeatureShowcase() {
  return (
    <div className="space-y-4">
      <h2 className="text-foreground mb-4">New Features Added</h2>
      <div className="grid grid-cols-1 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                    <p className="text-xs text-muted-foreground italic">Usage: {feature.usage}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
