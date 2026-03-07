import { createContext, useContext, useState, ReactNode } from "react";

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'header.title': 'Ministry of External Affairs',
    'header.subtitle': 'Government of India',
    'header.search': 'Search...',
    'header.hindi': 'हिंदी',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About MEA',
    'nav.foreign': 'Foreign Relations',
    'nav.consular': 'Consular Services',
    'nav.diaspora': 'Indian Diaspora',
    'nav.media': 'Media Center',
    'nav.tenders': 'Tenders',
    'nav.career': 'Career',
    
    // Hero Section
    'hero.welcome': 'Welcome to the Ministry of External Affairs',
    'hero.description': 'Serving India\'s foreign policy interests and assisting Indian nationals abroad',
    'hero.passport': 'Apply for Passport',
    'hero.visa': 'Visa Information',
    'hero.learnmore': 'Learn More',
    'hero.announcement': 'Important Announcement',
    'hero.announcement1': 'New e-Passport services now available at select locations',
    'hero.announcement2': 'Updated travel guidelines for international travelers',
    'hero.announcement3': 'Visa-on-arrival facility extended to 15 more countries',
    'hero.viewall': 'View All Announcements',
    
    // Stats
    'stats.missions': 'Missions Abroad',
    'stats.countries': 'Countries Covered',
    'stats.diaspora': 'Indian Diaspora',
    'stats.passports': 'Passports Issued Annually',
    
    // Quick Services
    'services.title': 'Services & Quick Links',
    'services.subtitle': 'Access essential consular and diplomatic services with ease',
    'services.passport.title': 'Passport Services',
    'services.passport.desc': 'Apply for new passport, renewal, and related services',
    'services.visa.title': 'Visa Services',
    'services.visa.desc': 'Visa information and application procedures',
    'services.travel.title': 'Travel Advisories',
    'services.travel.desc': 'Safety alerts and travel guidance for Indian nationals',
    'services.embassy.title': 'Embassy Locator',
    'services.embassy.desc': 'Find Indian embassies and consulates worldwide',
    'services.emergency.title': 'Emergency Helpline',
    'services.emergency.desc': '24/7 assistance for Indian nationals in distress',
    'services.oci.title': 'OCI Services',
    'services.oci.desc': 'Overseas Citizen of India card services',
    'services.access': 'Access Service',
    'services.quicklinks': 'Quick Links',
    'services.link1': 'Emergency Travel Document',
    'services.link2': 'Consular Fees',
    'services.link3': 'Attestation Services',
    'services.link4': 'Registration Services',
    'services.link5': 'Grievance Portal',
    'services.link6': 'Download Forms',
    
    // News Section
    'news.title': 'Latest News & Updates',
    'news.subtitle': 'Stay informed about recent developments and announcements',
    'news.readmore': 'Read More',
    'news.viewall': 'View All News',
    
    // Embassy Locator
    'embassy.title': 'Find Indian Missions Abroad',
    'embassy.subtitle': 'Locate Indian Embassies, High Commissions, and Consulates worldwide',
    'embassy.search': 'Search by country or city...',
    'embassy.allregions': 'All Regions',
    'embassy.showdetails': 'Show Contact Details',
    'embassy.showless': 'Show Less',
    'embassy.noresults': 'No embassies found matching your search.',
    'embassy.type.embassy': 'Embassy',
    'embassy.type.highcommission': 'High Commission',
    'embassy.type.consulate': 'Consulate',
    'embassy.emergency': 'Emergency',
    
    // Travel Advisories
    'advisory.title': 'Travel Advisories',
    'advisory.subtitle': 'Stay informed about travel safety and security updates',
    'advisory.important': 'Important Information',
    'advisory.description': 'Travel advisories are regularly updated based on security situations. Please check before planning international travel and register with the nearest Indian Mission upon arrival.',
    'advisory.search': 'Search by country...',
    'advisory.alllevels': 'All Levels',
    'advisory.level.low': 'Low',
    'advisory.level.moderate': 'Moderate',
    'advisory.level.high': 'High',
    'advisory.level.extreme': 'Extreme',
    'advisory.updated': 'Updated',
    'advisory.noresults': 'No travel advisories found matching your search.',
    'advisory.risk': 'Risk',
    
    // Emergency Helpline
    'emergency.title': 'Emergency Helpline',
    'emergency.subtitle': 'For Indian nationals in distress abroad',
    'emergency.control': '24x7 Control Room',
    'emergency.control.desc': 'For urgent consular assistance and emergencies involving Indian nationals abroad',
    'emergency.consular': 'Consular Helpline',
    'emergency.consular.desc': 'General consular queries, passport services, and visa information',
    'emergency.madad': 'MADAD Portal',
    'emergency.madad.desc': 'Online grievance registration and tracking for consular issues',
    'emergency.whatsapp': 'WhatsApp Helpline',
    'emergency.whatsapp.desc': 'Quick assistance via WhatsApp for consular queries',
    'emergency.available': '24/7',
    'emergency.hours': '9:00 AM - 5:30 PM IST',
    'emergency.viewall': 'View All Helplines',
    'emergency.showless': 'Show Less',
    'emergency.location': 'For location-specific emergencies, contact your nearest Indian Embassy or Consulate.',
    
    // Accessibility
    'accessibility.title': 'Accessibility Settings',
    'accessibility.subtitle': 'Customize your viewing experience',
    'accessibility.textsize': 'Text Size',
    'accessibility.highcontrast': 'High Contrast',
    'accessibility.reducemotion': 'Reduce Motion',
    'accessibility.reset': 'Reset to Default',
    'accessibility.shortcuts': 'Keyboard Shortcuts:',
    'accessibility.tab': 'Navigate elements',
    'accessibility.enter': 'Activate buttons',
    'accessibility.esc': 'Close dialogs',
    
    // Footer
    'footer.about': 'About MEA',
    'footer.services': 'Services',
    'footer.resources': 'Resources',
    'footer.connect': 'Connect With Us',
    'footer.description': 'The Ministry of External Affairs is responsible for India\'s foreign relations and diplomatic missions worldwide, promoting India\'s interests and values globally.',
    'footer.copyright': '© 2026 Ministry of External Affairs, Government of India. All rights reserved.',
    'footer.quicklinks': 'Quick Links',
    'footer.diplomatic': 'Diplomatic Relations',
    'footer.related': 'Related Government Websites',
    'footer.national': 'National Portal',
    'footer.pmo': 'Prime Minister\'s Office',
    'footer.digital': 'Digital Transformation',
    'footer.citizen': 'Citizen Engagement',
    
    // Page Titles
    'page.embassy': 'Embassy Locator',
    'page.embassy.desc': 'Find Indian Embassies, High Commissions, and Consulates around the world',
    'page.advisory': 'Travel Advisories',
    'page.advisory.desc': 'Important safety and security information for travelers',
    
    // Common
    'common.home': 'Home',
    'common.contact': 'Contact',
    'common.about': 'About',
    'common.more': 'More',
  },
  hi: {
    // Header
    'header.title': 'विदेश मंत्रालय',
    'header.subtitle': 'भारत सरकार',
    'header.search': 'खोजें...',
    'header.hindi': 'English',
    
    // Navigation
    'nav.home': 'होम',
    'nav.about': 'विदेश मंत्रालय के बारे में',
    'nav.foreign': 'विदेशी संबंध',
    'nav.consular': 'कांसुलर सेवाएं',
    'nav.diaspora': 'भारतीय प्रवासी',
    'nav.media': 'मीडिया केंद्र',
    'nav.tenders': 'निविदाएं',
    'nav.career': 'करियर',
    
    // Hero Section
    'hero.welcome': 'विदेश मंत्रालय में आपका स्वागत है',
    'hero.description': 'भारत की विदेश नीति हितों की सेवा और विदेश में भारतीय नागरिकों की सहायता',
    'hero.passport': 'पासपोर्ट के लिए आवेदन करें',
    'hero.visa': 'वीज़ा जानकारी',
    'hero.learnmore': 'और जानें',
    'hero.announcement': 'महत्वपूर्ण घोषणा',
    'hero.announcement1': 'चुनिंदा स्थानों पर नई ई-पासपोर्ट सेवाएं अब उपलब्ध हैं',
    'hero.announcement2': 'अंतर्राष्ट्रीय यात्रियों के लिए अद्यतन यात्रा दिशानिर्देश',
    'hero.announcement3': '15 और देशों में आगमन पर वीजा सुविधा का विस्तार',
    'hero.viewall': 'सभी घोषणाएं देखें',
    
    // Stats
    'stats.missions': 'विदेशों में मिशन',
    'stats.countries': 'कवर किए गए देश',
    'stats.diaspora': 'भारतीय प्रवासी',
    'stats.passports': 'वार्षिक जारी पासपोर्ट',
    
    // Quick Services
    'services.title': 'सेवाएं और त्वरित लिंक',
    'services.subtitle': 'आवश्यक कांसुलर और राजनयिक सेवाओं तक आसानी से पहुंचें',
    'services.passport.title': 'पासपोर्ट सेवाएं',
    'services.passport.desc': 'नए पासपोर्ट, नवीनीकरण और संबंधित सेवाओं के लिए आवेदन करें',
    'services.visa.title': 'वीज़ा सेवाएं',
    'services.visa.desc': 'वीज़ा जानकारी और आवेदन प्रक्रियाएं',
    'services.travel.title': 'यात्रा सलाह',
    'services.travel.desc': 'भारतीय नागरिकों के लिए सुरक्षा अलर्ट और यात्रा मार्गदर्शन',
    'services.embassy.title': 'दूतावास खोजकर्ता',
    'services.embassy.desc': 'विश्वभर में भारतीय दूतावास और वाणिज्य दूतावास खोजें',
    'services.emergency.title': 'आपातकालीन हेल्पलाइन',
    'services.emergency.desc': 'संकट में भारतीय नागरिकों के लिए 24/7 सहायता',
    'services.oci.title': 'OCI सेवाएं',
    'services.oci.desc': 'भारत के विदेशी नागरिक कार्ड सेवाएं',
    'services.access': 'सेवा का उपयोग करें',
    'services.quicklinks': 'त्वरित लिंक',
    'services.link1': 'आपातकालीन यात्रा दस्तावेज़',
    'services.link2': 'कांसुलर शुल्क',
    'services.link3': 'सत्यापन सेवाएं',
    'services.link4': 'पंजीकरण सेवाएं',
    'services.link5': 'शिकायत पोर्टल',
    'services.link6': 'फॉर्म डाउनलोड करें',
    
    // News Section
    'news.title': 'ताज़ा खबरें और अपडेट',
    'news.subtitle': 'हाल के घटनाक्रमों और घोषणाओं के बारे में जानकारी रखें',
    'news.readmore': 'और पढ़ें',
    'news.viewall': 'सभी समाचार देखें',
    
    // Embassy Locator
    'embassy.title': 'विदेश में भारतीय मिशन खोजें',
    'embassy.subtitle': 'विश्वभर में भारतीय दूतावास, उच्चायोग और वाणिज्य दूतावास खोजें',
    'embassy.search': 'देश या शहर से खोजें...',
    'embassy.allregions': 'सभी क्षेत्र',
    'embassy.showdetails': 'संपर्क विवरण दिखाएं',
    'embassy.showless': 'कम दिखाएं',
    'embassy.noresults': 'आपकी खोज से मेल खाने वाला कोई दूतावास नहीं मिला।',
    'embassy.type.embassy': 'दूतावास',
    'embassy.type.highcommission': 'उच्चायोग',
    'embassy.type.consulate': 'वाणिज्य दूतावास',
    'embassy.emergency': 'आपातकालीन',
    
    // Travel Advisories
    'advisory.title': 'यात्रा सलाह',
    'advisory.subtitle': 'यात्रा सुरक्षा और सुरक्षा अपडेट के बारे में जानकारी रखें',
    'advisory.important': 'महत्वपूर्ण जानकारी',
    'advisory.description': 'सुरक्षा स्थितियों के आधार पर यात्रा सलाह नियमित रूप से अपडेट की जाती है। कृपया अंतर्राष्ट्रीय यात्रा की योजना बनाने से पहले जांच करें और आगमन पर निकटतम भारतीय मिशन के साथ पंजीकरण करें।',
    'advisory.search': 'देश से खोजें...',
    'advisory.alllevels': 'सभी स्तर',
    'advisory.level.low': 'कम',
    'advisory.level.moderate': 'मध्यम',
    'advisory.level.high': 'उच्च',
    'advisory.level.extreme': 'अत्यधिक',
    'advisory.updated': 'अपडेट किया गया',
    'advisory.noresults': 'आपकी खोज से मेल खाने वाली कोई यात्रा सलाह नहीं मिली।',
    'advisory.risk': 'जोखिम',
    
    // Emergency Helpline
    'emergency.title': 'आपातकालीन हेल्पलाइन',
    'emergency.subtitle': 'विदेश में संकट में भारतीय नागरिकों के लिए',
    'emergency.control': '24x7 नियंत्रण कक्ष',
    'emergency.control.desc': 'विदेश में भारतीय नागरिकों से जुड़े तत्काल कांसुलर सहायता और आपात स्थितियों के लिए',
    'emergency.consular': 'कांसुलर हेल्पलाइन',
    'emergency.consular.desc': 'सामान्य कांसुलर प्रश्न, पासपोर्ट सेवाएं और वीज़ा जानकारी',
    'emergency.madad': 'मदद पोर्टल',
    'emergency.madad.desc': 'कांसुलर मुद्दों के लिए ऑनलाइन शिकायत पंजीकरण और ट्रैकिंग',
    'emergency.whatsapp': 'व्हाट्सएप हेल्पलाइन',
    'emergency.whatsapp.desc': 'कांसुलर प्रश्नों के लिए व्हाट्सएप के माध्यम से त्वरित सहायता',
    'emergency.available': '24/7',
    'emergency.hours': 'सुबह 9:00 बजे - शाम 5:30 बजे IST',
    'emergency.viewall': 'सभी हेल्पलाइन देखें',
    'emergency.showless': 'कम दिखाएं',
    'emergency.location': 'स्थान-विशिष्ट आपात स्थितियों के लिए, अपने निकटतम भारतीय दूतावास या वाणिज्य दूतावास से संपर्क करें।',
    
    // Accessibility
    'accessibility.title': 'सुगम्यता सेटिंग्स',
    'accessibility.subtitle': 'अपने देखने के अनुभव को अनुकूलित करें',
    'accessibility.textsize': 'पाठ का आकार',
    'accessibility.highcontrast': 'उच्च कंट्रास्ट',
    'accessibility.reducemotion': 'गति कम करें',
    'accessibility.reset': 'डिफ़ॉल्ट पर रीसेट करें',
    'accessibility.shortcuts': 'कीबोर्ड शॉर्टकट:',
    'accessibility.tab': 'तत्वों को नेविगेट करें',
    'accessibility.enter': 'बटन सक्रिय करें',
    'accessibility.esc': 'संवाद बंद करें',
    
    // Footer
    'footer.about': 'विदेश मंत्रालय के बारे में',
    'footer.services': 'सेवाएं',
    'footer.resources': 'संसाधन',
    'footer.connect': 'हमसे जुड़ें',
    'footer.description': 'विदेश मंत्रालय विश्व भर में भारत के विदेशी संबंधों और राजनयिक मिशनों के लिए जिम्मेदार है, जो वैश्विक स्तर पर भारत के हितों और मूल्यों को बढ़ावा देता है।',
    'footer.copyright': '© 2026 विदेश मंत्रालय, भारत सरकार। सर्वाधिकार सुरक्षित।',
    'footer.quicklinks': 'त्वरित लिंक',
    'footer.diplomatic': 'राजनयिक संबंध',
    'footer.related': 'संबंधित सरकारी वेबसाइटें',
    'footer.national': 'राष्ट्रीय पोर्टल',
    'footer.pmo': 'प्रधानमंत्री कार्यालय',
    'footer.digital': 'डिजिटल परिवर्तन',
    'footer.citizen': 'नागरिक जुड़ाव',
    
    // Page Titles
    'page.embassy': 'दूतावास खोजकर्ता',
    'page.embassy.desc': 'दुनिया भर में भारतीय दूतावास, उच्चायोग और वाणिज्य दूतावास खोजें',
    'page.advisory': 'यात्रा सलाह',
    'page.advisory.desc': 'यात्रियों के लिए महत्वपूर्ण सुरक्षा और सुरक्षा जानकारी',
    
    // Common
    'common.home': 'होम',
    'common.contact': 'संपर्क',
    'common.about': 'के बारे में',
    'common.more': 'और',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language Switcher Button Component
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors"
      aria-label="Switch Language"
    >
      {t('header.hindi')}
    </button>
  );
}