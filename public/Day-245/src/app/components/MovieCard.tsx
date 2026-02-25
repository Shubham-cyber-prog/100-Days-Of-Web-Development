import { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export interface Movie {
  id: number;
  title: string;
  image: string;
  rating: string;
  year: string;
  duration: string;
  description: string;
  genres: string[];
}

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export function MovieCard({ movie, onSelect }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-48 md:w-56 lg:w-64 cursor-pointer group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-md">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-36 md:h-40 object-cover"
        />
        
        {/* Hover Overlay */}
        {isHovered && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-2">
                <button 
                  className="bg-white hover:bg-white/90 text-black rounded-full p-2 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Play className="size-4 fill-black" />
                </button>
                <button className="bg-transparent border-2 border-white/50 hover:border-white text-white rounded-full p-2 transition-colors">
                  <Plus className="size-4" />
                </button>
                <button className="bg-transparent border-2 border-white/50 hover:border-white text-white rounded-full p-2 transition-colors">
                  <ThumbsUp className="size-4" />
                </button>
                <button 
                  className="bg-transparent border-2 border-white/50 hover:border-white text-white rounded-full p-2 transition-colors ml-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(movie);
                  }}
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>

              {/* Movie Info */}
              <div className="text-white">
                <div className="text-sm mb-1" style={{ fontWeight: 600 }}>{movie.title}</div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-green-500">{movie.rating}% Match</span>
                  <span className="border border-white/40 px-1">{movie.year}</span>
                  <span>{movie.duration}</span>
                </div>
                <div className="flex gap-1 mt-1 text-xs text-white/70">
                  {movie.genres.slice(0, 3).map((genre, i) => (
                    <span key={genre}>
                      {genre}{i < Math.min(movie.genres.length - 1, 2) ? ' •' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
