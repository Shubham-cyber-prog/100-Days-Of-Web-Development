"use client";

import React, { useState } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  ArrowLeftRight,
} from "lucide-react";

interface CallInProgressScreenProps {
  localVideoRef?: React.RefObject<HTMLVideoElement>;
  remoteVideoRef?: React.RefObject<HTMLVideoElement>;
  onEndCall: () => void;
  userName?: string;
  remoteUserName?: string;
}

const CallInProgressScreen: React.FC<CallInProgressScreenProps> = ({
  localVideoRef,
  remoteVideoRef,
  onEndCall,
  userName = "You",
  remoteUserName = "Caller",
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOff(!isVideoOff);
  const swapVideos = () => setIsSwapped(!isSwapped);

  const callTime = "00:12:34"; // In a real implementation, this would be a state with a timer

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col z-50">
      {/* Call timer */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-1 rounded-full backdrop-blur-sm z-20">
        {callTime}
      </div>

      {/* Main video container */}
      <div className="flex-1 relative w-full">
        {/* Remote video (or local if swapped) */}
        <video
          ref={isSwapped ? localVideoRef : remoteVideoRef}
          autoPlay
          className="w-full h-full object-cover"
        />

        {/* User label */}
        <div className="absolute top-6 left-6 bg-black/40 text-white px-3 py-1 rounded-md backdrop-blur-sm">
          {isSwapped ? userName : remoteUserName}
        </div>

        {/* Picture-in-picture video */}
        <div className="absolute bottom-24 right-6 w-1/3 max-w-xs aspect-video rounded-lg overflow-hidden border-2 border-gray-800 shadow-lg">
          <video
            ref={isSwapped ? remoteVideoRef : localVideoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {isSwapped ? remoteUserName : userName}
          </div>
        </div>
      </div>

      {/* Call controls */}
      <div className="bg-gray-900 p-4 flex justify-center items-center space-x-4">
        <button
          onClick={toggleMute}
          className={`p-4 rounded-full transition-all ${
            isMuted
              ? "bg-red-500 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
        </button>

        <button
          onClick={toggleVideo}
          className={`p-4 rounded-full transition-all ${
            isVideoOff
              ? "bg-red-500 text-white"
              : "bg-gray-700 text-white hover:bg-gray-600"
          }`}
          aria-label={isVideoOff ? "Turn video on" : "Turn video off"}
        >
          {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
        </button>

        <button
          onClick={onEndCall}
          className="p-5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg transform hover:scale-105"
          aria-label="End call"
        >
          <PhoneOff size={24} />
        </button>

        <button
          onClick={swapVideos}
          className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all"
          aria-label="Swap cameras"
        >
          <ArrowLeftRight size={20} />
        </button>

        <button
          className="p-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all"
          aria-label="Open chat"
        >
          <MessageSquare size={20} />
        </button>
      </div>
    </div>
  );
};

export default CallInProgressScreen;
