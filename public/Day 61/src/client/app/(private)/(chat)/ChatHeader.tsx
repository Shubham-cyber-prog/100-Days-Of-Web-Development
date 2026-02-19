"use client";

import React from "react";

interface ChatHeaderProps {
  chat: any;
  onResolve: () => void;
  canResolve: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chat,
  onResolve,
  canResolve,
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h2 className="font-semibold text-xl">Support Chat</h2>
          <div className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${
                chat?.status === "OPEN" ? "bg-green-400" : "bg-gray-400"
              } animate-pulse`}
            ></span>
            <span className="text-sm font-medium">
              {chat?.status === "OPEN" ? "Active" : "Resolved"}
            </span>
          </div>
        </div>
        {canResolve && (
          <button
            onClick={onResolve}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Resolve</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
