import { Play, Pause, RotateCcw, Settings, User, Zap } from 'lucide-react';
import { useSimulation } from '../contexts/SimulationContext';
import * as Slider from '@radix-ui/react-slider';
import { motion } from 'motion/react';

export function TopNavigation() {
  const { isRunning, speed, startSimulation, pauseSimulation, resetSimulation, setSpeed } = useSimulation();

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3">
        <motion.div 
          className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center relative"
          animate={isRunning ? {
            boxShadow: ['0 0 0 rgba(6, 182, 212, 0)', '0 0 20px rgba(6, 182, 212, 0.5)', '0 0 0 rgba(6, 182, 212, 0)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-4 h-4 border-2 border-white rounded-sm" />
          {isRunning && (
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-cyan-400"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.6, 0], scale: [1, 1.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>
        <div>
          <h1 className="text-xl font-semibold">Message Queue Simulator</h1>
          {isRunning && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-cyan-400 flex items-center gap-1"
            >
              <Zap size={10} className="animate-pulse" />
              Simulation Running
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-800 rounded-lg p-1">
          <motion.button
            onClick={isRunning ? pauseSimulation : startSimulation}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium ${
              isRunning 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-slate-900' 
                : 'bg-cyan-500 hover:bg-cyan-600 text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isRunning ? (
              <>
                <Pause size={16} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>Start</span>
              </>
            )}
          </motion.button>
          <motion.button
            onClick={resetSimulation}
            className="px-4 py-2 rounded-md hover:bg-slate-700 transition-colors flex items-center gap-2 font-medium"
            whileHover={{ scale: 1.05, rotate: -180 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-3 bg-slate-800 rounded-lg px-4 py-2.5 min-w-[220px]">
          <span className="text-sm text-slate-400 font-medium">Speed</span>
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.5}
            max={3}
            step={0.5}
          >
            <Slider.Track className="bg-slate-700 relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white rounded-full hover:bg-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg transition-transform hover:scale-110" />
          </Slider.Root>
          <motion.span 
            className="text-sm font-mono font-bold min-w-[2.5rem] text-right"
            key={speed}
            initial={{ scale: 1.2, color: '#06b6d4' }}
            animate={{ scale: 1, color: '#ffffff' }}
            transition={{ duration: 0.3 }}
          >
            {speed}x
          </motion.span>
        </div>

        <div className="flex items-center gap-2">
          <motion.button 
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <Settings size={20} />
          </motion.button>
          <motion.button 
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <User size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}