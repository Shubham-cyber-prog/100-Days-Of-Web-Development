import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Mail,
  Eye,
  CheckCircle2,
  AlertCircle,
  ChevronDown
} from "lucide-react";

export default function EmailPreviewPage() {
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [activeClient, setActiveClient] = useState("gmail");
  const [selectedEmail, setSelectedEmail] = useState("summer-sale");

  const emailTemplates = {
    "summer-sale": {
      subject: "🌞 Summer Sale: Save 50% Today!",
      preheader: "Don't miss out on our biggest sale of the season",
      from: "Marketing Team <marketing@example.com>",
      body: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Summer Sale</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px;">Save up to 50% on everything</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi there,</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Our biggest sale of the season is here! For a limited time, save up to 50% on all products. 
              This is your chance to get everything you've been waiting for at unbeatable prices.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" style="background: #4F46E5; color: white; padding: 16px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 16px;">
                Shop Now
              </a>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
              <div style="text-align: center; padding: 20px; background: #F3F4F6; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 18px;">Free Shipping</h3>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">On orders over $50</p>
              </div>
              <div style="text-align: center; padding: 20px; background: #F3F4F6; border-radius: 8px;">
                <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 18px;">Easy Returns</h3>
                <p style="margin: 0; color: #6B7280; font-size: 14px;">30-day guarantee</p>
              </div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Don't miss out - sale ends Sunday!
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #374151;">
              Best regards,<br/>
              The Marketing Team
            </p>
          </div>
          
          <div style="background: #F9FAFB; padding: 30px 20px; text-align: center; border-top: 1px solid #E5E7EB;">
            <p style="margin: 0 0 10px 0; color: #6B7280; font-size: 12px;">
              You're receiving this email because you subscribed to our newsletter.
            </p>
            <p style="margin: 0; color: #6B7280; font-size: 12px;">
              <a href="#" style="color: #4F46E5; text-decoration: none;">Unsubscribe</a> | 
              <a href="#" style="color: #4F46E5; text-decoration: none;">Preferences</a>
            </p>
          </div>
        </div>
      `,
    },
  };

  const devices = [
    { id: "desktop", name: "Desktop", icon: Monitor, width: "100%", maxWidth: "800px" },
    { id: "tablet", name: "Tablet", icon: Tablet, width: "768px", maxWidth: "768px" },
    { id: "mobile", name: "Mobile", icon: Smartphone, width: "375px", maxWidth: "375px" },
  ];

  const emailClients = [
    { id: "gmail", name: "Gmail", logo: "📧" },
    { id: "outlook", name: "Outlook", logo: "📨" },
    { id: "apple", name: "Apple Mail", logo: "✉️" },
    { id: "yahoo", name: "Yahoo", logo: "📬" },
  ];

  const compatibilityChecks = [
    { name: "HTML structure", status: "pass", message: "Valid HTML5 markup" },
    { name: "CSS support", status: "pass", message: "Inline styles used correctly" },
    { name: "Image optimization", status: "pass", message: "All images optimized" },
    { name: "Link tracking", status: "pass", message: "All links trackable" },
    { name: "Mobile responsive", status: "pass", message: "Responsive design detected" },
    { name: "Dark mode support", status: "warning", message: "Consider adding dark mode styles" },
    { name: "Accessibility", status: "pass", message: "Alt text present on images" },
  ];

  const currentEmail = emailTemplates[selectedEmail as keyof typeof emailTemplates];
  const currentDevice = devices.find(d => d.id === activeDevice)!;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Eye className="w-8 h-8 text-indigo-600" />
            Email Preview
          </h1>
          <p className="text-muted-foreground mt-1">
            Preview emails across different devices and clients
          </p>
        </div>
        <Button className="gap-2">
          <Mail className="w-4 h-4" />
          Send Test Email
        </Button>
      </div>

      {/* Device Selector */}
      <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
        <span className="text-sm font-medium">Preview on:</span>
        <div className="flex gap-2">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <Button
                key={device.id}
                variant={activeDevice === device.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDevice(device.id)}
                className="gap-2"
              >
                <Icon className="w-4 h-4" />
                {device.name}
              </Button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Email Client Tabs */}
          <Tabs value={activeClient} onValueChange={setActiveClient}>
            <TabsList className="grid w-full grid-cols-4">
              {emailClients.map((client) => (
                <TabsTrigger key={client.id} value={client.id}>
                  <span className="mr-2">{client.logo}</span>
                  {client.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {emailClients.map((client) => (
              <TabsContent key={client.id} value={client.id} className="mt-4">
                <Card className="overflow-hidden">
                  {/* Email Header */}
                  <div className="p-4 border-b bg-muted/30">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">From:</span>
                        <span className="text-sm text-muted-foreground">{currentEmail.from}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Subject:</span>
                        <span className="text-sm">{currentEmail.subject}</span>
                      </div>
                      <div className="text-xs text-muted-foreground italic">
                        {currentEmail.preheader}
                      </div>
                    </div>
                  </div>

                  {/* Email Body Preview */}
                  <div className="p-6 bg-white dark:bg-gray-900 flex justify-center overflow-x-auto">
                    <div 
                      style={{ 
                        width: currentDevice.width,
                        maxWidth: currentDevice.maxWidth,
                        transition: "all 0.3s ease"
                      }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ __html: currentEmail.body }}
                        className="shadow-lg"
                      />
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Sidebar - Compatibility & Info */}
        <div className="space-y-4">
          {/* Quick Stats */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Email Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Template:</span>
                <span className="font-medium">Summer Sale</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">42 KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Images:</span>
                <span className="font-medium">3 images</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Links:</span>
                <span className="font-medium">8 links</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Load time:</span>
                <span className="font-medium text-green-600">1.2s</span>
              </div>
            </div>
          </Card>

          {/* Compatibility Checks */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Compatibility
            </h3>
            <div className="space-y-2">
              {compatibilityChecks.map((check, index) => (
                <div key={index} className="flex items-start gap-3 text-sm">
                  {check.status === "pass" ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{check.name}</p>
                    <p className="text-xs text-muted-foreground">{check.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Email Client Support */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Client Support</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Gmail</span>
                <Badge variant="default" className="bg-green-600">100%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Outlook</span>
                <Badge variant="default" className="bg-green-600">98%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Apple Mail</span>
                <Badge variant="default" className="bg-green-600">100%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Yahoo Mail</span>
                <Badge variant="default" className="bg-green-600">95%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Mobile Apps</span>
                <Badge variant="default" className="bg-green-600">100%</Badge>
              </div>
            </div>
          </Card>

          {/* Tips */}
          <Card className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800">
            <h3 className="font-semibold mb-2 text-indigo-900 dark:text-indigo-100">💡 Pro Tip</h3>
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              Always test your emails on mobile devices - over 60% of emails are opened on mobile!
            </p>
          </Card>
        </div>
      </div>

      {/* Additional Options */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Advanced Preview Options</h3>
            <p className="text-sm text-muted-foreground">Test with different settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Toggle Dark Mode
            </Button>
            <Button variant="outline" size="sm">
              Disable Images
            </Button>
            <Button variant="outline" size="sm">
              Show Plain Text
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
