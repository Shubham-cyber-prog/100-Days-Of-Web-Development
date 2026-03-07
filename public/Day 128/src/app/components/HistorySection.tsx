import { History as HistoryIcon, Clock, Tag } from 'lucide-react';
import { motion } from 'motion/react';

interface HistoryItem {
  id: string;
  timestamp: string;
  labels: string[];
  thumbnailUrl: string;
}

interface HistorySectionProps {
  items: HistoryItem[];
}

export function HistorySection({ items }: HistorySectionProps) {
  if (items.length === 0) {
    return (
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <HistoryIcon className="w-6 h-6 text-cyan-400" />
          </div>
          Analysis History
        </h2>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full mb-4">
            <HistoryIcon className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-gray-400 text-lg">No history yet</p>
          <p className="text-gray-500 text-sm mt-2">Your analyzed images will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
          <HistoryIcon className="w-6 h-6 text-cyan-400" />
        </div>
        Analysis History
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 cursor-pointer group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={item.thumbnailUrl}
                alt={`Analysis ${item.id}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <Clock className="w-3 h-3" />
                <span>{item.timestamp}</span>
              </div>

              <div className="flex items-start gap-2">
                <Tag className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div className="flex flex-wrap gap-2">
                  {item.labels.map((label, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg border border-cyan-500/30"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
