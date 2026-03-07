import { useState, useEffect, useCallback } from "react";
import { Playlist, Track } from "@/types/music";
import { DEMO_TRACKS } from "@/data/tracks";

const STORAGE_KEY = "music-player-playlists";
const TRACKS_KEY = "music-player-tracks";

function loadPlaylists(): Playlist[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  // Default playlist
  const defaultPlaylist: Playlist = {
    id: "default",
    name: "All Songs",
    trackIds: DEMO_TRACKS.map((t) => t.id),
    createdAt: Date.now(),
  };
  return [defaultPlaylist];
}

function loadTracks(): Track[] {
  try {
    const stored = localStorage.getItem(TRACKS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length > 0) return parsed;
    }
  } catch {}
  return DEMO_TRACKS;
}

export function usePlaylistManager() {
  const [playlists, setPlaylists] = useState<Playlist[]>(loadPlaylists);
  const [tracks, setTracks] = useState<Track[]>(loadTracks);
  const [activePlaylistId, setActivePlaylistId] = useState<string>("default");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
  }, [tracks]);

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId) || playlists[0];

  const activePlaylistTracks = activePlaylist
    ? activePlaylist.trackIds.map((id) => tracks.find((t) => t.id === id)).filter(Boolean) as Track[]
    : [];

  const createPlaylist = useCallback((name: string) => {
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      name,
      trackIds: [],
      createdAt: Date.now(),
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
    return newPlaylist;
  }, []);

  const deletePlaylist = useCallback(
    (id: string) => {
      if (id === "default") return;
      setPlaylists((prev) => prev.filter((p) => p.id !== id));
      if (activePlaylistId === id) setActivePlaylistId("default");
    },
    [activePlaylistId]
  );

  const addTrackToPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId && !p.trackIds.includes(trackId)
          ? { ...p, trackIds: [...p.trackIds, trackId] }
          : p
      )
    );
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === playlistId
          ? { ...p, trackIds: p.trackIds.filter((id) => id !== trackId) }
          : p
      )
    );
  }, []);

  const addUploadedTrack = useCallback(
    (file: File): Promise<Track> => {
      return new Promise((resolve) => {
        const url = URL.createObjectURL(file);
        const audio = new Audio(url);
        audio.addEventListener("loadedmetadata", () => {
          const track: Track = {
            id: `upload-${Date.now()}`,
            title: file.name.replace(/\.[^/.]+$/, ""),
            artist: "Unknown Artist",
            album: "Uploaded",
            duration: audio.duration,
            src: url,
          };
          setTracks((prev) => [...prev, track]);
          // Add to default playlist
          setPlaylists((prev) =>
            prev.map((p) =>
              p.id === "default" ? { ...p, trackIds: [...p.trackIds, track.id] } : p
            )
          );
          resolve(track);
        });
      });
    },
    []
  );

  return {
    playlists,
    tracks,
    activePlaylist,
    activePlaylistId,
    activePlaylistTracks,
    setActivePlaylistId,
    createPlaylist,
    deletePlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    addUploadedTrack,
  };
}
