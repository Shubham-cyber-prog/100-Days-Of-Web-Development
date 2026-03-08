import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Network, Wifi, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export function NetworksView() {
  const networks = [
    {
      id: "1",
      name: "bridge",
      networkId: "7b1c8d9e2f3a",
      driver: "bridge",
      scope: "local",
      subnet: "172.17.0.0/16",
      gateway: "172.17.0.1",
      containers: 8,
      isDefault: true,
    },
    {
      id: "2",
      name: "docker_gwbridge",
      networkId: "9e2f3a4b5c6d",
      driver: "bridge",
      scope: "local",
      subnet: "172.18.0.0/16",
      gateway: "172.18.0.1",
      containers: 0,
      isDefault: true,
    },
    {
      id: "3",
      name: "host",
      networkId: "3a4b5c6d7e8f",
      driver: "host",
      scope: "local",
      subnet: "-",
      gateway: "-",
      containers: 0,
      isDefault: true,
    },
    {
      id: "4",
      name: "custom_network",
      networkId: "5c6d7e8f9a0b",
      driver: "bridge",
      scope: "local",
      subnet: "172.20.0.0/16",
      gateway: "172.20.0.1",
      containers: 4,
      isDefault: false,
    },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Network className="w-5 h-5 text-blue-500" />
                <CardTitle className="text-sm text-gray-400">Total Networks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{networks.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Wifi className="w-5 h-5 text-green-500" />
                <CardTitle className="text-sm text-gray-400">Active Connections</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Network className="w-5 h-5 text-purple-500" />
                <CardTitle className="text-sm text-gray-400">Custom Networks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1</div>
            </CardContent>
          </Card>
        </div>

        {/* Networks List */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Docker Networks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {networks.map((network) => (
                <div
                  key={network.id}
                  className="bg-gray-900 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <Network className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-medium">{network.name}</h3>
                          {network.isDefault && (
                            <span className="px-2 py-0.5 bg-gray-700 text-gray-400 rounded text-xs">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 font-mono mt-1">{network.networkId}</p>
                      </div>
                    </div>
                    {!network.isDefault && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-400 hover:bg-red-900 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Driver</p>
                      <p className="text-sm text-gray-300">{network.driver}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Scope</p>
                      <p className="text-sm text-gray-300">{network.scope}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Subnet</p>
                      <p className="text-sm text-gray-300 font-mono">{network.subnet}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Gateway</p>
                      <p className="text-sm text-gray-300 font-mono">{network.gateway}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Containers</p>
                      <p className="text-sm text-gray-300">
                        {network.containers > 0 ? (
                          <span className="text-green-400">{network.containers} connected</span>
                        ) : (
                          <span className="text-gray-500">None</span>
                        )}
                      </p>
                    </div>
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
