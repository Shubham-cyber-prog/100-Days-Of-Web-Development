import { FolderTree, Box, Network, Layers } from "lucide-react";
import { mockPods, mockServices, mockDeployments } from "../data/mockData";

export function Namespaces() {
  const namespaces = [
    {
      name: "default",
      status: "Active",
      pods: mockPods.filter(p => p.namespace === "default").length,
      services: mockServices.filter(s => s.namespace === "default").length,
      deployments: mockDeployments.filter(d => d.namespace === "default").length,
      age: "45d"
    },
    {
      name: "production",
      status: "Active",
      pods: mockPods.filter(p => p.namespace === "production").length,
      services: mockServices.filter(s => s.namespace === "production").length,
      deployments: mockDeployments.filter(d => d.namespace === "production").length,
      age: "30d"
    },
    {
      name: "monitoring",
      status: "Active",
      pods: mockPods.filter(p => p.namespace === "monitoring").length,
      services: 2,
      deployments: 1,
      age: "30d"
    },
    {
      name: "logging",
      status: "Active",
      pods: mockPods.filter(p => p.namespace === "logging").length,
      services: 1,
      deployments: 1,
      age: "25d"
    },
    {
      name: "kube-system",
      status: "Active",
      pods: 15,
      services: 3,
      deployments: 5,
      age: "45d"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Namespaces</h2>
        <p className="text-sm text-slate-400">Logical resource groupings</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {namespaces.map((namespace) => (
          <div 
            key={namespace.name}
            className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FolderTree className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{namespace.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs text-slate-500">{namespace.status}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Box className="w-4 h-4" />
                  <span>Pods</span>
                </div>
                <span className="font-semibold">{namespace.pods}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Network className="w-4 h-4" />
                  <span>Services</span>
                </div>
                <span className="font-semibold">{namespace.services}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <Layers className="w-4 h-4" />
                  <span>Deployments</span>
                </div>
                <span className="font-semibold">{namespace.deployments}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Age</span>
                <span>{namespace.age}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
