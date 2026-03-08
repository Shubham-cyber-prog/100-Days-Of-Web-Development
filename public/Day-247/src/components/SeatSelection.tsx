import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Armchair, Info } from 'lucide-react';
import { cn } from './ui/utils';

interface Seat {
  id: string;
  number: string;
  type: 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper';
  isAvailable: boolean;
  isSelected: boolean;
}

interface SeatSelectionProps {
  trainClass: string;
  totalPassengers: number;
  onSeatsSelected: (seats: string[]) => void;
}

export function SeatSelection({ trainClass, totalPassengers, onSeatsSelected }: SeatSelectionProps) {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate mock coach layout
  const generateCoachLayout = (): Seat[] => {
    const seats: Seat[] = [];
    const types: Seat['type'][] = ['Lower', 'Middle', 'Upper', 'Side Lower', 'Side Upper'];
    
    for (let i = 1; i <= 72; i++) {
      const typeIndex = (i - 1) % 8;
      let type: Seat['type'];
      
      if (typeIndex < 2) type = 'Lower';
      else if (typeIndex < 4) type = 'Middle';
      else if (typeIndex < 6) type = 'Upper';
      else if (typeIndex === 6) type = 'Side Lower';
      else type = 'Side Upper';
      
      seats.push({
        id: `seat-${i}`,
        number: i.toString(),
        type,
        isAvailable: Math.random() > 0.3, // 70% available
        isSelected: false,
      });
    }
    
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateCoachLayout());

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId);
    if (!seat || !seat.isAvailable) return;

    if (selectedSeats.includes(seatId)) {
      // Deselect
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
      setSeats(seats.map((s) => (s.id === seatId ? { ...s, isSelected: false } : s)));
    } else if (selectedSeats.length < totalPassengers) {
      // Select
      setSelectedSeats([...selectedSeats, seatId]);
      setSeats(seats.map((s) => (s.id === seatId ? { ...s, isSelected: true } : s)));
    }
  };

  const handleConfirm = () => {
    const seatNumbers = selectedSeats.map((id) => seats.find((s) => s.id === id)?.number || '');
    onSeatsSelected(seatNumbers);
  };

  const getSeatColor = (seat: Seat) => {
    if (seat.isSelected) return 'bg-[#0058A3] text-white border-[#0058A3]';
    if (!seat.isAvailable) return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    
    switch (seat.type) {
      case 'Lower':
        return 'bg-green-50 text-green-800 border-green-300 hover:bg-green-100';
      case 'Middle':
        return 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100';
      case 'Upper':
        return 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100';
      case 'Side Lower':
        return 'bg-yellow-50 text-yellow-800 border-yellow-300 hover:bg-yellow-100';
      case 'Side Upper':
        return 'bg-orange-50 text-orange-800 border-orange-300 hover:bg-orange-100';
    }
  };

  const getSeatIcon = (type: Seat['type']) => {
    switch (type) {
      case 'Lower':
        return 'LB';
      case 'Middle':
        return 'MB';
      case 'Upper':
        return 'UB';
      case 'Side Lower':
        return 'SL';
      case 'Side Upper':
        return 'SU';
    }
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-[#0058A3] to-[#003d73] text-white">
        <CardTitle className="flex items-center text-xl">
          <Armchair className="mr-2 h-5 w-5" />
          Select Seats ({selectedSeats.length}/{totalPassengers})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Legend */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2 mb-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-semibold text-sm text-gray-900 mb-2">Berth Types</div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-50 border border-green-300 rounded flex items-center justify-center text-green-800 font-semibold">
                    LB
                  </div>
                  <span>Lower</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-50 border border-blue-300 rounded flex items-center justify-center text-blue-800 font-semibold">
                    MB
                  </div>
                  <span>Middle</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-50 border border-purple-300 rounded flex items-center justify-center text-purple-800 font-semibold">
                    UB
                  </div>
                  <span>Upper</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-yellow-50 border border-yellow-300 rounded flex items-center justify-center text-yellow-800 font-semibold">
                    SL
                  </div>
                  <span>Side Lower</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-orange-50 border border-orange-300 rounded flex items-center justify-center text-orange-800 font-semibold">
                    SU
                  </div>
                  <span>Side Upper</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs mt-3 pt-3 border-t">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-[#0058A3] border rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 border rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white border rounded"></div>
              <span>Available</span>
            </div>
          </div>
        </div>

        {/* Coach Layout */}
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-700 mb-3">Coach A1 - {trainClass}</div>
          <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-9 gap-2">
              {seats.map((seat) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(seat.id)}
                  disabled={!seat.isAvailable}
                  className={cn(
                    'aspect-square rounded border-2 flex flex-col items-center justify-center text-xs font-semibold transition-all',
                    getSeatColor(seat),
                    seat.isAvailable && !seat.isSelected && 'cursor-pointer active:scale-95'
                  )}
                  title={`${seat.number} - ${seat.type} ${seat.isAvailable ? '(Available)' : '(Occupied)'}`}
                >
                  <div className="text-[10px] leading-none mb-0.5">{getSeatIcon(seat.type)}</div>
                  <div className="font-bold">{seat.number}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="font-semibold text-sm text-gray-900 mb-2">Selected Seats:</div>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seatId) => {
                const seat = seats.find((s) => s.id === seatId);
                return (
                  <Badge key={seatId} className="bg-[#0058A3]">
                    {seat?.number} ({getSeatIcon(seat!.type)})
                  </Badge>
                );
              })}
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleConfirm}
          disabled={selectedSeats.length !== totalPassengers}
          className="w-full bg-[#0058A3] hover:bg-[#004080]"
        >
          {selectedSeats.length === totalPassengers
            ? 'Confirm Seat Selection'
            : `Select ${totalPassengers - selectedSeats.length} more seat(s)`}
        </Button>
      </CardContent>
    </Card>
  );
}
