import { motion } from "motion/react";
import { X, Moon, Ruler, Thermometer, Wind } from "lucide-react";
import { Planet } from "../data/planetsData";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface PlanetDetailPanelProps {
  planet: Planet;
  onClose: () => void;
  onCompare?: () => void;
}

export function PlanetDetailPanel({
  planet,
  onClose,
  onCompare,
}: PlanetDetailPanelProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-gradient-to-b from-[#0B0F1A]/95 to-[#1A1F35]/95 backdrop-blur-xl border-l border-white/10 z-50 overflow-hidden"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25 }}
      >
        <ScrollArea className="h-full">
          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <motion.h2
                className="text-3xl md:text-4xl text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {planet.name}
              </motion.h2>
              <Button
                onClick={onClose}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Planet image */}
            <motion.div
              className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              style={{
                boxShadow: `0 0 60px ${planet.glowColor}60`,
              }}
            >
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${planet.imageUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Ruler className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-gray-400">Distance from Sun</span>
                </div>
                <p className="text-white">{planet.distanceFromSun}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Moon className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-gray-400">Moons</span>
                </div>
                <p className="text-white">{planet.moons}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-red-400" />
                  <span className="text-xs text-gray-400">Temperature</span>
                </div>
                <p className="text-white text-sm">{planet.temperature}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-gray-400">Diameter</span>
                </div>
                <p className="text-white">{planet.diameter}</p>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl text-white mb-3">About {planet.name}</h3>
              <p className="text-gray-300 leading-relaxed">{planet.description}</p>
            </motion.div>

            {/* Fun facts */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl text-white mb-3">Did You Know?</h3>
              <div className="space-y-3">
                {planet.funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <p className="text-gray-200 text-sm">✨ {fact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional data */}
            <motion.div
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg text-white mb-3">More Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Orbital Period:</span>
                  <span className="text-white">{planet.orbitalPeriod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Surface Gravity:</span>
                  <span className="text-white">{planet.gravity}</span>
                </div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                style={{
                  boxShadow: `0 0 20px ${planet.glowColor}40`,
                }}
              >
                Explore More
              </Button>
              {onCompare && (
                <Button
                  onClick={onCompare}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Compare
                </Button>
              )}
            </motion.div>
          </div>
        </ScrollArea>
      </motion.div>
    </>
  );
}
