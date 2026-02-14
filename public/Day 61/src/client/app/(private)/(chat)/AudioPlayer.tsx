"use client";
import React, { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import useEventListener from "@/app/hooks/dom/useEventListener";

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const waveformBars = Array.from(
    { length: 40 },
    () => Math.floor(Math.random() * 100) + 10
  );

  useEventListener(
    "loadedmetadata",
    () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
        setIsLoaded(true);
      }
    },
    audioRef.current as unknown as HTMLElement
  );

  useEventListener(
    "timeupdate",
    () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    },
    audioRef.current as unknown as HTMLElement
  );

  useEventListener(
    "ended",
    () => {
      setIsPlaying(false);
      setCurrentTime(0);
    },
    audioRef.current as unknown as HTMLElement
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoaded(true);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioRef.current?.duration;

    if (!duration || isNaN(duration)) return;

    const percent = clickX / width;
    const newTime = percent * duration;

    if (isFinite(newTime)) {
      // audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-md shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          onClick={togglePlay}
          className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>
        <div className="flex-1">
          <div
            className="relative h-12 w-full cursor-pointer"
            onClick={handleSeek}
          >
            <div className="absolute inset-0 flex items-center justify-between space-x-0.5">
              {waveformBars.map((height, index) => {
                const barPosition = (index / waveformBars.length) * 100;
                const isPlayed = (barPosition / 100) * duration <= currentTime;
                return (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className={`w-1 rounded-full ${
                      isPlayed ? "bg-blue-500" : "bg-gray-200"
                    } transition-colors`}
                  />
                );
              })}
            </div>
            <div
              className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <div>{formatTime(currentTime)}</div>
            <div>{isLoaded ? formatTime(duration) : "--:--"}</div>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
