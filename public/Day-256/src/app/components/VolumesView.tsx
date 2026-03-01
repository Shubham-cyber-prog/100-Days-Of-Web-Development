import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Database, HardDrive, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function VolumesView() {
  const volumes = [
    { id: "1", name: "postgres_data", driver: "local", mountpoint: "/var/lib/docker/volumes/postgres_data/_data", size: "2.3GB", used: 1.8, containers: 1 },
    { id: "2", name: "nginx_config", driver: "local", mountpoint: "/var/lib/docker/volumes/nginx_config/_data", size: "12MB", used: 0.5, containers: 1 },
    { id: "3", name: "redis_data", driver: "local", mountpoint: "/var/lib/docker/volumes/redis_data/_data", size: "524MB", used: 2.1, containers: 1 },
    { id: "4", name: "mongodb_data", driver: "local", mountpoint: "/var/lib/docker/volumes/mongodb_data/_data", size: "4.7GB", used: 3.2, containers: 0 },
    { id: "5", name: "elasticsearch_data", driver: "local", mountpoint: "/var/lib/docker/volumes/elasticsearch_data/_data", size: "8.9GB", used: 7.5, containers: 1 },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Database className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm text-gray-400">Total Volumes</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{volumes.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <HardDrive className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm text-gray-400">Total Size</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">16.4GB</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Database className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm text-gray-400">In Use</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4 / 5</div>
            </CardContent>
          </Card>
        </div>

        {/* Volumes List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Docker Volumes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {volumes.map((volume) => (
                <div
                  key={volume.id}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium mb-1">{volume.name}</h3>
                      <p className="text-xs text-gray-400 font-mono">{volume.mountpoint}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400 hover:bg-red-900 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Driver</p>
                      <p className="text-sm text-gray-300">{volume.driver}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Size</p>
                      <p className="text-sm text-gray-300">{volume.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Containers</p>
                      <p className="text-sm text-gray-300">
                        {volume.containers > 0 ? (
                          <span className="text-green-400">{volume.containers} active</span>
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Usage</span>
                      <span>{volume.used}GB used</span>
                    </div>
                    <Progress value={(volume.used / 10) * 100} className="h-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
