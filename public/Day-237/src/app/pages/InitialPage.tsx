import { SplashIntro } from "./SplashIntro";
import { Home } from "./Home";

export function InitialPage() {
  const hasSeenIntro = localStorage.getItem("turfbook_intro_seen");

  // Show intro only if user hasn't seen it
  if (!hasSeenIntro) {
    return <SplashIntro />;
  }

  // Otherwise show home page
  return <Home />;
}