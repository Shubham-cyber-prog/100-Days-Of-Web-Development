import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

const conflicts = [
  {
    id: "1",
    fileName: "meeting_notes.docx",
    timestamp: "2026-03-03 10:15",
    localVersion: {
      modifiedBy: "MacBook Pro",
      modifiedAt: "2026-03-03 10:15",
      size: "158 KB",
    },
    cloudVersion: {
      modifiedBy: "Desktop PC",
      modifiedAt: "2026-03-03 10:14",
      size: "156 KB",
    },
  },
  {
    id: "2",
    fileName: "budget_2026.xlsx",
    timestamp: "2026-03-02 16:30",
    localVersion: {
      modifiedBy: "iPhone 14",
      modifiedAt: "2026-03-02 16:30",
      size: "892 KB",
    },
    cloudVersion: {
      modifiedBy: "MacBook Pro",
      modifiedAt: "2026-03-02 16:28",
      size: "890 KB",
    },
  },
];

export function Conflicts() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Conflicts</h2>
        <p className="mt-1 text-sm text-slate-600">Resolve sync conflicts between versions</p>
      </div>

      {conflicts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h3 className="mt-4 font-medium text-slate-900">No Conflicts</h3>
            <p className="mt-2 text-sm text-slate-600">All files are synced successfully</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {conflicts.map((conflict) => (
            <Card key={conflict.id} className="border-red-200">
              <CardHeader className="border-b border-red-100 bg-red-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <CardTitle className="text-base text-red-900">{conflict.fileName}</CardTitle>
                      <p className="mt-1 text-xs text-red-700">Conflict detected at {conflict.timestamp}</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500">Requires Resolution</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Local Version */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h4 className="mb-3 font-medium text-slate-900">Local Version</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-600">Modified by:</span>
                        <div className="text-slate-900">{conflict.localVersion.modifiedBy}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Modified at:</span>
                        <div className="text-slate-900">{conflict.localVersion.modifiedAt}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Size:</span>
                        <div className="text-slate-900">{conflict.localVersion.size}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Version */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <h4 className="mb-3 font-medium text-slate-900">Cloud Version</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-slate-600">Modified by:</span>
                        <div className="text-slate-900">{conflict.cloudVersion.modifiedBy}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Modified at:</span>
                        <div className="text-slate-900">{conflict.cloudVersion.modifiedAt}</div>
                      </div>
                      <div>
                        <span className="text-slate-600">Size:</span>
                        <div className="text-slate-900">{conflict.cloudVersion.size}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        Keep Local Version
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Keep Local Version?</DialogTitle>
                        <DialogDescription>
                          This will replace the cloud version with your local version. The cloud version will be saved as a previous version.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-blue-500 hover:bg-blue-600">Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Keep Cloud Version</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Keep Cloud Version?</DialogTitle>
                        <DialogDescription>
                          This will replace your local version with the cloud version. Your local changes will be saved as a previous version.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="bg-blue-500 hover:bg-blue-600">Confirm</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline">
                    <Copy className="mr-2 h-4 w-4" />
                    Keep Both
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}