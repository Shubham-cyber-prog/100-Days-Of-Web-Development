import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar as CalendarIcon, TrendingDown, TrendingUp, IndianRupee } from 'lucide-react';
import { cn } from './ui/utils';

interface FareCalendarProps {
  basePrice: number;
  onDateSelect: (date: string, price: number) => void;
}

export function FareCalendar({ basePrice, onDateSelect }: FareCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Generate dates for next 7 days with varying prices
  const generateFareDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Vary prices by ±20%
      const priceVariation = Math.random() * 0.4 - 0.2; // -20% to +20%
      const price = Math.round(basePrice * (1 + priceVariation));
      
      dates.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        price,
        priceChange: Math.round(price - basePrice),
      });
    }
    
    return dates;
  };

  const [fareDates] = useState(generateFareDates());
  const lowestPrice = Math.min(...fareDates.map((d) => d.price));

  const handleDateClick = (date: string, price: number) => {
    setSelectedDate(date);
    onDateSelect(date, price);
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center text-xl">
          <CalendarIcon className="mr-2 h-5 w-5" />
          Fare Calendar - Find Best Prices
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-sm">
            <TrendingDown className="h-4 w-4 text-green-600" />
            <span className="text-gray-700">
              Lowest fare: <span className="font-bold text-green-600">₹{lowestPrice}</span> on{' '}
              {fareDates.find((d) => d.price === lowestPrice)?.dayName},{' '}
              {fareDates.find((d) => d.price === lowestPrice)?.dayNumber}{' '}
              {fareDates.find((d) => d.price === lowestPrice)?.month}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {fareDates.map((fareDate) => {
            const isLowest = fareDate.price === lowestPrice;
            const isSelected = selectedDate === fareDate.date;
            
            return (
              <button
                key={fareDate.date}
                onClick={() => handleDateClick(fareDate.date, fareDate.price)}
                className={cn(
                  'p-4 rounded-lg border-2 transition-all hover:shadow-md active:scale-95',
                  isSelected
                    ? 'border-[#0058A3] bg-[#0058A3] text-white shadow-lg'
                    : isLowest
                    ? 'border-green-400 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                )}
              >
                <div className={cn('text-xs font-medium mb-1', isSelected ? 'text-white' : 'text-gray-600')}>
                  {fareDate.dayName}
                </div>
                <div
                  className={cn(
                    'text-2xl font-bold mb-2',
                    isSelected ? 'text-white' : isLowest ? 'text-green-700' : 'text-gray-900'
                  )}
                >
                  {fareDate.dayNumber}
                </div>
                <div className={cn('text-xs mb-1', isSelected ? 'text-blue-100' : 'text-gray-500')}>
                  {fareDate.month}
                </div>
                
                <div className="mt-3 pt-3 border-t border-current/20">
                  <div className="flex items-center justify-center space-x-1">
                    <IndianRupee className="h-3 w-3" />
                    <span className="font-bold text-sm">{fareDate.price}</span>
                  </div>
                  
                  {fareDate.priceChange !== 0 && (
                    <div
                      className={cn(
                        'flex items-center justify-center space-x-1 text-xs mt-1',
                        fareDate.priceChange > 0
                          ? isSelected
                            ? 'text-red-200'
                            : 'text-red-600'
                          : isSelected
                          ? 'text-green-200'
                          : 'text-green-600'
                      )}
                    >
                      {fareDate.priceChange > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      <span>
                        {fareDate.priceChange > 0 ? '+' : ''}
                        {fareDate.priceChange}
                      </span>
                    </div>
                  )}
                  
                  {isLowest && !isSelected && (
                    <Badge className="mt-2 bg-green-600 text-white text-[10px] px-1.5 py-0.5">
                      Best
                    </Badge>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
          <div className="flex items-start space-x-2">
            <CalendarIcon className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm">
              <div className="font-semibold text-gray-900 mb-1">💡 Pro Tips</div>
              <ul className="text-gray-700 space-y-1 text-xs">
                <li>• Prices are lower on weekdays (Mon-Thu)</li>
                <li>• Book 3-4 weeks in advance for best fares</li>
                <li>• Avoid peak travel days like Friday & Sunday</li>
              </ul>
            </div>
          </div>
        </div>

        {selectedDate && (
          <div className="mt-4">
            <Button
              onClick={() => {
                const selected = fareDates.find((d) => d.date === selectedDate);
                if (selected) {
                  alert(
                    `Selected: ${selected.dayName}, ${selected.dayNumber} ${selected.month} - ₹${selected.price}`
                  );
                }
              }}
              className="w-full bg-[#0058A3] hover:bg-[#004080]"
            >
              Continue with Selected Date
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
