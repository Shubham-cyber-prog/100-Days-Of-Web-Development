import { Search, RefreshCw, Settings, User } from "lucide-react";
import { useState } from "react";

export function TopNav() {
  const [selectedCluster, setSelectedCluster] = useState("local");

  return (
    <nav className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.204 14.35l.007.01.007.01 1.784 2.678.004.004c.031.05.06.098.09.148.026.05.049.098.069.146.013.039.024.075.032.109.006.023.01.043.012.06a.532.532 0 0 1 .006.055v.002a.532.532 0 0 1-.006.056.45.45 0 0 1-.012.06c-.008.034-.02.07-.032.108-.02.049-.043.097-.069.146-.03.05-.059.099-.09.148l-.004.004-1.784 2.678-.007.01c-.004.006-.006.01-.007.01a1.588 1.588 0 0 1-2.522 0l-.007-.01-.007-.01-1.785-2.678-.004-.004a1.584 1.584 0 0 1-.206-.587.532.532 0 0 1-.006-.055v-.003a.532.532 0 0 1 .006-.056l.014-.06c.008-.034.02-.07.032-.108.02-.049.043-.097.069-.146.03-.05.059-.099.09-.148l.004-.004 1.784-2.678.007-.01.007-.01a1.588 1.588 0 0 1 2.522 0z"/>
              <path d="M10.204 1.35l.007.01.007.01 1.784 2.678.004.004c.031.05.06.098.09.148.026.05.049.098.069.146.013.039.024.075.032.109.006.023.01.043.012.06a.532.532 0 0 1 .006.055v.002a.532.532 0 0 1-.006.056.45.45 0 0 1-.012.06c-.008.034-.02.07-.032.108-.02.049-.043.097-.069.146-.03.05-.059.099-.09.148l-.004.004-1.784 2.678-.007.01c-.004.006-.006.01-.007.01a1.588 1.588 0 0 1-2.522 0l-.007-.01-.007-.01L6.982 5.288l-.004-.004a1.584 1.584 0 0 1-.206-.587.532.532 0 0 1-.006-.055v-.003a.532.532 0 0 1 .006-.056l.014-.06c.008-.034.02-.07.032-.108.02-.049.043-.097.069-.146.03-.05.059-.099.09-.148l.004-.004 1.784-2.678.007-.01.007-.01a1.588 1.588 0 0 1 2.522 0z"/>
              <path d="M23.341 10.204l-.01.007-.01.007-2.678 1.784-.004.004c-.05.031-.098.06-.148.09a1.583 1.583 0 0 1-.587.206.532.532 0 0 1-.055.006h-.003a.532.532 0 0 1-.056-.006.45.45 0 0 1-.06-.012 1.552 1.552 0 0 1-.254-.101c-.05-.03-.099-.059-.148-.09l-.004-.004-2.678-1.784-.01-.007c-.006-.004-.01-.006-.01-.007a1.588 1.588 0 0 1 0-2.522l.01-.007.01-.007 2.678-1.785.004-.004c.049-.031.097-.06.146-.09.05-.026.098-.049.146-.069.039-.013.075-.024.109-.032.023-.006.043-.01.06-.012a.532.532 0 0 1 .055-.006h.002a.532.532 0 0 1 .056.006.45.45 0 0 1 .06.012c.034.008.07.02.108.032.049.02.097.043.146.069.05.03.099.059.148.09l.004.004 2.678 1.784.01.007.01.007a1.588 1.588 0 0 1 0 2.522z"/>
              <path d="M10.341 10.204l-.01.007-.01.007-2.678 1.784-.004.004c-.05.031-.098.06-.148.09a1.583 1.583 0 0 1-.587.206.532.532 0 0 1-.055.006h-.003a.532.532 0 0 1-.056-.006.45.45 0 0 1-.06-.012 1.552 1.552 0 0 1-.254-.101c-.05-.03-.099-.059-.148-.09l-.004-.004-2.678-1.784-.01-.007c-.006-.004-.01-.006-.01-.007a1.588 1.588 0 0 1 0-2.522l.01-.007.01-.007 2.678-1.785.004-.004c.049-.031.097-.06.146-.09.05-.026.098-.049.146-.069.039-.013.075-.024.109-.032.023-.006.043-.01.06-.012a.532.532 0 0 1 .055-.006h.002a.532.532 0 0 1 .056.006.45.45 0 0 1 .06.012c.034.008.07.02.108.032.049.02.097.043.146.069.05.03.099.059.148.09l.004.004 2.678 1.784.01.007.01.007a1.588 1.588 0 0 1 0 2.522z"/>
            </svg>
          </div>
          <div>
            <h1 className="font-semibold text-sm">Kubernetes Architecture Visualizer</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="local">Local Cluster</option>
            <option value="production">Production</option>
            <option value="staging">Staging</option>
          </select>

          <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search pods, services, namespaces..."
            className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-1.5 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        <button className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
