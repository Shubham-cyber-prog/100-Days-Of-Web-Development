import { useState } from "react";
import {
  Bookmark,
  BookmarkPlus,
  Trash2,
  ExternalLink,
  Folder,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";

interface SavedReport {
  id: string;
  title: string;
  description: string;
  type: "trend" | "competitor" | "customer" | "custom";
  savedAt: Date;
  lastViewed?: Date;
  tags: string[];
  isFavorite: boolean;
  url: string;
}

const mockReports: SavedReport[] = [
  {
    id: "1",
    title: "Q1 2026 Market Trends Analysis",
    description: "Comprehensive analysis of market trends in SaaS sector",
    type: "trend",
    savedAt: new Date(Date.now() - 2 * 86400000),
    lastViewed: new Date(Date.now() - 3600000),
    tags: ["Q1", "SaaS", "Growth"],
    isFavorite: true,
    url: "/app/trends",
  },
  {
    id: "2",
    title: "Competitor Pricing Strategy",
    description: "Detailed comparison of top 5 competitors pricing models",
    type: "competitor",
    savedAt: new Date(Date.now() - 5 * 86400000),
    lastViewed: new Date(Date.now() - 86400000),
    tags: ["Pricing", "Competition"],
    isFavorite: false,
    url: "/app/competitors",
  },
  {
    id: "3",
    title: "Customer Sentiment Dashboard",
    description: "Real-time sentiment analysis from social media and reviews",
    type: "customer",
    savedAt: new Date(Date.now() - 7 * 86400000),
    tags: ["Sentiment", "Social Media"],
    isFavorite: true,
    url: "/app/insights",
  },
  {
    id: "4",
    title: "Product Launch Impact Report",
    description: "Analysis of recent product launch on market positioning",
    type: "custom",
    savedAt: new Date(Date.now() - 10 * 86400000),
    lastViewed: new Date(Date.now() - 172800000),
    tags: ["Product Launch", "Impact Analysis"],
    isFavorite: false,
    url: "/app/reports",
  },
];

export function SavedReports() {
  const [reports, setReports] = useState<SavedReport[]>(mockReports);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [newReportTitle, setNewReportTitle] = useState("");
  const [newReportDescription, setNewReportDescription] = useState("");

  const toggleFavorite = (id: string) => {
    setReports((prev) =>
      prev.map((report) =>
        report.id === id ? { ...report, isFavorite: !report.isFavorite } : report
      )
    );
    const report = reports.find((r) => r.id === id);
    toast.success(report?.isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const deleteReport = (id: string) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
    toast.success("Report removed from saved items");
  };

  const saveCurrentPage = () => {
    if (!newReportTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    const newReport: SavedReport = {
      id: Date.now().toString(),
      title: newReportTitle,
      description: newReportDescription,
      type: "custom",
      savedAt: new Date(),
      tags: [],
      isFavorite: false,
      url: window.location.pathname,
    };

    setReports((prev) => [newReport, ...prev]);
    setNewReportTitle("");
    setNewReportDescription("");
    setIsSaveDialogOpen(false);
    toast.success("Report saved successfully!");
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const getTypeColor = (type: SavedReport["type"]) => {
    switch (type) {
      case "trend":
        return "bg-blue-100 text-blue-700";
      case "competitor":
        return "bg-purple-100 text-purple-700";
      case "customer":
        return "bg-green-100 text-green-700";
      case "custom":
        return "bg-gray-100 text-gray-700";
    }
  };

  const favoriteReports = reports.filter((r) => r.isFavorite);
  const recentReports = [...reports].sort(
    (a, b) => b.savedAt.getTime() - a.savedAt.getTime()
  );

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="relative">
            <Bookmark className="h-5 w-5" />
            {reports.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {reports.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-96 p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h3 className="font-semibold">Saved Reports</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {reports.length} saved item{reports.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="h-7 gap-1">
                  <BookmarkPlus className="h-3 w-3" />
                  Save Current
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Current Page</DialogTitle>
                  <DialogDescription>
                    Save this page to quickly access it later
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newReportTitle}
                      onChange={(e) => setNewReportTitle(e.target.value)}
                      placeholder="e.g., Q1 Market Analysis"
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (optional)</Label>
                    <Input
                      id="description"
                      value={newReportDescription}
                      onChange={(e) => setNewReportDescription(e.target.value)}
                      placeholder="Add a brief description"
                      className="mt-1.5"
                    />
                  </div>
                  <Button onClick={saveCurrentPage} className="w-full">
                    Save Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="h-[400px]">
            {reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="p-3 bg-gray-100 rounded-full mb-3">
                  <Bookmark className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium">No saved reports yet</p>
                <p className="text-xs text-gray-500 mt-1">
                  Save your favorite reports for quick access
                </p>
              </div>
            ) : (
              <div className="p-2">
                {favoriteReports.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 px-2 py-1 mb-2">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-gray-500">FAVORITES</span>
                    </div>
                    <div className="space-y-1">
                      {favoriteReports.map((report) => (
                        <ReportItem
                          key={report.id}
                          report={report}
                          onToggleFavorite={toggleFavorite}
                          onDelete={deleteReport}
                          onNavigate={() => setIsOpen(false)}
                          getTypeColor={getTypeColor}
                          formatDate={formatDate}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 px-2 py-1 mb-2">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-xs font-medium text-gray-500">RECENT</span>
                  </div>
                  <div className="space-y-1">
                    {recentReports.map((report) => (
                      <ReportItem
                        key={report.id}
                        report={report}
                        onToggleFavorite={toggleFavorite}
                        onDelete={deleteReport}
                        onNavigate={() => setIsOpen(false)}
                        getTypeColor={getTypeColor}
                        formatDate={formatDate}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>

          <div className="p-3 border-t bg-gray-50">
            <Button variant="ghost" className="w-full text-xs h-8">
              <Folder className="h-3 w-3 mr-2" />
              Manage all saved reports
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

interface ReportItemProps {
  report: SavedReport;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onNavigate: () => void;
  getTypeColor: (type: SavedReport["type"]) => string;
  formatDate: (date: Date) => string;
}

function ReportItem({
  report,
  onToggleFavorite,
  onDelete,
  onNavigate,
  getTypeColor,
  formatDate,
}: ReportItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="group p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
            {report.title}
          </h4>
          {report.description && (
            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
              {report.description}
            </p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className={`text-xs h-5 ${getTypeColor(report.type)}`}>
              {report.type}
            </Badge>
            <span className="text-xs text-gray-400">
              Saved {formatDate(report.savedAt)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(report.id)}
            className="h-7 w-7 p-0"
          >
            <Star
              className={`h-3 w-3 ${
                report.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-gray-400"
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(report.id)}
            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          window.location.href = report.url;
          onNavigate();
        }}
        className="w-full h-7 text-xs gap-1"
      >
        <ExternalLink className="h-3 w-3" />
        Open Report
      </Button>
    </motion.div>
  );
}
