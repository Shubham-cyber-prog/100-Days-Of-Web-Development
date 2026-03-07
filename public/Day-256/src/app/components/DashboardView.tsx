import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Box, Play, Square, Image, Cpu, MemoryStick } from "lucide-react";
import { Progress } from "./ui/progress";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/button";

interface DashboardViewProps {
  onSelectContainer: (id: string) => void;
}

export function DashboardView({ onSelectContainer }: DashboardViewProps) {
  const stats = [
    { label: "Total Containers", value: "24", icon: Box, color: "text-blue-500" },
    { label: "Running", value: "12", icon: Play, color: "text-green-500" },
    { label: "Stopped", value: "12", icon: Square, color: "text-gray-500" },
    { label: "Total Images", value: "48", icon: Image, color: "text-purple-500" },
    { label: "CPU Usage", value: "45%", icon: Cpu, color: "text-orange-500", progress: 45 },
    { label: "Memory Usage", value: "6.2GB / 16GB", icon: MemoryStick, color: "text-pink-500", progress: 38 },
  ];

  const containers = [
    { id: "1", name: "nginx-web", containerId: "a3f9d8e2", image: "nginx:latest", status: "running" as const, cpu: "12%", memory: "256MB", ports: "80:80, 443:443" },
    { id: "2", name: "postgres-db", containerId: "b7c2e1f4", image: "postgres:14", status: "running" as const, cpu: "8%", memory: "512MB", ports: "5432:5432" },
    { id: "3", name: "redis-cache", containerId: "c9d4a6b8", image: "redis:alpine", status: "running" as const, cpu: "3%", memory: "128MB", ports: "6379:6379" },
    { id: "4", name: "mongodb", containerId: "d2e8f3c1", image: "mongo:5.0", status: "stopped" as const, cpu: "0%", memory: "0MB", ports: "27017:27017" },
    { id: "5", name: "node-api", containerId: "e5f1d9a3", image: "node:18-alpine", status: "running" as const, cpu: "18%", memory: "384MB", ports: "3000:3000" },
    { id: "6", name: "elasticsearch", containerId: "f8a2c4d7", image: "elasticsearch:8.0", status: "paused" as const, cpu: "0%", memory: "1.2GB", ports: "9200:9200" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                    <CardTitle className="text-sm text-gray-400">{stat.label}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  {stat.progress !== undefined && (
                    <Progress value={stat.progress} className="mt-2 h-1" />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Containers List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Containers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Container ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Image</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">CPU</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Memory</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Ports</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {containers.map((container) => (
                    <tr 
                      key={container.id} 
                      className="border-b border-gray-700 hover:bg-gray-750 cursor-pointer"
                      onClick={() => onSelectContainer(container.id)}
                    >
                      <td className="py-3 px-4 text-white font-medium">{container.name}</td>
                      <td className="py-3 px-4 text-gray-400 font-mono text-sm">{container.containerId}</td>
                      <td className="py-3 px-4 text-gray-300">{container.image}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={container.status} />
                      </td>
                      <td className="py-3 px-4 text-gray-300">{container.cpu}</td>
                      <td className="py-3 px-4 text-gray-300">{container.memory}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{container.ports}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Start
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-gray-600 text-gray-300 hover:bg-gray-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Stop
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
