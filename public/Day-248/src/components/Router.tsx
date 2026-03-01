import { useState } from "react";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ConsularServicesPage } from "./pages/ConsularServicesPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsDetailPage } from "./pages/NewsDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { ForeignRelationsPage } from "./pages/ForeignRelationsPage";

export type Page = 'home' | 'about' | 'consular-services' | 'news' | 'news-detail' | 'contact' | 'foreign-relations';

interface RouterProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  newsId?: string;
}

export function Router({ currentPage, setCurrentPage, newsId }: RouterProps) {
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'consular-services':
        return <ConsularServicesPage setCurrentPage={setCurrentPage} />;
      case 'news':
        return <NewsPage setCurrentPage={setCurrentPage} />;
      case 'news-detail':
        return <NewsDetailPage setCurrentPage={setCurrentPage} newsId={newsId} />;
      case 'contact':
        return <ContactPage setCurrentPage={setCurrentPage} />;
      case 'foreign-relations':
        return <ForeignRelationsPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return <>{renderPage()}</>;
}