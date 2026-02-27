import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Train, MapPin, Clock, Radio, AlertCircle } from 'lucide-react';
import { getLiveTrainStatus, mockTrains } from '../utils/mockData';

export function LiveTrainTracker() {
  const [trainNumber, setTrainNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = () => {
    setError('');
    setResult(null);

    if (!trainNumber || trainNumber.length < 5) {
      setError('Please enter a valid train number');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const status = getLiveTrainStatus(trainNumber);
      if (status) {
        setResult(status);
      } else {
        setError('Train not found. Please check the number and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const quickTrackTrain = (number: string) => {
    setTrainNumber(number);
    setTimeout(() => {
      const status = getLiveTrainStatus(number);
      if (status) {
        setResult(status);
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
          <CardTitle className="flex items-center text-2xl">
            <Radio className="mr-3 h-6 w-6 animate-pulse" />
            Live Train Tracking
          </CardTitle>
          <p className="text-green-100 text-sm">Get real-time updates on train location and status</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* Train Number Input */}
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Enter train number (e.g., 12301)"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value.replace(/\D/g, ''))}
              className="h-12 text-lg"
              maxLength={5}
            />
            <Button
              onClick={handleTrack}
              disabled={loading || !trainNumber}
              className="h-12 px-8 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Tracking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Track
                </>
              )}
            </Button>
          </div>

          {/* Quick Access Trains */}
          {!result && !error && (
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick Track Popular Trains:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {mockTrains.slice(0, 4).map((train) => (
                  <Button
                    key={train.number}
                    variant="outline"
                    size="sm"
                    onClick={() => quickTrackTrain(train.number)}
                    className="text-xs"
                  >
                    {train.number}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Live Status Result */}
          {result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Status Header */}
              <div className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full blur-3xl"></div>
                <div className="relative p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center animate-pulse">
                        <Train className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{result.trainName}</h3>
                        <p className="text-sm text-gray-600">Train #{result.trainNumber}</p>
                      </div>
                    </div>
                    <Badge
                      className={
                        result.status === 'On Time'
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : result.status === 'Delayed'
                          ? 'bg-orange-100 text-orange-800 hover:bg-orange-100'
                          : 'bg-red-100 text-red-800 hover:bg-red-100'
                      }
                    >
                      {result.status}
                    </Badge>
                  </div>

                  {/* Live Indicator */}
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                      <span>Live Tracking</span>
                    </div>
                    <span>•</span>
                    <span>Updated: {result.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Current Location */}
              <Card className="border-2 border-blue-100">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    Current Location
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Current Station</p>
                          <p className="text-lg font-bold text-gray-900">{result.currentStation}</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600">Next Station</p>
                          <p className="text-lg font-bold text-gray-900">{result.nextStation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-xs text-gray-600 mb-1">Platform Number</p>
                        <p className="text-2xl font-bold text-gray-900">{result.platform}</p>
                      </div>
                      <div className={`p-4 rounded-lg ${result.delay > 0 ? 'bg-orange-50' : 'bg-green-50'}`}>
                        <p className="text-xs text-gray-600 mb-1">Running Status</p>
                        <p className={`text-2xl font-bold ${result.delay > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {result.delay === 0 ? 'On Time' : `${result.delay} min delay`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Journey Progress */}
              <Card className="border-2 border-purple-100">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-purple-600" />
                    Journey Progress
                  </h4>
                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                          style={{ width: '65%' }}
                        ></div>
                      </div>
                      <div className="absolute top-0 left-[65%] transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="font-semibold text-gray-900">{result.currentStation}</p>
                        <p className="text-xs text-gray-600">Started</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">65% Complete</p>
                        <p className="text-xs text-gray-600">En Route</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">Destination</p>
                        <p className="text-xs text-gray-600">Arriving Soon</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleTrack}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Radio className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
                <Button variant="outline" className="flex-1">
                  Set Arrival Alert
                </Button>
              </div>

              {/* Info Message */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> Train status is updated every 10 minutes. For the most accurate information,
                  please refresh the status regularly.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
