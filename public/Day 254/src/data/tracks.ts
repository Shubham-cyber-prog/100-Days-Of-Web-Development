import { Track } from "@/types/music";

// Demo tracks using free audio samples
export const DEMO_TRACKS: Track[] = [
  {
    id: "track-1",
    title: "Midnight Drive",
    artist: "Neon Pulse",
    album: "Synthwave Dreams",
    duration: 180,
    src: "",
    artwork: "",
  },
  {
    id: "track-2",
    title: "Electric Sunset",
    artist: "Cyber Horizon",
    album: "Digital Skies",
    duration: 210,
    src: "",
    artwork: "",
  },
  {
    id: "track-3",
    title: "Crystal Rain",
    artist: "Luna Wave",
    album: "Ocean Frequencies",
    duration: 195,
    src: "",
    artwork: "",
  },
  {
    id: "track-4",
    title: "Stellar Drift",
    artist: "Cosmos Audio",
    album: "Space Echoes",
    duration: 240,
    src: "",
    artwork: "",
  },
  {
    id: "track-5",
    title: "Neon Streets",
    artist: "Retro Machine",
    album: "City Lights",
    duration: 165,
    src: "",
    artwork: "",
  },
  {
    id: "track-6",
    title: "Vapor Trail",
    artist: "Neon Pulse",
    album: "Synthwave Dreams",
    duration: 200,
    src: "",
    artwork: "",
  },
];

export const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

// Generate gradient colors for artwork placeholders
export const getTrackColor = (index: number): string => {
  const colors = [
    "from-cyan-500 to-blue-600",
    "from-purple-500 to-pink-500",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-600",
    "from-pink-500 to-rose-500",
  ];
  return colors[index % colors.length];
};
