import { Link } from "react-router";
import { mockPods } from "../data/mockData";
import { Box, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Pods() {
  const [namespaceFilter, setNamespaceFilter] = useState("all");

  const namespaces = ["all", ...Array.from(new Set(mockPods.map(p => p.namespace)))];
  const filteredPods = namespaceFilter === "all" 
    ? mockPods 
    : mockPods.filter(p => p.namespace === namespaceFilter);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Pods</h2>
          <p className="text-sm text-slate-400">View and manage all pods across namespaces</p>
        </div>
        <select 
          value={namespaceFilter}
          onChange={(e) => setNamespaceFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {namespaces.map(ns => (
            <option key={ns} value={ns}>
              {ns === "all" ? "All Namespaces" : `Namespace: ${ns}`}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAMESPACE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">STATUS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NODE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">CONTAINERS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">RESTARTS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">CPU</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">MEMORY</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AGE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPods.map((pod) => (
                <tr 
                  key={pod.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium font-mono">{pod.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded">{pod.namespace}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        pod.status === "Running" ? "bg-green-500" :
                        pod.status === "Pending" ? "bg-yellow-500" :
                        pod.status === "Failed" ? "bg-red-500" :
                        "bg-blue-500"
                      }`} />
                      <span className="text-sm">{pod.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{pod.node}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{pod.containers}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${pod.restarts > 3 ? "text-yellow-400" : ""}`}>
                      {pod.restarts}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{pod.cpu}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{pod.memory}%</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{pod.age}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/pods/${pod.id}`}
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
