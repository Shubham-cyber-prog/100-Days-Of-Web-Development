import { FirewallRulesTable } from "../components/FirewallRulesTable";
import { Shield } from "lucide-react";

export function FirewallRules() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-red-400" />
          <h1 className="text-2xl font-semibold text-slate-200">Firewall Rules Configuration</h1>
        </div>
        <p className="text-sm text-slate-400">
          Configure firewall rules to control network traffic. Rules are evaluated in priority order from top to bottom.
        </p>
      </div>

      <FirewallRulesTable />

      <div className="mt-6 bg-slate-900 rounded-lg border border-slate-800 p-6">
        <h2 className="font-semibold text-slate-200 mb-4">Rule Configuration Guide</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="text-slate-300 font-medium mb-2">IP Address Formats</h3>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Single IP: <code className="font-mono bg-slate-950 px-1">192.168.1.1</code></li>
              <li>• CIDR notation: <code className="font-mono bg-slate-950 px-1">192.168.1.0/24</code></li>
              <li>• Any IP: <code className="font-mono bg-slate-950 px-1">0.0.0.0/0</code></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 font-medium mb-2">Port Formats</h3>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• Single port: <code className="font-mono bg-slate-950 px-1">80</code></li>
              <li>• Port range: <code className="font-mono bg-slate-950 px-1">8000-8999</code></li>
              <li>• Any port: <code className="font-mono bg-slate-950 px-1">*</code></li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 font-medium mb-2">Protocols</h3>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• TCP, UDP, ICMP, HTTP, HTTPS</li>
            </ul>
          </div>
          <div>
            <h3 className="text-slate-300 font-medium mb-2">Actions</h3>
            <ul className="space-y-1 text-slate-400 text-xs">
              <li>• <span className="text-green-400">Allow</span>: Permit traffic through firewall</li>
              <li>• <span className="text-red-400">Deny</span>: Block traffic at firewall</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
