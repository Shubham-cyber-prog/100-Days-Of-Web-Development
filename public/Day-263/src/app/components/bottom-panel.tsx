import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { FileExplorer, FileNode } from './file-explorer';
import { Clock } from 'lucide-react';

interface BottomPanelProps {
  commandHistory: Array<{ command: string; timestamp: Date }>;
  fileSystem: FileNode;
  logs: Array<{ message: string; timestamp: Date; type: 'info' | 'error' | 'warning' }>;
  onCommandClick: (command: string) => void;
  onFileSelect: (path: string) => void;
}

export function BottomPanel({
  commandHistory,
  fileSystem,
  logs,
  onCommandClick,
  onFileSelect,
}: BottomPanelProps) {
  return (
    <div className="h-64 bg-zinc-900 border-t border-zinc-800">
      <Tabs defaultValue="history" className="h-full">
        <TabsList className="w-full justify-start rounded-none border-b border-zinc-800 bg-zinc-900 p-0">
          <TabsTrigger 
            value="history" 
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-400 data-[state=active]:bg-transparent"
          >
            Command History
          </TabsTrigger>
          <TabsTrigger 
            value="files"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-400 data-[state=active]:bg-transparent"
          >
            File Explorer
          </TabsTrigger>
          <TabsTrigger 
            value="logs"
            className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-green-400 data-[state=active]:bg-transparent"
          >
            Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="history" className="h-[calc(100%-41px)] mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {commandHistory.length === 0 ? (
                <div className="text-zinc-500 text-sm">No command history yet</div>
              ) : (
                commandHistory.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => onCommandClick(item.command)}
                    className="w-full text-left p-2 rounded hover:bg-zinc-800 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-green-400 group-hover:text-green-300">
                        {item.command}
                      </span>
                      <span className="text-xs text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="files" className="h-[calc(100%-41px)] mt-0">
          <FileExplorer fileSystem={fileSystem} onFileSelect={onFileSelect} />
        </TabsContent>
        
        <TabsContent value="logs" className="h-[calc(100%-41px)] mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2 font-mono text-sm">
              {logs.length === 0 ? (
                <div className="text-zinc-500">No logs yet</div>
              ) : (
                logs.map((log, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      log.type === 'error'
                        ? 'bg-red-950/30 text-red-400'
                        : log.type === 'warning'
                        ? 'bg-yellow-950/30 text-yellow-400'
                        : 'bg-zinc-800 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-zinc-500 whitespace-nowrap">
                        [{log.timestamp.toLocaleTimeString()}]
                      </span>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
