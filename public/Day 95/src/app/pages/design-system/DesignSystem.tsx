import { 
  Check, 
  X, 
  AlertCircle, 
  Info, 
  Home, 
  Settings, 
  User,
  ChevronDown 
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Switch } from "../../components/ui/switch";
import { Checkbox } from "../../components/ui/checkbox";
import { Label } from "../../components/ui/label";
import { Progress } from "../../components/ui/progress";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Skeleton } from "../../components/ui/skeleton";

export default function DesignSystem() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Design System</h1>
        <p className="text-slate-600 mt-1">
          A comprehensive guide to our design components and patterns
        </p>
      </div>

      {/* Color Palette */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Color Palette</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Primary Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-blue-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Blue 600</p>
                  <p className="text-xs text-slate-500">#3b82f6</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-indigo-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Indigo 600</p>
                  <p className="text-xs text-slate-500">#4f46e5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Neutral Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-900 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Slate 900</p>
                  <p className="text-xs text-slate-500">#0f172a</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-slate-500 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Slate 500</p>
                  <p className="text-xs text-slate-500">#64748b</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Status Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-green-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Green 600</p>
                  <p className="text-xs text-slate-500">#16a34a</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Red 600</p>
                  <p className="text-xs text-slate-500">#dc2626</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Accent Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Purple 600</p>
                  <p className="text-xs text-slate-500">#9333ea</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-orange-600 border border-slate-200" />
                <div>
                  <p className="font-medium text-sm">Orange 600</p>
                  <p className="text-xs text-slate-500">#ea580c</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Typography</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-slate-900">Heading 1 - 36px Bold</h1>
              <p className="text-sm text-slate-500">text-4xl font-bold</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-slate-900">Heading 2 - 30px Bold</h2>
              <p className="text-sm text-slate-500">text-3xl font-bold</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Heading 3 - 24px Bold</h3>
              <p className="text-sm text-slate-500">text-2xl font-bold</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-900">Heading 4 - 20px Bold</h4>
              <p className="text-sm text-slate-500">text-xl font-bold</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-base text-slate-900">Body Text - 16px Regular</p>
              <p className="text-sm text-slate-500">text-base</p>
            </div>
            <Separator />
            <div className="space-y-2">
              <p className="text-sm text-slate-600">Small Text - 14px Regular</p>
              <p className="text-sm text-slate-500">text-sm</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Buttons</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Primary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">Primary</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm">Small</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="lg">Large</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" disabled>Disabled</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Icon Buttons</h3>
                <div className="flex flex-wrap gap-3">
                  <Button size="icon">
                    <Home className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Elements */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Form Elements</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Input Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Input</Label>
                    <Input placeholder="Enter text..." />
                  </div>
                  <div className="space-y-2">
                    <Label>Disabled Input</Label>
                    <Input placeholder="Disabled" disabled />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-900">Checkboxes & Switches</h3>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check1" />
                    <Label htmlFor="check1">Checkbox</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check2" checked />
                    <Label htmlFor="check2">Checked</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="switch1" />
                    <Label htmlFor="switch1">Switch</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="switch2" checked />
                    <Label htmlFor="switch2">Enabled</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Badges</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-blue-600">Primary</Badge>
              <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">
                Info
              </Badge>
              <Badge variant="outline" className="border-green-200 text-green-700 bg-green-50">
                Success
              </Badge>
              <Badge variant="outline" className="border-orange-200 text-orange-700 bg-orange-50">
                Warning
              </Badge>
              <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">
                Error
              </Badge>
              <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">
                Purple
              </Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Alerts */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Alerts</h2>
        <div className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-900">Information</AlertTitle>
            <AlertDescription className="text-blue-700">
              This is an informational alert message.
            </AlertDescription>
          </Alert>

          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-900">Success</AlertTitle>
            <AlertDescription className="text-green-700">
              Your action was completed successfully.
            </AlertDescription>
          </Alert>

          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertTitle className="text-orange-900">Warning</AlertTitle>
            <AlertDescription className="text-orange-700">
              Please review this warning message.
            </AlertDescription>
          </Alert>

          <Alert className="border-red-200 bg-red-50">
            <X className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-900">Error</AlertTitle>
            <AlertDescription className="text-red-700">
              An error occurred. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Progress & Loading */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Progress & Loading</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Progress Bars</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">25%</span>
                  </div>
                  <Progress value={25} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <Progress value={100} />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-900">Skeleton Loading</h3>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Avatars */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Avatars</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <div className="flex flex-wrap items-center gap-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="flex -space-x-2">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=James" />
                  <AvatarFallback>JB</AvatarFallback>
                </Avatar>
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" />
                  <AvatarFallback>LA</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Spacing System */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Spacing System</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8 space-y-4">
            <p className="text-slate-600 mb-6">8px base spacing scale</p>
            <div className="space-y-3">
              {[1, 2, 3, 4, 6, 8, 12, 16].map((size) => (
                <div key={size} className="flex items-center gap-4">
                  <span className="text-sm text-slate-600 w-16">{size * 8}px</span>
                  <div className="h-8 bg-blue-600 rounded" style={{ width: `${size * 8}px` }} />
                  <span className="text-sm text-slate-500">Spacing-{size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Shadows & Elevation */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shadows & Elevation</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 text-center">
              <p className="font-medium">Shadow SM</p>
              <p className="text-xs text-slate-500 mt-1">shadow-sm</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow">
            <CardContent className="p-6 text-center">
              <p className="font-medium">Shadow MD</p>
              <p className="text-xs text-slate-500 mt-1">shadow</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-6 text-center">
              <p className="font-medium">Shadow LG</p>
              <p className="text-xs text-slate-500 mt-1">shadow-lg</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 shadow-xl">
            <CardContent className="p-6 text-center">
              <p className="font-medium">Shadow XL</p>
              <p className="text-xs text-slate-500 mt-1">shadow-xl</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Border Radius</h2>
        <Card className="border-slate-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-3">
                <div className="w-20 h-20 bg-blue-600 rounded" />
                <div className="text-sm">
                  <p className="font-medium">4px</p>
                  <p className="text-slate-500">rounded</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-20 h-20 bg-blue-600 rounded-lg" />
                <div className="text-sm">
                  <p className="font-medium">8px</p>
                  <p className="text-slate-500">rounded-lg</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-20 h-20 bg-blue-600 rounded-xl" />
                <div className="text-sm">
                  <p className="font-medium">12px</p>
                  <p className="text-slate-500">rounded-xl</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-20 h-20 bg-blue-600 rounded-full" />
                <div className="text-sm">
                  <p className="font-medium">Full</p>
                  <p className="text-slate-500">rounded-full</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
