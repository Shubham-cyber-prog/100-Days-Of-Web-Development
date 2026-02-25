import { Play, Info } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  description: string;
  genres: string[];
}

export function HeroSection({ backgroundImage, title, description, genres }: HeroSectionProps) {
  return (
    <div className="relative h-[70vh] md:h-[85vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#141414]" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-4 md:px-12 max-w-2xl">
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl mb-4 md:mb-6" style={{ fontWeight: 700 }}>
          {title}
        </h1>
        
        <div className="flex gap-2 mb-4 text-sm md:text-base">
          {genres.map((genre) => (
            <span key={genre} className="text-white/90">{genre}</span>
          ))}
        </div>

        <p className="text-white text-sm md:text-lg mb-6 md:mb-8 line-clamp-3 md:line-clamp-4 leading-relaxed">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 md:gap-4">
          <button className="bg-white hover:bg-white/90 text-black px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-2 transition-colors text-base md:text-lg" style={{ fontWeight: 600 }}>
            <Play className="size-5 md:size-6 fill-black" />
            Play
          </button>
          <button className="bg-gray-500/70 hover:bg-gray-500/50 text-white px-6 md:px-8 py-2 md:py-3 rounded flex items-center gap-2 transition-colors text-base md:text-lg" style={{ fontWeight: 600 }}>
            <Info className="size-5 md:size-6" />
            More Info
          </button>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#141414] to-transparent" />
    </div>
  );
}
