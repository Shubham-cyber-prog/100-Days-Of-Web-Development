import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import {
  LayoutDashboard,
  List,
  TrendingUp,
  Settings,
  LogIn,
  Palette,
  FileQuestion,
} from "lucide-react";

export default function Guide() {
  const pages = [
    {
      icon: LogIn,
      name: "Login Page",
      path: "/login",
      description:
        "Authentication screen with split layout, AI animation, and SSO options",
    },
    {
      icon: LayoutDashboard,
      name: "Dashboard",
      path: "/",
      description:
        "Main overview with analytics, real-time feed, charts, and performance metrics",
    },
    {
      icon: List,
      name: "Moderation Queue",
      path: "/queue",
      description:
        "Filterable table of flagged content with detailed review modal and action buttons",
    },
    {
      icon: TrendingUp,
      name: "AI Insights",
      path: "/insights",
      description:
        "Performance analytics, accuracy trends, category breakdowns, and AI recommendations",
    },
    {
      icon: Settings,
      name: "Settings",
      path: "/settings",
      description:
        "Configuration for AI rules, keyword filters, team permissions, and API integration",
    },
    {
      icon: Palette,
      name: "Components Library",
      path: "/components",
      description:
        "Showcase of all reusable components including buttons, badges, alerts, and forms",
    },
    {
      icon: FileQuestion,
      name: "Empty States",
      path: "/empty-states",
      description:
        "Collection of empty state designs for no content, no results, and no alerts",
    },
  ];

  const features = [
    "Responsive layout with collapsible sidebar",
    "Real-time content moderation dashboard",
    "AI confidence scoring and analysis",
    "Interactive charts with Recharts",
    "Smooth animations with Motion",
    "Toast notifications with Sonner",
    "Professional blue-violet color scheme",
    "Complete component library",
    "Empty state designs",
    "Loading states and animations",
  ];

  const components = [
    "StatusBadge - Consistent status indicators",
    "AlertBanner - Success/warning/error alerts",
    "ConfidenceScore - AI confidence meters",
    "LoadingSpinner - Processing animations",
    "EmptyState - No content placeholders",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Application Guide</h1>
        <p className="text-muted-foreground">
          Navigate and explore the ContentGuard AI platform
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Pages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.path}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <page.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4>{page.name}</h4>
                    <code className="text-xs bg-muted px-2 py-0.5 rounded">
                      {page.path}
                    </code>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {page.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Badge
                    variant="secondary"
                    className="mt-0.5 w-5 h-5 flex items-center justify-center p-0 text-xs"
                  >
                    {index + 1}
                  </Badge>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reusable Components</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {components.map((component) => {
                const [name, description] = component.split(" - ");
                return (
                  <div key={name}>
                    <div className="flex items-center gap-2 mb-1">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {name}
                      </code>
                    </div>
                    <p className="text-sm text-muted-foreground ml-2">
                      {description}
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design System</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="mb-3">Color Palette</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="h-16 rounded-lg bg-[#6366f1] mb-2"></div>
                  <div className="text-sm font-medium">Primary</div>
                  <code className="text-xs text-muted-foreground">#6366f1</code>
                </div>
                <div>
                  <div className="h-16 rounded-lg bg-[#8b5cf6] mb-2"></div>
                  <div className="text-sm font-medium">Accent</div>
                  <code className="text-xs text-muted-foreground">#8b5cf6</code>
                </div>
                <div>
                  <div className="h-16 rounded-lg bg-[#10b981] mb-2"></div>
                  <div className="text-sm font-medium">Success</div>
                  <code className="text-xs text-muted-foreground">#10b981</code>
                </div>
                <div>
                  <div className="h-16 rounded-lg bg-[#d4183d] mb-2"></div>
                  <div className="text-sm font-medium">Destructive</div>
                  <code className="text-xs text-muted-foreground">#d4183d</code>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">Typography</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <code className="text-xs w-16">text-3xl</code>
                  <h1 className="flex-1">Dashboard Heading</h1>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-xs w-16">text-xl</code>
                  <h2 className="flex-1">Section Heading</h2>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-xs w-16">text-lg</code>
                  <h3 className="flex-1">Card Title</h3>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-xs w-16">text-base</code>
                  <p className="flex-1">Body text and labels</p>
                </div>
                <div className="flex items-center gap-4">
                  <code className="text-xs w-16">text-sm</code>
                  <p className="flex-1 text-sm text-muted-foreground">
                    Secondary text and descriptions
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-3">Spacing & Borders</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground mb-2">Border Radius</div>
                  <code className="bg-muted px-2 py-1 rounded">0.75rem</code>
                </div>
                <div>
                  <div className="text-muted-foreground mb-2">Card Padding</div>
                  <code className="bg-muted px-2 py-1 rounded">1.5rem</code>
                </div>
                <div>
                  <div className="text-muted-foreground mb-2">Gap Spacing</div>
                  <code className="bg-muted px-2 py-1 rounded">1.5rem</code>
                </div>
                <div>
                  <div className="text-muted-foreground mb-2">Shadow</div>
                  <code className="bg-muted px-2 py-1 rounded">Soft subtle</code>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Technology Stack</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "React 18", description: "UI Framework" },
              { name: "React Router", description: "Navigation" },
              { name: "Tailwind CSS v4", description: "Styling" },
              { name: "Recharts", description: "Data Visualization" },
              { name: "Motion", description: "Animations" },
              { name: "Lucide Icons", description: "Icon Library" },
              { name: "Radix UI", description: "Primitives" },
              { name: "Sonner", description: "Toast Notifications" },
              { name: "TypeScript", description: "Type Safety" },
            ].map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-lg border border-border"
              >
                <div className="font-medium mb-1">{tech.name}</div>
                <div className="text-sm text-muted-foreground">
                  {tech.description}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
