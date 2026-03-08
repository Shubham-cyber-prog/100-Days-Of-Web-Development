import { EmbassyLocator } from "../EmbassyLocator";
import { Page } from "../Router";
import { useLanguage } from "../LanguageSwitcher";

interface EmbassyLocatorPageProps {
  setCurrentPage: (page: Page) => void;
}

export function EmbassyLocatorPage({ setCurrentPage }: EmbassyLocatorPageProps) {
  const { t } = useLanguage();
  
  return (
    <main>
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('page.embassy')}</h1>
          <p className="text-xl text-blue-100">
            {t('page.embassy.desc')}
          </p>
        </div>
      </div>
      <EmbassyLocator />
    </main>
  );
}