import { useState, useEffect, useRef } from "react";

interface UseAudioOptions {
  autoPlay?: boolean;
  onEnded?: () => void;
}

export const useAudio = (src?: string, options: UseAudioOptions = {}) => {
  const [playing, setPlaying] = useState(options.autoPlay || false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setPlaying(false);
      setCurrentTime(0);
      if (options.onEnded) {
        options.onEnded();
      }
    };

    const handleError = () => {
      setError(new Error("Failed to load audio"));
      setLoading(false);
    };

    // Set up event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError as EventListener);

    // Initial play if autoPlay is true
    if (options.autoPlay) {
      audio.play().catch((err) => {
        setError(err);
        setPlaying(false);
      });
    }

    // Cleanup
    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError as EventListener);
    };
  }, [src, options.autoPlay, options.onEnded, options]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setPlaying(true);
        })
        .catch((err) => {
          setError(err);
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const togglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  return {
    playing,
    duration,
    currentTime,
    loading,
    error,
    play,
    pause,
    seek,
    togglePlay,
    audioElement: audioRef.current,
  };
};
