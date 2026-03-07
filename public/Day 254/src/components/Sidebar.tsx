import { useState, useRef } from "react";
import { Playlist, Track } from "@/types/music";
import {
  ListMusic,
  Plus,
  Trash2,
  Upload,
  ChevronRight,
  Music2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  playlists: Playlist[];
  activePlaylistId: string;
  onSelectPlaylist: (id: string) => void;
  onCreatePlaylist: (name: string) => void;
  onDeletePlaylist: (id: string) => void;
  onUploadTrack: (file: File) => void;
}

export default function Sidebar({
  playlists,
  activePlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onDeletePlaylist,
  onUploadTrack,
}: SidebarProps) {
  const [newName, setNewName] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    if (newName.trim()) {
      onCreatePlaylist(newName.trim());
      setNewName("");
      setShowCreate(false);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0 h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
          <Music2 className="w-4 h-4 text-primary" />
        </div>
        <h1 className="text-lg font-bold text-gradient">SoundWave</h1>
      </div>

      {/* Upload Button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" />
          Upload Music
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              Array.from(files).forEach(onUploadTrack);
            }
            e.target.value = "";
          }}
        />
      </div>

      {/* Playlists */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Playlists
          </span>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-2"
            >
              <div className="flex gap-1.5 px-1">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                  placeholder="Playlist name..."
                  className="flex-1 px-2.5 py-1.5 rounded-md bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-0 outline-none focus:ring-1 focus:ring-primary/50"
                  autoFocus
                />
                <button
                  onClick={handleCreate}
                  className="px-2.5 py-1.5 rounded-md bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-0.5">
          {playlists.map((playlist) => {
            const isActive = playlist.id === activePlaylistId;
            return (
              <div
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className={`group flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <ListMusic className="w-4 h-4 flex-shrink-0 opacity-70" />
                <span className="flex-1 text-sm font-medium truncate">
                  {playlist.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {playlist.trackIds.length}
                </span>
                {playlist.id !== "default" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeletePlaylist(playlist.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-primary opacity-60" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-[10px] text-muted-foreground text-center">
          SoundWave Player v1.0
        </p>
      </div>
    </aside>
  );
}
