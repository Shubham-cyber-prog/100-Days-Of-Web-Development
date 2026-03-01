import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "./ui/button";
import { Play, Square, RotateCw, Trash2, Filter } from "lucide-react";
import { Input } from "./ui/input";

interface ContainersViewProps {
  onSelectContainer: (id: string) => void;
}

export function ContainersView({ onSelectContainer }: ContainersViewProps) {
  const containers = [
    { id: "1", name: "nginx-web", containerId: "a3f9d8e2", image: "nginx:latest", status: "running" as const, cpu: "12%", memory: "256MB", ports: "80:80, 443:443", uptime: "2 days" },
    { id: "2", name: "postgres-db", containerId: "b7c2e1f4", image: "postgres:14", status: "running" as const, cpu: "8%", memory: "512MB", ports: "5432:5432", uptime: "5 days" },
    { id: "3", name: "redis-cache", containerId: "c9d4a6b8", image: "redis:alpine", status: "running" as const, cpu: "3%", memory: "128MB", ports: "6379:6379", uptime: "10 days" },
    { id: "4", name: "mongodb", containerId: "d2e8f3c1", image: "mongo:5.0", status: "stopped" as const, cpu: "0%", memory: "0MB", ports: "27017:27017", uptime: "-" },
    { id: "5", name: "node-api", containerId: "e5f1d9a3", image: "node:18-alpine", status: "running" as const, cpu: "18%", memory: "384MB", ports: "3000:3000", uptime: "1 day" },
    { id: "6", name: "elasticsearch", containerId: "f8a2c4d7", image: "elasticsearch:8.0", status: "paused" as const, cpu: "0%", memory: "1.2GB", ports: "9200:9200", uptime: "3 days" },
    { id: "7", name: "mysql-db", containerId: "a9b1c2d3", image: "mysql:8.0", status: "running" as const, cpu: "15%", memory: "678MB", ports: "3306:3306", uptime: "7 days" },
    { id: "8", name: "rabbitmq", containerId: "b2c3d4e5", image: "rabbitmq:management", status: "running" as const, cpu: "5%", memory: "245MB", ports: "5672:5672", uptime: "4 days" },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-4">
        {/* Filters and Search */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Input
              placeholder="Search containers..."
              className="bg-gray-800 border-gray-700 text-white pl-10"
            />
          </div>
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Containers Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">All Containers ({containers.length})</CardTitle>
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
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Uptime</th>
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
                      <td className="py-3 px-4 text-gray-400">{container.uptime}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-green-400 hover:bg-gray-700 p-1 h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:bg-gray-700 p-1 h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Square className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:bg-gray-700 p-1 h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <RotateCw className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-gray-400 hover:bg-gray-700 hover:text-red-400 p-1 h-8 w-8"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 className="w-4 h-4" />
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
