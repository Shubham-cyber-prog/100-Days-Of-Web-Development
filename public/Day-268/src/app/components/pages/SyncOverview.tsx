import { useState } from "react";
import { SyncArchitectureDiagram } from "../sync/SyncArchitectureDiagram";
import { FileSyncPanel } from "../sync/FileSyncPanel";
import { FileDetailsPanel } from "../sync/FileDetailsPanel";
import { LogsViewer } from "../sync/LogsViewer";
import { AnalyticsSection } from "../sync/AnalyticsSection";

export interface FileData {
  id: string;
  name: string;
  size: string;
  lastModified: string;
  status: "synced" | "syncing" | "conflict" | "offline";
  progress: number;
  version: string;
  deviceOrigin: string;
}

export function SyncOverview() {
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="grid flex-1 grid-rows-2 gap-4 p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <SyncArchitectureDiagram />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <FileSyncPanel onSelectFile={setSelectedFile} selectedFileId={selectedFile?.id} />
            <div className="grid grid-cols-2 gap-4">
              <LogsViewer />
              <AnalyticsSection />
            </div>
          </div>
        </div>
      </div>
      
      {selectedFile && (
        <FileDetailsPanel file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  );
}
