import { X, Play, Square, RotateCw, Terminal } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { ResourceGraph } from "./ResourceGraph";
import { ScrollArea } from "./ui/scroll-area";

interface ContainerDetailsProps {
  containerId: string;
  onClose: () => void;
}

export function ContainerDetails({ containerId, onClose }: ContainerDetailsProps) {
  const container = {
    name: "nginx-web",
    id: "a3f9d8e27b1c",
    status: "running" as const,
    image: "nginx:latest",
    created: "2 days ago",
    ports: "80:80, 443:443",
  };

  const cpuData = [23, 28, 25, 32, 29, 35, 31, 28, 30, 27, 33, 29, 31, 28, 30, 32];
  const memoryData = [45, 48, 46, 52, 49, 55, 51, 48, 50, 47, 53, 49, 51, 48, 50, 52];

  const logs = [
    "2026-02-27T10:23:45.123Z [INFO] Server started on port 80",
    "2026-02-27T10:23:47.456Z [INFO] Connected to database",
    "2026-02-27T10:24:12.789Z [INFO] GET /api/health 200 12ms",
    "2026-02-27T10:25:33.234Z [INFO] GET /api/users 200 45ms",
    "2026-02-27T10:26:15.678Z [INFO] POST /api/auth 200 89ms",
    "2026-02-27T10:27:42.901Z [WARN] High memory usage detected",
    "2026-02-27T10:28:19.345Z [INFO] GET /api/products 200 23ms",
    "2026-02-27T10:29:05.567Z [INFO] Cache refreshed successfully",
  ];

  return (
    <aside className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white">Container Details</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Container Info */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{container.name}</CardTitle>
                <StatusBadge status={container.status} />
              </div>
              <p className="text-sm text-gray-400 font-mono">{container.id}</p>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Image</p>
                <p className="text-sm text-gray-300">{container.image}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Created</p>
                <p className="text-sm text-gray-300">{container.created}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Ports</p>
                <p className="text-sm text-gray-300">{container.ports}</p>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              <Square className="w-4 h-4 mr-2" />
              Stop
            </Button>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              <RotateCw className="w-4 h-4 mr-2" />
              Restart
            </Button>
            <Button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white">
              <Terminal className="w-4 h-4 mr-2" />
              Terminal
            </Button>
          </div>

          {/* Resource Usage */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-white">CPU Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">31%</div>
              <ResourceGraph data={cpuData} color="#3b82f6" />
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-white">Memory Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">256MB</div>
              <ResourceGraph data={memoryData} color="#8b5cf6" />
            </CardContent>
          </Card>

          {/* Logs Preview */}
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-sm text-white">Logs Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black rounded p-3 font-mono text-xs space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="text-gray-300">{log}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </aside>
  );
}
