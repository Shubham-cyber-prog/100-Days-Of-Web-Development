"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

interface CallConnectingScreenProps {
  chat: any;
  onCancel: () => void;
}

const CallConnectingScreen: React.FC<CallConnectingScreenProps> = ({
  chat,
  onCancel,
}) => {
  // Assume the call is to a support agent if the user is the chat initiator
  const recipientName = chat?.user?.name || "Support Agent";
  const recipientAvatar = chat?.user?.avatar || "/default-avatar.png";

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-900 to-blue-700 flex flex-col items-center justify-center z-50 animate-fadeIn">
      <div className="text-center">
        <Image
          src={recipientAvatar}
          alt="Recipient"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg mb-4"
        />
        <h2 className="text-2xl font-semibold text-white">{recipientName}</h2>
        <p className="text-lg text-blue-200 mt-2 animate-pulse">
          Connecting...
        </p>
      </div>
      <div className="mt-8 flex space-x-4">
        <button
          onClick={onCancel}
          className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
        >
          <X size={24} />
        </button>
      </div>
      <div className="absolute bottom-10 text-blue-300 text-sm">
        Secure WebRTC Call
      </div>
    </div>
  );
};

export default CallConnectingScreen;
