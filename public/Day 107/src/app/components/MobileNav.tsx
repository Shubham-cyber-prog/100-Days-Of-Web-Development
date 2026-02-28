import { motion } from "motion/react";
import { Menu, X, Home, Orbit, ArrowLeftRight, GraduationCap } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

type View = "landing" | "solarSystem" | "comparison" | "educational";

interface MobileNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function MobileNav({ currentView, onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (currentView === "landing") return null;

  const navItems = [
    { id: "landing" as View, icon: Home, label: "Home" },
    { id: "solarSystem" as View, icon: Orbit, label: "Solar System" },
    { id: "comparison" as View, icon: ArrowLeftRight, label: "Compare" },
    { id: "educational" as View, icon: GraduationCap, label: "Learn" },
  ];

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.div
        className="fixed top-6 right-6 z-50 md:hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white/20 rounded-full w-12 h-12 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </motion.div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className="fixed top-20 right-6 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 z-50 md:hidden shadow-[0_0_40px_rgba(139,92,246,0.3)]"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
          >
            <div className="flex flex-col gap-2 min-w-[200px]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <Button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    variant="ghost"
                    className={`justify-start rounded-xl transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
