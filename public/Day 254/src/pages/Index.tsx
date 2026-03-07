import { useState } from "react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { usePlaylistManager } from "@/hooks/usePlaylistManager";
import { Track } from "@/types/music";
import Sidebar from "@/components/Sidebar";
import TrackList from "@/components/TrackList";
import PlayerBar from "@/components/PlayerBar";
import AudioVisualizer from "@/components/AudioVisualizer";
import { Menu, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const player = useAudioPlayer();
  const playlist = usePlaylistManager();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState<string | null>(null);

  const handleTrackSelect = (track: Track) => {
    player.playTrack(track);
  };

  const handleNext = () => {
    const tracks = playlist.activePlaylistTracks;
    if (!player.currentTrack || tracks.length === 0) return;
    const idx = tracks.findIndex((t) => t.id === player.currentTrack?.id);
    const next = tracks[(idx + 1) % tracks.length];
    if (next) player.playTrack(next);
  };

  const handlePrev = () => {
    const tracks = playlist.activePlaylistTracks;
    if (!player.currentTrack || tracks.length === 0) return;
    const idx = tracks.findIndex((t) => t.id === player.currentTrack?.id);
    const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
    if (prev) player.playTrack(prev);
  };

  const currentTrackIndex = player.currentTrack
    ? playlist.activePlaylistTracks.findIndex((t) => t.id === player.currentTrack?.id)
    : 0;

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            playlists={playlist.playlists}
            activePlaylistId={playlist.activePlaylistId}
            onSelectPlaylist={playlist.setActivePlaylistId}
            onCreatePlaylist={playlist.createPlaylist}
            onDeletePlaylist={playlist.deletePlaylist}
            onUploadTrack={playlist.addUploadedTrack}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed left-0 top-0 bottom-0 z-50 md:hidden"
              >
                <Sidebar
                  playlists={playlist.playlists}
                  activePlaylistId={playlist.activePlaylistId}
                  onSelectPlaylist={(id) => {
                    playlist.setActivePlaylistId(id);
                    setSidebarOpen(false);
                  }}
                  onCreatePlaylist={playlist.createPlaylist}
                  onDeletePlaylist={playlist.deletePlaylist}
                  onUploadTrack={playlist.addUploadedTrack}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-secondary text-muted-foreground"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {playlist.activePlaylist?.name || "All Songs"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {playlist.activePlaylistTracks.length} tracks
                </p>
              </div>
            </div>

            {/* Add track to playlist (non-default) */}
            {playlist.activePlaylistId !== "default" && (
              <div className="relative">
                <button
                  onClick={() =>
                    setShowAddMenu(showAddMenu ? null : playlist.activePlaylistId)
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-sm text-secondary-foreground transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Songs
                </button>
                <AnimatePresence>
                  {showAddMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute right-0 top-full mt-2 w-72 glass rounded-xl p-2 max-h-80 overflow-y-auto z-30"
                    >
                      {playlist.tracks
                        .filter(
                          (t) =>
                            !playlist.activePlaylist?.trackIds.includes(t.id)
                        )
                        .map((track) => (
                          <button
                            key={track.id}
                            onClick={() => {
                              playlist.addTrackToPlaylist(
                                playlist.activePlaylistId,
                                track.id
                              );
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm hover:bg-secondary/60 text-foreground transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5 text-primary" />
                            <div className="truncate">
                              <p className="truncate font-medium">{track.title}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {track.artist}
                              </p>
                            </div>
                          </button>
                        ))}
                      {playlist.tracks.filter(
                        (t) =>
                          !playlist.activePlaylist?.trackIds.includes(t.id)
                      ).length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">
                          All songs already added
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </header>

          {/* Visualizer */}
          <div className="h-40 md:h-52 flex-shrink-0 px-6 py-4">
            <div className="h-full rounded-xl glass overflow-hidden">
              <AudioVisualizer
                analyser={player.analyser}
                isPlaying={player.isPlaying}
              />
            </div>
          </div>

          {/* Track List */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            <TrackList
              tracks={playlist.activePlaylistTracks}
              currentTrack={player.currentTrack}
              isPlaying={player.isPlaying}
              onTrackSelect={handleTrackSelect}
              onRemoveTrack={
                playlist.activePlaylistId !== "default"
                  ? (trackId) =>
                      playlist.removeTrackFromPlaylist(
                        playlist.activePlaylistId,
                        trackId
                      )
                  : undefined
              }
              showRemove={playlist.activePlaylistId !== "default"}
            />
          </div>
        </main>
      </div>

      {/* Sticky Player Bar */}
      <PlayerBar
        currentTrack={player.currentTrack}
        isPlaying={player.isPlaying}
        currentTime={player.currentTime}
        duration={player.duration}
        volume={player.volume}
        isMuted={player.isMuted}
        onTogglePlay={player.togglePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        onSeek={player.seek}
        onVolumeChange={player.changeVolume}
        onToggleMute={player.toggleMute}
        trackIndex={currentTrackIndex}
      />
    </div>
  );
};

export default Index;
