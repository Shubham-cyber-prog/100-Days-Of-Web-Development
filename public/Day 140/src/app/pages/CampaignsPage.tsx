import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Search, MoreVertical, Mail, Calendar, Eye, Edit, Trash2, Copy, Send } from "lucide-react";
import { useNavigate } from "react-router";

type CampaignStatus = "Draft" | "Scheduled" | "Sent" | "Failed";

interface Campaign {
  id: number;
  name: string;
  status: CampaignStatus;
  openRate: string;
  clickRate: string;
  sent: string;
  recipients: string;
  date: string;
  scheduledFor?: string;
}

const campaignsData: Campaign[] = [
  {
    id: 1,
    name: "Spring Sale Launch",
    status: "Sent",
    openRate: "45.2%",
    clickRate: "18.3%",
    sent: "15,432",
    recipients: "15,432",
    date: "Feb 18, 2026",
  },
  {
    id: 2,
    name: "Product Update Newsletter",
    status: "Sent",
    openRate: "38.7%",
    clickRate: "15.1%",
    sent: "12,891",
    recipients: "12,891",
    date: "Feb 17, 2026",
  },
  {
    id: 3,
    name: "Customer Feedback Request",
    status: "Scheduled",
    openRate: "-",
    clickRate: "-",
    sent: "0",
    recipients: "8,234",
    date: "Feb 21, 2026",
    scheduledFor: "Feb 21, 2026 at 9:00 AM",
  },
  {
    id: 4,
    name: "Weekly Digest #42",
    status: "Draft",
    openRate: "-",
    clickRate: "-",
    sent: "0",
    recipients: "10,500",
    date: "Feb 19, 2026",
  },
  {
    id: 5,
    name: "Valentine's Day Special",
    status: "Sent",
    openRate: "52.1%",
    clickRate: "22.4%",
    sent: "18,291",
    recipients: "18,291",
    date: "Feb 14, 2026",
  },
  {
    id: 6,
    name: "New Feature Announcement",
    status: "Sent",
    openRate: "41.3%",
    clickRate: "17.8%",
    sent: "14,782",
    recipients: "14,782",
    date: "Feb 12, 2026",
  },
  {
    id: 7,
    name: "Abandoned Cart Recovery",
    status: "Scheduled",
    openRate: "-",
    clickRate: "-",
    sent: "0",
    recipients: "1,234",
    date: "Feb 22, 2026",
    scheduledFor: "Feb 22, 2026 at 2:00 PM",
  },
  {
    id: 8,
    name: "Winter Clearance Sale",
    status: "Draft",
    openRate: "-",
    clickRate: "-",
    sent: "0",
    recipients: "20,000",
    date: "Feb 16, 2026",
  },
];

const statusColors: Record<CampaignStatus, string> = {
  Draft: "outline",
  Scheduled: "secondary",
  Sent: "default",
  Failed: "destructive",
};

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [campaigns, setCampaigns] = useState(campaignsData);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all your email campaigns
          </p>
        </div>
        <Button onClick={() => navigate("/generate")} className="gap-2">
          <Mail className="w-4 h-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Campaigns</CardDescription>
            <CardTitle className="text-3xl">127</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Sent This Month</CardDescription>
            <CardTitle className="text-3xl">42</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Scheduled</CardDescription>
            <CardTitle className="text-3xl">8</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Drafts</CardDescription>
            <CardTitle className="text-3xl">15</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>View and manage your email campaigns</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Open Rate</TableHead>
                <TableHead>Click Rate</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div>{campaign.name}</div>
                        {campaign.scheduledFor && (
                          <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Calendar className="w-3 h-3" />
                            {campaign.scheduledFor}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusColors[campaign.status] as any}>
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{campaign.recipients}</TableCell>
                  <TableCell>
                    <span className={campaign.openRate !== "-" ? "font-medium" : ""}>
                      {campaign.openRate}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={campaign.clickRate !== "-" ? "font-medium" : ""}>
                      {campaign.clickRate}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{campaign.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        {campaign.status === "Draft" && (
                          <>
                            <DropdownMenuItem onClick={() => navigate("/generate")}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Now
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
