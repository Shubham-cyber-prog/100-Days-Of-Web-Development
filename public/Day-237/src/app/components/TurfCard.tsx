import { Link } from "react-router";
import { Star, MapPin, Navigation, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface TurfCardProps {
  turf: {
    id: number;
    name: string;
    location: string;
    distance: number;
    image: string;
    price: number;
    sports: string[];
    rating: number;
    reviews: number;
    covered: boolean;
    open24x7: boolean;
    hasOffer?: boolean;
    amenities: string[];
    isOpen: boolean;
  };
}

export function TurfCard({ turf }: TurfCardProps) {
  return (
    <Link to={`/turf/${turf.id}`}>
      <div className="bg-[#1E1E1E] rounded-[14px] overflow-hidden card-elevation card-elevation-hover group cursor-pointer transition-all duration-300 hover:-translate-y-2">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={turf.image}
            alt={turf.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {turf.hasOffer && (
              <Badge className="bg-[#00E676] text-[#121212] font-semibold neon-glow">
                🔥 Offer
              </Badge>
            )}
            {turf.open24x7 && (
              <Badge className="bg-[#1B5E20] text-white border border-[#00E676]">
                24/7
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <Badge
              className={`${
                turf.isOpen
                  ? "bg-[#00E676]/90 text-[#121212]"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {turf.isOpen ? "Open" : "Closed"}
            </Badge>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <Star className="w-4 h-4 fill-[#00E676] text-[#00E676]" />
            <span className="text-white font-semibold">{turf.rating}</span>
            <span className="text-[#BDBDBD] text-sm">({turf.reviews})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#00E676] transition-colors">
              {turf.name}
            </h3>
            <div className="flex items-center gap-2 text-[#BDBDBD] text-sm">
              <MapPin className="w-4 h-4 text-[#00E676]" />
              <span>{turf.location}</span>
            </div>
          </div>

          {/* Sports Tags */}
          <div className="flex flex-wrap gap-2">
            {turf.sports.slice(0, 3).map((sport) => (
              <span
                key={sport}
                className="px-2 py-1 bg-[#121212] text-[#BDBDBD] text-xs rounded-full border border-[#1B5E20]"
              >
                {sport}
              </span>
            ))}
            {turf.sports.length > 3 && (
              <span className="px-2 py-1 bg-[#121212] text-[#00E676] text-xs rounded-full border border-[#00E676]">
                +{turf.sports.length - 3}
              </span>
            )}
          </div>

          {/* Info Row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1B5E20]">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-[#BDBDBD]">
                <Navigation className="w-4 h-4 text-[#00E676]" />
                <span>{turf.distance} km</span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    turf.covered
                      ? "bg-[#00E676]/20 text-[#00E676]"
                      : "bg-[#BDBDBD]/20 text-[#BDBDBD]"
                  }`}
                >
                  {turf.covered ? "Covered" : "Open"}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[#00E676] text-xl font-bold">₹{turf.price}</p>
              <p className="text-[#BDBDBD] text-xs">per hour</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
