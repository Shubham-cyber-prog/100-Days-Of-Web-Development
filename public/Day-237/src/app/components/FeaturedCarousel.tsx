import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, MapPin, Star } from "lucide-react";
import { Button } from "./ui/button";

interface Turf {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  hasOffer?: boolean;
  sports: string[];
}

interface FeaturedCarouselProps {
  turfs: Turf[];
}

export function FeaturedCarousel({ turfs }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % turfs.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [turfs.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + turfs.length) % turfs.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % turfs.length);
  };

  if (turfs.length === 0) return null;

  const currentTurf = turfs[currentIndex];

  return (
    <div className="relative mb-8 rounded-[14px] overflow-hidden h-[400px] group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${currentTurf.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl">
          <div className="inline-block mb-4">
            <span className="bg-[#00E676] text-[#121212] px-4 py-2 rounded-full font-bold text-sm neon-glow">
              🔥 SPECIAL OFFER
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-glow">
            {currentTurf.name}
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2 text-[#BDBDBD]">
              <MapPin className="h-5 w-5 text-[#00E676]" />
              <span>{currentTurf.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#BDBDBD]">
              <Star className="h-5 w-5 text-[#00E676] fill-[#00E676]" />
              <span>{currentTurf.rating}</span>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {currentTurf.sports.map((sport) => (
              <span
                key={sport}
                className="bg-[#1E1E1E] text-white px-3 py-1 rounded-full text-sm border border-[#1B5E20]"
              >
                {sport}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to={`/turf/${currentTurf.id}`}>
              <Button className="bg-[#00E676] text-[#121212] hover:bg-[#00E676]/90 neon-glow-hover font-semibold px-8">
                Book Now - ₹{currentTurf.price}/hr
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={goToPrevious}
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        onClick={goToNext}
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#1E1E1E]/80 hover:bg-[#1E1E1E] text-white opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {turfs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-[#00E676] neon-glow"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
