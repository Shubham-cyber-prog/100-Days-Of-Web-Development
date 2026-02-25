import { X, Play, Plus, ThumbsUp, Volume2 } from 'lucide-react';
import { Movie } from './MovieCard';
import { motion, AnimatePresence } from 'motion/react';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  if (!movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          className="absolute inset-0 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div 
          className="relative bg-[#181818] rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-black text-white rounded-full p-2 transition-colors"
          >
            <X className="size-6" />
          </button>

          {/* Hero Image */}
          <div className="relative h-96">
            <img 
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />
            
            {/* Buttons on Image */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3">
              <button className="bg-white hover:bg-white/90 text-black px-8 py-3 rounded flex items-center gap-2 transition-colors text-lg" style={{ fontWeight: 600 }}>
                <Play className="size-6 fill-black" />
                Play
              </button>
              <button className="bg-gray-500/70 hover:bg-gray-500/50 text-white p-3 rounded-full transition-colors">
                <Plus className="size-6" />
              </button>
              <button className="bg-gray-500/70 hover:bg-gray-500/50 text-white p-3 rounded-full transition-colors">
                <ThumbsUp className="size-6" />
              </button>
              <button className="bg-gray-500/70 hover:bg-gray-500/50 text-white p-3 rounded-full transition-colors ml-auto">
                <Volume2 className="size-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-4 text-white">
                  <span className="text-green-500 text-lg" style={{ fontWeight: 600 }}>{movie.rating}% Match</span>
                  <span>{movie.year}</span>
                  <span className="border border-white/40 px-2 py-0.5 text-sm">HD</span>
                  <span>{movie.duration}</span>
                </div>

                <p className="text-white text-lg mb-6 leading-relaxed">
                  {movie.description}
                </p>
              </div>

              {/* Right Column */}
              <div className="text-sm">
                <div className="mb-4">
                  <span className="text-gray-400">Genres: </span>
                  <span className="text-white">{movie.genres.join(', ')}</span>
                </div>
                
                <div className="mb-4">
                  <span className="text-gray-400">Rating: </span>
                  <span className="text-white">TV-MA</span>
                </div>
              </div>
            </div>

            {/* Similar Titles Section */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <h3 className="text-white text-xl mb-6" style={{ fontWeight: 600 }}>
                More Like This
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#2F2F2F] rounded overflow-hidden">
                    <div className="h-32 bg-gray-700" />
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-green-500 text-sm" style={{ fontWeight: 600 }}>95% Match</span>
                        <span className="border border-white/40 px-1.5 py-0.5 text-xs text-white">HD</span>
                      </div>
                      <p className="text-white/70 text-sm line-clamp-3">
                        Similar content with exciting storylines and amazing visuals.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
