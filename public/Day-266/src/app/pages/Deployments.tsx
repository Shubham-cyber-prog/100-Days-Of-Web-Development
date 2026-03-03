import { mockDeployments } from "../data/mockData";
import { Layers } from "lucide-react";

export function Deployments() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Deployments</h2>
        <p className="text-sm text-slate-400">Manage application deployments</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAMESPACE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">READY</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">UP-TO-DATE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AVAILABLE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AGE</th>
              </tr>
            </thead>
            <tbody>
              {mockDeployments.map((deployment) => (
                <tr 
                  key={deployment.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{deployment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded">{deployment.namespace}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        deployment.ready.split('/')[0] === deployment.ready.split('/')[1] 
                          ? "bg-green-500" 
                          : "bg-yellow-500"
                      }`} />
                      <span className="text-sm font-mono">{deployment.ready}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{deployment.upToDate}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{deployment.available}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{deployment.age}</span>
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
