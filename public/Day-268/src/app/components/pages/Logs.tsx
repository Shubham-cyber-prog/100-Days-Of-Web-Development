import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { CheckCircle2, Upload, AlertCircle, RotateCcw, WifiOff, Download, Search } from "lucide-react";
import { useState } from "react";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "upload" | "download" | "synced" | "conflict" | "restored" | "error";
  message: string;
  file?: string;
  device?: string;
}

const allLogs: LogEntry[] = [
  { id: "1", timestamp: "2026-03-03 10:24:15", type: "upload", message: "Upload started", file: "Project_Proposal.pdf", device: "MacBook Pro" },
  { id: "2", timestamp: "2026-03-03 10:23:42", type: "synced", message: "File synced successfully", file: "vacation_photo.jpg", device: "iPhone 14" },
  { id: "3", timestamp: "2026-03-03 10:22:18", type: "conflict", message: "Conflict detected", file: "meeting_notes.docx", device: "Desktop PC" },
  { id: "4", timestamp: "2026-03-03 10:20:05", type: "synced", message: "File synced successfully", file: "presentation_video.mp4", device: "MacBook Pro" },
  { id: "5", timestamp: "2026-03-03 10:18:33", type: "upload", message: "Upload started", file: "audio_recording.mp3", device: "iPhone 14" },
  { id: "6", timestamp: "2026-03-03 10:15:20", type: "error", message: "Network error: Connection timeout", device: "Desktop PC" },
  { id: "7", timestamp: "2026-03-03 10:12:45", type: "restored", message: "Version restored", file: "budget_2026.xlsx", device: "MacBook Pro" },
  { id: "8", timestamp: "2026-03-03 10:10:12", type: "synced", message: "File synced successfully", file: "design_mockup.png", device: "iPhone 14" },
  { id: "9", timestamp: "2026-03-03 10:08:05", type: "download", message: "Download started", file: "contract_draft.pdf", device: "Desktop PC" },
  { id: "10", timestamp: "2026-03-03 10:05:30", type: "synced", message: "File synced successfully", file: "spreadsheet.xlsx", device: "MacBook Pro" },
  { id: "11", timestamp: "2026-03-03 10:02:15", type: "upload", message: "Upload completed", file: "report.docx", device: "iPhone 14" },
  { id: "12", timestamp: "2026-03-03 09:58:40", type: "error", message: "Sync failed: Insufficient storage", device: "Desktop PC" },
];

export function Logs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLogs = allLogs.filter((log) => {
    const matchesSearch = 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.file?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.device?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getLogIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4 text-blue-500" />;
      case "download":
        return <Download className="h-4 w-4 text-purple-500" />;
      case "synced":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "conflict":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "restored":
        return <RotateCcw className="h-4 w-4 text-purple-500" />;
      case "error":
        return <WifiOff className="h-4 w-4 text-orange-500" />;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      upload: "bg-blue-500",
      download: "bg-purple-500",
      synced: "bg-green-500",
      conflict: "bg-red-500",
      restored: "bg-purple-500",
      error: "bg-orange-500",
    };
    
    return <Badge className={colors[type]}>{type}</Badge>;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Logs</h2>
        <p className="mt-1 text-sm text-slate-600">View detailed sync activity logs</p>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle>Activity Logs</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[200px] pl-9"
                />
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="upload">Upload</SelectItem>
                  <SelectItem value="download">Download</SelectItem>
                  <SelectItem value="synced">Synced</SelectItem>
                  <SelectItem value="conflict">Conflict</SelectItem>
                  <SelectItem value="restored">Restored</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-slate-50">
                  <div className="mt-0.5">{getLogIcon(log.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-500">{log.timestamp}</span>
                      {getTypeBadge(log.type)}
                    </div>
                    <div className="mt-1 text-sm text-slate-900">{log.message}</div>
                    {log.file && (
                      <div className="mt-1 text-xs text-slate-600">File: {log.file}</div>
                    )}
                    {log.device && (
                      <div className="mt-0.5 text-xs text-slate-600">Device: {log.device}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
