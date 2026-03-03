import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, FileText, Image, Video, Music, Download } from "lucide-react";

const files = [
  { id: "1", name: "Project_Proposal.pdf", type: "document", size: "2.4 MB", status: "syncing", modified: "2026-03-03 10:24" },
  { id: "2", name: "vacation_photo.jpg", type: "image", size: "4.8 MB", status: "synced", modified: "2026-03-03 09:15" },
  { id: "3", name: "meeting_notes.docx", type: "document", size: "156 KB", status: "conflict", modified: "2026-03-02 16:45" },
  { id: "4", name: "presentation_video.mp4", type: "video", size: "125 MB", status: "synced", modified: "2026-03-02 14:30" },
  { id: "5", name: "budget_2026.xlsx", type: "document", size: "892 KB", status: "offline", modified: "2026-03-01 11:20" },
  { id: "6", name: "audio_recording.mp3", type: "audio", size: "12.3 MB", status: "syncing", modified: "2026-03-03 08:00" },
  { id: "7", name: "design_mockup.png", type: "image", size: "3.2 MB", status: "synced", modified: "2026-03-02 10:15" },
  { id: "8", name: "contract_draft.pdf", type: "document", size: "1.1 MB", status: "synced", modified: "2026-03-01 15:30" },
];

export function Files() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || file.status === statusFilter;
    const matchesType = typeFilter === "all" || file.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return Image;
      case "video":
        return Video;
      case "audio":
        return Music;
      default:
        return FileText;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-500">Synced</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500">Syncing</Badge>;
      case "conflict":
        return <Badge className="bg-red-500">Conflict</Badge>;
      case "offline":
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Files</h2>
        <p className="mt-1 text-sm text-slate-600">Browse and manage your synced files</p>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="synced">Synced</SelectItem>
                  <SelectItem value="syncing">Syncing</SelectItem>
                  <SelectItem value="conflict">Conflict</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Modified</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  
                  return (
                    <tr key={file.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <FileIcon className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-700">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-slate-600">{file.type}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{file.size}</td>
                      <td className="px-4 py-3">{getStatusBadge(file.status)}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{file.modified}</td>
                      <td className="px-4 py-3">
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
