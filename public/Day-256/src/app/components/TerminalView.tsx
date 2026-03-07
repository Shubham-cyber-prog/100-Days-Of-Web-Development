import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Terminal as TerminalIcon, Copy, Maximize2 } from "lucide-react";
import { useState, useEffect } from "react";

export function TerminalView() {
  const [output, setOutput] = useState([
    "root@a3f9d8e27b1c:/# ",
  ]);
  const [currentInput, setCurrentInput] = useState("");

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    setOutput((prev) => [...prev, `root@a3f9d8e27b1c:/# ${cmd}`]);

    // Simulate command responses
    setTimeout(() => {
      let response = "";
      if (cmd.includes("ls")) {
        response = "bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var";
      } else if (cmd.includes("pwd")) {
        response = "/";
      } else if (cmd.includes("whoami")) {
        response = "root";
      } else if (cmd.includes("ps")) {
        response = "PID   USER     TIME  COMMAND\n1     root     0:00  nginx: master process\n7     nginx    0:00  nginx: worker process\n8     nginx    0:00  nginx: worker process";
      } else if (cmd.includes("df")) {
        response = "Filesystem     1K-blocks    Used Available Use% Mounted on\noverlay        102685624 15234568  87451056  15% /";
      } else {
        response = `bash: ${cmd}: command not found`;
      }
      
      setOutput((prev) => [...prev, response, "root@a3f9d8e27b1c:/# "]);
    }, 100);

    setCurrentInput("");
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <TerminalIcon className="w-5 h-5" />
              Container Terminal
            </CardTitle>
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
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-4 h-[calc(100vh-16rem)] flex flex-col">
              <div className="flex-1 overflow-auto font-mono text-sm">
                {output.map((line, index) => (
                  <div key={index} className="text-green-400 whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
                <div className="flex items-center text-green-400">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleCommand(currentInput);
                      }
                    }}
                    className="flex-1 bg-transparent outline-none"
                    autoFocus
                    placeholder=""
                  />
                  <span className="animate-pulse">▊</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>Try commands: ls, pwd, ps, df, whoami</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
