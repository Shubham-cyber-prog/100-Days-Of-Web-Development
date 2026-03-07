import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Laptop, Smartphone, Monitor, Plus } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

const devices = [
  {
    id: "1",
    name: "MacBook Pro",
    type: "laptop",
    status: "online",
    lastSync: "Just now",
    filesCount: 24,
    storage: "45.2 GB",
  },
  {
    id: "2",
    name: "iPhone 14",
    type: "mobile",
    status: "online",
    lastSync: "2 minutes ago",
    filesCount: 18,
    storage: "12.8 GB",
  },
  {
    id: "3",
    name: "Desktop PC",
    type: "desktop",
    status: "online",
    lastSync: "5 minutes ago",
    filesCount: 31,
    storage: "68.4 GB",
  },
  {
    id: "4",
    name: "iPad Pro",
    type: "mobile",
    status: "offline",
    lastSync: "2 hours ago",
    filesCount: 15,
    storage: "8.2 GB",
  },
];

export function Devices() {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "laptop":
        return Laptop;
      case "mobile":
        return Smartphone;
      case "desktop":
        return Monitor;
      default:
        return Laptop;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Devices</h2>
          <p className="mt-1 text-sm text-slate-600">Manage your connected devices</p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {devices.map((device) => {
          const DeviceIcon = getDeviceIcon(device.type);
          
          return (
            <Card key={device.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <DeviceIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{device.name}</CardTitle>
                      <Badge
                        className={
                          device.status === "online"
                            ? "mt-1 bg-green-500"
                            : "mt-1 bg-slate-400"
                        }
                      >
                        {device.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Last Sync:</span>
                  <span className="text-slate-900">{device.lastSync}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Files:</span>
                  <span className="text-slate-900">{device.filesCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Storage:</span>
                  <span className="text-slate-900">{device.storage}</span>
                </div>
                <div className="pt-2">
                  <Button size="sm" variant="outline" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
