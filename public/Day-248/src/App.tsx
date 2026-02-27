import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Router, Page } from "./components/Router";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [newsId, setNewsId] = useState<string>();

  // Make setCurrentPage globally available for navigation
  if (typeof window !== 'undefined') {
    (window as any).setCurrentPage = setCurrentPage;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Router currentPage={currentPage} setCurrentPage={setCurrentPage} newsId={newsId} />
      <Footer />
    </div>
  );
}