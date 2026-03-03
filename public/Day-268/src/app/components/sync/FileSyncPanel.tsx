import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FileData } from "../pages/SyncOverview";
import { FileText, Image, Video, Music } from "lucide-react";

interface FileSyncPanelProps {
  onSelectFile: (file: FileData) => void;
  selectedFileId?: string;
}

const mockFiles: FileData[] = [
  {
    id: "1",
    name: "Project_Proposal.pdf",
    size: "2.4 MB",
    lastModified: "2026-03-03 10:24",
    status: "syncing",
    progress: 65,
    version: "v2.3",
    deviceOrigin: "MacBook Pro",
  },
  {
    id: "2",
    name: "vacation_photo.jpg",
    size: "4.8 MB",
    lastModified: "2026-03-03 09:15",
    status: "synced",
    progress: 100,
    version: "v1.0",
    deviceOrigin: "iPhone 14",
  },
  {
    id: "3",
    name: "meeting_notes.docx",
    size: "156 KB",
    lastModified: "2026-03-02 16:45",
    status: "conflict",
    progress: 0,
    version: "v1.8",
    deviceOrigin: "Desktop PC",
  },
  {
    id: "4",
    name: "presentation_video.mp4",
    size: "125 MB",
    lastModified: "2026-03-02 14:30",
    status: "synced",
    progress: 100,
    version: "v1.2",
    deviceOrigin: "MacBook Pro",
  },
  {
    id: "5",
    name: "budget_2026.xlsx",
    size: "892 KB",
    lastModified: "2026-03-01 11:20",
    status: "offline",
    progress: 0,
    version: "v3.1",
    deviceOrigin: "Desktop PC",
  },
  {
    id: "6",
    name: "audio_recording.mp3",
    size: "12.3 MB",
    lastModified: "2026-03-03 08:00",
    status: "syncing",
    progress: 42,
    version: "v1.0",
    deviceOrigin: "iPhone 14",
  },
];

export function FileSyncPanel({ onSelectFile, selectedFileId }: FileSyncPanelProps) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [files] = useState(mockFiles);

  const filteredFiles = statusFilter === "all" 
    ? files 
    : files.filter(f => f.status === statusFilter);

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'jpg':
      case 'png':
      case 'gif':
        return Image;
      case 'mp4':
      case 'mov':
        return Video;
      case 'mp3':
      case 'wav':
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
    <Card>
      <CardHeader className="border-b border-slate-200">
        <div className="flex items-center justify-between">
          <CardTitle>File Sync Panel</CardTitle>
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Filter:</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
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
        <div className="max-h-[300px] overflow-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">File Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Size</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Last Modified</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Progress</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-600">Version</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => {
                const FileIcon = getFileIcon(file.name);
                const isSelected = file.id === selectedFileId;
                
                return (
                  <tr
                    key={file.id}
                    onClick={() => onSelectFile(file)}
                    className={`cursor-pointer border-b border-slate-100 transition-colors hover:bg-blue-50 ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-700">{file.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{file.size}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{file.lastModified}</td>
                    <td className="px-4 py-3">{getStatusBadge(file.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Progress value={file.progress} className="h-2 w-20" />
                        <span className="text-xs text-slate-600">{file.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{file.version}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
