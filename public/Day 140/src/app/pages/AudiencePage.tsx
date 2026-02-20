import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Users, Plus, X, Filter } from "lucide-react";
import { toast } from "sonner";

interface Condition {
  id: string;
  field: string;
  operator: string;
  value: string;
}

interface Segment {
  id: number;
  name: string;
  count: number;
  conditions: string;
  lastUpdated: string;
}

const savedSegments: Segment[] = [
  {
    id: 1,
    name: "High Engagers",
    count: 2341,
    conditions: "Open Rate > 50%",
    lastUpdated: "2 hours ago",
  },
  {
    id: 2,
    name: "New Subscribers",
    count: 1523,
    conditions: "Joined in last 30 days",
    lastUpdated: "1 day ago",
  },
  {
    id: 3,
    name: "Inactive Users",
    count: 892,
    conditions: "No opens in 60 days",
    lastUpdated: "3 days ago",
  },
  {
    id: 4,
    name: "Premium Customers",
    count: 456,
    conditions: "Purchase history > $500",
    lastUpdated: "1 week ago",
  },
];

const fieldOptions = [
  { value: "age", label: "Age" },
  { value: "location", label: "Location" },
  { value: "email_opens", label: "Email Opens" },
  { value: "email_clicks", label: "Email Clicks" },
  { value: "purchase_history", label: "Purchase History" },
  { value: "signup_date", label: "Signup Date" },
  { value: "engagement_score", label: "Engagement Score" },
];

const operatorOptions = [
  { value: "equals", label: "Equals" },
  { value: "not_equals", label: "Not Equals" },
  { value: "greater_than", label: "Greater Than" },
  { value: "less_than", label: "Less Than" },
  { value: "contains", label: "Contains" },
];

export default function AudiencePage() {
  const [conditions, setConditions] = useState<Condition[]>([
    { id: "1", field: "", operator: "", value: "" },
  ]);
  const [segmentName, setSegmentName] = useState("");
  const [estimatedCount, setEstimatedCount] = useState(0);

  const addCondition = () => {
    setConditions([
      ...conditions,
      { id: Date.now().toString(), field: "", operator: "", value: "" },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c) => c.id !== id));
  };

  const updateCondition = (id: string, field: keyof Condition, value: string) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    
    // Simulate count estimation
    const filledConditions = conditions.filter(c => c.field && c.operator && c.value);
    setEstimatedCount(Math.floor(Math.random() * 5000) + 500);
  };

  const handleSaveSegment = () => {
    if (!segmentName) {
      toast.error("Please enter a segment name");
      return;
    }
    
    const filledConditions = conditions.filter(c => c.field && c.operator && c.value);
    if (filledConditions.length === 0) {
      toast.error("Please add at least one condition");
      return;
    }

    toast.success("Segment saved successfully!");
    setSegmentName("");
    setConditions([{ id: "1", field: "", operator: "", value: "" }]);
    setEstimatedCount(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Audience Segmentation</h1>
        <p className="text-muted-foreground mt-1">
          Create targeted segments to reach the right audience
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Contacts</CardDescription>
            <CardTitle className="text-3xl">24,891</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Active Segments</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>New This Month</CardDescription>
            <CardTitle className="text-3xl">1,234</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Avg. Engagement</CardDescription>
            <CardTitle className="text-3xl">42%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Segment Builder */}
        <Card>
          <CardHeader>
            <CardTitle>Build New Segment</CardTitle>
            <CardDescription>
              Define conditions to create a targeted audience segment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="segment-name">Segment Name</Label>
              <Input
                id="segment-name"
                placeholder="e.g., High Value Customers"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
                className="bg-background border"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Conditions</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={addCondition}
                  className="gap-1"
                >
                  <Plus className="w-3 h-3" />
                  Add Condition
                </Button>
              </div>

              {conditions.map((condition, index) => (
                <div key={condition.id} className="space-y-2">
                  {index > 0 && (
                    <div className="text-xs font-medium text-muted-foreground px-2">
                      AND
                    </div>
                  )}
                  <div className="flex gap-2 items-start p-3 rounded-lg border bg-card">
                    <div className="flex-1 space-y-2">
                      <Select
                        value={condition.field}
                        onValueChange={(value) =>
                          updateCondition(condition.id, "field", value)
                        }
                      >
                        <SelectTrigger className="bg-background border">
                          <SelectValue placeholder="Select field" />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={condition.operator}
                        onValueChange={(value) =>
                          updateCondition(condition.id, "operator", value)
                        }
                      >
                        <SelectTrigger className="bg-background border">
                          <SelectValue placeholder="Select operator" />
                        </SelectTrigger>
                        <SelectContent>
                          {operatorOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Input
                        placeholder="Enter value"
                        value={condition.value}
                        onChange={(e) =>
                          updateCondition(condition.id, "value", e.target.value)
                        }
                        className="bg-background border"
                      />
                    </div>

                    {conditions.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCondition(condition.id)}
                        className="mt-1"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {estimatedCount > 0 && (
              <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Estimated Audience</span>
                </div>
                <Badge variant="secondary" className="text-base">
                  {estimatedCount.toLocaleString()} contacts
                </Badge>
              </div>
            )}

            <Button onClick={handleSaveSegment} className="w-full">
              Save Segment
            </Button>
          </CardContent>
        </Card>

        {/* Saved Segments */}
        <Card>
          <CardHeader>
            <CardTitle>Saved Segments</CardTitle>
            <CardDescription>Your existing audience segments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedSegments.map((segment) => (
                <div
                  key={segment.id}
                  className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{segment.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {segment.conditions}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {segment.count.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Updated {segment.lastUpdated}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
