import { Cloud, Play, Pause, AlertTriangle, RotateCcw, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useState } from "react";
import { Badge } from "../ui/badge";

export function TopNav() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [environment, setEnvironment] = useState("local");
  const [networkSpeed, setNetworkSpeed] = useState("normal");

  const handleStartSync = () => setIsSimulating(true);
  const handlePause = () => setIsSimulating(false);
  const handleReset = () => {
    setIsSimulating(false);
    // Reset simulation state
  };
  const handleSimulateConflict = () => {
    // Trigger conflict simulation
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3">
        <Cloud className="h-8 w-8 text-blue-500" />
        <h1 className="text-xl font-semibold text-slate-800">Cloud Sync Simulator</h1>
        {isSimulating && (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Environment:</label>
          <Select value={environment} onValueChange={setEnvironment}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="multi-device">Multi-device</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleStartSync}
            disabled={isSimulating}
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Play className="mr-1 h-4 w-4" />
            Start Sync
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handlePause}
            disabled={!isSimulating}
          >
            <Pause className="mr-1 h-4 w-4" />
            Pause
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSimulateConflict}
          >
            <AlertTriangle className="mr-1 h-4 w-4" />
            Simulate Conflict
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            <RotateCcw className="mr-1 h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Network:</label>
          <Select value={networkSpeed} onValueChange={setNetworkSpeed}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow">Slow</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="fast">Fast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-6 w-px bg-slate-200" />

        <Button size="sm" variant="ghost">
          <Settings className="h-5 w-5 text-slate-600" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-blue-500 text-white">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
