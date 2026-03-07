import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { Planet, planetsData } from "../data/planetsData";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";

interface ComparisonViewProps {
  onBack: () => void;
}

export function ComparisonView({ onBack }: ComparisonViewProps) {
  const [planet1, setPlanet1] = useState<Planet>(planetsData[2]); // Earth
  const [planet2, setPlanet2] = useState<Planet>(planetsData[3]); // Mars

  const getRelativeValue = (value: string, max: number): number => {
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    return (num / max) * 100;
  };

  const maxDiameter = 139820; // Jupiter's diameter
  const maxDistance = 4500; // Neptune's distance in millions km
  const maxGravity = 23.1; // Jupiter's gravity

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F1A] via-[#141B2E] to-[#1A1F35] py-8 px-4">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="outline"
            className="mb-4 border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <ArrowLeftRight className="h-6 w-6 text-purple-400" />
            <h1 className="text-3xl md:text-4xl text-white">Planet Comparison</h1>
          </div>
          <p className="text-center text-gray-400">
            Compare two planets side by side
          </p>
        </div>

        {/* Planet selectors */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <label className="text-sm text-gray-400 mb-2 block">
              Select First Planet
            </label>
            <Select
              value={planet1.id}
              onValueChange={(id) => {
                const planet = planetsData.find((p) => p.id === id);
                if (planet) setPlanet1(planet);
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planetsData.map((planet) => (
                  <SelectItem key={planet.id} value={planet.id}>
                    {planet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <label className="text-sm text-gray-400 mb-2 block">
              Select Second Planet
            </label>
            <Select
              value={planet2.id}
              onValueChange={(id) => {
                const planet = planetsData.find((p) => p.id === id);
                if (planet) setPlanet2(planet);
              }}
            >
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {planetsData.map((planet) => (
                  <SelectItem key={planet.id} value={planet.id}>
                    {planet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        </div>

        {/* Comparison cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Planet 1 card */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              boxShadow: `0 0 40px ${planet1.glowColor}30`,
            }}
          >
            <div
              className="w-full h-48 rounded-xl bg-cover bg-center mb-4"
              style={{
                backgroundImage: `url(${planet1.imageUrl})`,
                boxShadow: `0 0 30px ${planet1.glowColor}50`,
              }}
            />
            <h2 className="text-2xl text-white mb-4">{planet1.name}</h2>

            {/* Stats */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Diameter</span>
                  <span className="text-white">{planet1.diameter}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet1.diameter, maxDiameter)}
                  className="h-2"
                  style={
                    {
                      "--progress-color": planet1.glowColor,
                    } as React.CSSProperties
                  }
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Distance from Sun</span>
                  <span className="text-white">{planet1.distanceFromSun}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet1.distanceFromSun, maxDistance)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Gravity</span>
                  <span className="text-white">{planet1.gravity}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet1.gravity, maxGravity)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Temperature</span>
                  <span className="text-white">{planet1.temperature}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Orbital Period</span>
                  <span className="text-white">{planet1.orbitalPeriod}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Moons</span>
                  <span className="text-white">{planet1.moons}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Planet 2 card */}
          <motion.div
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              boxShadow: `0 0 40px ${planet2.glowColor}30`,
            }}
          >
            <div
              className="w-full h-48 rounded-xl bg-cover bg-center mb-4"
              style={{
                backgroundImage: `url(${planet2.imageUrl})`,
                boxShadow: `0 0 30px ${planet2.glowColor}50`,
              }}
            />
            <h2 className="text-2xl text-white mb-4">{planet2.name}</h2>

            {/* Stats */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Diameter</span>
                  <span className="text-white">{planet2.diameter}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet2.diameter, maxDiameter)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Distance from Sun</span>
                  <span className="text-white">{planet2.distanceFromSun}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet2.distanceFromSun, maxDistance)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Gravity</span>
                  <span className="text-white">{planet2.gravity}</span>
                </div>
                <Progress
                  value={getRelativeValue(planet2.gravity, maxGravity)}
                  className="h-2"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Temperature</span>
                  <span className="text-white">{planet2.temperature}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Orbital Period</span>
                  <span className="text-white">{planet2.orbitalPeriod}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Moons</span>
                  <span className="text-white">{planet2.moons}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
