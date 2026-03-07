import { HeroSection } from "../HeroSection";
import { QuickServices } from "../QuickServices";
import { NewsSection } from "../NewsSection";
import { Page } from "../Router";

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

export function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <main>
      <HeroSection />
      <QuickServices />
      <NewsSection />
    </main>
  );
}