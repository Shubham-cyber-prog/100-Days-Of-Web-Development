import { motion } from "motion/react";
import { Home, Orbit, ArrowLeftRight, GraduationCap } from "lucide-react";
import { Button } from "./ui/button";

type View = "landing" | "solarSystem" | "comparison" | "educational";

interface FloatingNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function FloatingNav({ currentView, onNavigate }: FloatingNavProps) {
  if (currentView === "landing") return null;

  const navItems = [
    { id: "landing" as View, icon: Home, label: "Home" },
    { id: "solarSystem" as View, icon: Orbit, label: "Solar System" },
    { id: "comparison" as View, icon: ArrowLeftRight, label: "Compare" },
    { id: "educational" as View, icon: GraduationCap, label: "Learn" },
  ];

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 hidden md:block"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 shadow-[0_0_40px_rgba(139,92,246,0.3)]">
        <div className="flex gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <Button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                variant="ghost"
                size="sm"
                className={`rounded-full px-4 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
