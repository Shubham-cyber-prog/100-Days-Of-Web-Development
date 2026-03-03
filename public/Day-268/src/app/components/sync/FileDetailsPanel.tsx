import { X, Download, RotateCcw, Clock, Laptop } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { FileData } from "../pages/SyncOverview";
import { Badge } from "../ui/badge";

interface FileDetailsPanelProps {
  file: FileData;
  onClose: () => void;
}

const syncHistory = [
  { timestamp: "2026-03-03 10:24", action: "Upload started", device: "MacBook Pro" },
  { timestamp: "2026-03-03 10:22", action: "File modified", device: "MacBook Pro" },
  { timestamp: "2026-03-03 09:45", action: "Synced successfully", device: "MacBook Pro" },
  { timestamp: "2026-03-03 08:30", action: "Downloaded to device", device: "iPhone 14" },
  { timestamp: "2026-03-02 16:20", action: "Version created", device: "Desktop PC" },
];

export function FileDetailsPanel({ file, onClose }: FileDetailsPanelProps) {
  return (
    <aside className="w-80 border-l border-slate-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
        <h3 className="font-semibold text-slate-800">File Details</h3>
        <Button size="sm" variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-6 p-4">
        {/* File Info */}
        <div>
          <div className="text-sm font-medium text-slate-900">{file.name}</div>
          <div className="mt-1 text-xs text-slate-500">{file.size}</div>
        </div>

        <Separator />

        {/* Device Origin */}
        <div>
          <div className="mb-2 text-xs font-medium text-slate-600">Device Origin</div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 p-2">
            <Laptop className="h-4 w-4 text-slate-600" />
            <span className="text-sm text-slate-700">{file.deviceOrigin}</span>
          </div>
        </div>

        <Separator />

        {/* Current Status */}
        <div>
          <div className="mb-2 text-xs font-medium text-slate-600">Current Status</div>
          <div className="flex items-center justify-between">
            <Badge
              className={
                file.status === "synced"
                  ? "bg-green-500"
                  : file.status === "syncing"
                  ? "bg-blue-500"
                  : file.status === "conflict"
                  ? "bg-red-500"
                  : "bg-slate-400"
              }
            >
              {file.status}
            </Badge>
            <span className="text-sm text-slate-600">{file.version}</span>
          </div>
        </div>

        <Separator />

        {/* Sync History Timeline */}
        <div>
          <div className="mb-3 text-xs font-medium text-slate-600">Sync History</div>
          <div className="space-y-3">
            {syncHistory.map((event, index) => (
              <div key={index} className="relative flex gap-3 pb-3">
                {index !== syncHistory.length - 1 && (
                  <div className="absolute left-[7px] top-6 h-full w-px bg-slate-200" />
                )}
                <div className="relative mt-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-slate-700">{event.action}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{event.timestamp}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{event.device}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Conflict Resolution (if conflict) */}
        {file.status === "conflict" && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-red-800">Conflict Detected</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-3">
              <Button size="sm" variant="outline" className="w-full">
                Keep Local Version
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Keep Cloud Version
              </Button>
              <Button size="sm" variant="outline" className="w-full">
                Keep Both
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button size="sm" variant="outline" className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restore Previous Version
          </Button>
          <Button size="sm" className="w-full bg-blue-500 hover:bg-blue-600">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </aside>
  );
}
