import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom green marker for turf locations
const greenIcon = L.icon({
  iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIuNSAwQzUuNjA2IDAgMCA1LjYwNiAwIDEyLjVjMCAxMC40MzggMTIuNSAyOC41IDEyLjUgMjguNVMyNSAyMi45MzggMjUgMTIuNUMyNSA1LjYwNiAxOS4zOTQgMCAxMi41IDB6IiBmaWxsPSIjMDBFNjc2IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48Y2lyY2xlIGN4PSIxMi41IiBjeT0iMTIuNSIgcj0iNSIgZmlsbD0iIzEyMTIxMiIvPjwvc3ZnPg==",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface LeafletMapProps {
  lat: number;
  lng: number;
  locationName: string;
  height?: string;
  zoom?: number;
}

export function LeafletMap({ 
  lat, 
  lng, 
  locationName, 
  height = "256px",
  zoom = 13 
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map only once
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // Add OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstanceRef.current);

      // Add marker
      const marker = L.marker([lat, lng], { icon: greenIcon }).addTo(mapInstanceRef.current);
      marker.bindPopup(`<div class="text-sm font-semibold">${locationName}</div>`);
    } else {
      // Update map center if coordinates change
      mapInstanceRef.current.setView([lat, lng], zoom);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, locationName, zoom]);

  return (
    <div 
      ref={mapRef} 
      className="relative rounded-lg overflow-hidden z-0" 
      style={{ height, width: "100%" }}
    />
  );
}
