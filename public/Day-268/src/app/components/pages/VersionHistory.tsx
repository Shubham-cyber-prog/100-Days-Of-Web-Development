import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Clock, Download, RotateCcw, User } from "lucide-react";

const versionHistory = [
  {
    id: "1",
    fileName: "Project_Proposal.pdf",
    version: "v2.3",
    timestamp: "2026-03-03 10:24",
    device: "MacBook Pro",
    user: "John Doe",
    changes: "Updated budget section and timeline",
    size: "2.4 MB",
    isCurrent: true,
  },
  {
    id: "2",
    fileName: "Project_Proposal.pdf",
    version: "v2.2",
    timestamp: "2026-03-03 09:15",
    device: "MacBook Pro",
    user: "John Doe",
    changes: "Added executive summary",
    size: "2.3 MB",
    isCurrent: false,
  },
  {
    id: "3",
    fileName: "Project_Proposal.pdf",
    version: "v2.1",
    timestamp: "2026-03-02 16:45",
    device: "Desktop PC",
    user: "Jane Smith",
    changes: "Fixed formatting issues",
    size: "2.2 MB",
    isCurrent: false,
  },
  {
    id: "4",
    fileName: "meeting_notes.docx",
    version: "v1.8",
    timestamp: "2026-03-02 14:30",
    device: "MacBook Pro",
    user: "John Doe",
    changes: "Added action items from latest meeting",
    size: "156 KB",
    isCurrent: true,
  },
  {
    id: "5",
    fileName: "meeting_notes.docx",
    version: "v1.7",
    timestamp: "2026-03-02 10:20",
    device: "iPhone 14",
    user: "John Doe",
    changes: "Minor corrections",
    size: "155 KB",
    isCurrent: false,
  },
];

export function VersionHistory() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Version History</h2>
        <p className="mt-1 text-sm text-slate-600">Track and restore previous file versions</p>
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200">
          <CardTitle>File Versions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-100">
            {versionHistory.map((version) => (
              <div key={version.id} className="p-4 hover:bg-slate-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-slate-900">{version.fileName}</h4>
                      <Badge variant="outline">{version.version}</Badge>
                      {version.isCurrent && (
                        <Badge className="bg-blue-500">Current</Badge>
                      )}
                    </div>
                    <div className="mt-2 space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="h-4 w-4" />
                        <span>{version.timestamp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <User className="h-4 w-4" />
                        <span>{version.user} • {version.device}</span>
                      </div>
                      <div className="text-sm text-slate-700">
                        <span className="font-medium">Changes:</span> {version.changes}
                      </div>
                      <div className="text-sm text-slate-500">Size: {version.size}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                    {!version.isCurrent && (
                      <Button size="sm" variant="outline" className="text-blue-600">
                        <RotateCcw className="mr-1 h-4 w-4" />
                        Restore
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
