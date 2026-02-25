import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ArrowLeft, Search, Filter, SlidersHorizontal, Calendar } from 'lucide-react';
import { TrainCard } from './TrainCard';
import { Train, searchTrains } from '../utils/mockData';

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

  const sortedTrains = [...trains].sort((a, b) => {
    if (sortBy === 'departure') {
      return a.departure.localeCompare(b.departure);
    } else if (sortBy === 'duration') {
      return a.duration.localeCompare(b.duration);
    }
    return 0;
  });

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
                  <span>Filters</span>
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
                          <label key={time} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{time}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Train Type</label>
                      <div className="space-y-2">
                        {['Rajdhani', 'Shatabdi', 'Duronto', 'Express', 'Superfast'].map((type) => (
                          <label key={type} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{type}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Amenities</label>
                      <div className="space-y-2">
                        {['WiFi', 'Catering', 'Charging Points', 'Pantry Car'].map((amenity) => (
                          <label key={amenity} className="flex items-center space-x-2 text-sm">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span>{amenity}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {trains.length === 0 ? (
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
