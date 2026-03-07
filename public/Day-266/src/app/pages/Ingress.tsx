import { Route } from "lucide-react";

export function Ingress() {
  const mockIngress = [
    {
      id: "ing-1",
      name: "api-ingress",
      namespace: "production",
      hosts: "api.example.com",
      address: "34.123.45.67",
      ports: "80, 443",
      age: "3d"
    },
    {
      id: "ing-2",
      name: "web-ingress",
      namespace: "production",
      hosts: "www.example.com",
      address: "34.123.45.68",
      ports: "80, 443",
      age: "8d"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Ingress</h2>
        <p className="text-sm text-slate-400">HTTP and HTTPS routing rules</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAME</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">NAMESPACE</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">HOSTS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">ADDRESS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">PORTS</th>
                <th className="text-left text-xs font-semibold text-slate-400 px-6 py-3">AGE</th>
              </tr>
            </thead>
            <tbody>
              {mockIngress.map((ingress) => (
                <tr 
                  key={ingress.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Route className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium">{ingress.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded">{ingress.namespace}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-blue-400">{ingress.hosts}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono text-slate-400">{ingress.address}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm">{ingress.ports}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{ingress.age}</span>
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
