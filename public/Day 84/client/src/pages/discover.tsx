import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, MessageCircle, Navigation, RefreshCw } from 'lucide-react';
import { useLocation } from 'wouter';

// --- Types ---
interface LocationData {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

interface NearbyRoom {
  id: string;
  name: string;
  interests: string[];
  distance: number;
  participants: number;
  city: string;
  country: string;
}

// --- Utils: Mock Data Generator (Pure Function) ---
const generateRooms = (loc: LocationData | null): NearbyRoom[] => {
  if (!loc) {
    // Fallback/Global rooms
    return [
      { id: 'global-1', name: 'Global Tech Community', interests: ['Technology', 'AI'], distance: 0, participants: 142, city: 'Virtual', country: 'Global' },
      { id: 'global-2', name: 'Digital Nomads', interests: ['Travel', 'Work'], distance: 0, participants: 85, city: 'Virtual', country: 'Global' }
    ];
  }

  const interestsList = ["Technology", "Business", "Marketing", "Design", "Finance", "Healthcare", "Education", "Engineering", "Research", "Sales"];
  const suffixes = ["Innovators", "Hub", "Connect", "Network", "Circle", "Guild", "Lounge"];

  return Array.from({ length: 8 }).map((_, i) => {
    const distance = Number((Math.random() * 15 + 0.5).toFixed(1));
    const randomInterests = interestsList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 2);
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    
    return {
      id: `room-${i}`,
      name: `${loc.city} ${suffix}`, // Dynamic naming based on location
      interests: randomInterests,
      distance,
      participants: Math.floor(Math.random() * 40) + 5,
      city: loc.city,
      country: loc.country
    };
  }).sort((a, b) => a.distance - b.distance);
};

// --- Custom Hook: Geolocation Logic ---
const useGeolocation = () => {
  const [status, setStatus] = useState<{
    loading: boolean;
    error: string | null;
    location: LocationData | null;
    permission: 'pending' | 'granted' | 'denied';
  }>({
    loading: true,
    error: null,
    location: null,
    permission: 'pending'
  });

  const fetchCityData = async (lat: number, lng: number) => {
    try {
      // NOTE: In production, move this API call to your backend to hide the API key
      const apiKey = import.meta.env?.VITE_OPENCAGE_KEY || 'demo'; 
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&limit=1`,
        { signal: controller.signal }
      );

      clearTimeout(timeoutId);

      // Check response status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Validate content type
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        throw new Error('Invalid response format');
      }

      const data = await response.json();

      let city = 'Unknown City';
      let country = 'Unknown Country';

      if (data.results?.length > 0) {
        const c = data.results[0].components;
        city = c.city || c.town || c.village || c.county || 'Local Area';
        country = c.country || 'Unknown';
      }

      return { city, country };
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("Geocoding error:", error.message);
      
      // Return default values on error
      return { city: 'Local Area', country: 'Determining...' };
    }
  };

  const requestLocation = useCallback(() => {
    setStatus(prev => ({ ...prev, loading: true, error: null }));

    if (!('geolocation' in navigator)) {
      setStatus({ 
        loading: false, 
        error: "Geolocation not supported on this browser", 
        location: null, 
        permission: 'denied' 
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const place = await fetchCityData(latitude, longitude);
          
          setStatus({
            loading: false,
            error: null,
            location: { lat: latitude, lng: longitude, ...place },
            permission: 'granted'
          });
        } catch (err) {
          console.error("Error processing location:", err);
          setStatus({
            loading: false,
            error: "Failed to process location data",
            location: null,
            permission: 'granted'
          });
        }
      },
      (error) => {
        let errorMsg = "Unable to retrieve location";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please enable location access in settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "Location request timed out. Please try again.";
        }
        
        setStatus({
          loading: false,
          error: errorMsg,
          location: null,
          permission: 'denied'
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Initial request on mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return { ...status, retry: requestLocation };
};

// --- Sub-Component: Room Card (Memoized) ---
const RoomCard = React.memo(({ room, onJoin }: { room: NearbyRoom, onJoin: (id: string) => void }) => (
  <Card className="hover:shadow-lg transition-all duration-200 group">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-start justify-between gap-2">
        <span className="text-base sm:text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
            {room.name}
        </span>
        <Badge variant="outline" className="flex-shrink-0 bg-white">
          <Users className="h-3 w-3 mr-1" />
          {room.participants}
        </Badge>
      </CardTitle>
      <div className="flex items-center text-xs sm:text-sm text-gray-500">
        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
        <span>{room.distance > 0 ? `${room.distance}km away` : 'Global'}</span>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex flex-wrap gap-1 mb-4 h-12 overflow-hidden content-start">
        {room.interests.slice(0, 3).map(interest => (
          <Badge key={interest} variant="secondary" className="text-xs">
            {interest}
          </Badge>
        ))}
        {room.interests.length > 3 && (
          <Badge variant="outline" className="text-xs">+{room.interests.length - 3}</Badge>
        )}
      </div>
      <Button onClick={() => onJoin(room.id)} size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
        <MessageCircle className="h-4 w-4 mr-2" /> Join
      </Button>
    </CardContent>
  </Card>
));
RoomCard.displayName = "RoomCard";

// --- Main Component ---
export default function Discover() {
  const [, setLocation] = useLocation();
  const { loading, location, permission, retry } = useGeolocation();
  
  // Memoize rooms so they don't regenerate on every interaction, only when location changes
  const rooms = useMemo(() => generateRooms(location), [location]);

  const handleJoin = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      localStorage.setItem('selectedRoom', JSON.stringify(room));
      setLocation('/chat');
    }
  };

  // --- Render Views ---

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Navigation className="h-10 w-10 mx-auto mb-4 text-blue-600 animate-spin" />
          <h2 className="text-lg font-semibold">Locating...</h2>
          <p className="text-sm text-gray-500">Finding communities near you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header / Permission Status */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${permission === 'granted' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                   {permission === 'granted' ? 'Nearby Rooms' : 'Global Rooms'}
                </h1>
                <p className="text-gray-500">
                  {permission === 'granted' 
                    ? `Showing active groups in ${location?.city}, ${location?.country}`
                    : 'Location access denied. Showing global communities.'}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              {permission === 'denied' && (
                <Button onClick={retry} variant="outline" className="flex-1 md:flex-none">
                  <RefreshCw className="h-4 w-4 mr-2" /> Retry Location
                </Button>
              )}
              <Button onClick={() => setLocation('/chat')} variant="secondary" className="flex-1 md:flex-none">
                 View All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Room Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} onJoin={handleJoin} />
          ))}
        </div>

        {/* Empty State (Unlikely with fallback, but good practice) */}
        {rooms.length === 0 && (
          <div className="text-center py-12 text-gray-500">
             <p>No active rooms found in this area.</p>
             <Button variant="link" onClick={() => setLocation('/chat')}>Create one?</Button>
          </div>
        )}
      </div>
    </div>
  );
}