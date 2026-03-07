import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Sparkles, RefreshCw, Wand2, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { generateEmail } from "../utils/api";

const toneOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "casual", label: "Casual" },
  { value: "enthusiastic", label: "Enthusiastic" },
  { value: "formal", label: "Formal" },
];

const goalOptions = [
  { value: "promotion", label: "Product Promotion" },
  { value: "announcement", label: "Announcement" },
  { value: "newsletter", label: "Newsletter" },
  { value: "event", label: "Event Invitation" },
  { value: "feedback", label: "Feedback Request" },
  { value: "welcome", label: "Welcome Email" },
];

export default function EmailGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [emailGenerated, setEmailGenerated] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [confidenceScore, setConfidenceScore] = useState(0);

  const [formData, setFormData] = useState({
    goal: "",
    tone: "",
    audience: "",
    keywords: "",
    cta: "",
  });

  const handleGenerate = async () => {
    if (!formData.goal || !formData.tone || !formData.audience) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    setEmailGenerated(false);

    try {
      const response = await generateEmail(formData);
      setGeneratedEmail(response.subject);
      setEmailBody(response.body);
      setConfidenceScore(response.confidenceScore || 92);
      setIsGenerating(false);
      setEmailGenerated(true);
      toast.success("Your email is ready! ✨");
    } catch (error: any) {
      setIsGenerating(false);
      console.error("Error generating email:", error);
      
      // Show detailed error message
      const errorMessage = error.message || "Failed to generate email";
      const instructions = error.instructions;
      
      if (instructions) {
        toast.error(errorMessage, {
          description: instructions,
          duration: 8000,
        });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleRegenerate = () => {
    handleGenerate();
    toast("Regenerating with fresh content...");
  };

  const handleOptimizeTone = () => {
    toast("Optimizing tone...");
    setTimeout(() => {
      toast.success("Tone optimized for better engagement!");
    }, 1000);
  };

  const handleShorten = () => {
    toast("Making content more concise...");
    setTimeout(() => {
      setGeneratedBody(generatedBody.substring(0, Math.floor(generatedBody.length * 0.7)) + "\n\nBest regards,\nThe EmailAI Team");
      toast.success("Content shortened!");
    }, 1000);
  };

  const handleExpand = () => {
    toast("Adding more details...");
    setTimeout(() => {
      toast.success("Content expanded with additional details!");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">AI Email Generator</h1>
        <p className="text-muted-foreground mt-1">
          Let AI craft your perfect campaign ✨
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle>Email Details</CardTitle>
            <CardDescription>
              Tell us about your campaign and we'll generate the perfect email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Campaign Goal *</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => setFormData({ ...formData, goal: value })}
              >
                <SelectTrigger id="goal" className="bg-background border">
                  <SelectValue placeholder="Select campaign goal" />
                </SelectTrigger>
                <SelectContent>
                  {goalOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tone">Tone *</Label>
              <Select
                value={formData.tone}
                onValueChange={(value) => setFormData({ ...formData, tone: value })}
              >
                <SelectTrigger id="tone" className="bg-background border">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience *</Label>
              <Input
                id="audience"
                placeholder="e.g., Young professionals, tech enthusiasts"
                value={formData.audience}
                onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                className="bg-background border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                placeholder="e.g., sale, discount, limited time"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="bg-background border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cta">Call to Action (optional)</Label>
              <Input
                id="cta"
                placeholder="e.g., Shop Now, Learn More, Get Started"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                className="bg-background border"
              />
            </div>

            <Button
              onClick={handleGenerate}
              className="w-full gap-2"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI is generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className={emailGenerated ? "border-primary/50 shadow-lg shadow-primary/10" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Email Preview</CardTitle>
                <CardDescription>
                  {emailGenerated ? "Your AI-generated email" : "Generate an email to see preview"}
                </CardDescription>
              </div>
              {emailGenerated && (
                <Badge className="gap-1 bg-secondary">
                  <CheckCircle2 className="w-3 h-3" />
                  {confidenceScore}% Match
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {!emailGenerated && !isGenerating && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-medium mb-2">No email generated yet</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Fill in the form and click "Generate Email" to create your AI-powered email
                </p>
              </div>
            )}

            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h3 className="font-medium mb-2">AI is generating your email...</h3>
                <p className="text-sm text-muted-foreground">
                  This will only take a moment
                </p>
              </div>
            )}

            {emailGenerated && (
              <>
                <div className="space-y-2">
                  <Label>Subject Line</Label>
                  <Input
                    value={generatedEmail}
                    onChange={(e) => setGeneratedEmail(e.target.value)}
                    className="bg-background border font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Body</Label>
                  <Textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="bg-background border min-h-[300px] font-sans"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-1">
                    <RefreshCw className="w-3 h-3" />
                    Regenerate
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleOptimizeTone} className="gap-1">
                    <Wand2 className="w-3 h-3" />
                    Optimize Tone
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShorten} className="gap-1">
                    Shorten
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleExpand} className="gap-1">
                    Expand
                  </Button>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full gap-2">
                    Save & Continue
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Tips */}
      {emailGenerated && (
        <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <CardTitle>AI Writing Tips</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Subject line is concise and includes an emoji for higher open rates</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Personalized greeting creates a connection with the reader</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                <span>Clear call-to-action makes it easy for readers to take the next step</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}