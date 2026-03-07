import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { FileText, Check, X, AlertCircle } from "lucide-react";

export function StyleGuide() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-[32px] font-semibold mb-3">Design System</h1>
        <p className="text-muted-foreground">
          A comprehensive style guide for the Custom Knowledge Base System
        </p>
      </div>

      {/* Typography */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h1 className="mb-2">Heading 1 - 32px</h1>
              <code className="text-[12px] bg-muted px-2 py-1 rounded">
                text-[32px] font-semibold
              </code>
            </div>
            <Separator />
            <div>
              <h2 className="mb-2">Heading 2 - 28px</h2>
              <code className="text-[12px] bg-muted px-2 py-1 rounded">
                text-[28px] font-semibold
              </code>
            </div>
            <Separator />
            <div>
              <h3 className="mb-2">Heading 3 - 18px</h3>
              <code className="text-[12px] bg-muted px-2 py-1 rounded">
                text-[18px] font-semibold
              </code>
            </div>
            <Separator />
            <div>
              <p className="text-[14px] mb-2">Body Text - 14px</p>
              <code className="text-[12px] bg-muted px-2 py-1 rounded">
                text-[14px]
              </code>
            </div>
            <Separator />
            <div>
              <p className="text-[13px] text-muted-foreground mb-2">
                Caption Text - 13px
              </p>
              <code className="text-[12px] bg-muted px-2 py-1 rounded">
                text-[13px] text-muted-foreground
              </code>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Colors */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-24 bg-primary rounded-xl mb-2 flex items-center justify-center text-primary-foreground">
                  Primary
                </div>
                <code className="text-[11px]">#4f46e5</code>
              </div>
              <div>
                <div className="h-24 bg-emerald-600 rounded-xl mb-2 flex items-center justify-center text-white">
                  Success
                </div>
                <code className="text-[11px]">#10b981</code>
              </div>
              <div>
                <div className="h-24 bg-amber-600 rounded-xl mb-2 flex items-center justify-center text-white">
                  Warning
                </div>
                <code className="text-[11px]">#f59e0b</code>
              </div>
              <div>
                <div className="h-24 bg-destructive rounded-xl mb-2 flex items-center justify-center text-destructive-foreground">
                  Danger
                </div>
                <code className="text-[11px]">#ef4444</code>
              </div>
              <div>
                <div className="h-24 bg-card border border-border rounded-xl mb-2 flex items-center justify-center">
                  Card
                </div>
                <code className="text-[11px]">bg-card</code>
              </div>
              <div>
                <div className="h-24 bg-muted rounded-xl mb-2 flex items-center justify-center">
                  Muted
                </div>
                <code className="text-[11px]">bg-muted</code>
              </div>
              <div>
                <div className="h-24 bg-background border border-border rounded-xl mb-2 flex items-center justify-center">
                  Background
                </div>
                <code className="text-[11px]">bg-background</code>
              </div>
              <div>
                <div className="h-24 bg-foreground rounded-xl mb-2 flex items-center justify-center text-background">
                  Foreground
                </div>
                <code className="text-[11px]">bg-foreground</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Buttons */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="destructive">Destructive Button</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>
            <Separator />
            <div className="flex flex-wrap gap-3">
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                With Icon
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Inputs */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Form Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input placeholder="Text Input" />
            </div>
            <div>
              <Input type="email" placeholder="Email Input" />
            </div>
            <div>
              <Input type="search" placeholder="Search Input" />
            </div>
            <div>
              <Input disabled placeholder="Disabled Input" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Success
              </Badge>
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                Warning
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Icons */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Icons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <span className="text-[12px]">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Check className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-[12px]">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-[12px]">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-[12px]">Danger</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Switches & Toggles */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Switches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Enabled Switch</span>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-[14px]">Disabled Switch</span>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spacing */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Spacing Scale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[1, 2, 3, 4, 6, 8, 12, 16, 24].map((size) => (
              <div key={size} className="flex items-center gap-4">
                <code className="text-[12px] w-16">{size * 4}px</code>
                <div
                  className="bg-primary h-6 rounded"
                  style={{ width: `${size * 4}px` }}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Border Radius */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Border Radius</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-2 rounded-lg" />
                <code className="text-[11px]">12px (default)</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-2 rounded-xl" />
                <code className="text-[11px]">16px (xl)</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-2 rounded-2xl" />
                <code className="text-[11px]">24px (2xl)</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary mx-auto mb-2 rounded-full" />
                <code className="text-[11px]">full</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Shadows */}
      <section>
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Shadows</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-card border border-border mx-auto mb-2 rounded-xl shadow-sm" />
                <code className="text-[11px]">shadow-sm</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-card border border-border mx-auto mb-2 rounded-xl shadow-md" />
                <code className="text-[11px]">shadow-md</code>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-card border border-border mx-auto mb-2 rounded-xl shadow-lg" />
                <code className="text-[11px]">shadow-lg</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}