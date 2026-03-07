import { ArrowLeftRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface Detection {
  label: string;
  confidence: number;
  color: string;
}

interface ComparisonImage {
  id: string;
  url: string;
  detections: Detection[];
  timestamp: string;
}

interface ImageComparisonProps {
  images: ComparisonImage[];
  onClose: () => void;
}

export function ImageComparison({ images, onClose }: ImageComparisonProps) {
  const [selectedImages, setSelectedImages] = useState<ComparisonImage[]>(
    images.slice(0, 2)
  );

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-black/60 backdrop-blur-xl border-b border-purple-500/20 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
              <ArrowLeftRight className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Image Comparison</h2>
              <p className="text-gray-400 text-sm">
                Compare detection results side-by-side
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-red-400" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {selectedImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-video bg-black">
                  <img
                    src={image.url}
                    alt={`Comparison ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
                    <span className="text-cyan-400 font-bold">Image {index + 1}</span>
                  </div>
                </div>

                {/* Detections */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold">
                      {image.detections.length} Objects Detected
                    </span>
                    <span className="text-gray-400 text-xs">{image.timestamp}</span>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {image.detections.map((detection, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-black/40 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: detection.color }}
                          />
                          <span className="text-gray-300 text-sm">
                            {detection.label}
                          </span>
                        </div>
                        <span className="text-cyan-400 font-medium text-sm">
                          {(detection.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Common Objects</p>
              <p className="text-2xl font-bold text-cyan-400">
                {selectedImages.length === 2
                  ? selectedImages[0].detections.filter(d1 =>
                      selectedImages[1].detections.some(d2 => d2.label === d1.label)
                    ).length
                  : 0}
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Avg Confidence</p>
              <p className="text-2xl font-bold text-purple-400">
                {selectedImages.length > 0
                  ? (
                      (selectedImages.reduce(
                        (sum, img) =>
                          sum +
                          img.detections.reduce(
                            (dSum, d) => dSum + d.confidence,
                            0
                          ) /
                            img.detections.length,
                        0
                      ) /
                        selectedImages.length) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 border border-pink-500/20 rounded-xl p-4">
              <p className="text-gray-400 text-sm mb-1">Total Objects</p>
              <p className="text-2xl font-bold text-pink-400">
                {selectedImages.reduce((sum, img) => sum + img.detections.length, 0)}
              </p>
            </div>
          </div>

          {/* Image Selector */}
          {images.length > 2 && (
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">
                Select images to compare
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                {images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      if (selectedImages.find(img => img.id === image.id)) {
                        setSelectedImages(
                          selectedImages.filter(img => img.id !== image.id)
                        );
                      } else if (selectedImages.length < 2) {
                        setSelectedImages([...selectedImages, image]);
                      }
                    }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImages.find(img => img.id === image.id)
                        ? 'border-cyan-400 scale-95'
                        : 'border-purple-500/20 hover:border-purple-400/50'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    {selectedImages.find(img => img.id === image.id) && (
                      <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                        <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center text-black font-bold">
                          ✓
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
