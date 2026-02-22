import { Sparkles, Box, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface Detection {
  label: string;
  confidence: number;
  color: string;
}

interface ResultsPanelProps {
  imageUrl: string | null;
  detections: Detection[];
  isProcessing: boolean;
}

export function ResultsPanel({ imageUrl, detections, isProcessing }: ResultsPanelProps) {
  if (!imageUrl && !isProcessing) {
    return (
      <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </div>
          Detection Results
        </h2>

        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-full mb-4">
            <Box className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-gray-400 text-lg">No image analyzed yet</p>
          <p className="text-gray-500 text-sm mt-2">Upload an image or start camera detection</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
          <Sparkles className="w-6 h-6 text-cyan-400" />
        </div>
        Detection Results
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Image Preview with Bounding Boxes */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400">Image Preview</h3>
          <div className="relative bg-black rounded-xl overflow-hidden border border-purple-500/20">
            {isProcessing ? (
              <div className="aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-cyan-400">Processing with AI...</p>
                </div>
              </div>
            ) : (
              imageUrl && (
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt="Analyzed"
                    className="w-full h-auto"
                  />
                  {/* Simulated Bounding Boxes */}
                  {detections.slice(0, 3).map((detection, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className={`absolute border-2 rounded-lg`}
                      style={{
                        borderColor: detection.color,
                        top: `${15 + index * 20}%`,
                        left: `${10 + index * 15}%`,
                        width: `${40 - index * 5}%`,
                        height: `${35 - index * 5}%`,
                      }}
                    >
                      <div
                        className="absolute -top-6 left-0 px-2 py-1 rounded text-xs font-medium text-white"
                        style={{ backgroundColor: detection.color }}
                      >
                        {detection.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>

        {/* Detection List */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Detected Objects
          </h3>

          {isProcessing ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-purple-500/5 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {detections.map((detection, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-4 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: detection.color }}
                      />
                      <span className="font-semibold text-white">
                        {detection.label}
                      </span>
                    </div>
                    <span className="text-cyan-400 font-bold">
                      {(detection.confidence * 100).toFixed(1)}%
                    </span>
                  </div>

                  {/* Confidence Bar */}
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${detection.confidence * 100}%` }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${detection.color}, ${detection.color}dd)`,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
