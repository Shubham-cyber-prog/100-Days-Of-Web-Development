import { Progress } from './ui/progress';
import { motion } from 'motion/react';

interface ModelLoadingProps {
  progress: number;
}

export function ModelLoading({ progress }: ModelLoadingProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8"
        >
          <div className="text-center mb-6">
            <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading AI Model</h2>
            <p className="text-gray-400">Initializing TensorFlow.js neural network...</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-cyan-400 font-bold">{Math.round(progress)}%</span>
            </div>

            <Progress value={progress} className="h-2" />

            <div className="flex items-center justify-center gap-1 mt-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: ['8px', '24px', '8px'],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  className="w-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
