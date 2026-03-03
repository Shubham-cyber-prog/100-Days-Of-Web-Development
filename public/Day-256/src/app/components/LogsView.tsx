import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Pause, Play, Download } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { useEffect, useState } from "react";

export function LogsView() {
  const [isPaused, setIsPaused] = useState(false);
  const [logs, setLogs] = useState([
    { timestamp: "2026-02-27T10:23:45.123Z", level: "INFO", message: "Server started on port 80" },
    { timestamp: "2026-02-27T10:23:47.456Z", level: "INFO", message: "Connected to database successfully" },
    { timestamp: "2026-02-27T10:24:12.789Z", level: "INFO", message: "GET /api/health 200 12ms" },
    { timestamp: "2026-02-27T10:25:33.234Z", level: "INFO", message: "GET /api/users 200 45ms" },
    { timestamp: "2026-02-27T10:26:15.678Z", level: "INFO", message: "POST /api/auth 200 89ms" },
    { timestamp: "2026-02-27T10:27:42.901Z", level: "WARN", message: "High memory usage detected: 85%" },
    { timestamp: "2026-02-27T10:28:19.345Z", level: "INFO", message: "GET /api/products 200 23ms" },
    { timestamp: "2026-02-27T10:29:05.567Z", level: "INFO", message: "Cache refreshed successfully" },
    { timestamp: "2026-02-27T10:30:22.890Z", level: "ERROR", message: "Connection timeout to external service" },
    { timestamp: "2026-02-27T10:31:44.123Z", level: "INFO", message: "Retrying connection..." },
    { timestamp: "2026-02-27T10:32:01.456Z", level: "INFO", message: "Connection restored" },
    { timestamp: "2026-02-27T10:33:15.789Z", level: "INFO", message: "GET /api/orders 200 67ms" },
  ]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        const newLog = {
          timestamp: new Date().toISOString(),
          level: Math.random() > 0.8 ? "WARN" : "INFO",
          message: `GET /api/endpoint ${Math.floor(Math.random() * 300 + 100)}ms`,
        };
        setLogs((prev) => [...prev, newLog]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "text-red-400";
      case "WARN":
        return "text-yellow-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Container Logs</CardTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="nginx-web">
                <SelectTrigger className="w-48 bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="nginx-web" className="text-white">nginx-web</SelectItem>
                  <SelectItem value="postgres-db" className="text-white">postgres-db</SelectItem>
                  <SelectItem value="redis-cache" className="text-white">redis-cache</SelectItem>
                  <SelectItem value="node-api" className="text-white">node-api</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 h-[calc(100vh-16rem)]">
              <ScrollArea className="h-full">
                <div className="font-mono text-sm space-y-1">
                  {logs.map((log, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-gray-500">{log.timestamp}</span>
                      <span className={`font-bold ${getLevelColor(log.level)}`}>
                        [{log.level}]
                      </span>
                      <span className={getLevelColor(log.level)}>{log.message}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
