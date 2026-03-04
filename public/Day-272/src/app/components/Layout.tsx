import { Outlet, Link, useLocation } from "react-router";
import { Shield, Activity, List, Zap, BarChart3, Settings, Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { SimulationProvider, useSimulation } from "../context/SimulationContext";

function LayoutContent() {
  const location = useLocation();
  const { isRunning, speed, startSimulation, pauseSimulation, stepSimulation, resetSimulation, setSpeed } = useSimulation();

  const navItems = [
    { path: "/", label: "Simulator", icon: Activity },
    { path: "/rules", label: "Firewall Rules", icon: List },
    { path: "/traffic", label: "Traffic Generator", icon: Zap },
    { path: "/logs", label: "Logs", icon: List },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="font-semibold text-lg">Firewall Rules</h1>
              <p className="text-xs text-slate-400">Simulator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={isRunning ? pauseSimulation : startSimulation}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
                isRunning
                  ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20"
                  : "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-4 h-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Start
                </>
              )}
            </button>

            <button
              onClick={stepSimulation}
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              <SkipForward className="w-4 h-4" /> Step
            </button>

            <button
              onClick={resetSimulation}
              className="px-4 py-2 rounded-lg font-medium flex items-center gap-2 bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-3 text-sm text-slate-400">
              <span>Traffic Speed</span>
              <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-32"
              />
              <span className="font-mono text-slate-300 w-8">{speed}</span>
            </label>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <SimulationProvider>
      <LayoutContent />
    </SimulationProvider>
  );
}
