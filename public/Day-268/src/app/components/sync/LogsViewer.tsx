import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { CheckCircle2, Upload, AlertCircle, RotateCcw, WifiOff } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "upload" | "synced" | "conflict" | "restored" | "error";
  message: string;
}

const logs: LogEntry[] = [
  { timestamp: "10:24:15", type: "upload", message: "Upload started: Project_Proposal.pdf" },
  { timestamp: "10:23:42", type: "synced", message: "File synced: vacation_photo.jpg" },
  { timestamp: "10:22:18", type: "conflict", message: "Conflict detected: meeting_notes.docx" },
  { timestamp: "10:20:05", type: "synced", message: "File synced: presentation_video.mp4" },
  { timestamp: "10:18:33", type: "upload", message: "Upload started: audio_recording.mp3" },
  { timestamp: "10:15:20", type: "error", message: "Network error: Connection timeout" },
  { timestamp: "10:12:45", type: "restored", message: "Version restored: budget_2026.xlsx" },
  { timestamp: "10:10:12", type: "synced", message: "File synced: design_mockup.png" },
];

export function LogsViewer() {
  const getLogIcon = (type: string) => {
    switch (type) {
      case "upload":
        return <Upload className="h-4 w-4 text-blue-500" />;
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

  return (
    <Card>
      <CardHeader className="border-b border-slate-200">
        <CardTitle>Logs Viewer</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[200px]">
          <div className="space-y-1 p-4 font-mono text-xs">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 py-1">
                <span className="text-slate-400">{log.timestamp}</span>
                {getLogIcon(log.type)}
                <span className="flex-1 text-slate-700">{log.message}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
