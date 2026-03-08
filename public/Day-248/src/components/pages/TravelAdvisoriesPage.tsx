import { TravelAdvisories } from "../TravelAdvisories";
import { Page } from "../Router";
import { useLanguage } from "../LanguageSwitcher";

interface TravelAdvisoriesPageProps {
  setCurrentPage: (page: Page) => void;
}

export function TravelAdvisoriesPage({ setCurrentPage }: TravelAdvisoriesPageProps) {
  const { t } = useLanguage();
  
  return (
    <main>
      <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('page.advisory')}</h1>
          <p className="text-xl text-orange-100">
            {t('page.advisory.desc')}
          </p>
        </div>
      </div>
      <TravelAdvisories />
    </main>
  );
}