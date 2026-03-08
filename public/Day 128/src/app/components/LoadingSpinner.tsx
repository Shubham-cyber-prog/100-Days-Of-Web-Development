import { motion } from 'motion/react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Neural Network Animation */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Center Node */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"
          />

          {/* Orbiting Nodes */}
          {[0, 60, 120, 180, 240, 300].map((angle, index) => (
            <motion.div
              key={angle}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.1,
              }}
              className="absolute top-1/2 left-1/2 w-full h-full"
            >
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: `linear-gradient(135deg, #06b6d4, #a855f7)`,
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateX(50px) translateY(-50%)`,
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">AI Processing</h3>
          <p className="text-gray-400">Analyzing image with TensorFlow.js...</p>
        </motion.div>

        {/* Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="w-2 h-2 bg-purple-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
