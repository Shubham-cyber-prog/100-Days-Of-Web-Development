import { motion } from "motion/react";
import { Rocket, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface LandingPageProps {
  onStartExploring: () => void;
  onLearnMore: () => void;
}

export function LandingPage({ onStartExploring, onLearnMore }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0B0F1A] via-[#141B2E] to-[#1A1F35]">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Animated solar system illustration */}
        <motion.div
          className="relative mb-12"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, type: "spring" }}
        >
          {/* Sun */}
          <motion.div
            className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-orange-600 shadow-[0_0_60px_rgba(251,191,36,0.6)]"
            animate={{
              boxShadow: [
                "0 0 60px rgba(251,191,36,0.6)",
                "0 0 100px rgba(251,191,36,0.8)",
                "0 0 60px rgba(251,191,36,0.6)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Orbiting planets */}
          {[
            { size: 8, distance: 60, duration: 3, color: "bg-gray-400" },
            { size: 12, distance: 90, duration: 5, color: "bg-blue-400" },
            { size: 10, distance: 120, duration: 7, color: "bg-red-400" },
            { size: 16, distance: 150, duration: 10, color: "bg-orange-300" },
          ].map((planet, idx) => (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: planet.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div
                className={`${planet.color} rounded-full absolute`}
                style={{
                  width: planet.size,
                  height: planet.size,
                  left: planet.distance,
                  top: -planet.size / 2,
                  transform: "translateX(-50%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Explore Our Solar System
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Discover planets, moons, and cosmic facts in this interactive journey through space
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            onClick={onStartExploring}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.7)] transition-all"
          >
            <Rocket className="mr-2 h-5 w-5" />
            Start Exploring
          </Button>
          <Button
            onClick={onLearnMore}
            size="lg"
            variant="outline"
            className="border-2 border-purple-500/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 px-8 py-6 text-lg backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Learn More
          </Button>
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-500/30 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
