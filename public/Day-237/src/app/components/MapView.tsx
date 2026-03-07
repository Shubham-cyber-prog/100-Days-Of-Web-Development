import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { MapPin, Navigation, Star, Clock } from "lucide-react";
import { Button } from "./ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Turf {
  id: number;
  name: string;
  location: string;
  distance: number;
  image: string;
  price: number;
  rating: number;
  isOpen: boolean;
  lat: number;
  lng: number;
  sports: string[];
}

interface MapViewProps {
  turfs: Turf[];
}

export function MapView({ turfs }: MapViewProps) {
  const [hoveredTurf, setHoveredTurf] = useState<number | null>(null);
  const [selectedTurf, setSelectedTurf] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<number, L.Marker>>(new Map());

  // Custom green marker icon
  const greenIcon = L.icon({
    iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNjA2IDAgMCA1LjYwNiAwIDEyLjVjMCAxMC40MzggMTIuNSAyOC41IDEyLjUgMjguNVMyNSAyMi45MzggMjUgMTIuNUMyNSA1LjYwNiAxOS4zOTQgMCAxMi41IDB6IiBmaWxsPSIjMDBFNjc2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNSIgZmlsbD0iIzEyMTIxMiIvPjwvc3ZnPg==",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const highlightedIcon = L.icon({
    iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDkiIHZpZXdCb3g9IjAgMCAzMCA0OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJnbG93Ij48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiByZXN1bHQ9ImNvbG9yZWRCbHVyIi8+PGZlTWVyZ2U+PGZlTWVyZ2VOb2RlIGluPSJjb2xvcmVkQmx1ciIvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PHBhdGggZD0iTTE1IDNDNy44MiAzIDIgOC44MiAyIDE2YzAgMTIuNTI1IDEzIDI5LjUgMTMgMjkuNVMyOCAyOC41MjUgMjggMTZjMC03LjE4LTUuODItMTMtMTMtMTN6IiBmaWxsPSIjMDBFNjc2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGZpbHRlcj0idXJsKCNnbG93KSIvPjxjaXJjbGUgY3g9IjE1IiBjeT0iMTYiIHI9IjYiIGZpbGw9IiMxMjEyMTIiLz48L3N2Zz4=",
    iconSize: [30, 49],
    iconAnchor: [15, 49],
    popupAnchor: [1, -40],
  });

  useEffect(() => {
    // Cleanup previous map
    if (mapRef.current) {
      mapRef.current.remove();
      markersRef.current.clear();
    }

    if (!turfs.length) return;

    // Initialize map
    const map = L.map("map", {
      center: [turfs[0].lat, turfs[0].lng],
      zoom: 13,
      zoomControl: false, // We'll use custom controls
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add markers for each turf
    turfs.forEach((turf) => {
      const marker = L.marker([turf.lat, turf.lng], { 
        icon: greenIcon 
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui;">
          <h4 style="color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 4px;">
            ${turf.name}
          </h4>
          <p style="color: #BDBDBD; font-size: 12px; margin-bottom: 8px;">
            ${turf.location}
          </p>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="color: #00E676; font-weight: bold; font-size: 14px;">
              ₹${turf.price}/hr
            </span>
            <a href="/turf/${turf.id}" style="display: inline-flex; align-items: center; justify-content: center; height: 28px; padding: 0 12px; border-radius: 6px; font-size: 12px; font-weight: 500; background: #00E676; color: #121212; text-decoration: none;">
              View
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: true,
      });

      // Store marker reference
      markersRef.current.set(turf.id, marker);

      // Marker interactions
      marker.on("mouseover", () => {
        setHoveredTurf(turf.id);
        marker.setIcon(highlightedIcon);
      });

      marker.on("mouseout", () => {
        if (selectedTurf !== turf.id) {
          setHoveredTurf(null);
          marker.setIcon(greenIcon);
        }
      });

      marker.on("click", () => {
        setSelectedTurf(turf.id);
        marker.openPopup();
      });
    });

    mapRef.current = map;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current.clear();
      }
    };
  }, [turfs]);

  // Update markers when hoveredTurf or selectedTurf changes
  useEffect(() => {
    markersRef.current.forEach((marker, turfId) => {
      if (turfId === hoveredTurf || turfId === selectedTurf) {
        marker.setIcon(highlightedIcon);
      } else {
        marker.setIcon(greenIcon);
      }
    });
  }, [hoveredTurf, selectedTurf]);

  return (
    <div className="bg-[#1E1E1E] rounded-[14px] overflow-hidden card-elevation h-[calc(100vh-300px)]">
      <div className="flex h-full">
        {/* Left Panel - Turf List */}
        <div className="w-96 bg-[#121212] border-r border-[#1B5E20] overflow-y-auto">
          <div className="p-4 border-b border-[#1B5E20] sticky top-0 bg-[#121212] z-10">
            <h3 className="text-white font-semibold text-lg">
              {turfs.length} Turfs Found
            </h3>
          </div>

          <div className="p-4 space-y-3">
            {turfs.map((turf) => (
              <div
                key={turf.id}
                onMouseEnter={() => setHoveredTurf(turf.id)}
                onMouseLeave={() => setHoveredTurf(null)}
                onClick={() => {
                  setSelectedTurf(turf.id);
                  // Center map on selected turf
                  if (mapRef.current) {
                    mapRef.current.setView([turf.lat, turf.lng], 15, {
                      animate: true,
                      duration: 0.5,
                    });
                    // Open the marker popup
                    const marker = markersRef.current.get(turf.id);
                    if (marker) {
                      marker.openPopup();
                    }
                  }
                }}
                className={`bg-[#1E1E1E] rounded-[14px] p-3 cursor-pointer transition-all border ${
                  hoveredTurf === turf.id || selectedTurf === turf.id
                    ? "border-[#00E676] neon-glow"
                    : "border-[#1B5E20]"
                }`}
              >
                <div className="flex gap-3">
                  <img
                    src={turf.image}
                    alt={turf.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-white font-semibold text-sm truncate">
                        {turf.name}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                          turf.isOpen
                            ? "bg-[#00E676]/20 text-[#00E676]"
                            : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {turf.isOpen ? "Open" : "Closed"}
                      </span>
                    </div>

                    <p className="text-[#BDBDBD] text-xs mb-2 truncate">
                      {turf.location}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1 text-[#BDBDBD]">
                          <Navigation className="h-3 w-3 text-[#00E676]" />
                          <span>{turf.distance} km</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#BDBDBD]">
                          <Star className="h-3 w-3 text-[#00E676] fill-[#00E676]" />
                          <span>{turf.rating}</span>
                        </div>
                      </div>
                      <span className="text-[#00E676] font-bold text-sm">
                        ₹{turf.price}/hr
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="flex-1 relative bg-[#1a1a1a]">
          {/* Leaflet Map Container */}
          <div
            id="map"
            className="absolute inset-0 w-full h-full z-0"
            style={{ background: '#1a1a1a' }}
          />

          {/* Zoom Controls */}
          <div className="absolute right-4 top-4 flex flex-col gap-2 z-[1000]">
            <Button
              size="icon"
              onClick={() => mapRef.current?.zoomIn()}
              className="bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 text-white border border-[#1B5E20]"
            >
              +
            </Button>
            <Button
              size="icon"
              onClick={() => mapRef.current?.zoomOut()}
              className="bg-[#1E1E1E] hover:bg-[#1E1E1E]/90 text-white border border-[#1B5E20]"
            >
              −
            </Button>
          </div>

          {/* Search This Area Button */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000]">
            <Button className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold shadow-lg">
              Search This Area
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}