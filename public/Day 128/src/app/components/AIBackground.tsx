import { motion } from 'motion/react';
import { useEffect } from 'react';

export function AIBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl"
      />

      {/* Neural network pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="neural-pattern"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-cyan-400" />
            <circle cx="0" cy="0" r="1" fill="currentColor" className="text-purple-400" />
            <circle cx="100" cy="0" r="1" fill="currentColor" className="text-purple-400" />
            <circle cx="0" cy="100" r="1" fill="currentColor" className="text-purple-400" />
            <circle cx="100" cy="100" r="1" fill="currentColor" className="text-purple-400" />
            <line
              x1="50"
              y1="50"
              x2="0"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-cyan-400/30"
            />
            <line
              x1="50"
              y1="50"
              x2="100"
              y2="0"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-purple-400/30"
            />
            <line
              x1="50"
              y1="50"
              x2="0"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-purple-400/30"
            />
            <line
              x1="50"
              y1="50"
              x2="100"
              y2="100"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-cyan-400/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#neural-pattern)" />
      </svg>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}
