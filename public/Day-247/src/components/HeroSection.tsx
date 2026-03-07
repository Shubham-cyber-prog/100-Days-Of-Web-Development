import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { CalendarIcon, ArrowLeftRight, Search, MapPin, Clock, Train, Zap, Shield } from 'lucide-react';

interface HeroSectionProps {
  onSearch: (from: string, to: string, date: string, trainClass: string) => void;
}

export function HeroSection({ onSearch }: HeroSectionProps) {
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [date, setDate] = useState('');
  const [trainClass, setTrainClass] = useState('');

  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  const handleSearch = () => {
    if (fromStation && toStation) {
      onSearch(fromStation, toStation, date, trainClass);
    }
  };

  const handleRecentSearch = (from: string, to: string, searchDate: string) => {
    setFromStation(from);
    setToStation(to);
    setDate(searchDate);
    onSearch(from, to, searchDate, trainClass);
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const recentSearches = [
    { from: 'New Delhi', to: 'Mumbai Central', date: '2026-03-15' },
    { from: 'Bangalore', to: 'Chennai Central', date: '2026-03-20' },
    { from: 'Kolkata', to: 'New Delhi', date: '2026-03-25' }
  ];

  const railwayStats = [
    { icon: Train, number: '12,000+', label: 'Daily Trains' },
    { icon: MapPin, number: '7,000+', label: 'Stations' },
    { icon: Zap, number: '2M+', label: 'Daily Bookings' },
    { icon: Shield, number: '25+', label: 'Years of Trust' }
  ];

  return (
    <section className="relative min-h-[80vh] overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Main Railway Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0058A3]/90 via-[#0058A3]/80 to-[#0058A3]/90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`
          }}
        ></div>
        
        {/* Animated Railway Track Lines */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent"></div>
        <div className="absolute bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange-400/40 to-transparent"></div>
        
        {/* Floating Railway Elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Train className="h-32 w-32 text-white animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Train className="h-24 w-24 text-white animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Enhanced Header with Railway Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-white/30">
            <Train className="h-5 w-5 text-orange-300 mr-2" />
            <span className="text-white/90 font-medium">Official Indian Railways Booking Platform</span>
            <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Journey Across
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-300 to-yellow-200 bg-clip-text text-transparent">
              Incredible India
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Experience seamless train booking with India's most trusted railway reservation system. 
            Fast, secure, and reliable - connecting every corner of the nation.
          </p>

          {/* Railway Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {railwayStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <IconComponent className="h-8 w-8 text-orange-300 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Booking Form */}
        <Card className="max-w-5xl mx-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600">Live Booking System</span>
              </div>
              <h3 className="text-center text-lg font-semibold text-gray-800">Book Your Train Journey</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
              {/* From Station */}
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                  From Station
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter departure city or station"
                    value={fromStation}
                    onChange={(e) => setFromStation(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-300 focus:border-[#0058A3] focus:ring-[#0058A3]"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center lg:col-span-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSwapStations}
                  className="p-3 h-12 w-12 rounded-full hover:bg-blue-50 border border-gray-200 bg-white"
                >
                  <ArrowLeftRight className="h-5 w-5 text-[#0058A3]" />
                </Button>
              </div>

              {/* To Station */}
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                  To Station
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter destination city or station"
                    value={toStation}
                    onChange={(e) => setToStation(e.target.value)}
                    className="pl-10 h-12 bg-white border-gray-300 focus:border-[#0058A3] focus:ring-[#0058A3]"
                  />
                </div>
              </div>

              {/* Date Picker */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1 text-gray-500" />
                  Journey Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={today}
                    className="pl-10 h-12 bg-white border-gray-300 focus:border-[#0058A3] focus:ring-[#0058A3]"
                  />
                </div>
              </div>
            </div>

            {/* Class Selection Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Travel Class</label>
                <Select value={trainClass} onValueChange={setTrainClass}>
                  <SelectTrigger className="h-12 bg-white border-gray-300 focus:border-[#0058A3]">
                    <SelectValue placeholder="Choose your preferred class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AC1">AC First Class (1A) - Premium</SelectItem>
                    <SelectItem value="AC2">AC 2 Tier (2A) - Comfort</SelectItem>
                    <SelectItem value="AC3">AC 3 Tier (3A) - Popular</SelectItem>
                    <SelectItem value="SL">Sleeper (SL) - Economic</SelectItem>
                    <SelectItem value="2S">Second Sitting (2S) - Budget</SelectItem>
                    <SelectItem value="CC">Chair Car (CC) - Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-[#fd7e14] to-[#ff6b35] hover:from-[#e36d03] hover:to-[#e55a2b] text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  size="lg"
                  onClick={handleSearch}
                >
                  <Search className="mr-2 h-5 w-5" />
                  Find Trains
                  <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity rounded-md"></div>
                </Button>
              </div>
            </div>

            {/* Quick Features */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Instant Confirmation
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                Secure Payment
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                24/7 Support
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                Mobile Tickets
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Recent Searches */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-white/90 font-medium mb-2">Recent Popular Routes</p>
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentSearches.map((search, index) => (
              <Card 
                key={index} 
                className="bg-white/15 backdrop-blur-sm border-white/30 hover:bg-white/25 transition-all duration-300 cursor-pointer group"
                onClick={() => handleRecentSearch(search.from, search.to, search.date)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 text-white mb-2 group-hover:text-orange-200 transition-colors">
                    <span className="text-sm font-medium">{search.from}</span>
                    <div className="flex items-center">
                      <div className="w-8 border-t border-white/60"></div>
                      <Train className="h-4 w-4 mx-1" />
                      <div className="w-8 border-t border-white/60"></div>
                    </div>
                    <span className="text-sm font-medium">{search.to}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-white/80 text-xs">
                    <Clock className="h-3 w-3" />
                    <span>Journey on {search.date}</span>
                  </div>
                  <div className="mt-2 text-xs text-orange-200 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to book this route
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}