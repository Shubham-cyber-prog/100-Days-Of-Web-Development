import { Play, Pause, AlertTriangle, RotateCcw, Settings, User } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { Environment } from '../types/service';

export function Navbar() {
  const {
    isRunning,
    speed,
    environment,
    toggleSimulation,
    setSpeed,
    setEnvironment,
    injectFailure,
    reset,
  } = useSimulationStore();

  return (
    <nav className="h-16 border-b border-gray-800 bg-gray-950 px-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white font-bold text-lg">MS</div>
          </div>
          <h1 className="text-xl font-semibold text-white">
            Microservices Architecture Simulator
          </h1>
        </div>
        
        <select
          value={environment}
          onChange={(e) => setEnvironment(e.target.value as Environment)}
          className="px-3 py-1.5 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="Local">Local</option>
          <option value="Staging">Staging</option>
          <option value="Production">Production</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSimulation}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-colors"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start
              </>
            )}
          </button>
          
          <button
            onClick={injectFailure}
            className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            Inject Failure
          </button>
          
          <button
            onClick={reset}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Speed:</span>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.5"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-24"
            />
            <span className="text-gray-200">{speed}x</span>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <User className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </nav>
  );
}
