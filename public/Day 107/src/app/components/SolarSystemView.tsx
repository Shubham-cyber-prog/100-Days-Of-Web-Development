import { useState } from "react";
import { motion } from "motion/react";
import { Planet, planetsData } from "../data/planetsData";
import { ZoomIn, ZoomOut, Play, Pause } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { PlanetDetailPanel } from "./PlanetDetailPanel";
import { useMediaQuery } from "./ui/use-mobile";

interface SolarSystemViewProps {
  onBack: () => void;
}

export function SolarSystemView({ onBack }: SolarSystemViewProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [zoom, setZoom] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handlePlanetClick = (planet: Planet) => {
    setSelectedPlanet(planet);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5));
  };

  if (isMobile) {
    // Mobile: Stacked cards view
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#141B2E] to-[#1A1F35] py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-6 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
          >
            ← Back to Home
          </Button>

          <h2 className="text-3xl mb-6 text-white text-center">Solar System Planets</h2>

          <div className="space-y-4">
            {planetsData.map((planet) => (
              <motion.div
                key={planet.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all"
                onClick={() => handlePlanetClick(planet)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage: `url(${planet.imageUrl})`,
                      boxShadow: `0 0 30px ${planet.glowColor}50`,
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl mb-1 text-white">{planet.name}</h3>
                    <p className="text-sm text-gray-400 mb-1">
                      Distance: {planet.distanceFromSun}
                    </p>
                    <p className="text-sm text-gray-400">Moons: {planet.moons}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {selectedPlanet && (
            <PlanetDetailPanel
              planet={selectedPlanet}
              onClose={() => setSelectedPlanet(null)}
            />
          )}
        </div>
      </div>
    );
  }

  // Desktop: Orbital view
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0B0F1A] via-[#141B2E] to-[#1A1F35]">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* Control panel */}
      <div className="absolute top-6 left-6 z-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 space-y-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
        >
          ← Back
        </Button>

        <div className="space-y-3">
          <div className="text-sm text-gray-300 mb-2">Zoom</div>
          <div className="flex gap-2">
            <Button
              onClick={handleZoomOut}
              size="icon"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleZoomIn}
              size="icon"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-300">Animation</div>
          <Button
            onClick={() => setIsPaused(!isPaused)}
            size="sm"
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            {isPaused ? (
              <>
                <Play className="h-4 w-4 mr-2" /> Play
              </>
            ) : (
              <>
                <Pause className="h-4 w-4 mr-2" /> Pause
              </>
            )}
          </Button>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-gray-300">
            Speed: {speed.toFixed(1)}x
          </div>
          <Slider
            value={[speed]}
            onValueChange={(value) => setSpeed(value[0])}
            min={0.1}
            max={3}
            step={0.1}
            className="w-32"
          />
        </div>
      </div>

      {/* Solar system */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <motion.div
          className="relative"
          style={{ scale: zoom }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Sun */}
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 shadow-[0_0_100px_rgba(251,191,36,0.8)] cursor-pointer z-10"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              boxShadow: [
                "0 0 80px rgba(251,191,36,0.8)",
                "0 0 120px rgba(251,191,36,1)",
                "0 0 80px rgba(251,191,36,0.8)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-full h-full rounded-full bg-[url('https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW4lMjBzb2xhciUyMHN0YXJ8ZW58MXx8fHwxNzcxODc2MjkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center" />
          </motion.div>

          {/* Orbit paths and planets */}
          {planetsData.map((planet) => (
            <div key={planet.id}>
              {/* Orbit path */}
              <div
                className="absolute rounded-full border border-white/10"
                style={{
                  width: planet.orbitRadius * 2,
                  height: planet.orbitRadius * 2,
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              {/* Planet */}
              <motion.div
                className="absolute cursor-pointer group"
                style={{
                  left: "50%",
                  top: "50%",
                }}
                animate={
                  isPaused
                    ? {}
                    : {
                        rotate: 360,
                      }
                }
                transition={{
                  duration: planet.orbitDuration / speed,
                  repeat: Infinity,
                  ease: "linear",
                }}
                onClick={() => handlePlanetClick(planet)}
              >
                <motion.div
                  className="rounded-full bg-cover bg-center relative"
                  style={{
                    width: planet.size,
                    height: planet.size,
                    left: planet.orbitRadius,
                    top: -planet.size / 2,
                    backgroundImage: `url(${planet.imageUrl})`,
                    boxShadow: `0 0 20px ${planet.glowColor}40`,
                  }}
                  whileHover={{
                    scale: 1.3,
                    boxShadow: `0 0 40px ${planet.glowColor}`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Planet name tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {planet.name}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Planet detail panel */}
      {selectedPlanet && (
        <PlanetDetailPanel
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  );
}
