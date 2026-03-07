import { useState } from "react";
import { MapPin, Edit, Calendar, Star, Shield, Clock, Power } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useTurfs } from "../context/TurfContext";

export function MyTurfs() {
  const { turfs, updateTurf } = useTurfs();

  const handleToggleStatus = (turfId: number, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateTurf(turfId, { status: newStatus });
  };

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">My Turfs</h2>
        <p className="text-[#BDBDBD] text-sm sm:text-base">Manage all your registered turfs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {turfs.map((turf) => (
          <div
            key={turf.id}
            className="bg-[#1E1E1E] rounded-[14px] overflow-hidden card-elevation hover:border-[#00E676] border-2 border-transparent transition-all group"
          >
            {/* Image */}
            <div className="relative h-40 sm:h-48 overflow-hidden">
              <img
                src={turf.image}
                alt={turf.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              {/* Status Badge */}
              <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                <Badge className="bg-[#00E676] text-[#121212] neon-glow text-xs">
                  {turf.status}
                </Badge>
              </div>

              {/* Rating */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-[#00E676] text-[#00E676]" />
                <span className="text-white font-semibold text-xs sm:text-sm">{turf.rating}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-4 space-y-2.5 sm:space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-[#00E676] transition-colors line-clamp-1">
                  {turf.name}
                </h3>
                <div className="flex items-center gap-2 text-[#BDBDBD] text-xs sm:text-sm">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#00E676] flex-shrink-0" />
                  <span className="truncate">{turf.location}</span>
                </div>
              </div>

              {/* Sports Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {turf.sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-2 py-0.5 sm:py-1 bg-[#121212] text-[#BDBDBD] text-xs rounded-full border border-[#1B5E20]"
                  >
                    {sport}
                  </span>
                ))}
                <span
                  className={`px-2 py-0.5 sm:py-1 text-xs rounded-full ${
                    turf.covered
                      ? "bg-[#00E676]/20 text-[#00E676]"
                      : "bg-[#BDBDBD]/20 text-[#BDBDBD]"
                  }`}
                >
                  {turf.covered ? "Covered" : "Open"}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-2 border-t border-[#1B5E20]">
                <div>
                  <p className="text-[#BDBDBD] text-xs">Total Bookings</p>
                  <p className="text-white font-bold text-sm sm:text-base">{turf.totalBookings}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#BDBDBD] text-xs">Price/Hour</p>
                  <p className="text-[#00E676] font-bold text-base sm:text-lg">₹{turf.price}</p>
                </div>
              </div>

              {/* Visibility Toggle */}
              <div className="pt-2 border-t border-[#1B5E20]">
                <div className="flex items-center justify-between">
                  <span className="text-[#BDBDBD] text-xs sm:text-sm">Visibility to Players</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`text-xs ${
                      turf.status === "Active"
                        ? "border-[#00E676] text-[#00E676] hover:bg-[#00E676]/10"
                        : "border-red-500 text-red-500 hover:bg-red-500/10"
                    }`}
                    onClick={() => handleToggleStatus(turf.id, turf.status || "Active")}
                  >
                    <Power className="w-3 h-3 mr-1" />
                    {turf.status === "Active" ? "Active" : "Inactive"}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-[#1B5E20] text-black hover:border-[#00E676] hover:text-[#121212] text-xs sm:text-sm py-1.5 sm:py-2"
                >
                  <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Edit
                </Button>
                <Button className="flex-1 bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 text-xs sm:text-sm py-1.5 sm:py-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  View Slots
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}