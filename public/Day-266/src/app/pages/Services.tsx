import { mockServices } from "../data/mockData";
import { Network } from "lucide-react";

export function Services() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Services</h2>
        <p className="text-sm text-slate-400">Network services and load balancers</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAMESPACE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">TYPE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">CLUSTER-IP</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">EXTERNAL-IP</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">PORT(S)</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AGE</th>
              </tr>
            </thead>
            <tbody>
              {mockServices.map((service) => (
                <tr 
                  key={service.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded">{service.namespace}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      service.type === "LoadBalancer" ? "bg-blue-500/10 text-blue-400" :
                      service.type === "NodePort" ? "bg-purple-500/10 text-purple-400" :
                      "bg-slate-800 text-slate-300"
                    }`}>
                      {service.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-400">{service.clusterIP}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-400">{service.externalIP}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono">{service.ports}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{service.age}</span>
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
