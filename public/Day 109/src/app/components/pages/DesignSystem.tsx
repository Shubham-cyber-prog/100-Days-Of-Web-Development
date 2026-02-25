import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Badge } from "../ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

export function DesignSystem() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2">Design System</h1>
        <p className="text-muted-foreground">
          Components, styles, and guidelines for building consistent UIs.
        </p>
      </div>

      {/* Typography */}
      <section>
        <h2 className="text-foreground mb-6">Typography</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <h1>Heading 1 - 2xl</h1>
              <p className="text-muted-foreground text-sm">Used for page titles</p>
            </div>
            <div>
              <h2>Heading 2 - xl</h2>
              <p className="text-muted-foreground text-sm">Used for section titles</p>
            </div>
            <div>
              <h3>Heading 3 - lg</h3>
              <p className="text-muted-foreground text-sm">Used for card titles</p>
            </div>
            <div>
              <h4>Heading 4 - base</h4>
              <p className="text-muted-foreground text-sm">Used for small titles</p>
            </div>
            <div>
              <p>Body text - Regular paragraph text with normal weight</p>
              <p className="text-muted-foreground text-sm">Caption - Used for supporting text</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Colors */}
      <section>
        <h2 className="text-foreground mb-6">Color Tokens</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Primary", class: "bg-primary" },
            { name: "Secondary", class: "bg-secondary" },
            { name: "Accent", class: "bg-accent" },
            { name: "Muted", class: "bg-muted" },
            { name: "Destructive", class: "bg-destructive" },
            { name: "Border", class: "bg-border" },
            { name: "Card", class: "bg-card border border-border" },
            { name: "Background", class: "bg-background border border-border" },
          ].map((color) => (
            <Card key={color.name}>
              <div className={`h-24 rounded-t-lg ${color.class}`} />
              <CardContent className="pt-4">
                <p className="text-sm text-foreground">{color.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-foreground mb-6">Buttons</h2>
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div>
              <h4 className="text-foreground mb-4">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </div>
            <div>
              <h4 className="text-foreground mb-4">Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>
            <div>
              <h4 className="text-foreground mb-4">States</h4>
              <div className="flex flex-wrap gap-3">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Form Elements */}
      <section>
        <h2 className="text-foreground mb-6">Form Elements</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="block text-sm text-foreground mb-2">Text Input</label>
              <Input type="text" placeholder="Enter text..." />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Search Input</label>
              <Input type="search" placeholder="Search..." />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Disabled Input</label>
              <Input type="text" placeholder="Disabled..." disabled />
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Select</label>
              <select className="w-full h-10 px-3 rounded-lg border border-border bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-foreground mb-2">Textarea</label>
              <textarea
                placeholder="Enter longer text..."
                className="w-full h-24 px-3 py-2 rounded-lg border border-border bg-input-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Status Badges */}
      <section>
        <h2 className="text-foreground mb-6">Status Badges</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="published">Published</Badge>
              <Badge variant="draft">Draft</Badge>
              <Badge variant="archived">Archived</Badge>
              <Badge variant="default">Default</Badge>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-foreground mb-6">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Card with Header</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This is a card component with a header and content area. It uses consistent spacing and styling.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-foreground mb-2">Simple Card</h3>
              <p className="text-muted-foreground">
                This card has no header component, just content with padding.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Spacing System */}
      <section>
        <h2 className="text-foreground mb-6">Spacing System (8pt Grid)</h2>
        <Card>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">The design uses an 8pt grid system:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Small spacing: 8px (2 units)</li>
                <li>Medium spacing: 16px (4 units)</li>
                <li>Large spacing: 24px (6 units)</li>
                <li>XL spacing: 32px (8 units)</li>
              </ul>
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-8 bg-primary/20 rounded" style={{ width: '8px' }}>
                <span className="text-xs ml-12">8px</span>
              </div>
              <div className="h-8 bg-primary/20 rounded" style={{ width: '16px' }}>
                <span className="text-xs ml-20">16px</span>
              </div>
              <div className="h-8 bg-primary/20 rounded" style={{ width: '24px' }}>
                <span className="text-xs ml-28">24px</span>
              </div>
              <div className="h-8 bg-primary/20 rounded" style={{ width: '32px' }}>
                <span className="text-xs ml-36">32px</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Border Radius */}
      <section className="pb-12">
        <h2 className="text-foreground mb-6">Border Radius</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="size-24 bg-primary rounded-lg mb-2" />
                <p className="text-sm text-muted-foreground">8px (default)</p>
              </div>
              <div className="text-center">
                <div className="size-24 bg-primary rounded-full mb-2" />
                <p className="text-sm text-muted-foreground">Full (circle)</p>
              </div>
              <div className="text-center">
                <div className="size-24 bg-primary rounded-md mb-2" />
                <p className="text-sm text-muted-foreground">6px (small)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
