import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { QuickAccessCards } from './components/QuickAccessCards';
import { TourismOffers } from './components/TourismOffers';
import { WhyIRCTC } from './components/WhyIRCTC';
import { Footer } from './components/Footer';
import { SearchResults } from './components/SearchResults';
import { BookingFlow } from './components/BookingFlow';
import { PNRChecker } from './components/PNRChecker';
import { LiveTrainTracker } from './components/LiveTrainTracker';
import { Train } from './utils/mockData';

type View = 'home' | 'search' | 'booking' | 'pnr' | 'tracking';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [searchParams, setSearchParams] = useState({
    fromStation: '',
    toStation: '',
    date: '',
    trainClass: '',
  });
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [selectedClass, setSelectedClass] = useState('');

  const handleSearch = (from: string, to: string, date: string, trainClass: string) => {
    setSearchParams({ fromStation: from, toStation: to, date, trainClass });
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const handleBookTrain = (train: Train, selectedClass: string) => {
    setSelectedTrain(train);
    setSelectedClass(selectedClass);
    setCurrentView('booking');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    window.scrollTo(0, 0);
  };

  const handleBookingComplete = (pnr: string) => {
    alert(`Booking successful! Your PNR: ${pnr}`);
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleQuickAccess = (feature: string) => {
    switch (feature) {
      case 'Check PNR':
        setCurrentView('pnr');
        break;
      case 'Live Train Status':
        setCurrentView('tracking');
        break;
      default:
        break;
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleBackToHome} />

      {currentView === 'home' && (
        <>
          <HeroSection onSearch={handleSearch} />
          <QuickAccessCards onCardClick={handleQuickAccess} />
          <TourismOffers />
          <WhyIRCTC />
          <Footer />
        </>
      )}

      {currentView === 'search' && (
        <>
          <SearchResults
            fromStation={searchParams.fromStation}
            toStation={searchParams.toStation}
            date={searchParams.date}
            trainClass={searchParams.trainClass}
            onBack={handleBackToHome}
            onBookTrain={handleBookTrain}
          />
          <Footer />
        </>
      )}

      {currentView === 'booking' && selectedTrain && (
        <>
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <BookingFlow
                train={selectedTrain}
                selectedClass={selectedClass}
                onBack={handleBackToSearch}
                onComplete={handleBookingComplete}
              />
            </div>
          </div>
          <Footer />
        </>
      )}

      {currentView === 'pnr' && (
        <>
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <PNRChecker />
            </div>
          </div>
          <Footer />
        </>
      )}

      {currentView === 'tracking' && (
        <>
          <div className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <LiveTrainTracker />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}