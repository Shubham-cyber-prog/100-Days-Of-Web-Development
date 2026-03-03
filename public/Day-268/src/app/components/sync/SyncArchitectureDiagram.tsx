import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Laptop, Smartphone, Monitor, Cloud, ArrowUpCircle, ArrowDownCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

interface Device {
  id: string;
  name: string;
  type: "laptop" | "mobile" | "desktop";
  status: "synced" | "syncing" | "conflict" | "offline";
  filesCount: number;
}

export function SyncArchitectureDiagram() {
  const [devices] = useState<Device[]>([
    { id: "1", name: "MacBook Pro", type: "laptop", status: "syncing", filesCount: 24 },
    { id: "2", name: "iPhone 14", type: "mobile", status: "synced", filesCount: 18 },
    { id: "3", name: "Desktop PC", type: "desktop", status: "synced", filesCount: 31 },
  ]);

  const [syncAnimations, setSyncAnimations] = useState<Array<{ id: string; direction: "up" | "down"; deviceId: string }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomDevice = devices[Math.floor(Math.random() * devices.length)];
      const randomDirection = Math.random() > 0.5 ? "up" : "down";
      const newAnimation = {
        id: Math.random().toString(),
        direction: randomDirection as "up" | "down",
        deviceId: randomDevice.id,
      };
      
      setSyncAnimations((prev) => [...prev, newAnimation]);
      
      setTimeout(() => {
        setSyncAnimations((prev) => prev.filter((anim) => anim.id !== newAnimation.id));
      }, 2000);
    }, 1500);

    return () => clearInterval(interval);
  }, [devices]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-500";
      case "syncing":
        return "text-blue-500";
      case "conflict":
        return "text-red-500";
      case "offline":
        return "text-slate-400";
      default:
        return "text-slate-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-500">Synced</Badge>;
      case "syncing":
        return <Badge className="bg-blue-500">Syncing</Badge>;
      case "conflict":
        return <Badge className="bg-red-500">Conflict</Badge>;
      case "offline":
        return <Badge variant="secondary">Offline</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-slate-200">
        <CardTitle>Sync Architecture</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-5rem)] items-center justify-center p-8">
        <div className="relative flex w-full items-center justify-between">
          {/* Local Devices */}
          <div className="flex flex-col gap-6">
            {devices.map((device, index) => {
              const DeviceIcon = getDeviceIcon(device.type);
              const isAnimating = syncAnimations.some((anim) => anim.deviceId === device.id);
              
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className={`rounded-lg border-2 bg-white p-6 shadow-sm transition-all ${isAnimating ? 'border-blue-400 shadow-lg' : 'border-slate-200'}`}>
                    <DeviceIcon className={`h-12 w-12 ${getStatusColor(device.status)}`} />
                  </div>
                  <div className="mt-3 text-center">
                    <div className="text-sm font-medium text-slate-700">{device.name}</div>
                    <div className="mt-1 text-xs text-slate-500">{device.filesCount} files</div>
                    <div className="mt-1">{getStatusBadge(device.status)}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Network Layer / Sync Arrows */}
          <div className="relative flex-1">
            {syncAnimations.map((anim) => {
              const deviceIndex = devices.findIndex((d) => d.id === anim.deviceId);
              const ArrowIcon = anim.direction === "up" ? ArrowUpCircle : ArrowDownCircle;
              
              return (
                <motion.div
                  key={anim.id}
                  initial={{ 
                    x: anim.direction === "up" ? 0 : "100%",
                    y: deviceIndex * 120,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: anim.direction === "up" ? "100%" : 0,
                    opacity: [0, 1, 1, 0] 
                  }}
                  transition={{ duration: 2, ease: "linear" }}
                  className="absolute left-0 top-12"
                >
                  <ArrowIcon className="h-8 w-8 text-blue-500" />
                </motion.div>
              );
            })}
            
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="text-xs text-slate-500">Network Layer</div>
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-px w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                />
              </div>
            </div>
          </div>

          {/* Cloud Storage */}
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg"
            >
              <Cloud className="h-16 w-16 text-blue-500" />
            </motion.div>
            <div className="mt-3 text-center">
              <div className="text-sm font-medium text-slate-700">Cloud Storage</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                Online
              </div>
              <div className="mt-1 text-xs text-slate-500">73 files synced</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
