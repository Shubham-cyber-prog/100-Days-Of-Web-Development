import { Link } from "react-router";
import { mockNodes } from "../data/mockData";
import { Server, ChevronRight } from "lucide-react";

export function Nodes() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Nodes</h2>
        <p className="text-sm text-slate-400">Manage and monitor cluster nodes</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">ROLE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">VERSION</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">CPU</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">MEMORY</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">PODS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AGE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {mockNodes.map((node) => (
                <tr 
                  key={node.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{node.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${node.status === "Ready" ? "bg-green-500" : "bg-red-500"}`} />
                      <span className="text-sm">{node.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{node.role}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400 font-mono">{node.version}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${node.cpu}%` }}
                        />
                      </div>
                      <span className="text-sm">{node.cpu}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-500"
                          style={{ width: `${node.memory}%` }}
                        />
                      </div>
                      <span className="text-sm">{node.memory}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{node.pods}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{node.age}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/nodes/${node.id}`}
                      className="flex items-center justify-center w-8 h-8 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
