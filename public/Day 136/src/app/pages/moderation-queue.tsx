import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Flag,
} from "lucide-react";
import { mockFlaggedContent, type FlaggedContent } from "../data/mock-data";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { Progress } from "../components/ui/progress";
import { motion } from "motion/react";
import { toast } from "sonner";

export default function ModerationQueue() {
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(
    null
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSeverity, setFilterSeverity] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredContent = mockFlaggedContent.filter((item) => {
    const matchesStatus =
      filterStatus === "all" || item.status === filterStatus;
    const matchesSeverity =
      filterSeverity === "all" || item.severity === filterSeverity;
    const matchesSearch =
      searchQuery === "" ||
      item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.flagType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Rejected
          </Badge>
        );
      case "escalated":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Escalated
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="bg-red-600">
            Critical
          </Badge>
        );
      case "high":
        return (
          <Badge variant="default" className="bg-orange-500">
            High
          </Badge>
        );
      case "medium":
        return (
          <Badge variant="default" className="bg-yellow-500">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge variant="secondary" className="bg-blue-500 text-white">
            Low
          </Badge>
        );
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };

  const handleAction = (action: string, itemId: string) => {
    toast.success(`Content ${action}`, {
      description: `Item ${itemId} has been ${action}.`,
    });
    setSelectedContent(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1">Moderation Queue</h1>
          <p className="text-muted-foreground">
            Review and take action on flagged content
          </p>
        </div>
        <Badge variant="secondary" className="h-8 px-4">
          {filteredContent.length} items
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by user, content, or flag type..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="escalated">Escalated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger className="w-full md:w-[180px]">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Flag Type</TableHead>
                <TableHead className="text-center">Confidence</TableHead>
                <TableHead className="text-center">Severity</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContent.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Search className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">No results found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your filters or search query
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredContent.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {item.user.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.user.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="truncate text-sm">{item.content}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.flagType}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant="secondary"
                        className={
                          item.confidence >= 90
                            ? "bg-green-100 text-green-700"
                            : item.confidence >= 70
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-orange-100 text-orange-700"
                        }
                      >
                        {item.confidence}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {getSeverityBadge(item.severity)}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(item.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedContent(item)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {item.status === "pending" && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleAction("approved", item.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleAction("rejected", item.id)}
                            >
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog
        open={!!selectedContent}
        onOpenChange={() => setSelectedContent(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          {selectedContent && (
            <>
              <DialogHeader>
                <DialogTitle>Content Review</DialogTitle>
                <DialogDescription>
                  Review the flagged content and AI analysis
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* User Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedContent.user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-lg">
                      {selectedContent.user.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedContent.user.email}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {getSeverityBadge(selectedContent.severity)}
                    {getStatusBadge(selectedContent.status)}
                  </div>
                </div>

                <Separator />

                {/* Content */}
                <div>
                  <h4 className="mb-3">Flagged Content</h4>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm">{selectedContent.content}</p>
                  </div>
                </div>

                {/* AI Analysis */}
                <div>
                  <h4 className="mb-3">AI Analysis</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">
                          Detection Type
                        </div>
                        <div className="font-medium">
                          {selectedContent.flagType}
                        </div>
                      </div>
                      <Badge variant="outline" className="text-lg px-4 py-1">
                        {selectedContent.category}
                      </Badge>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">Confidence Score</span>
                        <span className="text-sm font-medium">
                          {selectedContent.confidence}%
                        </span>
                      </div>
                      <Progress
                        value={selectedContent.confidence}
                        className="h-3"
                      />
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-blue-900 mb-1">
                            Why this was flagged
                          </div>
                          <p className="text-sm text-blue-800">
                            This content contains language patterns consistent
                            with {selectedContent.flagType.toLowerCase()}.
                            Multiple indicators were detected including hostile
                            tone, aggressive phrasing, and violation of
                            community guidelines.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div>
                  <h4 className="mb-3">Take Action</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="h-auto flex-col gap-2 py-4 border-green-200 hover:bg-green-50"
                      onClick={() =>
                        handleAction("approved", selectedContent.id)
                      }
                    >
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <ThumbsUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="font-medium">Approve</div>
                      <div className="text-xs text-muted-foreground">
                        False positive
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto flex-col gap-2 py-4 border-red-200 hover:bg-red-50"
                      onClick={() =>
                        handleAction("rejected", selectedContent.id)
                      }
                    >
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <ThumbsDown className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="font-medium">Reject</div>
                      <div className="text-xs text-muted-foreground">
                        Remove content
                      </div>
                    </Button>

                    <Button
                      variant="outline"
                      className="h-auto flex-col gap-2 py-4 border-orange-200 hover:bg-orange-50"
                      onClick={() =>
                        handleAction("escalated", selectedContent.id)
                      }
                    >
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <Flag className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="font-medium">Escalate</div>
                      <div className="text-xs text-muted-foreground">
                        Needs review
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
