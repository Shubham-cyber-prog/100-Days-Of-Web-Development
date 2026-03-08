import { Cpu, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ModelOption {
  id: string;
  name: string;
  description: string;
  accuracy: number;
  speed: string;
  size: string;
  color: string;
}

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const models: ModelOption[] = [
    {
      id: 'coco-ssd',
      name: 'COCO-SSD',
      description: 'General object detection with 90 categories',
      accuracy: 89,
      speed: 'Fast',
      size: '25MB',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      id: 'mobilenet-v2',
      name: 'MobileNet V2',
      description: 'Lightweight classification for mobile devices',
      accuracy: 85,
      speed: 'Very Fast',
      size: '14MB',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'efficientnet',
      name: 'EfficientNet',
      description: 'State-of-the-art accuracy with efficiency',
      accuracy: 94,
      speed: 'Medium',
      size: '42MB',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'yolo-v5',
      name: 'YOLO v5',
      description: 'Real-time object detection with high precision',
      accuracy: 92,
      speed: 'Fast',
      size: '38MB',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="bg-black/20 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-lg">
          <Cpu className="w-6 h-6 text-cyan-400" />
        </div>
        AI Model Selection
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {models.map((model, index) => {
          const isSelected = selectedModel === model.id;
          return (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onModelChange(model.id)}
              className={`relative p-5 rounded-xl transition-all duration-300 text-left overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 scale-[1.02]'
                  : 'bg-gradient-to-br from-purple-500/5 to-cyan-500/5 border border-purple-500/20 hover:border-purple-500/40 hover:scale-[1.01]'
              }`}
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-5`}
              />

              {/* Content */}
              <div className="relative">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">
                      {model.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{model.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="p-1.5 bg-cyan-400 rounded-full"
                    >
                      <Check className="w-4 h-4 text-black" />
                    </motion.div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-gray-400 text-xs mb-1">Accuracy</p>
                    <p className="text-white font-bold">{model.accuracy}%</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-gray-400 text-xs mb-1">Speed</p>
                    <p className="text-white font-bold">{model.speed}</p>
                  </div>
                  <div className="bg-black/40 rounded-lg p-2">
                    <p className="text-gray-400 text-xs mb-1">Size</p>
                    <p className="text-white font-bold">{model.size}</p>
                  </div>
                </div>

                {/* Accuracy Bar */}
                <div className="mt-4">
                  <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${model.accuracy}%` }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                      className={`h-full bg-gradient-to-r ${model.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>

              {/* Selected Indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${model.color}`}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl">
        <p className="text-sm text-gray-300">
          <span className="font-semibold text-cyan-400">Pro Tip:</span> Choose
          MobileNet for mobile devices, COCO-SSD for general use, or EfficientNet
          for maximum accuracy. YOLO v5 is ideal for real-time video detection.
        </p>
      </div>
    </div>
  );
}
