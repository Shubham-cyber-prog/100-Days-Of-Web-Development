import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export function AILoader() {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <Sparkles className="h-6 w-6 text-primary" />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-primary/20 blur-md"
        />
      </motion.div>
      <div>
        <motion.p
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="font-medium"
        >
          AI is analyzing your code
        </motion.p>
        <p className="text-sm text-muted-foreground">
          This may take a few seconds...
        </p>
      </div>
    </div>
  );
}
