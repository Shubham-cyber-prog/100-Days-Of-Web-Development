import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Train, Calendar, MapPin, Users, IndianRupee, Download, Eye } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { getStationName } from '../utils/mockData';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function BookingHistory() {
  const { bookings, isLoggedIn } = useUser();
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const handleDownloadTicket = (pnr: string) => {
    // Mock download - in real app, this would generate PDF
    const element = document.createElement('a');
    const file = new Blob(
      [
        `IRCTC E-TICKET
PNR: ${pnr}
This is a mock ticket for demonstration.
Thank you for using IRCTC!`,
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = `ticket-${pnr}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!isLoggedIn) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Login Required</h3>
          <p className="text-gray-600">Please login to view your booking history</p>
        </CardContent>
      </Card>
    );
  }

  if (bookings.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-12 text-center">
          <Train className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600">Your booking history will appear here</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white">
          <CardTitle className="flex items-center text-2xl">
            <Train className="mr-3 h-6 w-6" />
            My Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.pnr} className="border-2 hover:border-[#0058A3] transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h3 className="font-bold text-lg text-gray-900">{booking.train.name}</h3>
                        <Badge
                          className={
                            booking.status === 'CNF'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'RAC'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-orange-100 text-orange-800'
                          }
                        >
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>
                            {getStationName(booking.train.from)} → {getStationName(booking.train.to)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="h-4 w-4" />
                          <span>{booking.journeyDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Users className="h-4 w-4" />
                          <span>{booking.passengers.length} Passenger(s)</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <IndianRupee className="h-4 w-4" />
                          <span className="font-semibold">₹{booking.totalAmount}</span>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t">
                        <span className="text-xs text-gray-500">PNR: </span>
                        <span className="text-sm font-mono font-semibold text-[#0058A3]">
                          {booking.pnr}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBooking(booking)}
                        className="w-full md:w-auto"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleDownloadTicket(booking.pnr)}
                        className="w-full md:w-auto bg-[#0058A3] hover:bg-[#004080]"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="p-4 bg-[#0058A3] text-white rounded-lg">
                <div className="text-sm mb-1">PNR Number</div>
                <div className="text-2xl font-bold font-mono">{selectedBooking.pnr}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Train</div>
                  <div className="font-semibold">{selectedBooking.train.name}</div>
                  <div className="text-sm text-gray-500">#{selectedBooking.train.number}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Class</div>
                  <Badge>{selectedBooking.class}</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-gray-600 mb-2">Journey Details</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">From:</span>
                    <span className="font-semibold">{getStationName(selectedBooking.train.from)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-semibold">{getStationName(selectedBooking.train.to)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-semibold">{selectedBooking.journeyDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Departure:</span>
                    <span className="font-semibold">{selectedBooking.train.departure}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-gray-600 mb-2">Passengers</div>
                <div className="space-y-2">
                  {selectedBooking.passengers.map((passenger: any, index: number) => (
                    <div key={index} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{passenger.name}</span>
                      <span className="text-gray-600">
                        {passenger.age}Y, {passenger.gender}, {passenger.berth}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">₹{selectedBooking.totalAmount}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
