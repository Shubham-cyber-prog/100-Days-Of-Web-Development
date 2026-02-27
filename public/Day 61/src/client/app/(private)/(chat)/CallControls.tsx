"use client";

import React from "react";
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from "lucide-react";

interface CallControlsProps {
  callStatus: "idle" | "calling" | "in-call" | "ended";
  startCall: () => void;
  endCall: () => void;
  isMuted?: boolean;
  toggleMute?: () => void;
  isSpeakerOn?: boolean;
  toggleSpeaker?: () => void;
}

const CallControls: React.FC<CallControlsProps> = ({
  callStatus,
  startCall,
  endCall,
  isMuted = false,
  toggleMute,
  isSpeakerOn = true,
  toggleSpeaker,
}) => {
  if (callStatus === "ended") {
    return (
      <div className="flex items-center justify-center p-3 bg-gray-50 border-t">
        <div className="text-gray-600 flex items-center gap-2">
          <span className="text-sm">Call ended</span>
          <button
            onClick={startCall}
            className="ml-4 flex items-center gap-2 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors text-sm"
          >
            <Phone size={16} />
            New Call
          </button>
        </div>
      </div>
    );
  }

  if (callStatus === "idle") {
    return (
      <div className="flex justify-center p-3 bg-gray-50 border-t">
        <button
          onClick={startCall}
          className="flex items-center gap-2 py-2 px-6 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
        >
          <Phone size={18} />
          Start Call
        </button>
      </div>
    );
  }

  if (callStatus === "calling") {
    return (
      <div className="flex items-center justify-center p-3 bg-gray-50 border-t">
        <div className="flex items-center gap-2 text-yellow-600">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span>Connecting call...</span>
        </div>
        <button
          onClick={endCall}
          className="ml-4 flex items-center justify-center w-10 h-10 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
        >
          <PhoneOff size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-4 p-3 bg-gray-50 border-t">
      {toggleMute && (
        <button
          onClick={toggleMute}
          className={`flex items-center justify-center w-10 h-10 ${
            isMuted ? "bg-gray-300" : "bg-blue-600"
          } text-white rounded-full hover:opacity-90 transition-opacity`}
        >
          {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      )}

      <button
        onClick={endCall}
        className="flex items-center justify-center w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
      >
        <PhoneOff size={20} />
      </button>

      {toggleSpeaker && (
        <button
          onClick={toggleSpeaker}
          className={`flex items-center justify-center w-10 h-10 ${
            isSpeakerOn ? "bg-blue-600" : "bg-gray-300"
          } text-white rounded-full hover:opacity-90 transition-opacity`}
        >
          {isSpeakerOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </div>
  );
};

export default CallControls;
