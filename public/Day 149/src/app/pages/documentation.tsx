import {
  FileText,
  FolderOpen,
  Tag,
  BarChart3,
  Users,
  Settings,
  Palette,
  Layout,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function DocumentationPage() {
  return (
    <div className="max-w-[1000px] mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-semibold mb-3">
          Custom Knowledge Base System
        </h1>
        <p className="text-[16px] text-muted-foreground">
          A modern, professional knowledge base management system built with React,
          TypeScript, and Tailwind CSS.
        </p>
      </div>

      {/* Overview */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-[14px]">
            This application provides a comprehensive solution for managing
            documentation and knowledge bases. It features a clean, intuitive
            interface inspired by modern productivity tools like Notion and
            Confluence.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">React Router</Badge>
            <Badge variant="secondary">Recharts</Badge>
            <Badge variant="secondary">Lucide Icons</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Key Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Layout className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Responsive Dashboard</h4>
                <p className="text-[13px] text-muted-foreground">
                  Clean, modern dashboard with key metrics, recent activity, and
                  quick access to important features.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Article Management</h4>
                <p className="text-[13px] text-muted-foreground">
                  Create, edit, and organize articles with a powerful rich text
                  editor. Support for categories, tags, and metadata.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                <FolderOpen className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Categories & Tags</h4>
                <p className="text-[13px] text-muted-foreground">
                  Organize content with customizable categories and tags for easy
                  discovery and navigation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Analytics & Insights</h4>
                <p className="text-[13px] text-muted-foreground">
                  Track article performance, views, engagement, and user behavior
                  with beautiful charts and graphs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Team Management</h4>
                <p className="text-[13px] text-muted-foreground">
                  Manage team members, roles, and permissions with granular access
                  control.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Customization</h4>
                <p className="text-[13px] text-muted-foreground">
                  Personalize your experience with theme settings, notifications,
                  and integrations.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Design System */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Design System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
              <Palette className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Visual Design</h4>
              <ul className="space-y-2 text-[13px] text-muted-foreground">
                <li>• Clean, minimal aesthetic with generous whitespace</li>
                <li>• Indigo primary accent color (#4f46e5)</li>
                <li>• Neutral grey palette for backgrounds and text</li>
                <li>• Rounded corners (12-16px) for modern feel</li>
                <li>• Soft shadows for depth and elevation</li>
                <li>• Consistent spacing using 4px base unit</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-teal-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Interaction Design</h4>
              <ul className="space-y-2 text-[13px] text-muted-foreground">
                <li>• Smooth transitions and hover states</li>
                <li>• Loading skeletons for async content</li>
                <li>• Empty and error states with helpful messaging</li>
                <li>• Responsive design for all screen sizes</li>
                <li>• Keyboard navigation support</li>
                <li>• Dark mode support with theme toggle</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Components */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Reusable Components</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Buttons",
              "Input Fields",
              "Dropdowns",
              "Modals",
              "Tabs",
              "Cards",
              "Tables",
              "Badges",
              "Avatars",
              "Switches",
              "Tooltips",
              "Alerts",
            ].map((component) => (
              <div
                key={component}
                className="px-4 py-2 bg-muted rounded-lg text-[13px]"
              >
                {component}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-[14px] mb-2">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>React 18</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Tailwind CSS v4</Badge>
                <Badge>React Router v7</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[14px] mb-2">UI Components</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Radix UI</Badge>
                <Badge>Lucide Icons</Badge>
                <Badge>Recharts</Badge>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-[14px] mb-2">Build Tools</h4>
              <div className="flex flex-wrap gap-2">
                <Badge>Vite</Badge>
                <Badge>PostCSS</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}