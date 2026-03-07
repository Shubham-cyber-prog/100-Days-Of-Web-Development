"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/utils";

interface ImageSliderProps {
  images: string[];
  interval?: number;
  autoPlay?: boolean;
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  interval = 4000,
  autoPlay = false,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || isHovered || images.length <= 1) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(slideInterval);
  }, [autoPlay, isHovered, interval, images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Return null or a placeholder if no images
  if (!images || images.length === 0) {
    return (
      <div
        className={cn("relative w-full h-48 bg-gray-200 rounded-lg", className)}
      >
        <p className="absolute inset-0 flex items-center justify-center text-gray-500">
          No images available
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-96 overflow-hidden rounded-lg", // Default size for full view
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Slides */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            width={300}
            height={300}
            className="object-cover"
            priority={currentIndex === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (hidden in preview if too small) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 transition-opacity duration-300 opacity-0 group-hover:opacity-100 focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-colors duration-300",
                currentIndex === index
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
