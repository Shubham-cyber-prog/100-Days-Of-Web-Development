import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { SolarSystemView } from "./components/SolarSystemView";
import { ComparisonView } from "./components/ComparisonView";
import { EducationalMode } from "./components/EducationalMode";
import { FloatingNav } from "./components/FloatingNav";
import { MobileNav } from "./components/MobileNav";

type View = "landing" | "solarSystem" | "comparison" | "educational";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("landing");

  const renderView = () => {
    switch (currentView) {
      case "landing":
        return (
          <LandingPage
            onStartExploring={() => setCurrentView("solarSystem")}
            onLearnMore={() => setCurrentView("educational")}
          />
        );
      case "solarSystem":
        return <SolarSystemView onBack={() => setCurrentView("landing")} />;
      case "comparison":
        return <ComparisonView onBack={() => setCurrentView("solarSystem")} />;
      case "educational":
        return <EducationalMode onBack={() => setCurrentView("landing")} />;
      default:
        return (
          <LandingPage
            onStartExploring={() => setCurrentView("solarSystem")}
            onLearnMore={() => setCurrentView("educational")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen">
      {renderView()}
      <FloatingNav currentView={currentView} onNavigate={setCurrentView} />
      <MobileNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}