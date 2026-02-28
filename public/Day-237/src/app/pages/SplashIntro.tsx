import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function SplashIntro() {
  const navigate = useNavigate();
  const [animationStage, setAnimationStage] = useState(0);
  const [showCrack, setShowCrack] = useState(false);

  useEffect(() => {
    // Stage 0: Player runs in (0-1.5s)
    const stage1Timer = setTimeout(() => {
      setAnimationStage(1);
    }, 1500);

    // Stage 1: Player kicks, ball flies (1.5-3s)
    const stage2Timer = setTimeout(() => {
      setAnimationStage(2);
    }, 3000);

    // Stage 2: Ball zooms and impact (3-3.5s)
    const crackTimer = setTimeout(() => {
      setShowCrack(true);
    }, 3500);

    // Stage 3: Fade out and navigate (4.5s)
    const navigateTimer = setTimeout(() => {
      navigate("/home");
    }, 4500);

    return () => {
      clearTimeout(stage1Timer);
      clearTimeout(stage2Timer);
      clearTimeout(crackTimer);
      clearTimeout(navigateTimer);
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Stadium Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1671723204288-1b3794effd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Stadium"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        
        {/* Stadium lights glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E676]/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00E676]/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Brand Name - Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center"
      >
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
          <span className="text-[#00E676] drop-shadow-[0_0_30px_rgba(0,230,118,0.8)]">
            Turf
          </span>
          <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
            Book
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#00E676] text-xl md:text-2xl font-semibold mt-4 tracking-wide"
        >
          Where Champions Play
        </motion.p>
      </motion.div>

      {/* Animation Container */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animation elements removed - keeping timing for glass crack effect */}
      </div>

      {/* Glass Crack Impact Effect */}
      <AnimatePresence>
        {showCrack && (
          <>
            {/* Crack Lines */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5, 0], scale: [0, 1.2, 1.5, 2] }}
              transition={{ duration: 1 }}
              className="absolute inset-0 z-30"
            >
              {/* Center Impact Point */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {/* Radial cracks */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "400px", opacity: [0, 0.8, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.03,
                      ease: "easeOut",
                    }}
                    className="absolute top-0 left-1/2 w-0.5 bg-gradient-to-b from-white via-[#00E676] to-transparent origin-top"
                    style={{
                      transform: `rotate(${i * 30}deg)`,
                    }}
                  />
                ))}

                {/* Circular rings */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`ring-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [0, 1 + i * 0.5],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                    style={{
                      width: `${80 + i * 100}px`,
                      height: `${80 + i * 100}px`,
                    }}
                  />
                ))}

                {/* Shatter particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`particle-${i}`}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 0,
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 20) * 300,
                      y: Math.sin((i * Math.PI * 2) / 20) * 300,
                      scale: [1, 0.5, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute w-3 h-3 bg-[#00E676] rounded-sm"
                  />
                ))}
              </div>
            </motion.div>

            {/* Screen shake effect */}
            <motion.div
              animate={{
                x: [0, -10, 10, -10, 10, 0],
                y: [0, 10, -10, 10, -10, 0],
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-20 pointer-events-none"
            />
          </>
        )}
      </AnimatePresence>

      {/* Fade Out Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showCrack ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute inset-0 bg-black z-50"
      />
    </div>
  );
}