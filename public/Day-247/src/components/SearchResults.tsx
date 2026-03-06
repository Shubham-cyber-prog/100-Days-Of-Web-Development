import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Search, Filter, SlidersHorizontal, Calendar } from 'lucide-react';
import { TrainCard } from './TrainCard';
import { Train, searchTrains } from '../utils/mockData';
import { FareCalendar } from './FareCalendar';

interface SearchResultsProps {
  fromStation: string;
  toStation: string;
  date: string;
  trainClass: string;
  onBack: () => void;
  onBookTrain: (train: Train, selectedClass: string) => void;
}

export function SearchResults({
  fromStation,
  toStation,
  date,
  trainClass,
  onBack,
  onBookTrain,
}: SearchResultsProps) {
  const [trains] = useState<Train[]>(searchTrains(fromStation, toStation, date));
  const [sortBy, setSortBy] = useState<'departure' | 'duration' | 'price'>('departure');
  const [showFilters, setShowFilters] = useState(false);
  const [showFareCalendar, setShowFareCalendar] = useState(false);
  const [filters, setFilters] = useState({
    departureTime: [] as string[],
    trainType: [] as string[],
    amenities: [] as string[],
    availabilityOnly: false,
  });

  const filteredTrains = trains.filter((train) => {
    // Filter by departure time
    if (filters.departureTime.length > 0) {
      const hour = parseInt(train.departure.split(':')[0]);
      const matchesTime = filters.departureTime.some((timeRange) => {
        if (timeRange.includes('00:00 - 06:00')) return hour >= 0 && hour < 6;
        if (timeRange.includes('06:00 - 12:00')) return hour >= 6 && hour < 12;
        if (timeRange.includes('12:00 - 18:00')) return hour >= 12 && hour < 18;
        if (timeRange.includes('18:00 - 00:00')) return hour >= 18 && hour < 24;
        return false;
      });
      if (!matchesTime) return false;
    }

    // Filter by train type
    if (filters.trainType.length > 0) {
      const matchesType = filters.trainType.some((type) =>
        train.name.toLowerCase().includes(type.toLowerCase())
      );
      if (!matchesType) return false;
    }

    // Filter by availability
    if (filters.availabilityOnly) {
      const hasAvailability = Object.values(train.classes).some((cls) => cls.available > 0);
      if (!hasAvailability) return false;
    }

    return true;
  });

  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departure.localeCompare(b.departure);
    } else if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    } else if (sortBy === 'price') {
      const aPrice = Math.min(...Object.values(a.classes).map((c) => c.price));
      const bPrice = Math.min(...Object.values(b.classes).map((c) => c.price));
      return aPrice - bPrice;
    }
    return 0;
  });

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    if (category === 'availabilityOnly') return;
    
    const currentFilters = filters[category] as string[];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((f) => f !== value)
      : [...currentFilters, value];
    
    setFilters({ ...filters, [category]: newFilters });
  };

  const averagePrice = trains.length > 0
    ? Math.round(
        trains.reduce((acc, train) => {
          const prices = Object.values(train.classes).map((c) => c.price);
          return acc + Math.min(...prices);
        }, 0) / trains.length
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Search
          </Button>

          <Card className="bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-2">
                    {fromStation} → {toStation}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-blue-100">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{date || 'Select date'}</span>
                    </div>
                    {trainClass && <span>• Class: {trainClass}</span>}
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="text-sm text-blue-100 mb-1">Available Trains</div>
                  <div className="text-3xl font-bold">{trains.length}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fare Calendar */}
        {showFareCalendar && (
          <div className="mb-6">
            <FareCalendar
              basePrice={averagePrice}
              onDateSelect={(date, price) => {
                console.log('Selected date:', date, 'Price:', price);
              }}
            />
            <Button
              variant="ghost"
              onClick={() => setShowFareCalendar(false)}
              className="mt-2 w-full"
            >
              Hide Fare Calendar
            </Button>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters {(filters.departureTime.length + filters.trainType.length > 0) && `(${filters.departureTime.length + filters.trainType.length})`}</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowFareCalendar(!showFareCalendar)}
                  className="flex items-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Fare Calendar</span>
                </Button>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Sort by:</span>
                </div>

                <Button
                  variant={sortBy === 'departure' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('departure')}
                  className={sortBy === 'departure' ? 'bg-[#0058A3]' : ''}
                >
                  Departure Time
                </Button>

                <Button
                  variant={sortBy === 'duration' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('duration')}
                  className={sortBy === 'duration' ? 'bg-[#0058A3]' : ''}
                >
                  Duration
                </Button>

                <Button
                  variant={sortBy === 'price' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('price')}
                  className={sortBy === 'price' ? 'bg-[#0058A3]' : ''}
                >
                  Price
                </Button>
              </div>

              {showFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Departure Time
                      </label>
                      <div className="space-y-2">
                        {['Early Morning (00:00 - 06:00)', 'Morning (06:00 - 12:00)', 'Afternoon (12:00 - 18:00)', 'Night (18:00 - 00:00)'].map((time) => (
                          <label key={time} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 cursor-pointer"
                              checked={filters.departureTime.includes(time)}
                              onChange={() => toggleFilter('departureTime', time)}
                            />
                            <span>{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Train Type</label>
                      <div className="space-y-2">
                        {['Rajdhani', 'Shatabdi', 'Duronto', 'Express', 'Superfast'].map((type) => (
                          <label key={type} className="flex items-center space-x-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 cursor-pointer"
                              checked={filters.trainType.includes(type)}
                              onChange={() => toggleFilter('trainType', type)}
                            />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Options</label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 cursor-pointer"
                            checked={filters.availabilityOnly}
                            onChange={() => setFilters({ ...filters, availabilityOnly: !filters.availabilityOnly })}
                          />
                          <span>Show only available seats</span>
                        </label>
                      </div>
                      {(filters.departureTime.length > 0 || filters.trainType.length > 0 || filters.availabilityOnly) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFilters({ departureTime: [], trainType: [], amenities: [], availabilityOnly: false })}
                          className="mt-3 text-red-600 hover:text-red-700"
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {sortedTrains.length === 0 && filters.departureTime.length === 0 && filters.trainType.length === 0 && !filters.availabilityOnly ? (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trains found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or selecting different dates
            </p>
            <Button onClick={onBack} className="bg-[#0058A3] hover:bg-[#004080]">
              Modify Search
            </Button>
          </Card>
        ) : sortedTrains.length === 0 ? (
          <Card className="p-12 text-center">
            <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trains match your filters</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting or clearing your filters to see more results
            </p>
            <Button
              onClick={() => setFilters({ departureTime: [], trainType: [], amenities: [], availabilityOnly: false })}
              className="bg-[#0058A3] hover:bg-[#004080]"
            >
              Clear All Filters
            </Button>
          </Card>
        ) : trains.length === 0 ? (
          <Card className="p-12 text-center">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trains found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or selecting different dates
            </p>
            <Button onClick={onBack} className="bg-[#0058A3] hover:bg-[#004080]">
              Modify Search
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {sortedTrains.map((train) => (
              <TrainCard key={train.number} train={train} onBookNow={onBookTrain} />
            ))}
          </div>
        )}

        {/* Helpful Tips */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">💡 Booking Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Book in advance for better seat availability and lower fares</li>
              <li>• Check train running days before booking your tickets</li>
              <li>• Tatkal booking opens 24 hours before train departure</li>
              <li>• Carry a valid ID proof during your journey</li>
              <li>• Save your PNR number for tracking and cancellation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
