import { Card, CardContent } from './ui/card';
import { 
  Receipt, 
  Train, 
  Clock, 
  MapPin, 
  UtensilsCrossed,
  Search,
  Calendar,
  Ticket
} from 'lucide-react';

interface QuickAccessCardsProps {
  onCardClick: (feature: string) => void;
}

export function QuickAccessCards({ onCardClick }: QuickAccessCardsProps) {
  const quickAccessItems = [
    {
      icon: Receipt,
      title: 'Check PNR',
      description: 'Track your booking status',
      color: 'bg-blue-50 text-blue-600',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      icon: Train,
      title: 'Train Schedule',
      description: 'View train timings',
      color: 'bg-green-50 text-green-600',
      hoverColor: 'hover:bg-green-100'
    },
    {
      icon: Clock,
      title: 'Tatkal Booking',
      description: 'Emergency bookings',
      color: 'bg-orange-50 text-orange-600',
      hoverColor: 'hover:bg-orange-100'
    },
    {
      icon: MapPin,
      title: 'Tourism Packages',
      description: 'Explore destinations',
      color: 'bg-purple-50 text-purple-600',
      hoverColor: 'hover:bg-purple-100'
    },
    {
      icon: UtensilsCrossed,
      title: 'Book Meals',
      description: 'Order food on train',
      color: 'bg-red-50 text-red-600',
      hoverColor: 'hover:bg-red-100'
    },
    {
      icon: Search,
      title: 'Live Train Status',
      description: 'Real-time tracking',
      color: 'bg-indigo-50 text-indigo-600',
      hoverColor: 'hover:bg-indigo-100'
    },
    {
      icon: Calendar,
      title: 'Seat Availability',
      description: 'Check available seats',
      color: 'bg-teal-50 text-teal-600',
      hoverColor: 'hover:bg-teal-100'
    },
    {
      icon: Ticket,
      title: 'Cancel Ticket',
      description: 'Manage bookings',
      color: 'bg-gray-50 text-gray-600',
      hoverColor: 'hover:bg-gray-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access all IRCTC services quickly with our convenient shortcuts
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {quickAccessItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index} 
                className={`${item.hoverColor} transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 shadow-md`}
                onClick={() => onCardClick(item.title)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}