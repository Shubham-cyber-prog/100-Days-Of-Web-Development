import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, AlertCircle, CheckCircle, Clock, MapPin, Train, Calendar, Users } from 'lucide-react';
import { getPNRStatus, getStationName } from '../utils/mockData';

export function PNRChecker() {
  const [pnr, setPnr] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    setError('');
    setResult(null);

    if (pnr.length !== 10) {
      setError('PNR must be 10 digits');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const status = getPNRStatus(pnr);
      if (status) {
        setResult(status);
      } else {
        setError('PNR not found. Please check the number and try again.');
      }
      setLoading(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CNF':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Confirmed</Badge>;
      case 'RAC':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">RAC</Badge>;
      case 'WL':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Waitlisted</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader className="bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white">
          <CardTitle className="flex items-center text-2xl">
            <Search className="mr-3 h-6 w-6" />
            Check PNR Status
          </CardTitle>
          <p className="text-blue-100 text-sm">Track your train booking status in real-time</p>
        </CardHeader>
        <CardContent className="p-6">
          {/* PNR Input */}
          <div className="flex gap-3 mb-6">
            <Input
              placeholder="Enter 10-digit PNR number"
              value={pnr}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 10) setPnr(value);
              }}
              className="h-12 text-lg"
              maxLength={10}
            />
            <Button
              onClick={handleCheck}
              disabled={loading || pnr.length !== 10}
              className="h-12 px-8 bg-[#0058A3] hover:bg-[#004080]"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Checking...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Check
                </>
              )}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* PNR Status Result */}
          {result && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Status Header */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">PNR Number</p>
                    <p className="text-2xl font-bold text-gray-900">{result.pnr}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Booking Status</p>
                  {getStatusBadge(result.status)}
                </div>
              </div>

              {/* Train Details */}
              <Card className="border-2 border-blue-100">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-[#0058A3] rounded-lg flex items-center justify-center">
                      <Train className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{result.train.name}</h3>
                      <p className="text-sm text-gray-600">Train #{result.train.number}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600">From</p>
                        <p className="font-semibold text-gray-900">{getStationName(result.train.from)}</p>
                        <p className="text-sm text-gray-600">{result.train.departure}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600">Duration</p>
                        <p className="font-semibold text-gray-900">{result.train.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-600">To</p>
                        <p className="font-semibold text-gray-900">{getStationName(result.train.to)}</p>
                        <p className="text-sm text-gray-600">{result.train.arrival}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Journey Date</p>
                        <p className="text-sm font-semibold">{result.journeyDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-600" />
                      <div>
                        <p className="text-xs text-gray-600">Class</p>
                        <p className="text-sm font-semibold">{result.class}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Passenger Details */}
              <Card className="border-2 border-green-100">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#0058A3]" />
                    Passenger Details ({result.passengers.length} Passenger{result.passengers.length > 1 ? 's' : ''})
                  </h4>
                  <div className="space-y-3">
                    {result.passengers.map((passenger: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-[#0058A3] rounded-full flex items-center justify-center text-white font-semibold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{passenger.name}</p>
                            <p className="text-sm text-gray-600">
                              {passenger.age} years • {passenger.gender} • {passenger.berth} Berth
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Booking Date</p>
                    <p className="text-lg font-bold text-gray-900">{result.bookingDate}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-bold text-gray-900">₹{result.totalAmount}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    {getStatusBadge(result.status)}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button className="flex-1 bg-[#0058A3] hover:bg-[#004080]">
                  Download Ticket
                </Button>
                <Button variant="outline" className="flex-1">
                  Share Status
                </Button>
              </div>
            </div>
          )}

          {/* Sample PNR */}
          {!result && !error && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Try a sample PNR:</strong> 2345678901
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
