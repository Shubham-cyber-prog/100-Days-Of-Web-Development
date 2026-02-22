import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import { appleMusicService } from "../services/apple-music";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function PlayerView() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([35]);
  const [currentSong, setCurrentSong] = useState<any>(null);

  useEffect(() => {
    appleMusicService.initialize();
    const song = appleMusicService.getNowPlayingItem();
    setCurrentSong(song);
  }, []);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await appleMusicService.pause();
    } else {
      await appleMusicService.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSkipForward = async () => {
    await appleMusicService.skipToNext();
    const song = appleMusicService.getNowPlayingItem();
    setCurrentSong(song);
  };

  const handleSkipBack = async () => {
    await appleMusicService.skipToPrevious();
    const song = appleMusicService.getNowPlayingItem();
    setCurrentSong(song);
  };

  return (
    <div className="px-4 md:px-6 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-8 py-8">
        {/* Album Art */}
        {currentSong?.artwork ? (
          <ImageWithFallback 
            src={currentSong.artwork} 
            alt={currentSong.title}
            className="w-full max-w-md aspect-square rounded-2xl shadow-2xl object-cover"
          />
        ) : (
          <div className="w-full max-w-md aspect-square bg-gradient-to-br from-violet-600 to-purple-900 rounded-2xl shadow-2xl" />
        )}

        {/* Song Info */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold">{currentSong?.title || "Midnight Dreams"}</h1>
          <p className="text-xl text-muted-foreground">{currentSong?.artist || "Luna Nova"}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-2">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Heart className="h-6 w-6" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-12 w-12" onClick={handleSkipBack}>
            <SkipBack className="h-6 w-6" />
          </Button>
          
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-violet-600 hover:bg-violet-700 shadow-lg"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="h-7 w-7" fill="currentColor" />
            ) : (
              <Play className="h-7 w-7 ml-1" fill="currentColor" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon" className="h-12 w-12" onClick={handleSkipForward}>
            <SkipForward className="h-6 w-6" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}