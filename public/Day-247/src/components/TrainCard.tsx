import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Train, Clock, MapPin, Users, IndianRupee, ChevronRight, Wifi, UtensilsCrossed, Power } from 'lucide-react';
import { Train as TrainType, getStationName } from '../utils/mockData';

interface TrainCardProps {
  train: TrainType;
  onBookNow: (train: TrainType, selectedClass: string) => void;
}

export function TrainCard({ train, onBookNow }: TrainCardProps) {
  const [selectedClass, setSelectedClass] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const fromStationName = getStationName(train.from);
  const toStationName = getStationName(train.to);

  const handleBooking = () => {
    if (selectedClass) {
      onBookNow(train, selectedClass);
    }
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-[#0058A3]">
      <CardContent className="p-6">
        {/* Train Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
          <div className="flex items-start space-x-4 mb-4 md:mb-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0058A3] to-[#003d73] rounded-lg flex items-center justify-center">
              <Train className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{train.name}</h3>
              <p className="text-sm text-gray-600">#{train.number}</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {train.daysOfWeek.map((day, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs px-1.5 py-0.5">
                    {day}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Available</Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#0058A3]"
            >
              {showDetails ? 'Hide' : 'Show'} Details
            </Button>
          </div>
        </div>

        {/* Journey Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Departure */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <MapPin className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Departure</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{train.departure}</p>
            <p className="text-sm text-gray-700">{fromStationName}</p>
            <p className="text-xs text-gray-500">{train.from}</p>
          </div>

          {/* Duration */}
          <div className="flex flex-col items-center justify-center">
            <Clock className="h-5 w-5 text-[#0058A3] mb-2" />
            <p className="text-lg font-semibold text-gray-900">{train.duration}</p>
            <div className="w-full h-1 bg-gradient-to-r from-green-400 via-blue-400 to-red-400 rounded-full my-2"></div>
            <p className="text-xs text-gray-500">Non-stop journey</p>
          </div>

          {/* Arrival */}
          <div className="text-right">
            <div className="flex items-center justify-end space-x-2 mb-1">
              <span className="text-sm font-medium text-gray-600">Arrival</span>
              <MapPin className="h-4 w-4 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{train.arrival}</p>
            <p className="text-sm text-gray-700">{toStationName}</p>
            <p className="text-xs text-gray-500">{train.to}</p>
          </div>
        </div>

        {/* Train Amenities */}
        {showDetails && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Train className="h-4 w-4 mr-2 text-[#0058A3]" />
              Train Facilities
            </h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Wifi className="h-4 w-4 text-blue-600" />
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <UtensilsCrossed className="h-4 w-4 text-orange-600" />
                <span>Catering Available</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Power className="h-4 w-4 text-green-600" />
                <span>Charging Points</span>
              </div>
            </div>
          </div>
        )}

        {/* Class Selection */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 flex items-center">
            <Users className="h-4 w-4 mr-2 text-[#0058A3]" />
            Select Travel Class
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(train.classes).map(([classCode, details]) => (
              <button
                key={classCode}
                onClick={() => setSelectedClass(classCode)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedClass === classCode
                    ? 'border-[#0058A3] bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-[#0058A3] hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{classCode}</p>
                    <p className="text-xs text-gray-600">
                      {classCode === 'AC1' && 'First Class AC'}
                      {classCode === 'AC2' && 'AC 2 Tier'}
                      {classCode === 'AC3' && 'AC 3 Tier'}
                      {classCode === 'SL' && 'Sleeper Class'}
                      {classCode === '2S' && 'Second Sitting'}
                      {classCode === 'CC' && 'Chair Car'}
                    </p>
                  </div>
                  {selectedClass === classCode && (
                    <div className="w-5 h-5 bg-[#0058A3] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex items-baseline space-x-1 mb-1">
                  <IndianRupee className="h-4 w-4 text-gray-700" />
                  <span className="text-xl font-bold text-gray-900">{details.price}</span>
                </div>
                {details.available > 0 ? (
                  <Badge className="bg-green-100 text-green-800 text-xs hover:bg-green-100">
                    {details.available} seats available
                  </Badge>
                ) : details.waitlist ? (
                  <Badge className="bg-orange-100 text-orange-800 text-xs hover:bg-orange-100">
                    WL {details.waitlist}
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800 text-xs hover:bg-red-100">
                    Sold Out
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Book Now Button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleBooking}
            disabled={!selectedClass}
            className="flex-1 h-12 bg-gradient-to-r from-[#fd7e14] to-[#ff6b35] hover:from-[#e36d03] hover:to-[#e55a2b] text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedClass ? `Book ${selectedClass} Ticket` : 'Select a class to book'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
          {selectedClass && (
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm">
              <span className="text-gray-600">Total:</span>
              <span className="text-2xl font-bold text-gray-900 flex items-center">
                <IndianRupee className="h-5 w-5" />
                {train.classes[selectedClass].price}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
