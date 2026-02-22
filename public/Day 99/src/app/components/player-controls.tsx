import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { appleMusicService } from "../services/apple-music";

interface PlayerControlsProps {
  currentSong?: {
    id?: string;
    title: string;
    artist: string;
    artwork?: string;
  };
}

export function PlayerControls({ currentSong }: PlayerControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([30]);
  const [volume, setVolume] = useState([70]);

  useEffect(() => {
    appleMusicService.initialize();
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await appleMusicService.pause();
    } else {
      if (currentSong?.id) {
        await appleMusicService.playSong(currentSong.id);
      } else {
        await appleMusicService.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = async () => {
    await appleMusicService.skipToNext();
  };

  const handleSkipBack = async () => {
    await appleMusicService.skipToPrevious();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center gap-4 px-4 py-3 md:px-6">
        {/* Current Song */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 bg-muted rounded-lg flex-shrink-0" />
          <div className="hidden md:block min-w-0">
            <p className="font-medium text-sm truncate">
              {currentSong?.title || "No song playing"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentSong?.artist || "Select a song"}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="hidden md:flex ml-2">
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        {/* Center Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleSkipBack}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              variant="default"
              size="icon"
              className="h-10 w-10 rounded-full bg-violet-600 hover:bg-violet-700"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="currentColor" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" fill="currentColor" />
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSkipForward}>
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          <div className="hidden md:flex items-center gap-2 w-full max-w-md">
            <span className="text-xs text-muted-foreground w-10 text-right">1:23</span>
            <Slider
              value={progress}
              onValueChange={setProgress}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-10">3:45</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden md:flex items-center gap-2 flex-1 justify-end">
          <Volume2 className="h-5 w-5 text-muted-foreground" />
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-24"
          />
        </div>
      </div>
    </div>
  );
}